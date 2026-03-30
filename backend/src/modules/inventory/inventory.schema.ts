import { z } from 'zod';

export const inventoryListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  search: z.string().trim().optional()
});

export const inventoryParamsSchema = z.object({
  productId: z.string().cuid()
});

export const updateInventorySchema = z.object({
  mode: z.enum(['SET', 'ADD', 'DEDUCT']),
  quantity: z.number().int().min(1),
  note: z.string().trim().max(300).optional()
});

