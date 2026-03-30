import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { resolveCartOwner } from '../cart/cart.service.js';
import {
  getAdminOrder,
  getMyOrders,
  getOrderDetails,
  listAdminOrders,
  trackOrderByNumber,
  updateAdminOrderStatus
} from './orders.service.js';

export const trackOrder = catchAsync(async (request: Request, response: Response) => {
  const order = await trackOrderByNumber(request.params.orderNumber as string);
  sendSuccess(response, 'Order tracking details retrieved.', { order });
});

export const myOrders = catchAsync(async (request: Request, response: Response) => {
  const orders = await getMyOrders(request.auth!.userId);
  sendSuccess(response, 'Customer orders retrieved.', { orders });
});

export const orderDetails = catchAsync(async (request: Request, response: Response) => {
  const order = await getOrderDetails(request.params.id as string, resolveCartOwner(request));
  sendSuccess(response, 'Order details retrieved.', { order });
});

export const adminOrders = catchAsync(async (request: Request, response: Response) => {
  const data = await listAdminOrders(request.query);
  sendSuccess(response, 'Orders retrieved.', data);
});

export const adminOrderDetails = catchAsync(async (request: Request, response: Response) => {
  const order = await getAdminOrder(request.params.id as string);
  sendSuccess(response, 'Order details retrieved.', { order });
});

export const adminUpdateOrderStatus = catchAsync(async (request: Request, response: Response) => {
  const order = await updateAdminOrderStatus(
    request.params.id as string,
    request.body.status,
    request.auth?.userId,
    request.body.note
  );
  await createAuditLog(request, {
    action: 'ORDER_STATUS_UPDATED',
    entityType: 'order',
    entityId: order.id,
    payload: { status: request.body.status }
  });
  sendSuccess(response, 'Order status updated.', { order });
});
