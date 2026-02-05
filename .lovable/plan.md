
# Navigation, Hero Logo & Admin Panel Implementation

This plan adds Travel Insurance to navigation, enlarges the hero logo prominently, and creates a passcode-protected admin section for trip management.

---

## Overview of All Changes

| Area | Description |
|------|-------------|
| **Navigation** | Add "Travel Insurance" link to header navigation |
| **Hero Logo** | Increase size to `h-48 md:h-60 lg:h-80` for prominent display |
| **Header Logo** | Increase size to `h-12 md:h-14` |
| **Footer** | Add small "Admin" link at bottom |
| **Admin Page** | Create passcode-protected admin section for trip management |
| **Routing** | Add `/admin` route |

---

## Phase 1: Update Navigation with Travel Insurance

**File:** `src/components/Navbar.tsx`

Update `navLinks` array to include Travel Insurance:

```text
Current navLinks:
- About Miki → #about
- Support → /support
- Contact → #contact

Updated navLinks:
- About Miki → #about
- Travel Insurance → /support#insurance
- Support → /support
- Contact → #contact
```

**Desktop Layout:**
```text
[Trips ▼] [About Miki]    [LOGO]    [Travel Insurance] [Support] [Contact] [Book a Trip]
```

**Changes:**
- Add Travel Insurance link pointing to `/support#insurance`
- Update slice indices to balance left/right sides
- Increase gap from `gap-6` to `gap-8` for better spacing

---

## Phase 2: Enlarge Hero Logo (Prominent Display)

**File:** `src/components/HeroSection.tsx`

Make the logo significantly more prominent:

**Current (Line 40):**
```tsx
className="h-32 md:h-40 lg:h-48 w-auto"
```

**Updated:**
```tsx
className="h-48 md:h-60 lg:h-80 w-auto"
```

| Breakpoint | Current | Updated | Increase |
|------------|---------|---------|----------|
| Mobile | 128px (h-32) | 192px (h-48) | +50% |
| Tablet | 160px (h-40) | 240px (h-60) | +50% |
| Desktop | 192px (h-48) | 320px (h-80) | +67% |

This creates a truly cinematic, eye-catching logo display that dominates the hero section.

---

## Phase 3: Enlarge Header Logo

**File:** `src/components/Navbar.tsx`

**Current (Line 113):**
```tsx
className={`h-10 md:h-12 w-auto...`}
```

**Updated:**
```tsx
className={`h-12 md:h-14 w-auto...`}
```

---

## Phase 4: Add Admin Link to Footer

**File:** `src/components/Footer.tsx`

Add a subtle "Admin" link in the bottom bar area:

**Current bottom bar links:**
- Privacy Policy
- Terms of Service
- Accessibility

**Updated:**
- Privacy Policy
- Terms of Service
- Accessibility
- Admin (links to `/admin`)

The "Admin" link will be styled subtly to not draw attention but remain accessible.

---

## Phase 5: Create Admin Authentication Context

**File:** `src/contexts/AdminContext.tsx` (New)

Create a simple context to manage admin authentication state:

```text
AdminContext:
- isAuthenticated: boolean
- login(passcode: string): boolean
- logout(): void
- Passcode: "miki" (hardcoded for simple access)
```

This provides a lightweight authentication mechanism without requiring a backend.

---

## Phase 6: Create Admin Login Page

**File:** `src/pages/AdminLogin.tsx` (New)

A simple login page with:
- Passcode input field (password type)
- Submit button
- Error message if passcode is incorrect
- Redirect to admin dashboard on success

**UI Elements:**
```text
┌────────────────────────────────────┐
│                                    │
│       iTravelWithMiki Admin        │
│                                    │
│    ┌──────────────────────────┐    │
│    │ Enter Passcode           │    │
│    └──────────────────────────┘    │
│                                    │
│          [Access Admin]            │
│                                    │
└────────────────────────────────────┘
```

---

## Phase 7: Create Admin Dashboard Page

**File:** `src/pages/Admin.tsx` (New)

Main admin dashboard with trip management features:

