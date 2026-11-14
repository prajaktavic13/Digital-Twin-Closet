import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Search, X } from 'lucide-react';

export function CatalogueView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc'
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));

      return categoryMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // Default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
            Curated Wardrobe • Spring / Summer 2026
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1E1C1A] mt-1 tracking-tight">
            Demonstration Catalogue
          </h1>
          <p className="text-sm text-[#6B6661] mt-1 font-light">
            Select any garment to instantly simulate fitting on your 3D digital avatar.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8A847C]">
          <span>Showing <strong className="text-[#1E1C1A]">{filteredProducts.length}</strong> of {PRODUCTS.length} pieces</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8A847C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by garment, brand, or color..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-[#E8E2D9] text-xs sm:text-sm text-[#1E1C1A] placeholder:text-[#9E9891] focus:outline-none focus:border-[#C4976A] transition-colors shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A847C] hover:text-[#1E1C1A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8A847C] hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-[#E8E2D9] rounded-2xl text-xs font-medium text-[#1E1C1A] focus:outline-none focus:border-[#C4976A] shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#1E1C1A] text-white shadow-xs'
                  : 'bg-white text-[#6B6661] hover:text-[#1E1C1A] border border-[#E8E2D9] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2D9] space-y-3">
          <p className="font-serif text-lg text-[#1E1C1A]">No garments found</p>
          <p className="text-xs text-[#8A847C]">Try clearing your search query or choosing another category</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#1E1C1A] text-white rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectDetail={(p) => setActiveDetailProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          onClose={() => setActiveDetailProduct(null)}
        />
      )}
    </div>
  );
}
