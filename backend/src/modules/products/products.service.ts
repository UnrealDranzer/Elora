import { InventoryChangeType, Prisma, ProductStatus } from '@prisma/client';

import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { resolvePagination } from '@/utils/pagination.js';
import { slugify } from '@/utils/slugify.js';

const publicProductSelect = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  shortDescription: true,
  price: true,
  compareAtPrice: true,
  currency: true,
  stockQuantity: true,
  reservedQuantity: true,
  isFeatured: true,
  isBestSeller: true,
  isNewArrival: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  images: {
    orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
    select: {
      url: true,
      altText: true,
      isPrimary: true
    }
  }
} satisfies Prisma.ProductSelect;

const normalizeProductCard = <
  T extends {
    stockQuantity: number;
    reservedQuantity: number;
  }
>(
  product: T
) => ({
  ...product,
  availableStock: Math.max(product.stockQuantity - product.reservedQuantity, 0)
});

const resolveProductSort = (sort = 'newest') => {
  switch (sort) {
    case 'price_asc':
      return [{ price: 'asc' as const }];
    case 'price_desc':
      return [{ price: 'desc' as const }];
    case 'best_sellers':
      return [{ isBestSeller: 'desc' as const }, { createdAt: 'desc' as const }];
    case 'newest':
    default:
      return [{ publishedAt: 'desc' as const }, { createdAt: 'desc' as const }];
  }
};

const resolveUniqueProductSlug = async (nameOrSlug: string, existingId?: string) => {
  const base = slugify(nameOrSlug);
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: {
        slug: candidate,
        ...(existingId ? { NOT: { id: existingId } } : {})
      }
    });

    if (!existing) {
      return candidate;
    }

    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
};

export const listProducts = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const pagination = resolvePagination(query.page, query.limit);
  const where: Prisma.ProductWhereInput = {
    deletedAt: null,
    status: ProductStatus.PUBLISHED,
    ...(query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' } },
            { shortDescription: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } }
          ]
        }
      : {}),
    ...(query.category
      ? {
          category: {
            slug: query.category
          }
        }
      : {}),
    ...(query.minPrice || query.maxPrice
      ? {
          price: {
            ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
            ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {})
          }
        }
      : {})
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: resolveProductSort(query.sort),
      select: publicProductSelect
    }),
    prisma.product.count({ where })
  ]);

  return {
    items: products.map(normalizeProductCard),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit)
    }
  };
};

export const listFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      deletedAt: null,
      status: ProductStatus.PUBLISHED,
      OR: [{ isFeatured: true }, { isBestSeller: true }, { isNewArrival: true }]
    },
    take: 12,
    orderBy: [{ isFeatured: 'desc' }, { isBestSeller: 'desc' }, { createdAt: 'desc' }],
    select: publicProductSelect
  });

  return products.map(normalizeProductCard);
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      deletedAt: null,
      status: ProductStatus.PUBLISHED
    },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      },
      images: {
        orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }]
      }
    }
  });

  if (!product) {
    throw new ApiError(404, 'Product not found.');
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      categoryId: product.categoryId,
      deletedAt: null,
      status: ProductStatus.PUBLISHED
    },
    take: 4,
    orderBy: [{ isBestSeller: 'desc' }, { createdAt: 'desc' }],
    select: publicProductSelect
  });

  return {
    ...normalizeProductCard(product),
    relatedProducts: relatedProducts.map(normalizeProductCard)
  };
};

export const listAdminProducts = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProductStatus;
  includeDeleted?: boolean;
}) => {
  const pagination = resolvePagination(query.page, query.limit);
  const where: Prisma.ProductWhereInput = {
    ...(query.includeDeleted ? {} : { deletedAt: null }),
    ...(query.status ? { status: query.status } : {}),
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
      orderBy: { updatedAt: 'desc' },
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
    items: products.map(normalizeProductCard),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit)
    }
  };
};

