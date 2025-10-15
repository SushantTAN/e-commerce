import AddToCartButton from '@/components/AddToCartButton';
import AmountDisplay from '@/components/AmountDisplay';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fetchProductById } from '@/lib/api';
import { Product } from '@/types';
import StarRating from '@/components/StarRating';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product: Product = await fetchProductById(id);
  // const allProducts: Product[] = await fetchProducts({});

  // Filter out the current product and get 3 related products
  // const relatedProducts = allProducts?.filter(p => p.id !== product.id).slice(0, 3);

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-2xl">Product not found</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          &larr; Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          &larr; Back to all products
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* <Card className="overflow-hidden"> */}
          <div className="p-0 relative h-96 rounded overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-auto"
            />
          </div>
          {/* </Card> */}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating activeStars={4} />
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">4.0 (12 reviews)</span>
                </div>
              </div>
              <div>
                <p className="text-4xl font-extrabold">
                  <AmountDisplay amount={product.price} />
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      {/* <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div> */}
    </div>
  );
}