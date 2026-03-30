import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  APP_NAME: z.string().default('Elora API'),
  APP_URL: z.string().default('http://localhost:8080'),
  STORE_FRONTEND_URL: z.string().default('http://localhost:5173'),
  ADMIN_FRONTEND_URL: z.string().default('http://localhost:5174'),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:5173,http://localhost:5174'),
  COOKIE_DOMAIN: z.string().default(''),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(200),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
  PAYMENT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(25),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  RAZORPAY_KEY_ID: z.string().min(1),
  RAZORPAY_KEY_SECRET: z.string().min(1),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  DEFAULT_CURRENCY: z.string().default('INR'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors;
  console.error('❌ Missing or invalid environment variables:');
  for (const [key, msgs] of Object.entries(errors)) {
    console.error(`   ${key}: ${(msgs as string[]).join(', ')}`);
  }
  throw new Error('Server cannot start — fix the environment variables listed above.');
}

const rawEnv = parsed.data;

export const env = {
  ...rawEnv,
  isProduction: rawEnv.NODE_ENV === 'production',
  corsAllowedOrigins: rawEnv.CORS_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
};

