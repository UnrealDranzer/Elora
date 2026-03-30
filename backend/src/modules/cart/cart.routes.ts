import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { addItem, deleteItem, getCart, updateItem } from './cart.controller.js';
import { cartItemParamsSchema, cartItemSchema, cartItemUpdateSchema } from './cart.schema.js';

export const cartRouter = Router();

cartRouter.get('/', getCart);
cartRouter.post('/items', validateRequest({ body: cartItemSchema }), addItem);
cartRouter.patch(
  '/items/:id',
  validateRequest({ params: cartItemParamsSchema, body: cartItemUpdateSchema }),
  updateItem
);
cartRouter.delete('/items/:id', validateRequest({ params: cartItemParamsSchema }), deleteItem);

export const myCartRouter = Router();
myCartRouter.use(requireAuth);
