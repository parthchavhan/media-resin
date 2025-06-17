import Banner from "@/components/home/Banner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import GetInTouch from "@/components/getintouch";
import FashionCollection from "./home2/fashion-collection";
export default function Home() {

  const geoart = {
    title: "Geode Art",
    description:
      "Indulge in comfort and quality with our thoughtfully designed girl's collection.",
    backgroundImage: "/geo.jpg",
    products: [
      {
        id: "1",
        name: "Red-Golden",
        price: 99.0,
        image: "/geo1.jpeg",
        link: "/products?category=midis",
      },
      {
        id: "2",
        name: "Ohm",
        price: 39.0,
        image: "/geo2.jpeg",
        link: "/products?category=gowns",
      },
      {
        id: "3",
        name: "Purple Magic",
        price: 89.0,
        image: "/geo3.jpeg",
        link: "/products?category=ethnic",
      },
    ],
  };

const MantraFrames = {
  title: "Mantra Frames",
  description:
    "Define your style with our latest boys' collection. Designed for the confident man, these pieces blend contemporary design with classic appeal.",
  backgroundImage: "/Mantra.jpg",
  products: [
    {
      id: "1",
      name: "Shivaye",
      price: 99.0,
      image: "/Mantra4.jpg",
      link: "/products?category=mantra-frames",
    },
    {
      id: "2",
      name: "Hanuman",
      price: 39.0,
      image: "/Mantra3.jpg",
      link: "/products?category=mantra-frames",
    },
    {
      id: "3",
      name: "Navkar",
      price: 89.0,
      image: "/Mantra5.jpg",
      link: "/products?category=mantra-frames",
    }, 
  ],
};
  
  return (
    <main>
      <Banner />
      <FeaturedCategories />
      <FashionCollection
        womenCollection={MantraFrames}
        menCollection={geoart}
      />
      <FeaturedProducts />
      <GetInTouch />
      <Testimonials />
    </main>
  );
}
