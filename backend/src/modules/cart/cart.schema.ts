import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string().cuid(),
  variantId: z.string().cuid().optional(),
  quantity: z.number().int().min(1).max(20)
});

export const cartItemUpdateSchema = z.object({
  quantity: z.number().int().min(1).max(20)
});

export const cartItemParamsSchema = z.object({
  id: z.string().cuid()
});

