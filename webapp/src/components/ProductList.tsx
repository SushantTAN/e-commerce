/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Button } from './ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}



const ProductList: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: '',
    sortOrder: 'ASC',
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">Error fetching products. Please try again later.</p>
        <Button
          variant={"default"}
          onClick={() => refetch()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <h1 className="text-3xl font-semibold mb-4">Products</h1>
      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isFetching && !isFetchingNextPage ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </React.Fragment>
          ))
        )}
      </div>
      {hasNextPage && (
        <div className='flex justify-center'>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant={"outline"}
            className='mt-6'
          // className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;