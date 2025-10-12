'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/lib/api';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated(), // Only fetch cart if authenticated
  });

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsOpen(false);
  };

  const cartItemCount =
    cart?.products?.reduce((sum: number, item: any) => sum + item.quantity, 0) ||
    0;

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          Mero<span className='text-primary'>Commerce</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/products">Products</Link>

          {isAuthenticated() ? (
            <>
              <Link href="/cart" className="relative">
                Cart ({cartItemCount})
              </Link>
              <Link href="/orders">Orders</Link>
              <Link href="/profile">Welcome, {user?.firstName}</Link>
              <Button onClick={handleLogout} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-md">
          <div className="flex flex-col space-y-3 p-4">
            <Link href="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>

            {isAuthenticated() ? (
              <>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  Cart ({cartItemCount})
                </Link>
                <Link href="/orders" onClick={() => setIsOpen(false)}>
                  Orders
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  Welcome, {user?.firstName}
                </Link>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild size="sm" className="w-full justify-center">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            )}

            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
