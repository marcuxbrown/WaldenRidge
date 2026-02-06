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
- Body: `elza-text`
- Display: `JunicodeExpBold` (logo only)

**Sizes (1440px target)**
- Logo: 32px, letter-spacing 2.5px, weight 700
- Subtitle: 18px, weight 300
- Nav: 18px, weight 400
- H1: 48px, weight 500
- Intro: 22px, weight 500
- Body: 18px, weight 300
- Caption: 16px, weight 300
- Section heading (H3): 20px, weight 700
- Sidebar title: 18px, weight 500
- Sidebar item title: 15px, weight 500
- Sidebar item text: 14px, weight 300
- Portfolio/Strategy meta text: 17px (intro), 19px (strategy heading)

**Line heights**
- Logo: 1.0
- Subtitle/Nav: 1.4
- H1: 1.15
- Intro: 1.35
- Body: 1.55
- Caption: 1.5
- Section heading: 1.3
- Sidebar item text: 1.5

**Letter-spacing**
- Body default: 0.01em
- H1: -0.01em
- H3: -0.005em
- Nav: 0.005em

**Rendering**
- `text-rendering: optimizeLegibility`
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

## 4) Layout System (Implemented)
**Target viewport**: 1440px
- Outer margin: 85px
- Container max-width: 1440px
- Effective content width: 1270px

**Header**
- Padding top: 40px
- Margin bottom: 48px
- Navigation gap: 60px

**Our Story**
- Grid: 580px / 1fr
- Gap: 48px

**Portfolio**
- Layout: `1fr` + 280px sidebar
- Gap: 80px
- Portfolio grid: 3 columns
- Grid gap: 32px (rows) / 48px (cols)

**Strategy**
- Layout: `1fr` + 280px sidebar
- Gap: 80px
- Strategy grid: 2 columns
- Grid gap: 28px (rows) / 32px (cols)

**Footer**
- Top margin: 120px
- Bottom padding: 48px
- Light rule divider

## 5) Motion & Interaction (Implemented)
- Header and main content use `breatheIn` (0.8s) on load
- Sidebar and portfolio sections use `fadeIn` and staggered `breatheIn`
- Underline expansion on section intros
- Motion is permitted and part of the system

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
Breakpoints and primary adjustments:
- **1439px**: margins 60px, H1 44px
- **1023px**: margins 48px, H1 40px, intro 20px, body 17px
- **833px**: margins 32px, H1 36px, body 16px
- **767px**: portfolio grid becomes 1 column; strategy grid may remain 2
- **599px**: margins 16px; typography scales down; nav compresses
- **389px**: smallest sizes and tighter spacing

## 8) Content Guardrails
- Claims must be supportable by the deck; avoid absolute guarantees.
- Maintain boutique, controlled, institutional tone.
- Portfolio property names remain listed; do not add new properties without approval.
- Placeholders (e.g., location) remain as-is unless explicitly changed.

## 9) Documentation Governance
- This rulebook supersedes prior measurement and typography documents.
- If implementation changes, update this rulebook in the same change set.
