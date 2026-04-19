'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

export default function BrandStory() {
  return (
    <section className="py-24 bg-creme overflow-hidden" id="brand-story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <AnimatedSection>
            <div className="relative">
              <div className="relative h-[500px] rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&q=80"
                  alt="Atelier de cuir CURA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-or/30 rounded-sm -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-sable rounded-sm -z-10" />
            </div>
          </AnimatedSection>

          {/* Text Side */}
          <AnimatedSection delay={0.2}>
            <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
              Notre Histoire
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charbon mt-3 mb-6 line-decoration">
              Un Héritage de Savoir-Faire
            </h2>
            <div className="space-y-4 text-pierre leading-relaxed">
              <p>
                Depuis les ruelles sinueuses de la médina de Tunis, CURA
                perpétue l&apos;art ancestral de la maroquinerie tunisienne. Nos
                artisans, héritiers d&apos;un savoir-faire transmis de père en
                fils, transforment le cuir brut en pièces d&apos;exception.
              </p>
              <p>
                Chaque ceinture, portefeuille et sac est le fruit d&apos;heures
                de travail minutieux, du tannage végétal traditionnel aux
                coutures faites à la main avec du fil de lin naturel.
              </p>
              <p>
                Nous croyons que le vrai luxe réside dans l&apos;authenticité et
                la durabilité. Nos pièces ne sont pas simplement fabriquées —
                elles sont <em>façonnées</em> avec passion.
              </p>
            </div>
            <div className="flex gap-8 mt-8 mb-8">
              <div>
                <span className="block font-serif text-3xl font-bold text-cuir">
                  25+
                </span>
                <span className="text-xs uppercase tracking-wider text-pierre">
                  Ans d&apos;expertise
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-cuir">
                  100%
                </span>
                <span className="text-xs uppercase tracking-wider text-pierre">
                  Fait main
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-cuir">
                  ∞
                </span>
                <span className="text-xs uppercase tracking-wider text-pierre">
                  Passion
                </span>
              </div>
            </div>
            <Link href="/blog/artisans-cura-maitre-hassan">
              <Button variant="outline">En savoir plus</Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
