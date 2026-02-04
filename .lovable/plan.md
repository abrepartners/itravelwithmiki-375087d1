

# Fix Logo Colors + Create Development Reference

This plan addresses two issues:
1. Remove logo color filters so the original brand colors display
2. Create a development reference file for future updates

---

## Changes Summary

| Item | Issue | Fix |
|------|-------|-----|
| Hero Section Logo | `brightness-0 invert` forces white | Remove filter to show original colors |
| Footer Logo | `brightness-0 invert` forces white | Keep white (works on blue background) |
| Development Reference | None exists | Create `.lovable/plan.md` with corrected "Miki" spelling |

---

## Phase 1: Fix Hero Section Logo

### File: `src/components/HeroSection.tsx`

**Current (Line 40):**
```tsx
className="h-32 md:h-40 lg:h-48 w-auto brightness-0 invert"
```

**Updated:**
```tsx
className="h-32 md:h-40 lg:h-48 w-auto"
```

Remove the `brightness-0 invert` filter so the stacked logo displays in its original brand colors (blue).

**Note:** The dark video overlay behind the hero provides enough contrast for the colored logo to be visible.

---

## Phase 2: Keep Footer Logo White

The footer has a dark blue (`bg-primary`) background. The `brightness-0 invert` filter on the submark logo correctly makes it white for visibility. This should remain unchanged.

---

## Phase 3: Update Development Reference File

### File: `.lovable/plan.md`

Update the existing plan file to:
1. Correct all "Mickey" references to "Miki"
2. Mark completed tasks
3. Serve as a reference for future development

**Key corrections in the plan:**
- Line 43: "About Mickey" → "About Miki" 
- Line 44: "Meet Mickey" → "Meet Miki"
- Line 45: "AboutMickey.tsx" → "AboutMiki.tsx"
- Line 46: "About Mickey" → "About Miki"

---

## Files to Modify

1. **`src/components/HeroSection.tsx`** - Remove logo color filter (1 line change)
2. **`.lovable/plan.md`** - Update spelling and mark completion status

---

## Technical Notes

### Why the colored logo works on the hero:
- The video has a dark gradient overlay (`from-black/50 via-black/30 to-black/60`)
- This provides sufficient contrast for the blue/colored logo
- The original brand colors will now be visible and match the brand identity

### Footer logo stays white because:
- The footer background is `bg-primary` (Royal Blue)
- White logo provides proper contrast
- Matches the white text used throughout the footer

