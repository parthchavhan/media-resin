import { categories, getProductsByCategory } from '@/lib/data'; // Adjust the import path as necessary
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard'; // Import the ProductCard component

const CategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Get the category ID from the params

  // Find the category based on the ID
  const category = categories.find(cat => cat.id === id);
  const products = getProductsByCategory(id); // Fetch products for the category

  if (!category) {
    return <div>Category not found</div>; // Handle case where category does not exist
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      <p className="mb-4">{category.description}</p>

      <h2 className="text-xl font-semibold mb-2">Products:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} /> // Use ProductCard component
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

export async function generateStaticParams() {
  return categories.map(category => ({
    id: category.id,
  }));
}
