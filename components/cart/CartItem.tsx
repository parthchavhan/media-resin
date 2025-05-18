"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      <div className="sm:w-24 sm:h-24 w-full h-48 relative mb-4 sm:mb-0 sm:mr-6">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </Link>
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <Link 
              href={`/products/${product.id}`}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <p className="font-bold">₹{(product.price * quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 border-r border-gray-300 text-gray-500 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 border-l border-gray-300 text-gray-500 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(product.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}