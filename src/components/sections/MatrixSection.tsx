import { useState, useCallback, useRef, useEffect, useMemo } from "react";

const QUADRANTS = {
  topRight: {
    name: "Spicy & Flavor-full",
    subtitle: "Delicious",
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

function MatrixDot({ x, y, quadrant, isDragging = false }: { x: number; y: number; quadrant: QuadrantKey; isDragging?: boolean }) {
  const data = QUADRANTS[quadrant];
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${100 - y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 5,
        pointerEvents: "none",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "hsl(var(--cream))",
          border: `1.5px solid ${data.color}`,
          boxShadow: isDragging
            ? `0 0 6px 3px rgba(200, 150, 46, 0.7), 0 0 18px 8px rgba(200, 150, 46, 0.35), 0 0 36px 14px rgba(200, 150, 46, 0.12)`
            : `0 0 5px 2px rgba(200, 150, 46, 0.5), 0 0 14px 6px rgba(200, 150, 46, 0.2), 0 0 30px 12px rgba(200, 150, 46, 0.06)`,
          transition: "box-shadow 0.3s ease",
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

  const alignMap: Record<QuadrantKey, React.CSSProperties> = {
    topLeft: { top: "14%", left: "10%" },
    topRight: { top: "14%", right: "10%" },
    bottomLeft: { bottom: "14%", left: "10%" },
    bottomRight: { bottom: "14%", right: "10%" },
  };

  const textAlign = quadrant === "topRight" || quadrant === "bottomRight" ? "right" : "left";

  return (
    <div
      style={{
        position: "absolute",
        width: "50%",
        height: "50%",
        ...positionMap[quadrant],
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          ...alignMap[quadrant],
          textAlign,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: isActive ? 1 : 0.5,
          transform: isActive ? "scale(1)" : "scale(0.92)",
        }}
      >
        <div
          className="font-display font-bold"
          style={{
            fontSize: isActive ? "clamp(0.9rem, 2.5vw, 1.25rem)" : "clamp(0.7rem, 1.8vw, 0.9rem)",
            color: data.color,
            lineHeight: 1.25,
            transition: "font-size 0.3s ease",
          }}
        >
          {data.name}
        </div>
        {isActive && (
          <div
            className="font-body"
            style={{
              fontSize: "clamp(8px, 1.5vw, 10px)",
              color: data.color,
              opacity: 0.65,
              letterSpacing: "0.04em",
              marginTop: 2,
              animation: "matrix-fade-in 0.3s ease",
            }}
          >
            {data.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveDescription({ quadrant }: { quadrant: QuadrantKey }) {
  const data = QUADRANTS[quadrant];
  return (
    <div
      key={quadrant}
      style={{
        padding: "0.75rem 0 0",
        animation: "matrix-fade-in 0.3s ease",
        textAlign: "center",
      }}
    >
      <p
        className="font-body text-cream-mid"
        style={{
          fontSize: "clamp(11px, 2vw, 13px)",
          lineHeight: 1.6,
          maxWidth: 480,
          margin: "0 auto",
          opacity: 0.85,
        }}
      >
        {data.description}
      </p>
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

export function MatrixSection({ onQuadrantChange }: { onQuadrantChange?: (quadrant: QuadrantKey, hasInteracted: boolean) => void } = {}) {
  const [pepper, setPepper] = useState(50);
  const [sauce, setSauce] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDraggingMatrix, setIsDraggingMatrix] = useState(false);
  const matrixRef = useRef<HTMLDivElement>(null);

  const quadrant = getQuadrant(pepper, sauce);
  const data = QUADRANTS[quadrant];

  // Notify parent of quadrant changes
  useEffect(() => {
    if (hasInteracted && onQuadrantChange) {
      onQuadrantChange(quadrant, hasInteracted);
    }
  }, [quadrant, hasInteracted, onQuadrantChange]);

  const handlePepperChange = (v: number) => { setPepper(v); if (!hasInteracted) setHasInteracted(true); };
  const handleSauceChange = (v: number) => { setSauce(v); if (!hasInteracted) setHasInteracted(true); };

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    if (!matrixRef.current) return;
    const rect = matrixRef.current.getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = (1 - (clientY - rect.top) / rect.height) * 100;
    x = Math.max(0, Math.min(100, Math.round(x)));
    y = Math.max(0, Math.min(100, Math.round(y)));
    setPepper(x);
    setSauce(y);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  // Global mouse/touch up to end drag
  useEffect(() => {
    if (!isDraggingMatrix) return;
    const onMouseMove = (e: MouseEvent) => { e.preventDefault(); updateFromPointer(e.clientX, e.clientY); };
    const onMouseUp = () => setIsDraggingMatrix(false);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); updateFromPointer(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = () => setIsDraggingMatrix(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDraggingMatrix, updateFromPointer]);

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
          <p className="mx-auto max-w-[480px] font-body text-[0.95rem] leading-[1.7] text-cream-mid matrix-intro-text">
            Pain isn't one thing. It's physical, emotional, inherited, relational. But from here on out, we're done talking about pain and joy. It's all pepper and sauce. The pepper is the heat you're carrying. The sauce is everything around it. Move the sliders. Find out what blend you're working with.
          </p>
        </div>

        {/* Matrix container */}
        <div className="mx-auto matrix-container" style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Vertical slider (Sauce) — height matches matrix only */}
            <div style={{ display: "flex", alignItems: "stretch", width: 40 }}>
              <div
                className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-text-faint"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sauce
              </div>
              <div className="matrix-sauce-slider" style={{ height: "auto" }}>
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
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* The 2×2 matrix */}
              <div
                ref={matrixRef}
                onMouseDown={(e) => { setIsDraggingMatrix(true); updateFromPointer(e.clientX, e.clientY); }}
                onMouseLeave={() => { if (isDraggingMatrix) setIsDraggingMatrix(false); }}
                onTouchStart={(e) => { setIsDraggingMatrix(true); updateFromPointer(e.touches[0].clientX, e.touches[0].clientY); }}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(168,137,62,0.13)",
                  background: "hsl(var(--dark-warm))",
                  cursor: isDraggingMatrix ? 'grabbing' : 'grab',
                  touchAction: 'none',
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
                <MatrixDot x={pepper} y={sauce} quadrant={quadrant} isDragging={isDraggingMatrix} />
              </div>
            </div>
          </div>

          {/* Horizontal slider (Pepper) — immediately below matrix */}
          <div className="matrix-h-slider" style={{ marginTop: 12, marginLeft: 56 }}>
            <AxisSlider
              value={pepper}
              onChange={handlePepperChange}
              leftLabel="Mild"
              rightLabel="Spicy"
              color="hsl(var(--ember))"
            />
          </div>
          <div className="mt-1 text-center font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-text-faint" style={{ marginLeft: 56 }}>
            Pepper
          </div>

          {/* Active quadrant description below sliders */}
          <ActiveDescription quadrant={quadrant} />
        </div>

        {/* Insight line below matrix */}
        <div className="mx-auto matrix-insight" style={{ maxWidth: 520 }}>
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
        /* pulse ring removed — dot now uses glow aura */
        @keyframes matrix-float-up {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 0.7; }
        }
        @keyframes matrix-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .matrix-section {
          padding: 5rem 1.5rem 4rem;
        }
        .matrix-header {
          margin-bottom: 2.5rem;
        }
        @media (max-width: 480px) {
          .matrix-section { padding-top: 3rem !important; padding-bottom: 2.5rem !important; }
        }
        /* Laptop viewport optimization: fit entire matrix in one screen */
        @media (min-width: 768px) and (max-height: 920px) {
          .matrix-section {
            padding-top: 1.5rem !important;
            padding-bottom: 1rem !important;
          }
          .matrix-header {
            margin-bottom: 0.75rem !important;
          }
          .matrix-header h2 {
            margin-bottom: 0.125rem !important;
            font-size: 1.6rem !important;
          }
          .matrix-intro-text {
            font-size: 0.8rem !important;
            line-height: 1.45 !important;
          }
          .matrix-container {
            max-width: min(520px, 48vh) !important;
          }
          .matrix-sauce-slider {
            min-height: unset !important;
          }
          .matrix-h-slider {
            margin-top: 8px !important;
          }
          .matrix-insight {
            margin-top: 1rem !important;
          }
        }
        @media (min-width: 768px) and (max-height: 800px) {
          .matrix-section {
            padding-top: 1rem !important;
            padding-bottom: 0.75rem !important;
          }
          .matrix-header {
            margin-bottom: 0.5rem !important;
          }
          .matrix-header p:first-child {
            margin-bottom: 0 !important;
            font-size: 0.55rem !important;
          }
          .matrix-header h2 {
            font-size: 1.4rem !important;
            margin-bottom: 0 !important;
          }
          .matrix-intro-text {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
          }
          .matrix-container {
            max-width: min(440px, 42vh) !important;
          }
          .matrix-h-slider {
            margin-top: 6px !important;
          }
          .matrix-insight {
            margin-top: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
