"use client";

import { getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

interface CustomeralsolikedProps {
  currentCategory: string;
  currentProductId: string;
}

export default function Customeralsoliked({ currentCategory, currentProductId }: CustomeralsolikedProps) {
  // Get all products
  const allProducts = getProductsByCategory("geode-art") // Add other categories as needed
    .concat(getProductsByCategory("varmala-preservation-frame"), getProductsByCategory("mantra-frames"));

  // Filter out products from the current category and the current product
  const filteredProducts = allProducts.filter(p => p.category !== currentCategory && p.id !== currentProductId);

  if (filteredProducts.length === 0) return null;

  return (
    <section className="mt-12 pb-12">
      <h2 className="text-2xl font-semibold mb-4">Customers also liked</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
} 