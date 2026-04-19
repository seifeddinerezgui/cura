'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductGrid from '@/components/shop/ProductGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/lib/types';

export default function BoutiquePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999]);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Filter by category
    if (selectedCategory) {
      products = products.filter(
        (p) => p.category?.slug === selectedCategory
      );
    }

    // Filter by price
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return products;
  }, [selectedCategory, priceRange, sortBy]);

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange([0, 999]);
    setSortBy('newest');
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-or font-medium">
            Collection
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charbon mt-3 mb-4 line-decoration-center">
            Notre Boutique
          </h1>
          <p className="text-pierre max-w-xl mx-auto">
            Chaque pièce est une œuvre unique, façonnée à la main avec du cuir
            premium et un savoir-faire ancestral tunisien.
          </p>
        </AnimatedSection>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden w-full mb-6 py-3 px-4 border border-pierre-light/30 rounded-sm text-sm text-charbon flex items-center justify-center gap-2 hover:bg-sable transition-colors"
        >
          Filtres {mobileFiltersOpen ? '▲' : '▼'}
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setPriceRange}
              onSortChange={setSortBy}
              onReset={handleReset}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-pierre">
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
