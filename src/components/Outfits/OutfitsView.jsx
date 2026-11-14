import React, { useState } from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import {
  Layers,
  Sparkles,
  Trash2,
  Calendar,
  BookmarkPlus
} from 'lucide-react';

export function OutfitsView() {
  const {
    savedOutfits,
    deleteSavedOutfit,
    equipOutfit,
    saveCurrentOutfitAs,
    setCurrentView
  } = useWardrobe();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    const success = saveCurrentOutfitAs(nameInput, notesInput);
    if (success) {
      setCreateModalOpen(false);
      setNameInput('');
      setNotesInput('');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
            Curated Ensembles & Pairings
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1E1C1A] mt-1 tracking-tight">
            Saved Outfits
          </h1>
          <p className="text-sm text-[#6B6661] mt-1 font-light">
            Review and equip complete combinations of tops, bottoms, outerwear and footwear on your 3D digital twin.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
        >
          <BookmarkPlus className="w-4 h-4 text-[#C4976A]" />
          <span>Save Current Outfit</span>
        </button>
      </div>

      {/* Outfits List */}
      {savedOutfits.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-[#E8E2D9] space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center mx-auto text-[#C4976A]">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1E1C1A]">
              No Outfits Saved Yet
            </h3>
            <p className="text-xs text-[#8A847C] mt-1 max-w-sm mx-auto leading-relaxed">
              Open the Virtual Try-On studio, fit your favorite tops, trousers, and shoes, and save the combination here.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('tryon')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1C1A] text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-[#33302E]"
          >
            <Sparkles className="w-4 h-4 text-[#C4976A]" />
            <span>Open Try-On Studio</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedOutfits.map((outfit) => {
            const pieces = [
              outfit.top,
              outfit.bottom,
              outfit.shoes,
              outfit.outerwear,
              outfit.dress
            ].filter(Boolean);

            const totalPrice = pieces.reduce((acc, p) => acc + p.price, 0);

            return (
              <div
                key={outfit.id}
                className="bg-white rounded-3xl p-5 border border-[#E8E2D9] hover:border-[#C4976A] transition-all flex flex-col justify-between shadow-2xs hover:shadow-md group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-[#8A847C] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {outfit.date || 'Saved Look'}
                    </span>

                    <button
                      onClick={() => deleteSavedOutfit(outfit.id)}
                      title="Delete Outfit"
                      className="p-1.5 text-[#8A847C] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#1E1C1A]">
                    {outfit.name}
                  </h3>

                  {outfit.notes && (
                    <p className="text-xs text-[#6B6661] mt-1 line-clamp-2">
                      {outfit.notes}
                    </p>
                  )}

                  {/* Garment Piece Thumbnails Grid */}
                  <div className="grid grid-cols-4 gap-2 my-4">
                    {pieces.map((piece) => (
                      <div
                        key={piece.id}
                        className="aspect-square bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] p-1.5 flex flex-col items-center justify-center relative overflow-hidden group/thumb"
                        title={`${piece.category}: ${piece.name}`}
                      >
                        <img
                          src={piece.image}
                          alt={piece.name}
                          className="w-full h-full object-contain"
                        />
                        <span
                          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: piece.colorHex }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Piece breakdown list */}
                  <div className="space-y-1 text-xs text-[#6B6661] border-t border-[#E8E2D9] pt-3">
                    {outfit.top && (
                      <div className="flex justify-between truncate">
                        <span className="text-[#9E9891]">Top:</span>
                        <span className="font-medium text-[#1E1C1A] truncate max-w-[170px]">{outfit.top.name}</span>
                      </div>
                    )}
                    {outfit.bottom && (
                      <div className="flex justify-between truncate">
                        <span className="text-[#9E9891]">Bottom:</span>
                        <span className="font-medium text-[#1E1C1A] truncate max-w-[170px]">{outfit.bottom.name}</span>
                      </div>
                    )}
                    {outfit.outerwear && (
                      <div className="flex justify-between truncate">
                        <span className="text-[#9E9891]">Outerwear:</span>
                        <span className="font-medium text-[#1E1C1A] truncate max-w-[170px]">{outfit.outerwear.name}</span>
                      </div>
                    )}
                    {outfit.shoes && (
                      <div className="flex justify-between truncate">
                        <span className="text-[#9E9891]">Shoes:</span>
                        <span className="font-medium text-[#1E1C1A] truncate max-w-[170px]">{outfit.shoes.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with total price & Equip Button */}
                <div className="mt-4 pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#9E9891] uppercase tracking-wider block">Look Total</span>
                    <span className="font-serif text-base font-semibold text-[#1E1C1A]">
                      ${totalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => equipOutfit(outfit)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C4976A]" />
                    <span>Equip on 3D Avatar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Save Current Outfit Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8E2D9] shadow-2xl relative space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
                Atelier Archive
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#1E1C1A]">
                Save Current Look
              </h3>
              <p className="text-xs text-[#8A847C] mt-1">
                Name this outfit combination to store it in your collection.
              </p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1C1A] mb-1.5">
                  Outfit Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Charcoal & Denim"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] text-xs sm:text-sm text-[#1E1C1A] placeholder:text-[#9E9891] focus:outline-none focus:border-[#C4976A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1C1A] mb-1.5">
                  Styling Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Occasion, styling tips, pairing advice..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] text-xs sm:text-sm text-[#1E1C1A] placeholder:text-[#9E9891] focus:outline-none focus:border-[#C4976A]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6661] hover:bg-[#FAF8F5] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#1E1C1A] hover:bg-[#33302E] text-white rounded-xl shadow-xs"
                >
                  Save Outfit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
