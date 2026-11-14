import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AvatarModel } from './AvatarModel';
import { StudioLighting, StudioCameraControls, TurntablePedestal } from './StudioScene';
import { useWardrobe } from '../../context/useWardrobe';
import {
  RotateCcw,
  Sun,
  Palette,
  Maximize2,
  Minimize2
} from 'lucide-react';

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5]/85 backdrop-blur-xs z-10">
      <div className="w-10 h-10 border-2 border-[#C4976A]/30 border-t-[#C4976A] rounded-full animate-spin mb-3"></div>
      <p className="text-xs uppercase tracking-widest text-[#6B6661] font-medium">
        Calibrating Digital Twin...
      </p>
    </div>
  );
}

export function AvatarCanvas({ isCompact = false, height = 'h-full' }) {
  const {
    currentOutfit,
    fitProfile,
    measurements,
    cameraPreset,
    setCameraPreset,
    isAutoRotate,
    setIsAutoRotate,
    lightingMode,
    setLightingMode,
    avatarMode,
    setAvatarMode,
    showToast
  } = useWardrobe();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef();

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const cycleLighting = () => {
    const modes = ['studio', 'warm', 'editorial'];
    const nextIndex = (modes.indexOf(lightingMode) + 1) % modes.length;
    setLightingMode(modes[nextIndex]);
    showToast(`Lighting: ${modes[nextIndex].toUpperCase()}`, 'info');
  };

  const toggleAvatarMode = () => {
    const next = avatarMode === 'avatar' ? 'mannequin' : 'avatar';
    setAvatarMode(next);
    showToast(`Switched to ${next === 'avatar' ? 'Photorealistic Digital Twin' : 'Atelier Mannequin'}`, 'info');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} bg-gradient-to-b from-[#F9F7F3] via-[#F3EFEA] to-[#EAE4D9] rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm select-none`}
    >
      {/* 3D WebGL Canvas */}
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.05, 3.8], fov: 38 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <StudioLighting mode={lightingMode} />
          <StudioCameraControls
            preset={cameraPreset}
            isAutoRotate={isAutoRotate}
            avatarHeight={measurements?.height || 178}
          />
          
          <TurntablePedestal />
          <AvatarModel
            outfit={currentOutfit}
            fitProfile={fitProfile}
            skinTone={measurements.skinTone}
            avatarMode={avatarMode}
          />
        </Canvas>
      </Suspense>

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8E2D9] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1E1C1A]">
            {avatarMode === 'avatar' ? 'Digital Twin Active' : 'Atelier Porcelain Finish'}
          </span>
        </div>

        {!isCompact && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-[#E8E2D9] text-[11px] text-[#6B6661]">
            <span>{measurements.height}cm</span>
            <span className="text-[#C4976A]">•</span>
            <span>{measurements.weight}kg</span>
            <span className="text-[#C4976A]">•</span>
            <span>Chest {measurements.chest}cm</span>
            <span className="text-[#C4976A]">•</span>
            <span>Waist {measurements.waist}cm</span>
          </div>
        )}
      </div>

      {/* Controls Bar - Right side on full view, bottom right on compact */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          title="Toggle Turntable Rotation"
          aria-label="Toggle Turntable Rotation"
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-xs flex items-center justify-center ${
            isAutoRotate
              ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
              : 'bg-white/90 text-[#1E1C1A] border-[#E8E2D9] hover:bg-white'
          }`}
        >
          <RotateCcw className={`w-4 h-4 shrink-0 ${isAutoRotate ? 'animate-spin' : ''}`} />
        </button>

        {!isCompact && (
          <>
            <button
              onClick={cycleLighting}
              title={`Cycle Studio Lighting (${lightingMode})`}
              aria-label="Cycle Studio Lighting"
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1E1C1A] border border-[#E8E2D9] backdrop-blur-md transition-all shadow-xs flex items-center justify-center"
            >
              <Sun className="w-4 h-4 text-[#C4976A] shrink-0" />
            </button>

            <button
              onClick={toggleAvatarMode}
              title="Toggle Atelier Porcelain Finish / Photorealistic Tone"
              aria-label="Toggle Atelier Porcelain Finish"
              className={`p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-xs flex items-center justify-center ${
                avatarMode === 'mannequin'
                  ? 'bg-[#1E1C1A] text-[#C4976A] border-[#1E1C1A]'
                  : 'bg-white/90 hover:bg-white text-[#1E1C1A] border-[#E8E2D9]'
              }`}
            >
              <Palette className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle Fullscreen"
              className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1E1C1A] border border-[#E8E2D9] backdrop-blur-md transition-all shadow-xs flex items-center justify-center"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-[#1E1C1A] shrink-0" />
              ) : (
                <Maximize2 className="w-4 h-4 text-[#1E1C1A] shrink-0" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Camera Angle Presets Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E8E2D9] shadow-md z-10">
        {[
          { id: 'front', label: 'Front' },
          { id: 'side', label: 'Profile' },
          { id: 'back', label: 'Back' },
          { id: 'closeup', label: 'Torso' },
          { id: 'full', label: 'Full Body' }
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setCameraPreset(p.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              cameraPreset === p.id
                ? 'bg-[#1E1C1A] text-white shadow-xs'
                : 'text-[#6B6661] hover:text-[#1E1C1A] hover:bg-[#F3EFEA]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Subtle Hint on first use */}
      <div className="absolute bottom-4 left-4 hidden md:block text-[10px] uppercase tracking-wider text-[#9E9891] pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
