import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Share2, Copy, Check, Printer, Twitter, Facebook, Linkedin } from 'lucide-react';
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
import { CONDITION_INSIGHTS, FRAMEWORK_REMINDER } from '@/data/conditionInsights';

type Phase = 'landing' | 'quiz' | 'fireIntro' | 'fire' | 'results';

/* ── Fire-to-thin-condition copy mapping ── */
const FIRE_CONDITION_MAP: Record<string, Record<number, string>> = {
  A: {
    1: "\u201CWhen the fire is personal\u00A0\u2014 your own pain, your own body, your own loss\u00A0\u2014 having someone believe the burn is real changes everything. That\u2019s where to start.\u201D",
    2: "\u201CYou\u2019re carrying personal fire, but the recipe feels like it\u2019s happening to you rather than something you\u2019re making. Even one deliberate choice about how you hold this pain shifts the whole dish.\u201D",
  },
  B: {
    3: "\u201CThe burn is between you and someone else\u00A0\u2014 but you may be processing it alone. Relational fire needs a table, even when the person who caused the burn isn\u2019t sitting at it.\u201D",
    1: "\u201CThe hardest part of relational fire is when no one sees it\u00A0\u2014 or when they take sides. Your burn deserves a witness who doesn\u2019t try to fix it.\u201D",
  },
  C: {
    3: "\u201CYou\u2019re carrying a burn the whole community shares\u00A0\u2014 but you may be holding your piece of it in isolation. Communal fire can only be held communally.\u201D",
    5: "\u201CThe fire you\u2019re carrying didn\u2019t start with you. Passing forward what you\u2019ve learned\u00A0\u2014 your recipe for holding it\u00A0\u2014 is how communal pain becomes communal wisdom.\u201D",
    2: "\u201CSystemic pain can make it feel like you have no say in the recipe. But even when you can\u2019t change the system, you can still author the part that\u2019s yours. That\u2019s where Condition 2 comes in.\u201D",
  },
  D: {
    1: "\u201CThe fire was passed to you before you had words for it. Naming it\u00A0\u2014 saying \u2018the pepper is real, and I didn\u2019t plant it\u2019\u00A0\u2014 is the first ingredient.\u201D",
    2: "\u201CYou inherited this fire. You didn\u2019t choose it. But you get to choose what you do with it\u00A0\u2014 and that choice is where the recipe becomes yours instead of theirs.\u201D",
    4: "\u201CInherited pain often arrives without instructions. Building the ability to hold what was passed down\u00A0\u2014 without being consumed by it\u00A0\u2014 is where Condition 4 becomes urgent.\u201D",
  },
  E: {
    4: "\u201CYou chose this burn\u00A0\u2014 you\u2019re doing hard things on purpose. But you may be pushing past your heat tolerance. Growth fire still needs graduated engagement, not an all\u2011at\u2011once blaze.\u201D",
    3: "\u201CYou\u2019re building something difficult and meaningful\u00A0\u2014 but you\u2019re building it alone. Even intentional fire needs a table.\u201D",
    5: "\u201CYou\u2019re stretching toward something new but haven\u2019t yet made anything shareable from the stretch. What you\u2019re learning in the discomfort is already a recipe worth passing.\u201D",
  },
};

const BLEND_FALLBACK = "\u201CEvery fire needs its own blend. The conditions that are thin in your recipe right now aren\u2019t failures\u00A0\u2014 they\u2019re the ingredients you haven\u2019t added yet. And every one of them can be strengthened.\u201D";

