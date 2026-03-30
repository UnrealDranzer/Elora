import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  adminBanners,
  adminBlocks,
  adminCreateBanner,
  adminCreateBlock,
  adminUpdateBanner,
  adminUpdateBlock,
  publicBanners,
  publicContentBlocks
} from './content.controller.js';
import {
  bannerIdParamsSchema,
  contentBlockIdParamsSchema,
  createBannerSchema,
  createContentBlockSchema,
  updateBannerSchema,
  updateContentBlockSchema
} from './content.schema.js';

export const contentRouter = Router();
export const adminContentRouter = Router();

contentRouter.get('/banners', publicBanners);
contentRouter.get('/blocks', publicContentBlocks);

adminContentRouter.use(...requireAdmin);
adminContentRouter.get('/banners', adminBanners);
adminContentRouter.post('/banners', validateRequest({ body: createBannerSchema }), adminCreateBanner);
adminContentRouter.patch(
  '/banners/:id',
  validateRequest({ params: bannerIdParamsSchema, body: updateBannerSchema }),
  adminUpdateBanner
);
adminContentRouter.get('/blocks', adminBlocks);
adminContentRouter.post('/blocks', validateRequest({ body: createContentBlockSchema }), adminCreateBlock);
adminContentRouter.patch(
  '/blocks/:id',
  validateRequest({ params: contentBlockIdParamsSchema, body: updateContentBlockSchema }),
  adminUpdateBlock
);
