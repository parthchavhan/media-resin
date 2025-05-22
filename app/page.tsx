import Banner from "@/components/home/Banner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import GetInTouch from "@/components/GetinTouch";
export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedCategories />
      <FeaturedProducts />
      <GetInTouch />
      <Testimonials />
    </main>
  );
}
