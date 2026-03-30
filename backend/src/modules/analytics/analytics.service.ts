import { OrderStatus, PaymentStatus } from '@prisma/client';

import { prisma } from '@/config/prisma.js';

const resolveRange = (range: '7d' | '30d' | '90d') => {
  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  const start = new Date();
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);
  return start;
};

const monetizedStatuses = [OrderStatus.PLACED, OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.DELIVERED];

export const getAnalyticsSummary = async () => {
  const [orders, lowStockProducts, topSelling] = await Promise.all([
    prisma.order.findMany({
      where: {
        status: { in: monetizedStatuses }
      },
      include: { items: true }
    }),
    prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          take: 1
        }
      }
    }),
    prisma.orderItem.groupBy({
      by: ['productId', 'productName'],
      _sum: { quantity: true },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    })
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const unitsSold = orders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalOrders: orders.length,
    unitsSold,
    averageOrderValue: orders.length ? Number((totalRevenue / orders.length).toFixed(2)) : 0,
    topSellingProducts: topSelling,
    lowStockProducts: lowStockProducts
      .filter((product) => product.stockQuantity <= product.lowStockThreshold)
      .slice(0, 10)
      .map((product) => ({
        ...product,
        availableStock: Math.max(product.stockQuantity - product.reservedQuantity, 0)
      }))
  };
};

export const getSalesAnalytics = async (range: '7d' | '30d' | '90d') => {
  const start = resolveRange(range);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: start },
      status: { in: monetizedStatuses }
    }
  });

  const bucket = new Map<string, { date: string; revenue: number; orders: number }>();

  for (const order of orders) {
    const date = order.createdAt.toISOString().slice(0, 10);
    const entry = bucket.get(date) ?? { date, revenue: 0, orders: 0 };
    entry.revenue += Number(order.total);
    entry.orders += 1;
    bucket.set(date, entry);
  }

  return Array.from(bucket.values()).sort((left, right) => left.date.localeCompare(right.date));
};

export const getTopProducts = async (range: '7d' | '30d' | '90d') => {
  const start = resolveRange(range);

  return prisma.orderItem.groupBy({
    by: ['productId', 'productName'],
    where: {
      order: {
        createdAt: { gte: start },
        status: { in: monetizedStatuses }
      }
    },
    _sum: {
      quantity: true,
      totalPrice: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 10
  });
};

export const getRevenueAnalytics = async (range: '7d' | '30d' | '90d') => {
  const start = resolveRange(range);

  const [paidOrders, customerCount] = await Promise.all([
    prisma.order.findMany({
      where: {
        createdAt: { gte: start },
        OR: [
          { paymentStatus: PaymentStatus.PAID },
          { paymentMethod: 'COD', status: { in: monetizedStatuses } }
        ]
      }
    }),
    prisma.user.count({
      where: {
        createdAt: { gte: start },
        role: 'CUSTOMER'
      }
    })
  ]);

  const totalRevenue = paidOrders.reduce((sum, order) => sum + Number(order.total), 0);

  return {
    range,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalOrders: paidOrders.length,
    newCustomers: customerCount
  };
};

