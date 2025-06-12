"use client";

import type { Filters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productCategories } from '@/data/products';
import { Search, X } from 'lucide-react';

interface FilterSortBarProps {
  filters: Filters;
  onFiltersChange: (newFilters: Partial<Filters>) => void;
}

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function FilterSortBar({ filters, onFiltersChange }: FilterSortBarProps) {
  
  const handleCategoryChange = (value: string) => {
    onFiltersChange({ category: value === 'All' ? '' : value });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ sortBy: value as Filters['sortBy'] });
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchTerm: event.target.value });
  };

  const clearSearch = () => {
    onFiltersChange({ searchTerm: '' });
  };

  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        {filters.searchTerm && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={clearSearch}
          >
            <X className="h-4 w-4"/>
          </Button>
        )}
      </div>
      
      <Select onValueChange={handleCategoryChange} defaultValue={filters.category || 'All'}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {productCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleSortChange} defaultValue={filters.sortBy}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
