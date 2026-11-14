import { createContext, useContext } from 'react';

export const WardrobeContext = createContext(null);

export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
}
