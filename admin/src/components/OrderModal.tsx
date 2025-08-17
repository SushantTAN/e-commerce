import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Order } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id'> | Order) => void;
  order: Order | null;
  isLoading: boolean;
}

const schema = yup.object().shape({
  userId: yup.string().required('User ID is required'),
  products: yup.string().required('Products (JSON string) is required'), // Simplified for now
  totalAmount: yup.number().required('Total Amount is required').positive(),
  status: yup.string().oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).required('Status is required'),
  shippingAddress: yup.string().required('Shipping Address is required'),
});

type OrderFormInputs = yup.InferType<typeof schema>;

const OrderModal = ({ isOpen, onClose, onSubmit, order, isLoading }: OrderModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OrderFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isOpen) {
      if (order) {
        // Convert products array to JSON string for editing
        reset({ ...order, products: JSON.stringify(order.products) });
      } else {
        reset({ userId: '', products: '[]', totalAmount: 0, status: 'pending', shippingAddress: '' });
      }
    }
  }, [order, reset, isOpen]);

  const handleFormSubmit = (data: OrderFormInputs) => {
    try {
      const parsedProducts = JSON.parse(data.products);
      if (!Array.isArray(parsedProducts)) {
        throw new Error('Products must be a valid JSON array.');
      }
      const orderData = { ...data, products: parsedProducts };
      if (order) {
        onSubmit({ ...order, ...orderData });
      } else {
        onSubmit(orderData);
      }
    } catch (e) {
      console.error('Error parsing products JSON:', e);
      // You might want to set a form error here
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{order ? 'Edit Order' : 'Add Order'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
            <Input id="userId" {...register('userId')} />
            {errors.userId && <p className="text-xs text-red-600">{errors.userId.message}</p>}
          </div>
          <div>
            <label htmlFor="products" className="block text-sm font-medium text-gray-700">Products (JSON)</label>
            <Input id="products" {...register('products')} />
            {errors.products && <p className="text-xs text-red-600">{errors.products.message}</p>}
          </div>
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
            <Input id="totalAmount" type="number" {...register('totalAmount')} />
            {errors.totalAmount && <p className="text-xs text-red-600">{errors.totalAmount.message}</p>}
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" {...register('status')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && <p className="text-xs text-red-600">{errors.status.message}</p>}
          </div>
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <Input id="shippingAddress" {...register('shippingAddress')} />
            {errors.shippingAddress && <p className="text-xs text-red-600">{errors.shippingAddress.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading}>{order ? 'Update Order' : 'Add Order'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
