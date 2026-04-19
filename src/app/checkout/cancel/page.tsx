'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function CheckoutCancelPage() {
  return (
    <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mb-8"
        >
          <XCircle size={80} className="text-terracotta mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charbon mb-4">
            Commande annulée
          </h1>
          <p className="text-pierre mb-8">
            Votre commande a été annulée. Aucun montant n&apos;a été débité.
            Vos articles sont toujours dans votre panier.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/panier">
              <Button variant="primary" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Retour au panier
              </Button>
            </Link>
            <Link href="/boutique">
              <Button variant="outline">Continuer les achats</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
