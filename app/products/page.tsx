"use client"
import { useState } from "react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

// This component lists all products
const AllProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to handle category selection
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-8">Browse our handcrafted collection of unique resin art and decor</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <Button 
            onClick={() => handleCategorySelect(null)}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium"
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button 
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;