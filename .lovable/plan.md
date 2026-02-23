

# The Pepper Sauce Principle™ — Production-Grade React Website

## Overview
Convert the complete single-page HTML site into a polished, component-based React application using the existing project's tooling (Tailwind, Radix UI, React Router). Every word of copy preserved exactly. All quiz logic replicated identically. Design elevated with smooth animations, responsive polish, and professional interactions.

## Design System Setup
- Custom Tailwind theme matching the exact color palette: golds (#C8962E, #E0AD3A, #F2E2BE), creams (#FAF4E8, #F0E8D6), darks (#0E0C07, #171309), ember (#B8451A), sage (#5A6B42)
- Google Fonts: Playfair Display, Libre Franklin, Cormorant Garamond loaded via index.html
- CSS custom properties for section padding, nav height, content max-widths
- Dark/cream/soft section rhythm preserved with utility classes
- Subtle grain texture overlay on dark sections

## Navigation
- Fixed navbar that transitions from transparent (over hero) to cream background on scroll
- Desktop: brand name + section links + gold "Take the Quiz" CTA button
- Mobile (≤900px): hamburger menu opening a fullscreen dark overlay with large Playfair Display links
- Smooth scroll to anchored sections with proper offset for fixed nav

## Page Sections (Single Page, All Content Preserved Verbatim)

1. **Hero** — Full-viewport dark section with radial gradient accents, headline with gold accent, lead paragraph, tagline, and two CTA buttons (quiz + framework)

2. **Pepper Sauce Profile (Quiz)** — Full interactive 33-item assessment (detailed below)

3. **Framework Introduction** — Cream section with the full "What If the Pain Isn't the Problem?" narrative, two pullquotes with gold left-border styling

4. **The Five Conditions** — Soft cream section with 5 condition cards in a responsive grid (2-column on desktop, centered last card), each with gold left-accent bar, number, name, definition, and description

5. **The Dinner Table Exercise** — Dark section with centered intervention text, the two questions displayed large in Playfair Display

6. **Three Generations** — Dark section with three generation cards (Captain Peace, Dr. Rollock, Zoë), each with gold left-border and italic role labels

7. **Speaking** — Dark section with format tags grid (Keynotes, Grand Rounds, Workshops, etc.) and inquiry CTA

8. **The Book** — Cream section with book notification email signup form (client-side only, shows thank-you message on submit)

9. **Resources** — Soft cream section with resource items list showing free/coming-soon badges

10. **About** — Cream section with Dr. Rollock's bio

11. **Connect** — Dark section with contact form (name, email, message — client-side only, shows thank-you on submit)

12. **Footer** — Dark footer with tagline, credentials, copyright, and links

## Quiz Engine (Exact Logic Preservation)

- **State management**: React useState, all in-memory (no localStorage/sessionStorage)
- **5 phases**: Landing → Quiz (28 Likert items) → Fire Intro → Fire (5 multiple-choice) → Results
- **Landing**: Name + email form with validation, "Start My Profile" button
- **Likert items**: 6-point scale (Strongly Disagree → Strongly Agree), auto-advance on selection with 300ms delay, back button, progress bar showing "Part I · Item X of 28"
- **Scoring**: Standard items scored 1-6; reverse-scored items (id 4, 14) scored as 7 minus raw; condition scores summed per condition (5 items each = max 30)
- **Safety gates**: Items 6, 17, 24 (scoville type) — if any answered ≥5, trigger safety message with 988 crisis line in results
- **Fire Type section**: 5 multiple-choice questions (items 29-33), each with 5 options (A-E: Personal, Relational, Communal, Ancestral, Growth fire)
- **Primary fire**: Mode of items 29-32; **Chronic fire**: Item 33 standalone
- **Results page**: Personalized header with user's name, safety gate message if triggered, 5 condition score bars with color fills and interpretive text, primary fire type card, chronic fire type card (with comparison note if different), print button and "Go Deeper" CTA

## Scroll Animations & Polish
- Intersection Observer-based reveal animations (fade up) on sections and cards with staggered delays
- Quiz item fade-in animation on each question transition
- Progress bar smooth width transitions
- Hover effects on condition cards (lift + shadow), resource items (slide right), buttons (lift + glow)
- `prefers-reduced-motion` media query disabling all animations
- Smooth scroll behavior with nav-height offset

## Accessibility
- Skip-to-content link
- ARIA labels on nav, quiz region, radio groups, form inputs
- `role="radiogroup"` and `role="radio"` with `aria-checked` on Likert and fire choice elements
- Keyboard navigation (Enter/Space to select quiz options, Tab through interactive elements)
- Visible focus styles (gold outline with offset)
- Print styles hiding nav and adjusting dark sections

## Responsive Breakpoints
- Desktop (>900px): Full nav, 2-column condition grid, spacious section padding
- Tablet (768-900px): Hamburger nav, 2-column grid maintained
- Mobile (<768px): Single-column layouts, adjusted typography scales (clamp values), 3-column Likert on narrow screens (<500px), full-width fire choices

## Forms (Client-Side Only)
- Book notification form: email input → hide form, show thank-you message
- Connect form: name, email, message inputs → hide form, show thank-you message
- Quiz email form: name + email with basic validation (required, email includes @)
- All form submissions are visual-only with graceful confirmation messages

