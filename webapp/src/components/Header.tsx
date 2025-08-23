'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/lib/api';

const Header = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated(), // Only fetch cart if authenticated
  });

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const cartItemCount = cart?.products?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">MeroCommerce</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/products">
            Products
          </Link>
          {isAuthenticated() ? (
            <>
              <Link href="/cart" className="relative">
                Cart ({cartItemCount})
              </Link>
              <Link href="/orders">
                Orders
              </Link>
              <Link href="/profile">
                Welcome, {user?.firstName}
              </Link>
              <Button onClick={handleLogout} size="sm">Logout</Button>
            </>
          ) : (
            <Button asChild size="sm">
                <Link href="/login">
                Login
                </Link>
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;