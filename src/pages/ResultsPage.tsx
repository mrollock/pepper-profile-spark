import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  CONDITION_NAMES,
  CONDITION_SUBTITLES,
  CONDITION_COLORS,
  FIRE_NAMES,
  FIRE_DESC,
  getInterpretation,
} from '@/data/quizData';
import { CONDITION_INSIGHTS, FRAMEWORK_REMINDER } from '@/data/conditionInsights';
import { POST_RESULTS_DISCLAIMER } from '@/data/legalCopy';
import { cn } from '@/lib/utils';
import { Share2, Copy, Check, Printer, Twitter, Facebook, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

type ResultsData = {
  id: string;
  name: string;
  email: string;
  score_validation: number;
  score_agency: number;
  score_community: number;
  score_capacity: number;
  score_generativity: number;
  primary_fire_type: string | null;
  chronic_fire_type: string | null;
  scoville_gate_triggered: boolean | null;
  gate_overwhelm: boolean | null;
  gate_safety: boolean | null;
  gate_burdensomeness: boolean | null;
  gate_numbing: boolean | null;
};

/* ── Share Actions ── */
function ShareActions({ shareText, shareUrl }: { shareText: string; shareUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
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
    <div className="mt-10 rounded-2xl border border-gold/15 bg-cream/80 p-8 text-center">
      <div className="mb-2 flex items-center justify-center gap-2 text-gold-muted">
        <Share2 className="h-4 w-4" />
        <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.2em]">Share Your Recipe</span>
      </div>
      <p className="mx-auto mb-6 max-w-[420px] text-[0.88rem] text-text-light">
        Invite someone to discover their own recipe — or save yours for later.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm" aria-label="Share on X / Twitter">
          <Twitter className="h-4 w-4" /><span className="hidden sm:inline">X / Twitter</span>
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" /><span className="hidden sm:inline">Facebook</span>
        </a>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" /><span className="hidden sm:inline">LinkedIn</span>
        </a>
        <button onClick={handleCopyLink} className={cn("inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[0.85rem] font-medium transition-all", copied ? "border-sage bg-sage/10 text-sage" : "border-cream-mid bg-cream text-text-body hover:border-gold hover:shadow-sm")}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        {'share' in navigator && (
          <button onClick={handleNativeShare} className="inline-flex items-center gap-2 rounded-lg border border-cream-mid bg-cream px-4 py-2.5 text-[0.85rem] font-medium text-text-body transition-all hover:border-gold hover:shadow-sm sm:hidden">
            <Share2 className="h-4 w-4" />Share
          </button>
        )}
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[0.85rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,150,46,0.3)]">
          <Printer className="h-4 w-4" />Print Results
        </button>
      </div>
    </div>
  );
}

/* ── Extended Profile Upsell ── */
function ExtendedProfileUpsell({ email, name }: { email: string; name: string }) {
  const [purchased, setPurchased] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('session_id')) {
      setPurchased(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
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
      if (data?.url) window.location.href = data.url;
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
        Your Pepper Sauce Profile gave you the broad strokes&nbsp;&#8212; your fire, your conditions, your signature blend. The Extended Pepper Sauce Profile takes it further: a personalized analysis of how your specific fire interacts with your specific recipe, along with concrete next steps tailored to where you are right now.
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
      <button onClick={handlePurchase} disabled={submitting} className="rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)] disabled:opacity-50">
        {submitting ? 'Processing\u2026' : 'Get My Extended Profile'}
      </button>
    </div>
  );
}

