

# Land Trips Page Implementation Plan

This plan creates a dedicated `/land-trips` page with custom trip cards following the specified design requirements and button logic.

---

## Overview of Changes

| Area | Description |
|------|-------------|
| **New Page** | Create `/land-trips` route with dedicated page component |
| **New Data Type** | Create `LandTrip` interface for the specific data model |
| **New Data File** | Create data-driven land trips array with 5 entries |
| **New Card Component** | Create `LandTripCard` with Learn More + conditional Book Now buttons |
| **Routing** | Add `/land-trips` route to App.tsx |

---

## Phase 1: Create Land Trip Data Type

**File:** `src/types/land-trip.ts`

Create a dedicated interface matching the required data model:

```text
LandTrip {
  id: string
  title: string
  start_date: string
  end_date: string
  date_display: string (e.g., "October 10 to 25, 2026")
  sub_description: string
  status: "Active" | "Sold out, waitlist only"
  learn_more_link: string (internal URL)
  booking_link: string | null (optional external URL)
  images: string[] (for visual consistency)
}
```

---

## Phase 2: Create Land Trips Data

**File:** `src/data/land-trips.ts`

Populate with exactly 5 trips in the specified order:

| # | Trip | Dates | Status |
|---|------|-------|--------|
| 1 | Romantic Villages of Alpine Europe | Oct 10-25, 2026 | Active |
| 2 | Ireland in Depth | Mar 27 - Apr 10, 2027 | Active |
| 3 | Australia & New Zealand | Aug 26 - Sep 13, 2027 | Active |
| 4 | Our Private Italy 2026 | May 6-16, 2026 | Sold out |
| 5 | Spain & Portugal in Depth | Feb 20 - Mar 6, 2026 | Sold out |

**Important:** Spain & Portugal has a `booking_link` stored but will NOT display "Book Now" because status is sold out.

---

## Phase 3: Create LandTripCard Component

**File:** `src/components/LandTripCard.tsx`

Card structure:
```text
+----------------------------------------+
|           [Image Carousel]             |
|    +----------------------------+      |
|    | Status Badge (top-left)    |      |
|    | Active OR Sold out...      |      |
|    +----------------------------+      |
+----------------------------------------+
| Trip Title (H3)                        |
| Dates (single line)                    |
| Sub description (paragraph)            |
|                                        |
| [Learn More] [Book Now] (conditional)  |
+----------------------------------------+
```

### Button Logic (Critical)

**Primary Button - "Learn More"**
- Always visible for all trips
- Opens `learn_more_link` in same tab
- Uses `<a href={...}>` without `target="_blank"`

**Secondary Button - "Book Now"**
- Only displayed when BOTH conditions are true:
  1. `status === "Active"`
  2. `booking_link` is not null/empty
- Opens `booking_link` in new tab (`target="_blank"`)
- If `status === "Sold out, waitlist only"`, never show this button even if `booking_link` exists

---

## Phase 4: Create Land Trips Page

**File:** `src/pages/LandTrips.tsx`

Page structure:
```text
+------------------------------------------+
|              Navbar                      |
+------------------------------------------+
|          HERO SECTION                    |
|    "Current Land Trips"                  |
|    Subtitle about international travel   |
+------------------------------------------+
|                                          |
|    TRIP CARDS GRID                       |
|    +--------+  +--------+  +--------+    |
|    | Trip 1 |  | Trip 2 |  | Trip 3 |    |
|    +--------+  +--------+  +--------+    |
|    +--------+  +--------+                |
|    | Trip 4 |  | Trip 5 |                |
|    +--------+  +--------+                |
|                                          |
+------------------------------------------+
|              Footer                      |
+------------------------------------------+
```

The cards will render in the exact order specified (not sorted by date).

---

## Phase 5: Add Route to App.tsx

**File:** `src/App.tsx`

Add new route:
```typescript
import LandTrips from "./pages/LandTrips";

// Inside Routes:
<Route path="/land-trips" element={<LandTrips />} />
```

---

## Phase 6: Update Navigation

**File:** `src/components/Navbar.tsx`

Update the Land Trips link to point to the new dedicated page:

```text
Current: { label: 'Land Trips', href: '/trips?category=land' }
Updated: { label: 'Land Trips', href: '/land-trips' }
```

---

## Files Summary

### New Files to Create
1. `src/types/land-trip.ts` - LandTrip interface
2. `src/data/land-trips.ts` - 5 trip entries
3. `src/components/LandTripCard.tsx` - Custom card component
4. `src/pages/LandTrips.tsx` - Dedicated page

### Files to Modify
1. `src/App.tsx` - Add `/land-trips` route
2. `src/components/Navbar.tsx` - Update link to `/land-trips`

---

## Technical Details

### Status Badge Styling
- **Active:** Green/success styling (e.g., `bg-green-100 text-green-800`)
- **Sold out, waitlist only:** Orange/warning styling (e.g., `bg-amber-100 text-amber-800`)

### Button Implementation

```text
Primary ("Learn More"):
- Component: <Button> or <a>
- Target: Same tab (no target attribute)
- Styling: Outline/secondary variant

Secondary ("Book Now"):
- Component: <Button> inside <a>
- Target: New tab (target="_blank" rel="noopener noreferrer")
- Styling: Primary variant
- Visibility: Only if Active AND booking_link exists
```

### Image Strategy
Reuse existing Unsplash images from trips.ts for visual consistency:
- Alpine Europe: Swiss Alps imagery
- Ireland: Irish countryside
- Australia/NZ: Sydney Opera House, landscapes
- Italy: Italian coast/Rome
- Spain/Portugal: Iberian landmarks

---

## Validation Checklist

After implementation:
- [ ] All 5 trips display in the exact order specified
- [ ] "Learn More" appears on all 5 cards
- [ ] "Learn More" navigates to internal detail page in same tab
- [ ] "Book Now" appears ONLY on Active trips with booking_link
- [ ] "Book Now" does NOT appear on sold out trips (even Spain/Portugal with booking_link)
- [ ] Status badges display correctly (Active vs Sold out, waitlist only)
- [ ] Navigation link updated to `/land-trips`
- [ ] Page layout matches design system (Playfair Display headings, earth tones, ample whitespace)

