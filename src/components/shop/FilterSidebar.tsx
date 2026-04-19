'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { mockCategories } from '@/lib/mock-data';

interface FilterSidebarProps {
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: 'Tous les prix', range: [0, 999] },
    { label: 'Moins de 50 TND', range: [0, 50] },
    { label: '50 - 100 TND', range: [50, 100] },
    { label: '100 - 200 TND', range: [100, 200] },
    { label: 'Plus de 200 TND', range: [200, 999] },
  ];

  const hasActiveFilters =
    selectedCategory !== '' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 999 ||
    sortBy !== 'newest';

  return (
    <aside className="w-full lg:w-64 flex-shrink-0" id="filter-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-cuir" />
          <h3 className="text-sm uppercase tracking-widest text-charbon font-medium">
            Filtres
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-terracotta hover:text-terracotta-dark flex items-center gap-1 transition-colors"
          >
            <X size={12} />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-xs uppercase tracking-wider text-pierre font-medium mb-3">
          Catégorie
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition-all duration-200 ${
              selectedCategory === ''
                ? 'bg-cuir text-white'
                : 'text-charbon hover:bg-sable'
            }`}
          >
            Toutes
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition-all duration-200 ${
                selectedCategory === cat.slug
                  ? 'bg-cuir text-white'
                  : 'text-charbon hover:bg-sable'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-xs uppercase tracking-wider text-pierre font-medium mb-3">
          Prix
        </h4>
        <div className="space-y-1">
          {priceRanges.map((pr) => (
            <button
              key={pr.label}
              onClick={() => onPriceChange(pr.range)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-sm transition-all duration-200 ${
                priceRange[0] === pr.range[0] && priceRange[1] === pr.range[1]
                  ? 'bg-cuir text-white'
                  : 'text-charbon hover:bg-sable'
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-8">
        <h4 className="text-xs uppercase tracking-wider text-pierre font-medium mb-3">
          Trier par
        </h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-white border border-pierre-light/30 rounded-sm px-3 py-2.5 text-sm text-charbon focus:outline-none focus:border-cuir transition-colors cursor-pointer"
        >
          <option value="newest">Plus récents</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name">Nom A-Z</option>
        </select>
      </div>
    </aside>
  );
}
