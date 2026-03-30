import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  createBanner,
  createContentBlock,
  getAdminBanners,
  getAdminContentBlocks,
  getContentBlocks,
  getPublicBanners,
  updateBanner,
  updateContentBlock
} from './content.service.js';

export const publicBanners = catchAsync(async (_request: Request, response: Response) => {
  const banners = await getPublicBanners();
  sendSuccess(response, 'Banners retrieved.', { banners });
});

export const publicContentBlocks = catchAsync(async (_request: Request, response: Response) => {
  const blocks = await getContentBlocks();
  sendSuccess(response, 'Content blocks retrieved.', { blocks });
});

export const adminBanners = catchAsync(async (_request: Request, response: Response) => {
  const banners = await getAdminBanners();
  sendSuccess(response, 'Banners retrieved.', { banners });
});

export const adminCreateBanner = catchAsync(async (request: Request, response: Response) => {
  const banner = await createBanner(request.body);
  await createAuditLog(request, {
    action: 'BANNER_CREATED',
    entityType: 'banner',
    entityId: banner.id,
    payload: { title: banner.title }
  });
  sendSuccess(response, 'Banner created.', { banner }, 201);
});

export const adminUpdateBanner = catchAsync(async (request: Request, response: Response) => {
  const banner = await updateBanner(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'BANNER_UPDATED',
    entityType: 'banner',
    entityId: banner.id,
    payload: { title: banner.title }
  });
  sendSuccess(response, 'Banner updated.', { banner });
});

export const adminBlocks = catchAsync(async (_request: Request, response: Response) => {
  const blocks = await getAdminContentBlocks();
  sendSuccess(response, 'Content blocks retrieved.', { blocks });
});

export const adminCreateBlock = catchAsync(async (request: Request, response: Response) => {
  const block = await createContentBlock(request.body);
  await createAuditLog(request, {
    action: 'CONTENT_BLOCK_CREATED',
    entityType: 'contentBlock',
    entityId: block.id,
    payload: { title: block.title }
  });
  sendSuccess(response, 'Content block created.', { block }, 201);
});

export const adminUpdateBlock = catchAsync(async (request: Request, response: Response) => {
  const block = await updateContentBlock(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'CONTENT_BLOCK_UPDATED',
    entityType: 'contentBlock',
    entityId: block.id,
    payload: { title: block.title }
  });
  sendSuccess(response, 'Content block updated.', { block });
});
