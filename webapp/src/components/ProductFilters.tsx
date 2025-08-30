import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../lib/api';
import { Category } from '../types';
import useDebounce from '../hooks/useDebounce';

interface Filters {
  search: string;
  categoryId: string;
  sortBy: string;
  sortOrder: string;
}

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onFilterChange({ ...filters, search: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'search') {
      setSearchTerm(e.target.value);
    } else {
      onFilterChange({ ...filters, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
      <input
        type="text"
        name="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full md:w-auto"
      />
      {isLoadingCategories ? (
        <div>Loading categories...</div>
      ) : isErrorCategories ? (
        <div>Error loading categories.</div>
      ) : (
        <select
          name="categoryId"
          value={filters.categoryId}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full md:w-auto"
      >
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <select
        name="sortOrder"
        value={filters.sortOrder}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full md:w-auto"
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default ProductFilters;