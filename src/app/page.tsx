"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Product, Filters } from '@/types';
import { mockProducts } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import QuickViewDialog from '@/components/product/QuickViewDialog';
import FilterSortBar from '@/components/product/FilterSortBar';
import AiStylistSection from '@/components/AiStylistSection';

export default function HomePage() {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    category: '',
    sortBy: 'popularity',
    searchTerm: '',
  });

  const [aiBrowsingHistory, setAiBrowsingHistory] = useState<string[]>([]);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search term filter
    if (filters.searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setDisplayedProducts(filtered);
  }, [filters, allProducts]);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
    // Add to AI browsing history (simple version)
    setAiBrowsingHistory(prev => {
      const newHistory = [...prev, `viewed ${product.name} (${product.category})`];
      // Keep history to a reasonable length
      return newHistory.slice(-5); 
    });
  };

  const handleFilterChange = (newFilterValues: Partial<Filters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilterValues }));
  };

  const currentAiHistoryText = useMemo(() => {
    if (aiBrowsingHistory.length === 0) {
      return "I'm interested in stylish and modern clothing.";
    }
    return `I've recently ${aiBrowsingHistory.join(', and ')}.`;
  }, [aiBrowsingHistory]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2 text-center">
          Discover Your Next Favorite Look
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Browse our curated collection, find what you love, and get AI-powered style advice.
        </p>
        <FilterSortBar filters={filters} onFiltersChange={handleFilterChange} />
        <ProductGrid products={displayedProducts} onQuickView={handleQuickView} />
      </section>
      
      <AiStylistSection initialBrowsingHistory={currentAiHistoryText} />

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
