import { z } from 'zod';

export const collectionIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const createCollectionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(160).optional(),
  description: z.string().trim().max(400).optional(),
  bannerImageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  productIds: z.array(z.string().cuid()).optional()
});

export const updateCollectionSchema = createCollectionSchema.partial();

