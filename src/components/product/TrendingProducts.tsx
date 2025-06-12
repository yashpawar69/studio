
"use client";

import type { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import { Flame } from 'lucide-react';

interface TrendingProductsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  count?: number;
}

export default function TrendingProducts({ products, onQuickView, count = 4 }: TrendingProductsProps) {
  const trending = products
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, count);

  if (trending.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <Flame className="mr-3 h-7 w-7 text-primary" />
        Trending Now
      </h2>
      <ProductGrid products={trending} onQuickView={onQuickView} />
    </section>
  );
}
