import { RevealSection } from '@/components/RevealSection';

const TESTIMONIALS = [
  {
    quote: (
      <>
        "Engaging, thought-provoking, and delivered with a wonderful sense of humor that resonated deeply with attendees. For many — particularly clinicians of color — you opened their eyes to additional pathways and possibilities within the field.{' '}
        <strong className="font-bold">Representation matters. Excellence matters. And your contribution mattered.</strong>"
      </>
    ),
    name: '— Sandra V. Phillips, LPC, NCC',
    title: 'Founder & Director, Transformation Training Institute',
  },
];

export function TestimonialSection() {
  return (
    <section className="bg-cream py-[clamp(3rem,6vw,5rem)] px-[clamp(1.25rem,5vw,3rem)]">
      <div className="mx-auto max-w-[650px] text-center">
        <RevealSection>
          <div className="mx-auto mb-8 h-[3px] w-[60px] rounded-sm bg-gold" />
          {TESTIMONIALS.map((t, i) => (
            <div key={i}>
              <p className="font-accent text-[clamp(1.15rem,2.5vw,1.45rem)] italic leading-[1.65] text-text-body">
                {t.quote}
              </p>
              <div className="mt-6">
                <p className="text-[0.9rem] font-semibold text-text-body">{t.name}</p>
                <p className="text-[0.84rem] text-text-light">{t.title}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
