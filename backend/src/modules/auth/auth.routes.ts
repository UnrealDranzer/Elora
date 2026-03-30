import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth.js';
import { authRateLimiter } from '@/middlewares/rateLimiters.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { login, logout, me, refresh, register } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.schema.js';

export const authRouter = Router();

authRouter.post('/register', authRateLimiter, validateRequest({ body: registerSchema }), register);
authRouter.post('/login', authRateLimiter, validateRequest({ body: loginSchema }), login);
authRouter.post('/refresh', authRateLimiter, refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', requireAuth, me);

