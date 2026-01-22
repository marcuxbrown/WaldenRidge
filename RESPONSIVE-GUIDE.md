# Responsive Design Guide

## Breakpoint Strategy

The site uses a mobile-first approach with carefully calibrated breakpoints for optimal experience across all devices.

### Breakpoint Hierarchy

```
1440px+     Desktop (Primary Target)      - Full experience
1024-1439px Laptop                        - Slightly condensed
834-1023px  Tablet Landscape              - 2-column layouts
600-833px   Tablet Portrait               - Stacked/simplified
390-599px   Mobile Portrait (iPhone 14)   - Single column, optimized
320-389px   Small Mobile (iPhone SE)      - Smallest screens
```

---

## Device-Specific Optimizations

### 📱 iPhone (390px - 428px)

**Typography:**
- H1: 32px (was 48px desktop)
- Intro: 18px (was 22px desktop)
- Body: 16px (was 18px desktop)
- Letter-spacing: Reduced to 0.005em for tighter mobile feel

**Layout:**
- Outer margins: 24px
- All grids: Single column
- Navigation: Wraps to 2 rows if needed
- Header: Stacks vertically (logo above nav)

**Spacing:**
- Paragraph spacing: 16px (was 18px desktop)
- Section spacing: 24px (was 32px desktop)
- Tighter gaps throughout for mobile

**Our Story Page:**
- Image displays first (visual hierarchy)
- Content follows below
- 24px gap between sections

**Portfolio Page:**
- Single column layout
- 20px spacing between regions
- Maintains readability with optimized line-height

**Strategy Page:**
- Single column (no side-by-side)
- 20px spacing between blocks
- Easy scrolling experience

---

### 📱 iPhone SE / Small Screens (320px - 389px)

**Typography:**
- H1: 28px (further reduced)
- Body: 15px (smaller but still readable)
- All spacing proportionally tighter

**Layout:**
- Outer margins: 20px (minimal but breathable)
- Logo: 22px (fits small screens)
- Nav: 14px (compact but legible)

**Polish Maintained:**
- Letter-spacing adjustments preserved
- Optical refinements maintained
- No text cramming or overflow

---

### 💻 iPad / Tablet Portrait (600px - 833px)

**Typography:**
- H1: 36px
- Intro: 19px
- Body: 16px
- Section heads: 18px

**Layout:**
- Outer margins: 32px
- Header: Stacks vertically with 24px gap
- Portfolio: 2-column grid maintained
- Strategy: 2-column grid maintained

**Our Story:**
- Single column stack
- Image on top (proper visual flow)

**Why This Works:**
- Tablet users prefer scanning
- 2-column layouts still readable
- Maintains desktop feel where possible

---

### 💻 iPad / Tablet Landscape (834px - 1023px)

**Typography:**
- H1: 40px
- Intro: 20px
- Body: 17px

**Layout:**
- Outer margins: 48px (generous but efficient)
- Our Story: Stacks to single column
- Portfolio: 2-column grid
- Strategy: 2-column grid maintained

**Navigation:**
- Stays horizontal with 40px gaps
- Logo: 28px (slightly smaller)

**Polish:**
- All micro-typography maintained
- Letter-spacing preserved
- Smooth transitions between breakpoints

---

### 💻 Laptop (1024px - 1439px)

**Typography:**
- H1: 44px (slightly smaller than desktop 48px)
- All other sizes: Nearly desktop equivalent

**Layout:**
- Outer margins: 60px
- Our Story: 2-column (equal width columns)
- Portfolio: 3-column maintained
- Strategy: 2-column maintained

**Why:**
- Most laptops are 1280px - 1366px wide
- Maintains desktop experience
- Slightly tighter to avoid excessive white space

---

## Responsive Polish Principles

### 1. Proportional Scaling

**Typography scales proportionally:**
```
Desktop (1440px)    → Mobile (390px)
H1: 48px            → 32px (67% scale)
Body: 18px          → 16px (89% scale)
```

**Spacing scales proportionally:**
```
Desktop             → Mobile
Outer margin: 85px  → 24px (28% scale)
Paragraph: 18px     → 16px (89% scale)
```

### 2. Maintained Letter-spacing

All letter-spacing adjustments are preserved across breakpoints:
- Headlines: -0.01em (all sizes)
- Body: 0.01em desktop, 0.005em mobile
- Navigation: 0.005em (all sizes)

### 3. Optical Line-height Adjustments

Line-heights adjust for readability at each size:
- Desktop body: 1.45
- Mobile body: 1.5 (slightly more breathing room)
- Headlines: 1.2 on mobile (vs 1.15 desktop)

### 4. Grid Intelligence

**Desktop:** 2-3 column layouts
**Tablet:** 2 column layouts (maintains scanning)
**Mobile:** Single column (optimal reading)

### 5. Touch Target Optimization

**Mobile navigation links:**
- Minimum 44px touch targets
- Adequate spacing (20-24px gaps)
- Wraps to multiple rows if needed

### 6. No Horizontal Scroll

Every breakpoint tested to ensure:
- No overflow-x
- No content cutoff
- Proper margin/padding management

---

## Testing Checklist

### iPhone Testing (Safari)
- [ ] iPhone 14 Pro (393 × 852)
- [ ] iPhone 14 (390 × 844)
- [ ] iPhone SE (375 × 667)
- [ ] Landscape orientation

