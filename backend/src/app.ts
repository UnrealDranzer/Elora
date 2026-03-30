import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { RequestHandler } from 'express';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { env } from '@/config/env.js';
import { logger } from '@/config/logger.js';
import { errorHandler } from '@/middlewares/errorHandler.js';
import { notFoundHandler } from '@/middlewares/notFound.js';
import { generalRateLimiter } from '@/middlewares/rateLimiters.js';
import { apiRouter } from '@/routes.js';

export const app = express();

app.set('trust proxy', 1);

app.use(
  (pinoHttp as unknown as (options: { logger: typeof logger }) => RequestHandler)({
    logger
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.corsAllowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS origin not allowed.'));
    },
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/api', generalRateLimiter);

app.get('/health', (_request, response) => {
  response.json({
    success: true,
    message: 'Elora API is healthy.',
    data: {
      environment: env.NODE_ENV
    }
  });
});

app.use('/api/v1', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
