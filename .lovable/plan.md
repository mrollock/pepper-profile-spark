

# Supabase Integration for Form Submissions & Quiz Data

## Overview
Connect Supabase to capture quiz completions, book signups, and contact form submissions. All data is inserted silently in the background with no changes to UI, copy, or quiz logic.

## Step 1: Connect Supabase
Enable Supabase on the project and initialize the client.

## Step 2: Database Tables & RLS

Create three tables via migration:

**quiz_submissions** -- 33 item columns (item_1 through item_28 as smallint, item_29 through item_33 as text), 5 computed score columns, fire type columns, scoville gate fields, plus name/email/timestamps.

**book_signups** -- email, source (default 'book_notification'), timestamps.

**contact_submissions** -- name, email, message, timestamps.

RLS policies on all three tables: allow anonymous INSERT only. No SELECT, UPDATE, or DELETE from client -- data is only readable via the Supabase dashboard.

## Step 3: Create Supabase Client
Add `src/integrations/supabase/client.ts` with the project's anon key.

## Step 4: Wire Up Submissions

### QuizSection.tsx
- When the results phase renders, fire an async insert to `quiz_submissions` with:
  - name, email
  - All 33 raw item responses (item_1 through item_33)
  - 5 computed condition scores (applying reverse scoring on items 4, 14 before summing)
  - primary_fire_type (e.g. "Personal" or "Personal . Relational")
  - chronic_fire_type
  - scoville_gate_triggered boolean
  - scoville_items_flagged array (which of items 6, 17, 24 had raw value >= 5)
- Use a `useRef` flag to prevent duplicate submissions on re-renders
- Fire-and-forget: catch errors silently, never block UI

### BookSection.tsx
- After validation passes and before showing the thank-you message, fire an async insert to `book_signups` with email and source='book_notification'
- Silent failure

### ConnectSection.tsx
- After validation passes and before showing the thank-you message, fire an async insert to `contact_submissions` with name, email, message
- Silent failure

## Technical Details

- No changes to any copy, quiz flow, scoring logic, or UI behavior
- All inserts are async/non-blocking with `.catch(() => {})` 
- Raw values stored for all items (reverse scoring only applied when computing condition scores)
- The `scoville_items_flagged` column uses Postgres `text[]` array type
- Quiz submission happens once via `useEffect` + `useRef` guard when phase becomes 'results'

