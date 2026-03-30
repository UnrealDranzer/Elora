import type { NextFunction, Request, Response } from 'express';

import { Role } from '@prisma/client';

import { ApiError } from '@/utils/apiError.js';
import { verifyAccessToken } from '@/utils/tokens.js';

const extractBearerToken = (request: Request) => {
  const header = request.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  return header.split(' ')[1] ?? null;
};

export const requireAuth = (request: Request, _response: Response, next: NextFunction) => {
  const token = extractBearerToken(request);

  if (!token) {
    return next(new ApiError(401, 'Authentication required.'));
  }

  try {
    const payload = verifyAccessToken(token);
    request.auth = {
      userId: payload.sub,
      role: payload.role as Role,
      sessionId: payload.sessionId
    };

    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired access token.'));
  }
};

export const requireRoles = (...roles: Role[]) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (!request.auth) {
      return next(new ApiError(401, 'Authentication required.'));
    }

    if (!roles.includes(request.auth.role)) {
      return next(new ApiError(403, 'You do not have permission to access this resource.'));
    }

    return next();
  };
};

export const requireAdmin = [requireAuth, requireRoles(Role.ADMIN)];

