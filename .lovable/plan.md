

# Content Studio — Build Plan

## Overview
Add a Content Studio tab to the admin panel that uses AI to generate marketing content (Instagram, Facebook, email, SMS, content calendar) for trips. Uses a Supabase Edge Function calling the Lovable AI Gateway.

**Note on model**: The user requested "OpenAI gpt-4.1-mini" — this model isn't available on the Lovable AI Gateway. We'll use `google/gemini-3-flash-preview` (the default, fast and capable) which provides equivalent quality for content generation. No API key needed.

## Files to Create/Update

### 1. `supabase/functions/generate-content/index.ts` — Edge Function
- Accepts POST with `{ tripName, destination, departureDate, category, price, description, flyerUrl, flyerText, contentType }` where `contentType` is one of: `instagram`, `facebook`, `email`, `sms`, `calendar`, or `all`
- Calls Lovable AI Gateway with a travel-marketing system prompt
- For `all`: generates all 5 content types in one call using structured output (tool calling) returning `{ instagram, facebook, email: { subject, body }, sms, calendar }`
- For individual types: returns `{ content: string }` (or `{ subject, body }` for email)
- If `flyerUrl` is provided, includes it in the prompt context (text description, not vision — vision would require multimodal which adds complexity; we'll pass the URL as context)
- If `flyerText` is provided, includes the pasted flyer text directly in the prompt
- CORS headers included; `verify_jwt = false` in config.toml
- Handles 429/402 errors from the gateway

### 2. `src/stores/contentStore.ts` — localStorage Store
- Interface: `ContentItem { id, tripName, destination, contentType, content, subject?, createdAt }`
- Methods: `getItems()`, `addItem()`, `updateItem()`, `deleteItem()`, `clearAll()`
- Follows exact same pattern as `galleryStore`

### 3. `src/components/admin/ContentCard.tsx` — Display Card
- Shows content type as a colored badge (Instagram=pink, Facebook=blue, Email=orange, SMS=green, Calendar=purple)
- Displays the generated text in a readable format
- For email: shows subject line separately
- Actions: Copy to clipboard (with toast), Edit inline (textarea toggle), Delete
- Timestamp display

### 4. `src/components/admin/ContentStudio.tsx` — Main Component
- **Trip Selection**: Dropdown of existing trips from `tripStore` OR manual entry fields (name, destination, date, description)
- **Optional Inputs**: Flyer image URL field, flyer text paste area (textarea)
- **Generate Controls**: "Generate All" button (generates all 5 types at once), or individual type buttons
- **Loading State**: Spinner with "Generating..." text during API call
- **Results Display**: Grid of `ContentCard` components for generated content
- **History Section**: Previously saved content items from `contentStore`, filterable by trip name
- Calls edge function via `supabase.functions.invoke('generate-content', { body: ... })`

### 5. `src/pages/Admin.tsx` — Update
- Import `ContentStudio` and `Pencil` icon from lucide-react
- Add "Content" tab trigger between Trips and Gallery in TabsList
- Add `TabsContent value="content"` rendering `<ContentStudio />`

### 6. `supabase/config.toml` — Update
- Add `[functions.generate-content]` with `verify_jwt = false`

## Technical Details

| File | Action |
|------|--------|
| `supabase/functions/generate-content/index.ts` | Create |
| `src/stores/contentStore.ts` | Create |
| `src/components/admin/ContentCard.tsx` | Create |
| `src/components/admin/ContentStudio.tsx` | Create |
| `src/pages/Admin.tsx` | Update — add Content tab + import |
| `supabase/config.toml` | Update — register function |

- No database tables needed — localStorage matches existing admin pattern
- `LOVABLE_API_KEY` is already configured
- Edge function will be deployed immediately after creation
- Uses `supabase.functions.invoke()` for the API call (non-streaming, since output is structured)

