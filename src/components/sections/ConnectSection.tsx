import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RevealSection } from '@/components/RevealSection';

export function ConnectSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (form.name && form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      supabase.from('contact_submissions').insert({ name: form.name, email: form.email, message: form.message } as any).then(null, () => {});
      setSubmitted(true);
    }
  };

  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="connect">
      <div className="mx-auto max-w-[var(--content-max)] text-center">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Connect
          </span>
          <h2 className="text-cream">Pull Up a Chair</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
          <p className="text-cream-soft">
            Whether you want to bring the Pepper Sauce Principle to your conference, your clinic, your church, or your classroom—or you just want to be the first to know what's next—this is your seat at the table.
          </p>

          {!submitted ? (
            <div className="mx-auto mt-8 flex max-w-[440px] flex-col gap-3">
              <input
                type="text"
                placeholder="Your name"
                aria-label="Your name"
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value.slice(0, 100) }))}
                maxLength={100}
                className="rounded-md border-[1.5px] border-gold/20 bg-dark-mid px-4 py-3.5 font-body text-[0.95rem] text-cream transition-colors focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value.slice(0, 255) }))}
                maxLength={255}
                className="rounded-md border-[1.5px] border-gold/20 bg-dark-mid px-4 py-3.5 font-body text-[0.95rem] text-cream transition-colors focus:border-gold focus:outline-none"
              />
              <input
                type="text"
                placeholder="What can we help with?"
                aria-label="How can we help"
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value.slice(0, 2000) }))}
                maxLength={2000}
                className="rounded-md border-[1.5px] border-gold/20 bg-dark-mid px-4 py-3.5 font-body text-[0.95rem] text-cream transition-colors focus:border-gold focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
              >
                Send
              </button>
            </div>
          ) : (
            <p className="mt-6 font-accent text-[1.2rem] italic text-gold-light">
              Thank you. We'll be in touch. Pull up a chair — we saved you a seat.
            </p>
          )}

          <p className="mt-8 text-[0.88rem] text-text-faint">
            Imaginative Feedback Coaching & Consulting
            <br />
            <a href="mailto:Michael@ifwall.com" className="text-gold-muted hover:text-gold-light">
              Michael@ifwall.com
            </a>
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
