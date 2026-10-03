import React, { useEffect } from 'react';
import {
  Waves,
  Play,
  Pause,
  Type,
  Wind,
  Sliders,
  Sparkles,
  Gauge,
  Compass
} from 'lucide-react';
import './ControlDock.css';

export const THEMES = [
  {
    id: 'cyber',
    name: 'Cyber Neon',
    slatColor: '#A855F7',
    glintColor: '#22D3EE',
    textColor: '#FFFFFF',
    accentColor: '#A855F7',
    swatch: 'linear-gradient(135deg, #A855F7, #22D3EE)'
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    slatColor: '#10B981',
    glintColor: '#6EE7B7',
    textColor: '#ECFDF5',
    accentColor: '#10B981',
    swatch: 'linear-gradient(135deg, #10B981, #6EE7B7)'
  },
  {
    id: 'solar',
    name: 'Solar Flare',
    slatColor: '#F97316',
    glintColor: '#FDE047',
    textColor: '#FFF7ED',
    accentColor: '#F97316',
    swatch: 'linear-gradient(135deg, #F97316, #FDE047)'
  },
  {
    id: 'frost',
    name: 'Monochrome Frost',
    slatColor: '#94A3B8',
    glintColor: '#FFFFFF',
    textColor: '#FFFFFF',
    accentColor: '#E2E8F0',
    swatch: 'linear-gradient(135deg, #94A3B8, #FFFFFF)'
  },
  {
    id: 'crimson',
    name: 'Blood Moon',
    slatColor: '#EF4444',
    glintColor: '#FDA4AF',
    textColor: '#FFF1F2',
    accentColor: '#F43F5E',
    swatch: 'linear-gradient(135deg, #EF4444, #FDA4AF)'
  },
  {
    id: 'synthwave',
    name: 'Synthwave Sunset',
    slatColor: '#8B5CF6',
    glintColor: '#F43F5E',
    textColor: '#FDF2F8',
    accentColor: '#EC4899',
    swatch: 'linear-gradient(135deg, #8B5CF6, #F43F5E)'
  },
  {
    id: 'ocean',
    name: 'Deep Abyss',
    slatColor: '#06B6D4',
    glintColor: '#A5F3FC',
    textColor: '#F0FDFA',
    accentColor: '#0EA5E9',
    swatch: 'linear-gradient(135deg, #06B6D4, #A5F3FC)'
  },
  {
    id: 'gold',
    name: 'Royal Aureolin',
    slatColor: '#EAB308',
    glintColor: '#FEF08A',
    textColor: '#FEFCE8',
    accentColor: '#F59E0B',
    swatch: 'linear-gradient(135deg, #EAB308, #FEF08A)'
  }
];

const PRESETS = [
  { id: 'swell', label: 'Swell' },
  { id: 'tide', label: 'Tide' },
  { id: 'storm', label: 'Storm' },
  { id: 'signal', label: 'Signal' }
];

export default function ControlDock({
  preset,
  setPreset,
  paused,
  setPaused,
  speedMultiplier,
  setSpeedMultiplier,
  swirl,
  setSwirl,
  lean,
  setLean,
  text,
  setText,
  reveal,
  setReveal,
  theme,
  setTheme,
  hidden,
  setHidden
}) {
  // Global keyboard shortcut H to toggle HUD, Space to pause
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'h' || e.key === 'H') {
        setHidden(prev => !prev);
      }
      if (e.key === ' ') {
        e.preventDefault();
        setPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setHidden, setPaused]);

  return (
    <>
      <div className={`control-dock-wrapper ${hidden ? 'hidden-dock' : ''}`}>
        <div className="control-dock">
          {/* Preset Buttons */}
          <div className="dock-section">
            <span className="dock-label">
              <Waves size={13} /> Wave
            </span>
            <div className="pill-group">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  className={`pill-btn ${preset === p.id ? 'active' : ''}`}
                  onClick={() => setPreset(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="dock-divider" />

          {/* Physics Dynamics Sliders & Controls */}
          <div className="dock-section">
            <button
              className={`icon-btn ${paused ? 'active' : ''}`}
              onClick={() => setPaused(p => !p)}
              title={paused ? 'Resume Waves (Space)' : 'Pause Waves (Space)'}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>

            {/* Speed Multiplier Slider */}
            <div className="slider-group" title={`Wave Speed Multiplier: ${speedMultiplier}x`}>
              <Gauge size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <input
                type="range"
                min="0.3"
                max="2.2"
                step="0.1"
                value={speedMultiplier}
                onChange={e => setSpeedMultiplier(parseFloat(e.target.value))}
                className="slider-input"
              />
              <span className="slider-val">{speedMultiplier}x</span>
            </div>

            {/* Fluid Swirl Slider */}
            <div className="slider-group" title={`Fluid Swirl / Vortex Strength: ${swirl}`}>
              <Wind size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.1"
                value={swirl}
                onChange={e => setSwirl(parseFloat(e.target.value))}
                className="slider-input"
              />
              <span className="slider-val">{swirl}</span>
            </div>

            {/* Slat Tilt with Current Toggle */}
            <button
              className={`icon-btn ${lean > 0 ? 'active' : ''}`}
              onClick={() => setLean(l => (l > 0 ? 0 : 0.45))}
              title={lean > 0 ? 'Disable Slat Tilt' : 'Enable Slat Tilt with Current'}
            >
              <Compass size={14} />
            </button>
          </div>

          <div className="dock-divider" />

          {/* Typography Customization */}
          <div className="dock-section">
            <span className="dock-label">
              <Type size={13} /> Text
            </span>
            <div className="text-input-wrap">
              <Sparkles size={12} className="input-icon" />
              <input
                type="text"
                className="text-input"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Wordmark..."
                maxLength={24}
              />
            </div>
            <div className="pill-group">
              <button
                className={`pill-btn ${reveal === 'letter' ? 'active' : ''}`}
                onClick={() => setReveal('letter')}
                title="Vector Outline Reveal on Letter"
              >
                Letter
              </button>
              <button
                className={`pill-btn ${reveal === 'area' ? 'active' : ''}`}
                onClick={() => setReveal('area')}
                title="Circular Area Reveal"
              >
                Area
              </button>
              <button
                className={`pill-btn ${reveal === 'off' ? 'active' : ''}`}
                onClick={() => setReveal('off')}
                title="Solid Lettering"
              >
                Solid
              </button>
            </div>
          </div>

          <div className="dock-divider" />

          {/* Expanded 8 Themes Palette */}
          <div className="dock-section">
            <span className="dock-label">Theme</span>
            <div className="themes-container">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  className={`theme-pill ${theme.id === t.id ? 'active' : ''}`}
                  style={{ background: t.swatch }}
                  onClick={() => setTheme(t)}
                  title={t.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="dock-hint">
          <span>Tip: Fling / drag letters for spring rebound • Stir & click for hydrodynamic vortex waves</span>
          <span>•</span>
          <span>Press <strong>H</strong> to toggle dock</span>
        </div>
      </div>

      {/* Floating HUD toggle button when collapsed */}
      {hidden && (
        <button
          className="hud-toggle-floating"
          onClick={() => setHidden(false)}
          title="Show Controls (H)"
        >
          <Sliders size={18} />
        </button>
      )}
    </>
  );
}
