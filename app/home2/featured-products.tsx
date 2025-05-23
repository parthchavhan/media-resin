"use client";

import Link from "next/link";
// Image, Card, CardContent, CardFooter, Button, ShoppingCart, useCart are no longer needed directly here
// as they are encapsulated in the imported ProductCard

// Import the updated ProductCard and Product interface from the new shared location
import { ProductCard } from "./ProductCard";

import { Product } from "@/lib/types"; // Import the Product type

interface FeaturedProductsProps {
  products: Product[]; // Uses the imported Product interface
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Trending Products</h2>
            <p className="text-muted-foreground max-w-[600px]">
              No trending products available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Trending Products</h2>
          <p className="text-muted-foreground max-w-[600px]">
            Check out what's hot right now!
          </p>
        </div>
        {/* Horizontal scrollable for all views */}
        <div className="flex overflow-x-auto overflow-y-visible gap-4 sm:gap-5 pb-4 pt-4 snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="min-w-[90%] sm:min-w-[55%] md:min-w-[35%] lg:min-w-[28%] xl:min-w-[22%] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
    </section>
  );
}
