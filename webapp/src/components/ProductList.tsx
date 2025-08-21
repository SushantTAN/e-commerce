import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductCardSkeleton from './ProductCardSkeleton';

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
        <button
          onClick={() => refetch()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default ProductList;