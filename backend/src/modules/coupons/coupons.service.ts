import { CouponType } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';

const normalizeCode = (value: string) => value.trim().toUpperCase();

export const calculateDiscountAmount = (coupon: {
  type: CouponType;
  value: number;
  maxDiscount?: number | null;
}, subtotal: number) => {
  const rawDiscount =
    coupon.type === CouponType.PERCENTAGE
      ? (subtotal * coupon.value) / 100
      : coupon.value;

  const cappedDiscount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
  return Math.min(Number(cappedDiscount.toFixed(2)), subtotal);
};

export const getValidCoupon = async (input: {
  code: string;
  subtotal: number;
  userId?: string;
}) => {
  const coupon = await prisma.coupon.findFirst({
    where: {
      code: normalizeCode(input.code),
      deletedAt: null,
      isActive: true
    },
    include: {
      usages: true
    }
  });

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found.');
  }

  const now = new Date();

  if (coupon.startsAt && coupon.startsAt > now) {
    throw new ApiError(400, 'Coupon is not active yet.');
  }

  if (coupon.endsAt && coupon.endsAt < now) {
    throw new ApiError(400, 'Coupon has expired.');
  }

  if (coupon.minOrderValue && input.subtotal < Number(coupon.minOrderValue)) {
    throw new ApiError(400, 'Order subtotal does not meet the coupon minimum.');
  }

  if (coupon.usageLimit && coupon.usages.length >= coupon.usageLimit) {
    throw new ApiError(400, 'Coupon usage limit has been reached.');
  }

  if (coupon.perUserLimit && input.userId) {
    const userUsageCount = coupon.usages.filter((usage) => usage.userId === input.userId).length;

    if (userUsageCount >= coupon.perUserLimit) {
      throw new ApiError(400, 'Coupon usage limit reached for this customer.');
    }
  }

  const discountAmount = calculateDiscountAmount(
    {
      type: coupon.type,
      value: Number(coupon.value),
      maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount) : null
    },
    input.subtotal
  );

  return {
    coupon,
    discountAmount
  };
};

export const listCoupons = async () =>
  prisma.coupon.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });

export const createCoupon = async (input: {
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  perUserLimit?: number;
  startsAt?: string;
  endsAt?: string;
  isActive?: boolean;
}) => {
  const code = normalizeCode(input.code);
  const existing = await prisma.coupon.findUnique({ where: { code } });

  if (existing && !existing.deletedAt) {
    throw new ApiError(409, 'Coupon code already exists.');
  }

  return prisma.coupon.upsert({
    where: { code },
    create: {
      code,
      description: input.description,
      type: input.type,
      value: input.value,
      minOrderValue: input.minOrderValue,
      maxDiscount: input.maxDiscount,
      usageLimit: input.usageLimit,
      perUserLimit: input.perUserLimit,
      startsAt: input.startsAt ? new Date(input.startsAt) : undefined,
      endsAt: input.endsAt ? new Date(input.endsAt) : undefined,
      isActive: input.isActive ?? true
    },
    update: {
      deletedAt: null,
      description: input.description,
      type: input.type,
      value: input.value,
      minOrderValue: input.minOrderValue,
      maxDiscount: input.maxDiscount,
      usageLimit: input.usageLimit,
      perUserLimit: input.perUserLimit,
      startsAt: input.startsAt ? new Date(input.startsAt) : undefined,
      endsAt: input.endsAt ? new Date(input.endsAt) : undefined,
      isActive: input.isActive ?? true
    }
  });
};

export const updateCoupon = async (
  id: string,
  input: Partial<{
    code: string;
    description?: string;
    type: CouponType;
    value: number;
    minOrderValue?: number;
    maxDiscount?: number;
    usageLimit?: number;
    perUserLimit?: number;
    startsAt?: string;
    endsAt?: string;
    isActive?: boolean;
  }>
) => {
  const coupon = await prisma.coupon.findFirst({
    where: { id, deletedAt: null }
  });

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found.');
  }

  return prisma.coupon.update({
    where: { id },
    data: {
      ...(input.code ? { code: normalizeCode(input.code) } : {}),
      description: input.description,
      type: input.type,
      value: input.value,
      minOrderValue: input.minOrderValue,
      maxDiscount: input.maxDiscount,
      usageLimit: input.usageLimit,
      perUserLimit: input.perUserLimit,
      startsAt: input.startsAt ? new Date(input.startsAt) : undefined,
      endsAt: input.endsAt ? new Date(input.endsAt) : undefined,
      isActive: input.isActive
    }
  });
};

export const deleteCoupon = async (id: string) => {
  const coupon = await prisma.coupon.findFirst({
    where: { id, deletedAt: null }
  });

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found.');
  }

  return prisma.coupon.update({
    where: { id },
    data: { deletedAt: new Date(), isActive: false }
  });
};

