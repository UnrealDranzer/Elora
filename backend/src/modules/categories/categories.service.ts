import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';
import { slugify } from '@/utils/slugify.js';

const resolveUniqueCategorySlug = async (baseValue: string, existingId?: string) => {
  const base = slugify(baseValue);
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await prisma.category.findFirst({
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

export const listCategories = async (activeOnly = true) =>
  prisma.category.findMany({
    where: {
      deletedAt: null,
      ...(activeOnly ? { isActive: true } : {})
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
  });

export const createCategory = async (input: {
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
  parentId?: string;
}) => {
  if (input.parentId) {
    const parent = await prisma.category.findFirst({
      where: { id: input.parentId, deletedAt: null }
    });

    if (!parent) {
      throw new ApiError(404, 'Parent category not found.');
    }
  }

  return prisma.category.create({
    data: {
      ...input,
      slug: await resolveUniqueCategorySlug(input.slug ?? input.name)
    }
  });
};

export const updateCategory = async (
  id: string,
  input: {
    name?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
    sortOrder?: number;
    parentId?: string;
  }
) => {
  const existing = await prisma.category.findFirst({
    where: { id, deletedAt: null }
  });

  if (!existing) {
    throw new ApiError(404, 'Category not found.');
  }

  return prisma.category.update({
    where: { id },
    data: {
      ...input,
      ...(input.slug || input.name
        ? { slug: await resolveUniqueCategorySlug(input.slug ?? input.name ?? existing.name, id) }
        : {})
    }
  });
};

