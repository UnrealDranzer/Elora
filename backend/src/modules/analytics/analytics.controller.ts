import type { Request, Response } from 'express';

import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  getAnalyticsSummary,
  getRevenueAnalytics,
  getSalesAnalytics,
  getTopProducts
} from './analytics.service.js';

export const summary = catchAsync(async (_request: Request, response: Response) => {
  const data = await getAnalyticsSummary();
  sendSuccess(response, 'Analytics summary retrieved.', data);
});

export const sales = catchAsync(async (request: Request, response: Response) => {
  const salesData = await getSalesAnalytics(request.query.range as '7d' | '30d' | '90d');
  sendSuccess(response, 'Sales analytics retrieved.', { sales: salesData });
});

export const topProducts = catchAsync(async (request: Request, response: Response) => {
  const products = await getTopProducts(request.query.range as '7d' | '30d' | '90d');
  sendSuccess(response, 'Top products retrieved.', { products });
});

export const revenue = catchAsync(async (request: Request, response: Response) => {
  const data = await getRevenueAnalytics(request.query.range as '7d' | '30d' | '90d');
  sendSuccess(response, 'Revenue analytics retrieved.', data);
});
