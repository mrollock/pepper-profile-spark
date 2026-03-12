import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { RevealSection } from '@/components/RevealSection';

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-8 border-l-2 border-gold pl-6 font-accent text-[17px] italic leading-[1.8] text-[#4a4232] sm:text-[18px]">
    {children}
  </blockquote>
);

const ConditionHead = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 font-display text-[20px] font-bold text-gold sm:text-[22px]">
    {children}
  </h3>
);

const GoDeeper = () => {
  return (
    <>
      <Navbar />
      <main className="bg-cream-soft">
        <article className="mx-auto max-w-[660px] px-5 pb-9 pt-12 sm:px-6 sm:pb-[60px] sm:pt-[80px]">

          {/* EYEBROW + HEADLINE */}
          <RevealSection>
            <div className="text-center">
              <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
                Why This Works
              </span>
              <h1 className="mx-auto max-w-[580px] font-display text-[clamp(1.6rem,4vw,2.25rem)] font-bold leading-[1.25] text-[#2a2518]">
                The Pepper Sauce Challenge Isn't Wishful Thinking. It's Applied Science with Ancient Roots.
              </h1>
            </div>
          </RevealSection>

          {/* OPENING */}
          <RevealSection>
            <div className="mx-auto mt-10 max-w-[600px] text-center font-accent text-[17px] italic leading-[1.8] text-[#4a4232]">
              <p>
                When we challenge you to reclaim one act of authentic joy per day for seven days, we're not guessing. We're drawing on three bodies of evidence that, read together, say the same thing: the conditions surrounding your pain matter as much as the pain itself. Change the conditions, and the pain changes what it produces.
              </p>
              <p className="mt-6">
                Pain neuroscience explains why. Positive psychology explains how. And Black and Caribbean cultural wisdom shows that communities have been doing this, brilliantly, for centuries.
              </p>
            </div>
          </RevealSection>

          {/* FIVE CONDITIONS INTRO */}
          <RevealSection>
            <div className="mx-auto my-14 h-[2px] w-[60px] bg-gold" />
            <p className="font-body text-[16px] leading-[1.8] text-[#2a2518]">
              The Pepper Sauce Principle names five conditions that determine whether pain narrows your life into suffering or coexists with a life worth calling delicious. Each condition is grounded in peer-reviewed science. Each was practiced in kitchens, churches, and front porches long before it appeared in a journal.
            </p>
          </RevealSection>

          {/* CONDITION 1 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Condition 1: The Pepper Is Real (Validation)</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Before anything else, the pain must be witnessed. It cannot be minimized, compared, or met with "at least you can still…" It must be witnessed.
                </p>
                <p>
                  The clinical ground: Marsha Linehan's six levels of validation in Dialectical Behavior Therapy and Carl Rogers' conditions for therapeutic change establish that accurate acknowledgment of internal experience is a precondition for change, not simply an act of kindness. When validation is present, isolation decreases and self-trust increases. When it is absent, pain goes underground.
                </p>
                <p>
                  In the Challenge, this is why we start by naming the difficulty honestly. We don't pretend this is easy. We don't skip to the joy. The pepper is real. Tell me more.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* CONDITION 2 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Condition 2: Choose Your Recipe (Agency)</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Agency is the felt sense of authorship over how you carry pain. It is the difference between pain happening to you and you navigating through pain. It does not require control over whether pain exists.
                </p>
                <p>
                  The clinical ground: Albert Bandura's Social Cognitive Theory identifies four properties of human agency: intentionality, forethought, self-reactiveness, and self-reflectiveness. Critically, Bandura names three forms: personal, proxy (enlisting others), and collective (working together). Agency does not require independence. It requires participation.
                </p>
                <p>
                  In the Challenge, this is the rule that the joyful act must be authentic to who you are now, not who you were before pain. You are choosing your recipe with the ingredients available to you today. That's agency. The professor who stopped teaching confused how she used to do things with who she actually was. The Challenge invites you to separate those two things.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* CONDITION 3 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Condition 3: Come to the Table (Community)</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Community is the social ecosystem in which pain can be witnessed, held, and shared rather than privatized. It is not simply proximity or network size. The critical function is unprompted visibility: do the people around you know what you're carrying without you having to perform it?
                </p>
                <p>
                  The clinical ground: Goldstein and colleagues (2018) demonstrated in an EEG hyperscanning study that empathic hand-holding during pain increased brain-to-brain coupling and correlated with analgesia magnitude. Another person's empathic presence literally changes the neural processing of pain. Niknejad and colleagues (2018) found in a meta-analysis that group-based pain interventions outperformed individual delivery. Community is an analgesic delivery mechanism.
                </p>
                <p>
                  In the Challenge, this is why sharing is part of the design. It is invited, not required. Joy experienced alone is good. Joy experienced at a table, witnessed by people who understand that laughter and pain can share the same breath, is medicine.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* CONDITION 4 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Condition 4: Build Your Heat Tolerance (Capacity)</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Capacity is the growing ability to hold pain alongside continued movement toward what matters. It is your window of tolerance expanding, gradually, because the conditions support it. It is not endurance. It is not "toughing it out."
                </p>
                <p>
                  The clinical ground: Steven Hayes' Acceptance and Commitment Therapy identifies psychological flexibility as the capacity to persist in valued behavior even in the presence of pain. Vlaeyen and Linton's graded exposure model demonstrates that systematic, voluntary re-engagement with feared activities updates the brain's threat predictions. The mechanism is identical to capsaicin desensitization: repeated, chosen exposure teaches the nervous system a new prediction.
                </p>
                <p>
                  In the Challenge, this is why we ask for seven days, not one. Day 1 is activation. Day 7 is capacity. The repetition is the point. You are teaching your nervous system that joy is safe, that the body that carries pain also carries the capacity for pleasure, and that both can coexist without one canceling the other.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* CONDITION 5 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Condition 5: Pass the Sauce (Generativity)</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Generativity is the multiply function. It is the act of sharing what you've made with someone who needs it. Your recipe for holding pain becomes someone else's starting point.
                </p>
                <p>
                  The clinical ground: Gruenewald, Liao, and Seeman (2012) found that greater self-perceptions of generativity predicted lower disability increases and lower mortality over a ten-year follow-up. Moieni and colleagues (2020) demonstrated that a generativity writing intervention changed pro-inflammatory gene expression. Contributing to others literally changes immune function.
                </p>
                <p>
                  In the Challenge, this is the #PassTheSauce moment. When you post what you did, when you tell someone what it felt like to experience joy while carrying pain, you are handing someone else an ingredient they didn't know existed. You are evidence that a spicy and delicious life is possible. And that evidence might be the thing that keeps someone from making the decision the professor made.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* THREE STRANDS DIVIDER */}
          <RevealSection>
            <div className="mx-auto my-16 h-[2px] w-[60px] bg-gold" />
            <p className="font-body text-[16px] leading-[1.8] text-[#2a2518]">
              These five conditions didn't emerge from a single discipline. They sit at the intersection of three bodies of knowledge that, when braided together, reveal something none contains alone.
            </p>
          </RevealSection>

          {/* STRAND 1 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Strand 1: Pain Neuroscience, How Pain Rewires the Brain</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Chronic pain is a learned state of the nervous system, not a signal that tissue is still damaged. Central sensitization (Woolf, 2011) amplifies neural signaling, producing pain that persists after the original injury has healed. The brain reorganizes itself: activity shifts from sensory circuits ("this hurts my body") to emotional circuits ("this threatens my self") (Hashmi et al., 2013). Chronic pain also dismantles the reward system itself, reducing the brain's capacity for pleasure at the synaptic level (Schwartz et al., 2014).
                </p>
                <p>
                  But here is the critical word in pain neuroscience: reversible. Central sensitization is a learned state. What was learned can be unlearned. The capsaicin receptor (TRPV1) proves this biologically: the same molecule that sensitizes the pain receptor also desensitizes it through repeated, voluntary exposure. The pepper teaches the nerve a new prediction.
                </p>
                <p>
                  This is why the Challenge works at the neurological level. Every act of chosen joy in the presence of pain is a prediction error. The nervous system expected threat. It received pleasure. Repeated enough times, the prediction updates.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* STRAND 2 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Strand 2: Positive Psychology, Why Joy Isn't Optional</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Barbara Fredrickson's broaden-and-build theory (1998, 2001) established that positive emotions build durable personal resources: social bonds, cognitive flexibility, physical resilience. Finan and Garland (2015) demonstrated that positive affect directly attenuates pain perception and reduces negative emotional reactivity to pain.
                </p>
                <p>
                  But the insight that matters most for the Challenge is this: low positive affect and high negative affect are independent constructs. A person whose depression has been treated but whose life contains no joy has not been moved from suffering to flourishing. They have been moved from suffering to languishing. And languishing, as Keyes (2002, 2010, 2012) demonstrated across multiple longitudinal studies, is itself a risk state. It predicts future mental illness, and the absence of flourishing predicts all-cause mortality.
                </p>
                <p>
                  The Bland quadrant of the Pepper-Sauce Matrix is not a resting place. It is the anteroom of suffering. The Challenge exists because thin sauce is not a neutral condition. It is a trajectory.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* STRAND 3 */}
          <RevealSection>
            <div className="mt-12">
              <ConditionHead>Strand 3: Black and Caribbean Cultural Wisdom, The Table Was Always There</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  Communities under maximal adversity built the technologies this science now describes. They just didn't call them clinical interventions. They called them the blues. Nine Night. Sunday dinner. The church. The kitchen table.
                </p>
              </div>

              <PullQuote>
                James Baldwin (1962) described the blues as craft: "the acceptance of this anguish one finds in the blues, and the expression of it, creates also, however odd this may sound, a kind of joy."
              </PullQuote>

              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  That sentence contains the entire coexistence model. The anguish is not eliminated. It is made articulate. And in the making, joy arrives alongside it. Alongside, not after. Alongside, not instead.
                </p>
                <p>
                  Albert Murray (1976) named the Saturday Night Function as a secular ritual equivalent to Sunday morning worship: the blues as an aesthetic device against suffering, community-administered, no clinician required. This is graded exposure in aesthetic form. It is communal joy as defiance. It is the Pepper Sauce Challenge, practiced every weekend for a hundred years before anyone wrote a research protocol about it.
                </p>
              </div>

              <PullQuote>
                The grandmother who made pepper sauce in a Barbadian kitchen, stirring in scotch bonnet alongside mustard and turmeric and vinegar, was not coping with the heat. She was making something with it. She was exercising agency over the recipe. She was doing it at a table surrounded by people who knew what the burn tasted like. She was building her tolerance through years of practice. And she was passing the sauce to the next generation.
                <span className="mt-4 block">
                  She was living all five conditions. Nobody had to teach her. The science is catching up to what she already knew.
                </span>
              </PullQuote>
            </div>
          </RevealSection>

          {/* THE BRAID (Closing) */}
          <RevealSection>
            <div className="mx-auto my-16 h-[2px] w-[60px] bg-gold" />
            <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
              <p>
                Pain neuroscience shows that chronic suffering is a learned state of the nervous system, reversible through exposure that updates predictions. Positive psychology shows that positive emotions build the resources needed to sustain that exposure, and that their absence is independently dangerous. Black cultural psychology shows that communities under the greatest adversity already built the technologies this integration describes.
              </p>
              <p>
                The Pepper Sauce Challenge braids all three. It asks you to do what the blues have always done: take the anguish that is real, hold it in community, apply craft and intention, and produce something that is, however odd it may sound, a kind of joy.
              </p>
              <p>
                You are not the first person to try this. You are joining a tradition that is centuries old, continents wide, and now backed by the same neuroscience that took this long to catch up.
              </p>
            </div>
          </RevealSection>

          {/* THE JOY PENALTY */}
          <RevealSection>
            <div className="mx-auto my-16 h-[2px] w-[60px] bg-gold" />
            <div className="mt-12">
              <ConditionHead>The Joy Penalty: Why This Challenge Takes Courage</ConditionHead>
              <div className="space-y-5 font-body text-[16px] leading-[1.8] text-[#2a2518]">
                <p>
                  There is a reason the Pepper Sauce Challenge is harder than it sounds, and it has nothing to do with willpower.
                </p>
                <p>
                  If you have been living with chronic pain, you have probably learned something that nobody taught you on purpose: showing joy is expensive. You laugh at a family gathering and someone says, "You seemed fine yesterday." You post a photo from a good day and an insurance reviewer uses it to question your claim. You show up looking strong and your doctor wonders if you really need that referral.
                </p>
                <p>
                  So you learn. You keep the joy quiet. You perform the pain instead. You dim what is bright in you so that what hurts in you will be believed.
                </p>
                <p>
                  The Pepper Sauce Principle calls this the Joy Penalty: the price people living with pain pay for daring to look like they feel good.
                </p>
                <p>
                  This is not a mindset problem. It is not negative thinking. It is a rational response to real consequences. Research shows that patients who display positive affect are rated as having less pain, receive less treatment, and are viewed with more suspicion by clinicians and loved ones alike (Chibnall & Tait, 1995; De Ruddere et al., 2011). Women's pain is more often dismissed as emotional or exaggerated (Samulowitz et al., 2018). Black patients' pain is systematically underestimated and undertreated (Hoffman et al., 2016). At the intersection of chronic pain, race, and gender, the penalty compounds. Show joy and your pain is doubted. Show stoicism and clinicians question whether you hurt as much as you say. Show distress and you are pathologized. There is no emotional expression that fully protects your credibility. The game is rigged.
                </p>
                <p>
                  Joy, anger, vulnerability, delight: all foreclosed.
                </p>
                <p>
                  The fear-avoidance model (Vlaeyen & Linton, 2000) is one of the most robust frameworks in pain psychology. It explains how fear of pain leads to avoidance of movement, which leads to disability and depression. The Joy Penalty extends this model into new territory: what happens when joy itself becomes the feared stimulus? When the avoidance is not of pain but of pleasure?
                </p>
                <p>
                  The answer: a flavorless life. For some, that means suffering: intense pain with nothing alongside it. For others, it means languishing: the pain may be manageable, but joy has quietly disappeared. Both live in the bottom half of the Pepper-Sauce Matrix. Both are linked to depression and worsening outcomes. And both need their sauce enriched. If the thinning has crossed from uncomfortable to unsafe, adding a healthcare professional to the recipe is the framework working as designed.
                </p>
                <p>
                  The Pepper Sauce Challenge is designed to push back against the Joy Penalty. Every act of defiant joy is a refusal to let the cost of showing pleasure be the thing that determines what your body gets to feel. It is not reckless. It is not denial. It is the deliberate, evidence-informed decision to add ingredients back into a recipe that the world has been thinning for you.
                </p>
                <p>
                  The grandmother at the kitchen table never asked permission to enjoy her food. The blues musician never waited for the audience to believe his pain before he played. They practiced joy in the presence of suffering because they understood something the clinical world is only now catching up to: suppressing joy does not make pain more credible. It makes life more scorching.
                </p>
                <p>
                  You deserve better than scorching.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* CLOSING LINE */}
          <RevealSection>
            <p className="mt-10 text-center font-accent text-[20px] italic text-gold">
              Pain is real. Joy is possible. The table was always there.
            </p>
          </RevealSection>

          {/* CTA */}
          <RevealSection>
            <div className="mt-12 text-center">
              <a
                href="/#seven-days"
                className="inline-block rounded-md bg-gold px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-dark transition-colors hover:bg-gold-light"
              >
                Take the Pepper Sauce Challenge
              </a>
              <p className="mt-4 font-body text-[14px] italic text-text-light">
                Seven days. Starts tonight.
              </p>
            </div>
          </RevealSection>

          {/* FINE PRINT */}
          <RevealSection>
            <div className="mx-auto mt-16 max-w-[560px] pt-10 text-center">
              <p className="font-body text-[15px] leading-[1.7] text-cream-mid">
                The Pepper Sauce Principle is an educational framework. It is not therapy, not a clinical intervention, and not a substitute for professional care. If the heat you're carrying has crossed from hurt to harm, adding a professional to your recipe is not a failure of the framework. It is the framework working as designed. Both. Always both.
              </p>
              <p className="mt-4 font-body text-[15px] leading-[1.7] text-cream-mid">
                For crisis support:{' '}
                <a href="tel:988" className="text-gold underline underline-offset-2 hover:text-gold-light">
                  988 Suicide and Crisis Lifeline (call or text 988)
                </a>{' '}
                |{' '}
                <a href="sms:741741&body=HOME" className="text-gold underline underline-offset-2 hover:text-gold-light">
                  Crisis Text Line (text HOME to 741741)
                </a>
              </p>
            </div>
          </RevealSection>

        </article>
      </main>
      <Footer />
    </>
  );
};

export default GoDeeper;
