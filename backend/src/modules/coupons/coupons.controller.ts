import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  createCoupon,
  deleteCoupon,
  getValidCoupon,
  listCoupons,
  updateCoupon
} from './coupons.service.js';

export const validateCoupon = catchAsync(async (request: Request, response: Response) => {
  const result = await getValidCoupon(request.body);
  sendSuccess(response, 'Coupon is valid.', {
    coupon: result.coupon,
    discountAmount: result.discountAmount
  });
});

export const getCoupons = catchAsync(async (_request: Request, response: Response) => {
  const coupons = await listCoupons();
  sendSuccess(response, 'Coupons retrieved.', { coupons });
});

export const createCouponHandler = catchAsync(async (request: Request, response: Response) => {
  const coupon = await createCoupon(request.body);
  await createAuditLog(request, {
    action: 'COUPON_CREATED',
    entityType: 'coupon',
    entityId: coupon.id,
    payload: { code: coupon.code }
  });
  sendSuccess(response, 'Coupon created.', { coupon }, 201);
});

export const updateCouponHandler = catchAsync(async (request: Request, response: Response) => {
  const coupon = await updateCoupon(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'COUPON_UPDATED',
    entityType: 'coupon',
    entityId: coupon.id,
    payload: { code: coupon.code }
  });
  sendSuccess(response, 'Coupon updated.', { coupon });
});

export const deleteCouponHandler = catchAsync(async (request: Request, response: Response) => {
  const coupon = await deleteCoupon(request.params.id as string);
  await createAuditLog(request, {
    action: 'COUPON_DELETED',
    entityType: 'coupon',
    entityId: coupon.id,
    payload: { code: coupon.code }
  });
  sendSuccess(response, 'Coupon deleted.', { coupon });
});
