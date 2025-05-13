'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  products: Product[];
}

export function CategoryFilter({ products }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Extract unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];
  
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-center text-xl font-semibold">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={
              selectedCategory === category
                ? "bg-accent text-white hover:bg-accent/90"
                : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}