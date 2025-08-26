'use client';

import ProductList from '@/components/ProductList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-between py-8 px-4">
        <ProductList />
      </main>
    </QueryClientProvider>
  );
}