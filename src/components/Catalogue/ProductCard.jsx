import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { Bookmark, Sparkles, Eye, Check } from 'lucide-react';

export function ProductCard({ product, onSelectDetail }) {
  const {
    equipGarment,
    toggleClosetItem,
    isInCloset,
    currentOutfit
  } = useWardrobe();

  const isEquipped =
    currentOutfit.top?.id === product.id ||
    currentOutfit.bottom?.id === product.id ||
    currentOutfit.shoes?.id === product.id ||
    currentOutfit.outerwear?.id === product.id ||
    currentOutfit.dress?.id === product.id;

  const inCloset = isInCloset(product.id);

  return (
    <div className="bg-white rounded-3xl p-4 border border-[#E8E2D9] hover:border-[#C4976A] transition-all duration-300 group flex flex-col justify-between shadow-2xs hover:shadow-md">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]/70 overflow-hidden mb-4 p-4 flex items-center justify-center cursor-pointer"
           onClick={() => onSelectDetail(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-[#6B6661] border border-[#E8E2D9] shadow-2xs">
            {product.category}
          </span>
          {isEquipped && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E1C1A] text-white flex items-center gap-1 shadow-2xs">
              <Check className="w-2.5 h-2.5 text-[#C4976A]" /> Wearing
            </span>
          )}
        </div>

        {/* Wishlist / Save to Closet Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleClosetItem(product);
          }}
          title={inCloset ? "Remove from Closet" : "Save to Closet"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
            inCloset
              ? 'bg-[#1E1C1A] text-[#C4976A] border border-[#1E1C1A]'
              : 'bg-white/90 text-[#8A847C] hover:text-[#1E1C1A] border border-[#E8E2D9]'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Hover Quick View Button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 bg-white/90 text-xs font-semibold rounded-xl text-[#1E1C1A] shadow-xs flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9E9891]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: product.colorHex }}
              title={product.color}
            />
            <span className="text-[11px] text-[#8A847C] truncate max-w-[80px]">
              {product.color}
            </span>
          </div>
        </div>

        <h4
          onClick={() => onSelectDetail(product)}
          className="text-sm font-semibold text-[#1E1C1A] hover:text-[#C4976A] cursor-pointer transition-colors line-clamp-1"
          title={product.name}
        >
          {product.name}
        </h4>

        <p className="text-[11px] text-[#8A847C] line-clamp-1">
          {product.fabric}
        </p>
      </div>

      {/* Price & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between gap-2">
        <span className="font-serif text-base font-semibold text-[#1E1C1A]">
          ${product.price}
        </span>

        <button
          onClick={() => equipGarment(product)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
            isEquipped
              ? 'bg-[#F3EFEA] text-[#1E1C1A] border border-[#E8E2D9]'
              : 'bg-[#1E1C1A] hover:bg-[#33302E] text-white shadow-xs active:scale-95'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isEquipped ? 'text-emerald-600' : 'text-[#C4976A]'}`} />
          <span>{isEquipped ? 'Fitted' : 'Try On'}</span>
        </button>
      </div>
    </div>
  );
}
