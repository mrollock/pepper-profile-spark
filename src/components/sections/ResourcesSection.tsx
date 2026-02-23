import { RevealSection } from '@/components/RevealSection';

const RESOURCES = [
  { name: 'The Pepper Sauce Profile', badge: 'Free — Take It Now', type: 'free', link: '#quiz' },
  { name: 'The Five Conditions Quick Reference Card', badge: 'Free with Email Signup', type: 'free' },
  { name: "Where\u2019s the Burn? A Conversation Starter for Families", badge: 'Free with Email Signup', type: 'free' },
  { name: 'The Pepper Heat Taxonomy: A Clinical Guide', badge: 'Coming Soon', type: 'soon' },
  { name: "Pass the Sauce: A Workshop Facilitator\u2019s Guide", badge: 'Coming Soon', type: 'soon' },
];

export function ResourcesSection() {
  return (
    <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="resources">
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            Resources
          </span>
          <h2>Tools for the Table</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />

          <div className="mt-8 flex flex-col gap-4">
            {RESOURCES.map((r) => (
              <div
                key={r.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-cream-mid bg-cream px-6 py-5 transition-transform duration-200 hover:translate-x-1"
              >
                <span className="font-display text-base font-semibold">{r.name}</span>
                {r.link ? (
                  <a
                    href={r.link}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-semibold ${
                      r.type === 'free'
                        ? 'bg-gold-pale text-warmth'
                        : 'bg-cream-mid text-text-light'
                    }`}
                  >
                    {r.badge}
                  </a>
                ) : (
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-semibold ${
                      r.type === 'free'
                        ? 'bg-gold-pale text-warmth'
                        : 'bg-cream-mid text-text-light'
                    }`}
                  >
                    {r.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
