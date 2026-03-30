import crypto from 'crypto';

import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';

import { env } from '@/config/env.js';

export type AccessTokenPayload = {
  sub: string;
  role: 'CUSTOMER' | 'ADMIN';
  sessionId: string;
};

const accessSecret: Secret = env.JWT_ACCESS_SECRET;
const refreshSecret: Secret = env.JWT_REFRESH_SECRET;
const accessExpiresIn = env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'];
const refreshExpiresIn = env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'];

export const signAccessToken = (payload: AccessTokenPayload) =>
  jwt.sign(payload, accessSecret, {
    expiresIn: accessExpiresIn
  });

export const signRefreshToken = (payload: AccessTokenPayload) =>
  jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpiresIn
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, accessSecret) as AccessTokenPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, refreshSecret) as AccessTokenPayload;

export const hashToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex');

const durationUnits: Record<string, number> = {
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000
};

export const parseDurationToMs = (duration: string) => {
  const match = duration.match(/^(\d+)([smhd])$/);

  if (!match) {
    throw new Error(`Unsupported duration format: ${duration}`);
  }

  const [, value, unit] = match;
  return Number(value) * durationUnits[unit];
};
