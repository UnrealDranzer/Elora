import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters.')
  .regex(/[A-Z]/, 'Password must include an uppercase letter.')
  .regex(/[a-z]/, 'Password must include a lowercase letter.')
  .regex(/[0-9]/, 'Password must include a number.');

export const registerSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(1).max(60),
  phone: z.string().trim().min(8).max(20).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

