import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ProductCardSkeleton;