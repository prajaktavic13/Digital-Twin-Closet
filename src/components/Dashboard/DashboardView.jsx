import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { AvatarCanvas } from '../3D/AvatarCanvas';
import {
  Sparkles,
  Ruler,
  Bookmark,
  TrendingUp,
  Layers,
  ArrowRight
} from 'lucide-react';

export function DashboardView() {
  const {
    setCurrentView,
    closetItems,
    savedOutfits,
    recentItems,
    measurements,
    fitProfile,
    currentOutfit,
    equipGarment,
    loadDefaultLook
  } = useWardrobe();

  // Calculate total value of items in My Closet
  const closetValue = closetItems.reduce((acc, item) => acc + item.price, 0);

  // Active outfit pieces count
  const activePieces = [
    currentOutfit.top,
    currentOutfit.bottom,
    currentOutfit.shoes,
    currentOutfit.outerwear,
    currentOutfit.dress
  ].filter(Boolean);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Section */}
      <div className="bg-gradient-to-r from-[#F4EFEA] via-[#EFE8DD] to-[#FAF8F5] p-6 md:p-8 rounded-3xl border border-[#E8E2D9] relative overflow-hidden shadow-xs">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-[#E8E2D9] text-[11px] font-semibold text-[#8A847C] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Biometric Simulation Engine 2.6
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#1E1C1A] tracking-tight leading-tight">
            Your Digital Twin, <br className="hidden sm:inline" />
            <span className="italic font-light text-[#8A7865]">Tailored to Perfection.</span>
          </h1>
          <p className="text-sm md:text-base text-[#6B6661] font-light leading-relaxed">
            Experience real-time interactive 3D virtual fitting calibrated to your exact height, chest, waist, and hips measurements.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('tryon')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-sm font-medium rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#C4976A]" />
              <span>Launch Virtual Try-On</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('measurements')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#1E1C1A] text-sm font-medium rounded-xl border border-[#E8E2D9] shadow-xs transition-all"
            >
              <Ruler className="w-4 h-4 text-[#8A847C]" />
              <span>Calibrate Body Profile</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-6 -bottom-10 opacity-5 select-none pointer-events-none font-serif text-[180px] font-bold text-[#1E1C1A]">
          TWIN
        </div>
      </div>

      {/* 2. Wardrobe Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8A847C] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">My Closet</span>
            <Bookmark className="w-4 h-4 text-[#C4976A]" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#1E1C1A]">{closetItems.length}</div>
            <p className="text-xs text-[#8A847C] mt-1">Saved wardrobe essentials</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8A847C] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved Outfits</span>
            <Layers className="w-4 h-4 text-[#C4976A]" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#1E1C1A]">{savedOutfits.length}</div>
            <p className="text-xs text-[#8A847C] mt-1">Curated looks ready to wear</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8A847C] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Closet Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#1E1C1A]">${closetValue}</div>
            <p className="text-xs text-[#8A847C] mt-1">Demonstration valuation</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8A847C] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Tailored Size</span>
            <Ruler className="w-4 h-4 text-[#C4976A]" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#1E1C1A]">{fitProfile.topSize}</div>
            <p className="text-xs text-[#8A847C] mt-1">{fitProfile.shape}</p>
          </div>
        </div>
      </div>

      {/* 3. Main Center Split: Live 3D Avatar Preview & Currently Equipped Look */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: 3D Avatar Preview Window */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1E1C1A]">
                Digital Twin Interactive Preview
              </h3>
              <p className="text-xs text-[#8A847C]">
                Interactive mannequin responding to your custom measurements
              </p>
            </div>
            <button
              onClick={() => setCurrentView('tryon')}
              className="text-xs font-medium text-[#C4976A] hover:text-[#9A7045] flex items-center gap-1 transition-colors"
            >
              <span>Full Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[440px] w-full rounded-2xl overflow-hidden relative">
            <AvatarCanvas isCompact={true} height="h-full" />
          </div>
        </div>

        {/* Right: Currently Fitted Garments & Biometrics summary */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Active Outfit Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-[#1E1C1A]">
                Currently Wearing
              </h3>
              <span className="text-xs font-medium px-2.5 py-1 bg-[#F3EFEA] rounded-full text-[#6B6661]">
                {activePieces.length} active items
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[280px] pr-1">
              {activePieces.length === 0 ? (
                <div className="h-44 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#E8E2D9] rounded-2xl">
                  <p className="text-xs text-[#8A847C] mb-3">No clothes currently selected</p>
                  <button
                    onClick={loadDefaultLook}
                    className="px-3.5 py-1.5 text-xs font-medium bg-[#1E1C1A] text-white rounded-xl hover:bg-[#33302E] transition-all"
                  >
                    Equip Atelier Look
                  </button>
                </div>
              ) : (
                activePieces.map((piece) => (
                  <div
                    key={piece.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]/70 hover:border-[#C4976A] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] overflow-hidden p-1 shrink-0">
                        <img src={piece.image} alt={piece.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold tracking-wider text-[#9E9891] uppercase">
                          {piece.category}
                        </span>
                        <h4 className="text-xs font-semibold text-[#1E1C1A] truncate max-w-[160px]">
                          {piece.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: piece.colorHex }}
                          ></span>
                          <span className="text-[11px] text-[#6B6661]">{piece.color}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-semibold text-[#1E1C1A]">
                      ${piece.price}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
              <button
                onClick={() => setCurrentView('tryon')}
                className="w-full py-2.5 text-center text-xs font-semibold bg-[#1E1C1A] text-white rounded-xl hover:bg-[#33302E] transition-all shadow-xs"
              >
                Modify in 3D Studio
              </button>
            </div>
          </div>

          {/* Biometrics Quick Summary Card */}
          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#E8E2D9] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-[#9E9891] uppercase tracking-wider">
                Measurement Silhouette
              </span>
              <p className="text-sm font-serif font-semibold text-[#1E1C1A] mt-0.5">
                {measurements.height}cm • {measurements.weight}kg • {fitProfile.shape}
              </p>
              <p className="text-xs text-[#8A847C] mt-0.5">
                Chest {measurements.chest}cm / Waist {measurements.waist}cm / Hips {measurements.hips}cm
              </p>
            </div>
            <button
              onClick={() => setCurrentView('measurements')}
              className="p-2.5 bg-white hover:bg-[#F3EFEA] rounded-xl border border-[#E8E2D9] text-[#1E1C1A] transition-all shadow-2xs"
            >
              <Ruler className="w-4 h-4 text-[#C4976A]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Recently Selected Clothes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1E1C1A]">
              Recently Selected Garments
            </h3>
            <p className="text-xs text-[#8A847C]">
              Quickly re-equip previously tried garments with a single click
            </p>
          </div>
          <button
            onClick={() => setCurrentView('catalogue')}
            className="text-xs font-medium text-[#C4976A] hover:text-[#9A7045] flex items-center gap-1"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {recentItems.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-[#E8E2D9] hover:border-[#C4976A] transition-all group flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="relative aspect-square w-full rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]/60 overflow-hidden mb-3 p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 text-[#6B6661] border border-[#E8E2D9]">
                    {product.category}
                  </span>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9E9891]">
                  {product.brand}
                </span>
                <h4 className="text-xs font-semibold text-[#1E1C1A] truncate mt-0.5" title={product.name}>
                  {product.name}
                </h4>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                <span className="font-serif text-xs font-semibold text-[#1E1C1A]">
                  ${product.price}
                </span>
                <button
                  onClick={() => equipGarment(product)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#FAF8F5] group-hover:bg-[#1E1C1A] text-[#1E1C1A] group-hover:text-white rounded-lg transition-colors border border-[#E8E2D9]"
                >
                  Try On
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
