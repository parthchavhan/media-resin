export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  dimensions?: string;
  materials?: string[];
  inStock: boolean;
  faqs?: FAQ[];
  reviews?: Review[];
  note: string;
  quantity?: number;
  thicknessOptions?: {
    value: string;
    priceModifier: number;
  }[];
  colorOptions?: {
    value: string;
    priceModifier: number;
  }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}