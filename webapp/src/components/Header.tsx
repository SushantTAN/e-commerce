"use client";

import React from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '@/lib/api';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const fetchUser = async () => {
  const { data } = await API.get('/users/profile');
  return data;
};

const Header = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries({ queryKey: ['user'] });
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-xl font-bold">WebApp</p>
        </Link>
        <nav className="flex items-center">
          <Link href="/products">
            <p className="mr-4">Products</p>
          </Link>
          <Link href="/cart">
            <p className="mr-4">Cart</p>
          </Link>
          {user && (
            <>
              <Link href="/orders">
                <p className="mr-4">Orders</p>
              </Link>
              <Link href="/profile">
                <p className="mr-4">Profile</p>
              </Link>
              <Button onClick={handleLogout} className="mr-4">Logout</Button>
            </>
          )}
          {!user && !isLoading && (
            <Link href="/login">
              <p className="mr-4">Login</p>
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;