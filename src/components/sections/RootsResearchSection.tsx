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
    author: 'Corey L.M. Keyes',
    work: '\u201CThe Mental Health Continuum: From Languishing to Flourishing in Life\u201D',
    detail: 'Journal of Health and Social Behavior, 43(2), 207\u2013222 (2002). Also: Keyes, Dhingra, & Simoes, American Journal of Public Health, 100(12), 2366\u20132371 (2010); Keyes & Simoes, American Journal of Public Health, 102(11), 2164\u20132172 (2012). Emory University.',
    psp: 'Structural precedent for the Pepper-Sauce Matrix. Keyes proved that mental illness and mental health are independent dimensions, not opposite ends of one scale. You can carry a diagnosis and still be thriving. You can have no diagnosis and feel hollow. The Matrix applies this same two-axis architecture to pain. The Bland quadrant is Keyes\u2019 \u201Clanguishing\u201D applied to the pain domain\u2026 not a neutral resting state, but a risk trajectory. Languishing predicted major depression at six times the rate of flourishing, and predicted all-cause mortality over ten years.',
    link: 'https://doi.org/10.2307/3090197',
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
  // New entries below
  {
    author: 'Barbara L. Fredrickson',
    work: '\u201CThe Role of Positive Emotions in Positive Psychology: The Broaden-and-Build Theory\u201D',
    detail: 'American Psychologist, 56(3), 218\u2013226 (2001). Also: Fredrickson, Review of General Psychology, 2(3), 300\u2013319 (1998). University of North Carolina at Chapel Hill.',
    psp: 'Core mechanism of the framework\u2019s second scientific strand. Positive emotions\u2026 joy, interest, contentment, love\u2026 broaden the range of thoughts and actions that come to mind and build durable personal resources over time. This is how the sauce works at the neural and behavioral level. The positivity ratio was debunked. The core theory stands. PSP draws on the resource-building mechanism specifically, which remains well-supported.',
    link: 'https://doi.org/10.1037/0003-066X.56.3.218',
    linkText: 'Read the paper',
  },
  {
    author: 'Clifford J. Woolf',
    work: '\u201CCentral Sensitization: Implications for the Diagnosis and Treatment of Pain\u201D',
    detail: 'Pain, 152(3 Suppl), S2\u2013S15 (2011). Harvard Medical School / Boston Children\u2019s Hospital.',
    psp: 'Central sensitization\u2026 amplified neural signaling within the CNS that produces pain hypersensitivity\u2026 is a learned state of the nervous system. Not structural damage. The critical word is reversible. If chronic suffering is a learned neural pattern, then the conditions that promote unlearning (graded exposure, positive affect, communal processing) have a specifiable neurobiological target. This is the foundation of the framework\u2019s first scientific strand.',
    link: 'https://doi.org/10.1016/j.pain.2010.09.030',
    linkText: 'Read the paper',
  },
  {
    author: 'Johan W.S. Vlaeyen & Steven J. Linton',
    work: '\u201CFear-Avoidance and Its Consequences in Chronic Musculoskeletal Pain\u201D',
    detail: 'Pain, 85(3), 317\u2013332 (2000). KU Leuven / \u00D6rebro University. Replicated across 335 studies and 65,340 participants in Rogers & Farris\u2019s 2022 meta-analysis.',
    psp: 'The cognitive engine that drives pain from acute to chronic. Pain perceived as threatening triggers catastrophizing, which triggers avoidance, which triggers disuse and deconditioning, which amplifies pain. The world gets smaller. The sauce gets thinner. The heat stays the same or rises. This model is also the structural basis for the Joy Penalty: fear-avoidance of joy operates through the identical mechanism.',
    link: 'https://doi.org/10.1016/S0304-3959(99)00242-0',
    linkText: 'Read the paper',
  },
  {
    author: 'Patrick H. Finan & Eric L. Garland',
    work: '\u201CThe Role of Positive Affect in Pain and Its Treatment\u201D',
    detail: 'The Clinical Journal of Pain, 31(2), 177\u2013187 (2015). Johns Hopkins / University of Utah.',
    psp: 'The most direct evidence for the Y-axis of the Matrix. Higher positive affect attenuates both pain perception and the negative affective response to it. In chronic pain cohorts, higher daily positive affect predicts lower pain intensity and better physical functioning. Low positive affect and high negative affect are not the same construct, do not share the same predictors, and do not respond to the same interventions. A person whose distress has been treated but whose joy remains depleted has moved from Scorching to Bland. They are no longer in crisis. They are languishing.',
    link: 'https://doi.org/10.1097/AJP.0000000000000092',
    linkText: 'Read the paper',
  },
  {
    author: 'Anna J. Machin & Robin I.M. Dunbar',
    work: '\u201CThe Brain Opioid Theory of Social Attachment\u201D',
    detail: 'Behaviour, 148(9\u201310), 985\u20131025 (2011). University of Oxford.',
    psp: 'The endogenous opioid system\u2026 especially \u03B2-endorphins acting on \u03BC-opioid receptors\u2026 mediates the pleasurable feelings of social affiliation. Social connection literally activates the same opioid system that suppresses pain. Community is not a contextual preference. It is an analgesic delivery mechanism. Maps to Condition 3: Come to the Table.',
    link: 'https://doi.org/10.1163/000579511X596624',
    linkText: 'Read the paper',
  },
  {
    author: 'Behnood Niknejad et al.',
    work: '\u201CPsychological Interventions and Chronic Pain Outcomes in Older Adults\u201D',
    detail: 'JAMA Internal Medicine, 178(6), 830\u2013839 (2018). Johns Hopkins.',
    psp: 'Group-based pain interventions outperformed individual delivery. Mode of therapy\u2026 group versus individual\u2026 showed the only consistent moderating effect on pain intensity outcomes. The table is not optional. It is where the medicine works best. Maps to Condition 3: Come to the Table.',
    link: 'https://doi.org/10.1001/jamainternmed.2018.0756',
    linkText: 'Read the paper',
  },
  {
    author: 'Tara L. Gruenewald et al. / Mona Moieni et al.',
    work: '\u201CGenerativity, Health, and Gene Expression\u201D',
    detail: 'Gruenewald, Liao, & Seeman, Journals of Gerontology, Series B, 67(6), 660\u2013665 (2012). Moieni et al., Brain, Behavior, and Immunity, 84, 131\u2013138 (2020). UCLA.',
    psp: 'Older adults with greater self-perceptions of generativity were less likely to become disabled or die over a ten-year follow-up. A six-week generativity writing intervention\u2026 simply sharing life experiences and advice\u2026 reversed pro-inflammatory gene expression associated with chronic stress. Sharing the sauce changes your biology. Generativity is not a luxury that comes after healing. It is an ingredient that participates in healing. Maps to Condition 5: Pass the Sauce.',
    link: 'https://doi.org/10.1093/geronb/gbs034',
    linkText: 'Read the Gruenewald paper',
  },
  {
    author: 'Javad A. Hashmi et al.',
    work: '\u201CShape Shifting Pain: Chronification of Back Pain Shifts Brain Representation\u201D',
    detail: 'Brain, 136(9), 2751\u20132768 (2013). Northwestern University.',
    psp: 'When pain becomes chronic, brain activity migrates from sensory-processing regions to emotional circuitry. Pain chronification is not the persistence of tissue damage. It is a reorganization of brain representation from \u201Cthis hurts my body\u201D to \u201Cthis threatens my self.\u201D This is why the five conditions\u2026 which address emotional, social, and meaning-making contexts\u2026 are central to pain treatment, not supplementary.',
    link: 'https://doi.org/10.1093/brain/awt211',
    linkText: 'Read the paper',
  },
  {
    author: 'Cheryl L. Woods-Giscomb\u00E9',
    work: '\u201CSuperwoman Schema: African American Women\u2019s Views on Stress, Strength, and Health\u201D',
    detail: 'Qualitative Health Research, 20(5), 668\u2013683 (2010). University of North Carolina at Chapel Hill.',
    psp: 'Five dimensions of the Superwoman Schema\u2026 obligation to present strength, suppress emotions, resist vulnerability, succeed despite limited resources, prioritize caregiving\u2026 function as culturally transmitted fear-avoidance. When you add the Joy Penalty (display joy, lose credibility), the only approved performance for Black women in pain is stoic endurance. No permissible space for joy. The framework\u2019s defiant joy is the direct intervention against this double bind.',
    link: 'https://doi.org/10.1177/1049732310361892',
    linkText: 'Read the paper',
  },
  {
    author: 'George M. Slavich & Michael R. Irwin',
    work: '\u201CFrom Stress to Inflammation and Major Depressive Disorder\u201D',
    detail: 'Psychological Bulletin, 140(3), 774\u2013815 (2014). UCLA.',
    psp: 'Social threats upregulate the Conserved Transcriptional Response to Adversity, promoting inflammation that increases pain sensitivity. Adversity becomes embedded in physiology. This is the molecular mechanism by which invalidation and isolation literally get under the skin. The generativity intervention (Moieni et al., 2020) reversed this signature\u2026 meaning Pass the Sauce has documented gene-expression-level effects.',
    link: 'https://doi.org/10.1037/a0035302',
    linkText: 'Read the paper',
  },
  {
    author: 'Mark A. Lumley & Howard Schubiner',
    work: '\u201CEmotional Awareness and Expression Therapy for Chronic Pain\u201D',
    detail: 'Current Rheumatology Reports, 21, 30 (2019). Wayne State University.',
    psp: 'EAET is the negative-valence complement to PSP\u2019s positive-valence architecture. EAET works downward into suppressed emotional material\u2026 trauma, grief, rage. PSP works upward into independently absent positive conditions\u2026 joy, community, agency, generativity. Neither claims to remove the pepper. Both change the sauce. They attend to different ingredients. Together, they approximate what the Blues have always done: process anguish AND produce joy simultaneously.',
    link: 'https://doi.org/10.1007/s11926-019-0829-6',
    linkText: 'Read the paper',
  },
  {
    author: 'Brendon Stubbs et al.',
    work: '\u201CIntegrating Physical Activity Into Routine Psychiatric Care: A Review\u201D',
    detail: 'JAMA Psychiatry (2026). King\u2019s College London / Loughborough University / Medical University of Vienna. Reviewed data from more than 12,000 participants with clinically diagnosed severe mental illness.',
    psp: 'Physical activity produces moderate-to-large reductions in depressive symptoms, improvements in psychotic symptoms, enhanced cognitive functioning, and improved quality of life in people with severe mental illness. The field\u2019s asymmetric focus on reducing the pathological while neglecting to promote the salutogenic parallels what the Pepper Sauce Principle identifies in pain management: treating what hurts while ignoring what heals.',
    link: 'https://jamanetwork.com/journals/jamapsychiatry/article-abstract/2845751',
    linkText: 'Read the paper',
  },
  {
    author: 'Mieke Janevic et al.',
    work: '\u201CPositive STEPS: A Community Health Worker\u2013Led Intervention for African Americans with Chronic Pain\u201D',
    detail: 'The Gerontologist, 62(9), 1369\u20131380 (2022). University of Michigan. 86% reported \u201Cbetter/much better\u201D outcomes versus 25% controls.',
    psp: 'Race-concordant community health workers delivered positive psychology activities combined with pain self-management to older African Americans. A standalone positive psychology intervention for veterans (Hausmann et al., 2018) found no significant effect. The difference was not that Positive STEPS was \u201Cculturally adapted.\u201D It was that the intervention changed the unit of practice from individual to communal and delivered it within a context of cultural congruence. The active ingredient was the conditions, not the techniques.',
    link: 'https://doi.org/10.1093/geront/gnac008',
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
  // New entries below
  {
    name: 'Albert Murray',
    work: 'Stomping the Blues (1976)',
    desc: 'Murray argued that blues music is not an expression of despair but an aesthetic device against suffering. He called it \u201Cthe exorcism of despair.\u201D The Saturday Night Function was a secular ritual equivalent to Sunday morning worship\u2026 blues performance transforming raw experience into art that sustains and revitalizes the spirit. If Baldwin gives you craft, Murray gives you the communal infrastructure within which craft operates.',
    psp: 'The counter-technology. Blues as graded exposure in aesthetic form\u2026 the repeated, voluntary, communally witnessed confrontation with painful material. Maps to Conditions 3 and 4.',
    link: 'https://www.penguinrandomhouse.com/books/33697/stomping-the-blues-by-albert-murray/',
    linkText: 'The book',
  },
  {
    name: 'W.E.B. Du Bois',
    work: 'The Souls of Black Folk (1903)',
    desc: 'In \u201COf the Sorrow Songs,\u201D the final chapter, Du Bois heard what the science would take another century to confirm: communal expressions of anguish can become resources for hope, solidarity, and shared meaning. He wrote that through all the sorrow there breathes a faith in the ultimate justice of things. The sorrow songs are broaden-and-build a hundred years before the theory had a name.',
    psp: 'The earliest American documentation of communal pain processing through craft and song. The ancestors were running the protocol before the science had language for it.',
    link: 'https://www.gutenberg.org/ebooks/408',
    linkText: 'The book',
  },
  {
    name: 'Anne Lamott',
    work: 'Small Victories: Spotting Improbable Moments of Grace (2014)',
    desc: '\u201CNothing can be delicious when you are holding your breath.\u201D People in pain hold their breath in a hundred ways\u2026 physical bracing, emotional numbing, social withdrawal, dimming what is bright so that what hurts will be believed. The five conditions are what lets you exhale.',
    psp: 'The exhale. Lamott diagnoses the problem the framework was built to address.',
    link: 'https://www.penguinrandomhouse.com/books/248811/small-victories-by-anne-lamott/',
    linkText: 'The book',
  },
  {
    name: 'Anatole France',
    work: 'Le Jardin d\u2019\u00C9picure (1894)',
    desc: '\u201CThe truth is that life is delicious, horrible, charming, frightful, sweet, bitter, and that is everything.\u201D France did not say life is delicious despite being horrible. He said it is delicious and horrible and everything\u2026 simultaneously. The coexistence thesis in a single sentence, written 130 years ago.',
    psp: 'The destination. The Spicy and Delicious quadrant does not require the pepper to leave. It requires the full recipe to be present.',
    link: 'https://www.gutenberg.org/ebooks/20936',
    linkText: 'The book',
  },
  {
    name: 'Joy DeGruy',
    work: 'Post Traumatic Slave Syndrome: America\u2019s Legacy of Enduring Injury and Healing (2005/2017)',
    desc: 'Documents the dual inheritance: both ancestral trauma and adaptive survival behaviors transmitted across generations. The survival behaviors persist because trauma rewires families, not just individuals. But the adaptive behaviors\u2026 the kitchen tables, the communal rituals, the refusal to be diminished\u2026 those persist too.',
    psp: 'What happens when all five conditions are systematically withheld across centuries. Also: what happens when communities rebuild them under impossible constraints.',
    link: 'https://www.joydegruypublications.com',
    linkText: 'The book',
  },
  {
    name: 'Malidoma Patrice Som\u00E9',
    work: 'The Healing Wisdom of Africa (1999)',
    desc: 'Som\u00E9 argued that indigenous African healing centers on three interconnected elements\u2026 healing, ritual, and community\u2026 and that unexpressed grief poisons the self, requiring regular communal grief rituals as ongoing spiritual hygiene. Grief that is not processed communally does not go away. It compounds.',
    psp: 'The African philosophical foundation for Condition 3. Community as mechanism, not decoration. The bridge between Caribbean Nine Night, the Black Church, and the neuroscience of communal processing.',
    link: 'https://www.penguinrandomhouse.com/books/330672/the-healing-wisdom-of-africa-by-malidoma-patrice-some/',
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
  // New entries below
  {
    title: 'Blues Legacies and Black Feminism',
    authorLine: 'Angela Y. Davis \u00B7 Pantheon Books, 1998',
    desc: 'Davis showed that Black women blues artists\u2026 Ma Rainey, Bessie Smith, Billie Holiday\u2026 articulated radical subjects decades before the formal feminist movement. Sexual freedom, domestic violence, economic exploitation, female autonomy. They named what no one else would name, out loud, on purpose. That is Pass the Sauce through song.',
    psp: 'The gendered dimension of the blues as technology. If Baldwin gives you the mechanism and Murray gives you the infrastructure, Davis gives you the women who wielded it.',
    link: 'https://www.penguinrandomhouse.com/books/72259/blues-legacies-and-black-feminism-by-angela-y-davis/',
    linkText: 'The book',
  },
  {
    title: 'Blues People: Negro Music in White America',
    authorLine: 'Amiri Baraka (LeRoi Jones) \u00B7 William Morrow, 1963',
    desc: 'Baraka established that the evolution of Black music\u2026 from African origins through work songs, spirituals, blues, jazz, and bebop\u2026 constitutes a social and cultural history of Black life in America. Every transformation in Black musical form corresponds to shifts in social, economic, and political conditions. The music is the recipe, changing as the pepper changes, never losing the burn, always building new sauce.',
    psp: 'The cultural-historical evidence that pain does not have to diminish for the recipe to evolve. The arc from slavery to sovereignty, tracked through sound.',
    link: 'https://www.harpercollins.com/products/blues-people-leroi-jones',
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
              <p className="mx-auto max-w-[560px] text-[0.95rem] leading-[1.7] text-cream-mid">
                Pain neuroscience exists in one literature. The psychology of positive emotions exists in another. The cultural wisdom of communities who have been holding pain for centuries exists in a third. The science of voluntarily engaging with what burns exists in a fourth. None of them, alone, name the conditions that determine whether pain becomes suffering&hellip; or an ingredient in a life worth savoring.
              </p>
              <p className="mx-auto mt-4 max-w-[520px] font-accent text-[clamp(1.1rem,2vw,1.35rem)] italic leading-[1.4] text-gold">
                <span className="font-semibold text-gold-light">The Pepper Sauce Principle</span> is the recipe that brings them together. Not by softening any of them, but by showing they were always describing the same thing from different vantage points. The science is catching up to what the ancestors already knew.
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
