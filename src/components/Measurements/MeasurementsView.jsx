import React, { useState } from 'react';
import { useWardrobe } from '../../context/useWardrobe';
import { AvatarCanvas } from '../3D/AvatarCanvas';
import { SKIN_TONES, DEFAULT_MEASUREMENTS } from '../../data/defaultMeasurements';
import {
  RotateCcw,
  Sparkles,
  Activity,
  ArrowRight
} from 'lucide-react';

const PRESETS = [
  {
    name: 'Athletic Standard',
    height: 178,
    weight: 70,
    chest: 98,
    waist: 78,
    hips: 98
  },
  {
    name: 'Slender Runway',
    height: 182,
    weight: 62,
    chest: 90,
    waist: 72,
    hips: 92
  },
  {
    name: 'Hourglass / Curvy',
    height: 170,
    weight: 66,
    chest: 98,
    waist: 70,
    hips: 104
  },
  {
    name: 'Broad Architectural',
    height: 186,
    weight: 84,
    chest: 108,
    waist: 86,
    hips: 102
  }
];

export function MeasurementsView() {
  const {
    measurements,
    updateMeasurements,
    fitProfile,
    showToast,
    setCurrentView
  } = useWardrobe();

  // Local state for smooth dragging
  const [form, setForm] = useState({ ...measurements });

  const handleChange = (field, value) => {
    const num = parseFloat(value);
    const updated = { ...form, [field]: num };
    setForm(updated);
    updateMeasurements({ [field]: num });
  };

  const handleSkinChange = (toneId) => {
    const updated = { ...form, skinTone: toneId };
    setForm(updated);
    updateMeasurements({ skinTone: toneId });
  };

  const applyPreset = (preset) => {
    const updated = { ...form, ...preset };
    setForm(updated);
    updateMeasurements(preset);
    showToast(`Applied preset: ${preset.name}`, 'info');
  };

  const handleResetDefaults = () => {
    setForm({ ...DEFAULT_MEASUREMENTS });
    updateMeasurements(DEFAULT_MEASUREMENTS);
    showToast('Reset measurements to atelier baseline defaults', 'info');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9891]">
            Biometric Calibration
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1E1C1A] mt-1 tracking-tight">
            Body Measurements
          </h1>
          <p className="text-sm text-[#6B6661] mt-1 font-light">
            Adjust biometric parameters to see the 3D digital avatar deform and recalculate fit in real time.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#FAF8F5] text-[#1E1C1A] text-xs font-semibold rounded-xl border border-[#E8E2D9] shadow-2xs transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8A847C]" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-[#8A847C] whitespace-nowrap mr-1">Quick Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-medium text-[#1E1C1A] transition-all whitespace-nowrap shadow-2xs hover:border-[#C4976A]"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Measurement Controls on Left, 3D Canvas & Fit Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form Controls */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <h3 className="font-serif text-lg font-semibold text-[#1E1C1A]">
              Dimensions & Proportions
            </h3>
            <span className="text-xs font-medium text-[#C4976A] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E8E2D9]">
              Metric (cm / kg)
            </span>
          </div>

          <div className="space-y-5">
            {/* Height Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-[#1E1C1A] flex items-center gap-1.5">
                  <span>Height</span>
                  <span className="text-[11px] text-[#9E9891] font-normal">(Affects vertical limb scaling)</span>
                </label>
                <span className="font-serif text-sm font-bold text-[#1E1C1A]">{form.height} cm</span>
              </div>
              <input
                type="range"
                min="150"
                max="205"
                step="1"
                value={form.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E9891]">
                <span>150 cm</span>
                <span>178 cm (Avg)</span>
                <span>205 cm</span>
              </div>
            </div>

            {/* Weight Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-[#1E1C1A] flex items-center gap-1.5">
                  <span>Weight</span>
                  <span className="text-[11px] text-[#9E9891] font-normal">(Scales torso & limb volume)</span>
                </label>
                <span className="font-serif text-sm font-bold text-[#1E1C1A]">{form.weight} kg</span>
              </div>
              <input
                type="range"
                min="45"
                max="125"
                step="1"
                value={form.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E9891]">
                <span>45 kg</span>
                <span>68 kg (Avg)</span>
                <span>125 kg</span>
              </div>
            </div>

            {/* Chest Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-[#1E1C1A] flex items-center gap-1.5">
                  <span>Chest Circumference</span>
                  <span className="text-[11px] text-[#9E9891] font-normal">(Upper spine deformation)</span>
                </label>
                <span className="font-serif text-sm font-bold text-[#1E1C1A]">{form.chest} cm</span>
              </div>
              <input
                type="range"
                min="75"
                max="135"
                step="1"
                value={form.chest}
                onChange={(e) => handleChange('chest', e.target.value)}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E9891]">
                <span>75 cm (XS)</span>
                <span>96 cm (M)</span>
                <span>135 cm (XXL)</span>
              </div>
            </div>

            {/* Waist Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-[#1E1C1A] flex items-center gap-1.5">
                  <span>Waist Circumference</span>
                  <span className="text-[11px] text-[#9E9891] font-normal">(Mid-torso taper)</span>
                </label>
                <span className="font-serif text-sm font-bold text-[#1E1C1A]">{form.waist} cm</span>
              </div>
              <input
                type="range"
                min="60"
                max="125"
                step="1"
                value={form.waist}
                onChange={(e) => handleChange('waist', e.target.value)}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E9891]">
                <span>60 cm (26)</span>
                <span>78 cm (32)</span>
                <span>125 cm (44)</span>
              </div>
            </div>

            {/* Hips Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-[#1E1C1A] flex items-center gap-1.5">
                  <span>Hips Circumference</span>
                  <span className="text-[11px] text-[#9E9891] font-normal">(Pelvic bone scale)</span>
                </label>
                <span className="font-serif text-sm font-bold text-[#1E1C1A]">{form.hips} cm</span>
              </div>
              <input
                type="range"
                min="75"
                max="135"
                step="1"
                value={form.hips}
                onChange={(e) => handleChange('hips', e.target.value)}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E9891]">
                <span>75 cm</span>
                <span>98 cm</span>
                <span>135 cm</span>
              </div>
            </div>
          </div>

          {/* Skin & Avatar Finish Customization */}
          <div className="pt-4 border-t border-[#E8E2D9] space-y-3">
            <label className="block text-xs font-semibold text-[#1E1C1A]">
              Avatar Finish & Tone
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => handleSkinChange(tone.id)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    form.skinTone === tone.id
                      ? 'border-[#1E1C1A] ring-1 ring-[#1E1C1A] bg-[#FAF8F5]'
                      : 'border-[#E8E2D9] hover:border-[#C4976A] bg-white'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: tone.hex }}
                  />
                  <span className="text-[9px] font-semibold text-[#6B6661] text-center line-clamp-1">
                    {tone.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live 3D Avatar Preview & Fit Analysis Card */}
        <div className="lg:col-span-6 space-y-6">
          {/* Live 3D Viewport */}
          <div className="h-[420px] w-full rounded-3xl overflow-hidden shadow-xs relative border border-[#E8E2D9]">
            <AvatarCanvas height="h-full" />
          </div>

          {/* Fit Profile Analysis Summary */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C4976A]" />
                <h3 className="font-serif text-base font-semibold text-[#1E1C1A]">
                  Computed Biometric Fit Profile
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                Calibrated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
                <span className="text-[10px] uppercase font-bold text-[#9E9891] block">Top Size</span>
                <span className="font-serif text-xl font-bold text-[#1E1C1A] mt-0.5 block">{fitProfile.topSize}</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
                <span className="text-[10px] uppercase font-bold text-[#9E9891] block">Bottom Size</span>
                <span className="font-serif text-xl font-bold text-[#1E1C1A] mt-0.5 block">{fitProfile.bottomSize}</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
                <span className="text-[10px] uppercase font-bold text-[#9E9891] block">Body Shape</span>
                <span className="font-serif text-xs font-bold text-[#1E1C1A] mt-1 block truncate" title={fitProfile.shape}>
                  {fitProfile.shape}
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
                <span className="text-[10px] uppercase font-bold text-[#9E9891] block">BMI Metric</span>
                <span className="font-serif text-xl font-bold text-[#1E1C1A] mt-0.5 block">{fitProfile.bmi}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B6661] bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D9] leading-relaxed">
              <strong>Sartorial Recommendation:</strong> Your silhouette has a balanced proportional taper. Tailored trousers with double reverse pleats and structured blazers provide optimal drape on your frame.
            </p>

            <button
              onClick={() => setCurrentView('tryon')}
              className="w-full py-3 bg-[#1E1C1A] hover:bg-[#33302E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C4976A]" />
              <span>Continue to 3D Virtual Try-On</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
