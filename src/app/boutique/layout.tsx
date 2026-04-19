import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique',
  description:
    'Parcourez notre collection de maroquinerie artisanale tunisienne : ceintures, portefeuilles et sacs en cuir fait main.',
};

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
