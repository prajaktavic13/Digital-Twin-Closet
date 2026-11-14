import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { X, Sparkles, Bookmark, Ruler } from 'lucide-react';

export function ProductDetailModal({ product, onClose }) {
  const {
    equipGarment,
    toggleClosetItem,
    isInCloset,
    currentOutfit,
    fitProfile,
    setCurrentView
  } = useWardrobe();

  // Escape key support
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isEquipped =
    currentOutfit.top?.id === product.id ||
    currentOutfit.bottom?.id === product.id ||
    currentOutfit.shoes?.id === product.id ||
    currentOutfit.outerwear?.id === product.id ||
    currentOutfit.dress?.id === product.id;

  const inCloset = isInCloset(product.id);

  const handleTryOnAndOpenStudio = () => {
    equipGarment(product);
    setCurrentView('tryon');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8E2D9] shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1C1A] border border-[#E8E2D9] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Stage */}
        <div className="md:w-1/2 bg-[#FAF8F5] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E8E2D9] relative">
          <div className="w-full aspect-square max-w-[280px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#6B6661] border border-[#E8E2D9]">
            {product.category}
          </span>
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
                {product.brand}
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1E1C1A] mt-1 leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-serif text-2xl font-bold text-[#1E1C1A]">
                  ${product.price}
                </span>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9]">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <span className="text-xs font-medium text-[#1E1C1A]">
                    {product.color}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B6661] leading-relaxed">
              {product.description}
            </p>

            {/* Fabric & Material Details */}
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8A847C]">Fabric Composition:</span>
                <span className="font-medium text-[#1E1C1A] text-right">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A847C]">Weave Texture:</span>
                <span className="font-medium text-[#1E1C1A] capitalize">{product.textureType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A847C]">Category Slot:</span>
                <span className="font-medium text-[#1E1C1A] uppercase text-[10px] tracking-wider">{product.slot}</span>
              </div>
            </div>

            {/* Smart Size Fit Recommendation */}
            <div className="p-3 rounded-2xl bg-[#F4EFEA] border border-[#E2DBD0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-[#C4976A]" />
                <div>
                  <p className="text-[11px] font-bold text-[#1E1C1A]">
                    Recommended Size: {product.slot === 'bottom' ? fitProfile.bottomSize : fitProfile.topSize}
                  </p>
                  <p className="text-[10px] text-[#8A847C]">
                    Calibrated to your biometric profile ({fitProfile.shape})
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white text-emerald-700 border border-emerald-200">
                98% Fit Match
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-lg bg-[#FAF8F5] text-[#8A847C] border border-[#E8E2D9]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E8E2D9] flex items-center gap-2 mt-4">
            <button
              onClick={() => toggleClosetItem(product)}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center ${
                inCloset
                  ? 'bg-[#1E1C1A] text-[#C4976A] border-[#1E1C1A]'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#1E1C1A] border-[#E8E2D9]'
              }`}
              title={inCloset ? 'Remove from Closet' : 'Save to Closet'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleTryOnAndOpenStudio}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#C4976A]" />
              <span>{isEquipped ? 'Wearing (Open Studio)' : 'Try On 3D Avatar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
