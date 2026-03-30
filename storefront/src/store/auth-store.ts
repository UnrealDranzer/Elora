import { create } from 'zustand';

import { api } from '@/lib/api';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: 'CUSTOMER' | 'ADMIN';
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isReady: boolean;
  setSession: (payload: { user: User; accessToken: string }) => void;
  login: (input: { email: string; password: string }) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  logoutLocal: () => void;
};

export const authStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isReady: false,
  setSession: ({ user, accessToken }) => set({ user, accessToken, isReady: true }),
  login: async (input) => {
    const response = await api.post('/auth/login', input);
    set({
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      isReady: true
    });
  },
  refresh: async () => {
    const response = await api.post('/auth/refresh');
    set({
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      isReady: true
    });
  },
  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null, accessToken: null, isReady: true });
  },
  logoutLocal: () => set({ user: null, accessToken: null, isReady: true })
}));

export const initializeAuth = async () => {
  try {
    await authStore.getState().refresh();
  } catch {
    authStore.setState({ isReady: true });
  }
};

