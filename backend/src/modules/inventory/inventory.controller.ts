import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { getLowStockProducts, listInventory, updateInventory } from './inventory.service.js';

export const getInventory = catchAsync(async (request: Request, response: Response) => {
  const data = await listInventory(request.query);
  sendSuccess(response, 'Inventory retrieved.', data);
});

export const getLowStock = catchAsync(async (_request: Request, response: Response) => {
  const products = await getLowStockProducts();
  sendSuccess(response, 'Low stock products retrieved.', { products });
});

export const updateInventoryHandler = catchAsync(async (request: Request, response: Response) => {
  const product = await updateInventory(
    request.params.productId as string,
    request.body,
    request.auth?.userId
  );
  await createAuditLog(request, {
    action: 'INVENTORY_UPDATED',
    entityType: 'product',
    entityId: product.id,
    payload: { mode: request.body.mode, quantity: request.body.quantity }
  });
  sendSuccess(response, 'Inventory updated.', { product });
});