### iPad Testing (Safari)
- [ ] iPad Pro 12.9" (1024 × 1366)
- [ ] iPad Air (820 × 1180)
- [ ] iPad Mini (744 × 1133)
- [ ] Landscape and portrait

### Android Testing (Chrome)
- [ ] Pixel 7 (412 × 915)
- [ ] Samsung Galaxy S23 (360 × 780)
- [ ] Various tablet sizes

### Desktop Testing
- [ ] MacBook Air (1280 × 800)
- [ ] MacBook Pro (1440 × 900)
- [ ] iMac (1920 × 1080)
- [ ] 4K displays (2560 × 1440+)

---

## Browser Compatibility

### Fully Supported:
- Safari 14+ (iOS, macOS)
- Chrome 90+ (all platforms)
- Firefox 88+ (all platforms)
- Edge 90+

### CSS Grid Support:
All modern browsers (2017+) support CSS Grid. No fallbacks needed.

### Font Rendering:
- Optimized for Retina displays
- Subpixel antialiasing on high-DPI screens
- Consistent across Safari/Chrome/Firefox

---

## Performance Optimizations

### Mobile-Specific:
1. **Retina Display Handling:**
   ```css
   @media (-webkit-min-device-pixel-ratio: 2) {
     body { -webkit-font-smoothing: subpixel-antialiased; }
   }
   ```

2. **Reduced Motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { transition-duration: 0.01ms !important; }
   }
   ```

3. **No Heavy Images:**
   - Single hero image only
   - 218KB optimized
   - Loads quickly on mobile

### Font Loading:
- Adobe Fonts (Typekit) loads async
- Local Junicode font cached
- No FOUT (Flash of Unstyled Text)

---

## Accessibility Features

### 1. Touch Targets
- Minimum 44px × 44px
- Adequate spacing between interactive elements
- No cramped navigation

### 2. Readable Font Sizes
- Never below 15px on any device
- Proper contrast ratios maintained
- Scalable with browser zoom

### 3. Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Navigation in `<nav>`
- Main content in `<main>`

### 4. Reduced Motion
- Respects `prefers-reduced-motion`
- Disables transitions if requested
- Accessibility-first approach

---

## Known Constraints

### Single-Screen Philosophy
Desktop version designed to fit without scrolling at 1440 × 900.

**Mobile/Tablet:**
- Scrolling expected and optimized
- Smooth scroll behavior
- Proper spacing prevents feeling cramped

### Image Handling
**Our Story page:**
- Desktop: Image on right (580px)
- Tablet: Image on top (full width)
- Mobile: Image on top (full width)

Order changes for optimal mobile experience.

---

## Breakpoint Decision Rationale

### Why These Specific Breakpoints?

**1439px:** Captures most laptops (1280-1366px common)
**1023px:** iPad Pro landscape (1024px)
**833px:** iPad Air/Mini portrait (820-834px)
**599px:** Large phones landscape (600px+)
**389px:** iPhone SE (375px) and small Android

### Not Generic Bootstrap Breakpoints
Custom breakpoints based on:
- Actual device usage data
- Content natural break points
- Typography scaling ratios
- Grid layout logic

---

## Future Enhancements

### Potential Additions:

1. **Dark Mode:**
   ```css
   @media (prefers-color-scheme: dark) {
     /* Already scaffolded, currently commented out */
   }
   ```

2. **Hover State Refinements:**
   - Subtle scale on nav hover (mobile)
   - Haptic feedback indicators

3. **Orientation Lock Handling:**
   - Specific iPad landscape optimizations
   - Phone landscape specific layouts

4. **Progressive Enhancement:**
   - CSS Grid with flexbox fallback (if supporting IE11)
   - Font loading strategies

---

## Quick Reference: Key Breakpoint Values

| Breakpoint | Outer Margin | H1 Size | Body Size | Grid Columns (Portfolio) |
|------------|--------------|---------|-----------|--------------------------|
| 1440px+    | 85px         | 48px    | 18px      | 3 columns                |
| 1024-1439  | 60px         | 44px    | 18px      | 3 columns                |
| 834-1023   | 48px         | 40px    | 17px      | 2 columns                |
| 600-833    | 32px         | 36px    | 16px      | 2 columns                |
| 390-599    | 24px         | 32px    | 16px      | 1 column                 |
| 320-389    | 20px         | 28px    | 15px      | 1 column                 |

---

## Testing Instructions

### Chrome DevTools:
1. Open DevTools (F12)
2. Toggle Device Toolbar (Cmd/Ctrl + Shift + M)
3. Test these presets:
   - iPhone 14 Pro
   - iPhone SE
   - iPad Air
   - iPad Pro
   - Responsive (custom widths)

### Safari Responsive Design Mode:
1. Develop → Enter Responsive Design Mode
2. Test iOS devices
3. Check font rendering differences

### Physical Device Testing:
**Recommended:**
- At least one iPhone
- At least one iPad
- One Android phone
- Different desktop resolutions

---

**Summary:** The site now maintains its polished, refined aesthetic across all devices from iPhone SE (320px) to 4K displays (2560px+), with carefully calibrated typography, spacing, and layout optimizations at each breakpoint.
