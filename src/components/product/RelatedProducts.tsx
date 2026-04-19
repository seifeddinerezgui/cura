'use client';

import { Product } from '@/lib/types';
import ProductCard from '@/components/shop/ProductCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 border-t border-pierre-light/20">
      <AnimatedSection className="mb-10">
        <h2 className="font-serif text-2xl font-bold text-charbon line-decoration">
          Vous Aimerez Aussi
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <AnimatedSection key={product._id} delay={index * 0.1}>
            <ProductCard product={product} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
