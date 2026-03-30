import { BannerPlacement, ContentBlockType } from '@prisma/client';
import { z } from 'zod';

export const bannerIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const contentBlockIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const createBannerSchema = z.object({
  title: z.string().trim().min(2).max(120),
  subtitle: z.string().trim().max(250).optional(),
  imageUrl: z.string().url(),
  mobileImageUrl: z.string().url().optional(),
  ctaLabel: z.string().trim().max(40).optional(),
  ctaHref: z.string().trim().max(250).optional(),
  placement: z.nativeEnum(BannerPlacement),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional()
});

export const updateBannerSchema = createBannerSchema.partial();

export const createContentBlockSchema = z.object({
  type: z.nativeEnum(ContentBlockType),
  title: z.string().trim().min(2).max(120),
  subtitle: z.string().trim().max(250).optional(),
  body: z.string().trim().max(1200).optional(),
  imageUrl: z.string().url().optional(),
  linkLabel: z.string().trim().max(40).optional(),
  linkHref: z.string().trim().max(250).optional(),
  metadata: z.record(z.any()).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional()
});

export const updateContentBlockSchema = createContentBlockSchema.partial();

