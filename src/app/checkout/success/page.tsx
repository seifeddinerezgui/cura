'use client';

import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { useEffect } from 'react';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mb-8"
        >
          <CheckCircle size={80} className="text-olive mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charbon mb-4">
            Merci pour votre commande !
          </h1>
          <p className="text-pierre mb-2">
            Votre commande a été confirmée avec succès.
          </p>
          <p className="text-pierre mb-8">
            Un email de confirmation vous sera envoyé prochainement avec les
            détails de votre commande et le suivi de livraison.
          </p>

          <div className="bg-sable/50 rounded-sm p-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-cuir">
              <Package size={20} />
              <span className="text-sm font-medium">
                Livraison estimée : 3-5 jours ouvrables
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/boutique">
              <Button variant="primary" className="flex items-center gap-2">
                Continuer les achats
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Retour à l&apos;accueil</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
