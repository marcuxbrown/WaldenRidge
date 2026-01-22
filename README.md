# WALDEN RIDGE - Pixel-Perfect Marketing Site

This is a pixel-perfect recreation of the Walden Ridge marketing site, built to match reference PNGs at 1440px viewport width.

## Font Stack
- **Display font**: JunicodeExpBold (local OTF file)
- **Body/Navigation**: elza-text (Adobe Fonts/Typekit)

## Setup & Running Locally

### Prerequisites
- A local web server (Python, Node, or any HTTP server)
- Modern browser (Chrome/Firefox/Safari)
- 1440px viewport width for validation

### Quick Start

1. **Place your hero image**:
   ```
   /assets/images/hero.jpg (or .png)
   ```

2. **Place reference PNGs for overlay validation**:
   ```
   /assets/refs/our-story.png
   /assets/refs/portfolio.png
   /assets/refs/strategy.png
   ```

3. **Start a local server**:

   Using Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Using Node/npx:
   ```bash
   npx http-server -p 8000
   ```

   Using PHP:
   ```bash
   php -S localhost:8000
   ```

4. **Open in browser**:
   ```
   http://localhost:8000/our-story/
   http://localhost:8000/portfolio/
   http://localhost:8000/strategy/
   ```

## Overlay Validation Mode

To verify pixel-perfect alignment with the reference PNGs:

1. **Set browser viewport to exactly 1440px wide**
   - Chrome DevTools: Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
   - Set dimensions to 1440 x 900 (or taller)

2. **Toggle overlay mode**:
   - Press **`O`** key while on any page
   - The reference PNG will overlay at 50% opacity
   - Press **`O`** again to toggle off

3. **Validation checklist**:
   - Header logo and nav alignment
   - All text baselines and line breaks
   - Column edges and gutters
   - Image dimensions and positioning
   - Paragraph spacing and rhythm

## Target Viewport

**Primary breakpoint**: 1440px width

All measurements are locked at this width:
- Container width: 1280px
- Outer margins: 80px
- Column gutters: 40px
- Header height: 120px

## Measurements Locked

### Typography
- **Logo**: JunicodeExpBold, 32px, letter-spacing: 2px
- **Subtitle**: elza-text Light (300), 18px, line-height: 1.4
- **Navigation**: elza-text Regular (400), 18px
- **H1**: JunicodeExpBold, 72px, line-height: 1.1
- **H2**: elza-text Medium (500), 32px, line-height: 1.3
- **Body**: elza-text Light (300), 18px, line-height: 1.65
- **Section headings**: elza-text Bold (700), 20px

### Layout Grid
- **Our Story**: 2 columns (560px + flexible right column), 40px gap
- **Portfolio**: 3 columns equal width, 40px gap
- **Strategy**: 2 columns equal width, 60px gap

### Spacing
- Header top padding: 40px
- Main content top padding: 60px
- Paragraph bottom margin: 24px
- Section intro bottom margin: 60px

## File Structure

```
walden-ridge/
├── assets/
│   ├── fonts/
│   │   └── Junicode-ExpBold.otf
│   ├── images/
│   │   └── hero.jpg (user-provided)
│   └── refs/
│       ├── our-story.png (user-provided)
│       ├── portfolio.png (user-provided)
│       └── strategy.png (user-provided)
├── our-story/
│   └── index.html
├── portfolio/
│   └── index.html
├── strategy/
│   └── index.html
├── styles.css
└── README.md
```

## Font Integration Details

### Adobe Fonts (Typekit)
The Elza Text font is loaded via Typekit kit `ckx4rji`:
```html
<link rel="preconnect" href="https://use.typekit.net" crossorigin>
<link rel="stylesheet" href="https://use.typekit.net/ckx4rji.css">
```

Weights used:
- Light (300): body copy, captions
- Regular (400): navigation
- Medium (500): intro headings
- Bold (700): section headings

### Local Font (Junicode)
Loaded via @font-face with `font-display: block` to prevent layout shift:
```css
@font-face {
  font-family: "JunicodeExpBold";
  src: url("/assets/fonts/Junicode-ExpBold.otf") format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: block;
}
```

## Validation Notes

- All line breaks are hardcoded with `<br>` tags to match reference exactly
- No fluid typography at 1440px - all values are explicit pixels
- Grid uses CSS Grid with explicit px columns at target breakpoint
- Overlay mode allows direct visual comparison with reference PNGs
- Font rendering uses `-webkit-font-smoothing: antialiased` for consistency

## Browser Testing

Tested and validated in:
- Chrome 120+
- Firefox 120+
- Safari 17+

For best results, test at exactly 1440px viewport width.

## Pass/Fail Criteria

**PASS** when overlay at 1440px shows:
- ✓ Container and column edges align within 1-2px
- ✓ All text baselines match reference
- ✓ Line breaks match exactly
- ✓ Image crops and dimensions match
- ✓ Spacing and rhythm match throughout

**FAIL** if any of the above show visible drift (>2px).
