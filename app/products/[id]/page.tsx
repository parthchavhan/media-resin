import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import ProductReviews from '@/components/products/product-reviews';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import RelatedProducts from '@/components/products/related-products';
import ProductImageGallery from '@/components/products/product-image-gallery';
import { formatCurrency } from '@/lib/utils';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();
  // Note: Cart and quantity logic must be handled client-side (e.g. in a separate component or via context)

  return (
    <div className="animate-fadeIn py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          asChild
        >
          <a href="/home">
            <ArrowLeft size={16} />
            Back to products
          </a>
        </Button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductImageGallery images={product.images} />

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-semibold md:text-4xl">{product.name}</h1>
              <p className="mb-4 text-xl font-bold text-accent">{formatCurrency(product.price)}</p>
              <p className="mb-6 text-muted-foreground">{product.shortDescription}</p>

              {/* Quantity and Add to Cart should be handled in a client component or context */}
              {/* You can create a <ProductCartActions product={product} /> client component for this */}

              <Separator className="my-6" />

              <div>
                <h2 className="mb-4 text-xl font-medium">Description</h2>
                <div className="product-description text-muted-foreground">
                  {product.description}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                Category: <span className="font-medium">{product.category}</span>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />
        
        <ProductReviews productId={product.id} />
        
        <Separator className="my-12" />
        
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}