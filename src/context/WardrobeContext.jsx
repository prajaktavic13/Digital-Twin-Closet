import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Storage } from '../utils/storage';
import { calculateFitProfile } from '../utils/sizeCalculator';
import { DEFAULT_OUTFIT, PRODUCTS } from '../data/products';
import { WardrobeContext } from './useWardrobe';

export function WardrobeProvider({ children }) {
  // Navigation
  const [currentView, setCurrentView] = useState('dashboard');

  // Measurements
  const [measurements, setMeasurements] = useState(() => Storage.getMeasurements());

  // Derived fit profile (synchronous, no cascading state updates)
  const fitProfile = useMemo(() => calculateFitProfile(measurements), [measurements]);

  // Current Outfit on 3D Avatar
  const [currentOutfit, setCurrentOutfit] = useState(() => Storage.getCurrentOutfit());

  // Closet saved items
  const [closetItems, setClosetItems] = useState(() => Storage.getCloset());

  // Saved combinations
  const [savedOutfits, setSavedOutfits] = useState(() => Storage.getSavedOutfits());

  // Recently selected clothes
  const [recentItems, setRecentItems] = useState(() => Storage.getRecentItems());

  // 3D Canvas Controls
  const [cameraPreset, setCameraPreset] = useState('front');
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio' | 'warm' | 'editorial'
  const [avatarMode, setAvatarMode] = useState('avatar'); // 'avatar' | 'mannequin'

  // Toast Notification with reliable timeout cleanup
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ id: Date.now(), message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3200);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Persist measurements whenever changed
  useEffect(() => {
    Storage.saveMeasurements(measurements);
  }, [measurements]);

  // Persist outfit changes
  useEffect(() => {
    Storage.saveCurrentOutfit(currentOutfit);
  }, [currentOutfit]);

  // Persist closet changes
  useEffect(() => {
    Storage.saveCloset(closetItems);
  }, [closetItems]);

  // Persist saved outfits
  useEffect(() => {
    Storage.saveSavedOutfits(savedOutfits);
  }, [savedOutfits]);

  // Update measurements
  const updateMeasurements = (newMeasurements) => {
    setMeasurements(prev => ({ ...prev, ...newMeasurements }));
    showToast('Body measurements updated and synced with 3D Avatar', 'success');
  };

  // Equip garment onto 3D Avatar with strict dress / top / bottom exclusivity
  const equipGarment = (product) => {
    if (!product) return;

    setCurrentOutfit(prev => {
      let updated = { ...prev };
      if (product.slot === 'dress') {
        // Equipping a dress MUST clear existing top and bottom
        updated.dress = product;
        updated.top = null;
        updated.bottom = null;
      } else if (product.slot === 'top') {
        // Equipping a top MUST remove any equipped dress
        updated.top = product;
        updated.dress = null;
      } else if (product.slot === 'bottom') {
        // Equipping a bottom MUST remove any equipped dress
        updated.bottom = product;
        updated.dress = null;
      } else if (product.slot === 'shoes') {
        updated.shoes = product;
      } else if (product.slot === 'outerwear') {
        updated.outerwear = product;
      }
      return updated;
    });

    // Add to recent items
    Storage.addRecentItem(product);
    setRecentItems(Storage.getRecentItems());

    showToast(`Fitted ${product.name} on 3D Avatar`, 'success');
  };

  // Remove garment from slot
  const removeGarment = (slot) => {
    setCurrentOutfit(prev => {
      const updated = { ...prev, [slot]: null };
      return updated;
    });
    showToast(`Removed garment from ${slot}`, 'info');
  };

  // Reset entire outfit to defaults or bare
  const resetOutfit = () => {
    setCurrentOutfit({
      top: null,
      bottom: null,
      shoes: null,
      outerwear: null,
      dress: null
    });
    showToast('Reset outfit on 3D Avatar', 'info');
  };

  // Load default balanced look
  const loadDefaultLook = () => {
    setCurrentOutfit(DEFAULT_OUTFIT);
    showToast('Loaded signature Atelier look', 'success');
  };

  // Randomize a stylish outfit (supports both Top+Bottom combinations AND Dress combinations)
  const randomizeOutfit = () => {
    const dresses = PRODUCTS.filter(p => p.slot === 'dress');
    const tops = PRODUCTS.filter(p => p.slot === 'top');
    const bottoms = PRODUCTS.filter(p => p.slot === 'bottom');
    const shoes = PRODUCTS.filter(p => p.slot === 'shoes');
    const outerwear = PRODUCTS.filter(p => p.slot === 'outerwear');

    const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];
    const randomOuter = Math.random() > 0.45 ? outerwear[Math.floor(Math.random() * outerwear.length)] : null;

    // 30% chance for a dress look, 70% for top + bottom
    const isDressLook = Math.random() < 0.3 && dresses.length > 0;

    if (isDressLook) {
      const randomDress = dresses[Math.floor(Math.random() * dresses.length)];
      setCurrentOutfit({
        top: null,
        bottom: null,
        shoes: randomShoes,
        outerwear: randomOuter,
        dress: randomDress
      });
      showToast(`Curated look featuring ${randomDress.name}`, 'success');
    } else {
      const randomTop = tops[Math.floor(Math.random() * tops.length)];
      const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      setCurrentOutfit({
        top: randomTop,
        bottom: randomBottom,
        shoes: randomShoes,
        outerwear: randomOuter,
        dress: null
      });
      showToast('Curated a randomized editorial look', 'success');
    }
  };

  // Toggle item in My Closet
  const toggleClosetItem = (product) => {
    if (!product) return;
    const exists = closetItems.some(item => item.id === product.id);
    if (exists) {
      setClosetItems(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed ${product.name} from My Closet`, 'info');
    } else {
      setClosetItems(prev => [product, ...prev]);
      showToast(`Saved ${product.name} to My Closet`, 'success');
    }
  };

  const isInCloset = (productId) => {
    return closetItems.some(item => item.id === productId);
  };

  // Save current combination as an outfit
  const saveCurrentOutfitAs = (name, notes = '') => {
    if (!currentOutfit.top && !currentOutfit.bottom && !currentOutfit.dress) {
      showToast('Select at least a top, bottom or dress to save an outfit', 'warning');
      return false;
    }

    const newOutfit = {
      id: `outfit-${Date.now()}`,
      name: name.trim() || `Look ${savedOutfits.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      top: currentOutfit.top,
      bottom: currentOutfit.bottom,
      shoes: currentOutfit.shoes,
      outerwear: currentOutfit.outerwear,
      dress: currentOutfit.dress,
      notes: notes.trim()
    };

    setSavedOutfits(prev => [newOutfit, ...prev]);
    showToast(`Outfit "${newOutfit.name}" saved to your collection!`, 'success');
    return true;
  };

  const deleteSavedOutfit = (outfitId) => {
    setSavedOutfits(prev => prev.filter(o => o.id !== outfitId));
    showToast('Outfit deleted from your collection', 'info');
  };

  // Equip saved outfit with dress/top/bottom exclusivity enforcement
  const equipOutfit = (outfit) => {
    if (outfit.dress) {
      setCurrentOutfit({
        top: null,
        bottom: null,
        shoes: outfit.shoes || null,
        outerwear: outfit.outerwear || null,
        dress: outfit.dress
      });
    } else {
      setCurrentOutfit({
        top: outfit.top || null,
        bottom: outfit.bottom || null,
        shoes: outfit.shoes || null,
        outerwear: outfit.outerwear || null,
        dress: null
      });
    }
    setCurrentView('tryon');
    showToast(`Applied "${outfit.name}" to 3D Avatar`, 'success');
  };

  const value = {
    currentView,
    setCurrentView,
    measurements,
    updateMeasurements,
    fitProfile,
    currentOutfit,
    equipGarment,
    removeGarment,
    resetOutfit,
    loadDefaultLook,
    randomizeOutfit,
    closetItems,
    toggleClosetItem,
    isInCloset,
    savedOutfits,
    saveCurrentOutfitAs,
    deleteSavedOutfit,
    equipOutfit,
    recentItems,
    cameraPreset,
    setCameraPreset,
    isAutoRotate,
    setIsAutoRotate,
    lightingMode,
    setLightingMode,
    avatarMode,
    setAvatarMode,
    toast,
    showToast
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
}


