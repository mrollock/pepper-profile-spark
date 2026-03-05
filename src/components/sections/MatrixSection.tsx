import { useState, useCallback, useRef, useEffect } from "react";

const QUADRANTS = {
  topRight: {
    name: "Delicious",
    subtitle: "Spicy & Delicious",
    color: "hsl(var(--gold))",
    bgGradient: `radial-gradient(ellipse at 75% 25%, hsl(var(--gold) / 0.1), transparent 70%)`,
    description:
      "High heat. Rich sauce. This is the framework's central claim: that a life carrying real pain can also carry pleasure, meaning, connection, and joy. Not because the pain decreased. Because everything around it got richer.",
    insight: "This is where the Pepper Sauce Principle lives.",
  },
  topLeft: {
    name: "Mild & Flavor-full",
    subtitle: "Gentle",
    color: "hsl(var(--sage))",
    bgGradient: `radial-gradient(ellipse at 25% 25%, hsl(var(--sage) / 0.08), transparent 70%)`,
    description:
      "Manageable heat. Rich conditions. You have the ingredients and the heat isn't overwhelming. This is the quadrant where you taste everything. Worth protecting, because pain can arrive without warning — and when it does, the sauce you've built travels with you.",
    insight: "Enjoy what's here. And know the recipe travels with you if the heat rises.",
  },
  bottomRight: {
    name: "Scorching",
    subtitle: "Suffering",
    color: "hsl(var(--ember))",
    bgGradient: `radial-gradient(ellipse at 75% 75%, hsl(var(--ember) / 0.08), transparent 70%)`,
    description:
      "All heat. No recipe. This is where pain becomes suffering — not because the pain is too much, but because the conditions are missing. No validation. No agency. No table. The world gets smaller. The sauce gets thinner.",
    insight: "Upward exists. That's what nobody told you.",
  },
  bottomLeft: {
    name: "Bland",
    subtitle: "Languishing",
    color: "hsl(var(--text-faint))",
    bgGradient: `radial-gradient(ellipse at 25% 75%, hsl(var(--text-faint) / 0.06), transparent 70%)`,
    description:
      "Low heat. Thin sauce. Not much hurting, but not much happening either. Going through the motions. Surviving successfully without remembering to start living.",
    insight: "The absence of pain is not the presence of life.",
  },
};

type QuadrantKey = keyof typeof QUADRANTS;

function getQuadrant(pepper: number, sauce: number): QuadrantKey {
  const isSpicy = pepper > 50;
  const isFlavorful = sauce > 50;
  if (isFlavorful && isSpicy) return "topRight";
  if (isFlavorful && !isSpicy) return "topLeft";
  if (!isFlavorful && isSpicy) return "bottomRight";
  return "bottomLeft";
}

function MatrixDot({ x, y, quadrant }: { x: number; y: number; quadrant: QuadrantKey }) {
  const data = QUADRANTS[quadrant];
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${100 - y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        pointerEvents: "none",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `2px solid ${data.color}`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "matrix-pulse-ring 2s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: data.color,
          border: "2px solid hsl(var(--cream))",
          boxShadow: `0 0 20px ${data.color}, 0 0 40px hsl(var(--gold) / 0.2)`,
        }}
      />
    </div>
  );
}

function DirectionArrow({ quadrant }: { quadrant: QuadrantKey }) {
  if (quadrant === "topRight" || quadrant === "topLeft") return null;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        animation: "matrix-float-up 2s ease-in-out infinite",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M10 24V4M10 4L2 12M10 4L18 12" stroke="hsl(var(--gold))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold">
        upward
      </span>
    </div>
  );
}

