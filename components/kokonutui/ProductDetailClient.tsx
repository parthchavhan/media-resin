"use client"
import { useState } from "react"
import Image from "next/image"
import { useCart } from "./CartContext"
import type { Product } from "./data"

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] max-w-md rounded-lg overflow-hidden">
          <Image
            src={product.images[imgIdx]}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx((imgIdx - 1 + product.images.length) % product.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 p-2 rounded-full hover:bg-white/90 dark:hover:bg-black/70 z-10"
                aria-label="Previous image"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                onClick={() => setImgIdx((imgIdx + 1) % product.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 p-2 rounded-full hover:bg-white/90 dark:hover:bg-black/70 z-10"
                aria-label="Next image"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-3">
          {product.images.map((img, i) => (
            <button key={i} onClick={() => setImgIdx(i)} className={`w-12 h-12 rounded border ${i === imgIdx ? "border-zinc-900 dark:border-white" : "border-transparent"}`}>
              <Image src={img} alt={product.name} width={48} height={48} className="object-cover rounded" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4 whitespace-pre-line">{product.description}</p>
        <div className="text-xl font-semibold mb-6">${product.price}</div>
        <button
          onClick={() => addToCart(product)}
          className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
} 