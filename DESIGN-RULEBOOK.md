# Walden Ridge Design Rulebook

This rulebook consolidates the current website design system and is the sole source of truth for layout, typography, motion, and information architecture. It resolves prior documentation conflicts by reflecting the **implemented CSS** in `styles.css`.

## 1) Source of Truth
- **Primary**: `styles.css`
- **Secondary**: Page HTML files for structure and IA
- Any conflicting measurements in older docs are superseded by this rulebook.

## 2) Information Architecture (IA)
Primary navigation (global header):
- Our Story (`/our-story/`)
- Strategy (`/strategy/`)
- Portfolio (`/portfolio/`)
- Leadership (`/leadership/`)

IA intent:
- **Our Story**: Platform framing and why demand is non-discretionary.
- **Strategy**: Risk controls, execution model, and compliance economics.
- **Portfolio**: Geographic footprint and brand exposure.
 - **Leadership**: Oversight structure and institutional readiness.

## 3) Typography System (Implemented)
**Font families**
- Body: `IBM Plex Sans` (system-ui fallback)
- Display: `Cormorant Garamond` (headings, serif)
- Logo: `JunicodeExpBold` (wordmark only)

**Fluid scale (clamp-based, interpolates between 320px–1440px)**
All typography uses CSS `clamp()` functions — no breakpoint overrides for font sizes.

Size | Variable | Min (320px) | Max (1440px) | Weight
---|---|---|---|---
Logo | `--fs-logo` | 22px | 30px | 700
Subtitle | `--fs-subtitle` | 16px | 16px | 400
Nav | `--fs-nav` | 11px | 14px | 600
H1 | `--fs-h1` | 28px | 58px | 600
Intro | `--fs-intro` | 16px | 22px | 500
Body | `--fs-body` | 14px | 17px | 400
Caption | `--fs-caption` | 15px | 15px | 400
Section heading | `--fs-section-head` | 15px | 18px | 600
Sidebar title | — | 12px | 12px | 700
Sidebar item title | — | 15px | 15px | 500
Sidebar item text | — | 14px | 14px | 400

**Line heights**
- Logo: 1.0
- Subtitle/Nav: 1.4
- H1: 1.04
- Intro: 1.4
- Body: 1.6
- Caption: 1.6
- Section heading: 1.2

**Letter-spacing**
- Body default: 0.001em
- H1: -0.02em
- H3: -0.01em
- Nav: 0.16em (uppercase)
- Sidebar title: 0.3em (uppercase)

**Rendering**
- `text-rendering: optimizeLegibility`
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

## 4) Layout System (Implemented)
**Target viewport**: 1440px
- Outer margin: fluid `clamp(24px, 6.46vw - 8px, 85px)` — 85px at 1440, 24px at mobile
- Container max-width: 1440px
- Effective content width: 1270px

**Header**
- Padding top: 40px
- Margin bottom: 32px
- Navigation gap: 60px

**Our Story**
- Grid: 580px / 1fr (collapses to single column at ≤1439px)
- Gap: 48px

**Portfolio**
- Layout: `1fr` + 320px sidebar
- Gap: 80px
- Portfolio grid: 3 columns
- Grid gap: 32px (rows) / 48px (cols)

**Strategy**
- Layout: `1fr` + 320px sidebar
- Gap: 80px
- Strategy grid: 2 columns
- Grid gap: 28px (rows) / 32px (cols)

**Leadership**
- Layout: 320px nav + 1fr bio content
- Gap: 80px (aligned to portfolio/strategy system)
- Nav: sticky left column on desktop, stacked on tablet+

**Footer**
- Top margin: 120px
- Bottom padding: 48px
- Light rule divider

## 5) Motion & Interaction (Implemented)
All entrance animations use pure CSS keyframes (no external library).

**Entrance sequence** (triggered by `html.entrance-play` class):
1. `.reveal-overlay` fades out: 0.3s `cubic-bezier(0.33, 0, 0.67, 1)`
2. `.site-header` slides down: 0.35s @ 50ms delay, `cubic-bezier(0.22, 1, 0.36, 1)`
3. `main` slides up: 0.4s @ 80ms delay, same easing

**Form pages** (request, schedule): longer durations (0.4s/0.5s/0.6s) with larger offsets (-8px/12px).

**Trigger logic** (~12 lines inline JS per page):
- Check `prefers-reduced-motion` — skip if reduced
- Check `performance.navigation.type` — skip on back/forward
- Add `entrance-play` class to `<html>` on initial load
- Remove `.reveal-overlay` on `animationend`

**Other motion**:
- Underline expansion on section intros (`expandWidth` keyframe)
- Leadership bio fade-in (`leadershipFadeIn` keyframe)
- `prefers-reduced-motion: reduce` disables all animation/transition durations
- Animations disabled below 599px via media query

## 6) Color System (Implemented)
- Text: `#1a1a1a`
- Background: `#f5f3f0`
- Link hover: `#666`

Supporting tokens:
Token | Value
---|---
`--color-surface` | `rgba(255, 255, 255, 0.7)`
`--line-subtle` | `rgba(26, 26, 26, 0.12)`
`--line-soft` | `rgba(26, 26, 26, 0.14)`
`--line-mid` | `rgba(26, 26, 26, 0.15)`
`--line-strong` | `rgba(26, 26, 26, 0.24)`
`--line-emphasis` | `rgba(26, 26, 26, 0.25)`
`--radius-md` | `18px`
`--shadow-soft` | `0 18px 50px rgba(0, 0, 0, 0.10)`

## 7) Responsiveness (Implemented)
Typography and margins use fluid `clamp()` — no size breakpoints needed.
Media queries are structural only (layout shifts):

- **≤1439px**: Our Story grid collapses to single column
- **≤1023px**: Sidebar stacks below content; portfolio grid → 2 columns; leadership nav unsticks
- **≤833px**: Header stacks (logo above nav); form grid → 1 column; section accents simplified
- **≤599px**: Portfolio/strategy grids → 1 column; nav CTA hidden; touch targets enforced (44px min); animations disabled
- **≤389px**: Fine-tuning spacing only (tighter gaps)

## 8) Content Guardrails
- Claims must be supportable by the deck; avoid absolute guarantees.
- Maintain boutique, controlled, institutional tone.
- Portfolio property names remain listed; do not add new properties without approval.
- Placeholders (e.g., location) remain as-is unless explicitly changed.

## 9) Documentation Governance
- This rulebook supersedes prior measurement and typography documents.
- If implementation changes, update this rulebook in the same change set.

## 10) Font Loading Contract
All pages use self-hosted woff2 files from `assets/fonts/`. No external font CDN.

**Files**: `ibm-plex-sans-latin.woff2`, `cormorant-garamond-latin.woff2`, `Junicode-ExpBold.woff2`

**Loading pattern** (every page):
1. Inline `@font-face` declarations in `<style>` block (before any script)
2. Font gate script: `document.fonts.load()` for each face, adds `.fonts-loaded` class
3. 2s hard timeout fallback — page never stays blank
4. CSS: `.js:not(.fonts-loaded) body { opacity: 0 }` hides FOUC

**CSP**: `font-src 'self'` — only self-hosted fonts are permitted.

**404.html special case**: Uses absolute `/assets/fonts/` paths since 404 can serve at any URL depth.

## 11) Build & Validation
Run `bash build.sh` before deploy. Checks:

1. No image > 500KB
2. CSS braces balanced
3. No Google Fonts references in live pages
4. No GSAP CDN references in live pages
5. All live pages exist
6. Generates fresh `styles.min.css`

Exit code 0 = ready to deploy.
