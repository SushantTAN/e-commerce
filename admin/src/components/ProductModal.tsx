import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Product, Category } from '../types';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  product: Product | null;
  isLoading: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').positive(),
  categoryId: yup.string().required('Category is required'),
  stock: yup.number().required('Stock is required').integer().min(0),
  imageUrl: yup.string().required('Image URL is required').url(),
});

type ProductFormInputs = yup.InferType<typeof schema>;

const ProductModal = ({ isOpen, onClose, onSubmit, product, isLoading }: ProductModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormInputs>({
    resolver: yupResolver(schema),
  });

  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: () => getCategories().then(res => res.data) });

  useEffect(() => {
    if (isOpen) { // Only reset when modal opens
      if (product) {
        reset({ ...product, categoryId: product.category?.id || '' }); // Use categoryId from product.category
      } else {
        reset({ name: '', description: '', price: 0, categoryId: '', stock: 0, imageUrl: '' });
      }
    }
  }, [product, reset, isOpen]); // Add isOpen to dependency array

  const handleFormSubmit = (data: ProductFormInputs) => {
    if (product) {
      onSubmit({ ...product, ...data });
    } else {
      onSubmit(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Input id="description" {...register('description')} />
            {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <Input id="price" type="number" {...register('price')} />
            {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
            {isLoadingCategories ? (
              <div>Loading categories...</div>
            ) : isErrorCategories ? (
              <div>Error loading categories.</div>
            ) : (
              <select id="categoryId" {...register('categoryId')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.categoryId && <p className="text-xs text-red-600">{errors.categoryId.message}</p>}
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <Input id="stock" type="number" {...register('stock')} />
            {errors.stock && <p className="text-xs text-red-600">{errors.stock.message}</p>}
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <Input id="imageUrl" {...register('imageUrl')} />
            {errors.imageUrl && <p className="text-xs text-red-600">{errors.imageUrl.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading}>{product ? 'Update Product' : 'Add Product'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
