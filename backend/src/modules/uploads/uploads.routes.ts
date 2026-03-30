import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { imageUpload } from '@/middlewares/upload.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { uploadImageHandler } from './uploads.controller.js';
import { uploadQuerySchema } from './uploads.schema.js';

export const uploadsRouter = Router();

uploadsRouter.use(...requireAdmin);
uploadsRouter.post(
  '/image',
  validateRequest({ query: uploadQuerySchema }),
  imageUpload.single('file'),
  uploadImageHandler
);
