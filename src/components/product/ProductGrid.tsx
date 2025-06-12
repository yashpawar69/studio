import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  emptyStateMessage?: string;
}

export default function ProductGrid({ products, onQuickView, emptyStateMessage = "No products found." }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">{emptyStateMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onQuickView={onQuickView} 
          className="animation-soft-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
