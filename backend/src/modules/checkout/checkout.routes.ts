import { Router } from 'express';

import { paymentRateLimiter } from '@/middlewares/rateLimiters.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { createCheckout, placeOrder } from './checkout.controller.js';
import { checkoutCreateSchema, placeOrderSchema } from './checkout.schema.js';

export const checkoutRouter = Router();

checkoutRouter.post('/create', paymentRateLimiter, validateRequest({ body: checkoutCreateSchema }), createCheckout);
checkoutRouter.post('/place-order', paymentRateLimiter, validateRequest({ body: placeOrderSchema }), placeOrder);
