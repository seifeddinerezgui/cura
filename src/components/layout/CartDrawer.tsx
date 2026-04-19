'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-creme z-50 shadow-2xl flex flex-col"
            id="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-pierre-light/20">
              <h2 className="font-serif text-xl font-semibold text-charbon">
                Votre Panier
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-pierre hover:text-charbon transition-colors"
                id="btn-close-cart"
                aria-label="Fermer le panier"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-pierre-light mb-4" />
                  <p className="text-pierre font-medium mb-2">
                    Votre panier est vide
                  </p>
                  <p className="text-sm text-pierre-light mb-6">
                    Découvrez notre collection artisanale
                  </p>
                  <Link href="/boutique" onClick={closeCart}>
                    <Button variant="outline" size="sm">
                      Voir la boutique
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-sable flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-charbon truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-cuir font-semibold mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-sm border border-pierre-light/30 flex items-center justify-center text-pierre hover:text-charbon hover:border-cuir transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-sm border border-pierre-light/30 flex items-center justify-center text-pierre hover:text-charbon hover:border-cuir transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-1 text-pierre-light hover:text-red-500 transition-colors self-start"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-pierre-light/20 bg-sable/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-pierre uppercase tracking-wide">
                    Sous-total
                  </span>
                  <span className="text-lg font-serif font-semibold text-charbon">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <p className="text-xs text-pierre mb-4">
                  Frais de livraison calculés à l&apos;étape suivante.
                </p>
                <Link href="/panier" onClick={closeCart} className="block mb-2">
                  <Button variant="outline" className="w-full" size="md">
                    Voir le panier
                  </Button>
                </Link>
                <Link
                  href="/api/checkout"
                  onClick={(e) => {
                    e.preventDefault();
                    closeCart();
                    window.location.href = '/panier';
                  }}
                >
                  <Button variant="primary" className="w-full" size="md">
                    Commander
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
