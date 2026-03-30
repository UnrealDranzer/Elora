import {
  InventoryChangeType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma
} from '@prisma/client';
import { nanoid } from 'nanoid';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { runSerializableTransaction } from '@/utils/transaction.js';

import type { CartOwner } from '../cart/cart.service.js';
import { getOrCreateCart } from '../cart/cart.service.js';
import { getValidCoupon } from '../coupons/coupons.service.js';

const SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING_FEE = 79;
const RESERVATION_WINDOW_MS = 15 * 60 * 1000;

const buildOrderNumber = () => `ELR-${nanoid(10).toUpperCase()}`;

const computeShipping = (subtotalAfterDiscount: number) =>
  subtotalAfterDiscount >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;

const getCartSnapshot = async (tx: Prisma.TransactionClient, cartId: string) => {
  const cart = await tx.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
                take: 1
              }
            }
          },
          variant: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty.');
  }

  return cart;
};

const buildPricing = async (cart: Awaited<ReturnType<typeof getCartSnapshot>>, userId?: string, couponCode?: string) => {
  const subtotal = Number(
    cart.items
      .reduce((sum, item) => sum + Number(item.variant?.price ?? item.product.price) * item.quantity, 0)
      .toFixed(2)
  );

  let coupon: Awaited<ReturnType<typeof getValidCoupon>>['coupon'] | null = null;
  let discountTotal = 0;

  if (couponCode) {
    const couponValidation = await getValidCoupon({
      code: couponCode,
      subtotal,
      userId
    });

    coupon = couponValidation.coupon;
    discountTotal = couponValidation.discountAmount;
  }

  const shippingTotal = computeShipping(subtotal - discountTotal);
  const total = Number((subtotal - discountTotal + shippingTotal).toFixed(2));

  return {
    subtotal,
    discountTotal,
    shippingTotal,
    total,
    couponId: coupon?.id ?? null
  };
};

const reserveCartItems = async (
  tx: Prisma.TransactionClient,
  cart: Awaited<ReturnType<typeof getCartSnapshot>>
) => {
  for (const item of cart.items) {
    if (item.variantId) {
      const variant = await tx.productVariant.findUnique({
        where: { id: item.variantId }
      });

      if (!variant) {
        throw new ApiError(404, 'Selected product variant was not found.');
      }

      const available = variant.stockQuantity - variant.reservedQuantity;

      if (available < item.quantity) {
        throw new ApiError(409, `Insufficient stock for ${item.product.name}.`);
      }

      await tx.productVariant.update({
        where: { id: variant.id },
        data: {
          reservedQuantity: variant.reservedQuantity + item.quantity
        }
      });
    } else {
      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (!product || product.deletedAt || product.status !== 'PUBLISHED') {
        throw new ApiError(404, `${item.product.name} is no longer available.`);
      }

      const available = product.stockQuantity - product.reservedQuantity;

      if (available < item.quantity) {
        throw new ApiError(409, `Insufficient stock for ${product.name}.`);
      }

      await tx.product.update({
        where: { id: product.id },
        data: {
          reservedQuantity: product.reservedQuantity + item.quantity
        }
      });
    }
  }
};

export const releaseOrderReservationsTx = async (tx: Prisma.TransactionClient, orderId: string) => {
  const order = await tx.order.findUnique({
    where: { id: orderId },
    include: { items: true }
  });

  if (!order || order.status !== OrderStatus.PENDING_PAYMENT) {
    return null;
  }

  for (const item of order.items) {
    if (item.variantId) {
      const variant = await tx.productVariant.findUnique({
        where: { id: item.variantId }
      });

      if (variant) {
        await tx.productVariant.update({
          where: { id: variant.id },
          data: {
            reservedQuantity: Math.max(variant.reservedQuantity - item.quantity, 0)
          }
        });
      }
    } else if (item.productId) {
      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (product) {
        await tx.product.update({
          where: { id: product.id },
          data: {
            reservedQuantity: Math.max(product.reservedQuantity - item.quantity, 0)
          }
        });
      }
    }
  }

  return tx.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.CANCELLED,
      cancelledAt: new Date(),
      reservationExpiresAt: null
    }
  });
};

export const releaseExpiredReservations = async () => {
  const expiredOrders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PENDING_PAYMENT,
      reservationExpiresAt: {
        lt: new Date()
      }
    },
    select: { id: true }
  });

  for (const order of expiredOrders) {
    await runSerializableTransaction(prisma, async (tx) => {
      await releaseOrderReservationsTx(tx, order.id);
    });
  }
};

