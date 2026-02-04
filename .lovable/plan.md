

# Update Website with Real Trip Data

This plan replaces placeholder trip data with actual trips from the iTravelWithMiki website and updates navigation categories to match the real site structure.

---

## Overview of Changes

| Area | Current | Updated |
|------|---------|---------|
| **Trip Type** | Extended interface | Add `bookingUrl`, `subheading`, `operator`, `soldOut` fields |
| **Categories** | 4 categories (All, Bus, Cruises, International) | 6 categories (All, Land Trips, River Cruises, Ocean Cruises, Bus Trips, Travel Insurance) |
| **Trip Count** | 14 placeholder trips | 40 real trips from JSON data |
| **Navigation** | Generic dropdown | Updated to match real site categories |

---

## Phase 1: Update Trip Type Definition

**File:** `src/types/trip.ts`

Add new fields to support the real data:
- `bookingUrl` - External TravelJoy or website booking link
- `subheading` - Tour operator or trip description (e.g., "Grand Circle", "March 22-28, 2026")
- `operator` - Tour operator name (Grand Circle, Gate 1, Diamond Tours)
- `soldOut` - Boolean to indicate if trip is sold out/waitlist only
- Update category type to include: `'land' | 'river-cruise' | 'ocean-cruise' | 'bus'`

---

## Phase 2: Update Trip Categories

**File:** `src/data/trips.ts`

Update `tripCategories` array:

| ID | Label |
|----|-------|
| `all` | All Trips |
| `land` | Land Trips |
| `river-cruise` | River Cruises |
| `ocean-cruise` | Ocean Cruises |
| `bus` | Bus Trips |

---

## Phase 3: Populate Real Trip Data

**File:** `src/data/trips.ts`

Replace all placeholder trips with 40 real trips from the JSON:

**Land Trips (8 trips):**
1. Romantic Villages of Alpine Europe - $6,095 (Oct 10-25, 2026) - SOLD OUT
2. Ireland in Depth 2027 - $5,695 (Mar 27-Apr 10, 2027)
3. Australia & New Zealand 2027 - $7,915 (Aug 26-Sep 13, 2027)
4. Our Private Italy 2026 - $5,284 (May 6-16, 2026) - SOLD OUT
5. Spain & Portugal in Depth - $4,575 (Feb 20-Mar 6, 2026) - SOLD OUT

**River Cruises (3 trips):**
1. The Great Rivers of Europe - $7,095 (Aug 15-30, 2026)
2. Christmas Markets Along the Rhine - $5,085 (Nov 24-Dec 5, 2026)
3. Holland & Belgium in the Springtime - $4,325 (Mar 28-Apr 8, 2026) - SOLD OUT

**Bus Trips (29 trips):**
All Diamond Tours motorcoach trips including:
- Savannah, Jekyll Island & Beaufort - $1,115 (Mar 22-28, 2026)
- Washington, DC - $1,133 (Apr 9-15, 2026)
- New Orleans - $825 (Apr 20-24, 2026)
- Grand Canyon, Las Vegas & Hoover Dam - $1,599 (Apr 17-26, 2026)
- Multiple Mackinac Island dates
- Niagara Falls - $1,437 (Jun 6-14, 2026)
- New York City & Statue of Liberty - $1,523 (Jun 3-11, 2026)
- Christmas in New York City - $2,255 (Nov 15-22, 2026)
- And 20+ more trips...

---

## Phase 4: Update Navigation

**File:** `src/components/Navbar.tsx`

Update `tripCategories` array with new structure:

```text
Current:
- All Trips → /trips
- Bus Tours → /trips?category=bus
- Cruises → /trips?category=land
- International → /trips?category=international

Updated:
- All Trips → /trips
- Land Trips → /trips?category=land
- River Cruises → /trips?category=river-cruise
- Ocean Cruises → /trips?category=ocean-cruise
- Bus Trips → /trips?category=bus
```

---

## Phase 5: Update Trips Page Filter

**File:** `src/pages/Trips.tsx`

The trips page already uses `tripCategories` from the data file, so it will automatically update when we change that file.

---

## Phase 6: Update TripCard Component

**File:** `src/components/TripCard.tsx`

Enhancements:
1. Add "SOLD OUT" badge styling for unavailable trips
2. Update "Book Now" button to link to `bookingUrl` (external booking page)
3. Display operator/subheading information
4. Disable booking button for sold out trips

---

## Phase 7: Update Featured Trips Section

**File:** `src/components/FeaturedTrips.tsx`

Replace placeholder data with curated selection of real featured trips:
1. Christmas in New York City - $2,255 (popular seasonal trip)
2. New Orleans - $825 (affordable option)
3. Australia & New Zealand 2027 - $7,915 (premium international)
4. The Great Rivers of Europe - $7,095 (river cruise highlight)

---

## Phase 8: Add Travel Insurance Page Link

**File:** `src/components/Navbar.tsx`

Add Travel Insurance link to navigation that points to the Support page insurance section or a dedicated insurance page.

---

## Technical Implementation Details

### Trip Data Structure Example

```text
{
  id: 'savannah-2026',
  name: 'Savannah, Jekyll Island, & Beaufort, SC',
  destination: 'Savannah, GA',
  images: [Unsplash images for Savannah],
  price: 1115,
  departureDate: 'March 22-28, 2026',
  category: 'bus',
  featured: false,
  bookingUrl: 'https://traveljoy.com/bookings/iQnzR47zvmeg1fyzDHExz7EY',
  subheading: 'Diamond Tours',
  soldOut: false
}
```

### Image Strategy

Since the JSON doesn't include images, we'll use high-quality Unsplash images matched to each destination:
- Savannah: Historic squares, Spanish moss
- Washington DC: Capitol building, monuments
- New Orleans: French Quarter, jazz scenes
- Mackinac Island: Victorian architecture, Grand Hotel
- Alpine Europe: Swiss Alps, charming villages
- And appropriate images for each destination...

---

## Files to Modify

1. **`src/types/trip.ts`** - Add new interface fields
2. **`src/data/trips.ts`** - Complete rewrite with 40 real trips
3. **`src/components/Navbar.tsx`** - Update navigation categories
4. **`src/components/TripCard.tsx`** - Add sold out badge, external booking links
5. **`src/components/FeaturedTrips.tsx`** - Update with real featured selection
6. **`.lovable/plan.md`** - Update development reference

---

## Validation Checklist

After implementation:
- [ ] All 40 trips display on /trips page
- [ ] Filter buttons work correctly for each category
- [ ] "Book Now" buttons link to correct TravelJoy URLs
- [ ] Sold out trips show appropriate badge and disabled state
- [ ] Featured trips section shows curated selection
- [ ] Navigation dropdown shows all new categories
- [ ] Prices display correctly with USD formatting