function AxisSlider({
  value,
  onChange,
  leftLabel,
  rightLabel,
  color,
  vertical = false,
}: {
  value: number;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  color: string;
  vertical?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleInteraction = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      let pct: number;
      if (vertical) {
        pct = 1 - (e.clientY - rect.top) / rect.height;
      } else {
        pct = (e.clientX - rect.left) / rect.width;
      }
      onChange(Math.max(0, Math.min(100, Math.round(pct * 100))));
    },
    [onChange, vertical]
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const event = "touches" in e ? e.touches[0] : e;
      handleInteraction(event);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove as EventListener, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, handleInteraction]);

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "hsl(var(--cream))",
    border: `2px solid ${color}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    cursor: "grab",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  };

  // Larger invisible touch target
  const touchTargetStyle: React.CSSProperties = {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "transparent",
    cursor: "grab",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
  };

  const labelClass = "font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-text-faint whitespace-nowrap";

  if (vertical) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
        <span className={labelClass} style={{ color: "hsl(var(--gold-muted))" }}>{rightLabel}</span>
        <div
          ref={trackRef}
          onMouseDown={(e) => { setDragging(true); handleInteraction(e); }}
          onTouchStart={(e) => { setDragging(true); handleInteraction(e.touches[0]); }}
          style={{
            flex: 1,
            width: 6,
            background: `linear-gradient(to top, hsl(var(--text-faint) / 0.2), hsl(var(--gold) / 0.4))`,
            borderRadius: 3,
            position: "relative",
            cursor: "pointer",
            touchAction: "none",
          }}
        >
          <div style={{ ...touchTargetStyle, left: "50%", top: `${100 - value}%` }} />
          <div style={{ ...thumbStyle, left: "50%", top: `${100 - value}%` }} />
        </div>
        <span className={labelClass}>{leftLabel}</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <span className={labelClass}>{leftLabel}</span>
      <div
        ref={trackRef}
        onMouseDown={(e) => { setDragging(true); handleInteraction(e); }}
        onTouchStart={(e) => { setDragging(true); handleInteraction(e.touches[0]); }}
        style={{
          flex: 1,
          height: 6,
          background: `linear-gradient(to right, hsl(var(--text-faint) / 0.2), hsl(var(--ember) / 0.4))`,
          borderRadius: 3,
          position: "relative",
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        <div style={{ ...touchTargetStyle, top: "50%", left: `${value}%` }} />
        <div style={{ ...thumbStyle, top: "50%", left: `${value}%` }} />
      </div>
      <span className={labelClass} style={{ color: "hsl(var(--gold-muted))" }}>{rightLabel}</span>
    </div>
  );
}

export function MatrixSection() {
  const [pepper, setPepper] = useState(50);
  const [sauce, setSauce] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const quadrant = getQuadrant(pepper, sauce);
  const data = QUADRANTS[quadrant];

  const handlePepperChange = (v: number) => { setPepper(v); if (!hasInteracted) setHasInteracted(true); };
  const handleSauceChange = (v: number) => { setSauce(v); if (!hasInteracted) setHasInteracted(true); };

  return (
    <section
      id="matrix"
      className="sec-dark relative overflow-hidden bg-dark"
      style={{ padding: "5rem 1.5rem 4rem" }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Ambient quadrant glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-[600ms] ease-in-out"
        style={{ background: data.bgGradient }}
      />

      <div className="relative z-[1]">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[440px] text-center">
          <p className="mb-3 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-muted">
            The Pepper-Sauce Matrix
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-[1.2] text-cream">
            Where Are You Right Now?
          </h2>
          <p className="font-body text-[0.95rem] leading-[1.7] text-cream-mid">
            Move the sliders to map your experience. The pepper is what life handed you. The sauce is what surrounds it.
          </p>
        </div>

        {/* Matrix container */}
        <div className="mx-auto" style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Vertical slider (Sauce) */}
            <div style={{ display: "flex", alignItems: "center", width: 40 }}>
              {/* Rotated SAUCE label */}
              <div
                className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-text-faint"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                Sauce
              </div>
              <div style={{ height: "100%", minHeight: 300 }}>
                <AxisSlider
                  value={sauce}
                  onChange={handleSauceChange}
                  leftLabel="Thin"
                  rightLabel="Rich"
                  color="hsl(var(--gold))"
                  vertical
                />
              </div>
            </div>

            {/* Matrix grid area */}
            <div style={{ flex: 1 }}>
              {/* The 2×2 matrix */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(168,137,62,0.13)",
                  background: "hsl(var(--dark-warm))",
                }}
              >
                {/* Quadrant backgrounds */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", background: "rgba(90,107,66,0.08)", borderRight: "1px solid rgba(168,137,62,0.08)", borderBottom: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "rgba(200,150,46,0.1)", borderBottom: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", background: "rgba(154,142,120,0.06)", borderRight: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", background: "rgba(184,69,26,0.08)" }} />

                {/* Quadrant labels */}
                <div className="absolute font-display font-bold" style={{ top: "12%", left: "12%", fontSize: 11, color: "hsl(var(--sage))", opacity: 0.53, lineHeight: 1.3 }}>
                  Mild &<br />Flavor-full
                </div>
                <div className="absolute font-display font-bold text-right" style={{ top: "12%", right: "12%", fontSize: 13, color: "hsl(var(--gold))", opacity: 0.67, lineHeight: 1.3 }}>
                  Spicy &<br />Delicious
                </div>
                <div className="absolute font-display font-bold" style={{ bottom: "12%", left: "12%", fontSize: 11, color: "hsl(var(--text-faint))", opacity: 0.47 }}>
                  Bland
                </div>
                <div className="absolute font-display font-bold text-right" style={{ bottom: "12%", right: "12%", fontSize: 11, color: "hsl(var(--ember))", opacity: 0.53 }}>
                  Scorching
                </div>

                <DirectionArrow quadrant={quadrant} />
                <MatrixDot x={pepper} y={sauce} quadrant={quadrant} />
              </div>

              {/* Horizontal slider (Pepper) */}
              <div style={{ marginTop: 16 }}>
                <AxisSlider
                  value={pepper}
                  onChange={handlePepperChange}
                  leftLabel="Mild"
                  rightLabel="Spicy"
                  color="hsl(var(--ember))"
                />
              </div>

              {/* X-axis label */}
              <div className="mt-2 text-center font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-text-faint">
                Pepper
              </div>
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div className="mx-auto mt-8" style={{ maxWidth: 520 }}>
          <div
            style={{
              padding: "24px 28px",
              background: "hsl(var(--dark-mid) / 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: 8,
              border: `1px solid ${data.color}`,
              borderColor: `color-mix(in srgb, ${data.color} 20%, transparent)`,
              transition: "border-color 0.4s ease",
            }}
          >
            <div className="mb-4">
              <span
                className="font-display font-bold transition-colors duration-300"
                style={{ fontSize: "clamp(1.3rem, 3vw, 1.6rem)", color: data.color }}
              >
                {data.name}
              </span>
              <span className="ml-3 font-body text-xs tracking-[0.05em] text-text-faint">
                {data.subtitle}
              </span>
            </div>

            <p className="mb-4 font-body text-sm leading-[1.7] text-cream-mid">
              {data.description}
            </p>

            <div style={{ paddingTop: "0.75rem", borderTop: `1px solid color-mix(in srgb, ${data.color} 13%, transparent)` }}>
              <p className="font-accent text-[13px] italic" style={{ color: data.color, opacity: 0.85 }}>
                {data.insight}
              </p>
            </div>
          </div>

          {/* Reveal text after first interaction */}
          {hasInteracted && (
            <div className="mt-6 text-center" style={{ animation: "matrix-fade-in 0.8s ease" }}>
              <p className="font-body text-xs leading-[1.7] text-gold-muted">
                Most of pain management tries to move you left — reduce the pepper.
              </p>
              <p className="font-body text-xs font-semibold leading-[1.7] text-gold">
                The Pepper Sauce Principle moves you up — enrich the sauce.
              </p>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="mt-10 text-center font-accent text-[1.15rem] italic tracking-[0.02em] text-gold-muted">
          Life is painful. Make it delicious.
        </p>

        {/* Bridge copy */}
        <div className="mx-auto mt-12 max-w-[560px] text-center">
          <p className="font-body text-[15px] leading-[1.7] text-cream-mid">
            You just answered the first question:{" "}
            <em className="font-accent italic text-gold-light">where am I on the Pepper Sauce map?</em>
          </p>
          <p className="mt-4 font-body text-[15px] leading-[1.7] text-cream-mid">
            The Pepper Sauce Profile answers the second:{" "}
            <em className="font-accent italic text-gold-light">what's in my sauce?</em>{" "}
            Thirty-four questions that map your five conditions, name your fire, and check whether the heat you're carrying might need a professional in the kitchen with you. It's free. It takes about seven minutes.
          </p>
          <p className="mt-4 font-body text-[15px] leading-[1.7] text-cream-mid">
            For those who want the third question —{" "}
            <em className="font-accent italic text-gold-light">how do I make life more delicious?</em>{" "}
            — the Extended Report takes what the Profile found, asks you to go deeper, and returns a personalized guide to building sauce from exactly where you are. Not advice. A recipe worth considering.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#quiz"
            className="inline-block rounded-md bg-gold px-9 py-3.5 font-body text-[0.95rem] font-semibold tracking-wide text-dark transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,150,46,0.3)]"
          >
            Discover What's in Your Bottle
          </a>
        </div>
      </div>

      <style>{`
        @keyframes matrix-pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes matrix-float-up {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 0.7; }
        }
        @keyframes matrix-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          #matrix { padding-top: 3rem !important; padding-bottom: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
