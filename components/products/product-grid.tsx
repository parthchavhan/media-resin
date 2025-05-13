'use client';

import { useState, useEffect } from 'react';
import { products, Product } from '@/lib/data';
import ProductCard from './product-card';

export default function ProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for product data
    const timer = setTimeout(() => {
      setVisibleProducts(products);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="product-card animate-pulse">
            <div className="aspect-square w-full bg-gray-200"></div>
            <div className="p-4">
              <div className="mb-2 h-6 w-3/4 bg-gray-200"></div>
              <div className="mb-4 h-4 w-1/2 bg-gray-200"></div>
              <div className="h-5 w-1/3 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}