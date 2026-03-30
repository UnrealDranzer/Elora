import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import {
  createCollectionHandler,
  getAdminCollections,
  getCollections,
  updateCollectionHandler
} from './collections.controller.js';
import {
  collectionIdParamsSchema,
  createCollectionSchema,
  updateCollectionSchema
} from './collections.schema.js';

export const collectionsRouter = Router();
export const adminCollectionsRouter = Router();

collectionsRouter.get('/', getCollections);

adminCollectionsRouter.use(...requireAdmin);
adminCollectionsRouter.get('/', getAdminCollections);
adminCollectionsRouter.post('/', validateRequest({ body: createCollectionSchema }), createCollectionHandler);
adminCollectionsRouter.patch(
  '/:id',
  validateRequest({ params: collectionIdParamsSchema, body: updateCollectionSchema }),
  updateCollectionHandler
);
