import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { slugify } from '@/utils/slugify.js';

const uniqueSlug = async (value: string, excludeId?: string) => {
  const base = slugify(value);
  let candidate = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.collection.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {})
      }
    });

    if (!existing) {
      return candidate;
    }

    counter += 1;
    candidate = `${base}-${counter}`;
  }
};

export const listCollections = async () =>
  prisma.collection.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
      products: {
        include: {
          product: {
            include: {
              images: {
                orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
                take: 1
              }
            }
          }
        },
        take: 8,
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

export const listAdminCollections = async () =>
  prisma.collection.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  });

export const createCollection = async (input: {
  name: string;
  slug?: string;
  description?: string;
  bannerImageUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
  productIds?: string[];
}) =>
  prisma.collection.create({
    data: {
      name: input.name,
      slug: await uniqueSlug(input.slug ?? input.name),
      description: input.description,
      bannerImageUrl: input.bannerImageUrl,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0,
      products: input.productIds
        ? {
            create: input.productIds.map((productId, index) => ({
              productId,
              sortOrder: index
            }))
          }
        : undefined
    },
    include: {
      products: true
    }
  });

export const updateCollection = async (
  id: string,
  input: Partial<{
    name: string;
    slug?: string;
    description?: string;
    bannerImageUrl?: string;
    isActive?: boolean;
    sortOrder?: number;
    productIds?: string[];
  }>
) => {
  const existing = await prisma.collection.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new ApiError(404, 'Collection not found.');
  }

  return prisma.$transaction(async (tx) => {
    if (input.productIds) {
      await tx.collectionProduct.deleteMany({
        where: { collectionId: id }
      });
    }

    return tx.collection.update({
      where: { id },
      data: {
        name: input.name,
        slug:
          input.slug || input.name
            ? await uniqueSlug(input.slug ?? input.name ?? existing.name, id)
            : undefined,
        description: input.description,
        bannerImageUrl: input.bannerImageUrl,
        isActive: input.isActive,
        sortOrder: input.sortOrder,
        products: input.productIds
          ? {
              create: input.productIds.map((productId, index) => ({
                productId,
                sortOrder: index
              }))
            }
          : undefined
      },
      include: {
        products: true
      }
    });
  });
};

