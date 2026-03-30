import { OrderStatus, Prisma } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { resolvePagination } from '@/utils/pagination.js';
import { runSerializableTransaction } from '@/utils/transaction.js';

import type { CartOwner } from '../cart/cart.service.js';
import {
  getAccessibleOrder,
  releaseOrderReservationsTx,
  releaseExpiredReservations,
  restoreOrderInventoryTx
} from '../checkout/checkout.service.js';

const allowedTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
  PENDING_PAYMENT: [OrderStatus.CANCELLED],
  PLACED: [OrderStatus.PACKED, OrderStatus.CANCELLED],
  PACKED: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  SHIPPED: [OrderStatus.DELIVERED],
  DELIVERED: [OrderStatus.RETURNED],
  CANCELLED: [OrderStatus.REFUNDED]
};

const orderInclude = {
  items: true,
  payments: true,
  statusLogs: {
    orderBy: { createdAt: 'desc' as const }
  }
};

export const trackOrderByNumber = async (orderNumber: string) => {
  await releaseExpiredReservations();

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: orderInclude
  });

  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  return {
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      imageUrl: item.imageUrl
    })),
    statusLogs: order.statusLogs
  };
};

export const getMyOrders = async (userId: string) =>
  prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true
    }
  });

export const getOrderDetails = async (orderId: string, owner: CartOwner) =>
  getAccessibleOrder(orderId, owner);

export const listAdminOrders = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
}) => {
  const pagination = resolvePagination(query.page, query.limit);
  const where: Prisma.OrderWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.search
      ? {
          OR: [
            { orderNumber: { contains: query.search, mode: 'insensitive' } },
            { customerEmail: { contains: query.search, mode: 'insensitive' } },
            { customerName: { contains: query.search, mode: 'insensitive' } }
          ]
        }
      : {})
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        payments: true
      }
    }),
    prisma.order.count({ where })
  ]);

  return {
    items: orders,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit)
    }
  };
};

export const getAdminOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: orderInclude
  });

  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  return order;
};

export const updateAdminOrderStatus = async (
  orderId: string,
  nextStatus: OrderStatus,
  actorId?: string,
  note?: string
) =>
  runSerializableTransaction(prisma, async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      throw new ApiError(404, 'Order not found.');
    }

    if (order.status === nextStatus) {
      return order;
    }

    const allowedNext = allowedTransitions[order.status] ?? [];

    if (!allowedNext.includes(nextStatus)) {
      throw new ApiError(400, `Cannot move order from ${order.status} to ${nextStatus}.`);
    }

    if (nextStatus === OrderStatus.CANCELLED) {
      if (order.status === OrderStatus.PENDING_PAYMENT) {
        await releaseOrderReservationsTx(tx, order.id);
      } else {
        await restoreOrderInventoryTx(tx, order.id, actorId);
      }
    }

    return tx.order.update({
      where: { id: order.id },
      data: {
        status: nextStatus,
        cancelledAt: nextStatus === OrderStatus.CANCELLED ? new Date() : order.cancelledAt,
        deliveredAt: nextStatus === OrderStatus.DELIVERED ? new Date() : order.deliveredAt,
        statusLogs: {
          create: {
            actorId,
            fromStatus: order.status,
            toStatus: nextStatus,
            note
          }
        }
      },
      include: orderInclude
    });
  });
