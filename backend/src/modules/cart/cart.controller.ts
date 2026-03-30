import type { Request, Response } from 'express';

import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  addCartItem,
  deleteCartItem,
  ensureGuestCartCookie,
  getCartSummary,
  resolveCartOwner,
  updateCartItem
} from './cart.service.js';

const ensureCartOwner = (request: Request, response: Response) => {
  const owner = resolveCartOwner(request);

  if (!owner.userId && !owner.guestToken) {
    owner.guestToken = ensureGuestCartCookie(response);
  }

  return owner;
};

export const getCart = catchAsync(async (request: Request, response: Response) => {
  const cart = await getCartSummary(ensureCartOwner(request, response));
  sendSuccess(response, 'Cart retrieved.', { cart });
});

export const addItem = catchAsync(async (request: Request, response: Response) => {
  const cart = await addCartItem(ensureCartOwner(request, response), request.body);
  sendSuccess(response, 'Cart item added.', { cart }, 201);
});

export const updateItem = catchAsync(async (request: Request, response: Response) => {
  const cart = await updateCartItem(
    ensureCartOwner(request, response),
    request.params.id as string,
    request.body
  );
  sendSuccess(response, 'Cart item updated.', { cart });
});

export const deleteItem = catchAsync(async (request: Request, response: Response) => {
  const cart = await deleteCartItem(ensureCartOwner(request, response), request.params.id as string);
  sendSuccess(response, 'Cart item removed.', { cart });
});
