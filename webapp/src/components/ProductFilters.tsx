import React from 'react';

interface Filters {
  search: string;
  category: string;
  sortBy: string;
  sortOrder: string;
}

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
      <input
        type="text"
        name="search"
        placeholder="Search by name"
        value={filters.search}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full md:w-auto"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full md:w-auto"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
      </select>
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