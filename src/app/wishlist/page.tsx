"use client";

import { useState } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import QuickViewDialog from '@/components/product/QuickViewDialog';
import { useWishlist } from '@/contexts/WishlistContext';
import type { Product } from '@/types';
import { HeartCrack } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <ProductGrid products={wishlistItems} onQuickView={handleQuickView} />
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <HeartCrack className="mx-auto h-16 w-16 mb-4 text-gray-400" />
          <p className="text-xl">Your wishlist is empty.</p>
          <p>Start adding products you love!</p>
        </div>
      )}

      {quickViewProduct && (
        <QuickViewDialog
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
        />
      )}
    </div>
  );
}
