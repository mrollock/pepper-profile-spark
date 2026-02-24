

# Replace "The Dinner Table Exercise" with "The Recipe Check-In"

## Overview
Replace the content inside the `InterventionSection` component while preserving the section wrapper, its classes, `id="intervention"`, and the existing dark-section styling/layout patterns.

## Changes

### File: `src/components/sections/InterventionSection.tsx`

Replace all content inside the `<RevealSection>` wrapper with:

1. **Label**: "Start Tonight" (unchanged)
2. **Heading**: "The Recipe Check-In" (replaces "The Dinner Table Exercise")
3. **Gold divider bar** (unchanged)
4. **Intro paragraph**: "Pick one person. It doesn't have to be at dinner -- it can be a phone call, a walk, a text thread. Ask them two things:"
5. **Two styled prompts** (using the same `font-display` quote block styling as the current intervention text):
   - "What pepper are you carrying right now that nobody's asked you about?"
   - "What's one ingredient keeping you going that you haven't said out loud?"
6. **Closing copy**: "Then just listen. Don't fix. Don't match it with your own. Let the burn and the flavor sit on the table at the same time -- because that's the whole principle in one conversation. And when they're done: *'The pepper is real. Tell me more.'*"
7. **Second closing line**: "Then switch. Your turn."
8. **CTA link/button**: "What's in YOUR recipe? Take the Free Pepper Sauce Profile" -- styled as a gold-toned link/button that scrolls to the `#quiz` section

### No other files modified.
All copy will be used exactly as provided -- no rewrites.

