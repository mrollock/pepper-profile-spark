import { RevealSection } from '@/components/RevealSection';

export function LineageSection() {
  return (
    <section
      id="lineage"
      className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            The Lineage
          </span>
          <h2 className="text-center text-cream">The Table Was Always There</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
        </RevealSection>

        <RevealSection>
          <div className="mx-auto max-w-[680px] space-y-5 text-[0.95rem] leading-[1.75] text-cream-mid">
            <p>
              There&rsquo;s a question that deserves a direct answer: if Black communities carry such deep wisdom about holding pain communally, why is there still so much silence and stigma around mental health?
            </p>
            <p className="font-semibold text-cream">
              Because the wisdom and the silence have different histories.
            </p>
            <p>
              The communal processing &mdash; gathering around grief, making art from anguish, holding pain between people instead of inside one person &mdash; is indigenous. West African traditions maintained sophisticated communal architectures for tending grief as a human constant, not just a crisis. Those practices crossed the Middle Passage in people&rsquo;s bodies when everything else was taken. Nine Night. The Blues. Testimony service. The kitchen table. These are coexistence technologies &mdash; and they survived centuries of deliberate destruction.
            </p>
            <p>
              The silence &mdash; the mask, the &ldquo;be strong,&rdquo; the &ldquo;don&rsquo;t tell nobody your business&rdquo; &mdash; is not indigenous. It was installed when enslavement made vulnerability a death sentence and colonialism systematically dismantled the communal structures that had always held pain. The silence is not a tradition. It&rsquo;s a wound. And the wound has outlived its original cause.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <p className="mx-auto my-10 max-w-[620px] text-center font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic leading-[1.45] text-gold-light">
            We have the recipe. We have the table. What colonialism taught us was to be afraid to come to our own table with our full selves.
          </p>
        </RevealSection>

        <RevealSection delay={150}>
          <p className="mx-auto max-w-[680px] text-center text-[0.95rem] leading-[1.75] text-cream-mid">
            The Pepper Sauce Principle commissions what was interrupted &mdash; not what never existed. Coming to the table with your full self, for all of the pain, is how the interruption ends.
          </p>
        </RevealSection>

        {/* Gold divider */}
        <div className="mx-auto my-12 h-px w-[60px] bg-gold opacity-40" />

        <RevealSection delay={200}>
          <div className="mx-auto max-w-[680px] space-y-5 text-[0.95rem] leading-[1.75] text-cream-mid">
            <p className="font-semibold text-cream">
              And here&rsquo;s what this means for everyone &mdash; not just the communities that originated it.
            </p>
            <p>
              When Buddhist contemplative traditions met Western clinical psychology, something remarkable happened. Mindfulness &mdash; a practice developed over 2,500 years within a specific spiritual tradition &mdash; was translated into clinical tools that now serve millions of people worldwide. That translation didn&rsquo;t erase Buddhism. It honored the source while scaling the insight.
            </p>
            <p>
              The Pepper Sauce Principle is the same kind of move from a different lineage. The existing path through pain in clinical psychology routes primarily through individual contemplative practice: observe your suffering, accept without attachment, cultivate equanimity. That path has earned its place. But it&rsquo;s not the only one.
            </p>
            <p>
              Caribbean and Black communal traditions arrived at an equally profound insight through a fundamentally different architecture &mdash; one oriented not toward equanimity but toward pleasure, craft, and communion. The unit of practice isn&rsquo;t the individual on the cushion. It&rsquo;s the people at the table. The orientation isn&rsquo;t peaceful acceptance. It&rsquo;s making something delicious.
            </p>
            <p>
              For anyone who finds the contemplative path powerful &mdash; keep walking it. For everyone who needs a different way in &mdash; who processes relationally, who finds equanimity alienating when they&rsquo;re in survival mode, who wants to make something beautiful with what hurts rather than simply observing it &mdash; the table is set. Pull up a chair.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
