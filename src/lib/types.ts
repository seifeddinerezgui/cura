// Types pour CURA

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  category: Category;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface ProductImage {
  _key: string;
  url: string;
  alt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[]; // Portable Text
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  stripeSessionId: string;
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}
