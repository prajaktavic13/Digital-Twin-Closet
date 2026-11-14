import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { Menu, Sparkles } from 'lucide-react';

const PAGE_TITLES = {
  dashboard: { title: 'Atelier Dashboard', subtitle: 'Digital wardrobe overview & 3D avatar preview' },
  tryon: { title: '3D Virtual Try-On Studio', subtitle: 'Real-time interactive garment fitting on your avatar' },
  catalogue: { title: 'Demonstration Collection', subtitle: 'Curated 2026 essentials with architectural cuts' },
  closet: { title: 'My Digital Closet', subtitle: 'Saved wardrobe items and curated combinations' },
  outfits: { title: 'Saved Outfits', subtitle: 'Complete looks assembled and fitted' },
  measurements: { title: 'Body Measurements', subtitle: 'Configure biometric twin proportions and sizing' }
};

export function Header({ setMobileOpen }) {
  const { currentView, setCurrentView, currentOutfit } = useWardrobe();
  const page = PAGE_TITLES[currentView] || PAGE_TITLES.dashboard;

  const activePiecesCount = [
    currentOutfit.top,
    currentOutfit.bottom,
    currentOutfit.shoes,
    currentOutfit.outerwear,
    currentOutfit.dress
  ].filter(Boolean).length;

  return (
    <header className="h-20 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#E8E2D9] px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-[#E8E2D9] bg-white text-[#1E1C1A] hover:bg-[#F3EFEA]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1C1A] tracking-tight">
            {page.title}
          </h2>
          <p className="text-xs text-[#8A847C] hidden sm:block">
            {page.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Active Outfit Badge */}
        <button
          onClick={() => setCurrentView('tryon')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8E2D9] bg-white text-xs font-medium text-[#1E1C1A] hover:border-[#C4976A] transition-all shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#C4976A]"></span>
          <span className="hidden sm:inline">Active Look:</span>
          <span className="font-semibold">{activePiecesCount} pieces</span>
        </button>

        {/* Quick Try-On CTA if not on tryon view */}
        {currentView !== 'tryon' && (
          <button
            onClick={() => setCurrentView('tryon')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs sm:text-sm font-medium rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#C4976A]" />
            <span>Open Studio</span>
          </button>
        )}
      </div>
    </header>
  );
}
