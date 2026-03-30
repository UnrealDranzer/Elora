import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { revenue, sales, summary, topProducts } from './analytics.controller.js';
import { analyticsRangeQuerySchema } from './analytics.schema.js';

export const analyticsRouter = Router();

analyticsRouter.use(...requireAdmin);
analyticsRouter.get('/summary', summary);
analyticsRouter.get('/sales', validateRequest({ query: analyticsRangeQuerySchema }), sales);
analyticsRouter.get('/top-products', validateRequest({ query: analyticsRangeQuerySchema }), topProducts);
analyticsRouter.get('/revenue', validateRequest({ query: analyticsRangeQuerySchema }), revenue);
