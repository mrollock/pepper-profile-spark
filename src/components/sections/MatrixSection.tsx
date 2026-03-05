import { useState, useCallback, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// THE PEPPER-SAUCE MATRIX — Interactive Edition
// The Pepper Sauce Principle™
// ─────────────────────────────────────────────

const QUADRANTS = {
  topRight: {
    name: "Delicious",
    subtitle: "Spicy & Delicious",
    color: "hsl(var(--gold))",
    bgGradient: `radial-gradient(ellipse at 75% 25%, hsl(var(--gold) / 0.15), transparent 70%)`,
    description:
      "High heat. Rich sauce. This is the framework's central claim: that a life carrying real pain can also carry pleasure, meaning, connection, and joy. Not because the pain decreased. Because everything around it got richer.",
    insight: "This is where the Pepper Sauce Principle lives.",
  },
  topLeft: {
    name: "Mild & Flavor-full",
    subtitle: "Gentle",
    color: "hsl(var(--sage))",
    bgGradient: `radial-gradient(ellipse at 25% 25%, hsl(var(--sage) / 0.12), transparent 70%)`,
    description:
      "Manageable heat. Rich conditions. You have the ingredients and the heat isn't overwhelming. This is the quadrant where you taste everything. Worth protecting, because pain can arrive without warning — and when it does, the sauce you've built travels with you.",
    insight: "Enjoy what's here. And know the recipe travels with you if the heat rises.",
  },
  bottomRight: {
    name: "Scorching",
    subtitle: "Suffering",
    color: "hsl(var(--ember))",
    bgGradient: `radial-gradient(ellipse at 75% 75%, hsl(var(--ember) / 0.15), transparent 70%)`,
    description:
      "All heat. No recipe. This is where pain becomes suffering — not because the pain is too much, but because the conditions are missing. No validation. No agency. No table. The world gets smaller. The sauce gets thinner.",
    insight: "Upward exists. That's what nobody told you.",
  },
  bottomLeft: {
    name: "Bland",
    subtitle: "Languishing",
    color: "hsl(var(--text-faint))",
    bgGradient: `radial-gradient(ellipse at 25% 75%, hsl(var(--text-faint) / 0.1), transparent 70%)`,
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
      }}
    >
      {/* Outer pulse ring */}
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
          animation: "pulse-ring 2s ease-in-out infinite",
          opacity: 0.3,
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: data.color,
          boxShadow: `0 0 20px ${data.color}, 0 0 40px ${data.color}44`,
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
        animation: "float-up 2s ease-in-out infinite",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M10 24V4M10 4L2 12M10 4L18 12" stroke="hsl(var(--gold))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        style={{
          fontFamily: "'Libre Franklin', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "hsl(var(--gold))",
        }}
      >
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
  label?: string;
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
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: color,
    boxShadow: `0 0 10px ${color}66`,
    cursor: "grab",
    transform: "translate(-50%, -50%)",
  };

  if (vertical) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
        <span
          style={{
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "hsl(var(--text-faint))",
          }}
        >
          {rightLabel}
        </span>
        <div
          ref={trackRef}
          onMouseDown={(e) => {
            setDragging(true);
            handleInteraction(e);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            handleInteraction(e.touches[0]);
          }}
          style={{
            flex: 1,
            width: 6,
            background: `linear-gradient(to top, hsl(var(--text-faint) / 0.2), ${color}66)`,
            borderRadius: 3,
            position: "relative",
            cursor: "pointer",
            touchAction: "none",
          }}
        >
          <div style={{ ...thumbStyle, left: "50%", top: `${100 - value}%` }} />
        </div>
        <span
          style={{
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "hsl(var(--text-faint))",
          }}
        >
          {leftLabel}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <span
        style={{
          fontFamily: "'Libre Franklin', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: "hsl(var(--text-faint))",
          whiteSpace: "nowrap",
        }}
      >
        {leftLabel}
      </span>
      <div
        ref={trackRef}
        onMouseDown={(e) => {
          setDragging(true);
          handleInteraction(e);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          handleInteraction(e.touches[0]);
        }}
        style={{
          flex: 1,
          height: 6,
          background: `linear-gradient(to right, hsl(var(--text-faint) / 0.2), ${color}66)`,
          borderRadius: 3,
          position: "relative",
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        <div style={{ ...thumbStyle, top: "50%", left: `${value}%` }} />
      </div>
      <span
        style={{
          fontFamily: "'Libre Franklin', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: "hsl(var(--text-faint))",
          whiteSpace: "nowrap",
        }}
      >
        {rightLabel}
      </span>
    </div>
  );
}

