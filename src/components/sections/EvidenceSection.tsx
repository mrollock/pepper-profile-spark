import { RevealSection } from '@/components/RevealSection';

const EVIDENCE = [
  {
    condition: 'Condition 1: The Pepper Is Real',
    heading: 'Naming pain changes its grip',
    body: 'A 2022 study in The Journal of Pain developed the first validated scale measuring pain invalidation — having your pain disbelieved, discredited, or dismissed. Higher invalidation scores predicted worse pain outcomes and greater functional impairment. The first step in the framework — acknowledging that the pepper is real — is now a measurable clinical variable.',
    citation: 'Nicola et al., The Journal of Pain, 2022',
    doi: 'https://doi.org/10.1016/j.jpain.2022.06.008',
  },
  {
    condition: 'Condition 2: Choose Your Recipe',
    heading: 'Believing you have a choice changes the outcome',
    body: 'A 2022 meta-analysis in Clinical Psychology Review examined what actually drives improvement in chronic pain treatment. The answer: self-efficacy — the belief that you can influence how you hold your pain. Increases in self-efficacy mediated the effect of cognitive behavioral therapy on disability. Not the technique. The belief that you have a recipe.',
    citation: 'Murillo et al., Clinical Psychology Review, 2022',
    doi: 'https://doi.org/10.1016/j.cpr.2022.102160',
  },
  {
    condition: 'Condition 3: Come to the Table',
    heading: 'Isolation is as dangerous as the pain itself',
    body: 'A 2023 mega-analysis in Nature Human Behaviour synthesized 90 cohort studies with over 2.2 million individuals. Social isolation increased all-cause mortality risk by 32%. Loneliness independently increased it by 14%. "Come to the Table" is not a metaphor. When pain is processed alone, the mortality effect is comparable to smoking 15 cigarettes a day.',
    citation: 'Wang et al., Nature Human Behaviour, 2023',
    doi: 'https://doi.org/10.1038/s41562-023-01617-6',
  },
  {
    condition: 'Condition 4: Build Your Heat Tolerance',
    heading: 'The brain rewires through graduated engagement',
    body: "A 2025 neuroimaging study found that habitual spicy food consumers showed significantly reduced pain-related neural amplitudes compared to non-consumers. The brain doesn\u2019t just endure repeated exposure to capsaicin — it structurally adapts. Not willpower. Neuroplasticity. The same mechanism that builds heat tolerance builds life tolerance.",
    citation: 'He et al., Social Cognitive and Affective Neuroscience, 2025',
    doi: 'https://doi.org/10.1093/scan/nsaf040',
  },
  {
    condition: 'Condition 5: Pass the Sauce',
    heading: "Sharing what you've made reduces your own pain",
    body: "A 2023 longitudinal study tracked approximately 48,000 individuals across 10 years. Those who donated money or volunteered their time reported significantly less pain interference — even after controlling for demographics, baseline health, and depression. Giving what you\u2019ve built from your pain back to others is not just generous. It\u2019s analgesic.",
    citation: 'Hu et al., Journal of Psychosomatic Research, 2023',
    doi: 'https://doi.org/10.1016/j.jpsychores.2023.111295',
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

        {/* Five-card grid: 3+2 on desktop, stacked on mobile */}
        <div className="evidence-grid-5">
          {EVIDENCE.map((e, i) => (
            <RevealSection key={i} delay={(i % 3) * 100}>
              <div className="evidence-card h-full flex flex-col">
                <span className="evidence-condition-label">{e.condition}</span>
                <p className="evidence-finding">{e.heading}</p>
                <p className="evidence-detail flex-1">{e.body}</p>
                <div className="mt-auto pt-3">
                  <p className="evidence-source">{e.citation}</p>
                  <a
                    href={e.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="evidence-doi"
                  >
                    View study →
                  </a>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* "Why pepper?" aside */}
        <RevealSection>
          <div className="evidence-aside">
            <h3 className="evidence-aside-heading">Why pepper?</h3>
            <p className="evidence-aside-body">
              Capsaicin — the molecule that makes peppers hot — binds to the same receptor (TRPV1) that processes physical pain. Your tongue and your nervous system use identical hardware. But that receptor also binds anandamide, the body&rsquo;s own &ldquo;bliss molecule.&rdquo; Pain and pleasure, processed by the same receptor. The metaphor isn&rsquo;t decorative. It&rsquo;s molecular.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
