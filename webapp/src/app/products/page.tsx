import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ProductFilters from '@/components/ProductFilters';
import { Product } from '@/types';

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    sortBy: '',
    sortOrder: 'ASC',
  });
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', filters, page],
    queryFn: () => fetchProducts({ ...filters, page }),
  });

  const handleAddToCart = (product: Product) => {
    const cart: Product[] = queryClient.getQueryData(['cart']) || [];
    queryClient.setQueryData(['cart'], [...cart, product]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      <ProductFilters filters={filters} onFilterChange={setFilters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span className="mx-4">Page {page}</span>
        <Button onClick={() => setPage(page + 1)} disabled={data?.data?.length < 10}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductsPage;