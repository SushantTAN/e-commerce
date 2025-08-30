'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { addToCart } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const AddToCartButton = ({ product }: { product: Product }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) => addToCart(data.productId, data.quantity),
    onSuccess: () => {
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'], refetchType: "all" });
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
    <Button onClick={handleAddToCart} disabled={mutation.isPending}>
      {mutation.isPending ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;