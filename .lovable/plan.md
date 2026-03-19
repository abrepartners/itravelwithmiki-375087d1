

## Navbar Optimization — Logo + Compact Height + UX Polish

### Changes — `src/components/Navbar.tsx`

**1. Add logo as home button (left corner)**
- Import `wordmarkLogo` from `src/assets/logos/wordmark-logo.png`
- Replace the text "iTravelWithMiki" with an `<img>` inside the `<a href="/">` link
- Desktop: `h-8` unscrolled, `h-7` scrolled (smooth transition)
- Mobile: `h-7` unscrolled, `h-6` scrolled
- Transparent state: `brightness-0 invert` filter (white logo on hero)
- Scrolled state: natural logo colors (no filter)

**2. Reduce navbar height**
- Unscrolled: `py-5` → `py-2`
- Scrolled: `py-3` → `py-1.5`
- Remove `min-h-[56px]` — let content dictate height naturally

**3. UX polish for senior-friendly experience**
- Add `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` to all interactive elements for keyboard accessibility
- Add `aria-label="Home"` to logo link
- Wrap mobile menu in `AnimatePresence` for proper exit animations
- Add subtle hover underline effect on nav links (2px bottom border animation via CSS)
- Increase dropdown menu item padding slightly (`py-3`) for larger tap targets
- Add `will-change-transform` to header for smoother scroll transitions
- CTA button: slightly smaller `size="default"` with `px-5 py-2` to match reduced navbar height

**4. Mobile menu improvements**
- Add smooth backdrop overlay behind mobile menu (semi-transparent black)
- Close menu on outside click / scroll
- Ensure all tap targets remain 44px+ minimum

### Files
- `src/components/Navbar.tsx` — all changes in this single file

