'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-creme z-50 md:hidden shadow-2xl"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="mb-10">
                <span className="font-serif text-2xl font-bold tracking-wider text-cuir-dark">
                  CURA
                </span>
                <div className="w-12 h-[2px] bg-gradient-to-r from-or to-terracotta mt-2" />
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 px-4 text-sm uppercase tracking-widest text-charbon hover:text-terracotta hover:bg-sable/50 rounded-sm transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="w-full h-[1px] bg-pierre-light/30 mb-6" />
                <p className="text-xs text-pierre leading-relaxed">
                  Maroquinerie artisanale tunisienne.
                  <br />
                  Fait main avec passion.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
