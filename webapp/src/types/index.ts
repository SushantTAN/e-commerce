
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
