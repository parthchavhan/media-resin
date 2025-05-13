import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-semibold sm:text-3xl">Your cart is empty</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Looks like you haven't added any items to your cart yet.
        Explore our products and find something you'll love!
      </p>
      <Link href="/">
        <Button className="bg-accent hover:bg-accent/90">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}