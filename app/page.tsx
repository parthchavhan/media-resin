import Banner from "@/components/home/Banner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
    </main>
  );
}