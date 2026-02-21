#!/usr/bin/env bash
# build.sh — Walden Ridge pre-deploy validation + CSS minification
# Run: bash build.sh
# Exit code 0 = all checks pass; non-zero = issues found.

set -euo pipefail
cd "$(dirname "$0")"

ERRORS=0
warn() { echo "  FAIL: $1"; ERRORS=$((ERRORS + 1)); }
ok()   { echo "  OK:   $1"; }

echo "=== Walden Ridge Build Validation ==="
echo ""

# ---------- 1. Image size check (max 500KB) ----------
echo "[1] Image size check (max 500KB)"
while IFS= read -r -d '' img; do
  size=$(stat -f%z "$img" 2>/dev/null || stat --format=%s "$img" 2>/dev/null)
  if [ "$size" -gt 512000 ]; then
    warn "$img ($(( size / 1024 ))KB)"
  fi
done < <(find assets/images -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.webp' -o -name '*.svg' \) -print0 2>/dev/null)
[ "$ERRORS" -eq 0 ] && ok "All images under 500KB"
echo ""

# ---------- 2. CSS brace balance ----------
echo "[2] CSS brace balance"
OPEN=$(tr -cd '{' < styles.css | wc -c | tr -d ' ')
CLOSE=$(tr -cd '}' < styles.css | wc -c | tr -d ' ')
if [ "$OPEN" -ne "$CLOSE" ]; then
  warn "styles.css braces unbalanced: { $OPEN vs } $CLOSE"
else
  ok "styles.css braces balanced ($OPEN pairs)"
fi
echo ""

# ---------- 3. No Google Fonts in live pages ----------
echo "[3] No Google Fonts references"
GFOUND=0
for f in index.html our-story/index.html strategy/index.html portfolio/index.html \
         leadership/index.html request/index.html request/thanks.html \
         schedule/index.html 404.html ops/index.html ops-intake/index.html; do
  if [ -f "$f" ] && grep -q 'fonts.googleapis.com' "$f"; then
    warn "$f references Google Fonts"
    GFOUND=1
  fi
done
[ "$GFOUND" -eq 0 ] && ok "No Google Fonts references in live pages"
echo ""

# ---------- 4. No GSAP CDN references ----------
echo "[4] No GSAP CDN references"
GSAP_FOUND=0
for f in index.html our-story/index.html strategy/index.html portfolio/index.html \
         leadership/index.html request/index.html request/thanks.html \
         schedule/index.html; do
  if [ -f "$f" ] && grep -q 'cdn.jsdelivr.net' "$f"; then
    warn "$f references GSAP CDN"
    GSAP_FOUND=1
  fi
done
[ "$GSAP_FOUND" -eq 0 ] && ok "No GSAP CDN references in live pages"
echo ""

# ---------- 5. All live pages exist ----------
echo "[5] Live page existence"
PAGES="index.html our-story/index.html strategy/index.html portfolio/index.html
       leadership/index.html request/index.html request/thanks.html
       schedule/index.html 404.html ops/index.html ops-intake/index.html
       governance/index.html"
MISSING=0
for p in $PAGES; do
  if [ ! -f "$p" ]; then
    warn "Missing: $p"
    MISSING=1
  fi
done
[ "$MISSING" -eq 0 ] && ok "All live pages present"
echo ""

# ---------- 6. Generate fresh styles.min.css ----------
echo "[6] Generate styles.min.css"
# Simple minification: strip comments, collapse whitespace
sed -e 's|/\*[^*]*\*\+\([^/][^*]*\*\+\)*/||g' \
    -e 's/^[[:space:]]*//' \
    -e '/^$/d' \
    styles.css | tr -s ' \t\n' ' ' > styles.min.css
MIN_SIZE=$(stat -f%z styles.min.css 2>/dev/null || stat --format=%s styles.min.css 2>/dev/null)
ok "styles.min.css generated ($(( MIN_SIZE / 1024 ))KB)"
echo ""

# ---------- Summary ----------
echo "=== Summary ==="
if [ "$ERRORS" -gt 0 ]; then
  echo "  $ERRORS issue(s) found. Fix before deploying."
  exit 1
else
  echo "  All checks passed. Ready to deploy."
  exit 0
fi
