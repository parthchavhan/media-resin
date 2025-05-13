'use client';

import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function CheckoutSummary() {
  const { cartItems, cartTotal } = useCart();
  
  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const taxRate = 0.18; // 18% GST
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;

  return (
    <div className="sticky top-8 rounded-lg border bg-card">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
        
        <Separator className="mb-4" />
        
        <div className="max-h-80 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4 flex items-start gap-3">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <Link 
                  href={`/products/${item.id}`} 
                  className="text-sm font-medium hover:text-accent"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3 text-sm">
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
        </div>
        
        <Separator className="my-4" />
        
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
  );
}