/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AmountDisplay from '@/components/AmountDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { checkout, getCart } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const CheckoutPage = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated(),
  });

  console.log("cart?.totalAmount", cart?.totalAmount)

  const mutation = useMutation({
    mutationFn: (shippingAddress: string) => checkout(cart.id, shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push('/orders');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const shippingAddress = formData.get('address') as string;
    mutation.mutate(shippingAddress);
  };

  if (isLoading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="container mx-auto py-10">Error loading cart.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <ul>
            {cart?.products?.map((item: any) => (
              <li key={item.productId} className="flex justify-between">
                <span>{item.productId} x {item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold mt-4">Total: <AmountDisplay amount={cart?.totalAmount} /></div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <Input name="address" placeholder="Shipping Address" required />
            <Button type="submit" className="mt-4" disabled={mutation.isPending}>
              {mutation.isPending ? 'Processing...' : 'Confirm Order'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;