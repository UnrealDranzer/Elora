import type { Request, Response } from 'express';

import { Role } from '@prisma/client';

import {
  buildRefreshCookieOptions,
  clearCookieOptions,
  customerRefreshCookieName
} from '@/config/cookies.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  getCurrentUser,
  loginUser,
  logoutSession,
  registerCustomer,
  rotateSession
} from './auth.service.js';

const requestMeta = (request: Request) => ({
  ipAddress: request.ip,
  userAgent: request.get('user-agent') ?? undefined
});

export const register = catchAsync(async (request: Request, response: Response) => {
  const result = await registerCustomer(request.body, requestMeta(request));

  response.cookie(
    customerRefreshCookieName,
    result.refreshToken,
    buildRefreshCookieOptions(result.refreshCookieMaxAgeMs)
  );

  sendSuccess(
    response,
    'Customer account created successfully.',
    {
      accessToken: result.accessToken,
      user: result.user
    },
    201
  );
});

export const login = catchAsync(async (request: Request, response: Response) => {
  const result = await loginUser(request.body, Role.CUSTOMER, requestMeta(request));

  response.cookie(
    customerRefreshCookieName,
    result.refreshToken,
    buildRefreshCookieOptions(result.refreshCookieMaxAgeMs)
  );

  sendSuccess(response, 'Login successful.', {
    accessToken: result.accessToken,
    user: result.user
  });
});

export const refresh = catchAsync(async (request: Request, response: Response) => {
  const result = await rotateSession(request.cookies[customerRefreshCookieName], Role.CUSTOMER);

  response.cookie(
    customerRefreshCookieName,
    result.refreshToken,
    buildRefreshCookieOptions(result.refreshCookieMaxAgeMs)
  );

  sendSuccess(response, 'Session refreshed.', {
    accessToken: result.accessToken,
    user: result.user
  });
});

export const logout = catchAsync(async (request: Request, response: Response) => {
  await logoutSession(request.cookies[customerRefreshCookieName]);
  response.clearCookie(customerRefreshCookieName, clearCookieOptions);
  sendSuccess(response, 'Logout successful.', {});
});

export const me = catchAsync(async (request: Request, response: Response) => {
  const user = await getCurrentUser(request.auth!.userId, Role.CUSTOMER);
  sendSuccess(response, 'Authenticated customer retrieved.', { user });
});
