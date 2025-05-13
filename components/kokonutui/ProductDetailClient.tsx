"use client"
import { useState } from "react"
import Image from "next/image"
import { useCart } from "./CartContext"
import type { Product } from "./data"
import { Button } from "@/components/ui/button"
import { Star, Truck } from "lucide-react"

interface ProductDetailClientProps {
  product: Product
  onAddToCart?: () => void
}

export default function ProductDetailClient({ product, onAddToCart }: ProductDetailClientProps) {
  const { addToCart } = useCart()
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image Gallery */}
      <div className="flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] max-w-md rounded-lg overflow-hidden">
          <Image
            src={product.images[imgIdx]}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="flex gap-2 mt-3">
          {product.images.map((img, i) => (
            <button key={i} onClick={() => setImgIdx(i)} className={`w-12 h-12 rounded border ${i === imgIdx ? "border-zinc-900 dark:border-white" : "border-transparent"}`}>
              <Image src={img} alt={product.name} width={48} height={48} className="object-cover rounded" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="md:py-8">
        <div className="mb-2 md:mb-3">
          <span className="mb-0.5 inline-block text-zinc-500 dark:text-zinc-400">
            {product.category}
          </span>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white lg:text-3xl">
            {product.name}
          </h2>
        </div>

        <div className="mb-6 flex items-center gap-3 md:mb-10">
          <Button className="rounded-full gap-x-2">
            <span className="text-sm">4.7</span>
            <Star className="h-5 w-5" />
          </Button>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 transition duration-100">
            112 Ratings
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-zinc-800 dark:text-white md:text-2xl">
              ₹{product.price}
            </span>
            <span className="mb-0.5 text-red-500 line-through">
              ₹{product.price + 30}
            </span>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Incl. VAT plus shipping
          </span>
        </div>

        <div className="mb-6 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <Truck className="w-6 h-6" />
          <span className="text-sm">2-4 Day Shipping</span>
        </div>

        <div className="flex gap-2.5">
          <Button
            onClick={onAddToCart ? onAddToCart : () => addToCart(product)}
            className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
            // onClick={...} // Add checkout logic here
          >
            Checkout Now
          </Button>
        </div>

        <p className="mt-12 text-base text-zinc-500 dark:text-zinc-300 tracking-wide whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  )
} 