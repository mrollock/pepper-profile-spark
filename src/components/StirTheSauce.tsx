import { useState, useEffect, useRef, useCallback } from 'react';

export function StirTheSauce() {
  const [stirred, setStirred] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoTriggered = useRef(false);

  const triggerStir = useCallback(() => {
    if (stirred) return;
    setStirred(true);
    setTimeout(() => setShowCta(true), 600);
  }, [stirred]);

  // Auto-trigger after delay
  useEffect(() => {
    if (autoTriggered.current) return;
    const isMobile = window.innerWidth < 768;
    const delay = isMobile ? 2500 : 3500;
    const timer = setTimeout(() => {
      autoTriggered.current = true;
      triggerStir();
    }, delay);
    return () => clearTimeout(timer);
  }, [triggerStir]);

  const scrollToMatrix = () => {
    const el = document.getElementById('matrix');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center gap-3 cursor-pointer"
      onMouseEnter={triggerStir}
      onClick={scrollToMatrix}
      onTouchStart={triggerStir}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && scrollToMatrix()}
      aria-label="See your Pepper Sauce blend — scroll to the matrix"
    >
      {/* Glow behind bowl */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-[1.5s]"
        style={{
          background: 'radial-gradient(circle, hsla(41,66%,48%,0.15), transparent 70%)',
          opacity: stirred ? 1 : 0.4,
        }}
      />

      {/* SVG Scene */}
      <svg
        viewBox="0 0 120 100"
        className="relative z-[1] w-[80px] sm:w-[100px]"
        aria-hidden="true"
      >
        {/* Steam lines */}
        <g className={stirred ? 'stir-steam-active' : 'stir-steam-idle'}>
          <line x1="45" y1="38" x2="45" y2="22" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" className="stir-steam stir-steam-1" />
          <line x1="60" y1="35" x2="60" y2="18" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" className="stir-steam stir-steam-2" />
          <line x1="75" y1="38" x2="75" y2="24" stroke="hsl(41,66%,48%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" className="stir-steam stir-steam-3" />
        </g>

        {/* Pepper icon — falls into bowl when stirred */}
        <g
          className="transition-all duration-[400ms] ease-in"
          style={{
            transform: stirred ? 'translate(0px, 18px) scale(0.6)' : 'translate(0px, 0px) scale(1)',
            opacity: stirred ? 0 : 1,
            transformOrigin: '42px 20px',
          }}
        >
          {/* Small pepper shape */}
          <ellipse cx="42" cy="16" rx="5" ry="3.5" fill="hsl(16,75%,41%)" className={stirred ? '' : 'stir-bob-1'} />
          <path d="M42 12.5 L42 10 L44 9" stroke="hsl(103,24%,34%)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* Sauce drop — falls into bowl when stirred */}
        <g
          className="transition-all duration-[400ms] ease-in"
          style={{
            transform: stirred ? 'translate(0px, 20px) scale(0.5)' : 'translate(0px, 0px) scale(1)',
            opacity: stirred ? 0 : 1,
            transformOrigin: '78px 20px',
          }}
        >
          <path d="M78 20 Q75 14 78 10 Q81 14 78 20Z" fill="hsl(41,66%,48%)" className={stirred ? '' : 'stir-bob-2'} />
        </g>

        {/* Bowl */}
        <path
          d="M30 48 Q30 75 60 78 Q90 75 90 48 Z"
          fill={stirred ? 'hsl(36,38%,35%)' : 'hsl(39,70%,95%)'}
          stroke="hsl(35,27%,80%)"
          strokeWidth="1.5"
          className="transition-[fill] duration-700 ease-in-out"
        />
        {/* Bowl contents */}
        <ellipse
          cx="60"
          cy="50"
          rx="28"
          ry="6"
          className="transition-[fill] duration-700 ease-in-out"
          fill={stirred ? 'hsl(30,60%,38%)' : 'hsl(35,42%,89%)'}
        />
        {/* Bowl rim */}
        <ellipse cx="60" cy="48" rx="30" ry="7" fill="none" stroke="hsl(35,27%,80%)" strokeWidth="1.5" />

        {/* Spoon */}
        <g
          className={stirred ? 'stir-spoon-stirring' : ''}
          style={{ transformOrigin: '60px 50px' }}
        >
          <line x1="85" y1="28" x2="62" y2="52" stroke="hsl(25,35%,40%)" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="62" cy="54" rx="4" ry="2.5" fill="hsl(25,35%,35%)" transform="rotate(-15,62,54)" />
        </g>
      </svg>

      {/* CTA text */}
      <p
        className="relative z-[1] font-body text-[12px] font-semibold tracking-wide text-gold-light transition-all duration-500"
        style={{
          opacity: showCta ? 1 : 0,
          transform: showCta ? 'translateY(0)' : 'translateY(6px)',
        }}
      >
        See YOUR Pepper Sauce blend →
      </p>
    </div>
  );
}
