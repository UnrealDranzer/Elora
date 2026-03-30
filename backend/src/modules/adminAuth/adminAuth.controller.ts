import type { Request, Response } from 'express';

import { Role } from '@prisma/client';

import {
  adminRefreshCookieName,
  buildRefreshCookieOptions,
  clearCookieOptions
} from '@/config/cookies.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { getCurrentUser, loginUser, logoutSession, rotateSession } from '../auth/auth.service.js';

const requestMeta = (request: Request) => ({
  ipAddress: request.ip,
  userAgent: request.get('user-agent') ?? undefined
});

export const adminLogin = catchAsync(async (request: Request, response: Response) => {
  const result = await loginUser(request.body, Role.ADMIN, requestMeta(request));

  response.cookie(
    adminRefreshCookieName,
    result.refreshToken,
    buildRefreshCookieOptions(result.refreshCookieMaxAgeMs)
  );

  sendSuccess(response, 'Admin login successful.', {
    accessToken: result.accessToken,
    user: result.user
  });
});

export const adminRefresh = catchAsync(async (request: Request, response: Response) => {
  const result = await rotateSession(request.cookies[adminRefreshCookieName], Role.ADMIN);

  response.cookie(
    adminRefreshCookieName,
    result.refreshToken,
    buildRefreshCookieOptions(result.refreshCookieMaxAgeMs)
  );

  sendSuccess(response, 'Admin session refreshed.', {
    accessToken: result.accessToken,
    user: result.user
  });
});

export const adminLogout = catchAsync(async (request: Request, response: Response) => {
  await logoutSession(request.cookies[adminRefreshCookieName]);
  response.clearCookie(adminRefreshCookieName, clearCookieOptions);
  sendSuccess(response, 'Admin logout successful.', {});
});

export const adminMe = catchAsync(async (request: Request, response: Response) => {
  const user = await getCurrentUser(request.auth!.userId, Role.ADMIN);
  sendSuccess(response, 'Authenticated admin retrieved.', { user });
});
