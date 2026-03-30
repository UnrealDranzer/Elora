import type { NextFunction, Request, Response } from 'express';

import { Prisma } from '@prisma/client';
import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = pkg;
import { ZodError } from 'zod';

import { env } from '@/config/env.js';
import { logger } from '@/config/logger.js';
import { ApiError } from '@/utils/apiError.js';

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  logger.error(error);

  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.details ? [error.details] : []
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: error.flatten().fieldErrors
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const message =
      error.code === 'P2002'
        ? 'A record with the provided value already exists.'
        : 'Database operation failed.';

    return response.status(400).json({
      success: false,
      message,
      errors: env.NODE_ENV === 'development' ? [error.message] : []
    });
  }

  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return response.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      errors: []
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error.',
    errors: env.NODE_ENV === 'development' && error instanceof Error ? [error.message] : []
  });
};
