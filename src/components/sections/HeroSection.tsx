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
        {/* 1. Recognition text (NEW — first element) */}
        <RevealSection delay={300}>
          <p
            className="mx-auto mb-8 max-w-[560px] font-accent italic text-cream-mid"
            style={{
              fontSize: 'clamp(1.05rem, 2.8vw, 1.28rem)',
              lineHeight: 1.7,
            }}
          >
            You've been carrying pain longer than anyone around you knows.
            <br />
            And you're still here, still showing up, still holding it all together.
          </p>
        </RevealSection>

        {/* 2. Bridge text (NEW — between recognition and headline) */}
        <RevealSection delay={550}>
          <div
            className="mx-auto mb-[2.6rem] max-w-[480px]"
            style={{
              fontSize: 'clamp(0.9rem, 2.1vw, 1rem)',
              lineHeight: 1.75,
            }}
          >
            <p className="font-body text-text-faint">
              Your pain can feel like a judgment, a sentence, a punishment.
            </p>
            <p className="font-body italic text-cream-mid">
              That makes sense.
            </p>
          </div>
        </RevealSection>

        {/* 3. Headline (EXISTING, unchanged) */}
        <RevealSection delay={850}>
          <h1 className="mb-6 text-cream">
            Pain is not a <span className="text-gold-light">punishment.</span>
            <br />
            It's an ingredient.
          </h1>
        </RevealSection>

        {/* 4. Eyebrow (MOVED from above headline to below it) */}
        <RevealSection delay={1050}>
          <p
            className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted"
            style={{ margin: '1.8rem auto 2.2rem' }}
          >
            A Framework by Dr.&nbsp;Michael J.D. Rollock{' '}
            <span style={{ opacity: 0.35 }}> · </span>{' '}
            Pain Psychologist
          </p>
        </RevealSection>

        {/* 5. Gold rule (replaced bowl animation) */}
        <RevealSection delay={1200}>
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

        {/* 6. CTA button (CHANGED from text link to button) */}
        <RevealSection delay={1350}>
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

        {/* 7. Framework description (EXISTING, one word added: "only") */}
        <RevealSection delay={1550}>
          <p className="mx-auto mt-8 mb-6 max-w-[620px] text-[clamp(1rem,2.2vw,1.15rem)] leading-[1.75] text-cream-mid">
            You've carried it in your body, your family, your history&nbsp;— and everything you've been told about it treats pain as the only problem to solve. It's not.{' '}
            <span className="font-semibold text-gold-pale">The Pepper Sauce Principle&#8482;</span>{' '}
            names five conditions that determine whether pain becomes suffering&nbsp;— grounded in neuroscience, positive psychology, and the cultural wisdom that was practicing them generations before the research caught up.
          </p>
        </RevealSection>

        {/* 8. Tagline (EXISTING, unchanged) */}
        <RevealSection delay={1750}>
          <p className="mb-6 font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light">
            Life is painful. Make it delicious.
          </p>
        </RevealSection>

        {/* 9. Interactive teaser (EXISTING, unchanged) */}
        <RevealSection delay={1950}>
          <p className="mx-auto mb-8 max-w-[480px] font-accent text-[clamp(0.85rem,1.5vw,0.95rem)] italic font-medium text-gold-muted">
            This is an interactive framework. Your pepper sauce is unlike anyone else's, and this framework was built to read every ingredient.
          </p>
        </RevealSection>

        {/* Bottom pain types divider (EXISTING, unchanged) */}
        <RevealSection delay={2100}>
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
