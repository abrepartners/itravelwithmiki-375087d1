

## Navbar Redesign

### Current Issues
- Center logo creates an awkward 3-column grid layout that leaves uneven space
- `brightness-0 invert` filter on logo contradicts brand guidelines
- Navigation feels cramped with links split across left/right of logo

### Proposed Changes

**Layout**: Switch from center-logo grid to a standard left-aligned navbar:
- **Left**: Brand name as text link ("iTravelWithMiki" in Playfair Display) — no logo image
- **Right**: All nav links in a single row — Trips (dropdown), About Miki, The Experience, Travel Insurance (dropdown), Support, Contact, Book a Trip (CTA button)

**Mobile**: Keep hamburger menu on the left, brand text centered, no right spacer needed

**Styling** (no changes):
- Keep the transparent → solid scroll transition
- Keep the same color logic (white text on transparent, foreground on scrolled)
- Keep the "Book a Trip" rounded CTA button

### Technical Details

**File**: `src/components/Navbar.tsx`

1. Remove the `wordmarkLogo` import
2. Replace the 3-column grid with a 2-section flexbox (`justify-between`)
3. Left side: text-based brand link using `font-serif` (Playfair Display)
4. Right side: all nav links + dropdowns + CTA in one `flex` row
5. Mobile: hamburger left, brand text center (simpler 2-col or flex layout)
6. Remove `brightness-0 invert` filter entirely

