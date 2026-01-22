# Exact Measurements Reference

All measurements locked at 1440px viewport width. Use this as a reference when verifying or adjusting the implementation.

## Layout Container

```css
--container-w: 1280px;
--outer-margin: 80px;         /* Left and right margins */
--gutter: 40px;                /* Column gap */
--header-height: 120px;
```

**Calculation:**
- Total viewport: 1440px
- Left margin: 80px
- Content width: 1280px
- Right margin: 80px
- Check: 80 + 1280 + 80 = 1440 ✓

---

## Typography Scale

### Display Font (JunicodeExpBold)
```css
Logo: 32px, line-height: 1.0, letter-spacing: 2px, weight: 700
H1:   72px, line-height: 1.1, weight: 700
```

### Body Font (Elza Text)
```css
Logo subtitle:    18px, line-height: 1.4, weight: 300 (Light)
Navigation:       18px, line-height: 1.4, weight: 400 (Regular)
Story intro:      22px, line-height: 1.45, weight: 500 (Medium)
Body paragraphs:  18px, line-height: 1.65, weight: 300 (Light)
Section headings: 20px, line-height: 1.3, weight: 700 (Bold)
Hero caption:     16px, line-height: 1.6, weight: 300 (Light)
```

---

## Spacing System

### Vertical Rhythm
```css
Header top padding:        40px
Main content top padding:  60px
H1 bottom margin:          32px
Story intro margin:        32px (bottom)
Paragraph margin:          24px (bottom)
Section intro margin:      60px (bottom, before grid)
Hero image-to-caption gap: 32px
Section internal gap:      16px (flex gap)
```

### Header
```css
Height:              120px
Logo-to-nav gap:     (calculated by flexbox space-between)
Nav item spacing:    60px (gap between links)
Logo vertical align: flex-start
```

---

## Page-Specific Layouts

### Our Story Page
```css
Grid layout:
  grid-template-columns: 560px 1fr;
  gap: 40px;

Left column (hero):
  width: 560px (fixed)

Right column (content):
  width: calc(1280px - 560px - 40px) = 680px
```

### Portfolio Page
```css
Grid layout:
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 40px; /* row-gap column-gap */

Each column width:
  (1280px - 2 × 40px) ÷ 3 = 400px

Property list item spacing: 8px (flex gap)
Region section gap: 16px (flex gap, internal)
```

### Strategy Page
```css
Grid layout:
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 60px; /* row-gap column-gap */

Each column width:
  (1280px - 60px) ÷ 2 = 610px

Strategy block gap: 16px (flex gap, internal)
Block vertical spacing: 48px (grid row gap)
Block horizontal spacing: 60px (grid column gap)
```

---

## Color Palette

```css
--color-text:       #1a1a1a  /* Main text */
--color-bg:         #f5f3f0  /* Page background */
--color-link:       #1a1a1a  /* Nav links */
--color-link-hover: #666     /* Nav hover state */
```

---

## Font Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: geometricPrecision;
font-display: block;  /* For JunicodeExpBold only */
```

---

## Grid Calculations Breakdown

### Our Story (2-column)
```
Total width:    1280px
Left column:    560px
Gap:            40px
Right column:   680px (remainder)
───────────────────────
Verification:   560 + 40 + 680 = 1280 ✓
```

### Portfolio (3-column)
```
Total width:    1280px
Column 1:       400px
Gap 1:          40px
Column 2:       400px
Gap 2:          40px
Column 3:       400px
───────────────────────
Verification:   400 + 40 + 400 + 40 + 400 = 1280 ✓
```

### Strategy (2-column)
```
Total width:    1280px
Column 1:       610px
Gap:            60px
Column 2:       610px
───────────────────────
Verification:   610 + 60 + 610 = 1280 ✓
```

---

## Line Height Calculations

### H1 (72px font-size, 1.1 line-height)
```
Line box: 72 × 1.1 = 79.2px
```

### Body (18px font-size, 1.65 line-height)
```
Line box: 18 × 1.65 = 29.7px
```

### Story Intro (22px font-size, 1.45 line-height)
```
Line box: 22 × 1.45 = 31.9px
```

### Section Headings (20px font-size, 1.3 line-height)
```
Line box: 20 × 1.3 = 26px
```

---

## Baseline Grid Reference

For precise vertical alignment, baselines should align every:
- H1: 79.2px (with 32px margin = 111.2px total block)
- Body: ~30px per line
- Section heading: 26px (with 8px margin = 34px total)

---

## CSS Variables (Complete List)

```css
:root {
  /* Fonts */
  --font-body: "elza-text", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
  --font-display: "JunicodeExpBold", "elza-text", Georgia, serif;

  /* Layout */
  --container-w: 1280px;
  --outer-margin: 80px;
  --gutter: 40px;
  --header-height: 120px;

  /* Typography sizes */
  --fs-nav: 18px;
  --fs-subtitle: 18px;
  --fs-body: 18px;
  --fs-h1: 72px;
  --fs-h2: 32px;
  --fs-section-head: 20px;

  /* Line heights */
  --lh-nav: 1.4;
  --lh-subtitle: 1.4;
  --lh-body: 1.65;
  --lh-h1: 1.1;
  --lh-h2: 1.3;

  /* Colors */
  --color-text: #1a1a1a;
  --color-bg: #f5f3f0;
  --color-link: #1a1a1a;
  --color-link-hover: #666;
}
```

---

## Adjustment Guidelines

If overlay validation reveals misalignment:

### For horizontal drift:
1. Check container width (should be 1280px)
2. Check outer margins (should be 80px)
3. Check column gaps (40px portfolio/our-story, 60px strategy)
4. Verify grid column calculations

### For vertical drift:
1. Check line-height values
2. Verify margin values (especially paragraph margins: 24px)
3. Check padding values (header: 40px top, main: 60px top)
4. Ensure no extra margin/padding on parent elements

### For typography mismatch:
1. Verify font-family is correct (inspect in DevTools)
2. Check font-weight matches (300/400/500/700)
3. Verify font-size in px (not rem/em)
4. Check line-height is unitless or px

### For line break differences:
1. Add/remove `<br>` tags to match reference exactly
2. Check if container width affects natural breaks
3. Verify word spacing isn't causing reflow

---

## DevTools Inspection Tips

### Measure actual rendered sizes:
```
1. Right-click element → Inspect
2. Check Computed tab for actual dimensions
3. Compare with expected values from this document
4. Use Measure tool (Cmd+Shift+P → "Show rulers")
```

### Check font loading:
```
1. Network tab → Filter: Font
2. Verify Junicode-ExpBold.otf loads (200 status)
3. Verify Typekit fonts load from use.typekit.net
4. Check Computed → font-family shows correct stack
```

### Verify colors:
```
1. Inspect element
2. Computed tab → background-color / color
3. Should show: rgb(26, 26, 26) for text
4. Should show: rgb(245, 243, 240) for background
```

---

## Pixel-Perfect Checklist

Use with overlay mode:

- [ ] Container left edge at x=80px
- [ ] Container right edge at x=1360px (1440-80)
- [ ] Header "WALDEN RIDGE" baseline matches
- [ ] Nav items baseline matches
- [ ] H1 baseline matches on each page
- [ ] First body paragraph baseline matches
- [ ] Column dividers (gaps) align
- [ ] All line breaks match exactly
- [ ] No cumulative vertical drift
- [ ] Image dimensions exact (Our Story hero: 560px wide)

---

**Last Updated**: Based on initial implementation
**Target Breakpoint**: 1440px viewport width
**Tolerance**: ±1-2px for pixel-perfect validation