/* ── Main Results Page ── */
export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }

    supabase
      .from('quiz_submissions')
      .select('id, name, email, score_validation, score_agency, score_community, score_capacity, score_generativity, primary_fire_type, chronic_fire_type, scoville_gate_triggered, gate_overwhelm, gate_safety, gate_burdensomeness, gate_numbing')
      .eq('id', id)
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (error || !row) { setNotFound(true); }
        else { setData(row as ResultsData); }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-soft">
        <div className="text-center">
          <div className="mb-4 text-[2.5rem]">🌶️</div>
          <p className="text-text-light">Loading your results…</p>
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-cream-soft pt-[var(--nav-height)]">
          <div className="mx-auto max-w-[480px] text-center px-6">
            <div className="mb-4 text-[2.5rem]">🌶️</div>
            <h2 className="mb-4">We couldn't find those results</h2>
            <p className="mb-6 text-text-light">
              The link may have expired or the ID may be incorrect. If you've taken the Pepper Sauce Profile, check your email for the correct link.
            </p>
            <Link to="/#quiz" className="inline-block rounded-md bg-gold px-8 py-3 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light">
              Take the Free Profile
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const scores: Record<number, number> = {
    1: data.score_validation ?? 0,
    2: data.score_agency ?? 0,
    3: data.score_community ?? 0,
    4: data.score_capacity ?? 0,
    5: data.score_generativity ?? 0,
  };

  // Parse fire type from stored label back to keys
  const primaryLabel = data.primary_fire_type || 'Unknown';
  const fireKeys = Object.entries(FIRE_NAMES).filter(([, v]) => primaryLabel.includes(v)).map(([k]) => k);
  const primaryFireKey = fireKeys[0] || 'A';
  const primaryDesc = FIRE_DESC[primaryFireKey] || '';

  const chronicFireLabel = data.chronic_fire_type;
  const chronicFireKey = chronicFireLabel ? Object.entries(FIRE_NAMES).find(([, v]) => v === chronicFireLabel)?.[0] : null;

  const scovilleTriggered = data.scoville_gate_triggered;
  const gateItems: number[] = [];
  if (data.gate_overwhelm) gateItems.push(6);
  if (data.gate_safety) gateItems.push(17);
  if (data.gate_burdensomeness) gateItems.push(24);
  if (data.gate_numbing) gateItems.push(29);

  const shareText = `I just discovered my Pepper Sauce Profile — my primary fire is ${primaryLabel}. What's yours?`;
  const shareUrl = `https://peppersauceprinciple.com/results/${data.id}`;

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const highestC = Number(sorted[0][0]);
  const lowestC = Number(sorted[sorted.length - 1][0]);
  const highInsight = CONDITION_INSIGHTS[highestC];
  const lowInsight = CONDITION_INSIGHTS[lowestC];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream-soft py-[var(--section-pad)] px-[clamp(1.25rem,5vw,3rem)] pt-[calc(var(--nav-height)+var(--section-pad))]">
        <div className="mx-auto max-w-[var(--wide-max)]">
          <div className="mx-auto max-w-[720px]" role="region" aria-label="Quiz Results">

            {/* Header */}
            <div className="text-center mb-10">
              <span className="block font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold-muted mb-3">Your Pepper Sauce Profile</span>
              <div className="mx-auto h-[3px] w-[60px] rounded-sm bg-gold mb-4" />
              <h2 className="mb-3">{data.name}'s Recipe</h2>
              <p className="mx-auto max-w-[540px] text-[0.88rem] leading-[1.65] text-text-light">
                Your profile shows broad patterns — not a personalized clinical assessment. Think of it as reading the label on your jar: you can see what's inside, but the full recipe is richer than any label can capture.
              </p>
            </div>

            {/* Scoville Gate */}
            {scovilleTriggered && gateItems.length > 0 && (
              <div className="mb-10 rounded-[12px] border border-ember/20 bg-ember/[0.06] p-7 text-left shadow-[0_4px_20px_rgba(184,69,26,0.08)]">
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
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">The weight you described — that feeling of not being sure you can keep carrying it — is exactly what crisis support is built for.</p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:988">988 Suicide &amp; Crisis Lifeline</a> (call or text 988) · <a href="sms:741741&body=HOME">Crisis Text Line</a> (text HOME to 741741)
                    </p>
                  </div>
                )}
                {gateItems.includes(17) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">Feeling unsafe is not something you should have to cook through alone.</p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:18007997233">National Domestic Violence Hotline</a> (1-800-799-7233) · If in immediate danger, <a href="tel:911">call 911</a>
                    </p>
                  </div>
                )}
                {gateItems.includes(24) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">That thought — that the people in your life would be better off without you — is one of the most painful peppers there is. And it lies. <strong>The people in your life are not better off without you.</strong></p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:988">988 Suicide &amp; Crisis Lifeline</a> (call or text 988) · <a href="sms:741741&body=HOME">Crisis Text Line</a> (text HOME to 741741)
                    </p>
                  </div>
                )}
                {gateItems.includes(29) && (
                  <div className="mt-4 border-t border-ember/15 pt-4">
                    <p className="text-[0.92rem] leading-[1.7] text-text-body">Using something to numb the pain makes sense — but if that pattern is doing its own damage, your recipe needs a different kind of help.</p>
                    <p className="mt-2 text-[0.9rem] font-semibold text-ember">
                      <a href="tel:18006624357">SAMHSA National Helpline</a> (1-800-662-4357, free, confidential, 24/7)
                    </p>
                  </div>
                )}
                <p className="mt-4 border-t border-ember/15 pt-4 text-[0.92rem] leading-[1.7] text-text-body">
                  A counselor, a therapist, a crisis line — someone who knows how to work with this kind of heat. That's not replacing your recipe. It's adding an ingredient.
                </p>
              </div>
            )}

            {/* Primary Fire Hero Card */}
            <div className="mb-10 overflow-hidden rounded-2xl bg-dark shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
              <div className="relative px-8 py-10 text-center" style={{ background: 'linear-gradient(135deg, hsl(var(--dark)) 0%, hsl(var(--dark-warm)) 50%, hsl(43 33% 12%) 100%)' }}>
                <div className="mb-4 text-[3rem] leading-none">🌶️</div>
                <span className="mb-2 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-muted">Your Primary Fire</span>
                <h3 className="mb-4 text-gold-light" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>{primaryLabel}</h3>
                <p className="mx-auto max-w-[520px] text-[0.95rem] leading-[1.7] text-cream-soft">{primaryDesc}</p>
              </div>
            </div>

            {/* Five Conditions */}
            <div className="mb-10">
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
                    <div key={c} className={cn("rounded-xl border p-5 transition-all", isStrong ? "border-gold/25 bg-gold-pale/30" : isThin ? "border-ember/15 bg-ember/[0.04]" : "border-cream-mid/50 bg-cream/60")}>
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
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${CONDITION_COLORS[c]}, ${CONDITION_COLORS[c]}cc)` }} />
                      </div>
                      <p className="text-[0.85rem] leading-[1.55] text-text-light">{interp}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Ingredient */}
            <div className="mb-6 rounded-xl border-l-4 border-gold bg-cream/60 p-6 text-left">
              <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-gold-muted">Your Signature Ingredient</span>
              <h4 className="mb-1 font-display text-[1.1rem] font-bold text-text-body">
                {CONDITION_NAMES[highestC]}
                <span className="ml-2 text-[0.82rem] font-normal text-text-faint">— {CONDITION_SUBTITLES[highestC]}</span>
              </h4>
              <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-light">{highInsight.signatureIngredient}</p>
            </div>

            {/* What Your Recipe Might Need */}
            <div className="mb-6 rounded-xl border-l-4 border-ember-soft bg-cream/60 p-6 text-left">
              <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-ember-soft">What Your Recipe Might Need</span>
              <h4 className="mb-1 font-display text-[1.1rem] font-bold text-text-body">
                {CONDITION_NAMES[lowestC]}
                <span className="ml-2 text-[0.82rem] font-normal text-text-faint">— {CONDITION_SUBTITLES[lowestC]}</span>
              </h4>
              <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-light">{lowInsight.whatYouMightNeed}</p>
              <div className="mt-5 rounded-lg border-t border-ember/15 bg-ember/[0.04] px-5 py-4">
                <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-ember-soft">🌶️ Try This Week</span>
                <p className="text-[0.9rem] leading-[1.65] text-text-light italic">{lowInsight.actionableInsight}</p>
              </div>
            </div>

            {/* Framework Reminder */}
            <div className="mb-10 border-t border-cream-mid/40 pt-5 text-center">
              <p className="mx-auto max-w-[540px] text-[0.85rem] italic leading-[1.65] text-text-faint">{FRAMEWORK_REMINDER}</p>
            </div>

            {/* Chronic Fire */}
            {chronicFireKey && chronicFireLabel && (
              <div className="my-8 overflow-hidden rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.2)]" style={{ background: 'linear-gradient(145deg, hsl(var(--dark-mid)), hsl(var(--dark-warm)))' }}>
                <div className="p-8 text-center">
                  <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-cream-mid">The fire you've been carrying longest</span>
                  <h3 className="mb-3 text-gold-light">Your Chronic Fire: {chronicFireLabel}</h3>
                  <p className="mx-auto max-w-[520px] text-[0.95rem] leading-[1.7] text-cream-soft">{FIRE_DESC[chronicFireKey]}</p>
                  {chronicFireKey !== primaryFireKey && (
                    <p className="mx-auto mt-5 max-w-[520px] border-t border-gold/15 pt-5 text-[0.9rem] leading-[1.7] text-cream-mid">
                      Right now, you're carrying {FIRE_NAMES[primaryFireKey]} — that's the pepper on the counter today. But the one that's been sitting in the jar the longest is {chronicFireLabel}. These are two different peppers, and they may need different ingredients.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Post-results disclaimer */}
            <p className="mt-8 text-center text-[0.82rem] leading-[1.6] text-text-faint">{POST_RESULTS_DISCLAIMER}</p>

            {/* Share */}
            <ShareActions shareText={shareText} shareUrl={shareUrl} />

            {/* Upsell */}
            <ExtendedProfileUpsell email={data.email} name={data.name} />

            {/* Legal */}
            <p className="mt-10 text-center text-[0.78rem] leading-[1.6] text-text-faint">
              The Pepper Sauce Profile and Extended Pepper Sauce Profile are educational and personal development tools. They do not constitute clinical services, psychological assessment, diagnosis, or treatment. If you are in crisis or need clinical support, please contact the 988 Suicide and Crisis Lifeline (call or text 988) or your local emergency services.
            </p>

            {/* Back to home */}
            <div className="mt-10 text-center">
              <Link to="/" className="text-[0.88rem] text-gold-muted underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold">
                ← Back to The Pepper Sauce Principle
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
