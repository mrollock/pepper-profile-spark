import { RevealSection } from '@/components/RevealSection';

const SCIENCE_SOURCES = [
  {
    author: 'Paul Rozin et al.',
    work: '\u201CGlad to Be Sad, and Other Examples of Benign Masochism\u201D',
    detail: 'Judgment and Decision Making, Vol. 8, No. 4 (2013), pp. 439\u2013447. University of Pennsylvania.',
    psp: 'Scientific foundation for the entire metaphor. Humans are the only species that deliberately seeks out capsaicin burn \u2014 the largest \u201Cexposure therapy\u201D in human history, community-administered, no clinician required. Maps to Condition 2: Choose Your Recipe.',
    link: 'https://doi.org/10.1017/s1930297500005295',
    linkText: 'Read the paper',
  },
  {
    author: 'Naomi I. Eisenberger',
    work: '\u201CThe Neural Bases of Social Pain\u201D',
    detail: 'Psychosomatic Medicine, 74(2), 126\u2013135 (2012). Also: Nature Reviews Neuroscience, 13, 421\u2013434 (2012). UCLA.',
    psp: 'Social rejection activates the same neural regions (dACC, anterior insula) as physical pain. The brain doesn\u2019t distinguish between a broken bone and a broken bond \u2014 which is why the framework addresses all pain, not just physical.',
    link: 'https://doi.org/10.1097/PSY.0b013e3182464dd1',
    linkText: 'Read the paper',
  },
  {
    author: 'Brandon C. Yarns et al.',
    work: 'Emotional Awareness and Expression Therapy vs. CBT for Chronic Pain',
    detail: 'JAMA Network Open, 7, e2415842 (2024). VA Greater Los Angeles. 63% clinically significant pain reduction vs. 17% for CBT.',
    psp: 'Changing the emotional conditions alongside pain changes pain\u2019s impact \u2014 the Pepper Sauce Principle\u2019s central thesis, validated in a randomized controlled trial. Baldwin described this mechanism in 1964. The clinical trial arrived in 2024.',
    link: 'https://doi.org/10.1001/jamanetworkopen.2024.15842',
    linkText: 'Read the paper',
  },
  {
    author: 'Pavel Goldstein et al.',
    work: '\u201CBrain-to-Brain Coupling During Handholding\u201D',
    detail: 'PNAS, 115, E2528\u2013E2537 (2018). Partner hand-holding during pain increased inter-brain neural synchrony; touch restored what pain disrupted.',
    psp: 'Social connection is not distraction \u2014 it\u2019s a neurobiologically distinct analgesic pathway. The brain literally synchronizes with someone who is present in your pain. Maps to Condition 3: Come to the Table.',
    link: 'https://doi.org/10.1073/pnas.1703643115',
    linkText: 'Read the paper',
  },
  {
    author: 'He et al.',
    work: 'Spicy Food Consumers and Pain Processing',
    detail: 'Social Cognitive and Affective Neuroscience (2025). N=300 survey + N=45 neuroimaging. Habitual spicy food consumers showed reduced pain-related neural amplitudes (N1, P2 on EEG).',
    psp: 'The brain literally rewires through graduated engagement with the burn. Not willpower \u2014 neuroplasticity. Maps to Condition 4: Build Your Heat Tolerance.',
    link: 'https://doi.org/10.1093/scan/nsaf040',
    linkText: 'Read the paper',
  },
  {
    author: 'Ferris et al.',
    work: '\u201CBenign Masochism in the Wild\u201D',
    detail: 'Journal of Positive Psychology (June 2025). N=343 across two longitudinal studies. First field demonstration that shared aversive experiences produce social bonding \u2014 but only when pleasure coexists with pain.',
    psp: 'Community (Condition 3) works only when pain and pleasure are both present. Pain alone doesn\u2019t bond. The coexistence is the mechanism.',
    link: 'https://doi.org/10.1080/17439760.2025.2512810',
    linkText: 'Read the paper',
  },
  {
    author: 'C. Nathan DeWall et al.',
    work: '\u201CAcetaminophen Reduces Social Pain\u201D',
    detail: 'Psychological Science, 21(7), 931\u2013937 (2010). Three weeks of acetaminophen reduced self-reported hurt feelings and attenuated social-pain neural activation.',
    psp: 'The same drug that treats headaches reduces heartache. Physical and social pain share pharmacological substrates \u2014 which is why Condition 1 (validation) applies to all pain, not just the kind with a diagnosis code.',
    link: 'https://doi.org/10.1177/0956797610374741',
    linkText: 'Read the paper',
  },
  {
    author: 'Kelly M. Hoffman et al.',
    work: '\u201CRacial Bias in Pain Assessment and Treatment\u201D',
    detail: 'PNAS, 113(16), 4296\u20134301 (2016). 50% of white medical trainees endorsed false beliefs about biological differences between Black and white bodies. Those who did rated Black patients\u2019 pain lower.',
    psp: 'When Condition 1 (The Pepper Is Real) is systematically withheld \u2014 when your pain isn\u2019t believed \u2014 suffering follows. This is not a metaphor for Black patients. It\u2019s measured.',
    link: 'https://doi.org/10.1073/pnas.1516047113',
    linkText: 'Read the paper',
  },
  {
    author: 'Robin I.M. Dunbar',
    work: '\u201CBreaking Bread: The Functions of Social Eating\u201D',
    detail: 'Adaptive Human Behavior and Physiology (2017). People who eat socially more frequently feel happier, more satisfied, more trusting. Causal direction runs from eating together to bondedness.',
    psp: '\u201CCome to the Table\u201D isn\u2019t a metaphor \u2014 eating together produces measurable social bonding through endogenous opioid release. The shared meal is one of humanity\u2019s oldest technologies for holding pain in community.',
    link: 'https://doi.org/10.1007/s40750-017-0061-4',
    linkText: 'Read the paper',
  },
  {
    author: 'Arline T. Geronimus et al.',
    work: '\u201C\u201CWeathering\u201D and Age Patterns of Allostatic Load\u201D',
    detail: 'American Journal of Public Health, 96(5), 826\u2013833 (2006). By age 45, 50% of Black women had high allostatic load. Mean allostatic load for Black adults comparable to white adults 10 years older.',
    psp: 'When all five conditions are systematically withheld across a lifetime \u2014 when pain is invalidated, agency is constrained, community is disrupted \u2014 the body keeps score. Weathering is what happens without the recipe.',
    link: 'https://doi.org/10.2105/AJPH.2004.060749',
    linkText: 'Read the paper',
  },
  {
    author: 'Gao et al.',
    work: '\u201CTRPV1: Dual Role in Pain and Analgesia\u201D',
    detail: 'Frontiers in Molecular Neuroscience (2024). The identical receptor (TRPV1) produces pain amplification OR pain elimination depending on context. Capsaicin and anandamide \u2014 the \u201Cbliss molecule\u201D \u2014 bind the same site.',
    psp: 'Coexistence at the molecular level. Pain and pleasure share the same receptor through distinguishable structural pathways. The signal doesn\u2019t change \u2014 the context changes.',
    link: 'https://doi.org/10.3389/fnmol.2024.1400118',
    linkText: 'Read the paper',
  },
  {
    author: 'Lv, J. et al.',
    work: '\u201CSpicy Food Consumption and Total Mortality\u201D',
    detail: 'BMJ, 351, h3942 (2015). N=487,375. Eating spicy food 6\u20137 days per week associated with 14% relative risk reduction in total mortality. Replicated by Chopan & Littenberg (PLoS ONE, 2017, N=16,179).',
    psp: 'Two billion people choosing the burn isn\u2019t just preference \u2014 it\u2019s associated with living longer. Correlation, not causation. But the consistency across populations is remarkable.',
    link: 'https://doi.org/10.1136/bmj.h3942',
    linkText: 'Read the paper',
  },
  {
    author: 'Andr\u00E9 Bussi\u00E8res et al.',
    work: 'Adverse Childhood Experiences and Chronic Pain in Adulthood',
    detail: 'European Journal of Psychotraumatology, 14(2), 2284025 (2023). 85 studies, 826,452 adults. Childhood adversity (abuse, neglect, household dysfunction) increases odds of adult chronic pain by 45%. Dose-response: risk nearly doubles with 4+ ACEs (aOR 1.95).',
    psp: 'Emotional pain doesn\u2019t just feel like physical pain \u2014 it becomes physical pain. When Condition 1 (The Pepper Is Real) is withheld in childhood, the body carries the debt forward as chronic pain decades later. The framework\u2019s refusal to distinguish types of pain is not philosophical. It\u2019s empirical.',
    link: 'https://doi.org/10.1080/20008066.2023.2284025',
    linkText: 'Read the paper',
  },
  {
    author: 'Dhaneesha N.S. Senaratne et al.',
    work: 'Adverse Childhood Experiences and Multimorbidity',
    detail: 'BMC Medicine, 22, 315 (2024). 25 studies, 372,162 participants. Dose-response meta-analysis: every additional ACE increases multimorbidity odds by 12.9%. Nearly half of all people (48.1%) have experienced at least one ACE.',
    psp: 'Pain without the five conditions doesn\u2019t stay in one place \u2014 it metastasizes. Each unprocessed adversity compounds the next. This is what happens when there is no recipe, no table, no one to validate the burn.',
    link: 'https://doi.org/10.1186/s12916-024-03505-w',
    linkText: 'Read the paper',
  },
  {
    author: 'Fan Wang et al.',
    work: 'Social Isolation, Loneliness and Mortality',
    detail: 'Nature Human Behaviour, 7(8), 1307\u20131319 (2023). 90 cohort studies, 2,205,199 individuals. Social isolation increases all-cause mortality risk by 32% and CVD mortality by 34%. Loneliness independently increases mortality risk by 14%.',
    psp: '\u201CCome to the Table\u201D is a survival mechanism, not a metaphor. When Condition 3 is absent \u2014 when pain is processed alone \u2014 the mortality effect is comparable to smoking 15 cigarettes a day. The table isn\u2019t optional.',
    link: 'https://doi.org/10.1038/s41562-023-01617-6',
    linkText: 'Read the paper',
  },
  {
    author: 'Naomi Priest et al.',
    work: 'Racism and Health in Children and Youth: Biomarker Meta-Analysis',
    detail: 'Social Science & Medicine, 361, 117324 (2024). 463 studies screened; 42 in biomarker meta-analysis. Racism significantly associated with elevated CRP, IL-6, cortisol, blood pressure, BMI, and asthma in children and youth aged 0\u201324.',
    psp: 'The pain of racism doesn\u2019t wait for adulthood to become physical. By the time a child reaches your waiting room, their C-reactive protein has already been taking notes. \u201CThe Pepper Is Real\u201D must include the peppers no one prescribed \u2014 the ones society administers.',
    link: 'https://doi.org/10.1016/j.socscimed.2024.117324',
    linkText: 'Read the paper',
  },
];

