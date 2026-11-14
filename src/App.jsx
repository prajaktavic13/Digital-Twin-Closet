import React, { useState, Suspense, lazy } from 'react';
import { WardrobeProvider } from './context/WardrobeContext';
import { useWardrobe } from './context/useWardrobe';
import { Sidebar } from './components/Navigation/Sidebar';
import { Header } from './components/Navigation/Header';
import { Toast } from './components/Common/Toast';

const DashboardView = lazy(() => import('./components/Dashboard/DashboardView').then(m => ({ default: m.DashboardView })));
const TryOnStudio = lazy(() => import('./components/TryOn/TryOnStudio').then(m => ({ default: m.TryOnStudio })));
const CatalogueView = lazy(() => import('./components/Catalogue/CatalogueView').then(m => ({ default: m.CatalogueView })));
const ClosetView = lazy(() => import('./components/Closet/ClosetView').then(m => ({ default: m.ClosetView })));
const OutfitsView = lazy(() => import('./components/Outfits/OutfitsView').then(m => ({ default: m.OutfitsView })));
const MeasurementsView = lazy(() => import('./components/Measurements/MeasurementsView').then(m => ({ default: m.MeasurementsView })));

function ViewLoader() {
  return (
    <div className="h-96 flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 border-2 border-[#C4976A]/30 border-t-[#C4976A] rounded-full animate-spin"></div>
      <p className="text-xs uppercase tracking-widest text-[#8A847C] font-medium">Loading Atelier View...</p>
    </div>
  );
}

function MainLayout() {
  const { currentView } = useWardrobe();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1C1A] flex flex-col lg:flex-row antialiased selection:bg-[#C4976A]/20">
      {/* Navigation Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<ViewLoader />}>
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'tryon' && <TryOnStudio />}
            {currentView === 'catalogue' && <CatalogueView />}
            {currentView === 'closet' && <ClosetView />}
            {currentView === 'outfits' && <OutfitsView />}
            {currentView === 'measurements' && <MeasurementsView />}
          </Suspense>
        </main>
      </div>

      {/* Global Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <WardrobeProvider>
      <MainLayout />
    </WardrobeProvider>
  );
}
