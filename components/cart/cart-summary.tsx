'use client';

import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartSummary() {
  const { cartItems, cartTotal } = useCart();
  
  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const taxRate = 0.18; // 18% GST
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {shippingCost === 0 
                ? <span className="text-accent">FREE</span> 
                : formatCurrency(shippingCost)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (18% GST)</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-xl text-accent">{formatCurrency(orderTotal)}</span>
            </div>
            
            {shippingCost === 0 && (
              <p className="mt-2 text-sm text-accent">
                ✓ Free shipping applied
              </p>
            )}
          </div>
        </div>
        
        <Link href="/checkout" className="mt-6 block w-full">
          <Button className="w-full bg-accent hover:bg-accent/90">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}