'use client';

import { useState } from 'react';
import { ShoppingBag, Check, Truck, Shield, Undo2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import Button from '@/components/ui/Button';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity,
      image: product.images[0]?.url || '',
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100
      )
    : 0;

  return (
    <div>
      {/* Category */}
      <span className="text-xs uppercase tracking-[0.2em] text-or font-medium">
        {product.category?.name}
      </span>

      {/* Name */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-charbon mt-2 mb-4">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-semibold text-cuir">
          {formatPrice(product.price)}
        </span>
        {product.comparePrice && (
          <>
            <span className="text-lg text-pierre line-through">
              {formatPrice(product.comparePrice)}
            </span>
            <span className="bg-terracotta text-white text-xs px-2 py-1 rounded-sm font-medium">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Short Description */}
      <p className="text-pierre leading-relaxed mb-6">
        {product.shortDescription}
      </p>

      {/* Divider */}
      <div className="w-full h-[1px] bg-pierre-light/20 mb-6" />

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-charbon font-medium mb-3">
          Description
        </h3>
        <p className="text-sm text-pierre leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Quantity Selector */}
        <div className="flex items-center border border-pierre-light/30 rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-pierre hover:text-charbon transition-colors"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span className="px-4 py-3 text-sm font-medium text-charbon min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-pierre hover:text-charbon transition-colors"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="primary"
          size="lg"
          className="flex-1"
          id="btn-add-to-cart"
        >
          {!product.inStock ? (
            'Rupture de stock'
          ) : added ? (
            <>
              <Check size={18} className="mr-2" />
              Ajouté au panier
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-sable/50 rounded-sm">
          <Truck size={18} className="text-cuir flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-charbon">Livraison</p>
            <p className="text-[11px] text-pierre">Partout en Tunisie</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-sable/50 rounded-sm">
          <Shield size={18} className="text-cuir flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-charbon">Garantie</p>
            <p className="text-[11px] text-pierre">2 ans artisan</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-sable/50 rounded-sm">
          <Undo2 size={18} className="text-cuir flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-charbon">Retours</p>
            <p className="text-[11px] text-pierre">14 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
