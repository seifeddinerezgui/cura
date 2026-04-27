import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { mockProducts } from '@/lib/mock-data';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = mockProducts
    .filter(
      (p) =>
        p.category?.slug === product.category?.slug && p._id !== product._id
    )
    .slice(0, 4);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="flex items-center gap-2 text-xs text-pierre mb-8">
            <Link href="/" className="hover:text-cuir transition-colors">
              Accueil
            </Link>
            <ChevronRight size={12} />
            <Link href="/boutique" className="hover:text-cuir transition-colors">
              Boutique
            </Link>
            <ChevronRight size={12} />
            <Link
              href={`/boutique?category=${product.category?.slug}`}
              className="hover:text-cuir transition-colors"
            >
              {product.category?.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-charbon">{product.name}</span>
          </nav>
        </AnimatedSection>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection>
            <ImageGallery images={product.images} productName={product.name} />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <ProductInfo product={product} />
          </AnimatedSection>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
