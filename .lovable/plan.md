

# Complete Feature Enhancement Plan

This plan adds three interconnected features:
1. **Insurance Sub-Dropdowns** - Split navigation into Allianz and Travel Confident
2. **Media/Document Management** - Admin ability to upload/manage photos, videos, and PDFs
3. **Scrolling Photo Gallery** - Infinite-loop image carousel in the footer

---

## Feature 1: Insurance Navigation Sub-Dropdowns

### Navbar Changes

Convert "Travel Insurance" into a dropdown with two providers:

| Provider | Description | Link |
|----------|-------------|------|
| Allianz Insurance | For International Trips | `/support#insurance-allianz` |
| Travel Confident | For Diamond Tours | `/support#insurance-diamond` |

**Files to Update:**
- `src/components/Navbar.tsx` - Add dropdown for insurance options
- `src/pages/Support.tsx` - Add anchor sections for each provider
- `src/data/faqs.ts` - Add insurance provider data

---

## Feature 2: Admin Media Management

### New Admin Tabs

Add tabbed navigation to the Admin dashboard:

| Tab | Purpose |
|-----|---------|
| Trip Management | Existing functionality |
| Gallery Photos | Manage scrolling footer photos |
| Insurance Docs | Manage PDF links for each provider |

### New Files to Create

| File | Purpose |
|------|---------|
| `src/types/gallery.ts` | TypeScript types for gallery images |
| `src/stores/galleryStore.ts` | localStorage-based gallery management |
| `src/components/admin/GalleryManager.tsx` | Add/remove gallery photos |
| `src/components/admin/InsuranceManager.tsx` | Manage insurance PDF links |

### Gallery Image Type

```typescript
interface GalleryImage {
  id: string;
  url: string;           // Image URL (external or uploaded)
  caption?: string;      // Optional caption
  tripName?: string;     // Associated trip name
  createdAt: string;
}
```

### Insurance Document Type

```typescript
interface InsuranceProvider {
  id: 'allianz' | 'diamond';
  name: string;
  subtitle: string;
  description: string;
  pdfUrl: string;        // Admin-editable PDF link
}
```

---

## Feature 3: Scrolling Footer Photo Gallery

### Visual Design

A horizontal strip of photos above the main footer content that scrolls continuously left-to-right:

```text
┌─────────────────────────────────────────────────────────────┐
│  [img] [img] [img] [img] [img] [img] [img] [img] →→→       │
│            ← Continuous infinite scroll loop                │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  FOOTER CONTENT (logo, links, contact, newsletter)         │
└─────────────────────────────────────────────────────────────┘
```

### Technical Implementation

**New Component:** `src/components/FooterGallery.tsx`
- Uses CSS animation for smooth infinite scroll
- Duplicates images to create seamless loop effect
- Pauses on hover for accessibility
- Responsive image sizing

**Animation Keyframes (add to tailwind.config.ts):**

```typescript
keyframes: {
  "scroll-left": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" }
  }
}
```

### Gallery Appearance

- Image height: ~80px on mobile, ~120px on desktop
- Subtle opacity overlay matching footer colors
- Grayscale with color on hover (optional polish)
- Seamless infinite loop animation (~30s per cycle)

---

## Implementation Steps

### Step 1: Create Types and Stores
1. Create `src/types/gallery.ts`
2. Create `src/stores/galleryStore.ts` (following tripStore pattern)
3. Create `src/stores/insuranceStore.ts`

### Step 2: Build Admin Components
1. Create `src/components/admin/GalleryManager.tsx`
2. Create `src/components/admin/InsuranceManager.tsx`
3. Update `src/pages/Admin.tsx` with tab navigation

### Step 3: Footer Gallery Component
1. Create `src/components/FooterGallery.tsx`
2. Add scroll animation keyframes to `tailwind.config.ts`
3. Integrate FooterGallery into `src/components/Footer.tsx`

### Step 4: Insurance Navigation
1. Update `src/components/Navbar.tsx` with insurance dropdown
2. Update `src/data/faqs.ts` with provider data
3. Update `src/pages/Support.tsx` with anchor sections

---

## Admin Dashboard Layout

```text
┌──────────────────────────────────────────────────────────────────┐
│  iTravelWithMiki | Admin Dashboard                    [Logout]   │
├──────────────────────────────────────────────────────────────────┤
│  [Trip Management]  [Gallery Photos]  [Insurance Docs]           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  (Tab content here - trips list, gallery grid, or insurance)    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Gallery Photos Tab

- Grid of current gallery images with delete buttons
- Form to add new image: URL input + optional caption/trip name
- "Add from Trips" quick-add from existing trip images

### Insurance Docs Tab

- Two sections: Allianz and Travel Confident
- Each has: Name, Subtitle, Description, PDF URL input
- Save button to update localStorage

---

## Default Gallery Images

Initialize with sample travel photos so the gallery isn't empty:

```typescript
const defaultGalleryImages = [
  { id: '1', url: 'https://images.unsplash.com/...', caption: 'Ireland 2024' },
  { id: '2', url: 'https://images.unsplash.com/...', caption: 'New York Christmas' },
  // ... more defaults
];
```

---

## Technical Notes

- All data stored in localStorage (consistent with existing tripStore pattern)
- External image URLs supported (Unsplash, etc.)
- No backend required - admin can paste image URLs directly
- Gallery gracefully handles empty state (shows nothing or placeholder)

