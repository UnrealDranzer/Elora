import crypto from 'crypto';

import { ProductStatus } from '@prisma/client';

import {
  guestCartCookieName,
  guestCartCookieOptions
} from '@/config/cookies.js';
import { prisma } from '@/config/prisma.js';
import { ApiError } from '@/utils/apiError.js';

export type CartOwner = {
  userId?: string;
  guestToken?: string;
};

const buildCartSummary = (cart: Awaited<ReturnType<typeof getCartWithItems>>) => {
  const items = cart?.items.map((item) => {
    const unitPrice = Number(item.variant?.price ?? item.product.price);
    const availableStock =
      item.variant
        ? Math.max(item.variant.stockQuantity - item.variant.reservedQuantity, 0)
        : Math.max(item.product.stockQuantity - item.product.reservedQuantity, 0);

    return {
      id: item.id,
      quantity: item.quantity,
      unitPrice,
      lineTotal: Number((unitPrice * item.quantity).toFixed(2)),
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        sku: item.product.sku,
        primaryImage: item.product.images[0]?.url ?? null,
        availableStock
      },
      variant: item.variant
        ? {
            id: item.variant.id,
            name: item.variant.name
          }
        : null
    };
  }) ?? [];

  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

  return {
    id: cart?.id ?? null,
    items,
    subtotal,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };
};

export const resolveCartOwner = (request: { auth?: { userId: string }; cookies: Record<string, string> }) => {
  if (request.auth?.userId) {
    return { userId: request.auth.userId } satisfies CartOwner;
  }

  const guestToken = request.cookies[guestCartCookieName];

  return guestToken ? ({ guestToken } satisfies CartOwner) : ({} satisfies CartOwner);
};

export const ensureGuestCartCookie = (
  response: { cookie: (name: string, value: string, options: object) => void },
  existingToken?: string
) => {
  const token = existingToken ?? crypto.randomUUID();
  response.cookie(guestCartCookieName, token, guestCartCookieOptions);
  return token;
};

export const getOrCreateCart = async (owner: CartOwner) => {
  const existingCart = await prisma.cart.findFirst({
    where: owner.userId ? { userId: owner.userId } : { guestToken: owner.guestToken }
  });

  if (existingCart) {
    return existingCart;
  }

  if (owner.userId) {
    return prisma.cart.create({
      data: {
        userId: owner.userId
      }
    });
  }

  if (!owner.guestToken) {
    throw new ApiError(400, 'Guest cart token is missing.');
  }

  return prisma.cart.create({
    data: {
      guestToken: owner.guestToken
    }
  });
};

const getCartWithItems = async (cartId: string) =>
  prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
                take: 1
              }
            }
          },
          variant: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

export const getCartSummary = async (owner: CartOwner) => {
  const cart = await getOrCreateCart(owner);
  const withItems = await getCartWithItems(cart.id);
  return buildCartSummary(withItems);
};

export const addCartItem = async (
  owner: CartOwner,
  input: { productId: string; variantId?: string; quantity: number }
) => {
  const cart = await getOrCreateCart(owner);
  const product = await prisma.product.findFirst({
    where: {
      id: input.productId,
      deletedAt: null,
      status: ProductStatus.PUBLISHED
    },
    include: {
      variants: true
    }
  });

  if (!product) {
    throw new ApiError(404, 'Product not found.');
  }

  const variant = input.variantId
    ? product.variants.find((item) => item.id === input.variantId)
    : null;

  const availableStock = variant
    ? Math.max(variant.stockQuantity - variant.reservedQuantity, 0)
    : Math.max(product.stockQuantity - product.reservedQuantity, 0);

  if (availableStock < input.quantity) {
    throw new ApiError(409, 'Requested quantity is not available.');
  }

  const existing = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: input.productId,
      variantId: input.variantId ?? null
    }
  });

  const nextQuantity = (existing?.quantity ?? 0) + input.quantity;

  if (availableStock < nextQuantity) {
    throw new ApiError(409, 'Requested quantity exceeds available stock.');
  }

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: nextQuantity
      }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: input.productId,
        variantId: input.variantId ?? undefined,
        quantity: input.quantity
      }
    });
  }

  return getCartSummary(owner);
};

export const updateCartItem = async (
  owner: CartOwner,
  itemId: string,
  input: { quantity: number }
) => {
  const cart = await getOrCreateCart(owner);
  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
    include: {
      product: true,
      variant: true
    }
  });

  if (!item) {
    throw new ApiError(404, 'Cart item not found.');
  }

  const availableStock = item.variant
    ? Math.max(item.variant.stockQuantity - item.variant.reservedQuantity, 0)
    : Math.max(item.product.stockQuantity - item.product.reservedQuantity, 0);

  if (availableStock < input.quantity) {
    throw new ApiError(409, 'Requested quantity exceeds available stock.');
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity: input.quantity }
  });

  return getCartSummary(owner);
};

export const deleteCartItem = async (owner: CartOwner, itemId: string) => {
  const cart = await getOrCreateCart(owner);
  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id }
  });

  if (!item) {
    throw new ApiError(404, 'Cart item not found.');
  }

  await prisma.cartItem.delete({
    where: { id: itemId }
  });

  return getCartSummary(owner);
};
