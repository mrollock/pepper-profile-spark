import { Link } from 'react-router-dom';
import { DISCLAIMER_PAGE, CONTACT_EMAIL } from '@/data/legalCopy';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="mx-auto max-w-[680px] px-[clamp(1.25rem,5vw,3rem)] py-24">
        <Link to="/" className="mb-10 inline-block font-body text-[0.82rem] text-gold-muted hover:text-gold-light">
          ← Back to site
        </Link>
        <h1 className="mb-8 font-display text-[clamp(1.8rem,4vw,2.4rem)] text-cream">Terms of Use</h1>

        <div className="space-y-6 font-body text-[0.95rem] leading-[1.75] text-cream-soft">
          <p>
            Our terms of use are currently being finalized with legal counsel. If you have questions about the terms governing your use of this site, please contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-muted hover:text-gold-light">
              {CONTACT_EMAIL}
            </a>.
          </p>
          <div className="pt-4">
            {DISCLAIMER_PAGE.mailingAddress.map((line, i) => (
              <span key={i} className="block text-cream-mid">{line}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
