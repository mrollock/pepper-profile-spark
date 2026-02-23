import { RevealSection } from '@/components/RevealSection';

export function InterventionSection() {
  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="intervention">
      <div className="mx-auto max-w-[var(--content-max)] text-center">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Start Tonight
          </span>
          <h2 className="text-cream">The Dinner Table Exercise</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
          <p className="mx-auto mb-6 max-w-[560px] text-cream-soft">
            Tonight, at dinner—or wherever your people gather—ask everyone at the table to answer two questions:
          </p>

          <div className="mx-auto my-8 font-display text-[clamp(1.6rem,4vw,2.5rem)] leading-[1.35] text-gold-light">
            "What's one thing that's been hard lately?"
            <br />
            "What's one thing that's been good?"
          </div>

          <p className="mx-auto max-w-[560px] text-cream-soft">
            That's it. No fixing. No advice. Just listen. Let both answers sit on the table at the same time—the pepper and the other ingredients, side by side. You'll notice something: when people are allowed to name the hard thing <em>and</em> the good thing in the same breath, the whole room changes. That's three conditions activated in under five minutes—Validation, Community, and Agency—no clinical training required.
          </p>
          <p className="mx-auto mt-3 max-w-[560px] text-[0.92rem] text-cream-mid">
            If you want to go one step further, close with: <em>"The pepper is real. Tell me more."</em>
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