/* ── Signature Blend Component ── */
function SignatureBlend({ scores, primaryFire }: { scores: Record<number, number>; primaryFire: string[] }) {
  const anchors = [1, 2, 3, 4, 5].filter(c => scores[c] >= 21);
  const thin = [1, 2, 3, 4, 5].filter(c => scores[c] <= 12);

  const fireKey = primaryFire[0];
  const mapping = FIRE_CONDITION_MAP[fireKey] || {};
  let fireBlendLine: string | null = null;
  for (const c of thin) {
    if (mapping[c]) { fireBlendLine = mapping[c]; break; }
  }
  if (!fireBlendLine) fireBlendLine = BLEND_FALLBACK;

  return (
    <div className="my-10 rounded-xl border border-gold/20 bg-dark p-8">
      <h3 className="mb-3 text-center font-display text-gold-light">Your Signature Blend</h3>
      <p className="mb-6 text-center text-[0.92rem] leading-[1.7] text-cream-mid">
        Your fire tells us what kind of heat you&#8217;re carrying. Your conditions tell us what&#8217;s in the recipe alongside it. Together, they reveal your signature blend&nbsp;&#8212; the unique combination of ingredients that makes your sauce yours.
      </p>

      {anchors.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 text-[0.88rem] font-semibold text-gold-light">
            Your anchors&nbsp;&#8212; the ingredients you&#8217;re already cooking with:
          </p>
          <p className="text-[0.9rem] text-cream-soft">
            {anchors.map(c => CONDITION_NAMES[c]).join(', ')}
          </p>
        </div>
      )}

      {thin.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 text-[0.88rem] font-semibold text-cream-mid">
            Where your recipe has room&nbsp;&#8212; the ingredients that could change the whole flavor:
          </p>
          <p className="text-[0.9rem] text-cream-mid/70">
            {thin.map(c => CONDITION_NAMES[c]).join(', ')}
          </p>
        </div>
      )}

      <p className="mb-6 text-[0.92rem] italic leading-[1.7] text-cream-soft">
        {fireBlendLine}
      </p>

      <p className="text-center text-[0.88rem] text-cream-mid">
        This is your recipe as it stands today. Not a grade. Not a diagnosis. A starting point&nbsp;&#8212; and a reminder that you&#8217;re already cooking.
      </p>
    </div>
  );
}

/* ── Extended Profile Upsell Component ── */
function ExtendedProfileUpsell({ email, name }: { email: string; name: string }) {
  const [purchased, setPurchased] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState<number | null>(null);

  useEffect(() => {
    // Check for returning from Stripe success
    const params = new URLSearchParams(window.location.search);
    if (params.get('session_id')) {
      setPurchased(true);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname + '#quiz');
    }
    // Fetch purchase count for pricing
    supabase
      .from('extended_profile_purchases')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => setPurchaseCount(count ?? 0));
  }, []);

  const isIntro = purchaseCount !== null && purchaseCount < 50;
  const price = isIntro ? '$14.50' : '$29';

  const handlePurchase = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { email, name },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setSubmitting(false);
    }
  };

  if (purchased) {
    return (
      <div className="mt-10 rounded-xl border border-gold/20 bg-dark p-8 text-center">
        <div className="mb-3 text-[2rem]">&#10003;</div>
        <h3 className="mb-3 text-gold-light">You&#8217;re In</h3>
        <p className="text-[0.95rem] leading-[1.7] text-cream-soft">
          We&#8217;ll send your Extended Profile questions within 24 hours. Your personalized report arrives within 48 hours of completion.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border border-gold/20 bg-dark p-8 text-center">
      <h3 className="mb-3 font-display text-gold-light">Want to Go Deeper?</h3>
      <p className="mx-auto mb-6 max-w-[560px] text-[0.92rem] leading-[1.7] text-cream-soft">
        Your Pepper Sauce Profile gave you the broad strokes&nbsp;&#8212; your fire, your conditions, your signature blend. The Extended Pepper Sauce Profile takes it further: a personalized analysis of how your specific fire interacts with your specific recipe, along with concrete next steps tailored to where you are right now. Answer a few more questions, and within 48 hours you&#8217;ll receive a detailed, individualized report designed around your results.
      </p>
      <p className="mb-2 font-display text-[1.5rem] text-gold-light">
        {price}&nbsp;&#8212; one&#8209;time
      </p>
      {isIntro && (
        <p className="mb-4 text-[0.78rem] text-cream-mid/70">
          Introductory pricing&nbsp;&#8212; {50 - (purchaseCount ?? 0)} spots remaining at this rate
        </p>
      )}
      <p className="mb-4 text-[0.85rem] text-cream-mid">
        Your email: <span className="font-semibold text-cream-soft">{email}</span>
      </p>
      <button
        onClick={handlePurchase}
        disabled={submitting}
        className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)] disabled:opacity-50"
      >
        {submitting ? 'Processing\u2026' : 'Get My Extended Profile'}
      </button>
    </div>
  );
}

