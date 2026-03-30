import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import {
  createCollection,
  listAdminCollections,
  listCollections,
  updateCollection
} from './collections.service.js';

export const getCollections = catchAsync(async (_request: Request, response: Response) => {
  const collections = await listCollections();
  sendSuccess(response, 'Collections retrieved.', { collections });
});

export const getAdminCollections = catchAsync(async (_request: Request, response: Response) => {
  const collections = await listAdminCollections();
  sendSuccess(response, 'Collections retrieved.', { collections });
});

export const createCollectionHandler = catchAsync(async (request: Request, response: Response) => {
  const collection = await createCollection(request.body);
  await createAuditLog(request, {
    action: 'COLLECTION_CREATED',
    entityType: 'collection',
    entityId: collection.id,
    payload: { name: collection.name }
  });
  sendSuccess(response, 'Collection created.', { collection }, 201);
});

export const updateCollectionHandler = catchAsync(async (request: Request, response: Response) => {
  const collection = await updateCollection(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'COLLECTION_UPDATED',
    entityType: 'collection',
    entityId: collection.id,
    payload: { name: collection.name }
  });
  sendSuccess(response, 'Collection updated.', { collection });
});
