import { Link } from 'react-router-dom';

export default function HealthPrivacyPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="mx-auto max-w-[720px] px-[clamp(1.25rem,5vw,3rem)] py-24">
        <Link to="/" className="mb-10 inline-block font-body text-[0.82rem] text-gold-muted hover:text-gold-light">
          &larr; Back to site
        </Link>

        <h1 className="mb-2 font-display text-[clamp(1.6rem,4vw,2rem)] text-cream">Consumer Health Data Privacy Policy</h1>
        <p className="mb-1 text-[0.875rem] text-cream-mid">PepperSaucePrinciple.com &middot; Imaginative Feedback Coaching &amp; Consulting, LLC</p>
        <p className="mb-10 text-[0.875rem] italic text-cream-mid">Effective Date: March 15, 2026 &middot; Last Updated: March 15, 2026</p>

        <div className="legal-body space-y-6 font-body text-[1rem] leading-[1.7] text-cream-soft">
          <p>
            This Consumer Health Data Privacy Policy describes how Imaginative Feedback Coaching &amp; Consulting, LLC (&ldquo;IFCC,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, shares, and retains consumer health data through PepperSaucePrinciple.com (&ldquo;Site&rdquo;) and all services offered through the Site (collectively, the &ldquo;Service&rdquo;). This policy supplements our general{' '}
            <Link to="/privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Privacy Policy</Link>{' '}
            and is provided to comply with Washington&rsquo;s My Health My Data Act (RCW 19.373) and similar state health data privacy laws.
          </p>
          <p>
            If anything in this Consumer Health Data Privacy Policy conflicts with our general Privacy Policy, this document controls with respect to consumer health data.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">What Is Consumer Health Data?</h2>
          <p>
            Consumer health data is personal information that is linked or reasonably linkable to you and that identifies your past, present, or future physical or mental health status. Under Washington law and similar state laws, this definition extends beyond clinical or medical records to include self-reported health information collected by non-healthcare entities.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">What Consumer Health Data We Collect</h2>
          <p>We collect the following categories of consumer health data through the Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-cream">Self-reported pain and psychological functioning data.</strong> When you complete the Pepper Sauce Profile (a 34-item self-report instrument), you provide responses about your experience of pain, your sense of agency in relation to pain, your community connections, your capacity for engagement, and your generativity. Your responses reveal information about your physical and mental health status.</li>
            <li><strong className="text-cream">Safety-sensitive self-report data.</strong> The Profile includes items that ask about thoughts of being a burden to others and thoughts that others would be better off without you. Your responses to these items, and the endorsement level, are stored.</li>
            <li><strong className="text-cream">Computed health-related scores.</strong> From your Profile responses, we compute scores for each of the five conditions (Validation, Agency, Community, Capacity, Generativity), your fire type classification, and your Scoville Gate flag status.</li>
          </ul>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">How We Collect Consumer Health Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Collection Method</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Description</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr><td className="border border-gold/15 p-3">Your direct input</td><td className="border border-gold/15 p-3">Responses you enter into the Pepper Sauce Profile (34 items on a 6-point scale)</td></tr>
                <tr><td className="border border-gold/15 p-3">Your direct input</td><td className="border border-gold/15 p-3">Messages you type during the post-payment conversation</td></tr>
                <tr><td className="border border-gold/15 p-3">Automated computation</td><td className="border border-gold/15 p-3">Condition scores, fire type, and Scoville Gate flags computed from your Profile responses</td></tr>
                <tr><td className="border border-gold/15 p-3">AI generation</td><td className="border border-gold/15 p-3">Extended Report content generated by Anthropic&rsquo;s Claude API based on your data</td></tr>
                <tr><td className="border border-gold/15 p-3">Email submissions</td><td className="border border-gold/15 p-3">Information you voluntarily include in Pass the Sauce story submissions or direct communications</td></tr>
              </tbody>
            </table>
          </div>
          <p>We do not collect consumer health data from third-party sources. We do not infer health data from non-health data (such as browsing behavior, purchase history, or location data).</p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Purposes for Collecting Consumer Health Data</h2>
          <p>We collect and use your consumer health data for the following specific purposes:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong className="text-cream">To provide your Profile results.</strong> Computing your condition scores, fire type, and Scoville Gate status and displaying them to you at your unique results URL.</li>
            <li><strong className="text-cream">To generate your Extended Report.</strong> Processing your Profile data and conversation transcript through Anthropic&rsquo;s Claude API to generate your personalized report, and Dr. Rollock&rsquo;s review of the report before delivery.</li>
            <li><strong className="text-cream">To ensure safety-sensitive results receive appropriate care.</strong> The Scoville Gate flag ensures that Extended Reports for users who endorsed safety-sensitive items are handled with additional review attention. This flag does not trigger any clinical intervention, diagnosis, or referral.</li>
            <li><strong className="text-cream">To improve the framework in anonymized, aggregate form.</strong> After anonymization (removal of all identifiers, email addresses, and specific narrative content), aggregated patterns may be used to improve the Pepper Sauce Principle framework, conduct research on pain and well-being patterns, and pursue psychometric validation studies.</li>
            <li><strong className="text-cream">To deliver transactional communications.</strong> Sending your results link, Extended Report, purchase confirmation, and related service emails.</li>
          </ol>
          <p>We do not use your consumer health data for advertising, marketing to third parties, discrimination, or any purpose other than those listed above.</p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Who We Share Consumer Health Data With</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Recipient</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Purpose</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Data Shared</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr>
                  <td className="border border-gold/15 p-3">Anthropic (Claude API)</td>
                  <td className="border border-gold/15 p-3">AI processing to generate conversation responses and Extended Report content</td>
                  <td className="border border-gold/15 p-3">Profile data (condition scores, fire type, Scoville Gate flags), conversation messages, generated outputs</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Supabase (hosted on AWS)</td>
                  <td className="border border-gold/15 p-3">Database storage and server-side processing</td>
                  <td className="border border-gold/15 p-3">All consumer health data listed in this policy</td>
                </tr>
                <tr>
                  <td className="border border-gold/15 p-3">Resend</td>
                  <td className="border border-gold/15 p-3">Email delivery of results link and Extended Report</td>
                  <td className="border border-gold/15 p-3">Email address, email content containing results summary</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We do not sell your consumer health data. We do not share your consumer health data with data brokers, advertisers, employers, insurers, or government agencies unless compelled by valid legal process (subpoena, court order, or statutory requirement).
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">How We Obtain Your Consent</h2>
          <p>
            We obtain your separate, affirmative consent before collecting consumer health data. Before you begin the Pepper Sauce Profile, you are presented with a clear description of the types of health data the Profile collects, what we do with it, and who receives it. You must affirmatively opt in to this collection by checking a consent box. This consent is separate from your acceptance of our general Terms of Use.
          </p>
          <p>
            Before your consumer health data is shared with Anthropic (Claude API) for processing, you are informed of this sharing and its purpose. Your consent to data collection includes consent to processing by the service providers identified in this policy.
          </p>
          <p>
            You may withdraw your consent at any time by emailing <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. If you withdraw consent, we will cease processing your consumer health data and delete your identifiable data within 30 days, except as required by law or as described in our data retention section. Withdrawal of consent does not affect the lawfulness of processing that occurred before withdrawal.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">How Long We Retain Consumer Health Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.875rem]">
              <thead>
                <tr className="bg-cream/5">
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Data Category</th>
                  <th className="border border-gold/15 p-3 text-left font-semibold text-cream">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-cream-mid">
                <tr><td className="border border-gold/15 p-3">Profile responses, computed scores, and Scoville Gate flags</td><td className="border border-gold/15 p-3">36 months from completion, then permanently deleted or anonymized</td></tr>
                <tr><td className="border border-gold/15 p-3">Post-payment conversation transcript</td><td className="border border-gold/15 p-3">36 months from conversation completion, then permanently deleted or anonymized</td></tr>
                <tr><td className="border border-gold/15 p-3">Extended Report (generated PDF)</td><td className="border border-gold/15 p-3">36 months from generation, then permanently deleted</td></tr>
                <tr><td className="border border-gold/15 p-3">Anonymized and aggregated data</td><td className="border border-gold/15 p-3">Retained indefinitely for research and framework improvement</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Anthropic deletes API inputs and outputs within 30 days under its commercial terms, with the safety monitoring exceptions described in our <Link to="/privacy" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">Privacy Policy</Link>.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Your Rights Regarding Consumer Health Data</h2>
          <p>You have the following rights regarding your consumer health data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-cream">Right to confirm collection.</strong> You may ask us to confirm whether we have collected or are collecting your consumer health data.</li>
            <li><strong className="text-cream">Right to access.</strong> You may request a copy of all consumer health data we have collected about you, including your Profile responses, computed scores, fire type, Scoville Gate flags, conversation transcript (if applicable), and Extended Report (if applicable).</li>
            <li><strong className="text-cream">Right to withdraw consent.</strong> You may withdraw your consent to the collection and processing of your consumer health data at any time.</li>
            <li><strong className="text-cream">Right to deletion.</strong> You may request that we delete all consumer health data we have collected about you. We will complete deletion within 30 days, except for data we are required by law to retain and data that has already been permanently anonymized.</li>
            <li><strong className="text-cream">Right to know about sharing.</strong> You may request a list of all third parties and affiliates with whom we have shared your consumer health data during the preceding 12 months.</li>
            <li><strong className="text-cream">Right to be free from discrimination.</strong> We will not discriminate against you for exercising any of these rights.</li>
          </ul>
          <p>
            To exercise any right, email <a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a>. We will verify your identity (typically by confirming the email address associated with your Profile) and respond within 30 days.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Geofencing</h2>
          <p>
            We do not use geofencing technology to identify or track consumers in the vicinity of healthcare facilities, mental health facilities, or other health-related locations for the purpose of collecting consumer health data or delivering health-related advertising.
          </p>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Contact</h2>
          <p>For questions about this Consumer Health Data Privacy Policy, contact:</p>
          <div className="pt-2">
            <p>Imaginative Feedback Coaching &amp; Consulting, LLC</p>
            <p>246 Robert C Daniel Jr Pkwy #1383</p>
            <p>Augusta, GA 30909</p>
            <p><a href="mailto:michael@ifwall.com" className="text-cream-soft underline decoration-gold/40 hover:text-gold-light">michael@ifwall.com</a></p>
          </div>

          <h2 className="!mt-10 border-b-2 border-gold pb-2 font-display text-[1.375rem] text-cream">Changes to This Policy</h2>
          <p>
            We will provide you with at least 30 days&rsquo; advance notice before making material changes to this Consumer Health Data Privacy Policy. Notice will be provided via email (if you have provided your email address) and by posting the revised policy on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
