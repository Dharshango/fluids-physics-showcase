import React, { useState } from 'react';
import MicroSlats from './components/MicroSlats';
import TechText from './components/TechText';
import ControlDock, { THEMES } from './components/ControlDock';
import './App.css';

const BASE_SPEEDS = {
  swell: 0.6,
  tide: 0.5,
  storm: 1.6,
  signal: 1.2
};

export default function App() {
  const [preset, setPreset] = useState('swell');
  const [paused, setPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [swirl, setSwirl] = useState(0.5);
  const [lean, setLean] = useState(0.35);
  const [text, setText] = useState('React Bits');
  const [reveal, setReveal] = useState('letter');
  const [theme, setTheme] = useState(THEMES[0]);
  const [hidden, setHidden] = useState(false);

  const calculatedSpeed = (BASE_SPEEDS[preset] || 0.6) * speedMultiplier;

  return (
    <div className="app-viewport">
      {/* Top Futuristic Telemetry Header */}
      <header className="top-header">
        <div className="brand-section">
          <div className="brand-badge">REACT BITS</div>
          <span className="brand-subtitle">Interactive Physics Showcase</span>
        </div>
        <div className="telemetry-bar">
          <div className="telemetry-item">
            <span className="telemetry-dot" />
            <span>THEME: {theme.name.toUpperCase()}</span>
          </div>
          <div className="telemetry-item">
            <span>WAVE SPEED: {speedMultiplier.toFixed(1)}x</span>
          </div>
          <div className="telemetry-item">
            <span>SWIRL: {swirl > 0 ? `${swirl.toFixed(1)}` : 'OFF'}</span>
          </div>
          <div className="telemetry-item">
            <span>PRESET: {preset.toUpperCase()}</span>
          </div>
        </div>
      </header>

      {/* Layer 1: MicroSlats WebGL Fluid Waves Canvas */}
      <div className="slats-layer">
        <MicroSlats
          preset={preset}
          color={theme.slatColor}
          glintColor={theme.glintColor}
          backgroundColor="#050508"
          slatWidth={11}
          slatHeight={28}
          gap={3}
          roundness={0.75}
          speed={calculatedSpeed}
          interactive={true}
          cursorStrength={1.25}
          cursorSize={50}
          swirl={swirl}
          trail={1.6}
          lean={lean}
          intro={true}
          introDuration={1.3}
          paused={paused}
        />
      </div>

      {/* Subtle depth vignette overlay */}
      <div className="vignette-overlay" />

      {/* Layer 2: TechText Interactive Spring Typography Canvas */}
      <main className="techtext-stage">
        <div className="techtext-stage-inner">
          <TechText
            text={text}
            fontWeight={700}
            fontSize={160}
            letterSpacing={-0.04}
            color={theme.textColor}
            accentColor={theme.accentColor}
            reveal={reveal}
            reach={220}
            softness={0.75}
            dashLength={4}
            dashGap={2}
            strokeWidth={1.6}
            lineStyle="dashed"
            specks={16}
            selection={true}
            labels={true}
            draggable={true}
            sweep={true}
            speed={1}
          />
        </div>
      </main>

      {/* Layer 3: Floating Frosted-Glass Controls Dock */}
      <ControlDock
        preset={preset}
        setPreset={setPreset}
        paused={paused}
        setPaused={setPaused}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        swirl={swirl}
        setSwirl={setSwirl}
        lean={lean}
        setLean={setLean}
        text={text}
        setText={setText}
        reveal={reveal}
        setReveal={setReveal}
        theme={theme}
        setTheme={setTheme}
        hidden={hidden}
        setHidden={setHidden}
      />
    </div>
  );
}
