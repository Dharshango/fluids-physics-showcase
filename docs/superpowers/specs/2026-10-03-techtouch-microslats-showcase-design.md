# TechText & MicroSlats Interactive Edge-to-Edge Showcase Design

## 1. Overview
An edge-to-edge, high-performance interactive frontend application showcasing two cutting-edge visual components from React Bits:
- `<TechText />`: Canvas 2D spring-physics typography with character dragging, vector outline reveals, specks, and idle sweeps.
- `<MicroSlats />`: WebGL (OGL) wave and Navier-Stokes fluid simulation with real-time cursor stirring, splash jets, and dynamic slat rendering.

The application combines both components into a full-bleed cybernetic canvas with a floating glassmorphic control dock to experiment with physics, presets, colors, and typography in real time.

---

## 2. Technology Stack & Architecture
- **Framework:** React 19 / 18 with Vite (ES Modules)
- **WebGL Library:** `ogl` (v1.0.11+) for high-speed WebGL2 fluid shaders and wave rendering
- **Icons:** `lucide-react`
- **Styling:** CSS3 modern styling with custom properties, glassmorphism (`backdrop-filter`), and CSS grid/flexbox
- **Project Structure:**
  ```
  jijiji/
  ├── docs/
  │   └── superpowers/specs/2026-10-03-techtouch-microslats-showcase-design.md
  ├── src/
  │   ├── components/
  │   │   ├── TechText.jsx
  │   │   ├── TechText.css
  │   │   ├── MicroSlats.jsx
  │   │   ├── MicroSlats.css
  │   │   ├── ControlDock.jsx
  │   │   └── ControlDock.css
  │   ├── App.jsx
  │   ├── App.css
  │   ├── index.css
  │   └── main.jsx
  ├── index.html
  ├── package.json
  └── vite.config.js
  ```

---

## 3. Component Details & Physics Architecture

### 3.1 `<MicroSlats />` Fluid & Wave Mechanics
- **Fluid Simulation:**
  - 2D grid (`FLUID_SIZE = 96`) with multi-pass shaders: splat, curl, vorticity, divergence, Jacobi pressure iteration (16 steps), gradient subtraction, and velocity/ink advection.
  - `window`-level pointer tracking generates velocity splats and light ink in the water.
  - Click / pointerdown unleashes directional splash jets.
- **Wave Synthesis:**
  - 4 harmonic trochoidal/sine wave equations with meander, chop, and dispersion (`sqrt(9.81 * k) * 0.35`).
  - Presets: `swell` (balanced rolling sea), `tide` (gentler stretched waves), `storm` (intense chopped swells with heavy glint), `signal` (horizontal equalizer wall).

### 3.2 `<TechText />` Spring Typography Dynamics
- **Spring Formulation:**
  - Letter displacement driven by `F = -k * x - c * v` (`SPRING = 320`, `DAMPING = 22`).
  - Smooth release back to alphabetic baseline.
- **Visual Effects:**
  - Letter vs. area outline reveal modes with customizable dashed/solid stroke and softness falloff.
  - Idle sweep sinusoidal scanning when cursor is inactive.
  - Frame markers, dimension measurements, and blinking specks around the hovered character.

### 3.3 Layering & Event Synergy
- `<MicroSlats />` occupies `position: absolute; inset: 0`.
- `<TechText />` is positioned in the center with pointer event pass-through where appropriate:
  - Dragging a letter triggers TechText spring physics while cursor movement is simultaneously captured by MicroSlats to stir fluid wakes underneath the dragged letters.

---

## 4. UI & Controls: Floating Glass Dock
- **Dock Positioning:** Floating bottom-center, subtle semi-transparent dark frosted glass (`rgba(10, 10, 16, 0.75)` with `backdrop-filter: blur(16px)`).
- **Control Modules:**
  1. **Preset Selector:** Quick pill toggles (`Swell`, `Tide`, `Storm`, `Signal`).
  2. **Wave Motion:** Pause/Resume wave flow, toggle fluid swirl.
  3. **Live Typography Input:** Instant live editing of wordmark string (e.g., `"React Bits"`, `"JIJIJI"`, `"Cyberpunk"`).
  4. **Reveal Mode:** Toggle between `letter`, `area`, and `off`.
  5. **Color Themes:**
     - *Neon Cyber* (Purple slats `#A855F7`, Cyan glint `#22D3EE`, Accent `#A855F7`)
     - *Emerald Terminal* (Green slats `#10B981`, Mint glint `#6EE7B7`, Accent `#10B981`)
     - *Solar Flare* (Orange slats `#F97316`, Amber glint `#FDE047`, Accent `#F97316`)
     - *Monochrome Frost* (White slats `#E2E8F0`, Pure white glint `#FFFFFF`, Accent `#FFFFFF`)
  6. **HUD Toggle:** Hide/show dock (`H` key shortcut or button) for 100% immersive presentation.

---

## 5. Non-Functional Requirements & Performance
- Zero external build issues; clean modern Vite config.
- DPR clamp to 2.0 to maintain steady 60 FPS on high-DPI screens.
- Clean cleanup of all WebGL textures, render targets, loseContext, and event listeners on unmount.
