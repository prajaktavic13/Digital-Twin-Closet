import React, { useState, useMemo } from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { CATEGORIES } from '../../data/products';
import {
  Bookmark,
  Sparkles,
  Trash2,
  ShoppingBag,
  Check
} from 'lucide-react';

export function ClosetView() {
  const {
    closetItems,
    toggleClosetItem,
    equipGarment,
    currentOutfit,
    setCurrentView
  } = useWardrobe();

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter items in closet
  const filteredItems = useMemo(() => {
    return closetItems.filter((p) => {
      return selectedCategory === 'All' || p.category === selectedCategory;
    });
  }, [closetItems, selectedCategory]);

  const totalValue = closetItems.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
            Personal Wardrobe Library
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1E1C1A] mt-1 tracking-tight">
            My Digital Closet
          </h1>
          <p className="text-sm text-[#6B6661] mt-1 font-light">
            Your saved pieces preserved in local storage. Click "Wear Now" to simulate them on your avatar.
          </p>
        </div>

        {/* Closet Stats summary */}
        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-2xl border border-[#E8E2D9] shadow-2xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9E9891]">Total Pieces</span>
            <p className="font-serif text-lg font-bold text-[#1E1C1A]">{closetItems.length}</p>
          </div>
          <div className="h-8 w-px bg-[#E8E2D9]"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#9E9891]">Estimated Value</span>
            <p className="font-serif text-lg font-bold text-emerald-700">${totalValue}</p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      {closetItems.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? closetItems.length
              : closetItems.filter(p => p.category === cat).length;
            if (cat !== 'All' && count === 0) return null;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-[#1E1C1A] text-white shadow-2xs'
                    : 'bg-white text-[#6B6661] hover:text-[#1E1C1A] border border-[#E8E2D9]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-[#F3EFEA] text-[#8A847C]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Closet Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-[#E8E2D9] space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center mx-auto text-[#C4976A]">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1E1C1A]">
              Your Closet is Currently Empty
            </h3>
            <p className="text-xs text-[#8A847C] mt-1 max-w-sm mx-auto leading-relaxed">
              Browse the curated 2026 catalogue and click the bookmark button on any piece to save it to your personal closet.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('catalogue')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#C4976A]" />
            <span>Browse Catalogue</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((product) => {
            const isEquipped =
              currentOutfit.top?.id === product.id ||
              currentOutfit.bottom?.id === product.id ||
              currentOutfit.shoes?.id === product.id ||
              currentOutfit.outerwear?.id === product.id ||
              currentOutfit.dress?.id === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 border border-[#E8E2D9] hover:border-[#C4976A] transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]/70 overflow-hidden mb-3 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#6B6661] border border-[#E8E2D9]">
                      {product.category}
                    </span>

                    <button
                      onClick={() => toggleClosetItem(product)}
                      title="Remove from Closet"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-red-50 text-[#8A847C] hover:text-red-600 border border-[#E8E2D9] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9E9891]">
                    {product.brand}
                  </span>
                  <h4 className="text-xs font-semibold text-[#1E1C1A] truncate mt-0.5" title={product.name}>
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: product.colorHex }}
                    />
                    <span className="text-[11px] text-[#6B6661] truncate">{product.color}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                    ${product.price}
                  </span>

                  <button
                    onClick={() => equipGarment(product)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                      isEquipped
                        ? 'bg-[#F3EFEA] text-[#1E1C1A] border border-[#E8E2D9]'
                        : 'bg-[#1E1C1A] hover:bg-[#33302E] text-white shadow-xs active:scale-95'
                    }`}
                  >
                    {isEquipped ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Wearing</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#C4976A]" />
                        <span>Wear Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