export const createCheckoutOrder = async (
  owner: CartOwner,
  input: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
    couponCode?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }
) => {
  await releaseExpiredReservations();

  return runSerializableTransaction(prisma, async (tx) => {
    const existingPendingOrders = await tx.order.findMany({
      where: owner.userId
        ? { userId: owner.userId, status: OrderStatus.PENDING_PAYMENT }
        : { guestToken: owner.guestToken, status: OrderStatus.PENDING_PAYMENT },
      select: { id: true }
    });

    for (const existingOrder of existingPendingOrders) {
      await releaseOrderReservationsTx(tx, existingOrder.id);
    }

    const cart = await getOrCreateCart(owner);
    const cartSnapshot = await getCartSnapshot(tx, cart.id);

    await reserveCartItems(tx, cartSnapshot);

    const pricing = await buildPricing(cartSnapshot, owner.userId, input.couponCode);
    const reservationExpiresAt = new Date(Date.now() + RESERVATION_WINDOW_MS);

      const order = await tx.order.create({
      data: {
        orderNumber: buildOrderNumber(),
        userId: owner.userId,
        guestToken: owner.guestToken,
        couponId: pricing.couponId,
        status: OrderStatus.PENDING_PAYMENT,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: input.paymentMethod,
        subtotal: pricing.subtotal,
        discountTotal: pricing.discountTotal,
        shippingTotal: pricing.shippingTotal,
        total: pricing.total,
        customerName: input.customerName,
        customerEmail: input.customerEmail.toLowerCase(),
        customerPhone: input.customerPhone,
        shippingAddress: input.shippingAddress as Prisma.InputJsonValue,
        billingAddress: input.billingAddress as Prisma.InputJsonValue | undefined,
        notes: input.notes,
        reservationExpiresAt,
        items: {
          create: cartSnapshot.items.map((item) => {
            const unitPrice = Number(item.variant?.price ?? item.product.price);
            return {
              productId: item.productId,
              variantId: item.variantId,
              productName: item.product.name,
              productSlug: item.product.slug,
              sku: item.variant?.sku ?? item.product.sku,
              quantity: item.quantity,
              unitPrice,
              totalPrice: Number((unitPrice * item.quantity).toFixed(2)),
              imageUrl: item.product.images[0]?.url,
              productSnapshot: {
                name: item.product.name,
                slug: item.product.slug,
                categoryId: item.product.categoryId,
                shortDescription: item.product.shortDescription,
                price: unitPrice
              } as Prisma.InputJsonValue
            };
          })
        },
        statusLogs: {
          create: {
            actorId: owner.userId,
            toStatus: OrderStatus.PENDING_PAYMENT,
            note: 'Checkout initiated.'
          }
        }
      },
      include: {
        items: true
      }
    });

    return order;
  });
};

