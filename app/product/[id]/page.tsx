"use client"
import { products } from "@/components/kokonutui/data"
import ProductDetailClient from "@/components/kokonutui/ProductDetailClient"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/kokonutui/top-bar"
import { CartDrawer } from "@/components/kokonutui/cart-drawer"
import { useCart } from "@/components/kokonutui/CartContext"
import { useState, use } from "react"
import { ProductGrid } from "@/components/kokonutui/product-grid"

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useCart()
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  if (!product) return notFound()
  const recentProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <TopBar cartItemCount={cart.length} onCartClick={() => setIsCartOpen(true)} onSearch={() => {}} />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Discover Your Unique Product</h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg">Explore the details, browse images, and add this special item to your cart. Scroll down to see more beautiful creations!</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 md:p-10 mb-10 flex flex-col md:flex-row gap-10">
          <ProductDetailClient product={product} />
        </div>
        <h2 className="text-xl font-semibold mb-4 mt-8">Recent Products</h2>
        <ProductGrid products={recentProducts} onProductSelect={() => {}} />
      </div>
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </div>
  )
} 