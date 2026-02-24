

# Fix: Quiz Race Condition Causing Reset

## Problem
The bounds guard correctly prevents the crash but causes the quiz to reset to item 1. The root cause is that `handleLikertSelect` captures `currentItem` in a closure inside `setTimeout(300ms)`. When a user clicks an option while the previous timeout is still pending, two timeouts fire and both call `setCurrentItem(prev => prev + 1)`, pushing `currentItem` past bounds. The guard then resets to 0.

## Fix

In `src/components/sections/QuizSection.tsx`:

1. Add an `isTransitioning` ref to debounce rapid clicks:
```typescript
const isTransitioning = useRef(false);
```

2. In `handleLikertSelect`, guard against double-fires:
```typescript
const handleLikertSelect = (itemId: number, value: number, scoring?: string) => {
  if (isTransitioning.current) return;  // <-- prevent double click
  setResponses(prev => ({ ...prev, [itemId]: value }));
  if (scoring === 'scoville' && value >= 5) {
    setScovilleTriggered(true);
  }
  isTransitioning.current = true;  // <-- lock
  setTimeout(() => {
    if (currentItem + 1 >= likertItems.length) {
      setPhase('fireIntro');
    } else {
      setCurrentItem(prev => prev + 1);
    }
    isTransitioning.current = false;  // <-- unlock
    scrollToQuiz();
  }, 300);
};
```

3. Apply the same pattern to `handleFireSelect`:
```typescript
const handleFireSelect = (itemId: number, value: string) => {
  if (isTransitioning.current) return;
  setResponses(prev => ({ ...prev, [itemId]: value }));
  isTransitioning.current = true;
  setTimeout(() => {
    if (currentItem + 1 >= fireItems.length) {
      setPhase('results');
    } else {
      setCurrentItem(prev => prev + 1);
    }
    isTransitioning.current = false;
    scrollToQuiz();
  }, 350);
};
```

4. Keep the existing bounds guards as a safety net (they no longer trigger but provide defense in depth).

### Files modified:
- `src/components/sections/QuizSection.tsx` -- add `isTransitioning` ref and guards in both handler functions
