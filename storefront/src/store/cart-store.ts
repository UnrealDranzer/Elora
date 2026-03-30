import { create } from 'zustand';

import { api } from '@/lib/api';

export type CartItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    primaryImage: string | null;
    availableStock: number;
  };
};

export type Cart = {
  id: string | null;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
};

type CartState = {
  cart: Cart;
  isHydrated: boolean;
  setCart: (cart: Cart) => void;
  fetchCart: () => Promise<void>;
  addItem: (payload: { productId: string; quantity: number; variantId?: string }) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

const emptyCart: Cart = {
  id: null,
  items: [],
  subtotal: 0,
  itemCount: 0
};

export const cartStore = create<CartState>((set) => ({
  cart: emptyCart,
  isHydrated: false,
  setCart: (cart) => set({ cart, isHydrated: true }),
  fetchCart: async () => {
    const response = await api.get('/cart');
    set({ cart: response.data.data.cart, isHydrated: true });
  },
  addItem: async (payload) => {
    const response = await api.post('/cart/items', payload);
    set({ cart: response.data.data.cart });
  },
  updateItem: async (id, quantity) => {
    const response = await api.patch(`/cart/items/${id}`, { quantity });
    set({ cart: response.data.data.cart });
  },
  removeItem: async (id) => {
    const response = await api.delete(`/cart/items/${id}`);
    set({ cart: response.data.data.cart });
  }
}));

export const hydrateCart = async () => {
  try {
    await cartStore.getState().fetchCart();
  } catch {
    cartStore.setState({ isHydrated: true });
  }
};
