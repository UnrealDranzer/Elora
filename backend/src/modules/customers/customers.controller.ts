import type { Request, Response } from 'express';

import { catchAsync } from '@/utils/catchAsync.js';
import { sendSuccess } from '@/utils/responses.js';

import { getCustomerById, listCustomers } from './customers.service.js';

export const getCustomers = catchAsync(async (_request: Request, response: Response) => {
  const customers = await listCustomers();
  sendSuccess(response, 'Customers retrieved.', { customers });
});

export const getCustomer = catchAsync(async (request: Request, response: Response) => {
  const customer = await getCustomerById(request.params.id as string);
  sendSuccess(response, 'Customer retrieved.', { customer });
});
