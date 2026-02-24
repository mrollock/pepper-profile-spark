

# Hero Copy, Signature Blend, and Extended Profile Upsell

## 1. Hero Section -- Replace the paragraph

In `src/components/sections/HeroSection.tsx`, replace the single long paragraph (lines 31-36) with three new paragraphs using the exact copy from the prompt. Each paragraph gets its own `RevealSection` wrapper with staggered delays (100, 150, 200). Typographic characters (curly quotes, em dashes, trademark symbol) will be used throughout. The h1, tagline, and CTA buttons remain untouched.

## 2. Quiz Results -- Add "Your Signature Blend" section

In `src/components/sections/QuizSection.tsx`, add a new block after the Chronic Fire display (after line ~447) and before the CTAs.

### Blend logic (computed inline in the results render):
- **Anchors**: conditions scoring 21 or above
- **Thin conditions**: conditions scoring 12 or below
- **Fire-to-condition mapping**: Use the exact copy strings from the prompt, selected based on the user's primary fire type letter and which conditions are thin. If no mapping matches, use the general fallback text.
- **Closing line** (static): "This is your recipe as it stands today. Not a grade. Not a diagnosis. A starting point -- and a reminder that you're already cooking."

### Styling:
- Heading uses the serif font (font-display class)
- Anchor conditions shown with gold accent text
- Thin conditions shown with muted tone
- Same dark/warm aesthetic as surrounding results

## 3. Post-Quiz Upsell -- "Go Deeper" Extended Profile

### Database changes (migration):
Add two columns to `quiz_submissions`:
- `extended_profile_purchased` (boolean, default false)
- `extended_profile_purchased_at` (timestamptz, nullable)

### UI changes in QuizSection.tsx results:
- Move "Print My Results" button to appear right after the Signature Blend section
- Replace "Want to Go Deeper?" link-to-book with a full upsell block containing:
  - Heading: "Want to Go Deeper?"
  - Body copy (exact text from prompt about the Extended Pepper Sauce Profile)
  - Price display: "$29 -- one-time"
  - CTA button: "Get My Extended Profile" -- since no payment integration is ready, this shows a confirmation form. The user's email is already captured, so it displays their email and a confirm button. On click, it updates the user's quiz_submissions row (matched by email) setting `extended_profile_purchased = true` and `extended_profile_purchased_at = now()`, then shows a confirmation message: "We'll send your Extended Profile questions within 24 hours. Your personalized report arrives within 48 hours of completion."
  - Legal disclaimer in small muted text (exact copy from prompt)
- Remove the old closing paragraph ("What you just shared is your recipe...") since the Signature Blend closing line and legal disclaimer now cover it

### Results flow (top to bottom):
1. Five Conditions bar scores with interpretations (existing)
2. Primary Fire Type (existing)
3. Chronic Fire Type if different (existing)
4. Your Signature Blend (new)
5. Print My Results button (repositioned)
6. Want to Go Deeper? upsell (new)
7. Legal disclaimer (new)

## Technical Details

### Files modified:
- `src/components/sections/HeroSection.tsx` -- replace paragraph block
- `src/components/sections/QuizSection.tsx` -- add Signature Blend section, restructure CTAs, add upsell block with purchase flow
- New migration SQL -- add `extended_profile_purchased` and `extended_profile_purchased_at` columns to `quiz_submissions`, plus an RLS policy allowing anonymous UPDATE on those two columns only (matched by email)

### RLS for update:
A new policy on `quiz_submissions` allows anonymous UPDATE but only on the `extended_profile_purchased` and `extended_profile_purchased_at` columns. This is handled via a Postgres function + trigger that restricts which columns can change, or alternatively by using a separate `extended_profile_purchases` table with insert-only RLS (safer approach). The safer approach will be used: create a new `extended_profile_purchases` table with columns (id, email, purchased_at) and an insert-only anon policy, avoiding any UPDATE on quiz_submissions.

### No changes to:
- Quiz flow, scoring logic, copy in other sections
- Framework, conditions cards, book, footer, or any other section
- Existing Supabase submission logic

