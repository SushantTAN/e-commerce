import React, { useState } from 'react';
import OrderTable from '../components/OrderTable';
import OrderModal from '../components/OrderModal';
import { getOrders, createOrder, updateOrder } from '../services/api';
import type { Order } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const OrderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const queryClient = useQueryClient();

  const { data: orders, isLoading, isError } = useQuery<Order[]>({
    queryKey: ['orders'], queryFn: async () => {
      const response = await getOrders();
      return response.data;
    }
  });

  const addOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsModalOpen(false);
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, order }: { id: string; order: Omit<Order, 'id'> }) => updateOrder(id, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsModalOpen(false);
      setEditingOrder(null);
    },
  });

  const handleOpenAddModal = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (order: Order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleSubmit = (order: Omit<Order, 'id'> | Order) => {
    if ('id' in order) {
      updateOrderMutation.mutate({ id: order.id, order });
    } else {
      addOrderMutation.mutate(order);
    }
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error loading orders.</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button onClick={handleOpenAddModal}>
          Add Order
        </Button>
      </div>
      <OrderTable orders={orders || []} onEdit={handleOpenEditModal} />
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        order={editingOrder}
        isLoading={addOrderMutation.isLoading || updateOrderMutation.isLoading}
      />
    </div>
  );
};

export default OrderPage;