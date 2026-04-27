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

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'pending_cod'
  | 'confirmed_cod'
  | 'paid';

export type PaymentMethod = 'cod' | 'konnect' | 'flouci' | 'stripe';

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  stripeSessionId?: string;
  shippingAddress?: string;
  paymentMethod?: PaymentMethod;
  paymentReference?: string;
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
