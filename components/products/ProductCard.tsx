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
      className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </Link>
        
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setIsFavorite(!isFavorite)} 
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-500"
            )}
          >
            <Heart 
              size={16} 
              className={isFavorite ? "fill-white" : ""}
            />
          </button>
        </div>

        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-3 px-4 transform transition-transform duration-300",
            isHovered ? "translate-y-0" : "translate-y-full"
          )}
        >
          <button 
            onClick={() => addItem(product, 1)}
            className="w-full py-2 bg-primary text-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="font-bold text-xl">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}