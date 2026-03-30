import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  createProduct,
  getProductBySlug,
  listAdminProducts,
  listFeaturedProducts,
  listProducts,
  softDeleteProduct,
  updateProduct
} from './products.service.js';

export const getProducts = catchAsync(async (request: Request, response: Response) => {
  const data = await listProducts(request.query);
  sendSuccess(response, 'Products retrieved.', data);
});

export const getFeaturedProducts = catchAsync(async (_request: Request, response: Response) => {
  const products = await listFeaturedProducts();
  sendSuccess(response, 'Featured products retrieved.', { products });
});

export const getProductDetails = catchAsync(async (request: Request, response: Response) => {
  const product = await getProductBySlug(request.params.slug as string);
  sendSuccess(response, 'Product details retrieved.', { product });
});

export const getAdminProducts = catchAsync(async (request: Request, response: Response) => {
  const data = await listAdminProducts(request.query);
  sendSuccess(response, 'Admin products retrieved.', data);
});

export const createProductHandler = catchAsync(async (request: Request, response: Response) => {
  const product = await createProduct(request.body);
  await createAuditLog(request, {
    action: 'PRODUCT_CREATED',
    entityType: 'product',
    entityId: product.id,
    payload: { name: product.name, sku: product.sku }
  });
  sendSuccess(response, 'Product created.', { product }, 201);
});

export const updateProductHandler = catchAsync(async (request: Request, response: Response) => {
  const product = await updateProduct(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'PRODUCT_UPDATED',
    entityType: 'product',
    entityId: product.id,
    payload: { name: product.name, sku: product.sku }
  });
  sendSuccess(response, 'Product updated.', { product });
});

export const deleteProductHandler = catchAsync(async (request: Request, response: Response) => {
  const product = await softDeleteProduct(request.params.id as string);
  await createAuditLog(request, {
    action: 'PRODUCT_DELETED',
    entityType: 'product',
    entityId: product.id,
    payload: { name: product.name, sku: product.sku }
  });
  sendSuccess(response, 'Product archived.', { product });
});
