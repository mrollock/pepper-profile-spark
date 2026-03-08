import { useState, useEffect, useRef, useCallback } from 'react';

type IngredientState = 'floating' | 'dropping' | 'in';

export function StirTheSauce() {
  const [pepperState, setPepperState] = useState<IngredientState>('floating');
  const [sauceState, setSauceState] = useState<IngredientState>('floating');
  const [stirring, setStirring] = useState(false);
  const [blended, setBlended] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [visible, setVisible] = useState(false);
  const autoTriggered = useRef(false);

  const bothIn = pepperState === 'in' && sauceState === 'in';

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Once both ingredients are in, start stirring
  useEffect(() => {
    if (!bothIn || stirring) return;
    const t = setTimeout(() => {
      setStirring(true);
      setTimeout(() => {
        setBlended(true);
        setTimeout(() => setShowCta(true), 800);
      }, 2000);
    }, 300);
    return () => clearTimeout(t);
  }, [bothIn, stirring]);

  const dropPepper = useCallback(() => {
    if (pepperState !== 'floating') return;
    setPepperState('dropping');
    setTimeout(() => setPepperState('in'), 350);
  }, [pepperState]);

  const dropSauce = useCallback(() => {
    if (sauceState !== 'floating') return;
    setSauceState('dropping');
    setTimeout(() => setSauceState('in'), 350);
  }, [sauceState]);

  // Auto-trigger fallback
  useEffect(() => {
    if (autoTriggered.current) return;
    const delay = window.innerWidth < 768 ? 3000 : 4000;
    const timer = setTimeout(() => {
      autoTriggered.current = true;
      dropPepper();
      setTimeout(() => dropSauce(), 500);
    }, delay);
    return () => clearTimeout(timer);
  }, [dropPepper, dropSauce]);

  const scrollToMatrix = () => {
    const el = document.getElementById('matrix');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Bowl fill color based on state
  const getBowlFill = () => {
    if (blended) return 'hsl(30, 55%, 36%)';
    if (pepperState === 'in' && sauceState === 'in') return 'hsl(28, 50%, 38%)';
    if (pepperState === 'in') return 'hsl(16, 60%, 38%)';
    if (sauceState === 'in') return 'hsl(38, 60%, 42%)';
    return 'hsl(39, 70%, 95%)';
  };

  const getContentsFill = () => {
    if (blended) return 'hsl(30, 58%, 34%)';
    if (pepperState === 'in' && sauceState === 'in') return 'hsl(25, 52%, 36%)';
    if (pepperState === 'in') return 'hsl(16, 55%, 35%)';
    if (sauceState === 'in') return 'hsl(38, 55%, 40%)';
    return 'hsl(35, 42%, 89%)';
  };

  const instructionText = !bothIn
    ? 'Tap the pepper and sauce to blend'
    : null;

  return (
    <div
      className="relative flex flex-col items-center gap-2 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(8px)',
      }}
    >
      {/* Glow behind bowl */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-[1.5s]"
        style={{
          background: 'radial-gradient(circle, hsla(41,66%,48%,0.15), transparent 70%)',
          opacity: stirring ? 1 : 0.3,
        }}
      />

      {/* SVG Scene */}
      <svg
        viewBox="0 0 140 100"
        className="relative z-[1] w-[80px] sm:w-[100px]"
        aria-hidden="true"
      >
        {/* Steam lines — only when stirring */}
        <g className={stirring ? 'stir-steam-active' : bothIn ? 'stir-steam-idle' : ''}>
          <line x1="50" y1="38" x2="50" y2="22" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" className="stir-steam stir-steam-1" />
          <line x1="65" y1="35" x2="65" y2="18" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" className="stir-steam stir-steam-2" />
          <line x1="80" y1="38" x2="80" y2="24" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" className="stir-steam stir-steam-3" />
        </g>

        {/* Pepper icon — tappable, floating above-left */}
        <g
          className={`cursor-pointer transition-all duration-[350ms] ease-in ${pepperState === 'floating' ? 'stir-bob-1 hover:scale-110' : ''}`}
          style={{
            transform:
              pepperState === 'dropping'
                ? 'translate(12px, 24px) scale(0.4)'
                : pepperState === 'in'
                  ? 'translate(12px, 24px) scale(0)'
                  : 'translate(0,0) scale(1)',
            opacity: pepperState === 'in' ? 0 : 1,
            transformOrigin: '38px 18px',
          }}
          onClick={(e) => { e.stopPropagation(); dropPepper(); }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && dropPepper()}
          aria-label="Add pepper to the bowl"
        >
          <ellipse cx="38" cy="16" rx="6" ry="4" fill="hsl(16,75%,41%)" />
          <path d="M38 12 L38 9.5 L40.5 8" stroke="hsl(103,24%,34%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        {/* Sauce drop — tappable, floating above-right */}
        <g
          className={`cursor-pointer transition-all duration-[350ms] ease-in ${sauceState === 'floating' ? 'stir-bob-2 hover:scale-110' : ''}`}
          style={{
            transform:
              sauceState === 'dropping'
                ? 'translate(-12px, 22px) scale(0.4)'
                : sauceState === 'in'
                  ? 'translate(-12px, 22px) scale(0)'
                  : 'translate(0,0) scale(1)',
            opacity: sauceState === 'in' ? 0 : 1,
            transformOrigin: '92px 18px',
          }}
          onClick={(e) => { e.stopPropagation(); dropSauce(); }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && dropSauce()}
          aria-label="Add sauce to the bowl"
        >
          <path d="M92 22 Q89 15 92 10 Q95 15 92 22Z" fill="hsl(41,66%,48%)" />
        </g>

        {/* Ripple when ingredient drops */}
        {(pepperState === 'in' || sauceState === 'in') && !blended && (
          <ellipse cx="65" cy="50" rx="18" ry="4" fill="none" stroke="hsl(41,66%,48%)" strokeWidth="0.5" opacity="0.3" className="stir-ripple" />
        )}

        {/* Bowl */}
        <path
          d="M35 48 Q35 76 65 79 Q95 76 95 48 Z"
          fill={getBowlFill()}
          stroke="hsl(35,27%,80%)"
          strokeWidth="1.5"
          className="transition-[fill] duration-700 ease-in-out"
        />
        {/* Bowl contents */}
        <ellipse
          cx="65"
          cy="50"
          rx="28"
          ry="6"
          className="transition-[fill] duration-700 ease-in-out"
          fill={getContentsFill()}
        />
        {/* Bowl rim */}
        <ellipse cx="65" cy="48" rx="30" ry="7" fill="none" stroke="hsl(35,27%,80%)" strokeWidth="1.5" />

        {/* Spoon — gentle oscillation, not 360 rotation */}
        <g
          className={stirring ? 'stir-spoon-gentle' : ''}
          style={{ transformOrigin: '88px 30px' }}
        >
          <line x1="88" y1="30" x2="67" y2="52" stroke="hsl(25,35%,40%)" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="67" cy="54" rx="4" ry="2.5" fill="hsl(25,35%,35%)" transform="rotate(-15,67,54)" />
        </g>
      </svg>

      {/* Instruction text or CTA */}
      <div
        className="relative z-[1] h-5 flex items-center justify-center cursor-pointer"
        onClick={showCta ? scrollToMatrix : undefined}
        role={showCta ? 'button' : undefined}
        tabIndex={showCta ? 0 : undefined}
        onKeyDown={showCta ? (e) => e.key === 'Enter' && scrollToMatrix() : undefined}
      >
        {instructionText && !showCta && (
          <p className="font-body text-[11px] tracking-wide text-gold-muted transition-opacity duration-500">
            {instructionText}
          </p>
        )}
        {showCta && (
          <p
            className="font-body text-[11px] tracking-wide text-gold-muted transition-all duration-500"
            style={{
              opacity: showCta ? 1 : 0,
              transform: showCta ? 'translateY(0)' : 'translateY(6px)',
            }}
          >
            Blended.
          </p>
        )}
      </div>
    </div>
  );
}
