import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  ITEMS,
  CONDITION_NAMES,
  CONDITION_SUBTITLES,
  CONDITION_COLORS,
  LIKERT_LABELS,
  FIRE_NAMES,
  FIRE_DESC,
  getConditionLabel,
  scoreCondition,
  getPrimaryFireType,
  getChronicFireType,
  getInterpretation,
} from '@/data/quizData';

type Phase = 'landing' | 'quiz' | 'fireIntro' | 'fire' | 'results';

export function QuizSection() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [currentItem, setCurrentItem] = useState(0);
  const [responses, setResponses] = useState<Record<number, number | string>>({});
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [scovilleTriggered, setScovilleTriggered] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (phase !== 'results' || submittedRef.current) return;
    submittedRef.current = true;

    const scores: Record<number, number> = {};
    for (let c = 1; c <= 5; c++) scores[c] = scoreCondition(c, responses);
    const pFire = getPrimaryFireType(responses);
    const cFire = getChronicFireType(responses);
    const pLabel = pFire.map(f => FIRE_NAMES[f]).join(' · ');
    const scovilleItems = [6, 17, 24].filter(id => (responses[id] as number) >= 5);

    const row: Record<string, unknown> = {
      name: userName,
      email: userEmail,
      score_validation: scores[1],
      score_agency: scores[2],
      score_community: scores[3],
      score_capacity: scores[4],
      score_generativity: scores[5],
      primary_fire_type: pLabel,
      chronic_fire_type: cFire ? FIRE_NAMES[cFire] : null,
      scoville_gate_triggered: scovilleItems.length > 0,
      scoville_items_flagged: scovilleItems.map(String),
    };
    for (let i = 1; i <= 33; i++) {
      row[`item_${i}`] = responses[i] ?? null;
    }

    supabase.from('quiz_submissions').insert(row as any).then(null, () => {});
  }, [phase]);


  const likertItems = ITEMS.filter(i => i.type === 'likert');
  const fireItems = ITEMS.filter(i => i.type === 'fire');

  const scrollToQuiz = useCallback(() => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleStart = () => {
    const nameOk = userName.trim().length > 0;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim());
    setNameError(!nameOk);
    setEmailError(!emailOk);
    if (!nameOk || !emailOk) return;
    setPhase('quiz');
    setCurrentItem(0);
    setTimeout(scrollToQuiz, 100);
  };

  const handleLikertSelect = (itemId: number, value: number, scoring?: string) => {
    setResponses(prev => ({ ...prev, [itemId]: value }));
    if (scoring === 'scoville' && value >= 5) {
      setScovilleTriggered(true);
    }
    setTimeout(() => {
      if (currentItem + 1 >= likertItems.length) {
        setPhase('fireIntro');
      } else {
        setCurrentItem(prev => prev + 1);
      }
      scrollToQuiz();
    }, 300);
  };

  const handleFireSelect = (itemId: number, value: string) => {
    setResponses(prev => ({ ...prev, [itemId]: value }));
    setTimeout(() => {
      if (currentItem + 1 >= fireItems.length) {
        setPhase('results');
      } else {
        setCurrentItem(prev => prev + 1);
      }
      scrollToQuiz();
    }, 350);
  };

  // LANDING
  if (phase === 'landing') {
    return (
      <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
        <div className="mx-auto max-w-[var(--wide-max)]">
          <div className="mx-auto max-w-[680px] text-center" role="region" aria-label="Pepper Sauce Profile Assessment">
            <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-muted">
              The Pepper Sauce Profile
            </span>
            <h2>What's Your Recipe?</h2>
            <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />
            <p className="mx-auto mb-4 max-w-[560px]">
              Everyone's carrying something. This profile reads what you're making with it — which ingredients you have in place, which ones are missing, and what kind of fire you're carrying right now.
            </p>
            <p className="mx-auto mb-6 max-w-[560px] text-[0.92rem] text-text-light">
              This is not a diagnosis. There are no wrong answers. Think of it as an honest look at your kitchen.
            </p>
            <p className="mb-6 font-accent text-[1.1rem] italic text-gold-muted">Discover your recipe</p>
            <p className="mb-6 text-[0.92rem] text-text-light">
              <strong>Where should we send your full profile?</strong>
            </p>
            <div className="mx-auto flex max-w-[420px] flex-col gap-3">
              <input
                type="text"
                placeholder="Your first name"
                aria-label="First name"
                value={userName}
                onChange={(e) => { setUserName(e.target.value); setNameError(false); }}
                className={cn(
                  "rounded-md border-[1.5px] bg-cream px-4 py-3.5 font-body text-[0.95rem] text-text-body transition-colors focus:border-gold focus:outline-none",
                  nameError ? 'border-ember' : 'border-cream-mid'
                )}
              />
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                value={userEmail}
                onChange={(e) => { setUserEmail(e.target.value); setEmailError(false); }}
                className={cn(
                  "rounded-md border-[1.5px] bg-cream px-4 py-3.5 font-body text-[0.95rem] text-text-body transition-colors focus:border-gold focus:outline-none",
                  emailError ? 'border-ember' : 'border-cream-mid'
                )}
              />
              <button
                onClick={handleStart}
                className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
              >
                Start My Profile
              </button>
            </div>
            <p className="mt-2 text-[0.85rem] text-text-faint">
              5–7 minutes · 33 items · Free · Not a diagnostic instrument
            </p>
          </div>
        </div>
      </section>
    );
  }

  // QUIZ ITEM (Likert)
  if (phase === 'quiz') {
    const item = likertItems[currentItem];
    const itemIndex = ITEMS.indexOf(item);
    const condLabel = getConditionLabel(itemIndex);
    const selected = responses[item.id] as number | undefined;
    const progress = ((currentItem) / likertItems.length * 100).toFixed(0);

    return (
      <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
        <div className="mx-auto max-w-[var(--wide-max)]">
          <div className="quiz-fade-in mx-auto max-w-[680px]" role="region" aria-label="Pepper Sauce Profile Assessment">
            {/* Progress */}
            <div className="mb-8">
              <div className="h-1 w-full overflow-hidden rounded-sm bg-cream-mid">
                <div
                  className="h-full rounded-sm transition-all duration-400"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))' }}
                />
              </div>
              <div className="mt-1.5 text-right text-[0.8rem] text-text-faint">
                Part I · Item {currentItem + 1} of {likertItems.length}
              </div>
            </div>

            <div className="quiz-fade-in" key={item.id}>
              <div className="mb-6 font-accent text-[0.95rem] italic text-gold-muted">{condLabel}</div>
              <div className="mb-8 font-display text-[clamp(1.15rem,2.5vw,1.35rem)] leading-[1.5] text-text-body">
                {item.text}
              </div>

              <div className="mb-4 grid grid-cols-6 gap-2 max-[500px]:grid-cols-3 max-[500px]:gap-2.5" role="radiogroup" aria-label="Rate this statement">
                {[1, 2, 3, 4, 5, 6].map(v => (
                  <label
                    key={v}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 px-1 py-3 transition-all duration-200",
                      selected === v
                        ? 'border-gold bg-gold-pale'
                        : 'border-transparent hover:bg-gold-pale'
                    )}
                    tabIndex={0}
                    role="radio"
                    aria-checked={selected === v}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLikertSelect(item.id, v, item.scoring);
                      }
                    }}
                    onClick={() => handleLikertSelect(item.id, v, item.scoring)}
                  >
                    <input type="radio" name={`item${item.id}`} value={v} className="hidden" checked={selected === v} readOnly />
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[0.85rem] font-semibold transition-all",
                        selected === v
                          ? 'border-gold bg-gold text-dark'
                          : 'border-cream-mid text-text-faint'
                      )}
                    >
                      {v}
                    </div>
                    <div className="text-center text-[0.68rem] leading-tight text-text-faint whitespace-pre-line">
                      {LIKERT_LABELS[v - 1]}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              {currentItem > 0 ? (
                <button
                  onClick={() => { setCurrentItem(prev => prev - 1); scrollToQuiz(); }}
                  className="rounded-md border-2 border-cream-mid bg-transparent px-6 py-2.5 font-body text-[0.95rem] font-semibold text-text-body transition-all hover:border-gold hover:text-gold"
                >
                  ← Back
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // FIRE INTRO
  if (phase === 'fireIntro') {
    return (
      <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
        <div className="mx-auto max-w-[var(--wide-max)]">
          <div className="mx-auto max-w-[680px] py-8 text-center" role="region" aria-label="Pepper Sauce Profile Assessment">
            <h3 className="mb-4 text-text-body">Part II: Your Fire</h3>
            <div className="mx-auto my-6 h-[3px] w-[60px] rounded-sm bg-gold" />
            <p className="mx-auto mb-6 max-w-[520px]">
              Every pepper produces a different fire. A Scotch bonnet doesn't burn the same way as a jalapeño. The heat that comes from losing someone you love is different from the heat that comes from being treated unfairly by a system that was never built for you. Neither is hotter or more legitimate. They're different peppers.
            </p>
            <p className="mb-8 font-accent italic text-gold-muted">
              Now let's find out what kind of fire you're carrying.
            </p>
            <button
              onClick={() => { setPhase('fire'); setCurrentItem(0); scrollToQuiz(); }}
              className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    );
  }

  // FIRE ITEMS
  if (phase === 'fire') {
    const item = fireItems[currentItem];
    const selected = responses[item.id] as string | undefined;
    const progress = ((currentItem) / fireItems.length * 100).toFixed(0);

    return (
      <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
        <div className="mx-auto max-w-[var(--wide-max)]">
          <div className="quiz-fade-in mx-auto max-w-[680px]" role="region" aria-label="Pepper Sauce Profile Assessment">
            <div className="mb-8">
              <div className="h-1 w-full overflow-hidden rounded-sm bg-cream-mid">
                <div
                  className="h-full rounded-sm transition-all duration-400"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))' }}
                />
              </div>
              <div className="mt-1.5 text-right text-[0.8rem] text-text-faint">
                Part II · Question {currentItem + 1} of {fireItems.length}
              </div>
            </div>

            <div className="quiz-fade-in" key={item.id}>
              <div className="mb-8 font-display text-[clamp(1.15rem,2.5vw,1.35rem)] leading-[1.5] text-text-body">
                {item.text}
              </div>

              <div className="mb-6 flex flex-col gap-3">
                {item.options!.map(opt => (
                  <div
                    key={opt.val}
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-lg border-2 px-5 py-4 text-left transition-all duration-200",
                      selected === opt.val
                        ? 'border-gold bg-gold-pale'
                        : 'border-cream-mid hover:border-gold-muted hover:bg-gold-pale/30'
                    )}
                    tabIndex={0}
                    role="radio"
                    aria-checked={selected === opt.val}
                    onClick={() => handleFireSelect(item.id, opt.val)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFireSelect(item.id, opt.val);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mt-0.5 h-6 w-6 flex-shrink-0 rounded-full border-2 transition-all",
                        selected === opt.val ? 'border-gold bg-gold' : 'border-cream-mid'
                      )}
                    />
                    <div className="text-[0.92rem] leading-[1.55] text-text-body">{opt.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => {
                  if (currentItem === 0) {
                    setPhase('fireIntro');
                  } else {
                    setCurrentItem(prev => prev - 1);
                  }
                  scrollToQuiz();
                }}
                className="rounded-md border-2 border-cream-mid bg-transparent px-6 py-2.5 font-body text-[0.95rem] font-semibold text-text-body transition-all hover:border-gold hover:text-gold"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // RESULTS
  const scores: Record<number, number> = {};
  for (let c = 1; c <= 5; c++) scores[c] = scoreCondition(c, responses);

  const primaryFire = getPrimaryFireType(responses);
  const chronicFire = getChronicFireType(responses);

  const primaryLabel = primaryFire.map(f => FIRE_NAMES[f]).join(' · ');
  const primaryDesc = FIRE_DESC[primaryFire[0]];


  return (
    <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
      <div className="mx-auto max-w-[var(--wide-max)]">
        <div className="mx-auto max-w-[680px]" role="region" aria-label="Quiz Results">
          <div className="text-center">
            <h2 className="mb-2">{userName}'s Recipe</h2>
            <p className="mb-8 font-accent italic text-gold-muted">Your Pepper Sauce Profile</p>
          </div>

          {/* Safety gate */}
          {scovilleTriggered && (
            <div className="mb-10 rounded-[10px] border border-ember/20 bg-ember/[0.08] p-7 text-left">
              <p className="text-[0.95rem] leading-[1.7] text-text-body">
                <strong>Before we share your recipe,</strong> we want you to know: one of your responses tells us you may be carrying something heavier than this assessment was built for. The Pepper Sauce Principle never asks anyone to sit with something that is destroying them and call it flavor.
              </p>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-body">
                If you're in crisis, please reach out:{' '}
                <a href="tel:988" className="font-semibold text-ember">
                  988 Suicide & Crisis Lifeline
                </a>{' '}
                (call or text 988). You deserve support. That's not replacing your recipe. It's adding an ingredient.
              </p>
            </div>
          )}

          {/* Five Conditions */}
          <h3 className="mb-6 text-left">Your Five Conditions</h3>
          {[1, 2, 3, 4, 5].map(c => {
            const score = scores[c];
            const pct = ((score - 5) / 25 * 100).toFixed(0);
            return (
              <div key={c} className="mb-5">
                <div className="mb-1 flex items-center justify-between text-[0.88rem] font-medium">
                  <span>
                    {CONDITION_NAMES[c]}{' '}
                    <span className="text-[0.8rem] text-text-faint">({CONDITION_SUBTITLES[c]})</span>
                  </span>
                  <span className="font-bold">{score}/30</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream-mid">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%`, backgroundColor: CONDITION_COLORS[c] }}
                  />
                </div>
                <p className="mt-1 text-left text-[0.85rem] leading-[1.5] text-text-light">
                  {getInterpretation(score)}
                </p>
              </div>
            );
          })}

          {/* Primary Fire */}
          <div className="my-8 rounded-xl bg-dark p-8 text-center">
            <div className="mb-2 text-[2.5rem]">🌶️</div>
            <h3 className="mb-2 text-gold-light">Your Primary Fire: {primaryLabel}</h3>
            <p className="text-[0.95rem] text-cream-soft">{primaryDesc}</p>
          </div>

          {/* Chronic Fire */}
          {chronicFire && (
            <div className="my-8 rounded-xl bg-dark-mid p-8 text-center">
              <p className="mb-2 font-accent italic text-gold-muted">
                And here's the fire you've been carrying longest…
              </p>
              <h3 className="mb-2 text-gold-light">Your Chronic Fire: {FIRE_NAMES[chronicFire]}</h3>
              <p className="text-[0.95rem] text-cream-soft">{FIRE_DESC[chronicFire]}</p>
              {chronicFire !== primaryFire[0] && (
                <p className="mt-4 border-t border-gold/15 pt-4 text-[0.9rem] text-cream-mid">
                  Right now, you're carrying {FIRE_NAMES[primaryFire[0]]} — that's the pepper on the counter today. But the one that's been sitting in the jar the longest is {FIRE_NAMES[chronicFire]}. These are two different peppers, and they may need different ingredients. Both are real. Both deserve a recipe.
                </p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-10 text-center">
            <p className="mb-2 font-display text-[1.2rem]">Pass the Sauce</p>
            <p className="mb-6 text-text-light">Share your recipe with someone.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5"
              >
                Print My Results
              </button>
              <a
                href="#book"
                className="rounded-md bg-dark px-9 py-3.5 font-body text-[0.95rem] font-semibold text-cream transition-all hover:bg-dark-warm hover:-translate-y-0.5"
              >
                Want to Go Deeper?
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-[0.82rem] text-text-faint">
            What you just shared is your recipe as it stands today — not a grade, not a diagnosis, just an honest look at what you're working with. Recipes change. Kitchens get fuller. New ingredients show up. The fact that you took the time to look at yours means you're already cooking.
          </p>
        </div>
      </div>
    </section>
  );
}
