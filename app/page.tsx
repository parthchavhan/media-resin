import ProductGrid from '@/components/products/product-grid';
import { products } from '@/lib/data';
import { CategoryFilter } from '@/components/products/category-filter';
import { HeroSection } from '@/components/layout/hero-section';

export default function Home() {
  return (
    <div className="animate-fadeIn">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
          Artisanal Handcrafted Products
        </h1>
        <CategoryFilter products={products} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}