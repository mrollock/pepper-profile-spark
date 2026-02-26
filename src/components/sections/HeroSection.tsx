import { RevealSection } from '@/components/RevealSection';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="sec-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-dark text-center"
      style={{ padding: 'calc(var(--nav-height) + 3rem) 1.5rem 4rem' }}
    >
      {/* Radial gradient accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 70%, rgba(200,150,46,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(184,69,26,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-[1] max-w-[800px]">
        <RevealSection>
          <p className="mb-8 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            A Framework by Dr.&nbsp;Michael J.D. Rollock
          </p>
        </RevealSection>

        <RevealSection delay={100}>
          <h1 className="mb-6 text-cream">
            Pain is not a <span className="text-gold-light">punishment.</span>
            <br />
            It's an ingredient.
          </h1>
        </RevealSection>

        <RevealSection delay={200}>
          <p className="mx-auto mt-8 mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            You've carried it in your body, your family, your history&nbsp;— and everything you've been told about it treats pain as the problem to solve. It's not.{' '}
            <span className="font-semibold text-gold-pale">The Pepper Sauce Principle&#8482;</span>{' '}
            names five conditions that determine whether pain becomes suffering&nbsp;— grounded in neuroscience, positive psychology, and the cultural wisdom that was practicing them generations before the research caught up.
          </p>
        </RevealSection>

        <RevealSection delay={325}>
          <p className="mb-10 font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light">
            Life is painful. Make it delicious.
          </p>
        </RevealSection>

        <RevealSection delay={425}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#quiz"
              className="inline-block rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold tracking-wide text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
            >
              Discover What's in Your Bottle
            </a>
            <a
              href="#framework"
              className="inline-block rounded-md border-2 border-cream-mid bg-transparent px-9 py-3.5 font-body text-[0.95rem] font-semibold tracking-wide text-cream transition-all hover:border-gold-light hover:text-gold-light hover:-translate-y-0.5"
            >
              Explore the Framework
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
