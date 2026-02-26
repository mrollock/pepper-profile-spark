

# Hero Section Revision

## Summary

Strip the hero from 12 sequential RevealSection blocks down to 5 focused elements. The throughline ("Pain is not a punishment. It's an ingredient.") moves to the top as the H1, a single lead paragraph replaces nine prose blocks, and the CTA copy updates. No other files change.

## Exact Changes — `src/components/sections/HeroSection.tsx`

Replace everything inside `<div className="relative z-[1] max-w-[800px]">` with:

```
1. Eyebrow          — "A Framework by Dr. Michael J.D. Rollock"
2. H1 Throughline   — "Pain is not a punishment. / It's an ingredient."
3. Lead Paragraph   — Validation + promise + cultural signal (single block)
4. Tagline          — "Life is painful. Make it delicious."
5. CTA Row          — "Discover What's in Your Bottle" + "Explore the Framework"
```

### Element details

| # | Element | RevealSection delay | Key styling notes |
|---|---------|-------------------|-------------------|
| 1 | Eyebrow | 0 (default) | `font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted mb-8` |
| 2 | H1 | 100 | Existing h1 classes + `text-cream`; "punishment." in `<span className="text-gold-light">` ; `<br />` between sentences |
| 3 | Lead | 200 | `mx-auto max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid mt-8 mb-6`; "The Pepper Sauce Principle™" set off as `font-semibold text-gold-pale` |
| 4 | Tagline | 325 | `font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light mb-10` — no quotation marks |
| 5 | CTAs | 425 | Primary: "Discover What's in Your Bottle" → `#quiz` (gold filled); Secondary: "Explore the Framework" → `#framework` (outline) — same button styles as current |

## What stays untouched

- Outer `<section>` element (id, className, inline padding style)
- Radial gradient overlay `<div>`
- `RevealSection` and `useScrollReveal` components/hooks
- All other sections and files

## What is removed (12 blocks → 5)

All intermediate prose blocks are deleted from the hero. None of that content is added elsewhere — it already exists in FrameworkSection, QuizSection, ConditionsSection, and InterventionSection.

