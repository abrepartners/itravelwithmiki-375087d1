

# Update Footer to Use Colored Logo

This quick fix updates the footer logo from the white submark to the colored primary logo as originally planned.

---

## Current State

| Setting | Current |
|---------|---------|
| Logo File | `submark-logo.png` |
| Filter | `brightness-0 invert` (makes it white) |
| Size | `h-16` |

## Updated State

| Setting | Updated |
|---------|---------|
| Logo File | `primary-logo.png` |
| Filter | None (full brand colors) |
| Size | `h-20` (slightly larger for visibility) |

---

## Changes Required

**File:** `src/components/Footer.tsx`

**Line 4 - Update import:**
```tsx
// Current:
import submarkLogo from '@/assets/logos/submark-logo.png';

// Updated:
import primaryLogo from '@/assets/logos/primary-logo.png';
```

**Lines 13-17 - Update logo element:**
```tsx
// Current:
<img
  src={submarkLogo}
  alt="iTravelWithMiki"
  className="h-16 w-auto mb-4 brightness-0 invert"
/>

// Updated:
<img
  src={primaryLogo}
  alt="iTravelWithMiki"
  className="h-20 w-auto mb-4"
/>
```

---

## Visual Result

The colored primary logo will display against the dark blue footer background, providing better brand recognition and visual appeal compared to the white filtered version.

