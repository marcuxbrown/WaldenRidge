# Setup Instructions

## Required Assets

Before running the site, you need to provide these assets:

### 1. Hero Image
Place your hero image (the landscape photo used in the Our Story page) at:
```
/assets/images/hero.jpg
```
or
```
/assets/images/hero.png
```

This should be the Cumberland Plateau/Appalachian Mountains landscape image from your reference.

### 2. Reference PNGs for Overlay Validation

Save your reference screenshots to these exact paths:

```
/assets/refs/our-story.png
/assets/refs/portfolio.png
/assets/refs/strategy.png
```

These are used by the overlay validation mode (press 'O' key to toggle).

## Font Setup (Already Complete)

✅ **JunicodeExpBold**: Already copied to `/assets/fonts/Junicode-ExpBold.otf`

✅ **Elza Text**: Loads automatically from Adobe Fonts (Typekit kit ckx4rji)

## Quick Start Commands

### Using Python 3:
```bash
cd walden-ridge
python3 -m http.server 8000
```

Then visit:
- http://localhost:8000/our-story/
- http://localhost:8000/portfolio/
- http://localhost:8000/strategy/
- http://localhost:8000/leadership/
- http://localhost:8000/governance/ (redirects)

### Set Browser to 1440px

**Chrome DevTools:**
1. Open DevTools (F12 or Cmd+Opt+I)
2. Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
3. Select "Responsive" mode
4. Set dimensions to: 1440 x 900 (or any height)

**Firefox DevTools:**
1. Open DevTools (F12)
2. Click responsive design mode icon
3. Set width to 1440px

## Overlay Validation Workflow

1. Start the local server
2. Open a page in your browser at 1440px width
3. Press **`O`** to enable overlay mode
4. The reference PNG overlays at 50% opacity
5. Visually inspect alignment:
   - Header elements
   - Text baselines
   - Column edges
   - Line breaks
   - Spacing and margins
6. Press **`O`** again to toggle off

## Troubleshooting

### Fonts not loading?
- Check browser console for errors
- Ensure Typekit kit is accessible (requires internet)
- Verify `/assets/fonts/Junicode-ExpBold.otf` exists

### Overlay not showing?
- Ensure reference PNGs are in `/assets/refs/`
- Check file names match exactly (case-sensitive)
- Press 'O' key (not zero)

### Hero image broken?
- Verify image is at `/assets/images/hero.jpg` or `hero.png`
- Update path in `/our-story/index.html` if using different format

## Next Steps

Once assets are in place:
1. Run the local server
2. Open each page at 1440px viewport
3. Use overlay mode to validate pixel-perfect alignment
4. If adjustments needed, edit `styles.css` and refresh
