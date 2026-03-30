import { z } from 'zod';

export const razorpayOrderSchema = z.object({
  orderId: z.string().cuid()
});

export const razorpayVerifySchema = z.object({
  orderId: z.string().cuid(),
  razorpay_order_id: z.string().min(4),
  razorpay_payment_id: z.string().min(4),
  razorpay_signature: z.string().min(4)
});

