import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Bookmark,
  Layers,
  Ruler,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tryon', label: 'Virtual Try-On', icon: Sparkles, badge: 'Studio' },
  { id: 'catalogue', label: 'Catalogue', icon: ShoppingBag },
  { id: 'closet', label: 'My Closet', icon: Bookmark, countKey: 'closet' },
  { id: 'outfits', label: 'Saved Outfits', icon: Layers, countKey: 'outfits' },
  { id: 'measurements', label: 'Measurements', icon: Ruler }
];

export function Sidebar({ mobileOpen, setMobileOpen }) {
  const { currentView, setCurrentView, closetItems, savedOutfits, fitProfile } = useWardrobe();

  const handleSelect = (id) => {
    setCurrentView(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-[#F8F5F0] border-r border-[#E8E2D9] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-[#E8E2D9]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E1C1A] text-white flex items-center justify-center font-serif font-bold text-lg tracking-wider shadow-sm">
                A
              </div>
              <div>
                <h1 className="font-serif text-lg font-semibold tracking-tight text-[#1E1C1A] leading-tight">
                  ATELIER
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-[#9E9891] font-medium">
                  Digital Twin Closet
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              let count = null;
              if (item.countKey === 'closet') count = closetItems.length;
              if (item.countKey === 'outfits') count = savedOutfits.length;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-[#1E1C1A] text-white shadow-xs font-semibold'
                      : 'text-[#6B6661] hover:text-[#1E1C1A] hover:bg-[#EFE9DF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#C4976A]' : 'text-[#8A847C]'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${
                        isActive
                          ? 'bg-[#C4976A] text-[#1E1C1A]'
                          : 'bg-[#EAE4D9] text-[#6B6661]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {count !== null && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EAE4D9] text-[#6B6661]'
                      }`}>
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Digital Twin Profile Card at Bottom */}
        <div className="p-4 border-t border-[#E8E2D9]">
          <div
            onClick={() => handleSelect('measurements')}
            className="p-3 bg-white/70 hover:bg-white rounded-2xl border border-[#E8E2D9] transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9E9891]">
                Active Body Profile
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F3EFEA] text-[#C4976A]">
                {fitProfile.topSize}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#1E1C1A] font-medium">
              <span>{fitProfile.shape}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#9E9891] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-[#8A847C] mt-1">
              {fitProfile.bmiCategory}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
