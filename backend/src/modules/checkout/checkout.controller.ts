import type { Request, Response } from 'express';

import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { ensureGuestCartCookie, resolveCartOwner } from '../cart/cart.service.js';
import { createCheckoutOrder, finalizeCodOrder } from './checkout.service.js';

const resolveOwner = (request: Request, response: Response) => {
  const owner = resolveCartOwner(request);

  if (!owner.userId && !owner.guestToken) {
    owner.guestToken = ensureGuestCartCookie(response);
  }

  return owner;
};

export const createCheckout = catchAsync(async (request: Request, response: Response) => {
  const order = await createCheckoutOrder(resolveOwner(request, response), request.body);
  sendSuccess(
    response,
    'Checkout created successfully.',
    {
      order
    },
    201
  );
});

export const placeOrder = catchAsync(async (request: Request, response: Response) => {
  const order = await finalizeCodOrder(request.body.orderId, resolveOwner(request, response));
  sendSuccess(response, 'Order placed successfully.', { order });
});

