import React, { useState } from 'react';
import MicroSlats from './components/MicroSlats';
import TechText from './components/TechText';
import ControlDock, { THEMES } from './components/ControlDock';
import './App.css';

export default function App() {
  const [preset, setPreset] = useState('swell');
  const [paused, setPaused] = useState(false);
  const [swirl, setSwirl] = useState(0.4);
  const [text, setText] = useState('React Bits');
  const [reveal, setReveal] = useState('letter');
  const [theme, setTheme] = useState(THEMES[0]);
  const [hidden, setHidden] = useState(false);

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
            <span>FLUID NAVIER-STOKES</span>
          </div>
          <div className="telemetry-item">
            <span>SPRING DYNAMICS: 320N/m</span>
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
          interactive={true}
          cursorStrength={1.2}
          cursorSize={45}
          swirl={swirl}
          trail={1.5}
          lean={0.2}
          intro={true}
          introDuration={1.4}
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
        swirl={swirl}
        setSwirl={setSwirl}
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
