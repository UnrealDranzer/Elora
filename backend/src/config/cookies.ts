import type { CookieOptions } from 'express';

import { env } from './env.js';

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: env.isProduction ? 'none' : 'lax',
  secure: env.isProduction,
  domain: env.isProduction ? env.COOKIE_DOMAIN : undefined,
  path: '/'
};

export const customerRefreshCookieName = 'elora_customer_refresh';
export const adminRefreshCookieName = 'elora_admin_refresh';
export const guestCartCookieName = 'elora_cart_token';
export const guestCartCookieMaxAgeMs = 30 * 24 * 60 * 60 * 1000;

export const buildRefreshCookieOptions = (maxAgeMs: number): CookieOptions => ({
  ...baseCookieOptions,
  maxAge: maxAgeMs
});

export const clearCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 0
};

export const guestCartCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: guestCartCookieMaxAgeMs
};
