'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Artisan travaillant le cuir"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charbon/80 via-charbon/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charbon/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-or text-xs uppercase tracking-[0.3em] mb-4 font-medium">
              Maroquinerie Artisanale Tunisienne
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            L&apos;Art du Cuir,
            <br />
            <span className="text-or">Fait Main.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
          >
            Des pièces uniques en cuir pleine fleur, façonnées à la main par
            nos artisans dans la tradition tunisienne séculaire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/boutique">
              <Button variant="secondary" size="lg">
                Découvrir la collection
              </Button>
            </Link>
            <Link href="/blog/art-tannage-vegetal-tunisie">
              <Button
                variant="ghost"
                size="lg"
                className="text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                Notre Histoire
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
