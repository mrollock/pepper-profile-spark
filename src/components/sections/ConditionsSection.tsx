import { RevealSection } from '@/components/RevealSection';

const CONDITIONS = [
  {
    number: '01',
    name: 'The Pepper Is Real',
    def: 'Acknowledge the pain — validation',
    desc: 'Before anything else, the burn must be believed. Not compared, not minimized, not explained away. Whether it\u2019s the grief nobody asks about anymore, the exhaustion you can\u2019t show at work, or the chronic pain a doctor dismissed—nothing else in the recipe works if nobody believes you have the pepper. The most common thing people say when they finally feel heard: \u201cThank you for believing me.\u201d',
  },
  {
    number: '02',
    name: 'Choose Your Recipe',
    def: 'Exercise agency over how you hold it — not whether it exists',
    desc: 'You didn\u2019t choose the pepper. But you choose what you do with it. Agency isn\u2019t pretending the burn doesn\u2019t exist. It\u2019s deciding whether to add mustard or vinegar, whether to blend it slow or fast, whether to serve it at Tuesday\u2019s dinner or bottle it for the holidays. This is where the sauce becomes \u003cem\u003eyours\u003c/em\u003e—where pain stops being something that happens to you and becomes material you\u2019re working with.',
  },
  {
    number: '03',
    name: 'Come to the Table',
    def: "Don\u2019t process pain alone — community as mechanism",
    desc: 'You can\u2019t make pepper sauce alone. You make it in the kitchen while someone is telling you a story. You serve it at a table where people are gathered. When someone you love sits with you in the hard thing—not fixing, not redirecting, just present—the burn changes. The science confirms it: a photograph of someone who cares about you measurably reduces pain intensity. Social connection activates the same molecular systems as the medications we prescribe. We need more tables.',
  },
  {
    number: '04',
    name: 'Build Your Heat Tolerance',
    def: 'Develop capacity over time — graded exposure, resilience',
    desc: 'Nobody starts with a high heat tolerance. You build it—not by being tougher, but by showing up to the burn again and again, with the right people and the right ingredients around you. Over time, you can hold more hard things at once. Not because you stopped feeling. Because you grew. The neuroscience confirms it: graduated engagement with discomfort literally changes how the brain processes the signal. Capacity is built, not born.',
  },
  {
    number: '05',
    name: 'Pass the Sauce',
    def: "Share what you\u2019ve made with others — the multiply function",
    desc: 'The recipe isn\u2019t finished until someone else tastes it. When you hand the bottle to the next person—a child, a patient, a friend, a stranger who\u2019s burning—something unexpected happens: the pain that went into making it becomes purpose. And purpose, positive psychology tells us, isn\u2019t just comforting. It\u2019s one of the strongest predictors of a life that feels genuinely worth living. This is the condition that turns your kitchen into everyone\u2019s kitchen.',
  },
];

export function ConditionsSection() {
  return (
    <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="conditions">
      <div className="mx-auto max-w-[var(--wide-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            The Five Conditions
          </span>
          <h2>What Goes in the Recipe</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />
          <p>
            Pepper sauce isn't pepper. Pepper sauce is what happens when the right ingredients meet the burn—and the result isn't just tolerable. It's <em>delicious</em>. These five conditions don't just prevent suffering. They're how people build lives that are genuinely rich, connected, and worth savoring—not despite the heat, but with it. Every one of them can be strengthened, starting tonight.
          </p>
        </RevealSection>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CONDITIONS.map((c, i) => (
            <RevealSection
              key={c.number}
              delay={i % 2 === 1 ? 100 : 0}
              className={i === 4 ? 'md:col-span-2 md:mx-auto md:max-w-[500px]' : ''}
            >
              <div className="relative overflow-hidden rounded-[10px] border border-cream-mid bg-cream p-8 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(61,53,37,0.08)]">
                <div className="absolute left-0 top-0 h-full w-1 bg-gold" />
                <div className="mb-2 font-display text-[2.2rem] font-extrabold leading-none text-gold-pale">
                  {c.number}
                </div>
                <div className="mb-1 font-display text-[1.25rem] font-bold text-text-body">
                  {c.name}
                </div>
                <div className="mb-3 text-[0.92rem] font-medium text-text-light">
                  {c.def}
                </div>
                <div
                  className="text-[0.92rem] leading-[1.7] text-text-body"
                  dangerouslySetInnerHTML={{ __html: c.desc }}
                />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
