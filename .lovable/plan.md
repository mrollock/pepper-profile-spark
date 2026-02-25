

# Plan: Empathic Hero Line + Roots & Research Section

Two changes to implement across five files (one new component file).

---

## Change 1: Empathic Acknowledgment in Hero

**File: `src/components/sections/HeroSection.tsx`**

Insert a new `<RevealSection>` block between the "five evidence-based conditions" paragraph (line 46–52) and the "Pepper Sauce Profile" paragraph (line 54–58):

```
This isn't asking you to be strong or to push through.
It's asking what would happen if you weren't alone in it.
```

- Styled italic, same body text class (`text-cream-mid`), same max-width
- Uses `font-style: italic` to read as a quiet aside

---

## Change 2: New Roots & Research Section

### A. New component file: `src/components/sections/RootsResearchSection.tsx`

Converts the uploaded HTML into a React component with three sub-sections:

1. **The Science** (`id="roots"`) — dark background, 14 peer-reviewed source cards in a 2-column grid
2. **The Voices** (`id="voices"`) — cream/soft background, 10 cultural authority cards in a 2-column grid
3. **The Bookshelf** (`id="bookshelf"`) — dark background, 6 book entries with spine-style left border

All content preserved exactly as provided. Uses `RevealSection` for scroll-triggered animations (replacing the `.reveal` / `.stagger-N` classes from the raw HTML). External links open in new tabs with `rel="noopener noreferrer"`.

### B. CSS additions: `src/index.css`

Add all CSS from the uploaded file's `<style>` block:
- `.roots-intro` — centered intro paragraph
- `.source-grid` / `.source-entry` — 2-column grid for science cards with hover gold border
- `.voice-grid` / `.voice-card` — 2-column grid for voices on cream background
- `.book-entry` / `.book-entry-spine` — horizontal book entries with gold spine
- `.source-link` / `.voice-link` — external link styling with arrow
- `.source-divider` — gradient divider
- `.roots-note` / `.roots-note-dark` — footnote styling
- Responsive breakpoints at 768px and 480px (stack grids to single column)

### C. Page layout: `src/pages/Index.tsx`

Import `RootsResearchSection` and place it after `InterventionSection`, before `SpeakingSection`. The page order becomes:

```text
Hero → Quiz → Framework → Conditions → Intervention → Roots & Research → Speaking → Book → Resources → About → Connect → Footer
```

### D. Navigation: `src/components/Navbar.tsx`

Update the "Resources" nav link from `#resources` to `#roots` so it scrolls to the top of the new Roots & Research section.

---

## What will NOT change

- No existing section content modified (Speaking, Book, Resources, About, etc.)
- No images moved or resized
- Quiz, Five Conditions, Intervention sections untouched
- Color scheme, fonts, design system unchanged
- All Roots & Research copy used exactly as provided in the uploaded file

