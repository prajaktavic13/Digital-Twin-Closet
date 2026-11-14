import { DEFAULT_MEASUREMENTS } from '../data/defaultMeasurements';
import { DEFAULT_OUTFIT, PRODUCTS } from '../data/products';

const KEYS = {
  MEASUREMENTS: 'atelier_measurements_v1',
  CLOSET: 'atelier_closet_v1',
  OUTFITS: 'atelier_saved_outfits_v1',
  CURRENT_OUTFIT: 'atelier_current_fit_v1',
  RECENT_ITEMS: 'atelier_recent_items_v1'
};

// Safe JSON parser
function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
}

export const Storage = {
  getMeasurements() {
    return safeGet(KEYS.MEASUREMENTS, DEFAULT_MEASUREMENTS);
  },
  saveMeasurements(data) {
    safeSet(KEYS.MEASUREMENTS, data);
  },

  getCloset() {
    // Default seeded with 6 starter items in the closet
    const defaultCloset = ['p1', 'p3', 'p5', 'p7', 'p9', 'p14'];
    const ids = safeGet(KEYS.CLOSET, defaultCloset);
    return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  },
  saveCloset(items) {
    safeSet(KEYS.CLOSET, items.map(p => p.id));
  },

  getCurrentOutfit() {
    const ids = safeGet(KEYS.CURRENT_OUTFIT, null);
    if (!ids) return DEFAULT_OUTFIT;
    return {
      top: ids.top ? PRODUCTS.find(p => p.id === ids.top) : null,
      bottom: ids.bottom ? PRODUCTS.find(p => p.id === ids.bottom) : null,
      shoes: ids.shoes ? PRODUCTS.find(p => p.id === ids.shoes) : null,
      outerwear: ids.outerwear ? PRODUCTS.find(p => p.id === ids.outerwear) : null,
      dress: ids.dress ? PRODUCTS.find(p => p.id === ids.dress) : null
    };
  },
  saveCurrentOutfit(outfit) {
    safeSet(KEYS.CURRENT_OUTFIT, {
      top: outfit.top?.id || null,
      bottom: outfit.bottom?.id || null,
      shoes: outfit.shoes?.id || null,
      outerwear: outfit.outerwear?.id || null,
      dress: outfit.dress?.id || null
    });
  },

  getSavedOutfits() {
    const defaultSaved = [
      {
        id: 'outfit-1',
        name: 'Sartorial Minimalist',
        date: '2026-11-12',
        topId: 'p3', // Verona Overshirt
        bottomId: 'p5', // Tiber Trousers
        shoesId: 'p14', // Monaco Sneakers
        outerwearId: 'p9', // Valentin Overcoat
        notes: 'Classic ivory poplin with camel pleats and overcoat'
      },
      {
        id: 'outfit-2',
        name: 'Tokyo Raw Denim & Knit',
        date: '2026-11-13',
        topId: 'p1', // Aura Tee
        bottomId: 'p7', // Kobe Raw Denim
        shoesId: 'p16', // Chelsea Boot
        outerwearId: 'p10', // Leather Bomber
        notes: 'Architectural streetwear look'
      }
    ];

    const raw = safeGet(KEYS.OUTFITS, defaultSaved);
    return raw.map(o => ({
      ...o,
      top: PRODUCTS.find(p => p.id === o.topId) || null,
      bottom: PRODUCTS.find(p => p.id === o.bottomId) || null,
      shoes: PRODUCTS.find(p => p.id === o.shoesId) || null,
      outerwear: PRODUCTS.find(p => p.id === o.outerwearId) || null,
      dress: PRODUCTS.find(p => p.id === o.dressId) || null
    }));
  },
  saveSavedOutfits(outfits) {
    const serializable = outfits.map(o => ({
      id: o.id,
      name: o.name,
      date: o.date,
      topId: o.top?.id || o.topId || null,
      bottomId: o.bottom?.id || o.bottomId || null,
      shoesId: o.shoes?.id || o.shoesId || null,
      outerwearId: o.outerwear?.id || o.outerwearId || null,
      dressId: o.dress?.id || o.dressId || null,
      notes: o.notes || ''
    }));
    safeSet(KEYS.OUTFITS, serializable);
  },

  getRecentItems() {
    const defaultRecent = ['p3', 'p5', 'p14', 'p9', 'p7'];
    const ids = safeGet(KEYS.RECENT_ITEMS, defaultRecent);
    return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  },
  addRecentItem(product) {
    const current = safeGet(KEYS.RECENT_ITEMS, []);
    const updated = [product.id, ...current.filter(id => id !== product.id)].slice(0, 8);
    safeSet(KEYS.RECENT_ITEMS, updated);
  }
};
