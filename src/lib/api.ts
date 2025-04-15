import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user) {
    config.headers.Authorization = `Bearer ${session.user.id}`;
  }

  return config;
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export const workflowApi = {
  getAll: () => api.get('/workflows'),
  getById: (id: string) => api.get(`/workflows/${id}`),
  create: (data: any) => api.post('/workflows', data),
  update: (id: string, data: any) => api.put(`/workflows/${id}`, data),
  delete: (id: string) => api.delete(`/workflows/${id}`),
  run: (id: string) => api.post(`/workflows/${id}/run`),
};

export const collectionApi = {
  getAll: () => api.get('/collections'),
  getById: (id: string) => api.get(`/collections/${id}`),
  create: (data: any) => api.post('/collections', data),
  update: (id: string, data: any) => api.put(`/collections/${id}`, data),
  delete: (id: string) => api.delete(`/collections/${id}`),
  uploadFile: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/collections/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  scrapeUrl: (id: string, url: string) => api.post(`/collections/${id}/scrape`, { url }),
};

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  getUsage: () => api.get('/user/usage'),
};

export const billingApi = {
  createCheckoutSession: (priceId: string) => api.post('/create-checkout-session', { priceId }),
  getSubscription: () => api.get('/subscription'),
  cancelSubscription: () => api.post('/subscription/cancel'),
};

export default api;
