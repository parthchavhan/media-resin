import { categories, getProductsByCategory } from '@/lib/data';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: { id: string };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { id } = params;
  const category = categories.find((cat) => cat.id === id);
  const products = getProductsByCategory(id);

  if (!category) {
    return notFound();
  }

  return (
    <div className="container px-4 py-10 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
      </div>

      {/* Product Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Products</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No products found in this category.</p>
        )}
      </section>

      {/* Optional: Back to categories */}
      <div>
        <Link href="/categories">
          <span className="text-primary hover:underline text-sm">&larr; Back to categories</span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;

// For static generation with output: export, generate all category paths
export async function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}
