import Link from 'next/link';
import { MapPin, Phone, Mail, Camera, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charbon text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wider mb-4">
              CURA
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-or to-terracotta mb-4" />
            <p className="text-sm leading-relaxed text-white/60">
              Maroquinerie artisanale tunisienne. Chaque pièce raconte une
              histoire de tradition, de passion et de savoir-faire transmis
              depuis des générations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-or mb-6 font-medium">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/boutique', label: 'Boutique' },
                { href: '/blog', label: 'Journal' },
                { href: '/boutique?category=ceintures', label: 'Ceintures' },
                { href: '/boutique?category=portefeuilles', label: 'Portefeuilles' },
                { href: '/boutique?category=sacs', label: 'Sacs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-or transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-or mb-6 font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-or mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">
                  15 Rue de la Médina
                  <br />
                  1000 Tunis, Tunisie
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-or flex-shrink-0" />
                <span className="text-sm text-white/60">+216 71 234 567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-or flex-shrink-0" />
                <span className="text-sm text-white/60">contact@cura.tn</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-or mb-6 font-medium">
              Suivez-nous
            </h4>
            <div className="flex gap-4 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-or hover:border-or transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-or hover:border-or transition-all duration-300"
                aria-label="Facebook"
              >
                <Share2 size={18} />
              </a>
            </div>

            <h4 className="text-xs uppercase tracking-[0.2em] text-or mb-3 font-medium">
              Newsletter
            </h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-white/10 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-or transition-colors"
              />
              <button
                type="submit"
                className="bg-or text-charbon px-4 py-2 rounded-sm text-xs uppercase tracking-wide font-medium hover:bg-or-light transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} CURA. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">
              Mentions légales
            </span>
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">
              Politique de confidentialité
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
