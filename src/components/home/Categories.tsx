'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { mockCategories } from '@/lib/mock-data';

export default function Categories() {
  return (
    <section className="py-24 bg-creme" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
            Collections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charbon mt-3 line-decoration-center">
            Nos Catégories
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCategories.map((category, index) => (
            <AnimatedSection key={category._id} delay={index * 0.15}>
              <Link
                href={`/boutique?category=${category.slug}`}
                className="group block relative h-[400px] rounded-sm overflow-hidden"
              >
                <Image
                  src={category.image || ''}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charbon/70 via-charbon/20 to-transparent transition-all duration-500 group-hover:from-charbon/80" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 max-w-xs">
                      {category.description}
                    </p>
                    <span className="inline-block text-xs uppercase tracking-widest text-or border-b border-or pb-1 group-hover:text-or-light transition-colors">
                      Découvrir
                    </span>
                  </motion.div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
