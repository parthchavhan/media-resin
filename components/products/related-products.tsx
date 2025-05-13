'use client';

import { useEffect, useState } from 'react';
import { Product, products } from '@/lib/data';
import ProductCard from './product-card';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({ 
  currentProductId, 
  category 
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Filter products by category and exclude current product
    const related = products
      .filter(product => product.category === category && product.id !== currentProductId)
      .slice(0, 4); // Limit to 4 products
    
    setRelatedProducts(related);
  }, [category, currentProductId]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className="mb-6 text-2xl font-semibold">You May Also Like</h2>
      <div className="product-grid">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}