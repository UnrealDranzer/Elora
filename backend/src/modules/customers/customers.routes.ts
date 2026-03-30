import { Router } from 'express';

import { requireAdmin } from '@/middlewares/auth.js';
import { validateRequest } from '@/middlewares/validateRequest.js';

import { getCustomer, getCustomers } from './customers.controller.js';
import { customerIdParamsSchema } from './customers.schema.js';

export const customersRouter = Router();

customersRouter.use(...requireAdmin);
customersRouter.get('/', getCustomers);
customersRouter.get('/:id', validateRequest({ params: customerIdParamsSchema }), getCustomer);
