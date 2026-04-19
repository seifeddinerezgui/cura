'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url || '',
    });
    openCart();
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/boutique/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-sable">
          <Image
            src={product.images[0]?.url || ''}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <span className="bg-charbon text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium">
                Épuisé
              </span>
            )}
            {discount > 0 && (
              <span className="bg-terracotta text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-cuir hover:bg-cuir-dark text-white py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Ajouter au panier"
              >
                <ShoppingBag size={14} />
                Ajouter
              </button>
              <span className="w-10 h-10 bg-white/90 rounded-sm flex items-center justify-center text-charbon hover:text-terracotta transition-colors">
                <Eye size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-pierre mb-1.5">
            {product.category?.name}
          </p>
          <h3 className="font-serif text-base font-semibold text-charbon group-hover:text-cuir transition-colors duration-300 mb-2 truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-cuir">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-pierre line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
