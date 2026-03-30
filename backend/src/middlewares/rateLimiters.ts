import rateLimit from 'express-rate-limit';

import { env } from '@/config/env.js';

const baseConfig = {
  standardHeaders: true,
  legacyHeaders: false,
  windowMs: env.RATE_LIMIT_WINDOW_MS
};

export const generalRateLimiter = rateLimit({
  ...baseConfig,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    errors: []
  }
});

export const authRateLimiter = rateLimit({
  ...baseConfig,
  max: env.AUTH_RATE_LIMIT_MAX,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    errors: []
  }
});

export const paymentRateLimiter = rateLimit({
  ...baseConfig,
  max: env.PAYMENT_RATE_LIMIT_MAX,
  message: {
    success: false,
    message: 'Too many payment attempts. Please try again later.',
    errors: []
  }
});

