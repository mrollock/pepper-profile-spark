import { RevealSection } from '@/components/RevealSection';

const FORMATS = ['Keynote', 'Workshop', 'Grand Rounds', 'Community Event', 'Certification Training'];

export function SpeakingSection() {
  return (
    <section className="bg-cream py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="speaking">
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            Speaking
          </span>
          <h2>Bring the Framework to Your Room</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />

          <blockquote className="my-8 border-l-[3px] border-gold pl-6 font-accent text-[clamp(1.4rem,3vw,2rem)] italic leading-[1.5]">
            "People walk in carrying something heavy. They leave carrying something useful."
          </blockquote>

          <p>
            Dr. Rollock doesn't lecture. He cooks. Every audience becomes a kitchen—a room where the pain people walked in carrying gets named, held, and made into something they take home. By the end, the room isn't just informed. It's different. People leave with a five-word intervention they can use that night, a framework that changes Monday morning, and a story they'll retell for years.
          </p>
          <p className="mt-4">
            The talk moves from <em>clarify</em> (the throughline) to <em>simplify</em> (the five conditions) to <em>multiply</em> (Pass the Sauce). It works for a ballroom of 500 and a boardroom of 12. It lands with clinicians, community leaders, educators, pastors, and anyone who has ever sat across from someone who was hurting and didn't know what to say.
          </p>

          <h3 className="mt-8 text-[1.1rem]">Available Formats</h3>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {FORMATS.map(f => (
              <div
                key={f}
                className="rounded-lg border border-gold/15 bg-dark-mid px-5 py-3.5 text-center text-[0.9rem] font-medium text-gold-pale"
              >
                {f}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:info@imaginativefeedback.com?subject=Speaking%20Inquiry%20-%20Pepper%20Sauce%20Principle"
              className="inline-block rounded-md bg-dark px-9 py-3.5 font-body text-[0.95rem] font-semibold text-cream transition-all hover:bg-dark-warm hover:-translate-y-0.5"
            >
              Book Dr. Rollock
            </a>
            <p className="mt-4 text-[0.88rem] text-text-light">
              Imaginative Feedback Coaching & Consulting
              <br />
              info@imaginativefeedback.com
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
