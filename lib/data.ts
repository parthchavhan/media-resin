import { Product, Category } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Ocean Waves Resin Art",
    description: "Hand-crafted resin art piece capturing the serene beauty of ocean waves. Each piece is unique with swirls of blue, teal, and white creating a mesmerizing effect that brings the calming essence of the ocean into your space.",
    price: 129.99,
    images: [
      "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg",
      "https://images.pexels.com/photos/3738909/pexels-photo-3738909.jpeg"
    ],
    category: "c1",
    featured: true,
    dimensions: "12\" x 16\"",
    materials: ["Epoxy resin", "Alcohol ink", "Canvas"],
    inStock: true
  },
  {
    id: "p2",
    name: "Geode Coaster Set",
    description: "Set of 4 handmade resin coasters inspired by natural geode formations. Each coaster features vibrant colors with gold accents, creating a stunning centerpiece for your coffee table while protecting your furniture.",
    price: 49.99,
    images: [
      "https://images.pexels.com/photos/5232649/pexels-photo-5232649.jpeg",
      "https://images.pexels.com/photos/5232701/pexels-photo-5232701.jpeg"
    ],
    category: "c1",
    featured: false,
    dimensions: "4\" diameter each",
    materials: ["Epoxy resin", "Mica powder", "Gold leaf"],
    inStock: true
  },
  {
    id: "p4",
    name: "Resin River Serving Board",
    description: "Handcrafted wooden serving board with a stunning blue resin river flowing through the center. Perfect for entertaining or as a statement piece in your kitchen. Each board is unique with natural wood grain patterns.",
    price: 89.99,
    images: [
      "https://images.pexels.com/photos/5232694/pexels-photo-5232694.jpeg",
      "https://images.pexels.com/photos/5232654/pexels-photo-5232654.jpeg"
    ],
    category: "c2",
    featured: false,
    dimensions: "12\" x 20\"",
    materials: ["Reclaimed wood", "Epoxy resin", "Food-safe finish"],
    inStock: true
  },
  {
    id: "p5",
    name: "Varmala Preservation Frame – Eternal Love Encased in Beauty",
    description: `Celebrate your wedding day forever with our Varmala Preservation Frame, handcrafted using the real flowers from your varmala. This elegant round frame captures the essence of one of the most meaningful moments of your life—your wedding—and transforms it into a timeless keepsake.\n\nWhat makes it truly special is that you can personalize it with your own photo, names, wedding date, and a short quote that holds meaning for you both. Each bloom is preserved with care and adorned with delicate pearls and golden accents, symbolizing the beauty and strength of your bond.\n\nPerfect as a keepsake for your home or a heartfelt wedding gift, this frame is more than decor—it's a piece of your love story, preserved for a lifetime.\n\n📅 Customizable with Your Wedding Date\n📸 Add Your Favorite Photo\n💑 Personalize with Names & a Meaningful Quote\n💐 Crafted from Your Actual Varmala Flowers\n💛 A Symbol of Timeless Love & Memory`,
    price: 2000, 
    images: [
      "/varmala1.jpg",
      "/varmala2.jpg",
      "/varmala3.jpg"
    ],
    category: "c2",
    featured: true,
    dimensions: "12\" x 20\"",
    materials: ["Reclaimed wood", "Epoxy resin", "Food-safe finish"],
    inStock: true
  },
  {
    id: "p6",
    name: "Resin Wall Clock – Blue, White & Wooden Elegance in Every Tick",
    description: `Add a touch of timeless artistry to your space with our handcrafted Resin Wall Clock in blue, white, and natural wood finish. This beautifully designed epoxy resin wall clock combines rustic charm with modern elegance, making it a standout piece of home decor or office wall art.\n\nCrafted with rich wooden textures and flowing resin patterns, each clock brings an antique yet contemporary look to your walls. The soothing blue and white resin tones paired with golden clock hands create a visually striking contrast that fits effortlessly into boho, modern, rustic, or minimalist interiors.\n\n✨ Please Note: As each clock is completely handmade, you will not receive the exact piece shown in the image. But rest assured—your clock will be one-of-a-kind, crafted with the same artistry and often even more stunning in design.\n\n🪵 Blue & White Resin with Natural Wooden Texture\n🖐️ Handmade Wall Clock – Unique Every Time\n🕰️ Functional Resin Art for Living Room, Bedroom, or Office\n🎁 Perfect Gift for Housewarming, Anniversaries, or Art Lovers\n\nKeywords: Resin wall clock, epoxy resin decor, handmade clock, blue and white wall art, rustic wood clock, unique home decor, modern resin timepiece, living room wall clock, boho clock, artisan wall art`,
    price: 32000, 
    images: [
      "/clock1.jpg",
      "/clock2.jpg",
      "/clock3.jpg"
    ],
    category: "c3",
    featured: true,
    dimensions: "12\" x 20\"",
    materials: ["Reclaimed wood", "Epoxy resin", "Food-safe finish"],
    inStock: true
  },
  {
    id: "p7",
    name: "Namokar Mantra Resin Art Frame – Ocean-Inspired Spiritual Elegance",
    description: `Celebrate your faith through art with our Namokar Mantra Resin Frame, designed to radiate peace, devotion, and artistic beauty. Set against a breathtaking backdrop of ocean waves crafted in resin, this unique piece combines spiritual meaning with aesthetic elegance.\n\nThe frame features the revered Namokar Mantra in golden lettering, highlighted with a golden metallic border and decorated with real seashells, symbolizing serenity and grounding. It's a perfect spiritual showpiece for your living room, meditation space, or prayer corner, and a beautiful way to express your religious devotion through decor.\n\n🌊 Ocean wave background in rich resin tones\n🌟 Golden border and metallic script for a luxurious finish\n🪬 Showcase your religious faith with artistic beauty\n\n✨ Customization Available: Personalize it with your own religious chants or prayers—from Hanuman Chalisa, Shaanti Mantra, to Muslim Duas or Quranic verses. We tailor it to reflect your spiritual path.\n\n🔔 Note: Each frame is entirely handmade, meaning your piece will be unique and may not exactly match the one shown in the image—but it will be equally, if not more, stunning.\n\n🧘‍♀️ Perfect for prayer rooms, meditation corners, or as a spiritual gift\n🎁 Thoughtful gift idea for festivals, housewarmings, or religious ceremonies\n🖐️ Handcrafted resin artwork – truly one of a kind\n\nKeywords: Namokar mantra frame, resin spiritual decor, handmade religious art, ocean theme resin frame, personalized mantra art, Jain home decor, Hindu prayer frame, Muslim wall art, Hanuman Chalisa wall decor, resin ocean waves mantra.`,
    price: 4200,
    images: [
      "/navkar1.jpeg",
      "/navkar2.jpeg",
      "/navkar3.jpeg"
    ],
    category: "c3",
    featured: true,
    dimensions: "12\" x 20\"",
    materials: ["Reclaimed wood", "Epoxy resin", "Food-safe finish"],
    inStock: true
  },
];

export const categories: Category[] = [
  {
    id: "c1",
    name: "Resin Art",
    description: "Stunning resin art pieces to elevate your space",
    image: "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg"
  },
  {
    id: "c2",
    name: "Home Decor",
    description: "Functional art pieces for your living space",
    image: "/clock1.jpg"
  },
  {
    id: "c3",
    name: "Art Prints",
    description: "Premium prints of original artwork",
    image: "/navkar1.jpeg"
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};