const finalizeReservedOrderTx = async (
  tx: Prisma.TransactionClient,
  orderId: string,
  options: {
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    paymentId?: string;
    actorId?: string;
    note?: string;
  }
) => {
  const order = await tx.order.findUnique({
    where: { id: orderId },
    include: { items: true }
  });

  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  if (order.status !== OrderStatus.PENDING_PAYMENT) {
    return order;
  }

  if (order.reservationExpiresAt && order.reservationExpiresAt < new Date()) {
    await releaseOrderReservationsTx(tx, order.id);
    throw new ApiError(409, 'Checkout session expired. Please review your cart again.');
  }

  for (const item of order.items) {
    if (item.variantId) {
      const updated = await tx.productVariant.updateMany({
        where: {
          id: item.variantId,
          stockQuantity: { gte: item.quantity },
          reservedQuantity: { gte: item.quantity }
        },
        data: {
          stockQuantity: { decrement: item.quantity },
          reservedQuantity: { decrement: item.quantity }
        }
      });

      if (!updated.count) {
        throw new ApiError(409, `Unable to finalize inventory for ${item.productName}.`);
      }
    } else if (item.productId) {
      const productBefore = await tx.product.findUnique({
        where: { id: item.productId }
      });

      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          stockQuantity: { gte: item.quantity },
          reservedQuantity: { gte: item.quantity }
        },
        data: {
          stockQuantity: { decrement: item.quantity },
          reservedQuantity: { decrement: item.quantity }
        }
      });

      if (!updated.count || !productBefore) {
        throw new ApiError(409, `Unable to finalize inventory for ${item.productName}.`);
      }

      await tx.inventoryLog.create({
        data: {
          productId: item.productId,
          orderId: order.id,
          actorId: options.actorId,
          type: InventoryChangeType.DEDUCT,
          quantityChange: -item.quantity,
          previousQuantity: productBefore.stockQuantity,
          newQuantity: productBefore.stockQuantity - item.quantity,
          note: options.note ?? 'Inventory deducted after order confirmation.'
        }
      });
    }
  }

  if (order.couponId) {
    await tx.couponUsage.upsert({
      where: { orderId: order.id },
      create: {
        orderId: order.id,
        couponId: order.couponId,
        userId: order.userId,
        discountAmount: order.discountTotal
      },
      update: {}
    });
  }

  await tx.cartItem.deleteMany({
    where: order.userId
      ? { cart: { userId: order.userId } }
      : { cart: { guestToken: order.guestToken ?? undefined } }
  });

  return tx.order.update({
    where: { id: order.id },
    data: {
      status: options.orderStatus,
      paymentStatus: options.paymentStatus,
      placedAt: new Date(),
      paidAt: options.paymentStatus === PaymentStatus.PAID ? new Date() : undefined,
      razorpayPaymentId: options.paymentId,
      reservationExpiresAt: null,
      statusLogs: {
        create: {
          actorId: options.actorId,
          fromStatus: OrderStatus.PENDING_PAYMENT,
          toStatus: options.orderStatus,
          note: options.note
        }
      }
    }
  });
};

export const finalizeCodOrder = async (orderId: string, owner: CartOwner) => {
  const order = await getAccessibleOrder(orderId, owner);

  if (order.paymentMethod !== PaymentMethod.COD) {
    throw new ApiError(400, 'This order was not created for cash on delivery.');
  }

  return runSerializableTransaction(prisma, async (tx) =>
    finalizeReservedOrderTx(tx, orderId, {
      paymentStatus: PaymentStatus.PENDING,
      orderStatus: OrderStatus.PLACED,
      actorId: owner.userId,
      note: 'COD order placed.'
    })
  );
};

export const finalizeRazorpayOrder = async (
  orderId: string,
  payment: {
    providerOrderId: string;
    providerPaymentId: string;
    providerSignature: string;
    rawPayload: Record<string, string>;
  },
  actorId?: string
) =>
  runSerializableTransaction(prisma, async (tx) => {
    await tx.payment.updateMany({
      where: {
        orderId,
        providerOrderId: payment.providerOrderId
      },
      data: {
        providerPaymentId: payment.providerPaymentId,
        providerSignature: payment.providerSignature,
        rawPayload: payment.rawPayload,
        status: PaymentStatus.PAID,
        verifiedAt: new Date()
      }
    });

    return finalizeReservedOrderTx(tx, orderId, {
      paymentStatus: PaymentStatus.PAID,
      orderStatus: OrderStatus.PLACED,
      paymentId: payment.providerPaymentId,
      actorId,
      note: 'Razorpay payment verified.'
    });
  });

export const getAccessibleOrder = async (orderId: string, owner: CartOwner) => {
  if (!owner.userId && !owner.guestToken) {
    throw new ApiError(401, 'Order access requires authentication or a valid guest session.');
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      ...(owner.userId ? { userId: owner.userId } : { guestToken: owner.guestToken })
    },
    include: {
      items: true
    }
  });

  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  return order;
};

export const restoreOrderInventoryTx = async (
  tx: Prisma.TransactionClient,
  orderId: string,
  actorId?: string
) => {
  const order = await tx.order.findUnique({
    where: { id: orderId },
    include: { items: true }
  });

  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  for (const item of order.items) {
    if (item.productId) {
      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        continue;
      }

      await tx.product.update({
        where: { id: item.productId },
        data: { stockQuantity: product.stockQuantity + item.quantity }
      });

      await tx.inventoryLog.create({
        data: {
          productId: item.productId,
          orderId: order.id,
          actorId,
          type: InventoryChangeType.RESTORE,
          quantityChange: item.quantity,
          previousQuantity: product.stockQuantity,
          newQuantity: product.stockQuantity + item.quantity,
          note: 'Inventory restored after order cancellation.'
        }
      });
    }
  }

  return order;
};
