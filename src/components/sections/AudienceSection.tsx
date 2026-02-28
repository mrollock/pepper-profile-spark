import { RevealSection } from '@/components/RevealSection';

const AUDIENCES = [
  {
    title: 'Clinicians & Therapists',
    desc: 'A five-condition lens for every patient whose pain isn\u2019t responding: which ingredient is missing? A communal coexistence model that complements individual-focused approaches like ACT and CBT \u2014 and reaches patients those modalities miss.',
  },
  {
    title: 'Faith Leaders & Community Workers',
    desc: 'The framework names what you\u2019ve been practicing. The science confirms what you already know. Your kitchen table was an evidence-based intervention before anyone had the language for it.',
  },
  {
    title: 'Organizations & Event Planners',
    desc: 'A keynote that makes audiences learn, laugh, feel validated, and leave with something they\u2019ll use Monday morning. Not another lecture. A shared experience around a table \u2014 with neuroscience, family stories, and the kind of warmth that makes 300 strangers feel like they\u2019re sitting in someone\u2019s kitchen.',
  },
  {
    title: 'Anyone Carrying Pain',
    desc: 'If the individual, contemplative path through pain has never quite landed for you \u2014 if you process relationally, if you need people around you, if you want to make something with what hurts rather than just observing it \u2014 this framework was built for how you already work. No degree required. Five words can change the conversation tonight.',
  },
];

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
    >
      <div className="mx-auto max-w-[var(--wide-max)]">
        <RevealSection>
          <span className="mb-4 block text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Who This Is For
          </span>
          <h2 className="text-center text-cream">Born at a Caribbean table. Built for every table.</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
          <p className="mx-auto mb-10 max-w-[560px] text-center text-[0.95rem] text-cream-mid">
            The Pepper Sauce Principle draws its wisdom from Black and Caribbean communal traditions &mdash; and offers it to anyone who carries pain, which is everyone. The cultural roots are honored. The table is open.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <RevealSection key={i} delay={(i % 2) * 100}>
              <div className="relative overflow-hidden rounded-[10px] border border-gold/10 bg-dark-mid p-8 transition-all duration-300 hover:-translate-y-[3px] hover:border-gold/25 hover:shadow-[0_8px_30px_rgba(200,150,46,0.08)]">
                <div className="absolute left-0 top-0 h-full w-1 bg-gold" />
                <h3 className="mb-3 font-display text-[1.15rem] font-bold text-cream">{a.title}</h3>
                <p className="text-[0.92rem] leading-[1.7] text-cream-mid">{a.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
