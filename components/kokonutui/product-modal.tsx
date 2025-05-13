"use client"

import { motion } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { Product } from "./data"

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product) => void
  goToProductPage?: () => void
}

export function ProductModal({ product, onClose, onAddToCart, goToProductPage }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const totalImages = product.images.length

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx((prev) => (prev - 1 + totalImages) % totalImages)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgIdx((prev) => (prev + 1) % totalImages)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={onClose}
      />
      <motion.div
        layoutId={`product-${product.id}`}
        className="fixed inset-x-4 bottom-0 md:inset-[25%] z-50 bg-white dark:bg-zinc-900 rounded-t-xl md:rounded-xl overflow-hidden max-h-[80vh] md:max-h-[500px]"
      >
        <div className="h-full md:flex">
          <div className="relative md:w-2/5 flex items-center justify-center">
            <img src={product.images[imgIdx]} alt={product.name} className="w-full h-[200px] md:h-full object-cover" />
            {totalImages > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 md:w-3/5 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-sm font-medium">{product.name}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{product.category}</p>
                </div>
                <p className="text-sm font-medium">${product.price}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-zinc-600 dark:text-zinc-300">{product.shortDescription}</p>
                <div className="text-xs space-y-1">
                  <p className="text-zinc-500">SKU: {product.id}</p>
                  <p className="text-zinc-500">Stock: Available</p>
                </div>
              </div>
            </div>
            {goToProductPage && (
              <button
                onClick={goToProductPage}
                className="w-full mb-2 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-medium rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                View Product Page
              </button>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full mt-1 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
