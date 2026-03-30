import type { Request, Response } from 'express';

import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { ensureGuestCartCookie, resolveCartOwner } from '../cart/cart.service.js';
import { createRazorpayOrder, verifyRazorpayPayment } from './payments.service.js';

const resolveOwner = (request: Request, response: Response) => {
  const owner = resolveCartOwner(request);

  if (!owner.userId && !owner.guestToken) {
    owner.guestToken = ensureGuestCartCookie(response);
  }

  return owner;
};

export const createRazorpayOrderHandler = catchAsync(async (request: Request, response: Response) => {
  const payment = await createRazorpayOrder(request.body.orderId, resolveOwner(request, response));
  sendSuccess(response, 'Razorpay order created.', { payment }, 201);
});

export const verifyRazorpayPaymentHandler = catchAsync(async (request: Request, response: Response) => {
  const order = await verifyRazorpayPayment(resolveOwner(request, response), request.body);
  sendSuccess(response, 'Payment verified successfully.', { order });
});

