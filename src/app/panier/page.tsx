'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { PaymentMethod } from '@/lib/types';

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>('cod');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const shippingFees = totalPrice() >= 150 ? 0 : 7;
  const totalWithShipping = totalPrice() + shippingFees;

  const handleCheckout = async () => {
    if (isRedirecting) {
      return;
    }

    setIsRedirecting(true);

    try {
      const endpoint =
        selectedPaymentMethod === 'cod'
          ? '/api/orders/cod'
          : selectedPaymentMethod === 'konnect'
            ? '/api/payments/konnect/initiate'
            : '/api/payments/flouci/initiate';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, totalAmount: totalWithShipping }),
      });

      const responseType = response.headers.get('content-type') || '';
      const isJsonResponse = responseType.includes('application/json');
      const data = isJsonResponse ? await response.json() : null;

      if (!response.ok) {
        const fallbackErrorMessage =
          response.status === 404
            ? 'Le service de paiement est indisponible. Redémarrez le serveur puis réessayez.'
            : 'Une erreur est survenue pendant l\'initialisation du paiement.';

        throw new Error(
          data?.error || fallbackErrorMessage
        );
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error('URL de redirection introuvable.');
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
      setIsRedirecting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
        <AnimatedSection className="text-center">
          <ShoppingBag size={64} className="text-pierre-light mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-charbon mb-3">
            Votre panier est vide
          </h1>
          <p className="text-pierre mb-8 max-w-md mx-auto">
            Explorez notre collection de maroquinerie artisanale et trouvez la
            pièce parfaite.
          </p>
          <Link href="/boutique">
            <Button variant="primary" size="lg">
              Découvrir la boutique
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charbon mb-2 line-decoration">
            Votre Panier
          </h1>
          <p className="text-pierre text-sm mt-6 mb-10">
            {items.length} article{items.length !== 1 ? 's' : ''} dans votre
            panier
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <AnimatedSection key={item._id}>
                <div className="flex gap-6 p-6 bg-white rounded-sm shadow-sm">
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-sm overflow-hidden bg-sable flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/boutique/${item.slug}`}
                      className="font-serif text-lg font-semibold text-charbon hover:text-cuir transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-cuir font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-pierre-light/30 rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="px-3 py-2 text-pierre hover:text-charbon transition-colors"
                          aria-label="Diminuer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-2 text-sm font-medium text-charbon">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-3 py-2 text-pierre hover:text-charbon transition-colors"
                          aria-label="Augmenter"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-charbon">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 text-pierre-light hover:text-red-500 transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <Link href="/boutique">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Continuer les achats
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:bg-red-50"
              >
                Vider le panier
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-sm shadow-sm p-6 sticky top-28">
                <h2 className="font-serif text-xl font-semibold text-charbon mb-6">
                  Résumé
                </h2>

                <div className="space-y-3 border-b border-pierre-light/20 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-pierre">Sous-total</span>
                    <span className="text-charbon font-medium">
                      {formatPrice(totalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-pierre">Livraison</span>
                    <span className="text-charbon font-medium">
                      {shippingFees === 0 ? 'Gratuite' : formatPrice(shippingFees)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-base font-semibold text-charbon">
                    Total
                  </span>
                  <span className="text-xl font-serif font-bold text-cuir">
                    {formatPrice(totalWithShipping)}
                  </span>
                </div>

                {totalPrice() < 150 && (
                  <p className="text-xs text-olive bg-olive/10 p-3 rounded-sm mb-4">
                    🚚 Plus que{' '}
                    <strong>{formatPrice(150 - totalPrice())}</strong> pour
                    la livraison gratuite !
                  </p>
                )}

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-charbon font-medium mb-3">
                    Moyen de paiement
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 border border-pierre-light/30 rounded-sm px-3 py-2 cursor-pointer hover:border-cuir transition-colors">
                      <input
                        type="radio"
                        name="payment-method"
                        value="cod"
                        checked={selectedPaymentMethod === 'cod'}
                        onChange={() => setSelectedPaymentMethod('cod')}
                        className="accent-cuir"
                      />
                      <span className="text-sm text-charbon">
                        🔵 Payer à la livraison
                      </span>
                    </label>

                    <label className="flex items-center gap-3 border border-pierre-light/30 rounded-sm px-3 py-2 cursor-pointer hover:border-cuir transition-colors">
                      <input
                        type="radio"
                        name="payment-method"
                        value="konnect"
                        checked={selectedPaymentMethod === 'konnect'}
                        onChange={() => setSelectedPaymentMethod('konnect')}
                        className="accent-cuir"
                      />
                      <span className="text-sm text-charbon">
                        🟦 Payer par Konnect
                      </span>
                    </label>

                    <label className="flex items-center gap-3 border border-pierre-light/30 rounded-sm px-3 py-2 cursor-pointer hover:border-cuir transition-colors">
                      <input
                        type="radio"
                        name="payment-method"
                        value="flouci"
                        checked={selectedPaymentMethod === 'flouci'}
                        onChange={() => setSelectedPaymentMethod('flouci')}
                        className="accent-cuir"
                      />
                      <span className="text-sm text-charbon">
                        🟣 Payer par Flouci
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  id="btn-checkout"
                  disabled={isRedirecting}
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Redirection...
                    </>
                  ) : (
                    'Commander'
                  )}
                </Button>

                <p className="text-[10px] text-pierre text-center mt-4">
                  {selectedPaymentMethod === 'cod'
                    ? 'Paiement en espèces à la livraison.'
                    : selectedPaymentMethod === 'konnect'
                      ? 'Redirection sécurisée vers Konnect.'
                      : 'Redirection sécurisée vers Flouci.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
