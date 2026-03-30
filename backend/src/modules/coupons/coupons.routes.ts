import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  createCouponHandler,
  deleteCouponHandler,
  getCoupons,
  updateCouponHandler,
  validateCoupon
} from './coupons.controller.js';
import {
  couponIdParamsSchema,
  couponValidateSchema,
  createCouponSchema,
  updateCouponSchema
} from './coupons.schema.js';

export const couponsRouter = Router();
export const adminCouponsRouter = Router();

couponsRouter.post('/validate', validateRequest({ body: couponValidateSchema }), validateCoupon);

adminCouponsRouter.use(...requireAdmin);
adminCouponsRouter.get('/', getCoupons);
adminCouponsRouter.post('/', validateRequest({ body: createCouponSchema }), createCouponHandler);
adminCouponsRouter.patch(
  '/:id',
  validateRequest({ params: couponIdParamsSchema, body: updateCouponSchema }),
  updateCouponHandler
);
adminCouponsRouter.delete(
  '/:id',
  validateRequest({ params: couponIdParamsSchema }),
  deleteCouponHandler
);
