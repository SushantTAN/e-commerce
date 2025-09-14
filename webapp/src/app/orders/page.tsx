'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyOrders } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['myOrders'],
    queryFn: fetchMyOrders,
    enabled: isAuthenticated(),
  });

  if (isLoading) {
    return <div className="container mx-auto py-10">Loading orders...</div>;
  }

  if (isError) {
    return <div className="container mx-auto py-10">Error loading orders.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>
                  <ul>
                    {order.products.map((product: any) => (
                      <li key={product.productId}>
                        {product.productId} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrdersPage;
