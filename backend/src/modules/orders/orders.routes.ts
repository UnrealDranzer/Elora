import { Router } from 'express';

import { requireAdmin, requireAuth } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  adminOrderDetails,
  adminOrders,
  adminUpdateOrderStatus,
  myOrders,
  orderDetails,
  trackOrder
} from './orders.controller.js';
import {
  adminOrderQuerySchema,
  orderIdParamsSchema,
  orderNumberParamsSchema,
  updateOrderStatusSchema
} from './orders.schema.js';

export const ordersRouter = Router();
export const adminOrdersRouter = Router();

ordersRouter.get('/track/:orderNumber', validateRequest({ params: orderNumberParamsSchema }), trackOrder);
ordersRouter.get('/my-orders', requireAuth, myOrders);
ordersRouter.get('/:id', validateRequest({ params: orderIdParamsSchema }), orderDetails);

adminOrdersRouter.use(...requireAdmin);
adminOrdersRouter.get('/', validateRequest({ query: adminOrderQuerySchema }), adminOrders);
adminOrdersRouter.get('/:id', validateRequest({ params: orderIdParamsSchema }), adminOrderDetails);
adminOrdersRouter.patch(
  '/:id/status',
  validateRequest({ params: orderIdParamsSchema, body: updateOrderStatusSchema }),
  adminUpdateOrderStatus
);
