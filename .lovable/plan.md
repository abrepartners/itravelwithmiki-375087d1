

# Admin Header Restructure Plan

## Current Layout
```text
┌──────────────────────────────────────────────────────────────────┐
│  [Logo] | Admin Dashboard                              [Logout]  │
├──────────────────────────────────────────────────────────────────┤
│  [Trip Management] [Gallery Photos] [Insurance Docs]             │
├──────────────────────────────────────────────────────────────────┤
│  (Tab content)                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Proposed Layout
```text
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   [Trips] [Gallery] [Insurance]                [Logout]  │
├──────────────────────────────────────────────────────────────────┤
│  (Tab content)                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Changes to `src/pages/Admin.tsx`

### Header Section (lines 102-118)
1. Remove "| Admin Dashboard" text
2. Move the `TabsList` from line 128 into the header
3. Restructure header as: `Logo` | `Tabs` | `Logout`

### Implementation Details

**Updated Header Structure:**
- Logo stays on the left
- TabsList moves into header, centered or left-aligned after logo
- Logout button remains on the right
- Tabs wrapper (`<Tabs>`) stays at the page level to control content

**Styling Adjustments:**
- TabsList gets inline/horizontal styling suitable for header nav
- Remove `grid` layout from TabsList, use `flex` instead
- Adjust height and spacing to fit header bar aesthetic

### Before vs After

| Element | Before | After |
|---------|--------|-------|
| Logo | Left with "Admin Dashboard" text | Left, standalone |
| Tabs | Below header, grid layout | In header, flex layout |
| Logout | Right side of header | Right side of header (unchanged) |

