import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { uploadImage } from './uploads.service.js';

export const uploadImageHandler = catchAsync(async (request: Request, response: Response) => {
  const asset = await uploadImage(request.file, request.query.folder as 'products' | 'banners');
  await createAuditLog(request, {
    action: 'ASSET_UPLOADED',
    entityType: 'upload',
    entityId: asset.publicId,
    payload: { folder: request.query.folder }
  });
  sendSuccess(response, 'Image uploaded successfully.', { asset }, 201);
});

