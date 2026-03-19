

## Navbar Fix + Site-wide Branding Standardization

### 1. Navbar — Logo Size & Layout Fix (`src/components/Navbar.tsx`)

**Issues**: Logo is tiny (h-7/h-8), and the nav link order doesn't match the reference image layout.

**Changes**:
- Increase logo size: `h-12` unscrolled, `h-10` scrolled (per brand spec of h-12 to h-14)
- Mobile logo: `h-9` unscrolled, `h-8` scrolled
- Reorder desktop nav to match the reference image: Logo (left) → Trips dropdown, About Miki, The Experience → (gap/spacer) → Travel Insurance dropdown, Support, Contact, Book a Trip CTA (right)
- Reduce vertical padding slightly so the bigger logo doesn't make the bar too tall (`py-3` unscrolled, `py-2` scrolled)
- Use `items-center` properly so links vertically center with the taller logo

### 2. Remove Amber/Gold from Experience Page (`src/pages/Experience.tsx`)

Replace all `hsl(40 80% ...)` amber/gold inline styles with brand-consistent colors:
- Section labels ("Our Story", "By the Numbers", "Our Journey") → `text-primary` (Royal Blue) or `text-white/60` on dark backgrounds
- Hero highlight "We Create Memories" → `text-primary-foreground` or `text-white` with no amber
- Stats numbers → `text-primary` (blue) on dark sections, or `text-white`
- Timeline dots/lines → `border-primary` / `bg-primary` instead of gold
- Year labels → `text-primary` on dark bg

### 3. Remove Amber/Gold from HowItWorks Component (`src/components/HowItWorks.tsx`)

Same treatment — replace all `hsl(40 80% ...)` with brand colors:
- Section label → white/60 or a light blue
- Highlight text "a Lifetime" → `text-white` or light blue
- Step numbers, icon containers, connector lines → use `primary` (blue) tones
- CTA button → standard `bg-primary hover:bg-primary/90` instead of gold gradient
- Remove the gold glow radial gradient

### 4. Standardize CTA Button Styling

Ensure all CTAs across the site use the same pattern:
- Primary CTA: `bg-primary hover:bg-primary/90 text-primary-foreground` (Royal Blue)
- On dark backgrounds: `bg-white text-foreground hover:bg-white/90` or keep primary blue
- Remove the gold gradient button in HowItWorks
- Hero CTA already uses `bg-accent` (red) which is fine for the main hero

### Technical Details

**Files to edit**:
1. `src/components/Navbar.tsx` — logo size increase, nav reorder, padding adjustment
2. `src/pages/Experience.tsx` — replace ~10 instances of `hsl(40 80% ...)` with brand colors
3. `src/components/HowItWorks.tsx` — replace ~12 instances of `hsl(40 80% ...)` with brand colors

