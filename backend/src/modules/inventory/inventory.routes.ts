import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { getInventory, getLowStock, updateInventoryHandler } from './inventory.controller.js';
import {
  inventoryListQuerySchema,
  inventoryParamsSchema,
  updateInventorySchema
} from './inventory.schema.js';

export const inventoryRouter = Router();

inventoryRouter.use(...requireAdmin);
inventoryRouter.get('/', validateRequest({ query: inventoryListQuerySchema }), getInventory);
inventoryRouter.get('/low-stock', getLowStock);
inventoryRouter.patch(
  '/:productId',
  validateRequest({ params: inventoryParamsSchema, body: updateInventorySchema }),
  updateInventoryHandler
);
