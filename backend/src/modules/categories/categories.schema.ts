import { z } from 'zod';

export const categoryListQuerySchema = z.object({
  activeOnly: z.coerce.boolean().optional()
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(160).optional(),
  description: z.string().trim().max(500).optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  parentId: z.string().cuid().optional()
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryParamsSchema = z.object({
  id: z.string().cuid()
});

