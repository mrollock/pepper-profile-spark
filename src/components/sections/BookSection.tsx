import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RevealSection } from '@/components/RevealSection';

export function BookSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      supabase.from('book_signups').insert({ email, source: 'book_notification' } as any).then(null, () => {});
      setSubmitted(true);
    }
  };

  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="book">
      <div className="mx-auto max-w-[var(--content-max)] text-center">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            The Book
          </span>
          <h2 className="text-cream">The Pepper Sauce Principle</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />

          <p className="mx-auto mb-6 max-w-[560px] text-[1.05rem] text-cream-soft">
            Where positive psychology, pain neuroscience, and Caribbean cultural wisdom converge—a framework for anyone who wants to do more than survive the hard parts. For people who want to build something rich, connected, and genuinely delicious with whatever pepper life handed them.
          </p>
          <p className="mb-8 font-accent text-[clamp(1.3rem,3vw,1.8rem)] italic text-gold-light">
            "Life is painful. Make it delicious."
          </p>
          <p className="mb-6 text-[0.95rem] text-gold-muted">
            Coming Soon — Be the first to know when it drops.
          </p>

          {!submitted ? (
            <div className="mx-auto flex max-w-[440px] flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for book notification"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                maxLength={255}
                className="rounded-md border-[1.5px] border-gold/20 bg-dark-mid px-4 py-3.5 font-body text-[0.95rem] text-cream transition-colors focus:border-gold focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
              >
                Notify Me
              </button>
            </div>
          ) : (
            <p className="mt-6 font-accent text-[1.2rem] italic text-gold-light">
              Thank you. We'll let you know when the sauce is ready.
            </p>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
