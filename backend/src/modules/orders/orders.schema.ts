import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

export const orderNumberParamsSchema = z.object({
  orderNumber: z.string().trim().min(4)
});

export const orderIdParamsSchema = z.object({
  id: z.string().cuid()
});

export const adminOrderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  search: z.string().trim().optional(),
  status: z.nativeEnum(OrderStatus).optional()
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  note: z.string().trim().max(500).optional()
});

