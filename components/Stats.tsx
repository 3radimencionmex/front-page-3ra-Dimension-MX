"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  color: string;
  glyph: string;
}

const STATS: Stat[] = [
  {
    value: 500,
    suffix: "+",
    prefix: "",
    label: "Proyectos",
    sublabel: "entregados",
    color: "var(--color-accent)",
    glyph: "[▣]",
  },
  {
    value: 3,
    suffix: "",
    prefix: "",
    label: "Años",
    sublabel: "de experiencia",
    color: "var(--color-cyan)",
    glyph: "[◈]",
  },
  {
    value: 24,
    suffix: "h",
    prefix: "<",
    label: "Respuesta",
    sublabel: "tiempo garantizado",
    color: "var(--color-amber)",
    glyph: "[→]",
  },
  {
    value: 5,
    suffix: "",
    prefix: "",
    label: "Materiales",
    sublabel: "certificados",
    color: "var(--color-accent)",
    glyph: "[◎]",
  },
];

function CounterItem({ stat, active }: { stat: Stat; active: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const DURATION = 1800;

  useEffect(() => {
    if (!active) return;
    startRef.current = null;
    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const t = Math.min((now - startRef.current) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * stat.value));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, stat.value]);

  return (
    <div
      className="stat-cell"
      style={{
        padding: "48px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glyph watermark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "12px",
          right: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "4rem",
          color: stat.color,
          opacity: 0.06,
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        {stat.glyph}
      </span>

      {/* Colored top bar */}
      <div
        style={{
          height: "2px",
          width: "32px",
          background: stat.color,
          boxShadow: `0 0 8px ${stat.color}`,
        }}
      />

      {/* Animated number */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
          fontWeight: 700,
          color: stat.color,
          lineHeight: 1,
          textShadow: `0 0 24px ${stat.color}`,
          letterSpacing: "-0.02em",
        }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {stat.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginTop: "4px",
          }}
        >
          {stat.sublabel}
        </div>
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-base)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="stats-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--color-border)",
        }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} style={{ background: "var(--color-base)" }}>
            <CounterItem stat={stat} active={inView} />
          </div>
        ))}
      </div>

      <style>{`
        .stat-cell { transition: background 0.2s ease; }
        .stat-cell:hover { background: var(--color-surface) !important; }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
