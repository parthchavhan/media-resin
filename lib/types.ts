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
  note: string;
  quantity?: number;
}
export interface FAQ {
  question: string;
  answer: string;
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