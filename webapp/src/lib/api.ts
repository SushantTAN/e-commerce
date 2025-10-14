/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Category } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export const fetchProducts = async ({ pageParam = 1, queryKey }: any) => {
  const [_, filters] = queryKey;
  const { data } = await api.get('/products', {
    params: { ...filters, page: pageParam },
  });
  return data;
};

export const login = async (credentials: any) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const getCart = async () => {
  const { data } = await api.get('/orders/cart');
  return data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const { data } = await api.post('/orders/cart/add', { productId, quantity });
  return data;
};

export const checkout = async (cartId: string, shippingAddress: string) => {
  const { data } = await api.post('/orders/checkout', { cartId, shippingAddress });
  return data;
};

export const fetchProductById = async (productId: string) => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get('/orders/my-orders');
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};
