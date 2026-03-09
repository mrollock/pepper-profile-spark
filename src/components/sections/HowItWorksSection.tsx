import { RevealSection } from '@/components/RevealSection';

const STEPS = [
  {
    opener: 'See the map.',
    body: 'The Pepper-Sauce Matrix shows you four ways a life can hold pain. Touch the map. Find the territory that feels familiar. This takes thirty seconds and costs nothing but honesty.',
  },
  {
    opener: 'Sit at the table.',
    body: "When you start the Pepper Sauce Profile, the framework sits with you first. A brief conversation, just a few questions, where it asks what kind of fire you're carrying and starts to read what's in your sauce. Then thirty-four questions map your five conditions, identify your fire type, and show you what your recipe actually contains. Free. About seven minutes total.",
  },
  {
    opener: 'Go deeper.',
    body: "The Extended Report is where the recipe gets personal. A conversation with the framework about your actual life, followed by a report written specifically for your fire, your conditions, and your version of a life worth calling delicious. Delivered to your inbox within 48 hours.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]">
      <div className="mx-auto max-w-[600px]">
        <RevealSection>
          <span className="mb-4 block text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            How the Pepper Sauce Principle Works
          </span>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />
        </RevealSection>

        <div className="mt-10 space-y-8">
          {STEPS.map((step, i) => (
            <RevealSection key={step.opener} delay={i * 100}>
              <div className="border-l-2 border-gold/15 pl-6">
                <h3 className="mb-2 font-display text-[clamp(1.1rem,2.5vw,1.35rem)] font-bold text-gold">
                  {step.opener}
                </h3>
                <p className="text-[0.95rem] leading-[1.75] text-cream-soft/90">
                  {step.body}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