export function MatrixSection() {
  const [pepper, setPepper] = useState(50);
  const [sauce, setSauce] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const quadrant = getQuadrant(pepper, sauce);
  const data = QUADRANTS[quadrant];

  const handlePepperChange = (v: number) => {
    setPepper(v);
    if (!hasInteracted) setHasInteracted(true);
  };
  const handleSauceChange = (v: number) => {
    setSauce(v);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <section
      id="matrix"
      style={{
        position: "relative",
        background: "hsl(var(--dark))",
        color: "hsl(var(--cream))",
        padding: "var(--section-pad) 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Dynamic quadrant glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: data.bgGradient,
          transition: "background 0.8s ease",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem" }}>
        <p
          style={{
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "hsl(var(--gold))",
            marginBottom: "0.75rem",
          }}
        >
          The Pepper Sauce Principle™
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: "hsl(var(--cream))",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Where Are You Right Now?
        </h2>
        <p
          style={{
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "0.95rem",
            color: "hsl(var(--cream-mid))",
            lineHeight: 1.7,
          }}
        >
          Move the sliders to map your current experience. The pepper is what life handed you. The sauce is what surrounds it.
        </p>
      </div>

      {/* Matrix container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {/* Vertical slider (Sauce) */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 40 }}>
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
            {/* Y-axis label */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 8,
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "hsl(var(--gold))",
              }}
            >
              Sauce
            </div>

            {/* The 2×2 matrix */}
            <div
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid hsl(var(--cream) / 0.06)",
              }}
            >
              {/* Quadrant backgrounds */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  background: "hsl(var(--sage) / 0.08)",
                  borderRight: "1px solid hsl(var(--cream) / 0.06)",
                  borderBottom: "1px solid hsl(var(--cream) / 0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50%",
                  height: "50%",
                  background: "hsl(var(--gold) / 0.1)",
                  borderBottom: "1px solid hsl(var(--cream) / 0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  background: "hsl(var(--text-faint) / 0.05)",
                  borderRight: "1px solid hsl(var(--cream) / 0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "50%",
                  height: "50%",
                  background: "hsl(var(--ember) / 0.1)",
                }}
              />

              {/* Quadrant labels */}
              <div
                style={{
                  position: "absolute",
                  top: "12%",
                  left: "12%",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  color: "hsl(var(--sage))",
                  opacity: 0.6,
                  lineHeight: 1.3,
                }}
              >
                Mild &<br />Flavor-full
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "12%",
                  right: "12%",
                  textAlign: "right",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  color: "hsl(var(--gold))",
                  opacity: 0.6,
                  lineHeight: 1.3,
                }}
              >
                Spicy &<br />Delicious
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "12%",
                  left: "12%",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  color: "hsl(var(--text-faint))",
                  opacity: 0.5,
                }}
              >
                Bland
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "12%",
                  right: "12%",
                  textAlign: "right",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  color: "hsl(var(--ember))",
                  opacity: 0.6,
                }}
              >
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
                leftLabel="Low"
                rightLabel="High"
                color="hsl(var(--ember))"
              />
            </div>

            {/* X-axis label */}
            <div
              style={{
                textAlign: "center",
                marginTop: 8,
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "hsl(var(--ember))",
              }}
            >
              Pepper
            </div>
          </div>
        </div>
      </div>

      {/* Result panel */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          margin: "2.5rem auto 0",
        }}
      >
        <div
          style={{
            padding: "2rem",
            background: "hsl(var(--cream) / 0.04)",
            borderRadius: 12,
            border: `1px solid hsl(var(--cream) / 0.08)`,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Quadrant name */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: data.color,
              }}
            >
              {data.name}
            </span>
            <span
              style={{
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: "0.8rem",
                color: "hsl(var(--cream-mid))",
                marginLeft: 12,
              }}
            >
              {data.subtitle}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Libre Franklin', sans-serif",
              fontSize: "0.9rem",
              color: "hsl(var(--cream-mid))",
              lineHeight: 1.7,
              marginBottom: "1.2rem",
            }}
          >
            {data.description}
          </p>

          {/* Insight line */}
          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid hsl(var(--cream) / 0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "hsl(var(--gold-light))",
                lineHeight: 1.5,
              }}
            >
              {data.insight}
            </p>
          </div>
        </div>

        {/* The key framework insight */}
        {hasInteracted && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              background: "hsl(var(--gold) / 0.06)",
              borderLeft: "3px solid hsl(var(--gold))",
              borderRadius: 6,
              animation: "matrix-fade-in 0.5s ease",
            }}
          >
            <p
              style={{
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: "0.88rem",
                color: "hsl(var(--cream-mid))",
                lineHeight: 1.7,
              }}
            >
              Most of pain management tries to move you left — reduce the pepper.
              <br />
              <span style={{ color: "hsl(var(--gold))", fontWeight: 600 }}>
                The Pepper Sauce Principle moves you up — enrich the sauce.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Tagline */}
      <p
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginTop: "2.5rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.15rem",
          fontStyle: "italic",
          color: "hsl(var(--gold-muted))",
          letterSpacing: "0.02em",
        }}
      >
        Life is painful. Make it delicious.
      </p>

      {/* Animations */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 0.7; }
        }
        @keyframes matrix-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
