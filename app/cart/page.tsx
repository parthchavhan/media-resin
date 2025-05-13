'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import CartSummary from '@/components/cart/cart-summary';
import EmptyCart from '@/components/cart/empty-cart';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="animate-fadeIn py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-semibold">
          <ShoppingCart className="h-8 w-8" />
          Your Cart
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="mb-4 flex justify-between">
                  <h2 className="text-xl font-medium">Cart Items ({cartItems.length})</h2>
                  <Button
                    variant="ghost"
                    className="text-sm text-muted-foreground"
                    onClick={clearCart}
                  >
                    Clear cart
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link
                              href={`/products/${item.id}`}
                              className="hover:text-accent"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="font-bold text-accent">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.category}
                        </p>
                        <div className="mt-4 flex flex-1 items-end justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CartSummary />
        </div>
      </div>
    </div>
  );
}