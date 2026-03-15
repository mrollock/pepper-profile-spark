import { Link } from 'react-router-dom';
import { AFFILIATION_DISCLAIMER } from '@/data/legalCopy';

export function Footer() {
  return (
    <footer className="bg-dark px-[clamp(1.25rem,5vw,3rem)] py-12 text-center text-[0.85rem] text-cream-mid">
      <p className="font-medium text-cream-soft">Dr. Michael J.D. Rollock</p>
      <p className="text-[0.82rem]">
        Associate Professor &middot; Augusta University &middot; Clinical Psychologist &middot; Speaker
      </p>
      <p className="my-4 font-accent text-[1.1rem] italic text-gold-muted">
        &ldquo;Life is painful. Make it delicious.&rdquo;
      </p>
      <p className="text-[0.78rem] text-text-faint">
        &copy; 2026 Dr. Michael J.D. Rollock. All rights reserved. The Pepper Sauce Principle&trade;
      </p>
      <p className="mt-2 text-[0.78rem] text-text-faint">
        The Pepper Sauce Principle&trade; is a framework of{' '}
        <a href="https://ifwall.com" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-gold-light">
          Imaginative Feedback Coaching &amp; Consulting, LLC
        </a>
        , the consulting practice of Dr.&nbsp;Michael&nbsp;J.D.&nbsp;Rollock.
      </p>
      <p className="mt-2 max-w-[680px] mx-auto text-[0.78rem] leading-[1.6] text-text-faint">
        {AFFILIATION_DISCLAIMER}
      </p>
      <p className="mt-2 max-w-[680px] mx-auto text-[0.78rem] italic leading-[1.6] text-text-faint">
        The Pepper Sauce Principle&trade; and Pepper Sauce Profile&trade; are trademarks of Imaginative Feedback Coaching &amp; Consulting, LLC. The Pepper Sauce Principle is an educational framework &mdash; not therapy, counseling, clinical assessment, or clinical advice. No psychologist-client relationship is formed through use of this site.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <Link to="/privacy" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Terms of Use
        </Link>
        <Link to="/health-privacy" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Health Data Privacy
        </Link>
        <Link to="/disclaimer" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Disclaimer
        </Link>
        <a href="mailto:michael@ifwall.com" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Contact
        </a>
      </div>
    </footer>
  );
}
