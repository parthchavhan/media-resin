// app/products/[id]/page.tsx
import { getProductById, products } from "@/lib/data";
import ProductDetail from "@/components/products/ProductDetail";
import Faq02 from "@/components/kokonutui/faq-02"; // Import your FAQ component
import ProductD from "@/components/products/ProductD";

// This function generates the static parameters for the dynamic route
export const generateStaticParams = async () => {
  return products.map(product => ({
    id: product.id,
  }));
};

// Define the type for params
interface Params {
  id: string;
}

const ProductPage = async ({ params }: { params: Params }) => {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <a 
          href="/products" 
          className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Browse All Products
        </a>
      </div>
    );
  }

  // Check if the id is 'varmala-preservation-frame'
  if (params.id === 'P6') {
    return (
      <ProductD product={product} />
    );
  }

  return (
    <div>
      <ProductDetail product={product} />
      
     
    </div>
  );
};

export default ProductPage;