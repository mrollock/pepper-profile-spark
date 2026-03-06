import { useState, useCallback, useRef, useEffect, useMemo } from "react";

const QUADRANTS = {
  topRight: {
    name: "Delicious",
    subtitle: "Spicy & Delicious",
    color: "hsl(var(--gold))",
    bgGradient: `radial-gradient(ellipse at 75% 25%, hsl(var(--gold) / 0.15), transparent 70%)`,
    description:
      "High heat. Rich sauce. This is the framework's central claim: that a life carrying real pain can also carry pleasure, meaning, connection, and joy. Not because the pain decreased. Because everything around it got richer.",
    shortDescription:
      "High heat. Rich sauce. A life carrying real pain can also carry pleasure, meaning, connection, and joy.",
    insight: "This is where the Pepper Sauce Principle lives. You built this.",
  },
  topLeft: {
    name: "Mild & Flavor-full",
    subtitle: "Gentle",
    color: "hsl(var(--sage))",
    bgGradient: `radial-gradient(ellipse at 25% 25%, hsl(var(--sage) / 0.12), transparent 70%)`,
    description:
      "Manageable heat. Rich conditions. You have the ingredients and the heat isn't overwhelming. This is the quadrant where you taste everything. Worth protecting, because pain can arrive without warning — and when it does, the sauce you've built travels with you.",
    shortDescription:
      "Manageable heat. Rich conditions. You have the ingredients and the heat isn't overwhelming.",
    insight: "This is a life worth savoring. And the recipe you've built travels with you if the heat ever rises.",
  },
  bottomRight: {
    name: "Scorching",
    subtitle: "Suffering",
    color: "hsl(var(--ember))",
    bgGradient: `radial-gradient(ellipse at 75% 75%, hsl(var(--ember) / 0.15), transparent 70%)`,
    description:
      "All heat. No recipe. This is where pain becomes suffering — not because the pain is too much, but because the conditions are missing. No validation. No agency. No table. The world gets smaller. The sauce gets thinner.",
    shortDescription:
      "All heat. No recipe. Pain becomes suffering — not because the pain is too much, but because the conditions are missing.",
    insight: "Upward exists. A Spicy and Delicious life is possible — even from here.",
  },
  bottomLeft: {
    name: "Bland",
    subtitle: "Languishing",
    color: "hsl(var(--text-faint))",
    bgGradient: `radial-gradient(ellipse at 25% 75%, hsl(var(--text-faint) / 0.08), transparent 70%)`,
    description:
      "Low heat. Thin sauce. Not much hurting, but not much happening either. Going through the motions. Surviving successfully without remembering to start living.",
    shortDescription:
      "Low heat. Thin sauce. Not much hurting, but not much happening either.",
    insight: "A richer life doesn't require more pain. It requires more sauce. Upward exists for you too.",
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
        zIndex: 20,
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
          boxShadow: `0 0 24px ${data.color}, 0 0 48px color-mix(in srgb, ${data.color} 27%, transparent)`,
          transition: "box-shadow 0.4s ease",
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
        zIndex: 15,
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

function QuadrantOverlay({ quadrant, activeQuadrant }: { quadrant: QuadrantKey; activeQuadrant: QuadrantKey }) {
  const isActive = quadrant === activeQuadrant;
  const data = QUADRANTS[quadrant];

  const positionMap: Record<QuadrantKey, React.CSSProperties> = {
    topLeft: { top: 0, left: 0 },
    topRight: { top: 0, right: 0 },
    bottomLeft: { bottom: 0, left: 0 },
    bottomRight: { bottom: 0, right: 0 },
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "50%",
        height: "50%",
        ...positionMap[quadrant],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "clamp(8px, 3vw, 20px)",
        overflow: "hidden",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      {isActive ? (
        <div
          key={quadrant}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "clamp(2px, 1vw, 6px)",
            animation: "matrix-fade-in 0.3s ease",
            maxWidth: "90%",
          }}
        >
          <span
            className="font-display font-bold"
            style={{
              fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)",
              color: data.color,
              lineHeight: 1.2,
            }}
          >
            {data.name}
          </span>
          <span
            className="font-body"
            style={{
              fontSize: "clamp(9px, 1.8vw, 11px)",
              color: data.color,
              opacity: 0.7,
              letterSpacing: "0.04em",
            }}
          >
            {data.subtitle}
          </span>
          <p
            className="font-body text-cream-mid matrix-description-full"
            style={{
              fontSize: "clamp(10px, 1.8vw, 12.5px)",
              lineHeight: 1.5,
              marginTop: "clamp(2px, 0.5vw, 6px)",
              opacity: 0.85,
            }}
          >
            {data.description}
          </p>
          {/* Short version for small screens */}
          <p
            className="font-body text-cream-mid matrix-description-short"
            style={{
              fontSize: "clamp(10px, 1.8vw, 12.5px)",
              lineHeight: 1.5,
              marginTop: "clamp(2px, 0.5vw, 6px)",
              opacity: 0.85,
              display: "none",
            }}
          >
            {data.shortDescription}
          </p>
        </div>
      ) : (
        <div
          className="font-display font-bold"
          style={{
            fontSize: quadrant === "topRight" ? 13 : 11,
            color: data.color,
            opacity: quadrant === "topRight" ? 0.8 : 0.65,
            lineHeight: 1.3,
            textAlign: quadrant === "topRight" || quadrant === "bottomRight" ? "right" : "left",
            position: "absolute",
            ...(quadrant === "topLeft" ? { top: "12%", left: "12%" } : {}),
            ...(quadrant === "topRight" ? { top: "12%", right: "12%" } : {}),
            ...(quadrant === "bottomLeft" ? { bottom: "12%", left: "12%" } : {}),
            ...(quadrant === "bottomRight" ? { bottom: "12%", right: "12%" } : {}),
          }}
        >
          {quadrant === "topLeft" && <>Mild &<br />Flavor-full</>}
          {quadrant === "topRight" && <>Spicy &<br />Delicious</>}
          {quadrant === "bottomLeft" && "Bland"}
          {quadrant === "bottomRight" && "Scorching"}
        </div>
      )}
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
      className="sec-dark relative overflow-hidden bg-dark matrix-section"
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
        <div className="mx-auto matrix-header max-w-[520px] text-center">
          <p className="mb-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-muted">
            The Pepper-Sauce Matrix
          </p>
          <h2 className="mb-2 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-[1.2] text-cream">
            Where Are You Right Now?
          </h2>
          <p className="font-body text-[0.95rem] leading-[1.7] text-cream-mid matrix-intro-text">
            Use the sliders to map where you are right now. Sliding right toward{" "}
            <em className="font-accent italic text-gold">spicy</em> means you're carrying more pain in your life at this moment. Sliding up toward{" "}
            <em className="font-accent italic text-gold">rich</em> means you have more of the supportive, positive, nourishing things in your life — people, meaning, joy, agency — that surround the pain.
          </p>
        </div>

        {/* Matrix container */}
        <div className="mx-auto" style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Vertical slider (Sauce) */}
            <div style={{ display: "flex", alignItems: "center", width: 40 }}>
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
                {/* Quadrant backgrounds — vibrant washes */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", background: "rgba(90,140,66,0.14)", borderRight: "1px solid rgba(168,137,62,0.08)", borderBottom: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "rgba(218,170,50,0.18)", borderBottom: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", background: "rgba(140,135,120,0.10)", borderRight: "1px solid rgba(168,137,62,0.08)" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", background: "rgba(200,75,30,0.16)" }} />

                {/* Quadrant overlays with text */}
                <QuadrantOverlay quadrant="topLeft" activeQuadrant={quadrant} />
                <QuadrantOverlay quadrant="topRight" activeQuadrant={quadrant} />
                <QuadrantOverlay quadrant="bottomLeft" activeQuadrant={quadrant} />
                <QuadrantOverlay quadrant="bottomRight" activeQuadrant={quadrant} />

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

        {/* Insight line below matrix */}
        <div className="mx-auto mt-8" style={{ maxWidth: 520 }}>
          <div
            key={quadrant}
            style={{
              paddingTop: "0.75rem",
              borderTop: `1px solid color-mix(in srgb, ${data.color} 13%, transparent)`,
              animation: "matrix-fade-in 0.4s ease",
              textAlign: "center",
            }}
          >
            <p className="font-accent text-[13px] italic" style={{ color: data.color, opacity: 0.85 }}>
              {data.insight}
            </p>
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
          .matrix-description-full { display: none !important; }
          .matrix-description-short { display: block !important; }
        }
        @media (min-width: 481px) {
          .matrix-description-full { display: block !important; }
          .matrix-description-short { display: none !important; }
        }
      `}</style>
    </section>
  );
}
