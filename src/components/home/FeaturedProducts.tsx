'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCard from '@/components/shop/ProductCard';
import Button from '@/components/ui/Button';
import { mockProducts } from '@/lib/mock-data';

export default function FeaturedProducts() {
  const featured = mockProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-sable/30" id="featured-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
            Sélection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charbon mt-3 line-decoration-center">
            Pièces Vedettes
          </h2>
          <p className="text-pierre mt-6 max-w-2xl mx-auto">
            Nos créations les plus prisées, chacune témoignant du savoir-faire
            unique de nos artisans tunisiens.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <AnimatedSection key={product._id} delay={index * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link href="/boutique">
            <Button variant="outline" size="lg">
              Toute la collection
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
