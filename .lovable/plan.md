

# Plan: Pepper Sauce Profile v1.0 → v1.2 Update

This is a large, multi-file update touching quiz data, quiz UI, and database schema. All copy is taken verbatim from the prompt — no rewrites.

---

## FILE 1: `src/data/quizData.ts`

### 1A. Revise Item 21 text (line 36)
Replace `"Looking back over the past few years, I can hold more hard things at once than I used to — and it's not because I got tougher. It's because I grew."` with `"Looking back over the past few years, I can make room for more hard things at once than I used to."`

### 1B. Insert new Scoville Gate item 29 (after line 44, before line 46)
Add between item 28 and the first fire-type item:
```
{ id:29, text:"Right now, I am using something — a substance, a habit, a pattern — to numb my pain in ways I know are doing damage.", condition:0, type:"likert", scoring:"scoville" },
```

### 1C. Renumber fire-type items 29→30, 30→31, 31→32, 32→33, 33→34
All five fire-type item `id` values shift by +1.

### 1D. Rotate fire-type option display order
- Item 30 (was 29): keep A, B, C, D, E
- Item 31 (was 30): reorder to C, D, E, A, B
- Item 32 (was 31): reorder to E, A, B, C, D
- Item 33 (was 32): reorder to B, C, D, E, A
- Item 34 (was 33, chronic): keep A, B, C, D, E

### 1E. Update `getConditionLabel` (line 132-142)
Add `if (item.id === 29) return CONDITION_NAMES[5];` alongside the existing id checks for 6, 17, 24.

### 1F. Update `getPrimaryFireType` (line 157)
Change `[29, 30, 31, 32]` to `[30, 31, 32, 33]`.

### 1G. Update `getChronicFireType` (line 171)
Change `responses[33]` to `responses[34]`.

---

## FILE 2: `src/components/sections/QuizSection.tsx`

### 2A. Update Scoville gate detection (line 168)
Change `[6, 17, 24]` to `[6, 17, 24, 29]`.

### 2B. Replace Supabase submission (lines 170-187)
Remove old single-table insert with item loop. Replace with two-table de-identified pattern:
- **Table 1** (`quiz_submissions`): identified profile with scores, fire types, gate booleans (`gate_overwhelm`, `gate_safety`, `gate_burdensomeness`, `gate_numbing`) — NO raw item responses.
- **Table 2** (`anonymous_responses`): de-identified raw responses for items 1–34, NO email or user link.

### 2C. Update item count (line 294)
Change `"33 items"` to `"34 items"`.

### 2D. Add privacy statement (after line 291, before item count)
Insert paragraph: `"Your individual responses are not reviewed, shared, or stored in identifiable form. Only your recipe results are saved."`

### 2E. Replace Scoville Gate results block (lines 524-538)
Replace the generic block with modular per-gate responses:
- Shared intro paragraph
- Multi-gate message (when 2+ gates trigger)
- Gate 6 (overwhelm): 988 Lifeline
- Gate 17 (safety): National DV Hotline + 911
- Gate 24 (burdensomeness): 988 Lifeline with "not better off without you"
- Gate 29 (numbing): SAMHSA Helpline 1-800-662-4357
- Shared closing paragraph

### 2F. Add educational-purpose framing (after line 522, before Scoville Gate)
Insert paragraph explaining the profile shows broad patterns, not clinical assessment.

### 2G. Expand FIRE_CONDITION_MAP (lines 22-43)
Add new mappings: C→2 (agency under systemic pain), C→5 (existing), D→4 (capacity for inherited pain), E→5 (generativity for growth fire). Full replacement of the map object with all entries from the prompt.

---

## FILE 3: Database Migration

### 3A. Create `anonymous_responses` table
- Columns: `id` (uuid PK), `completed_at` (timestamptz), `item_1`–`item_29` (smallint), `item_30`–`item_34` (text)
- RLS: insert-only (anonymous), select blocked (service-role only)

### 3B. Add gate boolean columns to `quiz_submissions`
- `gate_overwhelm`, `gate_safety`, `gate_burdensomeness`, `gate_numbing` (all boolean, default false)

### 3C. Drop item-level columns from `quiz_submissions`
- Remove `item_1` through `item_33` and any related constraints

---

## Technical Details

- The types file (`src/integrations/supabase/types.ts`) auto-regenerates after migration — no manual edit needed.
- The `as any` casts on insert calls handle the type gap until regeneration.
- Both inserts are fire-and-forget (non-blocking) consistent with existing pattern.
- No new dependencies, no new files beyond the migration.
- Results page order: heading → educational framing → scoville gate (if triggered) → five conditions → primary fire → chronic fire → signature blend → print → upsell → legal.

