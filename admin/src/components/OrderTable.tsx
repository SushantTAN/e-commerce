import React from 'react';
import type { Order } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
}

const OrderTable = ({ orders, onEdit }: OrderTableProps) => {
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrderMutation.mutate(id);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onEdit(order)}
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                  >
                    <SquarePen />
                  </Button>
                  <Button
                    onClick={() => handleDelete(order.id)}
                    variant="ghost"
                    size="icon"
                    className='text-destructive'
                    disabled={deleteOrderMutation.isLoading}
                  >
                    {deleteOrderMutation.isLoading ? 'Deleting...' : <Trash />}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