/* ── Share Actions Component ── */
function ShareActions({ shareText, shareUrl }: { shareText: string; shareUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = `${shareText} ${shareUrl}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Pepper Sauce Profile', text: shareText, url: shareUrl });
      } catch { /* user cancelled */ }
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="quiz-fade-in mt-10 rounded-2xl border border-gold/15 bg-cream/80 p-8 text-center">
      <div className="mb-2 flex items-center justify-center gap-2 text-gold-muted">
        <Share2 className="h-4 w-4" />
        <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em]">Share Your Recipe</span>
      </div>
      <p className="mx-auto mb-6 max-w-[420px] text-[0.88rem] text-text-light">
        Invite someone to discover their own recipe — or save yours for later.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Social share buttons */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm"
          aria-label="Share on X / Twitter"
        >
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">X / Twitter</span>
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[0.85rem] font-medium transition-all",
            copied
              ? "border-sage bg-sage/10 text-sage"
              : "border-cream-mid bg-cream text-text-body hover:border-gold hover:shadow-sm"
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>

        {/* Native share (mobile) */}
        {'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm sm:hidden"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        )}

        {/* Print */}
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[0.85rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,150,46,0.3)]"
        >
          <Printer className="h-4 w-4" />
          Print Results
        </button>
      </div>
    </div>
  );
}

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
  const isTransitioning = useRef(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const trackEvent = useCallback((event_type: string, event_data: Record<string, unknown> = {}) => {
    supabase.from('quiz_analytics').insert({
      session_id: sessionId,
      event_type,
      event_data,
    } as any).then(null, () => {});
  }, [sessionId]);

  useEffect(() => {
    if (phase !== 'results' || submittedRef.current) return;
    submittedRef.current = true;

    const scores: Record<number, number> = {};
    for (let c = 1; c <= 5; c++) scores[c] = scoreCondition(c, responses);
    const pFire = getPrimaryFireType(responses);
    const cFire = getChronicFireType(responses);
    const pLabel = pFire.map(f => FIRE_NAMES[f]).join(' · ');
    const scovilleItems = [6, 17, 24, 29].filter(id => (responses[id] as number) >= 5);

    // Table 1: Identified profile (scores + flags only, NO raw item responses)
    const profileRow: Record<string, unknown> = {
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
      gate_overwhelm: scovilleItems.includes(6),
      gate_safety: scovilleItems.includes(17),
      gate_burdensomeness: scovilleItems.includes(24),
      gate_numbing: scovilleItems.includes(29),
    };
    supabase.from('quiz_submissions').insert(profileRow as any).then(null, () => {});

    // Analytics: completion event
    const gateNames: string[] = [];
    if (scovilleItems.includes(6)) gateNames.push('overwhelm');
    if (scovilleItems.includes(17)) gateNames.push('safety');
    if (scovilleItems.includes(24)) gateNames.push('burdensomeness');
    if (scovilleItems.includes(29)) gateNames.push('numbing');
    trackEvent('complete', { gates: gateNames, gate_count: gateNames.length, primary_fire: pFire[0] || null });

    // Table 2: De-identified responses (NO email, NO user link)
    const anonRow: Record<string, unknown> = {};
    for (let i = 1; i <= 34; i++) {
      anonRow[`item_${i}`] = responses[i] ?? null;
    }
    supabase.from('anonymous_responses').insert(anonRow as any).then(null, () => {});
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
    trackEvent('start');
    setPhase('quiz');
    setCurrentItem(0);
    setTimeout(scrollToQuiz, 100);
  };

  const handleLikertSelect = (itemId: number, value: number, scoring?: string) => {
    if (isTransitioning.current) return;
    setResponses(prev => ({ ...prev, [itemId]: value }));
    trackEvent('item_answer', { item_id: itemId, phase: 'quiz', index: currentItem });
    if (scoring === 'scoville' && value >= 5) {
      setScovilleTriggered(true);
    }
    isTransitioning.current = true;
    setTimeout(() => {
      if (currentItem + 1 >= likertItems.length) {
        setPhase('fireIntro');
      } else {
        setCurrentItem(prev => prev + 1);
      }
      isTransitioning.current = false;
      scrollToQuiz();
    }, 300);
  };

  const handleFireSelect = (itemId: number, value: string) => {
    if (isTransitioning.current) return;
    setResponses(prev => ({ ...prev, [itemId]: value }));
    trackEvent('item_answer', { item_id: itemId, phase: 'fire', index: currentItem });
    isTransitioning.current = true;
    setTimeout(() => {
      if (currentItem + 1 >= fireItems.length) {
        setPhase('results');
      } else {
        setCurrentItem(prev => prev + 1);
      }
      isTransitioning.current = false;
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
                onChange={(e) => { setUserName(e.target.value.slice(0, 100)); setNameError(false); }}
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
                onChange={(e) => { setUserEmail(e.target.value.slice(0, 255)); setEmailError(false); }}
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
            <p className="mt-3 text-[0.8rem] leading-[1.5] text-text-faint italic">
              Your individual responses are not reviewed, shared, or stored in identifiable form. Only your recipe results are saved.
            </p>
            <p className="mt-2 text-[0.85rem] text-text-faint">
              5–7 minutes · 34 items · Free · Not a diagnostic instrument
            </p>
          </div>
        </div>
      </section>
    );
  }

  // QUIZ ITEM (Likert)
  if (phase === 'quiz') {
    const item = likertItems[currentItem];
    if (!item) {
      setCurrentItem(0);
      return null;
    }
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
              onClick={() => { trackEvent('phase_change', { phase: 'fireIntro' }); setPhase('fire'); setCurrentItem(0); scrollToQuiz(); }}
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
    if (!item) {
      setCurrentItem(0);
      return null;
    }
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

  const shareText = `I just discovered my Pepper Sauce Profile — my primary fire is ${primaryLabel}. What's yours?`;
  const shareUrl = 'https://pepper-profile-spark.lovable.app/#quiz';

  return (
    <section className="bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)]" id="quiz">
      <div className="mx-auto max-w-[var(--wide-max)]">
        <div className="mx-auto max-w-[720px]" role="region" aria-label="Quiz Results">

          {/* ── Header with decorative line ── */}
          <div className="quiz-fade-in text-center mb-10">
            <div className="inline-block mb-4">
              <span className="block font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold-muted mb-3">Your Pepper Sauce Profile</span>
              <div className="mx-auto h-[3px] w-[60px] rounded-sm bg-gold mb-4" />
            </div>
            <h2 className="mb-3">{userName}'s Recipe</h2>
            <p className="mx-auto max-w-[540px] text-[0.88rem] leading-[1.65] text-text-light">
              Your profile shows broad patterns — not a personalized clinical assessment. Think of it as reading the label on your jar: you can see what's inside, but the full recipe is richer than any label can capture.
            </p>
          </div>

          {/* Scoville Gate — Modular Responses */}
          {scovilleTriggered && (() => {
            const gateItems = [6, 17, 24, 29].filter(id => (responses[id] as number) >= 5);
            return (
              <div className="quiz-fade-in mb-10 rounded-[12px] border border-ember/20 bg-ember/[0.06] p-7 text-left shadow-[0_4px_20px_rgba(184,69,26,0.08)]">
                <p className="text-[0.95rem] leading-[1.7] text-text-body">
                  <strong>One more thing.</strong> Some of what you shared tells us the pepper you're carrying right now is serious — the kind that can do real harm if you're handling it without the right tools. That's not a judgment on your recipe. It's a sign that this particular pepper deserves a trained cook in your kitchen.
                </p>

                {gateItems.length > 1 && (
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-body italic">
                    You flagged more than one area where the heat is serious. That's not a sign that your recipe is broken — it's a sign that right now, you need more than one kind of help. That's okay. Here's where to start.
                  </p>
                )}

                {gateItems.includes(6) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">
                      The weight you described — that feeling of not being sure you can keep carrying it — is exactly what crisis support is built for. You don't have to carry this alone, and reaching out is not a sign of weakness. It's adding an ingredient.
                    </p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:988">988 Suicide &amp; Crisis Lifeline</a> (call or text 988) · <a href="sms:741741&body=HOME">Crisis Text Line</a> (text HOME to 741741)
                    </p>
                  </div>
                )}

                {gateItems.includes(17) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">
                      Feeling unsafe is not something you should have to cook through alone. If your safety is at risk — in your home, your relationship, or your environment — there are people trained to help with exactly this kind of heat.
                    </p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:18007997233">National Domestic Violence Hotline</a> (1-800-799-7233) · If in immediate danger, <a href="tel:911">call 911</a>
                    </p>
                  </div>
                )}

                {gateItems.includes(24) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">
                      That thought — that the people in your life would be better off without you — is one of the most painful peppers there is. And it lies. <strong>The people in your life are not better off without you.</strong> Please talk to someone who can help you see that clearly.
                    </p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:988">988 Suicide &amp; Crisis Lifeline</a> (call or text 988) · <a href="sms:741741&body=HOME">Crisis Text Line</a> (text HOME to 741741)
                    </p>
                  </div>
                )}

                {gateItems.includes(29) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">
                      Using something to numb the pain makes sense — when the heat is unbearable, you reach for whatever turns it down. But if that pattern is doing its own damage, your recipe needs a different kind of help. Not judgment. Not shame. Just someone who knows how to work with this.
                    </p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:18006624357">SAMHSA National Helpline</a> (1-800-662-4357, free, confidential, 24/7)
                    </p>
                  </div>
                )}

                <p className="mt-4 border-t border-ember/15 pt-4 text-[0.92rem] leading-[1.7] text-text-body">
                  A counselor, a therapist, a crisis line — someone who knows how to work with this kind of heat. That's not replacing your recipe. It's adding an ingredient.
                </p>
              </div>
            );
          })()}

          {/* ── Primary Fire — Hero Card ── */}
          <div className="quiz-fade-in mb-10 overflow-hidden rounded-2xl bg-dark shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <div className="relative px-8 py-10 text-center" style={{ background: 'linear-gradient(135deg, hsl(var(--dark)) 0%, hsl(var(--dark-warm)) 50%, hsl(43 33% 12%) 100%)' }}>
              <div className="mb-4 text-[3rem] leading-none">🌶️</div>
              <span className="mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-muted">Your Primary Fire</span>
              <h3 className="mb-4 text-gold-light" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>{primaryLabel}</h3>
              <p className="mx-auto max-w-[520px] text-[0.95rem] leading-[1.7] text-cream-soft">{primaryDesc}</p>
            </div>
          </div>

          {/* ── Five Conditions — Enhanced Cards ── */}
          <div className="quiz-fade-in mb-10">
            <h3 className="mb-2 text-center">Your Five Conditions</h3>
            <p className="mx-auto mb-8 max-w-[480px] text-center text-[0.85rem] text-text-faint">How well-stocked each ingredient is in your recipe right now</p>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(c => {
                const score = scores[c];
                const pct = Math.max(2, ((score - 5) / 25 * 100));
                const interp = getInterpretation(score);
                const isStrong = score >= 21;
                const isThin = score <= 12;
                return (
                  <div
                    key={c}
                    className={cn(
                      "rounded-xl border p-5 transition-all",
                      isStrong ? "border-gold/25 bg-gold-pale/30" : isThin ? "border-ember/15 bg-ember/[0.04]" : "border-cream-mid/50 bg-cream/60"
                    )}
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <div>
                        <span className="font-display text-[1.05rem] font-bold text-text-body">{CONDITION_NAMES[c]}</span>
                        <span className="ml-2 text-[0.78rem] text-text-faint">({CONDITION_SUBTITLES[c]})</span>
                      </div>
                      <span className="whitespace-nowrap font-body text-[0.95rem] font-bold" style={{ color: CONDITION_COLORS[c] }}>
                        {score}<span className="text-[0.78rem] font-normal text-text-faint">/30</span>
                      </span>
                    </div>
                    <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-cream-mid/60">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${CONDITION_COLORS[c]}, ${CONDITION_COLORS[c]}cc)`,
                        }}
                      />
                    </div>
                    <p className="text-[0.85rem] leading-[1.55] text-text-light">{interp}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Signature Ingredient (Highest Condition) ── */}
          {(() => {
            const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
            const highestC = Number(sorted[0][0]);
            const lowestC = Number(sorted[sorted.length - 1][0]);
            const highInsight = CONDITION_INSIGHTS[highestC];
            const lowInsight = CONDITION_INSIGHTS[lowestC];

            return (
              <>
                <div className="quiz-fade-in mb-6 rounded-xl border-l-4 border-gold bg-cream/60 p-6 text-left">
                  <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-gold-muted">
                    Your Signature Ingredient
                  </span>
                  <h4 className="mb-1 font-display text-[1.1rem] font-bold text-text-body">
                    {CONDITION_NAMES[highestC]}
                    <span className="ml-2 text-[0.82rem] font-normal text-text-faint">— {CONDITION_SUBTITLES[highestC]}</span>
                  </h4>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-light">
                    {highInsight.signatureIngredient}
                  </p>
                </div>

                {/* ── What Your Recipe Might Need (Lowest Condition) ── */}
                <div className="quiz-fade-in mb-6 rounded-xl border-l-4 border-ember-soft bg-cream/60 p-6 text-left">
                  <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-ember-soft">
                    What Your Recipe Might Need
                  </span>
                  <h4 className="mb-1 font-display text-[1.1rem] font-bold text-text-body">
                    {CONDITION_NAMES[lowestC]}
                    <span className="ml-2 text-[0.82rem] font-normal text-text-faint">— {CONDITION_SUBTITLES[lowestC]}</span>
                  </h4>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-light">
                    {lowInsight.whatYouMightNeed}
                  </p>

                  <div className="mt-5 rounded-lg border-t border-ember/15 bg-ember/[0.04] px-5 py-4">
                    <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-ember-soft">
                      🌶️ Try This Week
                    </span>
                    <p className="text-[0.9rem] leading-[1.65] text-text-light italic">
                      {lowInsight.actionableInsight}
                    </p>
                  </div>
                </div>

                {/* ── Framework Reminder ── */}
                <div className="quiz-fade-in mb-10 border-t border-cream-mid/40 pt-5 text-center">
                  <p className="mx-auto max-w-[540px] text-[0.85rem] italic leading-[1.65] text-text-faint">
                    {FRAMEWORK_REMINDER}
                  </p>
                </div>
              </>
            );
          })()}

          {/* ── Chronic Fire ── */}
          {chronicFire && (
            <div className="quiz-fade-in my-8 overflow-hidden rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.2)]" style={{ background: 'linear-gradient(145deg, hsl(var(--dark-mid)), hsl(var(--dark-warm)))' }}>
              <div className="p-8 text-center">
                <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-cream-mid">The fire you've been carrying longest</span>
                <h3 className="mb-3 text-gold-light">Your Chronic Fire: {FIRE_NAMES[chronicFire]}</h3>
                <p className="mx-auto max-w-[520px] text-[0.95rem] leading-[1.7] text-cream-soft">{FIRE_DESC[chronicFire]}</p>
                {chronicFire !== primaryFire[0] && (
                  <p className="mx-auto mt-5 max-w-[520px] border-t border-gold/15 pt-5 text-[0.9rem] leading-[1.7] text-cream-mid">
                    Right now, you're carrying {FIRE_NAMES[primaryFire[0]]} — that's the pepper on the counter today. But the one that's been sitting in the jar the longest is {FIRE_NAMES[chronicFire]}. These are two different peppers, and they may need different ingredients. Both are real. Both deserve a recipe.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Signature Blend ── */}
          <SignatureBlend scores={scores} primaryFire={primaryFire} />

          {/* ── Share & Print Actions ── */}
          <ShareActions shareText={shareText} shareUrl={shareUrl} />

          {/* ── Go Deeper Upsell ── */}
          <ExtendedProfileUpsell email={userEmail} name={userName} />

          {/* ── Legal ── */}
          <p className="mt-10 text-center text-[0.78rem] leading-[1.6] text-text-faint">
            The Pepper Sauce Profile and Extended Pepper Sauce Profile are educational and personal development tools. They do not constitute clinical services, psychological assessment, diagnosis, or treatment. Purchasing or completing the Extended Profile does not establish a therapeutic, counseling, or professional&#8209;client relationship with Dr.&nbsp;Rollock or any affiliated entity. If you are in crisis or need clinical support, please contact the 988 Suicide and Crisis Lifeline (call or text 988) or your local emergency services.
          </p>
        </div>
      </div>
    </section>
  );
}
