import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  createProductHandler,
  deleteProductHandler,
  getAdminProducts,
  getFeaturedProducts,
  getProductDetails,
  getProducts,
  updateProductHandler
} from './products.controller.js';
import {
  adminProductQuerySchema,
  createProductSchema,
  productIdParamsSchema,
  productListQuerySchema,
  productSlugParamsSchema,
  updateProductSchema
} from './products.schema.js';

export const productsRouter = Router();
export const adminProductsRouter = Router();

productsRouter.get('/', validateRequest({ query: productListQuerySchema }), getProducts);
productsRouter.get('/featured', getFeaturedProducts);
productsRouter.get('/:slug', validateRequest({ params: productSlugParamsSchema }), getProductDetails);

adminProductsRouter.use(...requireAdmin);
adminProductsRouter.get('/', validateRequest({ query: adminProductQuerySchema }), getAdminProducts);
adminProductsRouter.post('/', validateRequest({ body: createProductSchema }), createProductHandler);
adminProductsRouter.patch(
  '/:id',
  validateRequest({ params: productIdParamsSchema, body: updateProductSchema }),
  updateProductHandler
);
adminProductsRouter.delete(
  '/:id',
  validateRequest({ params: productIdParamsSchema }),
  deleteProductHandler
);
