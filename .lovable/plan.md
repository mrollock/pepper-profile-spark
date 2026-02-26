

# Analytics Tracking for Quiz Completion, Drop-off, and Scoville Gates

## Overview

Add a lightweight analytics system to track how users move through the quiz — where they start, where they drop off, how many complete it, and which Scoville gates trigger most often. All data stored in a new database table with no PII.

## Database Changes

Create a new `quiz_analytics` table:

```sql
CREATE TABLE public.quiz_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,           -- random client-side ID per quiz attempt
  event_type text NOT NULL,           -- 'start', 'item_answer', 'phase_change', 'complete'
  event_data jsonb DEFAULT '{}',      -- flexible payload (item_id, phase, gate info, etc.)
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_analytics ENABLE ROW LEVEL SECURITY;

-- Insert-only, no read/update/delete from client
CREATE POLICY "Allow anonymous insert on quiz_analytics"
  ON public.quiz_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Block anonymous select on quiz_analytics"
  ON public.quiz_analytics FOR SELECT
  USING (false);
```

## Event Design

| Event | `event_type` | `event_data` payload |
|---|---|---|
| User clicks "Start My Profile" | `start` | `{}` |
| User answers a Likert item | `item_answer` | `{ "item_id": 7, "phase": "quiz", "index": 6 }` |
| User enters fire intro | `phase_change` | `{ "phase": "fireIntro" }` |
| User answers a fire item | `item_answer` | `{ "item_id": 30, "phase": "fire", "index": 0 }` |
| User reaches results | `complete` | `{ "gates": ["overwhelm","numbing"], "gate_count": 2, "primary_fire": "A" }` |

- **Session ID**: Generated once via `crypto.randomUUID()` when the component mounts. No PII attached.
- **Drop-off detection**: If a session has a `start` event but no `complete` event, the last `item_answer` reveals the exact drop-off point.

## Code Changes

### `src/components/sections/QuizSection.tsx`

1. **Add session ID state**: `const [sessionId] = useState(() => crypto.randomUUID())`

2. **Create a fire-and-forget tracking helper**:
   ```typescript
   const trackEvent = useCallback((event_type: string, event_data: Record<string, unknown> = {}) => {
     supabase.from('quiz_analytics').insert({
       session_id: sessionId,
       event_type,
       event_data,
     } as any).then(null, () => {});
   }, [sessionId]);
   ```

3. **Instrument existing handlers** (5 insertion points, no UI changes):
   - `handleStart()` → `trackEvent('start')`
   - `handleLikertSelect()` → `trackEvent('item_answer', { item_id, phase: 'quiz', index: currentItem })`
   - Fire intro button click → `trackEvent('phase_change', { phase: 'fireIntro' })`
   - `handleFireSelect()` → `trackEvent('item_answer', { item_id, phase: 'fire', index: currentItem })`
   - Results `useEffect` → `trackEvent('complete', { gates, gate_count, primary_fire })`

## Querying the Data

Once deployed, analytics can be queried directly from the database:

- **Completion rate**: `SELECT COUNT(*) FILTER (WHERE event_type='complete') * 100.0 / COUNT(*) FILTER (WHERE event_type='start') FROM quiz_analytics`
- **Drop-off by item**: Find sessions with `start` but no `complete`, then get their last `item_answer` event
- **Gate frequency**: `SELECT event_data->>'gates', COUNT(*) FROM quiz_analytics WHERE event_type='complete' GROUP BY 1`

## What Does NOT Change

- No UI changes — tracking is invisible to the user
- No PII stored in analytics table (session_id is random, not linked to email/name)
- Existing `quiz_submissions` and `anonymous_responses` tables are untouched
- All inserts are non-blocking (fire-and-forget)

