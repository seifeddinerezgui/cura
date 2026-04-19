'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Send, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-cuir-dark relative overflow-hidden" id="newsletter">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
            Restez Informé
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Rejoignez Notre Cercle
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-10">
            Recevez en avant-première nos nouvelles créations, des conseils
            d&apos;entretien et des offres exclusives.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-sm px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-or focus:bg-white/15 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={submitted}
              className="bg-or hover:bg-or-light text-charbon px-6 py-3.5 rounded-sm text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {submitted ? (
                <>
                  <Check size={16} /> Merci !
                </>
              ) : (
                <>
                  <Send size={16} /> S&apos;inscrire
                </>
              )}
            </button>
          </form>

          <p className="text-white/30 text-xs mt-4">
            Pas de spam. Désabonnement possible à tout moment.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
