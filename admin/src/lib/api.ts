import axios from 'axios';
import { toast } from 'sonner';

import { adminAuthStore } from '@/store/auth-store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = adminAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && !refreshing) {
      originalRequest._retry = true;
      refreshing = true;
      try {
        await adminAuthStore.getState().refresh();
        refreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        refreshing = false;
        adminAuthStore.getState().logoutLocal();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
