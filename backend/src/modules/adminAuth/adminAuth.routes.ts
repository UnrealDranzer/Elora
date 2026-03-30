import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { authRateLimiter } from '@/middlewares/rateLimiters.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { loginSchema } from '../auth/auth.schema.js';
import { adminLogin, adminLogout, adminMe, adminRefresh } from './adminAuth.controller.js';

export const adminAuthRouter = Router();

adminAuthRouter.post('/login', authRateLimiter, validateRequest({ body: loginSchema }), adminLogin);
adminAuthRouter.post('/refresh', authRateLimiter, adminRefresh);
adminAuthRouter.post('/logout', adminLogout);
adminAuthRouter.get('/me', requireAdmin, adminMe);
