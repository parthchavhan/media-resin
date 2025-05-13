"use client"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import type { CartItem, Product } from "./data"

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "SET_CART"; items: CartItem[] }

const CartContext = createContext<{
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
} | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.product.id)
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          ),
        }
      }
      return {
        items: [...state.items, { ...action.product, quantity: action.quantity || 1 }],
      }
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.productId) }
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      }
    case "SET_CART":
      return { items: action.items }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      dispatch({ type: "SET_CART", items: JSON.parse(stored) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity })
  const removeFromCart = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId })
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })

  return (
    <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
} 