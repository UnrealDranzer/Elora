import { ProductStatus } from '@prisma/client';
import { z } from 'zod';

const productImageSchema = z.object({
  url: z.string().url(),
  altText: z.string().max(180).optional(),
  cloudinaryPublicId: z.string().optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional()
});

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  sort: z
    .enum(['newest', 'price_asc', 'price_desc', 'best_sellers'])
    .optional()
    .default('newest')
});

export const productSlugParamsSchema = z.object({
  slug: z.string().trim().min(2)
});

export const productIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const adminProductQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  search: z.string().trim().optional(),
  status: z.nativeEnum(ProductStatus).optional(),
  includeDeleted: z.coerce.boolean().optional()
});

export const createProductSchema = z.object({
  categoryId: z.string().cuid(),
  name: z.string().trim().min(2).max(180),
  slug: z.string().trim().min(2).max(180).optional(),
  sku: z.string().trim().min(3).max(80),
  shortDescription: z.string().trim().max(250).optional(),
  description: z.string().trim().max(5000).optional(),
  ingredients: z.string().trim().max(3000).optional(),
  benefits: z.string().trim().max(3000).optional(),
  howToUse: z.string().trim().max(3000).optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  stockQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  images: z.array(productImageSchema).max(10).optional()
});

export const updateProductSchema = createProductSchema.partial();
