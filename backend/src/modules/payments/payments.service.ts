import crypto from 'crypto';

import { PaymentMethod, PaymentStatus } from '@prisma/client';
import Razorpay from 'razorpay';

import { env } from '@/config/env.js';
import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';

import type { CartOwner } from '../cart/cart.service.js';
import {
  finalizeRazorpayOrder,
  getAccessibleOrder,
  releaseExpiredReservations
} from '../checkout/checkout.service.js';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET
});

const secureCompare = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const createRazorpayOrder = async (orderId: string, owner: CartOwner) => {
  await releaseExpiredReservations();

  const order = await getAccessibleOrder(orderId, owner);

  if (order.paymentMethod !== PaymentMethod.RAZORPAY) {
    throw new ApiError(400, 'This order is not configured for Razorpay payment.');
  }

  if (order.paymentStatus === PaymentStatus.PAID) {
    throw new ApiError(400, 'This order has already been paid.');
  }

  if (order.reservationExpiresAt && order.reservationExpiresAt < new Date()) {
    throw new ApiError(409, 'Checkout session expired. Please try again.');
  }

  if (order.razorpayOrderId) {
    return {
      orderId: order.id,
      razorpayOrderId: order.razorpayOrderId,
      amount: Math.round(Number(order.total) * 100),
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID
    };
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(Number(order.total) * 100),
    currency: order.currency,
    receipt: order.orderNumber,
    notes: {
      orderId: order.id
    }
  });

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id }
    });

    await tx.payment.create({
      data: {
        orderId: order.id,
        provider: 'razorpay',
        providerOrderId: razorpayOrder.id,
        amount: order.total,
        currency: order.currency,
        status: PaymentStatus.PENDING,
        method: PaymentMethod.RAZORPAY
      }
    });
  });

  return {
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: env.RAZORPAY_KEY_ID
  };
};

export const verifyRazorpayPayment = async (
  owner: CartOwner,
  payload: {
    orderId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) => {
  const order = await getAccessibleOrder(payload.orderId, owner);

  if (!order.razorpayOrderId || order.razorpayOrderId !== payload.razorpay_order_id) {
    throw new ApiError(400, 'Razorpay order reference mismatch.');
  }

  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${payload.razorpay_order_id}|${payload.razorpay_payment_id}`)
    .digest('hex');

  if (!secureCompare(generatedSignature, payload.razorpay_signature)) {
    throw new ApiError(400, 'Razorpay signature verification failed.');
  }

  const finalizedOrder = await finalizeRazorpayOrder(
    order.id,
    {
      providerOrderId: payload.razorpay_order_id,
      providerPaymentId: payload.razorpay_payment_id,
      providerSignature: payload.razorpay_signature,
      rawPayload: payload
    },
    owner.userId
  );

  return finalizedOrder;
};
