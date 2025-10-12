import { fetchProductById } from '@/lib/api';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';
import AmountDisplay from '@/components/AmountDisplay';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;
  const product: Product = await fetchProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4"><AmountDisplay amount={product.price} /></p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
