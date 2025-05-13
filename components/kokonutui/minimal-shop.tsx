"use client"

import { AnimatePresence } from "motion/react"
import { useState } from "react"
import { ProductGrid } from "./product-grid"
import { CartDrawer } from "./cart-drawer"
import { ProductModal } from "./product-modal"
import { TopBar } from "./top-bar"
import { type Product, products } from "./data"
import { useCart } from "./CartContext"
import { useRouter } from "next/navigation"
import Banner from "./Banner"
import Faq02 from "./faq-02"

export default function MinimalShop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cart } = useCart()
  const router = useRouter()

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
      <TopBar cartItemCount={cart.length} onCartClick={() => setIsCartOpen(true)} onSearch={setSearchQuery} />
      <Banner/>
      <div className="mx-auto px-2 pt-12 pb-16">
        <ProductGrid
          products={filteredProducts}
          onProductSelect={setSelectedProduct}
        />
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => setIsCartOpen(true)}
            goToProductPage={() => {
              router.push(`/product/${selectedProduct.id}`)
              setSelectedProduct(null)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
      <Faq02/>
    </div>
  )
}
