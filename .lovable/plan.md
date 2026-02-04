# iTravelWithMiki Development Reference

This document tracks the comprehensive update plan and serves as a reference for future development.

---

## Completed Tasks ✅

| Category | Status |
|----------|--------|
| Brand Assets | ✅ Added 6 logo files + Miki photo |
| Text Corrections | ✅ All "Mickey" → "Miki" |
| Support Page | ✅ Created with FAQs |
| Trips Page | ✅ Created with filters |
| Routing | ✅ Added `/support` and `/trips` routes |
| Hero Logo | ✅ Shows original brand colors |

---

## Logo Usage Guide

| Location | Logo File | Filter Applied |
|----------|-----------|----------------|
| Navbar (transparent) | `wordmark-logo.png` | `brightness-0 invert` (white) |
| Navbar (scrolled) | `wordmark-logo.png` | None (original colors) |
| Hero Section | `stacked-logo.png` | None (original colors) |
| Footer | `submark-logo.png` | `brightness-0 invert` (white) |

---

## File Structure

### Assets
```
src/assets/
├── logos/
│   ├── primary-logo.png
│   ├── secondary-logo.png
│   ├── stacked-logo.png
│   ├── submark-logo.png
│   ├── wordmark-logo.png
│   └── icon-logo.png
└── miki-photo.jpeg
```

### Data Files
```
src/data/
├── trips.ts     # All trip destinations
└── faqs.ts      # FAQ categories and content
```

### Pages
```
src/pages/
├── Index.tsx    # Home page
├── Trips.tsx    # All trips with filtering
├── Support.tsx  # FAQs and resources
└── NotFound.tsx # 404 page
```

---

## Key Components

| Component | Purpose |
|-----------|---------|
| `AboutMiki.tsx` | "Meet Your Guide" section |
| `HeroSection.tsx` | Video hero with stacked logo |
| `FeaturedTrips.tsx` | Homepage trip cards |
| `TripCard.tsx` | Reusable trip card |
| `Navbar.tsx` | Navigation with wordmark logo |
| `Footer.tsx` | Footer with submark logo |

---

## Brand Details

- **Name**: Miki (not Mickey)
- **Business**: iTravelWithMiki
- **Location**: P.O. Box 13993, Little Rock, AR 72113
- **Phone**: (501) 951-1749
- **Email**: info@itravelwithmiki.com

---

## Remaining Tasks

- [ ] Upload downloadable PDFs (insurance plans, packing checklist)
- [ ] Connect email signup to backend
- [ ] Add trip detail pages
- [ ] Replace remaining placeholder images with real destinations
