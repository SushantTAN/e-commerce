'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType, AuthState, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
  }, []);

  const login = (data: AuthState) => {
    setAuth(data);
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token || '');
        localStorage.setItem('user', JSON.stringify(data.user));
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
  };

  const isAuthenticated = () => {
    return !!auth.token;
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
