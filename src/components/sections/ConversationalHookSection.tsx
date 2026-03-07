import { useState, useCallback, useRef } from 'react';
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
    // Scroll to quiz section
    const quizEl = document.getElementById('quiz');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!matrixInteracted) return null;

  return (
    <>
      <RevealSection>
        <section className="sec-dark relative py-12 md:py-16">
          <div className="mx-auto max-w-[640px] px-6 text-center">
            <p className="mb-6 font-body text-[clamp(0.95rem,2.2vw,1.08rem)] leading-[1.7] text-cream-soft/80">
              Before you take the full Profile, want a quick taste of how the framework reads a recipe?
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="inline-block rounded-md bg-gold px-8 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
            >
              Start a conversation
            </button>
            <p className="mt-3 font-accent text-[0.78rem] italic text-cream-soft/35">
              Two minutes. No signup. Just a taste.
            </p>
          </div>
        </section>
      </RevealSection>

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
