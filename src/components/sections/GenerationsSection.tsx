import { RevealSection } from '@/components/RevealSection';

const GENERATIONS = [
  {
    name: 'Captain Eric \u201cPeace\u201d Hassell',
    role: 'The Grandfather \u00b7 Barbados',
    text: 'He lost his ship in 1963\u2014the ocean literally swallowed it. Six years later he opened a shipping office on Bridge Street in Bridgetown, in the same industry that took everything from him. He didn\u2019t leave the water. He changed his relationship to the water. Eric Hassell & Son is now in its third generation. Still there. Still on the water. Everybody called him Peace\u2014because that\u2019s what he said about everything. And then he\u2019d ask if you were coming for dinner.',
  },
  {
    name: 'Dr. Michael J.D. Rollock',
    role: 'The Grandson \u00b7 Barbados \u2192 America',
    text: 'Came to the U.S. at seventeen. Went from a place where he was the majority to a place where he was a category. Trained in positive psychology at Penn under Seligman, earned a PhD from UMass Boston, and now directs Behavioral Health at a pain clinic. But the framework that made sense of all of it\u2014the immigration, the clinical work, the science\u2014wasn\u2019t in any journal. It was in his grandfather\u2019s kitchen, in a gold bottle of pepper sauce that showed up at every meal.',
  },
  {
    name: 'Nina, Age Six',
    role: 'The Next Generation \u00b7 Augusta, Georgia',
    text: 'On Rosa Parks\u2019 birthday, she told her father: \u201cDaddy, if they put you in jail, I\u2019d come in there with you. And I\u2019d be in there as long as you\u2019re there.\u201d She didn\u2019t say \u201cdon\u2019t go\u201d\u2014that would be avoidance. She didn\u2019t say \u201cit\u2019ll be okay\u201d\u2014that would be minimization. She said: I would be present in the pain, with all the love, for as long as it takes. Condition 3 in its purest form. The recipe is already being passed.',
  },
];

export function GenerationsSection() {
  return (
    <section className="sec-dark relative bg-dark py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="generations">
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            Where the Recipe Comes From
          </span>
        </RevealSection>
        <RevealSection>
          <h2 className="text-cream">Three Generations. One Kitchen.</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold-muted" />
        </RevealSection>
        <RevealSection>
          <p className="mx-auto mb-8 max-w-[640px] text-center text-cream-soft">
            Every pepper sauce has an origin story—a kitchen where somebody first figured out the recipe. This one starts in Barbados with a sea captain everybody called Peace, runs through a psychologist's office in Georgia, and shows up in the words of a six-year-old who may have said the whole framework better than anyone.
          </p>
        </RevealSection>

        <div className="mt-10 flex flex-col gap-10">
          {GENERATIONS.map((gen) => (
            <RevealSection key={gen.name}>
              <div className="border-l-[3px] border-gold-muted pl-8">
                <h3 className="mb-1 text-gold-light">{gen.name}</h3>
                <div className="mb-3 font-accent text-base italic text-gold-muted">{gen.role}</div>
                <p className="text-[0.95rem] leading-[1.75] text-cream-soft">{gen.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
