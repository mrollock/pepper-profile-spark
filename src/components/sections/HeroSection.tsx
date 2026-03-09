import { RevealSection } from '@/components/RevealSection';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="sec-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-dark text-center"
      style={{ padding: 'calc(var(--nav-height) + 2.5rem) 1.5rem 4rem' }}
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
        {/* 1. Headline */}
        <RevealSection delay={300}>
          <h1 className="mb-6 text-cream">
            Pain is real.{' '}
            <span className="text-gold">Joy is possible.</span>
          </h1>
        </RevealSection>

        {/* 2. Framework name */}
        <RevealSection delay={450}>
          <p
            className="text-center font-display"
            style={{
              fontSize: 'clamp(1.1rem, 3.2vw, 1.5rem)',
              fontWeight: 500,
              color: '#C8962E',
              letterSpacing: '0.08em',
              margin: '1.4rem auto 0.6rem',
            }}
          >
            The Pepper Sauce Principle
            <span style={{ fontSize: '65%', verticalAlign: 'super', opacity: 0.6 }}>™</span>
          </p>
        </RevealSection>

        {/* 3. Eyebrow byline */}
        <RevealSection delay={600}>
          <p
            className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted"
            style={{ margin: '1.8rem auto 2.2rem' }}
          >
            A Framework by Dr.&nbsp;Michael J.D. Rollock{' '}
            <span style={{ opacity: 0.35 }}> · </span>{' '}
            Pain Psychologist
          </p>
        </RevealSection>

        {/* 4. Gold rule */}
        <RevealSection delay={750}>
          <div
            style={{
              width: 48,
              height: 1.5,
              background: 'linear-gradient(90deg, transparent, #C8962E, transparent)',
              borderRadius: 1,
              margin: '1.5rem auto',
            }}
          />
        </RevealSection>

        {/* 5. CTA button */}
        <RevealSection delay={900}>
          <div className="flex flex-col items-center gap-[0.7rem]">
            <a
              href="#matrix"
              className="inline-block rounded-md border-0 bg-gold px-[2.4rem] py-[0.95rem] font-body text-[0.88rem] font-semibold tracking-[0.04em] text-dark no-underline transition-all duration-300 hover:bg-gold-light hover:-translate-y-px max-[400px]:w-full max-[400px]:max-w-[320px] max-[400px]:text-center"
            >
              See YOUR Pepper Sauce blend →
            </a>
            <p
              className="font-body text-text-faint"
              style={{ fontSize: '0.7rem', letterSpacing: '0.02em' }}
            >
              Interactive. 30 seconds. Free.
            </p>
          </div>
        </RevealSection>

        {/* 6. The Mirror */}
        <RevealSection delay={1100}>
          <p className="mx-auto mt-8 mb-8 max-w-[540px] text-[clamp(0.92rem,2.1vw,1.05rem)] leading-[1.8] text-cream-mid">
            You've carried it in your body, your family, your history. And somewhere along the way, you were taught that joy had to wait until the pain was gone. That when you did feel pleasure, or laughed too freely, or danced, or simply lived well for a moment, it became evidence that your pain must not be that bad. So you learned to shrink. To dim what was bright in you so that what hurt in you would be believed.
          </p>
        </RevealSection>

        {/* 7. The Promise */}
        <RevealSection delay={1250}>
          <p className="mx-auto mb-8 max-w-[540px] text-[clamp(0.92rem,2.1vw,1.05rem)] leading-[1.8] text-cream-mid">
            <span className="font-semibold text-cream">The Pepper Sauce Principle&#8482;</span>{' '}
            names five conditions that make joy possible alongside pain, not after it. A framework, a community, and a table full of people who will never ask you to shrink again. Because pain doesn't have to be the end of pleasure, for the same reason pepper sauce burns your mouth and is still delicious, and you still want more. Grounded in neuroscience, positive psychology, and the cultural wisdom that was living this truth generations before the research caught up.
          </p>
        </RevealSection>

        {/* 8. The Declaration */}
        <RevealSection delay={1400}>
          <p className="mx-auto mb-10 max-w-[500px] font-accent text-[clamp(1rem,2.5vw,1.2rem)] italic leading-[1.7] text-gold-pale">
            I want more out of this life than coping. I want a delicious life. And I won't let this pain, your disbelief, or anything else stop me from living it.
          </p>
        </RevealSection>

        {/* 9. Tagline */}
        <RevealSection delay={1550}>
          <p className="mb-6 font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light">
            Life is painful. Make it delicious.
          </p>
        </RevealSection>

        {/* 8. Interactive teaser */}
        <RevealSection delay={1500}>
          <p className="mx-auto mb-8 max-w-[480px] font-accent text-[clamp(0.85rem,1.5vw,0.95rem)] italic font-medium text-gold-muted">
            This is an interactive framework. Your pepper sauce is unlike anyone else's, and this framework was built to read every ingredient.
          </p>
        </RevealSection>

        {/* Bottom pain types divider */}
        <RevealSection delay={1650}>
          <div className="mx-auto mt-14 max-w-[600px] border-t border-cream-mid/15 pt-6">
            <p className="text-[clamp(0.82rem,1.8vw,0.9rem)] leading-[1.7] text-cream-mid/70">
              <span className="text-gold-pale/90 font-medium">Physical pain.</span>{' '}
              <span className="text-gold-pale/90 font-medium">Emotional pain.</span>{' '}
              <span className="text-gold-pale/90 font-medium">Racial pain.</span>{' '}
              <span className="text-gold-pale/90 font-medium">Inherited pain.</span>{' '}
              These are not the same experience. But your nervous system processes them through overlapping circuits. The five conditions work across all of&nbsp;them.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
