import { Router } from 'express';

import { paymentRateLimiter } from '@/middlewares/rateLimiters.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  createRazorpayOrderHandler,
  verifyRazorpayPaymentHandler
} from './payments.controller.js';
import { razorpayOrderSchema, razorpayVerifySchema } from './payments.schema.js';

export const paymentsRouter = Router();

paymentsRouter.post(
  '/razorpay/create-order',
  paymentRateLimiter,
  validateRequest({ body: razorpayOrderSchema }),
  createRazorpayOrderHandler
);
paymentsRouter.post(
  '/razorpay/verify',
  paymentRateLimiter,
  validateRequest({ body: razorpayVerifySchema }),
  verifyRazorpayPaymentHandler
);
