import type { Request, Response } from 'express';

import { createAuditLog } from '@/utils/audit.js';
import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { createCategory, listCategories, updateCategory } from './categories.service.js';

export const getCategories = catchAsync(async (request: Request, response: Response) => {
  const activeOnly = (request.query.activeOnly as boolean | undefined) ?? true;
  const categories = await listCategories(activeOnly);
  sendSuccess(response, 'Categories retrieved.', { categories });
});

export const createCategoryHandler = catchAsync(async (request: Request, response: Response) => {
  const category = await createCategory(request.body);
  await createAuditLog(request, {
    action: 'CATEGORY_CREATED',
    entityType: 'category',
    entityId: category.id,
    payload: { name: category.name }
  });
  sendSuccess(response, 'Category created.', { category }, 201);
});

export const updateCategoryHandler = catchAsync(async (request: Request, response: Response) => {
  const category = await updateCategory(request.params.id as string, request.body);
  await createAuditLog(request, {
    action: 'CATEGORY_UPDATED',
    entityType: 'category',
    entityId: category.id,
    payload: { name: category.name }
  });
  sendSuccess(response, 'Category updated.', { category });
});
