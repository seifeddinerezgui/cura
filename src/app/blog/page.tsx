import type { Metadata } from 'next';
import ArticleCard from '@/components/blog/ArticleCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { mockBlogPosts } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Découvrez notre journal : articles sur l\'artisanat du cuir tunisien, conseils d\'entretien et portraits d\'artisans.',
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
            Journal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charbon mt-3 mb-4 line-decoration-center">
            Notre Journal
          </h1>
          <p className="text-pierre max-w-xl mx-auto">
            Histoires d&apos;artisanat, conseils d&apos;entretien et rencontres avec nos
            artisans. Plongez dans l&apos;univers CURA.
          </p>
        </AnimatedSection>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post, index) => (
            <AnimatedSection key={post._id} delay={index * 0.1}>
              <ArticleCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
