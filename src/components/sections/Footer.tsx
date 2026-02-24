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
      <div className="mt-4 flex justify-center gap-6">
        <a href="mailto:Michael@ifwall.com" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Contact
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[0.82rem] text-text-faint hover:text-gold-light">
          Privacy
        </a>
        <a href="#" className="text-[0.82rem] text-text-faint hover:text-gold-light">
          peppersauceprinciple.com
        </a>
      </div>
    </footer>
  );
}
