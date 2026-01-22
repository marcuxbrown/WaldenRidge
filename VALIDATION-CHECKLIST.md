# Pixel-Perfect Validation Checklist

Use this checklist with overlay mode (press 'O') at 1440px viewport width to verify implementation matches reference PNGs.

## Pre-Validation Setup

- [ ] Browser viewport set to exactly 1440px width
- [ ] Reference PNGs placed in `/assets/refs/` directory
- [ ] Hero image placed in `/assets/images/` directory
- [ ] Local server running (http://localhost:8000)

---

## ALL PAGES - Global Header

### Typography
- [ ] "WALDEN RIDGE" uses JunicodeExpBold font
- [ ] Logo letter-spacing: 2px
- [ ] Logo size: 32px
- [ ] Subtitle "Design, Construction, Hospitality" uses Elza Text Light (300)
- [ ] Subtitle size: 18px
- [ ] Navigation links use Elza Text Regular (400)
- [ ] Navigation size: 18px

### Layout
- [ ] Header height: 120px
- [ ] Logo-to-nav spacing and alignment matches
- [ ] Logo block left-aligned at 80px margin
- [ ] Nav items spaced 60px apart
- [ ] Nav vertical alignment with logo block

### Colors & Rendering
- [ ] Text color: #1a1a1a
- [ ] Background: #f5f3f0
- [ ] Font antialiasing renders smoothly
- [ ] No font flash/swap on page load

---

## OUR STORY PAGE

### Press 'O' to enable overlay at http://localhost:8000/our-story/

### Layout Grid
- [ ] Two-column layout: 560px left + flexible right
- [ ] Column gap: 40px
- [ ] Outer margins: 80px left/right
- [ ] Content starts 60px below header

### Left Column (Hero)
- [ ] Hero image width: 560px
- [ ] Hero image aspect ratio matches reference
- [ ] Space between image and caption: 32px
- [ ] Caption line breaks match exactly:
  - "Within Cumberland Plateau" [break]
  - "and the Foothills of the Applachian Mountains,"
  - [paragraph break]
  - "Walden Ridge serves prospectors, scouts," [break]
  - "and travelers as a landmark of safe passage," [break]
  - "respite, and enduring hospitality."
- [ ] Caption font: Elza Text Light (300)
- [ ] Caption size: 16px, line-height: 1.6

### Right Column (Content)
- [ ] H1 "Our Story" uses JunicodeExpBold
- [ ] H1 size: 72px, line-height: 1.1
- [ ] H1 bottom margin: 32px
- [ ] Intro paragraph (bold line) uses Elza Text Medium (500)
- [ ] Intro size: 22px, line-height: 1.45
- [ ] Intro bottom margin: 32px
- [ ] Intro line breaks:
  - "To honor thy traveler through" [break]
  - "Workmanship, Innovation, and Due Diligence"
- [ ] Body paragraphs use Elza Text Light (300)
- [ ] Body size: 18px, line-height: 1.65
- [ ] Paragraph bottom margin: 24px
- [ ] All body paragraph line breaks match reference exactly

### Baseline Alignment
- [ ] All text baselines align with reference overlay
- [ ] No vertical drift in paragraph spacing
- [ ] Column top alignment matches

---

## PORTFOLIO PAGE

### Press 'O' to enable overlay at http://localhost:8000/portfolio/

### Layout Grid
- [ ] Three equal columns
- [ ] Column gap: 40px horizontal, 40px vertical
- [ ] Outer margins: 80px left/right
- [ ] Content starts 60px below header

### Intro Section
- [ ] H1 "Portfolio" matches Our Story H1 styling
- [ ] H1 bottom margin: 32px
- [ ] Intro text uses Elza Text Light (300)
- [ ] Intro size: 18px, line-height: 1.65
- [ ] Intro line break:
  - "Walden Ridge carries forward over fifteen years of national hotel renovation experience," [break]
  - "operating within brand-mandated capital cycles across the United States."
- [ ] Intro bottom margin: 60px before grid starts

### Region Sections
- [ ] Region titles use Elza Text Bold (700)
- [ ] Region title size: 20px, line-height: 1.3
- [ ] Region title bottom margin: 8px
- [ ] Property list items use Elza Text Light (300)
- [ ] Property list size: 18px, line-height: 1.5
- [ ] Property spacing: 8px between items
- [ ] Section spacing: 16px gap in flex column

### Grid Alignment
- [ ] Northern California in first column
- [ ] Midwest in second column
- [ ] Mid-Atlantic in third column
- [ ] Texas in first column (second row)
- [ ] New England in second column (second row)
- [ ] Mountain West in third column (second row)

### Content Accuracy
- [ ] All property names match reference exactly
- [ ] Comma placement matches (note: "Houston," has comma in Texas section)

---

## STRATEGY PAGE

### Press 'O' to enable overlay at http://localhost:8000/strategy/

### Layout Grid
- [ ] Two equal columns
- [ ] Column gap: 60px horizontal, 48px vertical
- [ ] Outer margins: 80px left/right
- [ ] Content starts 60px below header

### Intro Section
- [ ] H1 "Strategy" matches other pages
- [ ] H1 bottom margin: 32px
- [ ] Intro text uses Elza Text Light (300)
- [ ] Intro size: 18px, line-height: 1.65
- [ ] Intro text: "Our work exists to preserve reputation, revenue, and long-term asset value"
- [ ] Intro bottom margin: 60px before grid starts

### Strategy Blocks
- [ ] Block headings use Elza Text Bold (700)
- [ ] Heading size: 20px, line-height: 1.3
- [ ] Heading bottom margin: 8px
- [ ] Block text uses Elza Text Light (300)
- [ ] Block text size: 18px, line-height: 1.65
- [ ] Block spacing: 16px gap in flex column

### Grid Layout
- [ ] "Compliance-Driven Procurement Authority" - left column
- [ ] "Lifecycle-Based Capital Planning" - right column
- [ ] "Vertical Integration for Control" - left column
- [ ] "Repeatability Over Speculation" - right column
- [ ] "Brand Standards Fluency" - left column (spans alone)

### Line Breaks Match Reference
Each block's body text line breaks should match exactly:

**Compliance block:**
- "Tight control of approved vendors, submittals," [break]
- "and material substitutions to protect inspection" [break]
- "outcomes and working capital timing."

**Lifecycle block:**
- "Renovation execution aligned to 6, 12, and 18-year" [break]
- "brand cycles, enabling predictable reinvestment" [break]
- "and asset lifecycle management."

**Vertical Integration block:**
- "Internal millwork, fabrication, and installation" [break]
- "reduce vendor handoffs, approval delays," [break]
- "and warranty exposure."

**Repeatability block:**
- (Same as Vertical Integration - verify if this is correct)

**Brand Standards block:**
- "Deep operational familiarity with Hilton," [break]
- "Marriott, Hyatt, IHG, and Wyndham renovation"

---

## CROSS-PAGE CONSISTENCY

- [ ] Header is identical across all three pages
- [ ] Container width consistent: 1280px (with 80px outer margins)
- [ ] H1 styling identical on all pages
- [ ] Body text styling consistent throughout
- [ ] Spacing rhythm consistent

---

## FONT LOADING VERIFICATION

### Browser DevTools Check
1. Open DevTools → Network tab
2. Filter by "Font"
3. Verify these load successfully:
   - [ ] Elza Text fonts from use.typekit.net
   - [ ] Junicode-ExpBold.otf from local assets

### Visual Font Verification
- [ ] "WALDEN RIDGE" displays in distinctive serif (Junicode)
- [ ] Navigation displays in clean sans-serif (Elza Text)
- [ ] Body copy displays in Elza Text Light
- [ ] Bold headings display in Elza Text Bold
- [ ] No font fallback/substitution visible

---

## OVERLAY MODE FINAL CHECK

### For each page:

1. **Load page at 1440px width**
2. **Press 'O' to toggle overlay**
3. **Check alignment within 1-2px for:**
   - [ ] Container left edge at 80px
   - [ ] Container right edge at 1360px (1440 - 80)
   - [ ] Header baseline
   - [ ] H1 baseline
   - [ ] All paragraph baselines
   - [ ] Column dividers (if visible)
   - [ ] All line breaks
4. **Scroll through entire page**
5. **Verify no cumulative drift**

---

## PASS/FAIL CRITERIA

### ✅ PASS if:
- All typography matches (font family, size, weight, line-height)
- All spacing matches within 1-2px
- All line breaks match exactly
- Layout aligns with reference at 1440px
- Fonts load without flash or substitution
- No visible layout shift during font loading

### ❌ FAIL if:
- Any text uses wrong font family
- Line breaks differ from reference
- Spacing differs by more than 2px
- Layout shifts during font loading
- Baseline alignment drifts
- Column widths or gaps incorrect

---

## ITERATION WORKFLOW

If validation fails:

1. **Identify specific mismatch** (use overlay mode)
2. **Measure exact difference** (browser DevTools or screenshot comparison)
3. **Update styles.css** with corrected values
4. **Refresh browser** (hard refresh: Cmd+Shift+R / Ctrl+F5)
5. **Re-validate with overlay**
6. **Repeat until pass**

---

## NOTES

- Take screenshots at each validation step for documentation
- Use browser DevTools "Measure" tool for precise px measurements
- Compare overlay at 100% zoom (Cmd+0 / Ctrl+0)
- Test in multiple browsers (Chrome, Firefox, Safari) after passing in primary browser
