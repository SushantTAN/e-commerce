'use client';

import AmountDisplay from '@/components/AmountDisplay';
import { StatusChip } from '@/components/StatusChip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { fetchMyOrders } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
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
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='border-gray-500'>
              {/* <TableHead>Order ID</TableHead> */}
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
                {/* <TableCell>{order.id}</TableCell> */}
                <TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD hh:mm A')}</TableCell>
                <TableCell><AmountDisplay amount={order.totalAmount} /></TableCell>
                <TableCell><StatusChip status={order.status} label={order.status} /></TableCell>
                <TableCell className='capitalize'>{order.shippingAddress}</TableCell>
                <TableCell>
                  <ul className='flex gap-2 flex-wrap'>
                    {order.products.map((product: any) => (
                      <li key={product.productId} className='rounded-full bg-blue-100 border border-blue-200 text-blue-950 px-2 py-1 text-xs'>
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