export const createProduct = async (input: {
  categoryId: string;
  name: string;
  slug?: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  benefits?: string;
  howToUse?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  status: ProductStatus;
  seoTitle?: string;
  seoDescription?: string;
  images?: Array<{
    url: string;
    altText?: string;
    cloudinaryPublicId?: string;
    isPrimary?: boolean;
    sortOrder?: number;
  }>;
}) => {
  const category = await prisma.category.findFirst({
    where: { id: input.categoryId, deletedAt: null, isActive: true }
  });

  if (!category) {
    throw new ApiError(404, 'Category not found.');
  }

  const skuExists = await prisma.product.findFirst({
    where: { sku: input.sku }
  });

  if (skuExists) {
    throw new ApiError(409, 'A product with this SKU already exists.');
  }

  const slug = await resolveUniqueProductSlug(input.slug ?? input.name);

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        ...input,
        slug,
        publishedAt: input.status === ProductStatus.PUBLISHED ? new Date() : null,
        images: input.images
          ? {
              create: input.images.map((image, index) => ({
                ...image,
                sortOrder: image.sortOrder ?? index,
                isPrimary: image.isPrimary ?? index === 0
              }))
            }
          : undefined
      },
      include: {
        category: true,
        images: true
      }
    });

    if (input.stockQuantity > 0) {
      await tx.inventoryLog.create({
        data: {
          productId: product.id,
          type: InventoryChangeType.ADD,
          quantityChange: input.stockQuantity,
          previousQuantity: 0,
          newQuantity: input.stockQuantity,
          note: 'Initial stock added during product creation.'
        }
      });
    }

    return product;
  });
};

export const updateProduct = async (
  id: string,
  input: Partial<{
    categoryId: string;
    name: string;
    slug?: string;
    sku: string;
    shortDescription?: string;
    description?: string;
    ingredients?: string;
    benefits?: string;
    howToUse?: string;
    price: number;
    compareAtPrice?: number;
    costPrice?: number;
    stockQuantity: number;
    lowStockThreshold: number;
    isFeatured: boolean;
    isBestSeller: boolean;
    isNewArrival: boolean;
    status: ProductStatus;
    seoTitle?: string;
    seoDescription?: string;
    images?: Array<{
      url: string;
      altText?: string;
      cloudinaryPublicId?: string;
      isPrimary?: boolean;
      sortOrder?: number;
    }>;
  }>
) => {
  const existing = await prisma.product.findFirst({
    where: { id }
  });

  if (!existing || existing.deletedAt) {
    throw new ApiError(404, 'Product not found.');
  }

  if (input.categoryId) {
    const category = await prisma.category.findFirst({
      where: { id: input.categoryId, deletedAt: null }
    });

    if (!category) {
      throw new ApiError(404, 'Category not found.');
    }
  }

  if (input.sku && input.sku !== existing.sku) {
    const skuExists = await prisma.product.findFirst({
      where: { sku: input.sku, NOT: { id } }
    });

    if (skuExists) {
      throw new ApiError(409, 'A product with this SKU already exists.');
    }
  }

  return prisma.$transaction(async (tx) => {
    const { images, categoryId, ...rest } = input;

    const product = await tx.product.update({
      where: { id },
      data: {
        ...rest,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
        ...(input.slug || input.name
          ? {
              slug: await resolveUniqueProductSlug(input.slug ?? input.name ?? existing.name, id)
            }
          : {}),
        ...(input.status
          ? {
              publishedAt:
                input.status === ProductStatus.PUBLISHED && !existing.publishedAt
                  ? new Date()
                  : existing.publishedAt
            }
          : {})
      }
    });

    if (images) {
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productImage.createMany({
        data: images.map((image, index) => ({
          productId: id,
          url: image.url,
          altText: image.altText,
          cloudinaryPublicId: image.cloudinaryPublicId,
          sortOrder: image.sortOrder ?? index,
          isPrimary: image.isPrimary ?? index === 0
        }))
      });
    }

    return tx.product.findUniqueOrThrow({
      where: { id },
      include: {
        category: true,
        images: true
      }
    });
  });
};

export const softDeleteProduct = async (id: string) => {
  const existing = await prisma.product.findFirst({
    where: { id, deletedAt: null }
  });

  if (!existing) {
    throw new ApiError(404, 'Product not found.');
  }

  return prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: ProductStatus.ARCHIVED
    }
  });
};
