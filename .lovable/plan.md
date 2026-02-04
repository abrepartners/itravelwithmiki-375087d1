
# iTravelWithMiki Comprehensive Update Plan

This plan implements 4 major changes: adding brand logos, correcting "Mickey" to "Miki" throughout, creating a Support page, building a Trips page, and updating placeholder images with real content.

---

## Overview of Changes

| Category | Changes |
|----------|---------|
| **Brand Assets** | Add 6 logo files + Miki photo to project |
| **Text Corrections** | Replace all "Mickey" references with "Miki" |
| **New Pages** | Support page with FAQs + Trips page with filters |
| **Images** | Replace all placeholder photos with real destinations |
| **Routing** | Add `/support` and `/trips` routes |

---

## Phase 1: Copy Brand Assets to Project

### Logo Files to Add
Copy the uploaded logo files to `src/assets/logos/`:

1. **Primary Logo** - `Primary_Logo_Design_copy.png` (for general use)
2. **Secondary Logo** - `secondarylogo_copy.png` (alternate layout)
3. **Stacked Logo** - `Stacked_Logo_Designs_copy.png` (vertical layout)
4. **Submark Logo** - `Submark_Logo_Designs_copy.png` (circular badge)
5. **Wordmark Logo** - `Wordmark_Logo_Designs_copy.png` (text-only, for navbar)
6. **Icon Logo** - `ITWM-int_copy.png` (passport icon, for favicon/small uses)

### Miki Photo
Copy `Miki_pup.jpeg` to `src/assets/miki-photo.jpeg` for the About section.

---

## Phase 2: Update All "Mickey" References to "Miki"

### Files Requiring Text Changes

| File | Changes |
|------|---------|
| `Navbar.tsx` | "About Mickey" link text |
| `HeroSection.tsx` | "Meet Mickey" button text |
| `AboutMickey.tsx` | Section title, file rename to `AboutMiki.tsx` |
| `Footer.tsx` | "About Mickey" quick link |
| `FeaturedTrips.tsx` | No changes needed |
| `EmailPopup.tsx` | No changes needed |

---

## Phase 3: Update Logo Usage Across Site

### Navbar Logo
Replace text-based "iTravelWithMiki" with the **Wordmark Logo** image:
- White version on hero (transparent navbar)
- Blue version when scrolled (solid navbar)
- Size: Approximately 180px width on desktop, 140px on mobile

### Footer Logo
Use the **Submark Logo** (circular badge) in footer brand section.

### Hero Section
Update to use the **Primary Logo** or **Stacked Logo** as the main animated logo instead of text.

---

## Phase 4: Create Support Page

### File: `src/pages/Support.tsx`

**Structure:**
```text
+------------------------------------------+
|           SUPPORT CENTER HERO            |
|    "We're Here to Help You Travel"       |
+------------------------------------------+
|                                          |
|  FREQUENTLY ASKED QUESTIONS              |
|  +------------------------------------+  |
|  | Booking & Payments (accordion)     |  |
|  +------------------------------------+  |
|  | Before Your Trip (accordion)       |  |
|  +------------------------------------+  |
|  | During Your Trip (accordion)       |  |
|  +------------------------------------+  |
|  | Travel Insurance (accordion)       |  |
|  +------------------------------------+  |
|                                          |
|  DOWNLOADABLE RESOURCES                  |
|  [Travel Insurance Plan A PDF]           |
|  [Travel Insurance Plan B PDF]           |
|  [Packing Checklist PDF]                 |
|                                          |
|  CONTACT SECTION                         |
|  Phone / Email / Address                 |
+------------------------------------------+
```

### FAQ Content Categories
1. **Booking & Payments**
   - How do I book a trip?
   - What payment methods do you accept?
   - What is your cancellation policy?
   - Can I make payment installments?

2. **Before Your Trip**
   - What should I pack?
   - Do I need a passport?
   - How do I get trip updates?
   - What about mobility accommodations?

3. **During Your Trip**
   - What's included in the trip?
   - What about meals?
   - What are the bus activities like?
   - Emergency contacts?

4. **Travel Insurance**
   - Do I need travel insurance?
   - What does insurance cover?
   - How do I file a claim?

### Downloadable Resources
Placeholder links for:
- Travel Insurance Plan A (PDF)
- Travel Insurance Plan B (PDF)
- Packing Checklist (PDF)

---

## Phase 5: Create Trips Page

### File: `src/pages/Trips.tsx`

**Structure:**
```text
+------------------------------------------+
|              TRIPS PAGE HERO             |
|    "Find Your Perfect Adventure"         |
+------------------------------------------+
|                                          |
|  FILTER BAR                              |
|  [All Trips] [Bus Tours] [Land Trips]    |
|  [International] [Cruises]               |
|                                          |
|  TRIP CARDS GRID                         |
|  +--------+  +--------+  +--------+      |
|  | Trip 1 |  | Trip 2 |  | Trip 3 |      |
|  +--------+  +--------+  +--------+      |
|  +--------+  +--------+  +--------+      |
|  | Trip 4 |  | Trip 5 |  | Trip 6 |      |
|  +--------+  +--------+  +--------+      |
|  ... (more trips)                        |
|                                          |
+------------------------------------------+
```

