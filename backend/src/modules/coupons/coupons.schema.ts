import { CouponType } from '@prisma/client';
import { z } from 'zod';

export const couponValidateSchema = z.object({
  code: z.string().trim().min(2).max(64),
  subtotal: z.number().nonnegative(),
  userId: z.string().cuid().optional()
});

export const couponIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const createCouponSchema = z.object({
  code: z.string().trim().min(2).max(64),
  description: z.string().trim().max(255).optional(),
  type: z.nativeEnum(CouponType),
  value: z.number().positive(),
  minOrderValue: z.number().nonnegative().optional(),
  maxDiscount: z.number().positive().optional(),
  usageLimit: z.number().int().min(1).optional(),
  perUserLimit: z.number().int().min(1).optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
  isActive: z.boolean().optional()
});

export const updateCouponSchema = createCouponSchema.partial();

