"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Step {
  number: string;
  glyph: string;
  label: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    glyph: "[◈]",
    label: "DISEÑO",
    title: "Diseño & CAD",
    description:
      "Recibimos tu concepto, referencia o boceto. Modelamos en 3D con tolerancias optimizadas para impresión.",
  },
  {
    number: "02",
    glyph: "[⟂]",
    label: "SLICING",
    title: "Preparación & Slicing",
    description:
      "Configuramos parámetros de capa, soportes, infill y temperatura según el material y uso final.",
  },
  {
    number: "03",
    glyph: "[▣]",
    label: "IMPRESIÓN",
    title: "Impresión",
    description:
      "Fabricación controlada con monitoreo automático en tiempo real. Alta velocidad con detección de fallos y calibración automática.",
  },
  {
    number: "04",
    glyph: "[◎]",
    label: "POST-PROCESO",
    title: "Post-Proceso",
    description:
      "Remoción de soportes, curado UV, lijado, pintura o tratamiento superficial según requerimiento.",
  },
  {
    number: "05",
    glyph: "[→]",
    label: "ENTREGA",
    title: "Entrega",
    description:
      "Embalaje seguro y envío a toda la República Mexicana. Entrega en persona en CDMX.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - track.clientWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll tween
      const tween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll + window.innerHeight}`,
        pin: true,
        scrub: 1,
        animation: tween,
        onUpdate: (self) => {
          if (progress) {
            progress.style.width = `${self.progress * 100}%`;
          }
          // Animate counters based on which step is visible
          steps.forEach((_, i) => {
            const el = counterRefs.current[i];
            if (!el) return;
            const stepProgress = self.progress * steps.length - i;
            if (stepProgress > 0 && stepProgress < 1.5) {
              el.style.color = "var(--color-accent)";
            } else {
              el.style.color = "var(--color-muted)";
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        background: "var(--color-base)",
        borderTop: "1px solid var(--color-border)",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      {/* Section header (fixed inside pin) */}
      <div
        style={{
          padding: "48px 24px 24px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <p className="section-label">// Proceso</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Cómo trabajamos
          </h2>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              letterSpacing: "0.1em",
            }}
          >
            ← scroll →
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            marginTop: "16px",
            height: "1px",
            background: "var(--color-border)",
            position: "relative",
          }}
        >
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "1px",
              width: "0%",
              background: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent-glow)",
              transition: "width 0.05s linear",
            }}
          />
          {/* Dot markers */}
          {steps.map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-3px",
                left: `${(i / (steps.length - 1)) * 100}%`,
                width: "7px",
                height: "7px",
                border: "1px solid var(--color-border)",
                background: "var(--color-base)",
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1px",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "max-content",
          height: "calc(100vh - 180px)",
          alignItems: "stretch",
        }}
      >
        {steps.map((step, i) => (
          <article
            key={step.number}
            style={{
              width: "clamp(280px, 33vw, 380px)",
              flexShrink: 0,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Step counter */}
            <span
              ref={(el) => { counterRefs.current[i] = el; }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "3rem",
                fontWeight: 700,
                color: "var(--color-muted)",
                lineHeight: 1,
                transition: "color 0.3s ease",
              }}
            >
              {step.number}
            </span>

            {/* Glyph */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                color: "var(--color-accent)",
              }}
            >
              {step.glyph}
            </span>

            {/* Label */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              {step.label}
            </span>

            {/* Title */}
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                color: "var(--color-text)",
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                flexGrow: 1,
              }}
            >
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
