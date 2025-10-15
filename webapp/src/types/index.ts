export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface AuthContextType extends AuthState {
  login: (data: AuthState) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  category?: Category; // Associated category object
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{ productId: string; quantity: number }>; // Assuming this structure
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'cart';
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  products: CartItem[];
}
