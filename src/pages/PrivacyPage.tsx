import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="mx-auto max-w-[720px] px-[clamp(1.25rem,5vw,3rem)] py-24">
        <Link to="/" className="mb-10 inline-block font-body text-[0.82rem] text-gold-muted hover:text-gold-light">
          &larr; Back to site
        </Link>

        <h1 className="mb-2 font-display text-[clamp(1.6rem,4vw,2rem)] text-cream">Privacy Policy</h1>
        <p className="mb-10 text-[0.875rem] italic text-cream-mid">Last Updated: March 15, 2026</p>

        <div className="legal-body space-y-6 font-body text-[1rem] leading-[1.7] text-cream-soft">
          <p>
            PepperSaucePrinciple.com (&ldquo;Site&rdquo;) is operated by Imaginative Feedback Coaching &amp; Consulting, LLC (&ldquo;IFCC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a Georgia limited liability company. IFCC is an independent entity. It is not affiliated with, endorsed by, or sponsored by Augusta University, Wellstar MCG Health, or any other institution. Dr. Rollock&rsquo;s institutional affiliations are referenced on this Site for biographical purposes only and do not indicate institutional endorsement, review, or approval of this Site, the Pepper Sauce Principle framework, or any product or service offered through this Site.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use it, who we share it with, how long we keep it, and your rights regarding your data.
          </p>
          <p>
            If you are a resident of Washington State, Connecticut, Nevada, or any state with a consumer health data privacy law, please also review our{' '}
            <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link>, which describes our practices regarding health-related data in greater detail and explains how we obtain your consent for collecting that data.
          </p>
          <p>
            We wrote this to be clear, not to bury important information in legal language. If something here doesn&rsquo;t make sense, email us at{' '}
            <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a> and we&rsquo;ll explain it in plain English.
          </p>

          {/* Section 1 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">1. Information We Collect</h2>
          <p>We collect different types of information depending on how you interact with our Site and services.</p>

          <h3 className="font-display text-[1.125rem] text-cream">When you complete the Pepper Sauce Profile (free, 34-item self-report):</h3>
          <p>
            We store your responses to all 34 items in a Supabase database hosted on Amazon Web Services (AWS) in the United States. From your responses, we compute and store: scores for each of the five conditions (Validation, Agency, Community, Capacity, Generativity), your fire type classification (Personal, Relational, Communal, Ancestral, or Growth), your highest and lowest condition, and a Scoville Gate flag indicating whether you endorsed any safety-sensitive items at an elevated level.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">About the Scoville Gate items:</h3>
          <p>
            The Profile includes items that relate to thoughts of being a burden to others and thoughts that others would be better off without you. If you endorse any of these items at a high level (5 or 6 on the response scale), this triggers what we call the &ldquo;Scoville Gate&rdquo; &mdash; an internal flag that ensures your results are reviewed with additional care. This flag does not generate a clinical assessment, diagnosis, screening result, or referral. It does not trigger any automated clinical intervention, crisis response, or notification to any external party &mdash; including emergency services, healthcare providers, or any third party. It does influence how your Extended Report is handled by Dr. Rollock (additional review care). We store which items were endorsed and at what level. When the Scoville Gate is triggered, crisis support resources (including the 988 Suicide &amp; Crisis Lifeline) are displayed to you directly within the Profile and on your results page.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">About the health-related nature of this data:</h3>
          <p>
            The Pepper Sauce Profile asks about your experience of pain, psychological functioning, community connections, agency, and related topics. Under the privacy laws of several U.S. states and under the General Data Protection Regulation (GDPR), this self-reported data may qualify as sensitive personal information, consumer health data, or special category data (data concerning health) &mdash; even though it is collected in an educational, non-clinical context. We treat all Profile data with the care appropriate for sensitive health-related information. See Section 11 for details.
          </p>
          <p>
            Your Profile results are stored with a unique identifier (UUID) and are accessible at a unique URL. No account creation or login is required. The unique URL is the access mechanism.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">When you provide your email address:</h3>
          <p>
            We collect your email address at several points: when you complete the Pepper Sauce Profile (required to receive your results link), when you sign up for email updates (book notifications, newsletter), and when you submit a Pass the Sauce story. Email addresses are stored in our Supabase database. Transactional and marketing emails are sent via Resend, a third-party email delivery service. Resend processes your email address and email content to deliver messages on our behalf. Resend&rsquo;s privacy policy is available at{' '}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">resend.com/legal/privacy-policy</a>.
          </p>
          <p>
            Email engagement tracking: Resend may embed a small (1&times;1 pixel) transparent tracking image in delivered emails and may redirect links through its servers. These technologies allow us to measure email open rates and click-through rates at an aggregate level. We use this data to improve our email communications. If you prefer not to be tracked in this way, you can disable image loading in your email client or unsubscribe from our emails entirely. See Section 8 for more details.
          </p>
          <p>
            We also operate an automated email nurture sequence. After completing the Pepper Sauce Profile, you will receive a series of follow-up emails delivered on a scheduled basis via Supabase Edge Functions and pg_cron (a scheduled task system). These emails are educational and promotional. You may unsubscribe from the nurture sequence at any time by clicking the unsubscribe link in any email or by contacting us directly.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">When you purchase the Extended Report ($14.50 introductory / $29.00 regular):</h3>
          <p>
            Payment processing is handled by Stripe. We do not see or store your credit card number. Stripe collects your payment information, email address, and may collect device and behavioral data (such as typing patterns and mouse movements on the payment form) for fraud prevention purposes. Stripe provides us with your email address and confirmation of payment. Stripe&rsquo;s privacy policy (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">stripe.com/privacy</a>) governs their handling of your payment data.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">When you participate in the post-payment conversation:</h3>
          <p>
            After purchasing the Extended Report, you enter a guided conversation powered by Anthropic&rsquo;s Claude API. This conversation gathers additional context about your pain experience to personalize your report. The full transcript of this conversation is stored in our Supabase database, linked to your Profile results. The transcript includes everything you type during the conversation and all responses generated by the AI. This transcript is used to generate your personalized Extended Report and is reviewed by Dr. Rollock for that purpose.
          </p>
          <p>
            If you leave the conversation before completing it, your partial transcript is preserved. You may receive a single follow-up email (within 24 hours) inviting you to resume. If you do not return within 7 days, the conversation is marked as abandoned.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">When you submit a Pass the Sauce story:</h3>
          <p>
            The Pass the Sauce section of the Site invites you to share how you hold your pain. Submissions are stored in our Supabase database in a dedicated table (challenge_submissions). We store whatever you write in the submission form. We will never publish your submission in any identifiable form without your prior written consent.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">What we do not collect:</h3>
          <p>
            We do not use third-party tracking cookies, advertising pixels, or analytics platforms such as Google Analytics or Facebook Pixel on PepperSaucePrinciple.com. We do not use browser fingerprinting. We do not collect your name (unless you voluntarily provide it), phone number, physical address, or government-issued identification through the Site unless you voluntarily provide it by contacting us via email.
          </p>

          {/* Section 2 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">2. How We Use Your Information</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Information</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Purpose</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Legal Basis (GDPR)</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr>
                  <td className="border border-gold/15 p-3">Pepper Sauce Profile responses (34 items)</td>
                  <td className="border border-gold/15 p-3">To compute and display your condition scores, fire type, and Profile results; to generate your Extended Report if purchased; to improve the framework in anonymized, aggregate form</td>
                  <td className="border border-gold/15 p-3">Explicit consent for health data (Art. 9(2)(a)); legitimate interest in providing and improving the service (Art. 6(1)(f))</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Scoville Gate flags and endorsed items</td>
                  <td className="border border-gold/15 p-3">To ensure safety-sensitive results receive additional review during Extended Report generation; to display crisis support resources when items are endorsed at elevated levels; not for clinical assessment, diagnosis, or automated clinical decision-making</td>
                  <td className="border border-gold/15 p-3">Explicit consent for health data (Art. 9(2)(a)); legitimate interest in user safety (Art. 6(1)(f))</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Email address</td>
                  <td className="border border-gold/15 p-3">To deliver your Profile results link, Extended Report, transactional emails, and (if opted in) marketing and nurture sequence emails</td>
                  <td className="border border-gold/15 p-3">Performance of a contract (Art. 6(1)(b)) for transactional emails; consent (Art. 6(1)(a)) for marketing emails</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Post-payment conversation transcript</td>
                  <td className="border border-gold/15 p-3">To generate your personalized Extended Report; to improve the conversational experience and framework in anonymized, aggregate form</td>
                  <td className="border border-gold/15 p-3">Explicit consent for health data (Art. 9(2)(a)); performance of a contract (Art. 6(1)(b))</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Pass the Sauce submissions</td>
                  <td className="border border-gold/15 p-3">To collect community stories; to potentially feature (with written consent only) in future publications or community resources</td>
                  <td className="border border-gold/15 p-3">Consent (Art. 6(1)(a))</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Payment confirmation (from Stripe)</td>
                  <td className="border border-gold/15 p-3">To confirm payment, deliver access to the post-payment conversation, and communicate about your purchase</td>
                  <td className="border border-gold/15 p-3">Performance of a contract (Art. 6(1)(b))</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Email engagement metadata (from Resend)</td>
                  <td className="border border-gold/15 p-3">To measure email delivery, open rates, and click-through rates in aggregate to improve our communications</td>
                  <td className="border border-gold/15 p-3">Legitimate interest (Art. 6(1)(f))</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-[1.125rem] text-cream">What we do not do:</h3>
          <p>
            We do not sell your personal information to anyone. We do not share your data with advertisers, data brokers, or marketing partners. We do not use your Profile responses, conversation transcripts, or Pass the Sauce submissions for any purpose other than generating your results/report and improving the framework in anonymized, aggregate form. We do not routinely review individual Profile responses or conversation transcripts except as necessary to generate purchased Extended Reports.
          </p>
          <p>
            Prohibited uses of your data: We do not use your data for employment decisions, insurance underwriting, credit determinations, housing decisions, or any form of discrimination. Your Profile results, Extended Report, and any AI-generated outputs are educational self-reflection tools. They are not intended to be used &mdash; and we do not use them &mdash; as the basis for any decision that produces legal effects or similarly significant effects on any individual.
          </p>

          {/* Section 3 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">3. How AI Processing Works</h2>
          <p>The Pepper Sauce Principle uses Anthropic&rsquo;s Claude API in two contexts:</p>
          <p>
            <strong className="text-cream">(a) Post-payment conversation.</strong> After purchasing the Extended Report, your conversation messages and your Profile data (condition scores, fire type, Scoville Gate status) are sent to Anthropic&rsquo;s servers in the United States for processing. Claude generates conversational responses based on this data. Anthropic is identified here by name because transparency about AI processing requires you to know specifically which company processes your data. You can review Anthropic&rsquo;s privacy practices at{' '}
            <a href="https://privacy.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">privacy.anthropic.com</a> and their commercial terms at{' '}
            <a href="https://anthropic.com/legal" target="_blank" rel="noopener noreferrer" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">anthropic.com/legal</a>.
          </p>
          <p>
            <strong className="text-cream">(b) Extended Report generation.</strong> Your Profile data and conversation transcript are sent to Anthropic&rsquo;s Claude API to generate your personalized Extended Report. Dr. Rollock reviews and may edit the generated report before delivery. This review is an editorial quality check within the educational framework; it is not a clinical review.
          </p>
          <p>
            All AI-generated content in the Extended Report and post-payment conversation is produced by automated systems and may contain inaccuracies, errors, or outputs that do not reflect factual reality. AI-generated content is educational and intended as a starting point for self-reflection. It is not clinical, medical, psychological, or professional advice of any kind. Do not alter pain management plans, medication regimens, or treatment decisions based on AI-generated outputs from this Service.
          </p>
          <p>Here is what you should know about how Anthropic handles your data:</p>
          <p>
            <strong className="text-cream">No model training on your data.</strong> IFCC operates under Anthropic&rsquo;s commercial API terms. Under those terms, Anthropic does not use inputs to or outputs from the API to train its AI models. The sole exception would require IFCC to affirmatively opt in to a training program, which we have not done and do not intend to do.
          </p>
          <p>
            <strong className="text-cream">30-day data retention.</strong> Anthropic automatically deletes API inputs and outputs within 30 days of receipt or generation under its standard commercial terms.
          </p>
          <p>
            <strong className="text-cream">Safety monitoring exceptions.</strong> Anthropic retains trust and safety classifier scores (automated abuse detection results) for up to 7 years. If content is flagged as a potential violation of Anthropic&rsquo;s Usage Policy, Anthropic may retain the flagged content itself for up to 2 years for enforcement purposes. These exceptions apply even to customers with zero-data-retention agreements.
          </p>
          <p>
            <strong className="text-cream">Voluntary feedback exception.</strong> If anyone (including IFCC) voluntarily submits feedback to Anthropic through a feedback mechanism (such as thumbs-up/down ratings or bug reports), Anthropic may retain the related data for up to 5 years and may use de-identified feedback data to improve its models. IFCC does not routinely submit user conversations as feedback to Anthropic.
          </p>
          <p>
            We chose Anthropic because their commercial data terms are among the strongest in the industry regarding customer data privacy. But we want you to know that a third party processes the information you provide through our Site.
          </p>

          {/* Section 4 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">4. Third-Party Service Providers</h2>
          <p>We use the following service providers to operate PepperSaucePrinciple.com. Each processes data for the specific purposes described:</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Provider</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Purpose</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Data Processed</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Privacy Policy</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr>
                  <td className="border border-gold/15 p-3">Anthropic</td>
                  <td className="border border-gold/15 p-3">AI processing (Claude API) for post-payment conversation and Extended Report generation</td>
                  <td className="border border-gold/15 p-3">Profile data (condition scores, fire type, Scoville Gate flags), conversation messages, generated outputs</td>
                  <td className="border border-gold/15 p-3"><a href="https://anthropic.com/legal" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">anthropic.com/legal</a></td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Supabase</td>
                  <td className="border border-gold/15 p-3">Database hosting (on AWS in the United States), Edge Functions, scheduled tasks (pg_cron)</td>
                  <td className="border border-gold/15 p-3">Profile responses, condition scores, fire type, Scoville Gate flags, email addresses, conversation transcripts, Pass the Sauce submissions, email nurture sequence state</td>
                  <td className="border border-gold/15 p-3"><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">supabase.com/privacy</a></td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Stripe</td>
                  <td className="border border-gold/15 p-3">Payment processing</td>
                  <td className="border border-gold/15 p-3">Payment details, email address, device/behavioral data for fraud prevention</td>
                  <td className="border border-gold/15 p-3"><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">stripe.com/privacy</a></td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Resend</td>
                  <td className="border border-gold/15 p-3">Transactional and marketing email delivery</td>
                  <td className="border border-gold/15 p-3">Email address, email content, delivery and engagement metadata (open rates, click-through rates via tracking pixels)</td>
                  <td className="border border-gold/15 p-3"><a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">resend.com/legal/privacy-policy</a></td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Lovable.dev</td>
                  <td className="border border-gold/15 p-3">Web application hosting</td>
                  <td className="border border-gold/15 p-3">Application data in transit</td>
                  <td className="border border-gold/15 p-3"><a href="https://lovable.dev/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">lovable.dev/privacy</a></td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Cloudflare</td>
                  <td className="border border-gold/15 p-3">Domain DNS and CDN</td>
                  <td className="border border-gold/15 p-3">Network traffic metadata (IP addresses, request headers) in transit</td>
                  <td className="border border-gold/15 p-3"><a href="https://cloudflare.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 hover:text-gold-light">cloudflare.com/privacypolicy</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-[1.125rem] text-cream">Categories of personal information disclosed to service providers (for CCPA/CPRA compliance):</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Category of Personal Information</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Service Providers Receiving It</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Business Purpose</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr>
                  <td className="border border-gold/15 p-3">Identifiers (email address, UUID)</td>
                  <td className="border border-gold/15 p-3">Supabase, Resend, Stripe, Anthropic</td>
                  <td className="border border-gold/15 p-3">Service delivery, communications, payment processing, AI processing</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Sensitive personal information (self-reported health data, Profile responses, Scoville Gate endorsements)</td>
                  <td className="border border-gold/15 p-3">Supabase, Anthropic, Resend (limited &mdash; results summary in email body only)</td>
                  <td className="border border-gold/15 p-3">Profile computation, Extended Report generation, results delivery</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Commercial information (purchase records)</td>
                  <td className="border border-gold/15 p-3">Stripe, Supabase</td>
                  <td className="border border-gold/15 p-3">Payment processing, transaction records</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Internet or electronic network activity (email engagement metadata)</td>
                  <td className="border border-gold/15 p-3">Resend</td>
                  <td className="border border-gold/15 p-3">Email delivery optimization</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>We do not sell or share your personal information with third parties for their own marketing.</p>

          {/* Section 5 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">5. Data Retention</h2>
          <p>We retain your information for the following periods:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Data Category</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr><td className="border border-gold/15 p-3">Pepper Sauce Profile</td><td className="border border-gold/15 p-3">36 months from completion date, then permanently deleted or anonymized. Your unique results URL will cease to function after deletion.</td></tr>
                <tr><td className="border border-gold/15 p-3">Post-payment conversation transcript</td><td className="border border-gold/15 p-3">36 months from conversation completion, then permanently deleted or anonymized</td></tr>
                <tr><td className="border border-gold/15 p-3">Extended Report (generated PDF)</td><td className="border border-gold/15 p-3">36 months from generation date, then permanently deleted</td></tr>
                <tr><td className="border border-gold/15 p-3">Scoville Gate flags and endorsed items</td><td className="border border-gold/15 p-3">Same as Profile data (36 months)</td></tr>
                <tr><td className="border border-gold/15 p-3">Pass the Sauce submissions</td><td className="border border-gold/15 p-3">Until you request deletion, or 36 months from submission if no publication consent is given</td></tr>
                <tr><td className="border border-gold/15 p-3">Email address (nurture sequence)</td><td className="border border-gold/15 p-3">Until you unsubscribe or request deletion</td></tr>
                <tr><td className="border border-gold/15 p-3">Purchase and transaction records</td><td className="border border-gold/15 p-3">7 years, as required for tax and accounting compliance under IRS requirements and Georgia law</td></tr>
                <tr><td className="border border-gold/15 p-3">Anthropic API data</td><td className="border border-gold/15 p-3">Deleted by Anthropic within 30 days (with the safety monitoring exceptions described in Section 3)</td></tr>
                <tr><td className="border border-gold/15 p-3">Anonymized, aggregated data</td><td className="border border-gold/15 p-3">Retained indefinitely; cannot be linked back to any individual</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            When data reaches the end of its retention period, we delete it or permanently anonymize it so it can no longer be linked to any individual. &ldquo;Permanently anonymize&rdquo; means we remove all direct identifiers (email address, UUID), all narrative content (conversation text, submission text), and retain only aggregate statistical patterns (e.g., average condition scores across all users, response distribution patterns) from which no individual can be re-identified.
          </p>

          {/* Section 6 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">6. Data Security</h2>
          <p>
            We implement commercially reasonable technical and organizational measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit (TLS) and at rest, role-based access controls limiting database access to authorized IFCC personnel (currently Dr. Rollock only), use of service providers with recognized security certifications (Supabase maintains SOC 2 Type 2 compliance), and server-side-only storage of API keys and proprietary logic (the Anthropic API key and all scoring logic are never exposed to your browser).
          </p>
          <p>No method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we take reasonable steps to protect your information.</p>

          <h3 className="font-display text-[1.125rem] text-cream">Data breach notification.</h3>
          <p>
            In the event of a data breach that compromises your personal information, we will notify you and relevant authorities in accordance with applicable law. Our notification commitments include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-cream">Georgia:</strong> Notification consistent with the Personal Identity Protection Act (O.C.G.A. &sect; 10-1-912).</li>
            <li><strong className="text-cream">California:</strong> Notification consistent with Cal. Civ. Code &sect; 1798.82.</li>
            <li><strong className="text-cream">Other states:</strong> Notification consistent with the breach notification laws of all states where affected users reside.</li>
            <li><strong className="text-cream">GDPR:</strong> For EEA, UK, or Swiss residents, notification to the relevant supervisory authority within 72 hours of becoming aware of a breach, and notification to affected individuals without undue delay where the breach is likely to result in a high risk to their rights and freedoms.</li>
          </ul>
          <p>
            Even where not legally required, we will voluntarily notify affected users of any breach involving Profile responses, Scoville Gate data, conversation transcripts, or Extended Reports, because we believe transparency about health-related data incidents is the right thing to do regardless of statutory obligation.
          </p>

          {/* Section 7 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">7. International Data Transfers</h2>
          <p>
            PepperSaucePrinciple.com is operated from the United States. All data we collect is processed and stored in the United States by our U.S.-based service providers (Supabase on AWS, Anthropic, Stripe).
          </p>
          <p>
            If you are located outside the United States &mdash; including in the European Economic Area (EEA), United Kingdom, or Switzerland &mdash; your data will be transferred to and processed in the United States, where data protection laws may differ from those in your jurisdiction. We rely on the following transfer mechanisms as applicable:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The EU-U.S. Data Privacy Framework, the UK Extension, and the Swiss-U.S. Data Privacy Framework, where our service providers are certified participants</li>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission, incorporated into our service provider agreements where applicable</li>
            <li>Your explicit consent to the transfer, provided when you affirmatively consent to the collection and processing of your health-related data before beginning the Profile</li>
          </ul>
          <p>By using the Service from outside the United States, you acknowledge that your data will be transferred to and processed in the United States.</p>

          {/* Section 8 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">8. Cookies, Local Storage, and Similar Technologies</h2>
          <p>
            <strong className="text-cream">What we use:</strong> We do not use traditional tracking cookies on PepperSaucePrinciple.com. We do not use third-party tracking cookies, advertising pixels, or analytics platforms. Supabase may store an authentication token in your browser&rsquo;s localStorage or cookies for session management purposes. These session management tokens are strictly necessary for the Service to function and do not track you across websites.
          </p>
          <p>
            <strong className="text-cream">Do Not Track and Global Privacy Control:</strong> PepperSaucePrinciple.com does not track users across third-party websites, so we do not respond to Do Not Track (DNT) browser signals in a different manner. We do not engage in cross-context behavioral advertising. We honor Global Privacy Control (GPC) signals as a valid opt-out of any sale or sharing of personal information, though we do not sell or share personal information.
          </p>
          <p>
            <strong className="text-cream">Email tracking technologies (Resend):</strong> As described in Section 1, Resend may embed a 1&times;1 pixel transparent tracking image in emails we send and may use redirected links. These technologies collect information including whether you opened an email, what time you opened it, your approximate location based on IP address, and which links you clicked. We use this data only in aggregate to improve our email communications. Resend&rsquo;s privacy policy governs their handling of this data.
          </p>
          <p>
            <strong className="text-cream">Third-party payment technologies:</strong> Stripe may set cookies or use similar technologies when you interact with the payment form. These are governed by Stripe&rsquo;s privacy policy linked in Section 4.
          </p>

          {/* Section 9 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">9. Your Privacy Rights</h2>
          <p>
            <strong className="text-cream">For all users, regardless of location:</strong> You can request access to, correction of, or deletion of any data associated with your Profile, conversation transcript, or Pass the Sauce submissions by emailing{' '}
            <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. If you receive marketing emails, you can unsubscribe at any time using the unsubscribe link in any email or by contacting us directly.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">Additional rights for residents of the EEA, UK, and Switzerland (GDPR):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-cream">Right of access (Art. 15)</strong> &mdash; to obtain confirmation of whether we process your personal data and to receive a copy.</li>
            <li><strong className="text-cream">Right to rectification (Art. 16)</strong> &mdash; to correct inaccurate personal data.</li>
            <li><strong className="text-cream">Right to erasure (Art. 17)</strong> &mdash; to request deletion of your personal data.</li>
            <li><strong className="text-cream">Right to restrict processing (Art. 18)</strong> &mdash; to request that we limit how we use your data while a concern is resolved.</li>
            <li><strong className="text-cream">Right to data portability (Art. 20)</strong> &mdash; to receive your personal data in a structured, commonly used, machine-readable format.</li>
            <li><strong className="text-cream">Right to object (Art. 21)</strong> &mdash; to object to processing based on our legitimate interests.</li>
            <li><strong className="text-cream">Right to withdraw consent (Art. 7(3))</strong> &mdash; where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of processing before withdrawal.</li>
            <li><strong className="text-cream">Right related to automated decision-making (Art. 22)</strong> &mdash; The Pepper Sauce Profile uses automated scoring to compute your condition scores and fire type classification. These are educational self-reflection tools, not clinical assessments. We do not make automated decisions that produce legal effects or similarly significant effects on you.</li>
            <li><strong className="text-cream">Right to lodge a complaint (Art. 77)</strong> &mdash; with your local data protection supervisory authority.</li>
          </ul>
          <p>
            <strong className="text-cream">Identity and contact details of the data controller:</strong> Imaginative Feedback Coaching &amp; Consulting, LLC, 246 Robert C Daniel Jr Pkwy #1383, Augusta, GA 30909, USA. Email: michael@ifwall.com.
          </p>
          <p>
            <strong className="text-cream">Note on Data Protection Officer:</strong> IFCC is a small business that does not process health data on a large scale as contemplated by GDPR Article 37. We have not appointed a Data Protection Officer. All data protection inquiries should be directed to michael@ifwall.com.
          </p>
          <p>To exercise any of these rights, contact us at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. We will respond within 30 days.</p>

          <h3 className="font-display text-[1.125rem] text-cream">Additional rights for California residents (CCPA/CPRA):</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to know what personal information we collect, use, and disclose.</li>
            <li>Right to delete your personal information.</li>
            <li>Right to correct inaccurate personal information.</li>
            <li>Right to limit use of sensitive personal information.</li>
            <li>Right to non-discrimination for exercising your privacy rights.</li>
          </ul>
          <p>
            We do not sell or share your personal information as those terms are defined under the CCPA/CPRA. To exercise your California privacy rights, contact us at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. We will verify your identity and respond within 45 days as required by the CCPA.
          </p>

          <h3 className="font-display text-[1.125rem] text-cream">Additional rights under other state privacy laws:</h3>
          <p>
            If you reside in Colorado, Connecticut, Delaware, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, or Virginia, you may have additional privacy rights under your state&rsquo;s comprehensive privacy law, including the right to access, correct, delete, and obtain a portable copy of your data, and the right to opt out of targeted advertising (which we do not conduct). To exercise your rights under any state privacy law, contact us at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>.
          </p>
          <p>
            If you reside in Washington State, please review our separate <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link> for specific rights and disclosures required under the My Health My Data Act (RCW 19.373).
          </p>

          {/* Section 10 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">10. Children&rsquo;s Privacy</h2>
          <p>
            You must be at least 18 years old to use PepperSaucePrinciple.com, the Pepper Sauce Profile, and all related services. The Pepper Sauce Profile is a self-report instrument designed for adults. It asks questions about pain experience, community support, agency, and related topics that are not appropriate for minors. You must confirm that you are at least 18 years old before beginning the Profile.
          </p>
          <p>
            We do not knowingly collect personal information from anyone under 18 years of age. If we become aware that we have inadvertently collected personal information from a person under 18, we will take steps to delete that information promptly and will not use the data for any purpose. If you believe someone under 18 has provided us with personal information, please contact us immediately at <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>.
          </p>
          <p>
            We do not knowingly collect personal information from children under 13 years of age as defined by the Children&rsquo;s Online Privacy Protection Act (COPPA).
          </p>

          {/* Section 11 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">11. Psychological Self-Report Data and Health-Related Information</h2>
          <div className="rounded-lg border-l-4 border-gold bg-cream/5 p-5">
            <p className="font-semibold text-cream">This section is important. Please read it carefully.</p>
          </div>
          <p>
            The Pepper Sauce Profile is a 34-item self-report instrument. It asks you to rate your agreement with statements about your experience of pain, your sense of agency, your community connections, your capacity for engagement, and your generativity. Safety-sensitive items ask about thoughts of being a burden or thoughts that others would be better off without you.
          </p>
          <p>
            The Pepper Sauce Profile is not a clinical assessment, psychological test, diagnostic instrument, screening tool, or validated psychometric instrument. It is an educational and self-reflection resource designed to help you understand your relationship with pain through the lens of the Pepper Sauce Principle framework. Your results do not constitute a clinical evaluation, psychological diagnosis, risk assessment, or healthcare recommendation of any kind. Do not use Profile results, Extended Report content, or any AI-generated output as the basis for clinical, medical, or mental health decisions, including decisions about medication, treatment, or pain management.
          </p>
          <p>
            However, we recognize that the data you provide through the Profile and the post-payment conversation contains information relating to your physical and mental health, pain experience, emotional well-being, and psychological functioning. Under the privacy laws of multiple jurisdictions, this type of information is classified as sensitive personal data or health-related data, even when collected in a non-clinical, educational context. Specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Under the <strong className="text-cream">GDPR (Article 9)</strong>, this data constitutes &ldquo;data concerning health&rdquo; &mdash; a special category of personal data that may only be processed under specific exceptions. We rely on your explicit consent (Article 9(2)(a)).</li>
            <li>Under the <strong className="text-cream">CCPA/CPRA</strong>, this data may constitute &ldquo;sensitive personal information.&rdquo;</li>
            <li>Under <strong className="text-cream">Washington&rsquo;s My Health My Data Act (RCW 19.373)</strong>, this data constitutes &ldquo;consumer health data.&rdquo; See our separate <Link to="/health-privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Consumer Health Data Privacy Policy</Link>.</li>
            <li>Under the comprehensive privacy laws of <strong className="text-cream">Colorado, Connecticut, Delaware, Maryland, Minnesota, New Hampshire, New Jersey, Oregon, Rhode Island</strong>, and other states, this data may constitute &ldquo;sensitive data&rdquo; requiring opt-in consent.</li>
          </ul>
          <p>Here is how we handle this data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your Profile responses, computed scores, and conversation transcript are stored in our Supabase database with access restricted to authorized IFCC personnel (currently, Dr. Rollock only).</li>
            <li>This data is transmitted to Anthropic&rsquo;s Claude API for processing as described in Section 3.</li>
            <li>We do not share your individual Profile responses, scores, or conversation transcripts with any third party other than the service providers listed in Section 4, and only for the purposes described.</li>
            <li>Your data is not shared with any healthcare provider, employer, insurer, data broker, or government agency unless required by valid legal process.</li>
            <li>The Scoville Gate flag does not trigger any automated clinical action, referral, or notification to any external party. It is an internal quality-assurance flag reviewed by Dr. Rollock when generating Extended Reports.</li>
          </ul>

          <h3 className="font-display text-[1.125rem] text-cream">Mandatory reporting and ethical obligations:</h3>
          <p>
            Dr. Rollock is a licensed clinical psychologist in the State of Georgia. His role in operating IFCC and The Pepper Sauce Principle is as the creator of an educational framework and digital product, not as your psychologist, therapist, or healthcare provider. No psychologist-client relationship is formed through use of this Site. Nonetheless, if information you provide through the Site or in direct communication with Dr. Rollock reveals a specific, credible, and imminent threat of serious physical harm to yourself or an identifiable third party, Dr. Rollock reserves the right to take appropriate action consistent with his ethical obligations, which may include contacting emergency services. This is a general ethical obligation applicable to any person aware of imminent danger &mdash; it is not a clinical duty arising from a treatment relationship, and it does not create, imply, or establish any professional-client relationship.
          </p>

          {/* Section 12 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">12. Changes to This Policy</h2>
          <p>
            If we make significant changes to this Privacy Policy, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. For material changes that affect how we collect, use, or share your data, we will post a prominent notice on PepperSaucePrinciple.com and notify users who have provided their email address, at least 30 days before the changes take effect, except where a shorter period is required by law.
          </p>

          {/* Section 13 */}
          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">13. Contact</h2>
          <p>Imaginative Feedback Coaching &amp; Consulting, LLC</p>
          <p>246 Robert C Daniel Jr Pkwy #1383</p>
          <p>Augusta, GA 30909</p>
          <p><a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a></p>
        </div>
      </div>
    </div>
  );
}