const VOICES = [
  {
    name: 'Audre Lorde',
    work: 'Sister Outsider (1984)',
    desc: 'Caribbean-heritage Black woman (Grenadian parents) who drew the line between pain and suffering decades before ACT or trauma-informed care. Her word \u201Cunmetabolized\u201D \u2014 pain that hasn\u2019t been digested, hasn\u2019t been cooked \u2014 is the framework\u2019s philosophical spine.',
    psp: 'The pain/suffering distinction. \u201CUnmetabolized pain\u201D = pain without the five conditions.',
    link: 'https://www.penguinrandomhouse.com/books/198292/sister-outsider-by-audre-lorde/',
    linkText: 'The book',
  },
  {
    name: 'James Baldwin',
    work: '\u201CThe Uses of the Blues\u201D (1964)',
    desc: 'In a lecture at Monterey Peninsula College, Baldwin named the blues as a technology for craft \u2014 \u201Cthe acceptance of this anguish\u2026 creates also, however odd this may sound, a kind of joy.\u201D The word \u201Ccraft\u201D is the hinge. He described EAET sixty years before the clinical trial.',
    psp: 'Condition 2 \u2014 Choose Your Recipe. Pain as material for making, not just enduring.',
    link: 'https://www.penguinrandomhouse.com/books/7596/the-cross-of-redemption-by-james-baldwin/',
    linkText: 'Collected in The Cross of Redemption',
  },
  {
    name: 'bell hooks',
    work: 'All About Love: New Visions (2000)',
    desc: 'Nine words: \u201CRarely, if ever, are any of us healed in isolation. Healing is an act of communion.\u201D The word \u201Ccommunion\u201D does double duty \u2014 clinical and spiritual \u2014 landing differently for therapists and pastors, but landing for both.',
    psp: 'Condition 3 \u2014 Come to the Table. Community as mechanism, not decoration.',
    link: 'https://www.harpercollins.com/products/all-about-love-bell-hooks',
    linkText: 'The book',
  },
  {
    name: 'Derek Walcott',
    work: 'Nobel Lecture: \u201CThe Antilles: Fragments of Epic Memory\u201D (1992)',
    desc: 'St. Lucian Nobel laureate: \u201CBreak a vase, and the love that reassembles the fragments is stronger than that love which took its symmetry for granted when it was whole.\u201D The literary capsaicin paradox \u2014 breakage as the beginning of stronger reassembly.',
    psp: 'The three-generation arc. Caribbean voice on diasporic restoration.',
    link: 'https://www.nobelprize.org/prizes/literature/1992/walcott/lecture/',
    linkText: 'Read the Nobel Lecture',
  },
  {
    name: 'Viktor Frankl',
    work: 'Man\u2019s Search for Meaning (1946)',
    desc: 'Not the famous quote. The lesser-known passage: suffering fills whatever chamber it occupies, \u201Cno matter whether the suffering is great or little.\u201D A man who survived Auschwitz demolishing the hierarchy of pain \u2014 giving permission to take your own burn seriously.',
    psp: 'Condition 1 \u2014 The Pepper Is Real. Your pain fills your whole experience. That\u2019s enough.',
    link: 'https://www.penguinrandomhouse.com/books/76788/mans-search-for-meaning-by-viktor-e-frankl/',
    linkText: 'The book',
  },
  {
    name: 'Resmaa Menakem',
    work: 'My Grandmother\u2019s Hands (2017)',
    desc: 'Black somatic therapist trained with van der Kolk and Levine. \u201CClean pain hurts like hell. But it enables our bodies to grow\u2026 Dirty pain is the pain of avoidance, blame, and denial.\u201D Clean pain = controlled burn. Dirty pain = swallowing the raw pepper.',
    psp: 'Condition 4 \u2014 Build Your Heat Tolerance. His word \u201Cmetabolizes\u201D echoes the food metaphor exactly.',
    link: 'https://www.penguinrandomhouse.com/books/561932/my-grandmothers-hands-by-resmaa-menakem/',
    linkText: 'The book',
  },
  {
    name: 'Lucille Clifton',
    work: '\u201Cwon\u2019t you celebrate with me\u201D \u2014 The Book of Light (1993)',
    desc: 'Fourteen lines. No capital letters \u2014 no capital permission needed. \u201CSomething has tried to kill me / and has failed.\u201D The poem doesn\u2019t argue for both/and. It performs it. The word \u201Cshaped\u201D echoes the cook, the potter, the craftsperson.',
    psp: 'The Both/And. A life that holds destruction and celebration simultaneously.',
    link: 'https://www.poetryfoundation.org/poems/50974/wont-you-celebrate-with-me',
    linkText: 'Read the poem',
  },
  {
    name: 'Howard Thurman',
    work: 'Jesus and the Disinherited (1949)',
    desc: 'The book Martin Luther King Jr. carried during the Montgomery Bus Boycott: \u201CNo external force, however great and overwhelming, can at long last destroy a people if it does not first win the victory of the spirit against them.\u201D You cannot defund a grandmother\u2019s kitchen.',
    psp: 'The Undismantleable. The five conditions are not programs that can be cut. They are cultural practices that endure.',
    link: 'https://www.penguinrandomhouse.com/books/321921/jesus-and-the-disinherited-by-howard-thurman/',
    linkText: 'The book',
  },
];

