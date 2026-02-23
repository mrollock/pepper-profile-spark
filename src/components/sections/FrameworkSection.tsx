import { RevealSection } from '@/components/RevealSection';

export function FrameworkSection() {
  return (
    <section className="bg-cream py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="framework">
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            The Framework
          </span>
          <h2>What If the Pain Isn't the Problem?</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />

          <p>
            Think about what actually happens when you make Bajan pepper sauce. You take a Scotch bonnet pepper—which, if you've ever bitten into one raw, you know that is not a meal. That is an emergency. But you add mustard. Vinegar. Turmeric. Garlic. You blend it. You bottle it. You let it sit. And now it's something you put on your food <em>on purpose</em>. Something that makes the whole plate better. The pepper didn't change. You changed what surrounds it.
          </p>
          <p className="mt-4">
            That's not a metaphor about surviving pain. It's a recipe for <em>flourishing with it</em>. The goal was never to tolerate the pepper. The goal was to make something delicious—something you'd actually want to share.
          </p>
        </RevealSection>

        <RevealSection>
          <blockquote className="my-10 border-l-[3px] border-gold pl-6 font-accent text-[clamp(1.4rem,3vw,2rem)] italic leading-[1.5]">
            "Nobody changed the pepper. They changed their relationship to the pepper."
          </blockquote>
        </RevealSection>

        <RevealSection>
          <p>
            Three streams of knowledge converge here. <strong>Positive psychology</strong>—the science of what makes life worth living, not just bearable—shows that meaning, agency, and social connection don't just buffer against suffering; they are the active ingredients of a rich life. <strong>Pain neuroscience</strong> reveals that the capsaicin molecule binds the same receptor as the brain's own "bliss molecule"—pain and pleasure literally share hardware, and shared painful experiences deepen bonds, but only when pleasure coexists with pain. And <strong>Caribbean and Black communal wisdom</strong>—centuries of kitchens, churches, music, and tables—has always known what both sciences are converging on: that you hold the hard thing <em>and</em> the good thing at the same time, in the same room, with the same people.
          </p>
        </RevealSection>

        <RevealSection>
          <p className="mt-4">
            The grandmother who fed you when you were hurting, who said "tell me what's wrong, baby" and then made you a plate—she was practicing validation, community, and graduated engagement. She was also practicing positive psychology: she wasn't trying to remove your pain. She was adding ingredients so the whole meal could be nourishing. Three of the five conditions, without reading a single study.
          </p>
        </RevealSection>

        <RevealSection>
          <blockquote className="my-10 border-l-[3px] border-gold pl-6 font-accent text-[clamp(1.4rem,3vw,2rem)] italic leading-[1.5]">
            "The science is catching up to what the kitchen always knew."
          </blockquote>
        </RevealSection>
      </div>
    </section>
  );
}
