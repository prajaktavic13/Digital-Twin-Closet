import React from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export function Toast() {
  const { toast } = useWardrobe();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#C4976A] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md text-[#1E1C1A] text-sm font-medium rounded-2xl border border-[#E8E2D9] shadow-lg shadow-black/5">
        {icons[toast.type] || icons.info}
        <span className="text-xs sm:text-sm tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
}
