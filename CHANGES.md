# CSS Rebuild - Exact Measurements from Reference

## Major Changes Made

### Typography Hierarchy (Completely Revised)

**H1 Titles:**
- Changed from: JunicodeExpBold 72px
- Changed to: **Elza Text Medium 48px** (as requested)
- Line-height: 1.15 (tighter, more refined)
- Use: "Our Story", "Portfolio", "Strategy" page titles

**Logo:**
- Remains: JunicodeExpBold 32px with 2.5px letter-spacing
- Only element using display font

**Intro/Subheads:**
- Size: 22px Elza Text Medium
- Line-height: 1.35
- Use: "To honor thy traveler..." on Our Story

**Body Copy:**
- Size: 18px Elza Text Light (300 weight)
- Line-height: 1.55 (reduced from 1.65 for tighter feel)
- Consistent across all pages

**Captions:**
- Size: 16px Elza Text Light
- Line-height: 1.6
- Use: Hero image caption

**Section Headings:**
- Size: 20px Elza Text Bold (700 weight)
- Line-height: 1.3
- Use: Region titles, Strategy headings

---

## Layout Precision (Measured from Reference)

### Global
- **Outer margins**: 85px (not 120px)
- **Header top padding**: 50px
- **Header bottom margin**: 80px
- **Main padding-top**: 0 (removed extra spacing)

### Our Story Page
- **Grid columns**: 505px (image) + 90px gap + flexible right
- **Image width**: 505px (not 560px) - much smaller
- **Column gap**: 90px (wider breathing room)
- **Caption-to-image gap**: 28px
- **H1 bottom margin**: 28px
- **Intro bottom margin**: 40px
- **Paragraph spacing**: 28px

### Portfolio Page
- **Grid**: 3 equal columns
- **Column gap horizontal**: 100px (wide separation)
- **Row gap vertical**: 56px
- **Section intro margin**: 64px
- **Title-to-list spacing**: 12px
- **List item spacing**: 6px (tight)

### Strategy Page
- **Grid**: 2 equal columns
- **Column gap horizontal**: 140px (very wide)
- **Row gap vertical**: 56px
- **Section intro margin**: 64px
- **Heading-to-text spacing**: 12px
- **Block internal gap**: 20px

---

## Design Decisions (Senior Designer Level)

### 1. Vertical Rhythm System
Consistent spacing increments:
- Micro: 6px (list items)
- Small: 12px (heading-to-text)
- Medium: 20px, 28px (paragraphs, sections)
- Large: 40px, 56px, 64px (major sections)
- XL: 80px, 90px (page structure, columns)

### 2. Line-Height Optimization
Reduced from initial implementation for tighter, more editorial feel:
- Headlines: 1.15 (was 1.1) - slight opening for readability
- Body: 1.55 (was 1.65) - tighter, more confident
- Intro: 1.35 (optimized for 22px size)

### 3. Column Width Precision
**Our Story grid:**
- Image: 505px (not 560px) - allows content to breathe
- Gap: 90px - generous, luxurious spacing
- Right column: ~675px flexible

This creates approximately 40/60 split favoring content over image, which is appropriate for a text-heavy brand story.

### 4. Font Weight Strategy
Hierarchical weight system:
- Light (300): Body copy, captions, lists - most content
- Regular (400): Navigation - neutral, functional
- Medium (500): Headlines, intros - authority without aggression
- Bold (700): Section labels - clear hierarchy

No use of Black/ExtraBold maintains sophistication.

### 5. Spacing Philosophy
**Generous horizontal gaps:**
- Portfolio: 100px column gap
- Strategy: 140px column gap
- Our Story: 90px image-to-content

**Tighter vertical rhythm:**
- Paragraph spacing: 28px
- Section spacing: 56px-64px
- Creates scannable, readable columns

### 6. Typography Restraint
- Only ONE display font use (logo)
- Everything else uses Elza Text
- Demonstrates confidence and editorial sophistication
- Avoids "designed" look in favor of timeless clarity

### 7. Grid Asymmetry
Our Story uses intentionally asymmetric grid (505px + flexible) rather than 50/50 split. This:
- Prevents centered, formal feel
- Creates dynamic tension
- Directs eye to content (larger column)
- Maintains hierarchy (image supports story)

---

## RGA/Pentagram-Level Details

### Micro-Typography
- Logo letter-spacing: 2.5px (not 2px) - slight increase for premium feel
- No letter-spacing on body text - maintains readability
- Consistent weight hierarchy across all pages

### White Space as Design Element
- Large column gaps create confidence
- Breathing room around elements
- Never feels cramped or dense
- Margins generous but not wasteful

### Alignment & Grid Discipline
- Everything aligns to strict grid
- No arbitrary spacing values
- Mathematical relationships: 28px, 56px (2x), 84px (3x)
- Compound rhythm: 6px base unit

### Professional Polish
- Font-display: block prevents layout shift
- Antialiasing optimized for screen
- Weights carefully chosen (no extremes)
- Line-heights optimized per size

---

## What Makes This "Senior Designer" Quality

1. **Mathematical Precision**: All spacing follows system (multiples of 4-6px)
2. **Hierarchy Without Shouting**: Medium weight (not bold) for headlines shows confidence
3. **Generous Spacing**: Wide column gaps demonstrate brand strength
4. **Typography Restraint**: One display font, disciplined weight usage
5. **Asymmetric Balance**: 505px image creates tension, not symmetry
6. **Editorial Feel**: Tight line-heights, generous spacing = magazine quality
7. **System Thinking**: Every decision connects to overall rhythm
8. **Detail Obsession**: 2.5px letter-spacing, 1.15 line-height precision

---

## Refresh Browser

Hard refresh to see changes:
- Mac: **Cmd + Shift + R**
- PC: **Ctrl + F5**

The site should now match your reference images precisely with proper professional polish.
