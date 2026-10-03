import React, { useEffect } from 'react';
import {
  Waves,
  Play,
  Pause,
  Type,
  Eye,
  EyeOff,
  Wind,
  Sliders,
  Sparkles
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
  swirl,
  setSwirl,
  text,
  setText,
  reveal,
  setReveal,
  theme,
  setTheme,
  hidden,
  setHidden
}) {
  // Global keyboard shortcut H to toggle HUD
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

          {/* Physics Actions */}
          <div className="dock-section">
            <button
              className={`icon-btn ${paused ? 'active' : ''}`}
              onClick={() => setPaused(p => !p)}
              title={paused ? 'Resume Waves (Space)' : 'Pause Waves (Space)'}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <button
              className={`icon-btn ${swirl > 0 ? 'active' : ''}`}
              onClick={() => setSwirl(s => (s > 0 ? 0 : 1.2))}
              title={swirl > 0 ? 'Disable Fluid Swirl' : 'Enable Fluid Eddies & Swirl'}
            >
              <Wind size={15} />
            </button>
          </div>

          <div className="dock-divider" />

          {/* Typography Customization */}
          <div className="dock-section">
            <span className="dock-label">
              <Type size={13} /> Text
            </span>
            <div className="text-input-wrap">
              <Sparkles size={13} className="input-icon" />
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

          {/* Theme Palette Switcher */}
          <div className="dock-section">
            <span className="dock-label">Theme</span>
            <div className="pill-group" style={{ padding: '4px 6px', gap: '6px' }}>
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
          <span>Tip: Drag characters to test spring physics • Stir cursor to trigger fluid wakes</span>
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