**Layout:**
```text
┌──────────────────────────────────────────────────────────────┐
│  Admin Dashboard                               [Logout]       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  + Add New Trip                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Trip List                                                │ │
│  │ ┌─────────────────────────────────────────────────────┐ │ │
│  │ │ Alpine Europe | Oct 10-25, 2026 | land | [Edit]     │ │ │
│  │ ├─────────────────────────────────────────────────────┤ │ │
│  │ │ Ireland 2027 | Mar 27, 2027 | land | [Edit]         │ │ │
│  │ └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Phase 8: Create Trip Form Component

**File:** `src/components/admin/TripForm.tsx` (New)

A form component for adding/editing trips with fields:

| Field | Type | Description |
|-------|------|-------------|
| `name` | Text input | Trip title |
| `destination` | Text input | Location name |
| `departureDate` | Text input | Display date (e.g., "Oct 10-25, 2026") |
| `price` | Number input | Price in USD |
| `discountPrice` | Number input (optional) | Discounted price |
| `category` | Select dropdown | land, river-cruise, ocean-cruise, bus |
| `operator` | Text input | Tour operator name |
| `subheading` | Text input | Brief description/tagline |
| `description` | Textarea | Full description |
| `bookingUrl` | URL input | External booking link |
| `featured` | Checkbox | Show in featured section |
| `soldOut` | Checkbox | Mark as sold out |
| `urgencyMessage` | Text input (optional) | Badge message |
| `images` | URL inputs (array) | Image URLs (up to 3) |

**Form Layout:**
```text
┌─────────────────────────────────────────────────────────────┐
│ Add/Edit Trip                                               │
├─────────────────────────────────────────────────────────────┤
│ Trip Name:        [_______________________]                 │
│ Destination:      [_______________________]                 │
│ Departure Date:   [_______________________]                 │
│ Price ($):        [_______]  Discount: [_______]            │
│                                                             │
│ Category:         [▼ Select category ▼]                     │
│   ○ Land Trips                                              │
│   ○ River Cruises                                           │
│   ○ Ocean Cruises                                           │
│   ○ Bus Trips                                               │
│                                                             │
│ Tour Operator:    [_______________________]                 │
│ Subheading:       [_______________________]                 │
│                                                             │
│ Description:                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Booking URL:      [_______________________]                 │
│                                                             │
│ ☐ Featured Trip    ☐ Sold Out                              │
│                                                             │
│ Urgency Badge:    [_______________________]                 │
│                                                             │
│ Images (URLs):                                              │
│ 1. [_______________________]                                │
│ 2. [_______________________]                                │
│ 3. [_______________________]                                │
│                                                             │
│              [Cancel]  [Save Trip]                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 9: Create Trip Store with localStorage

**File:** `src/stores/tripStore.ts` (New)

A lightweight store using localStorage to persist admin-added trips:

```text
TripStore:
- getTrips(): Trip[]
- addTrip(trip: Trip): void
- updateTrip(id: string, trip: Trip): void
- deleteTrip(id: string): void
- initializeFromDefaults(): void
```

**Data Flow:**
1. On first load, populate localStorage with existing trips from `trips.ts`
2. Admin changes update localStorage
3. All trip displays read from localStorage
4. Provides persistence across browser sessions

---

## Phase 10: Update App.tsx with Admin Route

**File:** `src/App.tsx`

Add the admin route with protection:

```tsx
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { AdminProvider } from "./contexts/AdminContext";

// Wrap app with AdminProvider
// Add routes:
<Route path="/admin" element={<Admin />} />
<Route path="/admin/login" element={<AdminLogin />} />
```

---

## New Files to Create

1. `src/contexts/AdminContext.tsx` - Authentication context
2. `src/pages/Admin.tsx` - Admin dashboard
3. `src/pages/AdminLogin.tsx` - Login page
4. `src/components/admin/TripForm.tsx` - Trip add/edit form
5. `src/components/admin/TripList.tsx` - Admin trip list with edit/delete
6. `src/stores/tripStore.ts` - localStorage-based trip storage

## Files to Modify

1. `src/components/Navbar.tsx` - Add Travel Insurance, enlarge logo
2. `src/components/HeroSection.tsx` - Enlarge hero logo
3. `src/components/Footer.tsx` - Add Admin link
4. `src/App.tsx` - Add admin routes
5. `src/data/trips.ts` - Export for initialization
6. `src/pages/Trips.tsx` - Read from store instead of static data
7. `src/components/FeaturedTrips.tsx` - Read from store

---

## Security Considerations

**Note:** This admin section uses a simple passcode ("miki") stored client-side. This is intentionally lightweight for basic access control. For enhanced security in the future, consider:
- Server-side authentication
- Encrypted passcode storage
- Session timeout
- Rate limiting on login attempts

For now, the simple passcode approach matches the requested functionality while keeping the implementation straightforward.

---

## Admin Features Summary

| Feature | Description |
|---------|-------------|
| **View All Trips** | See complete list of trips with category labels |
| **Add New Trip** | Full form to create new trips |
| **Edit Trip** | Modify any trip details |
| **Delete Trip** | Remove trips from the system |
| **Image URLs** | Add up to 3 image URLs per trip |
| **Category Assignment** | Assign trips to Land, River Cruise, Ocean Cruise, or Bus |
| **Feature Toggle** | Mark trips as featured |
| **Sold Out Toggle** | Mark trips as sold out |
| **Persistence** | All changes saved to localStorage |

---

## Validation Checklist

After implementation:
- [ ] Travel Insurance appears in desktop navigation
- [ ] Travel Insurance appears in mobile menu
- [ ] Hero logo is significantly larger and prominent
- [ ] Header logo is proportionally larger
- [ ] "Admin" link appears in footer
- [ ] Passcode "miki" grants access to admin
- [ ] Admin dashboard shows all trips
- [ ] Can add new trips with all fields
- [ ] Can edit existing trips
- [ ] Can delete trips
- [ ] Category dropdown works correctly
- [ ] Changes persist after page refresh
- [ ] Trips page reflects admin changes
