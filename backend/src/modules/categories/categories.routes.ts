import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  createCategoryHandler,
  getCategories,
  updateCategoryHandler
} from './categories.controller.js';
import {
  categoryListQuerySchema,
  categoryParamsSchema,
  createCategorySchema,
  updateCategorySchema
} from './categories.schema.js';

export const categoriesRouter = Router();
export const adminCategoriesRouter = Router();

categoriesRouter.get('/', validateRequest({ query: categoryListQuerySchema }), getCategories);

adminCategoriesRouter.use(...requireAdmin);
adminCategoriesRouter.get('/', validateRequest({ query: categoryListQuerySchema }), getCategories);
adminCategoriesRouter.post(
  '/',
  validateRequest({ body: createCategorySchema }),
  createCategoryHandler
);
adminCategoriesRouter.patch(
  '/:id',
  validateRequest({ params: categoryParamsSchema, body: updateCategorySchema }),
  updateCategoryHandler
);
