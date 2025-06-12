"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export default function FeaturedProducts() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  
  return (
    <section className={`py-16 max-w-7xl mx-auto ${
      isDark ? "bg-gray-900" : "bg-white"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className={`text-3xl font-bold ${
            isDark ? "" : "text-gray-900"
          }`}>
            Featured Products
          </h2>
          <Link 
            href="/products" 
            className={`font-medium transition-colors duration-200 ${
              isDark
                ? "text-blue-400 hover:text-blue-300 hover:underline"
                : "text-primary hover:text-primary/80 hover:underline"
            }`}
          >
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}