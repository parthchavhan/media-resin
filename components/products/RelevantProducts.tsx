"use client";

import { getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

interface RelevantProductsProps {
  currentCategory: string;
  currentProductId: string;
}

export default function RelevantProducts({ currentCategory, currentProductId }: RelevantProductsProps) {
  const related = getProductsByCategory(currentCategory).filter(p => p.id !== currentProductId);
  if (related.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
} 