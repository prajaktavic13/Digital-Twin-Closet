import React, { useState } from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { AvatarCanvas } from '../3D/AvatarCanvas';
import { PRODUCTS } from '../../data/products';
import {
  Sparkles,
  RotateCcw,
  BookmarkPlus,
  Shuffle,
  ChevronRight,
  X,
  Check,
  Ruler
} from 'lucide-react';

const TRAY_TABS = [
  { id: 'all', label: 'All Garments' },
  { id: 'top', label: 'Tops & Shirts' },
  { id: 'bottom', label: 'Trousers & Jeans' },
  { id: 'outerwear', label: 'Jackets & Coats' },
  { id: 'shoes', label: 'Footwear' },
  { id: 'dress', label: 'Dresses' }
];

export function TryOnStudio() {
  const {
    currentOutfit,
    equipGarment,
    removeGarment,
    resetOutfit,
    randomizeOutfit,
    saveCurrentOutfitAs,
    fitProfile,
    measurements,
    setCurrentView
  } = useWardrobe();

  const [activeTab, setActiveTab] = useState('all');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [outfitNotes, setOutfitNotes] = useState('');

  // Filter garments for the bottom selector tray
  const trayProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'top') return p.slot === 'top';
    if (activeTab === 'bottom') return p.slot === 'bottom';
    if (activeTab === 'outerwear') return p.slot === 'outerwear';
    if (activeTab === 'shoes') return p.slot === 'shoes';
    if (activeTab === 'dress') return p.slot === 'dress';
    return true;
  });

  const handleSaveOutfit = (e) => {
    e.preventDefault();
    const success = saveCurrentOutfitAs(outfitName, outfitNotes);
    if (success) {
      setSaveModalOpen(false);
      setOutfitName('');
      setOutfitNotes('');
    }
  };

  // Active outfit slots definition
  const slots = [
    { key: 'top', label: 'Top / Shirt', item: currentOutfit.top },
    { key: 'bottom', label: 'Bottom / Trousers', item: currentOutfit.bottom },
    { key: 'outerwear', label: 'Outerwear Layer', item: currentOutfit.outerwear },
    { key: 'shoes', label: 'Footwear', item: currentOutfit.shoes },
    { key: 'dress', label: 'Full Dress', item: currentOutfit.dress }
  ].filter(s => s.key !== 'dress' || s.item); // Show dress slot only if equipped or needed

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C4976A] animate-ping"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
              Live 3D Atelier Studio
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1C1A] mt-0.5 tracking-tight">
            Virtual Try-On & Styling
          </h1>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={randomizeOutfit}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF8F5] text-[#1E1C1A] text-xs font-semibold rounded-xl border border-[#E8E2D9] shadow-2xs transition-all active:scale-95"
            title="Randomize stylish combination"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C4976A]" />
            <span>Randomize Look</span>
          </button>

          <button
            onClick={resetOutfit}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF8F5] text-[#1E1C1A] text-xs font-semibold rounded-xl border border-[#E8E2D9] shadow-2xs transition-all active:scale-95"
            title="Clear all clothing from avatar"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8A847C]" />
            <span>Reset Outfit</span>
          </button>

          <button
            onClick={() => setSaveModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-[#C4976A]" />
            <span>Save Outfit</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Interactive 3D Avatar Viewport */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-4">
          <div className="h-[520px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-sm relative border border-[#E8E2D9]">
            <AvatarCanvas height="h-full" />
          </div>

          {/* Biometric Fit Bar under canvas */}
          <div className="p-4 bg-white rounded-2xl border border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center shrink-0">
                <Ruler className="w-4 h-4 text-[#C4976A]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#1E1C1A]">
                  Active Twin Dimensions: {measurements.height}cm • {measurements.weight}kg
                </h4>
                <p className="text-[11px] text-[#8A847C]">
                  Chest {measurements.chest}cm • Waist {measurements.waist}cm • Hips {measurements.hips}cm ({fitProfile.shape})
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('measurements')}
              className="text-xs font-semibold text-[#C4976A] hover:text-[#9A7045] flex items-center gap-1 self-start sm:self-center"
            >
              <span>Modify Measurements</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Active Pieces Slots & Garment Selection */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Active Slots Card */}
          <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
              <h3 className="font-serif text-base font-semibold text-[#1E1C1A]">
                Fitted Garment Slots
              </h3>
              <span className="text-[11px] font-medium text-[#8A847C]">
                Click <X className="w-3 h-3 inline text-red-500" /> to remove
              </span>
            </div>

            <div className="space-y-2.5">
              {slots.map((slot) => (
                <div
                  key={slot.key}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    slot.item
                      ? 'bg-[#FAF8F5] border-[#E8E2D9] hover:border-[#C4976A]'
                      : 'bg-[#FDFBF7] border-dashed border-[#D9D2C7]'
                  }`}
                >
                  {slot.item ? (
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-white border border-[#E8E2D9] p-1 shrink-0 overflow-hidden">
                        <img src={slot.item.image} alt={slot.item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9E9891]">
                          {slot.label}
                        </span>
                        <h4 className="text-xs font-semibold text-[#1E1C1A] truncate" title={slot.item.name}>
                          {slot.item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: slot.item.colorHex }}
                          />
                          <span className="text-[10px] text-[#6B6661] truncate">{slot.item.color}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 text-[#8A847C]">
                      <div className="w-10 h-10 rounded-xl border border-dashed border-[#D9D2C7] flex items-center justify-center text-[10px] uppercase font-bold text-[#A8A196]">
                        {slot.key.slice(0, 3)}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#8A847C]">Empty {slot.label}</span>
                        <p className="text-[10px] text-[#A8A196]">Select a piece below to fit</p>
                      </div>
                    </div>
                  )}

                  {slot.item ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif text-xs font-semibold text-[#1E1C1A]">
                        ${slot.item.price}
                      </span>
                      <button
                        onClick={() => removeGarment(slot.key)}
                        title={`Remove ${slot.item.name}`}
                        className="p-1.5 rounded-lg text-[#8A847C] hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab(slot.key)}
                      className="px-2.5 py-1 text-[10px] font-semibold bg-white border border-[#E8E2D9] rounded-lg text-[#1E1C1A] hover:bg-[#FAF8F5]"
                    >
                      Browse
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wardrobe Selector Tray */}
          <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E1C1A]">
                Garment Selector
              </h3>
              <span className="text-xs text-[#8A847C]">
                {trayProducts.length} options
              </span>
            </div>

            {/* Category Sub-tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {TRAY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#1E1C1A] text-white shadow-2xs'
                      : 'bg-[#FAF8F5] text-[#6B6661] hover:text-[#1E1C1A] border border-[#E8E2D9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Compact Garment List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {trayProducts.map((p) => {
                const isEquipped =
                  currentOutfit.top?.id === p.id ||
                  currentOutfit.bottom?.id === p.id ||
                  currentOutfit.shoes?.id === p.id ||
                  currentOutfit.outerwear?.id === p.id ||
                  currentOutfit.dress?.id === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => equipGarment(p)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isEquipped
                        ? 'bg-[#F4EFEA] border-[#C4976A] ring-1 ring-[#C4976A]/40'
                        : 'bg-[#FAF8F5] hover:bg-white border-[#E8E2D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D9] p-1 shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#9E9891]">
                            {p.brand}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: p.colorHex }}
                          />
                        </div>
                        <h4 className="text-xs font-semibold text-[#1E1C1A] truncate" title={p.name}>
                          {p.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif text-xs font-semibold text-[#1E1C1A]">
                        ${p.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          equipGarment(p);
                        }}
                        className={`p-1.5 rounded-xl text-xs font-medium transition-all ${
                          isEquipped
                            ? 'bg-[#1E1C1A] text-[#C4976A]'
                            : 'bg-white group-hover:bg-[#1E1C1A] text-[#1E1C1A] group-hover:text-white border border-[#E8E2D9]'
                        }`}
                      >
                        {isEquipped ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Save Outfit Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8E2D9] shadow-2xl relative space-y-4">
            <button
              onClick={() => setSaveModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#8A847C] hover:text-[#1E1C1A]"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
                Atelier Archive
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1E1C1A]">
                Save Current Look
              </h3>
              <p className="text-xs text-[#8A847C] mt-1">
                Store this combination of fitted pieces to your saved outfits library.
              </p>
            </div>

            <form onSubmit={handleSaveOutfit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1C1A] mb-1.5">
                  Outfit Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Parisian Gallery Opening, Milanese Tailoring"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] text-xs sm:text-sm text-[#1E1C1A] placeholder:text-[#9E9891] focus:outline-none focus:border-[#C4976A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1C1A] mb-1.5">
                  Styling Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Best paired with clean sneakers and minimal leather accessories."
                  value={outfitNotes}
                  onChange={(e) => setOutfitNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] text-xs sm:text-sm text-[#1E1C1A] placeholder:text-[#9E9891] focus:outline-none focus:border-[#C4976A]"
                ></textarea>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#9E9891]">Pieces in this look:</span>
                <p className="text-[#1E1C1A] truncate">
                  {currentOutfit.top ? `Top: ${currentOutfit.top.name}` : ''}
                  {currentOutfit.bottom ? ` • Bottom: ${currentOutfit.bottom.name}` : ''}
                  {currentOutfit.outerwear ? ` • Outerwear: ${currentOutfit.outerwear.name}` : ''}
                  {currentOutfit.shoes ? ` • Shoes: ${currentOutfit.shoes.name}` : ''}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSaveModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6661] hover:bg-[#FAF8F5] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#1E1C1A] hover:bg-[#33302E] text-white rounded-xl shadow-xs"
                >
                  Save to Outfits
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
