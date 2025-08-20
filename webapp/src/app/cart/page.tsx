"use client";

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CartPage = () => {
  const queryClient = useQueryClient();
  const { data: items = [] } = useQuery({ queryKey: ['cart'], queryFn: () => [], enabled: false });

  const handleRemoveFromCart = (itemId: string) => {
    const cart: any = queryClient.getQueryData(['cart']) || [];
    queryClient.setQueryData(['cart'], cart.filter((item: any) => item.id !== itemId));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CartPage;