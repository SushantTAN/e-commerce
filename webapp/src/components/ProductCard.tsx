import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/lib/api';
import { useToast } from './ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) => addToCart(data.productId, data.quantity),
    onSuccess: () => {
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add to cart.',
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleAddToCart = () => {
    mutation.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500 mb-4">${parseFloat(product.price).toFixed(2)}</p>
      {console.log('Product price type:', typeof product.price, 'value:', product.price)}
      {isAuthenticated() && (
        <Button onClick={handleAddToCart} disabled={mutation.isPending} className="mt-auto">
          {mutation.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
