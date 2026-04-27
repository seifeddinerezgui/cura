'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

// Reads checkout query params on the client and displays payment failure feedback when needed.
function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const hasPaymentError = searchParams.get('error') === 'paiement_echoue';

  return (
    <div className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-sm shadow-sm p-8">
        {hasPaymentError ? (
          <>
            <AlertTriangle size={48} className="text-terracotta mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold text-charbon mb-3">
              Paiement échoué
            </h1>
            <p className="text-pierre mb-6">
              Votre paiement n&apos;a pas abouti. Veuillez réessayer ou choisir un
              autre moyen de paiement.
            </p>
            <Link href="/panier">
              <Button variant="primary">Retourner au panier</Button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl font-bold text-charbon mb-3">
              Checkout CURA
            </h1>
            <p className="text-pierre mb-6">
              Revenez au panier pour finaliser votre commande.
            </p>
            <Link href="/panier">
              <Button variant="primary">Aller au panier</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// Wraps the query-param-aware checkout content in Suspense to satisfy App Router CSR bailout requirements.
export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageContent />
    </Suspense>
  );
}
