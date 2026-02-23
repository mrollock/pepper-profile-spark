

# Place Bajan Pepper Sauce Image in the Framework Section

## Why the Framework Section

The Framework section ("What If the Pain Isn't the Problem?") is where the copy explicitly walks through making Bajan pepper sauce: "You take a Scotch bonnet pepper... you add mustard. Vinegar. Turmeric. Garlic. You blend it. You bottle it." Placing the image here anchors the metaphor in something real and tangible. It creates a moment where the reader sees exactly what the words describe.

## Layout

- **Desktop (>768px)**: Split the opening content into a two-column layout. The pepper sauce image on the left (~40% width), the first two paragraphs + first blockquote on the right (~60% width). The remaining paragraphs and second blockquote continue below in full-width, single-column layout as they do now.
- **Mobile**: Image stacks above the opening text at full width with rounded corners, then the rest flows normally below.
- The image gets a subtle rounded corner treatment and a soft shadow to feel integrated with the cream background. An optional thin gold border or gold shadow accent to tie it into the palette.

## Technical Steps

1. Copy the uploaded image to `src/assets/Bajan-Pepper-Sauce.jpg`
2. Update `FrameworkSection.tsx`:
   - Import the image as an ES6 module
   - Wrap the opening content (section label, h2, divider, first two paragraphs, first blockquote) in a responsive grid/flex container
   - Left column: the image with `rounded-lg`, shadow, and `object-cover`
   - Right column: the existing text content
   - Remaining content stays full-width below
3. Add `alt="A bottle of golden Bajan pepper sauce with a small dish of sauce beside it"` for accessibility
4. Use lazy loading (`loading="lazy"`) since the image is below the fold

## Visual Treatment

- Rounded corners (rounded-lg)
- Subtle shadow (shadow-lg) on cream background
- Image constrained to a reasonable max height (~400px) so it doesn't dominate
- Reveal animation matching the surrounding content (fade up)
