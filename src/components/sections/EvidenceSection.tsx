import { RevealSection } from '@/components/RevealSection';

const EVIDENCE = [
  {
    finding: 'Community is literally analgesic.',
    detail:
      'When one person holds another\u2019s hand during pain, their brainwaves synchronize and the pain signal measurably decreases. Social bonding activates the same opioid system that suppresses pain.',
    source: 'Goldstein et al., PNAS, 2018 \u00B7 Machin & Dunbar, Behaviour, 2011',
    condition: '\u2192 Come to the Table',
  },
  {
    finding: 'Pain rewires the brain \u2014 but the rewiring is reversible.',
    detail:
      'Chronic pain shifts neural processing from sensory circuits to emotional ones. But this reorganization responds to new experiences and conditions \u2014 the brain\u2019s pain map can be rewritten.',
    source: 'Hashmi et al., Brain, 2013 \u00B7 Woolf, Annals of Internal Medicine, 2004',
    condition: '\u2192 Build Your Heat Tolerance',
  },
  {
    finding: 'Sharing what you\u2019ve made changes your immune system.',
    detail:
      'A generativity intervention \u2014 writing about how your experiences could help others \u2014 altered pro-inflammatory gene expression. Meaning-making that reaches beyond the self has biological consequences.',
    source: 'Moieni et al., Psychoneuroendocrinology, 2020',
    condition: '\u2192 Pass the Sauce',
  },
  {
    finding: 'The capsaicin molecule is the proof of concept.',
    detail:
      'The TRPV1 receptor that detects capsaicin \u2014 the compound that makes peppers hot \u2014 first sensitizes, then desensitizes with repeated exposure. The pepper literally teaches the nerve a new prediction. This isn\u2019t an analogy. It\u2019s the biology the metaphor was built on.',
    source: 'Caterina et al., Nature, 1997 \u00B7 Anand & Bley, Br J Anaesth, 2011',
    condition: '\u2192 The whole framework',
  },
];

export function EvidenceSection() {
  return (
    <section
      id="evidence"
      className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
    >
      <div className="mx-auto max-w-[var(--wide-max)]">
        <RevealSection>
          <span className="mb-4 block text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            The Evidence
          </span>
          <h2 className="text-center">This isn&rsquo;t just a metaphor.</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />
          <p className="mx-auto max-w-[560px] text-center text-[0.95rem] text-text-light">
            Every condition in the framework maps onto peer-reviewed research. Here&rsquo;s what the science found when it caught up.
          </p>
        </RevealSection>

        <div className="evidence-grid">
          {EVIDENCE.map((e, i) => (
            <RevealSection key={i} delay={(i % 2) * 100}>
              <div className="evidence-card">
                <p className="evidence-finding">{e.finding}</p>
                <p className="evidence-detail">{e.detail}</p>
                <p className="evidence-source">{e.source}</p>
                <p className="evidence-condition">{e.condition}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
