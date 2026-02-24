

# PSP Website Updates — February 2026

Five changes across six files, plus removing one component from the page layout.

---

## 1. Hero Section — Replace body copy
**File: `src/components/sections/HeroSection.tsx`**

Replace the three `<RevealSection>` body paragraphs (lines 28–44) with five new blocks:

1. **Line 1** (body text): "What determines whether we suffer isn't the pain itself — it's what surrounds it."
2. **Line 2** (pull-quote style — `font-accent`, italic, `text-gold-pale`, slightly larger, with top margin): "Pain is the pepper. The conditions are the sauce."
3. **Line 3** (body text): "Nobody eats a raw pepper and calls it a meal. What turns heat into flavor is the recipe — the surrounding ingredients, the craft, the company at the table."
4. **Line 4** (body text, with `<a href="#conditions">` link on "five evidence-based conditions", styled gold with hover underline): "Whether you're carrying grief, burnout, chronic pain, or generational trauma, The Pepper Sauce Principle™ names five evidence-based conditions you can act on today — not to eliminate the pepper, but to build a life so flavor-full that pain takes its rightful place as one ingredient among many."
5. **Line 5** (body text): "The free Pepper Sauce Profile™ reveals what kind of fire is in your bottle right now, how you relate to the heat, and what's already in your recipe — along with a signature blend of ingredients you can start adding today. Not to neutralize the pepper. To make sure it's not the only thing you taste."

Tagline and CTA buttons remain unchanged.

---

## 2. Framework Section — Two changes
**File: `src/components/sections/FrameworkSection.tsx`**

### A. Replace the heading (line 26)
**Old:** `What If the Pain Isn't the Problem?`
**New:** Mixed-color heading with gold `<span>` wrapping: "**Can** a **life** filled with peppers **still** **be** flavor-**FULL**?"

Gold spans use `text-gold` class (matches eyebrow label gold). Words "Can", "life", "still", "be", and "FULL" get `text-gold` spans. "flavor-" stays default, "FULL" is uppercase in gold.

### B. Hyperlink "Bajan pepper sauce" (line 30)
Wrap the words "Bajan pepper sauce" in an `<a>` tag pointing to `https://barbados.org/barbados-recipes-bajan-pepper-sauce.htm` with `target="_blank" rel="noopener noreferrer"`, styled with gold text and underline on hover.

---

## 3. Remove Generations Section
**File: `src/pages/Index.tsx`**
- Remove the `<GenerationsSection />` from the JSX (line 25) and its import (line 7).

The file `src/components/sections/GenerationsSection.tsx` will be left in place (unused) — no deletion needed for clean build, but the component simply won't render.

---

## 4. About Section — Fix degree
**File: `src/components/sections/AboutSection.tsx`**
- Line 15: Change "BA from Drexel University" → "BSc from Drexel University"

---

## 5. Email Update — `info@imaginativefeedback.com` → `Michael@ifwall.com`
Three files affected:

### `src/components/sections/Footer.tsx`
- Line 15: `mailto:info@imaginativefeedback.com` → `mailto:Michael@ifwall.com`

### `src/components/sections/SpeakingSection.tsx`
- Line 41: `mailto:info@imaginativefeedback.com?subject=...` → `mailto:Michael@ifwall.com?subject=...`
- Line 49: visible text `info@imaginativefeedback.com` → `Michael@ifwall.com`

### `src/components/sections/ConnectSection.tsx`
- Line 75: `mailto:info@imaginativefeedback.com` → `mailto:Michael@ifwall.com`
- Line 76: visible text `info@imaginativefeedback.com` → `Michael@ifwall.com`

---

## What will NOT change
- No images moved/resized (pepper sauce bottle stays)
- Tagline unchanged everywhere
- Five Conditions content/layout untouched
- Pepper Sauce Profile quiz untouched
- Recipe Check-In / Intervention section untouched
- Color scheme, fonts, design system unchanged
- Navigation structure unchanged
- All copy used exactly as provided

