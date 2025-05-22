"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="group rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-900 border border-zinc-200 dark:border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={
              isHovered && product.images.length > 1
                ? product.images[1]
                : product.images[0]
            }
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-red-500"
            )}
          >
            <Heart size={16} className={isFavorite ? "fill-white" : ""} />
          </button>
        </div>

        {/* Add to Cart on Hover */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 backdrop-blur-sm py-3 px-4 transform transition-transform duration-300",
            "bg-white dark:bg-zinc-900",
            isHovered ? "translate-y-0" : "translate-y-full"
          )}
        >
          <button
            onClick={() => addItem(product, 1)}
            className={cn(
              "w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors",
              "bg-primary text-white hover:bg-primary dark:text-black"
            )}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors text-zinc-900 dark:text-gray-100">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {product.category}
        </p>
        <div className="font-bold text-xl text-zinc-800 dark:text-gray-100">
          ₹{product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
