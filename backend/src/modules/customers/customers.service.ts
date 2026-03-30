import { Role } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';

export const listCustomers = async () =>
  prisma.user.findMany({
    where: {
      role: Role.CUSTOMER,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' },
    include: {
      orders: {
        select: {
          id: true,
          orderNumber: true,
          total: true,
          status: true,
          createdAt: true
        }
      }
    }
  });

export const getCustomerById = async (id: string) => {
  const customer = await prisma.user.findFirst({
    where: {
      id,
      role: Role.CUSTOMER,
      deletedAt: null
    },
    include: {
      orders: {
        include: {
          items: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!customer) {
    throw new ApiError(404, 'Customer not found.');
  }

  return customer;
};

