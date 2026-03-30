import axios from 'axios';
import { toast } from 'sonner';

import { authStore } from '@/store/auth-store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await authStore.getState().refresh();
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        authStore.getState().logoutLocal();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
