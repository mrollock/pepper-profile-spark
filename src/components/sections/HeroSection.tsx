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
          <h1 className="mb-6 text-cream">
            Pain is not a <span className="text-gold-light">punishment.</span>
            <br />
            It's an ingredient.
          </h1>
        </RevealSection>

        <RevealSection delay={100}>
          <p className="mx-auto mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            What determines whether we suffer isn&#8217;t the pain itself&nbsp;— it&#8217;s what surrounds it.
          </p>
        </RevealSection>

        <RevealSection delay={150}>
          <p className="mx-auto mt-2 mb-6 max-w-[620px] font-accent text-[clamp(1.1rem,2.5vw,1.3rem)] italic leading-[1.6] text-gold-pale">
            Pain is the pepper. The conditions are the sauce.
          </p>
        </RevealSection>

        <RevealSection delay={200}>
          <p className="mx-auto mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            Nobody eats a raw pepper and calls it a meal. What turns heat into flavor is the recipe&nbsp;— the surrounding ingredients, the craft, the company at the table.
          </p>
        </RevealSection>

        <RevealSection delay={250}>
          <p className="mx-auto mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            Whether you&#8217;re carrying grief, burnout, chronic pain, or generational trauma, The Pepper Sauce Principle&#8482; names{' '}
            <a href="#conditions" className="text-gold-light hover:underline">five evidence-based conditions</a>{' '}
            you can act on today&nbsp;— not to eliminate the pepper, but to build a life so flavor&#8209;full that pain takes its rightful place as one ingredient among many.
          </p>
        </RevealSection>

        <RevealSection delay={275}>
          <p className="mx-auto mb-6 max-w-[620px] text-[clamp(0.95rem,2.1vw,1.1rem)] italic leading-[1.75] text-cream-mid">
            This isn&#8217;t asking you to be strong or to push through. It&#8217;s asking what would happen if you weren&#8217;t alone in it.
          </p>
        </RevealSection>

        <RevealSection delay={300}>
          <p className="mx-auto mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            The free Pepper Sauce Profile&#8482; reveals what kind of fire is in your bottle right now, how you relate to the heat, and what&#8217;s already in your recipe&nbsp;— along with a signature blend of ingredients you can start adding today. Not to neutralize the pepper. To make sure it&#8217;s not the only thing you taste.
          </p>
        </RevealSection>

        <RevealSection delay={350}>
          <p className="mb-10 font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light">
            &#8220;Life is painful. Make it delicious.&#8221;
          </p>
        </RevealSection>

        <RevealSection delay={400}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#quiz"
              className="inline-block rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold tracking-wide text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
            >
              Take the Quiz
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
