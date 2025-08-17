import axios from 'axios';
import type { Product, User, Order } from '../types';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') as string).token}`;
  }
  return req;
});

export const getProducts = () => API.get<Product[]>('/products');
export const createProduct = (product: Omit<Product, 'id'>) => API.post<Product>('/products', product);
export const updateProduct = (id: string, product: Omit<Product, 'id'>) => API.put<Product>(`/products/${id}`, product);
export const deleteProduct = (id: string) => API.delete<void>(`/products/${id}`);

export const login = (formData: any) => API.post<{ result: User, token: string }>('/auth/login', formData);
export const register = (formData: any) => API.post<{ result: User, token: string }>('/auth/register', formData);

// Order API calls
export const getOrders = () => API.get<Order[]>('/orders');
export const getOrderById = (id: string) => API.get<Order>(`/orders/${id}`);
export const createOrder = (order: Omit<Order, 'id'>) => API.post<Order>('/orders', order);
export const updateOrder = (id: string, order: Omit<Order, 'id'>) => API.put<Order>(`/orders/${id}`, order);
export const deleteOrder = (id: string) => API.delete<void>(`/orders/${id}`);
