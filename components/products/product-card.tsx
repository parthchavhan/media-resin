'use client';

import { Product } from '@/lib/data';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <Card className="product-card overflow-hidden border transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`}>
        <div className="product-image">
          <Image
            src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300"
          />
        </div>
        
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-medium">{product.name}</h3>
          <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
          <p className="mt-2 price-tag">{formatCurrency(product.price)}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-accent text-white hover:bg-accent/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}