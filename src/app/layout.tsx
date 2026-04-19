import type { Metadata } from 'next';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

export const metadata: Metadata = {
  title: {
    default: 'CURA — Maroquinerie Artisanale Tunisienne',
    template: '%s | CURA',
  },
  description:
    'Découvrez CURA, maroquinerie artisanale tunisienne. Ceintures, portefeuilles et sacs en cuir pleine fleur, faits main par nos artisans avec un savoir-faire ancestral.',
  keywords: [
    'cuir tunisien',
    'maroquinerie artisanale',
    'ceinture cuir',
    'portefeuille cuir',
    'sac cuir',
    'fait main',
    'tannage végétal',
    'CURA',
  ],
  openGraph: {
    title: 'CURA — Maroquinerie Artisanale Tunisienne',
    description:
      'Ceintures, portefeuilles et sacs en cuir pleine fleur, faits main en Tunisie.',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
