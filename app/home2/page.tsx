import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/data";
import { FeaturedProducts } from "./featured-products";
import { HeroSection } from "./hero-section";
import { CategorySection } from "./category-section";
import FashionCollection from "./fashion-collection";

// Sample data for the collections
const womenCollection = {
  title: "Girl's Collection",
  description:
    "Indulge in comfort and quality with our thoughtfully designed girl's collection.",
  backgroundImage: "/girls-collections.webp",
  products: [
    {
      id: "1",
      name: "Midis",
      price: 99.0,
      image: "/midis.webp",
      link: "/products?category=midis",
    },
    {
      id: "2",
      name: "Gowns",
      price: 39.0,
      image: "/gowns.jpg",
      link: "/products?category=gowns",
    },
    {
      id: "3",
      name: "Ethnic Wear",
      price: 89.0,
      image: "/ethnic.webp",
      link: "/products?category=ethnic",
    },
  ],
};

const menCollection = {
  title: "Boys' Collection",
  description:
    "Define your style with our latest boys' collection. Designed for the confident man, these pieces blend contemporary design with classic appeal.",
  backgroundImage: "/boys-collection.webp",
  products: [
    {
      id: "1",
      name: "Tuxedos",
      price: 99.0,
      image: "/tuxedos.webp",
      link: "/products?category=tuxedos",
    },
    {
      id: "2",
      name: "Boys Party Wear",
      price: 39.0,
      image: "/boys-party-wear.avif",
      link: "/products?category=men-party-wear",
    },
    {
      id: "3",
      name: "Jodhpuri",
      price: 89.0,
      image: "/jodhpuri.webp",
      link: "/products?category=jodhpuri",
    },
  ],
};

// Updated function to get TRENDING products
const getTrendingProductsData = () => {
  return products.filter(product => product.featured); // Assuming featured products are trending
};

export default function Home() {
  const trendingProductsData = getTrendingProductsData(); // Get trending products

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
     
      {trendingProductsData.length > 0 && <FeaturedProducts products={trendingProductsData} />}

      <FashionCollection
        womenCollection={womenCollection}
        menCollection={menCollection}
      />
      <div className="container px-4 py-12 mx-auto space-y-16">
        {categories.length > 0 && <CategorySection categories={categories} />}
        
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Ready to upgrade your style?</h2>
          <p className="max-w-[600px] text-gray-600 dark:text-gray-300">
            Discover our latest collections and find your perfect fit.
          </p>
          <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black">
            <Link href="/store">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop All Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
