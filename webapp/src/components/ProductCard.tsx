import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/lib/api';
import { useToast } from './ui/use-toast';
import Link from 'next/link';
import Image from 'next/image';

import useCurrency from '@/hooks/useCurrency';
import AmountDisplay from './AmountDisplay';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { currency } = useCurrency();
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    mutation.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden">

        <div className="relative w-full aspect-video">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className='px-4 py-2'>
          <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>
          <p className="text-gray-500 mb-4"><AmountDisplay amount={parseFloat(product.price?.toString()).toFixed(2)} /></p>
          {isAuthenticated() && (
            <Button onClick={handleAddToCart} disabled={mutation.isPending} className="mt-auto">
              {mutation.isPending ? 'Adding...' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
