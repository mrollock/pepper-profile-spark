import { RevealSection } from '@/components/RevealSection';

export function InterventionSection() {
  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="intervention">
      <div className="mx-auto max-w-[var(--content-max)] text-center">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Start Tonight
          </span>
          <h2 className="text-cream">The Recipe Check-In</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
          <p className="mx-auto mb-6 max-w-[560px] text-cream-soft">
            Pick one person. It doesn't have to be at dinner — it can be a phone call, a walk, a text thread. Ask them two things:
          </p>

          <div className="mx-auto my-8 font-display text-[clamp(1.6rem,4vw,2.5rem)] leading-[1.35] text-gold-light">
            "What pepper are you carrying right now that nobody's asked you about?"
            <br />
            "What's one ingredient keeping you going that you haven't said out loud?"
          </div>

          <p className="mx-auto max-w-[560px] text-cream-soft">
            Then just listen. Don't fix. Don't match it with your own. Let the burn and the flavor sit on the table at the same time — because that's the whole principle in one conversation. And when they're done: <em>"The pepper is real. Tell me more."</em>
          </p>
          <p className="mx-auto mt-3 max-w-[560px] text-[0.92rem] text-cream-mid">
            Then switch. Your turn.
          </p>

          <a
            href="#quiz"
            className="mt-8 inline-block rounded-md bg-gold-muted/20 px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.12em] text-gold-light transition-colors hover:bg-gold-muted/40"
          >
            What's in YOUR recipe? Take the Free Pepper Sauce Profile →
          </a>
        </RevealSection>
      </div>
    </section>
  );
}
