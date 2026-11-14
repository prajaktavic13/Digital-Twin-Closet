export const DEFAULT_MEASUREMENTS = {
  height: 178, // cm
  weight: 68,  // kg
  chest: 96,   // cm
  waist: 78,   // cm
  hips: 98,    // cm
  silhouette: 'neutral', // 'neutral' | 'female' | 'male'
  skinTone: 'sand', // 'porcelain' | 'fair' | 'sand' | 'honey' | 'bronze' | 'obsidian'
  avatarMode: 'avatar' // 'avatar' | 'mannequin'
};

export const SKIN_TONES = [
  { id: 'porcelain', label: 'Ivory Atelier', hex: '#F7F3ED', roughness: 0.25 },
  { id: 'fair', label: 'Nordic Fair', hex: '#F2D6C4', roughness: 0.6 },
  { id: 'sand', label: 'Warm Sand', hex: '#E0B596', roughness: 0.6 },
  { id: 'honey', label: 'Golden Honey', hex: '#C69368', roughness: 0.6 },
  { id: 'bronze', label: 'Deep Bronze', hex: '#946142', roughness: 0.6 },
  { id: 'obsidian', label: 'Obsidian Noir', hex: '#262424', roughness: 0.3 }
];
