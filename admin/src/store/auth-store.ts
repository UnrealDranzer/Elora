import { create } from 'zustand';

import { api } from '@/lib/api';

type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN';
};

type AuthState = {
  user: AdminUser | null;
  accessToken: string | null;
  isReady: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  logoutLocal: () => void;
};

export const adminAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isReady: false,
  login: async (input) => {
    const response = await api.post('/admin/auth/login', input);
    set({
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      isReady: true
    });
  },
  refresh: async () => {
    const response = await api.post('/admin/auth/refresh');
    set({
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      isReady: true
    });
  },
  logout: async () => {
    await api.post('/admin/auth/logout');
    set({ user: null, accessToken: null, isReady: true });
  },
  logoutLocal: () => set({ user: null, accessToken: null, isReady: true })
}));

export const initializeAdminAuth = async () => {
  try {
    await adminAuthStore.getState().refresh();
  } catch {
    adminAuthStore.setState({ isReady: true });
  }
};

