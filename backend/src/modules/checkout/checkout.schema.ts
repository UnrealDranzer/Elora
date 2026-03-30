import { PaymentMethod } from '@prisma/client';
import { z } from 'zod';

const addressSchema = z.object({
  line1: z.string().trim().min(3).max(120),
  line2: z.string().trim().max(120).optional(),
  landmark: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  postalCode: z.string().trim().min(4).max(12),
  country: z.string().trim().min(2).max(80)
});

export const checkoutCreateSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().email(),
  customerPhone: z.string().trim().min(8).max(20),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  couponCode: z.string().trim().max(64).optional(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  notes: z.string().trim().max(500).optional()
});

export const placeOrderSchema = z.object({
  orderId: z.string().cuid()
});

