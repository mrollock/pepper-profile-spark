import { useState, useCallback } from 'react';
import PreProfileChat from '@/components/PreProfileChat';
import { RevealSection } from '@/components/RevealSection';

type QuadrantKey = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

interface ConversationalHookSectionProps {
  matrixQuadrant: QuadrantKey | null;
  matrixInteracted: boolean;
}

export function ConversationalHookSection({ matrixQuadrant, matrixInteracted }: ConversationalHookSectionProps) {
  const [chatOpen, setChatOpen] = useState(false);

  const handleProfileCTA = useCallback(() => {
    setChatOpen(false);
    const quizEl = document.getElementById('quiz');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!matrixInteracted) return null;

  return (
    <>
      <section className="sec-dark relative py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]">
        <div className="mx-auto max-w-[600px] text-center">
          <RevealSection>
            <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              WHERE → WHAT → HOW
            </span>
          </RevealSection>

          <RevealSection delay={100}>
            <h2 className="mb-6 text-cream">
              You found your quadrant. Now let the framework read every ingredient and show you what to cook next. Delicious is possible.
            </h2>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="mx-auto max-w-[600px] space-y-5 text-[clamp(0.92rem,2vw,1rem)] leading-[1.75] text-cream-mid">
              <p>
                The Matrix showed you the map. Where the heat lives, where the sauce is thin or rich. That's orientation. It's a starting point, not the whole picture.
              </p>
              <p>
                What comes next is personal. The Pepper Sauce Principle doesn't hand you a pamphlet and wish you well. It sits at the table with you. A short conversation with the framework itself, two minutes, where it asks what kind of fire you're carrying and starts to read what's in your sauce.
              </p>
              <p>
                From there, the full Pepper Sauce Profile maps all five conditions, identifies your fire type, and shows you what your recipe actually contains. Five minutes. Free. And the most honest look at your kitchen you've had in a while.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="mt-10">
              <button
                onClick={() => setChatOpen(true)}
                className="inline-block rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
              >
                Have a seat at the table
              </button>
              <p className="mt-3 font-body text-[0.75rem] text-cream/50">
                A two-minute conversation. No signup. No diagnosis. Just a taste of how the framework sees you.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {chatOpen && (
        <PreProfileChat
          quadrantExplored={matrixQuadrant}
          onClose={() => setChatOpen(false)}
          onProfileCTA={handleProfileCTA}
        />
      )}
    </>
  );
}
