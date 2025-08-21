import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import { getProducts, createProduct, updateProduct } from '../services/api';
import type { Product } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<{ data: Product[] }>({ queryKey: ['products'], queryFn: () => getProducts().then(res => res.data) });

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: Omit<Product, 'id'> }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
      setEditingProduct(null);
    },
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (product: Omit<Product, 'id'> | Product) => {
    if ('id' in product) {
      updateProductMutation.mutate({ id: product.id, product });
    } else {
      addProductMutation.mutate(product);
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={handleOpenAddModal}>
          Add Product
        </Button>
      </div>
      <ProductTable products={data?.data || []} onEdit={handleOpenEditModal} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        product={editingProduct}
        isLoading={addProductMutation.isLoading || updateProductMutation.isLoading}
      />
    </div>
  );
};

export default ProductPage;
