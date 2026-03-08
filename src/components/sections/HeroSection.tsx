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

        {/* 6. Framework description */}
        <RevealSection delay={1100}>
          <p className="mx-auto mt-8 mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            You've carried it in your body, your family, your history. And somewhere along the way, you learned that joy had to wait until the pain was gone. That visible pleasure was evidence against you. That being believed meant shrinking to fit the expectation.{' '}
            <span className="font-semibold text-gold-pale">The Pepper Sauce Principle&#8482;</span>{' '}
            names five conditions that make joy possible alongside pain, not after it. Grounded in neuroscience, positive psychology, and the cultural wisdom that was practicing them generations before the research caught up.
          </p>
        </RevealSection>

        {/* 7. Tagline */}
        <RevealSection delay={1300}>
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
