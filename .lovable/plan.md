

# Plan: Validation Lead-In Above Hero Headline

**File: `src/components/sections/HeroSection.tsx`**

Insert four new `RevealSection` blocks **above** the existing `<h1>` (line 20-26), shifting all existing delay values to accommodate the new content. Nothing below the h1 changes in content -- only delay values shift.

---

## New content blocks (inserted between the opening `<div>` on line 19 and the existing h1)

### Block 1 — Opening validation (delay={0})
```
If pain has ever felt like your punishment…
you're not the only one.
```
- Two lines displayed with a `<br />` after the ellipsis
- Styled with `font-accent italic` (Cormorant Garamond), sized between body and h1: `text-[clamp(1.2rem,2.8vw,1.5rem)]`
- Color: `text-gold-pale` (warm cream/gold tone)

### Block 2 — Three metaphors (delay={100})
```
It can feel like a thief in your own house. A bill for something you didn't order. A current pulling beneath a surface that looks perfectly still.
```
- Body text styling: same sans-serif, `text-cream-mid`, same size/leading as existing body paragraphs
- Flowing prose, one continuous `<p>`

### Block 3 — Gathering line (delay={150})
```
In short, it feels like punishment. Of course it does.
```
- Same body text styling as Block 2

### Block 4 — Pivot/transition (delay={200})
```
So it may surprise you to hear this:
```
- Extra top margin (`mt-4`) for visual pause
- Color: `text-gold-muted` for subtle differentiation
- Slightly smaller or same size, signaling the shift before the declaration

### Existing h1 — delay shifts from 0 to 275

### All subsequent blocks — delays shift by +275ms each:
| Content | Old delay | New delay |
|---|---|---|
| h1 headline | (none/0) | 275 |
| "What determines..." | 100 | 375 |
| "Pain is the pepper..." | 150 | 425 |
| "Nobody eats a raw pepper..." | 200 | 475 |
| "Whether you're carrying..." | 250 | 525 |
| Empathic aside | 275 | 550 |
| Pepper Sauce Profile | 300 | 575 |
| Tagline | 350 | 625 |
| CTAs | 400 | 675 |

---

## What will NOT change

- All content below the h1 remains word-for-word identical
- No new fonts, libraries, or dependencies
- No changes to background gradients, layout structure, or other sections
- All existing responsive behavior preserved
- No other files modified

