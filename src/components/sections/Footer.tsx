import { Link } from 'react-router-dom';
import { IFCC_ATTRIBUTION, AFFILIATION_DISCLAIMER } from '@/data/legalCopy';

export function Footer() {
  return (
    <footer className="bg-dark px-[clamp(1.25rem,5vw,3rem)] py-12 text-center text-[0.85rem] text-cream-mid">
      <p className="font-medium text-cream-soft">Dr. Michael J.D. Rollock</p>
      <p className="text-[0.82rem]">
        Associate Professor · Augusta University · Clinical Psychologist · Speaker
      </p>
      <p className="my-4 font-accent text-[1.1rem] italic text-gold-muted">
        "Life is painful. Make it delicious."
      </p>
      <p className="text-[0.78rem] text-text-faint">
        © 2026 Dr. Michael J.D. Rollock. All rights reserved. The Pepper Sauce Principle™
      </p>
      <p className="mt-2 text-[0.78rem] text-text-faint">
        {IFCC_ATTRIBUTION}
      </p>
      <p className="mt-2 max-w-[680px] mx-auto text-[0.78rem] leading-[1.6] text-text-faint">
        {AFFILIATION_DISCLAIMER}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        <Link to="/privacy" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Privacy
        </Link>
        <Link to="/terms" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Terms
        </Link>
        <Link to="/disclaimer" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Disclaimer
        </Link>
        <a href="mailto:michael@peppersauceprinciple.com" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Contact
        </a>
      </div>
    </footer>
  );
}
