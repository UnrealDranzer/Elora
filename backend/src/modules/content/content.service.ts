import type { Prisma } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';

export const getPublicBanners = async () =>
  prisma.banner.findMany({
    where: {
      isActive: true,
      OR: [{ startsAt: null }, { startsAt: { lte: new Date() } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] }]
    },
    orderBy: [{ placement: 'asc' }, { sortOrder: 'asc' }]
  });

export const getContentBlocks = async () =>
  prisma.contentBlock.findMany({
    where: { isActive: true },
    orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }]
  });

export const getAdminBanners = async () =>
  prisma.banner.findMany({
    orderBy: [{ placement: 'asc' }, { sortOrder: 'asc' }]
  });

export const createBanner = async (input: {
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  placement: 'HERO' | 'PROMO' | 'COLLECTION' | 'FEATURED';
  isActive?: boolean;
  sortOrder?: number;
  startsAt?: string;
  endsAt?: string;
}) =>
  prisma.banner.create({
    data: {
      ...input,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0,
      startsAt: input.startsAt ? new Date(input.startsAt) : undefined,
      endsAt: input.endsAt ? new Date(input.endsAt) : undefined
    }
  });

export const updateBanner = async (id: string, input: Record<string, unknown>) => {
  const banner = await prisma.banner.findUnique({
    where: { id }
  });

  if (!banner) {
    throw new ApiError(404, 'Banner not found.');
  }

  return prisma.banner.update({
    where: { id },
    data: {
      ...(input as Prisma.BannerUpdateInput),
      ...(typeof input.startsAt === 'string' ? { startsAt: new Date(input.startsAt) } : {}),
      ...(typeof input.endsAt === 'string' ? { endsAt: new Date(input.endsAt) } : {})
    }
  });
};

export const getAdminContentBlocks = async () =>
  prisma.contentBlock.findMany({
    orderBy: [{ type: 'asc' }, { sortOrder: 'asc' }]
  });

export const createContentBlock = async (input: {
  type: 'TRUST' | 'TESTIMONIAL' | 'PROMO' | 'BRAND';
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  linkLabel?: string;
  linkHref?: string;
  metadata?: Record<string, unknown>;
  isActive?: boolean;
  sortOrder?: number;
}) =>
  prisma.contentBlock.create({
    data: {
      ...input,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0,
      metadata: input.metadata as Prisma.InputJsonValue | undefined
    }
  });

export const updateContentBlock = async (id: string, input: Record<string, unknown>) => {
  const block = await prisma.contentBlock.findUnique({
    where: { id }
  });

  if (!block) {
    throw new ApiError(404, 'Content block not found.');
  }

  return prisma.contentBlock.update({
    where: { id },
    data: input as Prisma.ContentBlockUpdateInput
  });
};
