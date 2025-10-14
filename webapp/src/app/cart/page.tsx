/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { fetchProductById, getCart } from '@/lib/api';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { data: cart, isLoading: isLoadingCart, isError: isErrorCart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated(),
  });

  const productQueries = useQueries({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queries: (cart?.products || []).map((item: any) => ({
      queryKey: ['product', item.productId],
      queryFn: () => fetchProductById(item.productId),
      enabled: !!cart, // Only fetch product details if cart data is available
    })),
  });

  const isLoadingProducts = productQueries.some((query) => query.isLoading);
  const isErrorProducts = productQueries.some((query) => query.isError);

  if (isLoadingCart || isLoadingProducts) {
    return <div className="container mx-auto py-10">Loading cart...</div>;
  }

  if (isErrorCart || isErrorProducts) {
    return <div className="container mx-auto py-10">Error loading cart or product details.</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItemsWithDetails = (cart?.products || []).map((item: any) => {
    const productDetail = productQueries.find(
      (query) => query.data?.id === item.productId
    )?.data;
    return {
      ...item,
      name: productDetail?.name || 'Unknown Product',
      price: parseFloat(productDetail?.price) || 0,
    };
  });

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleRemoveFromCart = (itemId: string) => {
    // This functionality is not yet implemented in the backend
    // For now, just invalidate the query to refetch the cart
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cartItemsWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItemsWithDetails.map((item: any) => (
              <TableRow key={item.productId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price?.toFixed(2)}</TableCell>
                <TableCell>${(item.price * item.quantity)?.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleRemoveFromCart(item.productId)}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {cartItemsWithDetails.length > 0 && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;