const BOOKSHELF = [
  {
    title: 'The Cooking Gene',
    authorLine: 'Michael W. Twitty \u00B7 Amistad/HarperCollins, 2017 \u00B7 James Beard Book of the Year',
    desc: '\u201CIn memory there is resurrection, and thus the end goal of my cooking is just that \u2014 resurrection.\u201D Twitty connects African, Caribbean, and Southern foodways as one continuous tradition. His thesis \u2014 that food is an archive of survival, that healing comes from embracing discomfort, that emotions are literally ingredients \u2014 maps to every condition.',
    psp: 'Condition 5 \u2014 Pass the Sauce. Every handed-down recipe is an act of keeping the dead alive.',
    link: 'https://www.harpercollins.com/products/the-cooking-gene-michael-w-twitty',
    linkText: 'The book',
  },
  {
    title: 'Hot Stuff: A Cookbook in Praise of the Piquant',
    authorLine: 'Jessica B. Harris \u00B7 1985 \u00B7 James Beard Lifetime Achievement Award',
    desc: 'The godmother of African American food writing. Her first book was literally about hot stuff. She describes her life\u2019s work as \u201Ccontinuation, bridge, link-in-the-chain\u201D \u2014 modeling the generational transmission the framework commissions. Also: High on the Hog (2011), adapted into a Netflix documentary.',
    psp: 'Condition 5 \u2014 Pass the Sauce. A career as bridge between what came before and what comes next.',
    link: 'https://www.jessicabharris.com/',
    linkText: 'Her work',
  },
  {
    title: 'Notes from a Young Black Chef',
    authorLine: 'Kwame Onwuachi \u00B7 Knopf, 2019 \u00B7 James Beard Award Winner',
    desc: '\u201CWhat makes a professional chef is that he or she has\u2026 withstood the pain of the process.\u201D Standing in the Smithsonian: \u201Cfreedom and blood, progress and pain, voices raised and voices silenced, courage\u2026 I\u2019m standing on stories, and this is my own.\u201D',
    psp: 'Condition 4 \u2014 Build Your Heat Tolerance. Professionalism as graded exposure until pain becomes technique.',
    link: 'https://www.penguinrandomhouse.com/books/592828/notes-from-a-young-black-chef-by-kwame-onwuachi/',
    linkText: 'The book',
  },
  {
    title: 'Hurts So Good: The Science and Culture of Pain on Purpose',
    authorLine: 'Leigh Cowart \u00B7 PublicAffairs, 2021',
    desc: 'Investigates everything from competitive eating to ultramarathons to BDSM \u2014 humans who deliberately seek out pain. Key finding for the framework: collective pain experiences create less individual pain than solo ones. Shared suffering bonds; solitary suffering isolates.',
    psp: 'Condition 3 \u2014 Come to the Table. Also Condition 4 \u2014 the \u201Cbiohacking\u201D of pain through graduated engagement.',
    link: 'https://www.publicaffairsbooks.com/titles/leigh-cowart/hurts-so-good/9781541798045/',
    linkText: 'The book',
  },
  {
    title: '\u201CHot Sauce in Her Bag\u201D (essay)',
    authorLine: 'Mikki Kendall \u00B7 Eater, 2016 \u00B7 Best Food Essay, Association of Food Journalists',
    desc: 'Traced the practice of Black people carrying hot sauce to the Jim Crow era \u2014 when segregated dining meant bringing your own condiments. Hot sauce went from being imposed (slavery), to carried out of necessity (Jim Crow), to claimed as identity (Beyonc\u00E9\u2019s \u201CFormation\u201D). That arc is the journey from pain-as-punishment to pain-as-ingredient.',
    psp: 'The cultural history of Condition 2 \u2014 agency over your own experience. You carry the seasoning because you refuse to eat bland.',
    link: 'https://www.eater.com/2016/4/28/11519688/beyonce-hot-sauce-lemonade',
    linkText: 'Read the essay',
  },
  {
    title: 'Soul Food: The Surprising Story of an American Cuisine, One Plate at a Time',
    authorLine: 'Adrian Miller \u00B7 University of North Carolina Press, 2013 \u00B7 James Beard Award',
    desc: 'Documented how enslaved people\u2019s kitchens became classrooms, chapels, and community centers \u2014 and how cayenne and hot pepper concoctions were part of the foodways from the beginning. The historical bedrock for understanding food as cultural technology.',
    psp: 'The kitchen as the original site of all five conditions \u2014 practiced for centuries, unnamed until now.',
    link: 'https://uncpress.org/book/9781469607689/soul-food/',
    linkText: 'The book',
  },
];