### Trip Data with Real Destinations
Based on the provided business info, include trips for:

**Bus/Motorcoach Tours (U.S.):**
1. Savannah, Georgia
2. New Orleans, Louisiana
3. New York City
4. Niagara Falls
5. Mackinac Island, Michigan
6. Nashville, Tennessee
7. Branson, Missouri

**Land Trips (International):**
1. Italy 2026
2. Spain & Portugal
3. Alpine Villages (Switzerland/Austria)
4. Australia & New Zealand

**Cruises:**
1. River Cruises (placeholder)
2. Ocean Cruises (placeholder)

### Filter Functionality
- Category tabs with active state styling
- URL query params for shareable filters (`/trips?category=bus`)
- Reuse existing `TripCard.tsx` component

---

## Phase 6: Update About Section with Real Photo

### File: `src/components/AboutMiki.tsx` (renamed from AboutMickey.tsx)

**Changes:**
- Replace placeholder Unsplash image with `Miki_pup.jpeg`
- Update bio text to reflect actual business info:
  - Based in Maumelle/Little Rock, Arkansas
  - Pre-planned group vacations for 50+ travelers
  - Bus tours include games, snacks, and videos
  - Emphasis on social travel and meeting new people

---

## Phase 7: Update Placeholder Images with Real Destinations

### Image Updates

| Location | Current | New (Unsplash alternatives) |
|----------|---------|------------------------------|
| Hero Video | Generic travel video | Keep current (works well) |
| Featured Trip 1 | Alaska | Keep (actual destination) |
| Featured Trip 2 | Nashville | Real Nashville imagery |
| Featured Trip 3 | New Orleans | Real New Orleans imagery |
| Featured Trip 4 | Branson | Real Branson imagery |

For trips page, use high-quality Unsplash images of:
- Savannah historic district
- New York City skyline
- Niagara Falls
- Mackinac Island
- Italian coast/Rome
- Spain/Portugal landmarks
- Swiss Alps
- Sydney Opera House

---

## Phase 8: Update Routing

### File: `src/App.tsx`

Add new routes:
```typescript
<Route path="/support" element={<Support />} />
<Route path="/trips" element={<Trips />} />
```

---

## Phase 9: Update Footer with Correct Address

### Current Address (placeholder):
```
123 Travel Lane
Adventure City, TX 75001
```

### Correct Address:
```
P.O. Box 13993
Little Rock, AR 72113
```

---

## Files Summary

### New Files to Create
1. `src/assets/logos/` - Directory for logo files
2. `src/assets/miki-photo.jpeg` - Miki's photo
3. `src/pages/Support.tsx` - Support/FAQ page
4. `src/pages/Trips.tsx` - All trips page with filtering
5. `src/data/trips.ts` - Centralized trip data
6. `src/data/faqs.ts` - FAQ content data

### Files to Modify
1. `src/components/Navbar.tsx` - Logo image, "Miki" text
2. `src/components/HeroSection.tsx` - Logo image, "Miki" button
3. `src/components/AboutMickey.tsx` - Rename to `AboutMiki.tsx`, real photo, updated bio
4. `src/components/Footer.tsx` - Logo image, correct address, "Miki" text
5. `src/components/FeaturedTrips.tsx` - Real destination images
6. `src/pages/Index.tsx` - Import renamed AboutMiki component
7. `src/App.tsx` - Add new routes

---

## Technical Implementation Notes

### Logo Implementation
Import logos as ES6 modules for proper bundling:
```typescript
import wordmarkLogo from '@/assets/logos/wordmark.png';
import submarkLogo from '@/assets/logos/submark.png';
```

### Responsive Logo Sizing
```text
- Mobile: width ~140px
- Tablet: width ~160px  
- Desktop: width ~180px
```

### Accordion Component (Support Page)
Utilize existing Shadcn `@/components/ui/accordion` for FAQ sections.

### Senior-Friendly Considerations
- All FAQ items have large tap targets
- High contrast text throughout
- Clear section headings
- Downloadable resources are prominently displayed
- Phone number is clickable for mobile users

---

## Implementation Order

1. Copy all brand assets to project
2. Rename AboutMickey.tsx to AboutMiki.tsx
3. Update all "Mickey" text references to "Miki"
4. Update Navbar with logo images
5. Update HeroSection with logo
6. Update Footer with logo and correct address
7. Create Support page
8. Create Trips page with data
9. Update Featured Trips with real destination images
10. Add routes to App.tsx
11. Update Index.tsx imports
