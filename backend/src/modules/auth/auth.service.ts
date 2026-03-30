import crypto from 'crypto';

import { Role, type User } from '@prisma/client';

import { buildRefreshCookieOptions, customerRefreshCookieName } from '@/config/cookies.js';
import { env } from '@/config/env.js';
import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { comparePassword, hashPassword } from '@/utils/password.js';
import {
  hashToken,
  parseDurationToMs,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '@/utils/tokens.js';

type SessionMeta = {
  ipAddress?: string;
  userAgent?: string;
};

const refreshCookieMaxAgeMs = parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN);

const sanitizeUser = (user: User) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  role: user.role
});

const issueTokens = async (user: User, meta: SessionMeta) => {
  const sessionId = crypto.randomUUID();
  const payload = {
    sub: user.id,
    role: user.role,
    sessionId
  } as const;
  const refreshToken = signRefreshToken(payload);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + refreshCookieMaxAgeMs),
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent
    }
  });

  return {
    accessToken: signAccessToken(payload),
    refreshToken,
    refreshCookieMaxAgeMs
  };
};

export const registerCustomer = async (
  input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  },
  meta: SessionMeta
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() }
  });

  if (existingUser) {
    throw new ApiError(409, 'An account already exists with this email.');
  }

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      passwordHash: await hashPassword(input.password),
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      role: Role.CUSTOMER
    }
  });

  const tokens = await issueTokens(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens
  };
};

export const loginUser = async (
  input: { email: string; password: string },
  requiredRole: Role,
  meta: SessionMeta
) => {
  const user = await prisma.user.findFirst({
    where: {
      email: input.email.toLowerCase(),
      role: requiredRole,
      deletedAt: null
    }
  });

  if (!user || !(await comparePassword(input.password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid credentials.');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'This account is inactive.');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  });

  const tokens = await issueTokens(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens
  };
};

export const rotateSession = async (
  refreshToken: string | undefined,
  expectedRole: Role
) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is missing.');
  }

  const payload = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (!session || session.revokedAt || session.expiresAt <= new Date()) {
    throw new ApiError(401, 'Refresh session is invalid.');
  }

  if (session.user.role !== expectedRole || !session.user.isActive || session.user.deletedAt) {
    throw new ApiError(403, 'This session is no longer valid.');
  }

  if (payload.sub !== session.userId || payload.sessionId !== session.id) {
    throw new ApiError(401, 'Refresh session payload mismatch.');
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { revokedAt: new Date() }
  });

  const tokens = await issueTokens(session.user, {
    ipAddress: session.ipAddress ?? undefined,
    userAgent: session.userAgent ?? undefined
  });

  return {
    user: sanitizeUser(session.user),
    ...tokens
  };
};

export const logoutSession = async (refreshToken?: string) => {
  if (!refreshToken) {
    return;
  }

  const session = await prisma.session.findUnique({
    where: {
      tokenHash: hashToken(refreshToken)
    }
  });

  if (!session) {
    return;
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { revokedAt: new Date() }
  });
};

export const getCurrentUser = async (userId: string, expectedRole?: Role) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
      ...(expectedRole ? { role: expectedRole } : {})
    }
  });

  if (!user || !user.isActive) {
    throw new ApiError(404, 'User not found.');
  }

  return sanitizeUser(user);
};

export const customerRefreshCookie = {
  name: customerRefreshCookieName,
  options: (maxAge: number) => buildRefreshCookieOptions(maxAge)
};