export function RootsResearchSection() {
  return (
    <>
      {/* ===== THE SCIENCE ===== */}
      <section
        id="roots"
        className="sec-dark relative overflow-hidden py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
        style={{ background: 'hsl(var(--dark))' }}
      >
        <div className="mx-auto max-w-[var(--wide-max)]">
          <RevealSection>
            <p className="mb-4 text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              Roots &amp; Research
            </p>
            <h2 className="text-center text-cream">The Ingredients Behind the Framework</h2>
          </RevealSection>

          <RevealSection>
            <div className="roots-intro">
              <p>
                <span className="font-semibold text-gold-light">The Pepper Sauce Principle</span> didn&rsquo;t emerge from thin air. It stands on peer-reviewed neuroscience, a century of Black literary and cultural wisdom, and a growing body of evidence that what determines whether we suffer is not the pain &mdash; physical, emotional, racial, inherited &mdash; but what surrounds it. And for too many people, what surrounds their pain is silence, disbelief, or nothing at all. This framework doesn&rsquo;t ask anyone to push through. It asks what would happen if no one had to build a life around pain alone &mdash; if the right ingredients were finally in reach. No single source contains it, because no one had assembled these ingredients into one recipe before. Here&rsquo;s what&rsquo;s in the bottle.
              </p>
            </div>
          </RevealSection>

          <div className="source-category">
            <RevealSection>
              <p className="source-cat-label">Stream One</p>
              <h3 className="source-cat-title">The Science</h3>
              <p className="source-cat-desc">
                Peer-reviewed research in pain neuroscience, psychology, social bonding, and the health consequences of adversity, racism, and isolation that provides the clinical foundation for the five conditions.
              </p>
            </RevealSection>

            <div className="source-grid">
              {SCIENCE_SOURCES.map((s, i) => (
                <RevealSection key={i} delay={(i % 2) * 100}>
                  <div className="source-entry">
                    <p className="source-entry-author">{s.author}</p>
                    <p className="source-entry-work">{s.work}</p>
                    <p className="source-entry-detail"><em>{s.detail}</em></p>
                    <p className="source-entry-psp"><strong>Framework connection:</strong> {s.psp}</p>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="source-link">{s.linkText}</a>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>

          <RevealSection>
            <p className="roots-note-dark">
              <span className="font-semibold text-gold-light">The Pepper Sauce Principle</span> is a synthesis framework, not a clinical protocol. The research above informs the framework&rsquo;s structure &mdash; but the ancestral wisdom came first. The science is catching up.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ===== THE VOICES ===== */}
      <section
        id="voices"
        className="py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
        style={{ background: 'hsl(var(--cream-soft))' }}
      >
        <div className="mx-auto max-w-[var(--wide-max)]">
          <RevealSection>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              Stream Two
            </p>
            <h2 className="text-text-body">The Voices</h2>
            <p className="mb-2 text-[0.88rem] leading-[1.65] text-text-light" style={{ maxWidth: 650 }}>
              These writers, thinkers, and cultural architects were practicing what the framework names &mdash; generations before the clinical field had language for it. Their work is not cited as evidence. It is honored as precedent.
            </p>
          </RevealSection>

          <div className="voice-grid">
            {VOICES.map((v, i) => (
              <RevealSection key={i} delay={(i % 2) * 100}>
                <div className="voice-card">
                  <p className="voice-card-name">{v.name}</p>
                  <p className="voice-card-work">{v.work}</p>
                  <p className="voice-card-desc">{v.desc}</p>
                  <p className="voice-card-psp"><strong>Framework anchor:</strong> {v.psp}</p>
                  <a href={v.link} target="_blank" rel="noopener noreferrer" className="voice-link">{v.linkText}</a>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="roots-note">
              These voices span Caribbean diaspora, Black literary tradition, clinical psychology, Black feminist thought, and Black theology. Their chronological range runs from 1946 to 2017. Each one was selected because removing it would leave a hole no other voice could fill.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ===== THE BOOKSHELF ===== */}
      <section
        id="bookshelf"
        className="sec-dark relative overflow-hidden py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]"
        style={{ background: 'hsl(var(--dark))' }}
      >
        <div className="mx-auto max-w-[var(--wide-max)]">
          <RevealSection>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              Stream Three
            </p>
            <h2 className="text-cream">The Bookshelf</h2>
            <p className="mb-8 text-[0.88rem] leading-[1.65] text-cream-mid" style={{ maxWidth: 650 }}>
              The cultural history and food scholarship that prove the framework&rsquo;s ingredients have been on the table for centuries. These aren&rsquo;t footnotes &mdash; they&rsquo;re the ancestral record.
            </p>
          </RevealSection>

          {BOOKSHELF.map((b, i) => (
            <RevealSection key={i}>
              <div className="book-entry">
                <div className="book-entry-spine" />
                <div className="book-entry-content">
                  <p className="book-entry-title">{b.title}</p>
                  <p className="book-entry-author-line">{b.authorLine}</p>
                  <p className="book-entry-desc">{b.desc}</p>
                  <p className="book-entry-psp"><strong>Framework connection:</strong> {b.psp}</p>
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="source-link">{b.linkText}</a>
                </div>
              </div>
            </RevealSection>
          ))}

          <div className="source-divider" />

          <RevealSection>
            <div style={{ textAlign: 'center' }}>
              <p className="mx-auto mb-4 max-w-[560px] font-accent text-[clamp(1.1rem,2vw,1.35rem)] italic leading-[1.4] text-gold">
                No prominent voice had explicitly made the bridge that <span className="font-semibold text-gold-light">The Pepper Sauce Principle</span> makes: hot sauce as a systematic framework for living with pain.
              </p>
              <p className="mx-auto max-w-[520px] text-[0.88rem] text-cream-mid">
                The science exists in one literature. The cultural wisdom exists in another. The psychology of voluntarily engaging with pain exists in a third. None of them name the conditions that determine whether pain becomes suffering &mdash; or an ingredient in a life worth savoring. This framework is the recipe that brings them together.
              </p>
            </div>
          </RevealSection>

          <RevealSection>
            <p className="roots-note-dark">
              This is a living bibliography. As the framework develops into a book, certification program, and national speaking practice, the sources above will be expanded with full academic citations. For inquiries about the research foundation,{' '}
              <a href="#connect" className="text-gold underline">contact Dr. Rollock</a>.
            </p>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
