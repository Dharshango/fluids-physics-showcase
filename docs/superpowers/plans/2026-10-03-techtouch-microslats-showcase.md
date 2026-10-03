# TechText & MicroSlats Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an edge-to-edge interactive React application combining React Bits' `<TechText />` spring-typography canvas and `<MicroSlats />` WebGL fluid wave simulation with a frosted-glass controls dock.

**Architecture:** A full-bleed WebGL backdrop renders fluid wave simulations (`<MicroSlats />`), layered behind an interactive canvas with spring-driven typography and outlines (`<TechText />`). A floating dock provides real-time controls for wave presets, custom text, and visual themes.

**Tech Stack:** React 19 / Vite, `ogl` (WebGL2), `lucide-react`, CSS3.

**Spec:** [`docs/superpowers/specs/2026-10-03-techtouch-microslats-showcase-design.md`](file:///c:/Users/dhars/OneDrive/Desktop/Entertainment/jijiji/docs/superpowers/specs/2026-10-03-techtouch-microslats-showcase-design.md)

## Global Constraints
- Clean ES Module imports (Vite + React)
- Canvas and WebGL contexts must correctly release resources and cancel animation frames on unmount
- Device Pixel Ratio clamped at `Math.min(window.devicePixelRatio, 2)`
- Edge-to-edge layout (`100vw`, `100vh`, `overflow: hidden`, background `#050508`)

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.jsx`

**Interfaces:**
- Produces: Working Vite build environment with `react`, `react-dom`, `ogl`, `lucide-react`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "react-bits-showcase",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "ogl": "^1.0.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.2.0"
  }
}
```

- [ ] **Step 2: Write `vite.config.js`**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
```

- [ ] **Step 3: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TechText & MicroSlats — React Bits Physics Showcase</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Write `src/index.css`**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #050508;
  color: #ffffff;
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  user-select: none;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 5: Write initial `src/main.jsx`**

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 6: Install dependencies & verify scaffolding**

Run: `npm install`
Expected: Dependencies installed with zero errors.

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.js index.html src/index.css src/main.jsx
git commit -m "chore: scaffold Vite React application and dependencies"
```

---

### Task 2: `<TechText />` Component Integration

**Files:**
- Create: `src/components/TechText.jsx`
- Create: `src/components/TechText.css`

**Interfaces:**
- Produces: `<TechText />` React component taking `text`, `fontFamily`, `fontWeight`, `fontSize`, `letterSpacing`, `color`, `accentColor`, `reach`, `softness`, `dashLength`, `dashGap`, `strokeWidth`, `lineStyle`, `reveal`, `specks`, `selection`, `labels`, `draggable`, `sweep`, `speed`, `className`, `style`.

- [ ] **Step 1: Write `src/components/TechText.css`**

```css
.tech-text {
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  user-select: none;
}

.tech-text-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

- [ ] **Step 2: Write `src/components/TechText.jsx`**
Copy source code verbatim as provided in user specification with robust lifecycle cleanup.

- [ ] **Step 3: Verification & Commit**

```bash
git add src/components/TechText.jsx src/components/TechText.css
git commit -m "feat: add TechText canvas spring typography component"
```

---

### Task 3: `<MicroSlats />` Component Integration

**Files:**
- Create: `src/components/MicroSlats.jsx`
- Create: `src/components/MicroSlats.css`

**Interfaces:**
- Produces: `<MicroSlats />` component accepting `preset`, `color`, `glintColor`, `backgroundColor`, `slatWidth`, `slatHeight`, `gap`, `roundness`, `scale`, `speed`, `direction`, `chop`, `stretch`, `glint`, `contrast`, `perspective`, `fog`, `interactive`, `cursorStrength`, `cursorSize`, `swirl`, `trail`, `lean`, `intro`, `paused`, `className`, `style`.

- [ ] **Step 1: Write `src/components/MicroSlats.css`**

```css
.micro-slats {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

- [ ] **Step 2: Write `src/components/MicroSlats.jsx`**
Copy source code verbatim as provided in user specification using `ogl` (Renderer, Program, Mesh, Triangle, RenderTarget, Texture).

- [ ] **Step 3: Verification & Commit**

```bash
git add src/components/MicroSlats.jsx src/components/MicroSlats.css
git commit -m "feat: add MicroSlats WebGL fluid wave component"
```

---

### Task 4: Floating Glass `<ControlDock />` Component

**Files:**
- Create: `src/components/ControlDock.jsx`
- Create: `src/components/ControlDock.css`

**Interfaces:**
- Consumes: Current state (`preset`, `text`, `reveal`, `paused`, `theme`, `hidden`) and update handlers from `App.jsx`.
- Produces: Responsive, collapsible frosted-glass dock with preset selectors, theme toggles, live text input, and HUD hide/show.

- [ ] **Step 1: Write `src/components/ControlDock.css`**
Implement sleek glassmorphic styles with CSS variables and blur.

- [ ] **Step 2: Write `src/components/ControlDock.jsx`**
Build interactive dock with:
- Preset buttons (`swell`, `tide`, `storm`, `signal`)
- Theme pills (`Cyber Neon`, `Emerald Terminal`, `Solar Flare`, `Monochrome Frost`)
- Text input for instant wordmark editing
- Wave pause/resume button and reveal mode toggler
- Keyboard shortcut `H` to toggle HUD visibility

- [ ] **Step 3: Verification & Commit**

```bash
git add src/components/ControlDock.jsx src/components/ControlDock.css
git commit -m "feat: add floating frosted glass control dock"
```

---

### Task 5: Main Application Assembly (`App.jsx` & `App.css`)

**Files:**
- Create: `src/App.jsx`
- Create: `src/App.css`

**Interfaces:**
- Consumes: `<MicroSlats />`, `<TechText />`, `<ControlDock />`.
- Produces: Edge-to-edge interactive stage with synchronized mouse interactions, responsive sizing, and fluid spring physics.

- [ ] **Step 1: Write `src/App.css`**
Set full-viewport absolute layering, pointer event rules, and branding header.

- [ ] **Step 2: Write `src/App.jsx`**
Implement state for presets, themes, typography text, and HUD visibility. Layer MicroSlats at background and TechText at center stage.

- [ ] **Step 3: Build & Smoke Test**

Run: `npm run build`
Expected: Build passes with zero errors, producing optimized production bundle in `dist/`.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: assemble edge-to-edge physics showcase application"
```

---

### Task 6: Final Verification & Dev Server Validation

**Files:**
- Test: Build output and live server start

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: Successful build.

- [ ] **Step 2: Start preview / dev server and verify no console errors**
Run: `npm run preview` / `npm run dev`
Expected: Application renders edge-to-edge canvas with interactive waves and spring text.

- [ ] **Step 3: Commit any final polishing**
```bash
git add .
git commit -m "chore: complete TechText and MicroSlats frontend integration"
```
