import { RevealSection } from '@/components/RevealSection';

export function HooksBridgeSection() {
  return (
    <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]">
      <div className="mx-auto max-w-[var(--content-max)] text-center">
        <RevealSection>
          <p className="mx-auto max-w-[620px] font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic leading-[1.45] text-text-body">
            Rarely, if ever, are any of us healed in isolation. Healing is an act of communion.
          </p>
          <p className="mt-3 font-body text-[0.85rem] font-semibold uppercase tracking-[0.15em] text-gold-muted">
            &mdash; bell hooks
          </p>
          <p className="mx-auto mt-6 max-w-[520px] text-[0.95rem] leading-[1.7] text-text-light">
            The Pepper Sauce Principle was built for more tables and less waiting rooms. For anyone who&rsquo;s been told the path through pain is a solitary one &mdash; and sensed there was another way.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
