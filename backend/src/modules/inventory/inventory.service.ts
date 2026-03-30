import { InventoryChangeType, Prisma } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { resolvePagination } from '@/utils/pagination.js';

export const listInventory = async (query: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const pagination = resolvePagination(query.page, query.limit);
  const where: Prisma.ProductWhereInput = {
    deletedAt: null,
    ...(query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' } },
            { sku: { contains: query.search, mode: 'insensitive' } }
          ]
        }
      : {})
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: [{ stockQuantity: 'asc' }, { updatedAt: 'desc' }],
      include: {
        category: true,
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          take: 1
        }
      }
    }),
    prisma.product.count({ where })
  ]);

  return {
    items: products.map((product) => ({
      ...product,
      availableStock: Math.max(product.stockQuantity - product.reservedQuantity, 0),
      isLowStock: product.stockQuantity <= product.lowStockThreshold
    })),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit)
    }
  };
};

export const getLowStockProducts = async () =>
  (await prisma.product.findMany({
    where: {
      deletedAt: null
    },
    orderBy: { stockQuantity: 'asc' },
    include: {
      category: true,
      images: {
        orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
        take: 1
      }
    }
  })).filter((product) => product.stockQuantity <= product.lowStockThreshold);

export const updateInventory = async (
  productId: string,
  input: {
    mode: 'SET' | 'ADD' | 'DEDUCT';
    quantity: number;
    note?: string;
  },
  actorId?: string
) =>
  prisma.$transaction(
    async (tx) => {
      const product = await tx.product.findFirst({
        where: { id: productId, deletedAt: null }
      });

      if (!product) {
        throw new ApiError(404, 'Product not found.');
      }

      let newQuantity = product.stockQuantity;
      let changeType: InventoryChangeType = InventoryChangeType.MANUAL_SET;
      let quantityChange = input.quantity;

      if (input.mode === 'SET') {
        newQuantity = input.quantity;
        quantityChange = input.quantity - product.stockQuantity;
      }

      if (input.mode === 'ADD') {
        newQuantity = product.stockQuantity + input.quantity;
        changeType = InventoryChangeType.ADD;
      }

      if (input.mode === 'DEDUCT') {
        if (product.stockQuantity - product.reservedQuantity < input.quantity) {
          throw new ApiError(409, 'Cannot deduct more than available stock.');
        }

        newQuantity = product.stockQuantity - input.quantity;
        quantityChange = -input.quantity;
        changeType = InventoryChangeType.DEDUCT;
      }

      if (newQuantity < product.reservedQuantity) {
        throw new ApiError(409, 'Stock cannot be set below currently reserved units.');
      }

      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { stockQuantity: newQuantity }
      });

      await tx.inventoryLog.create({
        data: {
          productId,
          actorId,
          type: changeType,
          quantityChange,
          previousQuantity: product.stockQuantity,
          newQuantity,
          note: input.note
        }
      });

      return updatedProduct;
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    }
  );
