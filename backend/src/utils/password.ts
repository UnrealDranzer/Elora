import bcrypt from 'bcryptjs';

import { env } from '@/config/env.js';

export const hashPassword = async (value: string) =>
  bcrypt.hash(value, env.BCRYPT_SALT_ROUNDS);

export const comparePassword = async (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue);

