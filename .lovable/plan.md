

# Fix: Quiz Section Crash on Fire Phase

## Problem Found
During end-to-end testing, a runtime error was discovered:

```
TypeError: Cannot read properties of undefined (reading 'id')
```

This crash occurs at `QuizSection.tsx` line ~411 where `fireItems[currentItem]` returns `undefined` because `currentItem` can exceed the `fireItems` array bounds.

## Root Cause
When rapidly clicking through Likert items, the `setTimeout` (300ms) in `handleLikertSelect` can cause a race condition. Multiple timeouts fire, incrementing `currentItem` beyond bounds. When the phase transitions from `fireIntro` to `fire`, if React batches the state updates in an unexpected order, `currentItem` may not yet be reset to 0 when the `fire` phase render occurs.

## Fix

In `src/components/sections/QuizSection.tsx`, add a bounds guard at the top of the `fire` phase block (around line 409-411):

```typescript
if (phase === 'fire') {
  const item = fireItems[currentItem];
  if (!item) {
    // Guard: reset if out of bounds
    setCurrentItem(0);
    return null;
  }
  const selected = responses[item.id] as string | undefined;
  ...
```

Additionally, add the same pattern for the Likert phase to prevent any similar issue:

```typescript
if (phase === 'quiz') {
  const item = likertItems[currentItem];
  if (!item) {
    setCurrentItem(0);
    return null;
  }
  ...
```

## Technical Details

### Files modified:
- `src/components/sections/QuizSection.tsx` -- add bounds guards in both the Likert (`quiz`) and fire phase render blocks to handle out-of-bounds `currentItem` gracefully instead of crashing

### No other changes needed.
