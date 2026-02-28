import { RevealSection } from '@/components/RevealSection';

export function AboutSection() {
  return (
    <section className="bg-cream py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="about">
      <div className="mx-auto max-w-[var(--content-max)]">
        <RevealSection>
          <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
            About
          </span>
          <h2>Dr. Michael J.D. Rollock</h2>
          <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />

          <p>
            Clinical psychologist. Associate Professor, Department of Psychiatry &amp; Health Behavior, Augusta University. Director of Behavioral Health Services at the Pain Management Clinic. Trained in positive psychology under Martin Seligman at the University of Pennsylvania. BSc from Drexel University. PhD in Clinical Psychology from UMass Boston.
          </p>
          <p className="mt-4">
            His work sits at the intersection of three things most people think don't belong together: Caribbean cultural wisdom, positive psychology, and pain neuroscience. He thinks they're the same conversation—and that the kitchen table figured it out first.
          </p>
          <p className="mt-4">
            He is a speaker, a teacher, a clinician, and a son of Barbados who still keeps the pepper sauce—gold, not red—on every table. He lives in Augusta, Georgia with his wife Lindsey, also a clinical psychologist, and their two daughters, who are already learning the recipe.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
