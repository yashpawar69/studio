
"use client";

import type { Filters } from '@/types';
import { Button } from '@/components/ui/button';
import { productCategories } from '@/data/products';
import { LayoutGrid } from 'lucide-react';

interface CategoryHighlightSectionProps {
  currentCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryHighlightSection({ currentCategory, onCategorySelect }: CategoryHighlightSectionProps) {
  return (
    <section className="mb-8 py-6 bg-muted/30 rounded-lg shadow-md animation-soft-fade-in">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center">
          <LayoutGrid className="mr-3 h-7 w-7 text-primary" />
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {productCategories.map((category) => (
            <Button
              key={category}
              variant={currentCategory === (category === 'All' ? '' : category) ? "default" : "outline"}
              size="lg"
              className="text-sm font-semibold transition-all duration-200 ease-in-out hover:shadow-md rounded-full px-6 py-3"
              onClick={() => onCategorySelect(category === 'All' ? '' : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
