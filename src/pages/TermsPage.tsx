import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="mx-auto max-w-[720px] px-[clamp(1.25rem,5vw,3rem)] py-24">
        <Link to="/" className="mb-10 inline-block font-body text-[0.82rem] text-gold-muted hover:text-gold-light">
          &larr; Back to site
        </Link>

        <h1 className="mb-2 font-display text-[clamp(1.6rem,4vw,2rem)] text-cream">Terms of Use</h1>
        <p className="mb-10 text-[0.875rem] italic text-cream-mid">Last Updated: March 15, 2026</p>

        <div className="legal-body space-y-6 font-body text-[1rem] leading-[1.7] text-cream-soft">
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) are a legal agreement between you and Imaginative Feedback Coaching &amp; Consulting, LLC (&ldquo;IFCC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a Georgia limited liability company. They govern your use of PepperSaucePrinciple.com (&ldquo;Site&rdquo;) and all services offered through the Site, including the Pepper Sauce Profile, the Extended Report, the post-payment conversation, and all related tools and content (collectively, the &ldquo;Service&rdquo;).
          </p>
          <p>
            IFCC is an independent entity. It is not affiliated with, endorsed by, or sponsored by Augusta University, Wellstar MCG Health, or any other institution. Dr. Rollock&rsquo;s academic and clinical credentials are referenced on this Site for biographical context only and do not indicate that any institution has endorsed, reviewed, approved, or is responsible for this Site, the Pepper Sauce Principle framework, or any product or service offered through this Site. Any claim or dispute arising from your use of this Service is solely between you and IFCC.
          </p>
          <p>
            By accessing or using PepperSaucePrinciple.com or any part of the Service, you agree to be bound by these Terms, our{' '}
            <Link to="/privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Privacy Policy</Link>, our{' '}
            <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link>, and our{' '}
            <Link to="/disclaimer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Disclaimer</Link>, which are incorporated by reference. If you do not agree to these Terms, do not use the Site or Service.
          </p>
          <p>
            We wrote these terms to be clear and direct. The legal protections are real, but we have tried to make them understandable. If anything here is unclear, email us at{' '}
            <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>.
          </p>

          {/* Section 1 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">1. Eligibility</h2>
          <p>
            You must be at least 18 years old to use PepperSaucePrinciple.com and any part of the Service. The Pepper Sauce Profile asks questions about pain experience, agency, community, and related topics that are designed for adult self-reflection. By using the Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement. You will be asked to confirm your age before beginning the Profile. You may not complete the Profile on behalf of anyone under 18 years of age.
          </p>

          {/* Section 2 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">2. What This Service Is</h2>
          <p>The Pepper Sauce Principle is an educational framework for understanding your relationship with pain. The Service includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-cream">The Pepper Sauce Profile</strong> &mdash; a free, 34-item self-report instrument that computes your scores across five conditions (Validation, Agency, Community, Capacity, Generativity), identifies your fire type, and provides educational results.</li>
            <li><strong className="text-cream">The Extended Report</strong> &mdash; a paid, personalized report generated from your Profile data and a follow-up conversation powered by Anthropic&rsquo;s Claude API, reviewed by Dr. Rollock before delivery.</li>
            <li><strong className="text-cream">The Pepper Sauce Challenge and Pass the Sauce</strong> &mdash; community features inviting you to share stories and reflections.</li>
            <li><strong className="text-cream">Educational content</strong> &mdash; including the interactive Pepper-Sauce Matrix, the Five Conditions framework, and related materials on the Site.</li>
          </ul>

          {/* Section 3 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">3. What This Service Is Not &mdash; Critical Disclaimers</h2>
          <div className="rounded-lg border-l-4 border-gold bg-cream/5 p-5">
            <p className="font-semibold text-cream">This section contains the most important limitations on the nature of the Service. Please read it in its entirety before using any part of the Service.</p>
          </div>

          <h3 className="font-display text-[1.125rem] text-cream">(a) Not therapy, counseling, clinical assessment, or clinical services.</h3>
          <p>
            The Pepper Sauce Principle, the Pepper Sauce Profile, and the Extended Report are educational and self-reflection resources. They are not therapy, counseling, psychological assessment, psychiatric evaluation, clinical screening, clinical advice, psychological testing, or any form of mental health treatment, healthcare service, or professional service.
          </p>
          <p>
            The Pepper Sauce Profile does not diagnose conditions, screen for disorders, evaluate psychological functioning for clinical purposes, assess risk, prescribe treatments, or substitute for the professional judgment of a licensed healthcare provider. It is not designed, intended, or suitable for use as a clinical instrument.
          </p>
          <p>
            The Pepper Sauce Profile is not a validated psychometric instrument. It has not been subjected to formal psychometric validation studies, peer-reviewed psychometric analysis, or clinical standardization. It does not meet the standards for a psychological test as defined by the American Psychological Association&rsquo;s Standards for Educational and Psychological Testing. Your condition scores, fire type, and Scoville Gate status are educational outputs designed to facilitate self-reflection within the Pepper Sauce Principle framework. They are not clinical scores, risk assessments, diagnostic indicators, or measures of psychological constructs validated for clinical decision-making.
          </p>
          <p>
            The Extended Report is an educational document. It is not a clinical report, psychological evaluation, treatment plan, risk assessment, or healthcare recommendation. Dr. Rollock&rsquo;s review of the Extended Report before delivery is an editorial quality check within the educational framework &mdash; it is not a clinical review, professional consultation, or exercise of clinical judgment on your behalf.
          </p>
          <p>
            Do not use Profile results, Extended Report content, or any AI-generated output as the basis for clinical, medical, or mental health decisions. This includes but is not limited to decisions about medication, pain management plans, treatment modality, therapy engagement, or discontinuation of any healthcare service. If you are making decisions about your health or mental health, consult a qualified healthcare provider.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">(b) No professional-client relationship of any kind.</h3>
          <p>
            Dr. Michael J.D. Rollock is a licensed clinical psychologist and the founder and sole member of IFCC. His clinical practice and his academic and clinical roles at Augusta University and Wellstar MCG Health are entirely separate from IFCC and PepperSaucePrinciple.com. Dr. Rollock&rsquo;s role in developing the Pepper Sauce Principle and operating this Site is solely as the creator of an educational framework and digital product. He is not acting as your psychologist, therapist, counselor, or healthcare provider through this Site or Service. No aspect of the Service &mdash; including Dr. Rollock&rsquo;s review of Extended Reports &mdash; constitutes clinical practice, professional consultation, or the practice of psychology.
          </p>
          <p>
            Your use of the Service does not create any therapeutic, clinical, medical, psychological, counseling, fiduciary, or professional-client relationship between you and Dr. Rollock, IFCC, or any person or entity affiliated with IFCC. No duty of care, professional obligation, or fiduciary duty of any kind arises from your use of this Service.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">(c) AI-generated output disclaimer.</h3>
          <p>
            The post-payment conversation and portions of the Extended Report use artificial intelligence (Anthropic&rsquo;s Claude API) to generate content. AI-generated content may be inaccurate, incomplete, inconsistent, unexpected, or inappropriate for your particular situation. AI systems, including the one powering this Service, can produce errors, hallucinations (confident statements that are factually wrong), and outputs that do not reflect reality.
          </p>
          <p>
            The AI-generated outputs are intended as educational starting points for your own self-reflection. They are not professional, medical, psychological, legal, financial, or clinical advice of any kind. The AI does not know you, does not have access to your medical history, and cannot account for your individual circumstances beyond what you provide during the conversation.
          </p>
          <p>
            You are solely responsible for evaluating the quality and relevance of the outputs and deciding whether and how to act on them. IFCC does not guarantee the accuracy, reliability, completeness, or usefulness of any AI-generated output.
          </p>
          <p>
            Dr. Rollock reviews Extended Reports before delivery. This review is an editorial quality check &mdash; he reviews for coherence with the framework, tone, and whether any content is clearly inappropriate. This review does not verify the factual accuracy of AI-generated statements, does not constitute clinical judgment applied to your data, and does not create a professional relationship.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">(d) Not for crisis situations.</h3>
          <p>
            The Pepper Sauce Principle, the Pepper Sauce Profile, and the Extended Report are not crisis services and are not equipped to provide emergency assistance of any kind. IFCC does not monitor Profile responses or conversation transcripts in real time. There is no clinical team reviewing your data as you enter it. If you or someone you know is experiencing a mental health crisis, thoughts of suicide, or self-harm:
          </p>
          <div className="rounded-lg border-2 border-gold bg-cream/5 p-5 text-center">
            <p className="mb-2"><strong className="text-cream">988 Suicide &amp; Crisis Lifeline:</strong> Call or text <strong className="text-cream">988</strong> (available 24/7, free, and confidential)</p>
            <p className="mb-2"><strong className="text-cream">Emergency services:</strong> Call <strong className="text-cream">911</strong></p>
            <p><strong className="text-cream">Crisis Text Line:</strong> Text <strong className="text-cream">HOME</strong> to <strong className="text-cream">741741</strong></p>
          </div>
          <p>
            The Profile includes safety-sensitive items that ask about thoughts of being a burden and thoughts that others would be better off without you. If you endorse these items at an elevated level, the Service will display crisis support resources to you directly. However, endorsing these items does not trigger a clinical intervention, crisis response, automated notification, or contact from a mental health professional or any other person. No one at IFCC or any third party is notified in real time when these items are endorsed. The Scoville Gate flag is an internal quality-assurance marker that is reviewed only when and if an Extended Report is generated.
          </p>
          <p>
            You acknowledge that IFCC has no obligation to monitor your responses, no ability to assess your clinical status, and no duty to initiate contact or intervention based on your Profile responses or any other data you provide through the Service.
          </p>
          <p>
            If the safety-sensitive items in the Profile reflect how you are feeling right now, please reach out to one of the resources above or to a trusted person in your life before continuing.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">(e) Acknowledgment of limitations.</h3>
          <p>By using the Service, you acknowledge and agree that:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>this is an educational framework, not a clinical, therapeutic, or healthcare service;</li>
            <li>no professional relationship of any kind is created between you and Dr. Rollock, IFCC, or any affiliated person or entity;</li>
            <li>the Pepper Sauce Profile is not a validated clinical instrument, psychological test, screening tool, or diagnostic device;</li>
            <li>AI-generated outputs may contain errors, hallucinations, and inaccuracies, and should not be relied upon as the sole basis for any decision about your health, well-being, or pain management;</li>
            <li>IFCC does not monitor your responses in real time and has no ability to assess your clinical status or intervene on your behalf;</li>
            <li>the Scoville Gate flag does not trigger any clinical intervention, crisis response, or notification to any external party;</li>
            <li>you assume full responsibility for how you evaluate and use the information generated by the Service; and</li>
            <li>if you are experiencing a mental health crisis or thoughts of self-harm, you will contact the crisis resources listed in Section 3(d) or another appropriate resource rather than relying on this Service.</li>
          </ol>

          <h3 className="font-display text-[1.125rem] text-cream">(f) Prohibited reliance contexts.</h3>
          <p>The Pepper Sauce Profile results, Extended Report, and all AI-generated outputs from this Service are not intended for and must not be used in any of the following contexts:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Clinical, medical, or mental health treatment planning or decision-making</li>
            <li>Employment screening, hiring, termination, or workplace accommodation decisions</li>
            <li>Insurance underwriting, claims adjudication, or coverage determinations</li>
            <li>Legal proceedings, custody evaluations, forensic assessments, or disability determinations</li>
          </ul>

          {/* Section 4 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">4. Consent to Health Data Collection</h2>
          <p>
            Before you begin the Pepper Sauce Profile, you will be asked to provide separate, affirmative consent to the collection and processing of your health-related self-report data. This consent is separate from your acceptance of these Terms. The consent mechanism will identify the types of health data collected, the purposes of collection, and the entities that will receive your data.
          </p>
          <p>
            You may withdraw your consent at any time by emailing <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. See our{' '}
            <Link to="/privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Privacy Policy</Link> and{' '}
            <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link> for details about your rights regarding health data.
          </p>
          <p>
            Your consent to health data collection is required to use the Pepper Sauce Profile. If you do not consent, you may still access the educational content on the Site (the Pepper-Sauce Matrix, the Five Conditions framework, and other non-assessment materials), but you will not be able to complete the Profile or receive results.
          </p>

          {/* Section 5 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">5. Your Content</h2>
          <p>
            <strong className="text-cream">(a) Ownership.</strong> The responses, reflections, stories, and text you enter into the Service (&ldquo;Your Content&rdquo;) &mdash; including your Profile responses, your conversation messages, and your Pass the Sauce submissions &mdash; belong to you. We do not claim ownership of Your Content.
          </p>
          <p>
            <strong className="text-cream">(b) License to process your content.</strong> By submitting Your Content to the Service, you grant IFCC a limited, non-exclusive, worldwide, royalty-free license to process Your Content through the Service &mdash; including transmission to Anthropic&rsquo;s Claude API &mdash; for the sole purpose of generating your Profile results, conducting the post-payment conversation, and generating your Extended Report. This processing license terminates when your identifiable data is deleted.
          </p>
          <p>
            <strong className="text-cream">(c) License for anonymized data.</strong> You also grant IFCC a perpetual, irrevocable, non-exclusive, worldwide, royalty-free license to use anonymized and aggregated data derived from Your Content (from which your identity cannot reasonably be determined) to improve the Pepper Sauce Principle framework, conduct and publish research on pain experience and well-being patterns, develop future products and services, and pursue psychometric validation studies. &ldquo;Anonymized&rdquo; means all direct identifiers (email address, UUID), specific narrative content, and any information that could reasonably identify you have been permanently removed. This license for anonymized data survives deletion of your identifiable data.
          </p>
          <p>
            <strong className="text-cream">(d) No identifiable publication without your written consent.</strong> We will never publish, share, or publicly disclose your specific Profile responses, conversation transcripts, Extended Report content, or Pass the Sauce submissions in any individually identifiable form without your prior written consent. Written consent must be provided via email or signed document &mdash; not inferred from your continued use of the Service, verbal agreement, or silence.
          </p>

          {/* Section 6 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service to process content that is illegal, threatening, abusive, harassing, defamatory, obscene, or that violates the rights of any third party</li>
            <li>Attempt to extract, reverse-engineer, reconstruct, decompile, or replicate the system prompts, scoring frameworks, item architecture, condition algorithms, fire type classification logic, Scoville Gate thresholds, report generation prompts, or other proprietary elements embedded in the Service</li>
            <li>Use automated scripts, bots, scrapers, or other programmatic methods to access or interact with the Service</li>
            <li>Circumvent, disable, or interfere with any security, access-control, or rate-limiting features of the Service</li>
            <li>Use the Service or its outputs to develop, train, or improve a competing product, service, assessment instrument, or AI system</li>
            <li>Resell, sublicense, or redistribute access to the Service or its outputs to third parties</li>
            <li>Misrepresent the Pepper Sauce Profile as a validated clinical instrument, diagnostic tool, clinical assessment, or psychological test</li>
            <li>Misrepresent AI-generated outputs as professional, medical, psychological, legal, or clinical advice</li>
            <li>Use Profile results, Extended Report content, or AI-generated outputs in employment, insurance, legal, forensic, or disability-determination contexts</li>
            <li>Use the Service in any manner that violates Anthropic&rsquo;s Acceptable Use Policy</li>
            <li>Complete the Profile on behalf of someone under 18 years of age</li>
          </ul>
          <p>Violation of these terms may result in immediate suspension or termination of your access to the Service without refund.</p>

          {/* Section 7 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">7. Intellectual Property</h2>
          <p>
            <strong className="text-cream">(a) Trademarks.</strong> The Pepper Sauce Principle&trade; and Pepper Sauce Profile&trade; are trademarks of Imaginative Feedback Coaching &amp; Consulting, LLC. Imaginative Feedback&trade;, Never Stuck&trade;, and Almendro&trade; are also trademarks of IFCC. You may not use these marks without our prior written permission, except to refer to our products and services in a manner consistent with applicable trademark law (nominative fair use).
          </p>
          <p>
            <strong className="text-cream">(b) Proprietary methodology and trade secrets.</strong> The Pepper Sauce Principle framework &mdash; including the Five Conditions model, the Pepper-Sauce Matrix, the fire type taxonomy, the Scoville Gate protocol, the condition scoring architecture, and the three-strand theoretical braid (pain neuroscience, positive psychology, and communal coexistence) &mdash; is proprietary intellectual property of IFCC. The system prompts, scoring frameworks, item architecture, report generation prompts, and conversational protocols are trade secrets of IFCC.
          </p>
          <p>
            Unauthorized access to, extraction of, or disclosure of these trade secrets may subject you to liability under the Defend Trade Secrets Act (18 U.S.C. &sect; 1836), Georgia&rsquo;s Trade Secrets Act (O.C.G.A. &sect; 10-1-760 et seq.), and other applicable law.
          </p>
          <p>
            <strong className="text-cream">(c) Site content.</strong> All text, graphics, user interface design, visual interfaces, framework descriptions, educational content, and other content on PepperSaucePrinciple.com (excluding Your Content) are the property of IFCC or its licensors and are protected by copyright and other intellectual property laws.
          </p>
          <p>
            <strong className="text-cream">(d) Academic and educational use.</strong> Nothing in these Terms restricts your ability to discuss, cite, refer to, teach about, or present the Pepper Sauce Principle framework in academic, educational, clinical, pastoral, or personal contexts, provided you attribute the framework to Dr. Michael J.D. Rollock / IFCC and do not reproduce proprietary elements (system prompts, scoring algorithms, item text, report templates) without written permission. We encourage scholarly discussion of the framework and welcome citation in academic publications.
          </p>

          {/* Section 8 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">8. Payments and Refunds</h2>
          <p>
            <strong className="text-cream">(a) Pepper Sauce Profile.</strong> The Pepper Sauce Profile is free. No payment is required.
          </p>
          <p>
            <strong className="text-cream">(b) Extended Report.</strong> The Extended Report is a paid product. Payment is processed by Stripe. By completing a purchase, you agree to Stripe&rsquo;s terms of service (<a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">stripe.com/legal</a>). All prices are displayed at the time of purchase and are in United States dollars.
          </p>
          <p>
            <strong className="text-cream">(c) Refund policy.</strong> If you purchase the Extended Report and have not initiated the post-payment conversation, you may request a full refund within 30 days of purchase by emailing <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>.
          </p>
          <p>
            Once you begin the post-payment conversation, the purchase is non-refundable because AI processing costs are incurred at that point and cannot be recovered, and the personalized report generation process has begun. This refund policy is communicated to you before you complete your purchase and again before you initiate the conversation.
          </p>
          <p>
            If the Service fails to function due to a technical error on our end, contact us at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a> and we will either resolve the issue or provide a full refund.
          </p>
          <p>
            <strong className="text-cream">(d) EU and UK consumers &mdash; right of withdrawal.</strong> If you are a consumer located in the European Economic Area or United Kingdom, you have a 14-day right of withdrawal from the date of purchase. By initiating the post-payment conversation, you expressly consent to the immediate performance of the digital service and acknowledge that you lose your right of withdrawal once performance has begun.
          </p>

          {/* Section 9 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">9. Account Termination</h2>
          <p>
            <strong className="text-cream">(a) By you.</strong> You may stop using PepperSaucePrinciple.com at any time. To request deletion of your stored data (Profile responses, conversation transcript, Pass the Sauce submissions), email <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. We will process deletion requests within 30 days.
          </p>
          <p>
            <strong className="text-cream">(b) By us.</strong> We reserve the right to suspend or terminate your access to the Service, with or without notice, if we reasonably believe you have violated these Terms, engaged in conduct harmful to other users or to IFCC, or used the Service in a manner inconsistent with its intended purpose. If we terminate your access to a paid service for reasons other than your violation of these Terms, we will provide a full refund for the Extended Report if it has not yet been delivered.
          </p>

          {/* Section 10 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">10. Disclaimer of Warranties</h2>
          <div className="rounded-lg border-l-4 border-gold bg-cream/5 p-5">
            <p className="font-semibold text-cream">THIS SECTION IS IMPORTANT. PLEASE READ IT CAREFULLY.</p>
          </div>
          <div className="rounded-lg border border-gold/20 bg-cream/5 p-5 text-[0.8125rem] uppercase leading-[1.8] text-cream-mid">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IFCC PROVIDES PEPPERSAUCEPRINCIPLE.COM AND THE SERVICE ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. IFCC SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-4">
              WITHOUT LIMITING THE FOREGOING, IFCC DOES NOT WARRANT THAT: (A) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, ERROR-FREE, OR SECURE; (B) ANY DEFECTS OR ERRORS WILL BE CORRECTED; (C) THE PEPPER SAUCE PROFILE RESULTS, EXTENDED REPORT, OR ANY AI-GENERATED OUTPUTS WILL BE ACCURATE, COMPLETE, CURRENT, RELIABLE, OR SUITABLE FOR ANY PARTICULAR PURPOSE; (D) THE SERVICE WILL MEET YOUR SPECIFIC REQUIREMENTS, EXPECTATIONS, OR NEEDS; OR (E) THE PEPPER SAUCE PROFILE OR EXTENDED REPORT IS SUITABLE FOR CLINICAL, DIAGNOSTIC, TREATMENT, SCREENING, FORENSIC, EMPLOYMENT, INSURANCE, OR LEGAL PURPOSES.
            </p>
            <p className="mt-4">
              YOU ACKNOWLEDGE THAT THE PEPPER SAUCE PROFILE IS AN EDUCATIONAL SELF-REFLECTION TOOL, NOT A VALIDATED CLINICAL INSTRUMENT, PSYCHOLOGICAL TEST, OR SCREENING DEVICE. YOU ACKNOWLEDGE THAT AI-GENERATED CONTENT IS PRODUCED BY AUTOMATED SYSTEMS AND MAY CONTAIN ERRORS, OMISSIONS, HALLUCINATIONS, OR INAPPROPRIATE MATERIAL. YOU ACKNOWLEDGE THAT DR. ROLLOCK&rsquo;S REVIEW OF EXTENDED REPORTS IS AN EDITORIAL QUALITY CHECK, NOT A CLINICAL REVIEW OR EXERCISE OF PROFESSIONAL JUDGMENT ON YOUR BEHALF. YOU USE THE SERVICE AND RELY ON ITS OUTPUTS ENTIRELY AT YOUR OWN RISK.
            </p>
            <p className="mt-4">
              THE DISCLAIMERS IN THIS SECTION DO NOT PURPORT TO LIMIT LIABILITY FOR FRAUD, INTENTIONAL MISREPRESENTATION, OR PERSONAL INJURY CAUSED BY NEGLIGENCE, TO THE EXTENT SUCH LIMITATION IS PROHIBITED BY APPLICABLE LAW.
            </p>
          </div>

          {/* Section 11 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">11. Limitation of Liability</h2>
          <div className="rounded-lg border border-gold/20 bg-cream/5 p-5 text-[0.8125rem] uppercase leading-[1.8] text-cream-mid">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
            <p className="mt-4">
              (A) EXCLUSION OF CONSEQUENTIAL DAMAGES. IN NO EVENT SHALL IFCC, ITS FOUNDER, MEMBERS, OFFICERS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, BUSINESS OPPORTUNITIES, GOODWILL, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF IFCC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="mt-4">
              (B) SPECIFIC EXCLUSIONS. WITHOUT LIMITING THE FOREGOING, IFCC SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM: (I) YOUR RELIANCE ON PEPPER SAUCE PROFILE RESULTS, EXTENDED REPORT CONTENT, OR AI-GENERATED OUTPUTS FOR CLINICAL, MEDICAL, MENTAL HEALTH, EMPLOYMENT, INSURANCE, LEGAL, OR OTHER PROFESSIONAL DECISIONS; (II) ANY ACTION OR INACTION YOU TAKE BASED ON INFORMATION PROVIDED THROUGH THE SERVICE; (III) ANY INTERPRETATION OF YOUR RESULTS AS A CLINICAL ASSESSMENT, DIAGNOSIS, RISK ASSESSMENT, OR TREATMENT RECOMMENDATION; (IV) ANY USE OF SERVICE OUTPUTS IN PROHIBITED CONTEXTS LISTED IN SECTION 3(f); OR (V) ANY FAILURE OF THE SCOVILLE GATE OR ANY OTHER FEATURE OF THE SERVICE TO DETECT, PREVENT, OR RESPOND TO ANY HEALTH, SAFETY, OR CRISIS SITUATION.
            </p>
            <p className="mt-4">
              (C) AGGREGATE LIABILITY CAP. IFCC&rsquo;S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE GREATER OF: (I) THE TOTAL AMOUNTS YOU ACTUALLY PAID TO IFCC IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (II) ONE HUNDRED UNITED STATES DOLLARS (US $100.00).
            </p>
            <p className="mt-4">
              (D) EXCEPTIONS TO LIMITATION. THE LIMITATIONS IN THIS SECTION SHALL NOT APPLY TO: (I) LIABILITY ARISING FROM IFCC&rsquo;S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT; (II) LIABILITY ARISING FROM A BREACH OF IFCC&rsquo;S DATA SECURITY OBLIGATIONS THAT RESULTS IN UNAUTHORIZED DISCLOSURE OF YOUR PERSONAL INFORMATION; (III) IFCC&rsquo;S INDEMNIFICATION OBLIGATIONS, IF ANY; OR (IV) ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
            <p className="mt-4">
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF YOU RESIDE IN SUCH A JURISDICTION, SOME OR ALL OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS UNDER YOUR LOCAL LAW. NOTHING IN THESE TERMS AFFECTS YOUR STATUTORY RIGHTS AS A CONSUMER THAT CANNOT BE WAIVED OR LIMITED BY CONTRACT.
            </p>
          </div>

          {/* Section 12 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless IFCC, its founder, members, employees, agents, and affiliates from and against any third-party claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or related to: (a) your use of the Service; (b) Your Content; (c) your violation of these Terms; (d) your violation of any applicable law or the rights of any third party; (e) any misrepresentation of the Pepper Sauce Profile or Extended Report as a clinical instrument, diagnostic tool, psychological test, or healthcare service; or (f) any use of Service outputs in the prohibited contexts listed in Section 3(f).
          </p>
          <p>
            This indemnification obligation shall not apply to the extent that a claim arises from IFCC&rsquo;s own gross negligence, willful misconduct, or breach of these Terms.
          </p>

          {/* Section 13 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">13. Dispute Resolution</h2>
          <p>
            <strong className="text-cream">(a) Governing law.</strong> These Terms are governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict-of-laws principles.
          </p>
          <p>
            <strong className="text-cream">(b) Informal resolution first.</strong> Before initiating any formal dispute resolution proceeding, you agree to contact us at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a> and attempt to resolve the dispute informally for at least 30 days.
          </p>
          <p>
            <strong className="text-cream">(c) Mandatory individual arbitration.</strong> If informal resolution is unsuccessful, you and IFCC agree that any dispute shall be resolved exclusively by binding individual arbitration administered by the American Arbitration Association (&ldquo;AAA&rdquo;) under its Consumer Arbitration Rules. The Federal Arbitration Act (9 U.S.C. &sect;&sect; 1&ndash;16) governs the interpretation and enforcement of this arbitration provision.
          </p>
          <p>
            Arbitration shall take place in Richmond County, Georgia, unless you and IFCC mutually agree to a different location. For claims of $25,000 or less, arbitration will be conducted based on written submissions unless the arbitrator determines that a hearing is necessary.
          </p>
          <p>
            Payment of arbitration fees: For claims of $10,000 or less, IFCC will pay all AAA filing, administration, and arbitrator fees.
          </p>

          <div className="rounded-lg border border-gold/20 bg-cream/5 p-5 text-[0.8125rem] uppercase leading-[1.8] text-cream-mid">
            <p>
              <strong>(d) CLASS ACTION AND JURY TRIAL WAIVER.</strong> YOU AND IFCC EACH AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU EXPRESSLY WAIVE ANY RIGHT TO A JURY TRIAL.
            </p>
          </div>

          <p>
            <strong className="text-cream">(e) Small claims exception.</strong> Either party may bring an individual action in a small claims court of competent jurisdiction in Richmond County, Georgia.
          </p>
          <p>
            <strong className="text-cream">(f) 30-day opt-out right.</strong> You may opt out of this arbitration provision by sending written notice to <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a> within 30 days of your first use of the Service. If you opt out, Disputes will be resolved exclusively in the state and federal courts located in Richmond County, Georgia.
          </p>
          <p>
            <strong className="text-cream">(g) Venue for non-arbitrated disputes.</strong> For any Disputes not subject to arbitration, you and IFCC agree to the exclusive jurisdiction and venue of the state and federal courts located in Richmond County, Georgia.
          </p>

          {/* Section 14 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">14. General Provisions</h2>
          <p><strong className="text-cream">(a) Severability.</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable. If modification is not possible, the provision shall be severed. The remaining provisions shall continue in full force and effect.</p>
          <p><strong className="text-cream">(b) Entire agreement.</strong> These Terms, together with the <Link to="/privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Privacy Policy</Link>, the <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link>, and the <Link to="/disclaimer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Disclaimer</Link>, constitute the entire agreement between you and IFCC regarding your use of the Service.</p>
          <p><strong className="text-cream">(c) Assignment.</strong> You may not assign or transfer these Terms without our prior written consent. IFCC may assign these Terms without restriction in connection with a merger, acquisition, or sale of substantially all of its assets.</p>
          <p><strong className="text-cream">(d) No waiver.</strong> Our failure to enforce any provision at any time shall not be construed as a waiver of that provision.</p>
          <p><strong className="text-cream">(e) Force majeure.</strong> IFCC shall not be liable for any failure or delay in performing its obligations due to causes beyond its reasonable control.</p>
          <p><strong className="text-cream">(f) Notices.</strong> We may provide notices via your email address or by posting on PepperSaucePrinciple.com. Notices to IFCC must be sent to <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>.</p>
          <p><strong className="text-cream">(g) Headings.</strong> Section headings are for convenience only.</p>
          <p><strong className="text-cream">(h) Survival.</strong> Sections 3 (Disclaimers), 5(c) (Anonymized Data License), 5(d) (No Identifiable Publication), 6 (Acceptable Use), 7 (Intellectual Property), 10 (Disclaimer of Warranties), 11 (Limitation of Liability), 12 (Indemnification), and 13 (Dispute Resolution) survive any termination of these Terms.</p>

          {/* Section 15 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">15. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page, post a prominent notice on PepperSaucePrinciple.com, and notify users who have provided their email address. Material changes will take effect 30 days after notice, except where a shorter period is required by law. Your continued use of the Service after the effective date of revised Terms constitutes acceptance.
          </p>

          {/* Section 16 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">16. Contact</h2>
          <p>Imaginative Feedback Coaching &amp; Consulting, LLC</p>
          <p>246 Robert C Daniel Jr Pkwy #1383</p>
          <p>Augusta, GA 30909</p>
          <p><a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a></p>
        </div>
      </div>
    </div>
  );
}
