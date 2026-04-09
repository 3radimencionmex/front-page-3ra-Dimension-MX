"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Service {
  glyph: string;
  label: string;
  title: string;
  description: string;
  glyphColor: string;
  linkColor: string;
  glowColor: string;
}

const services: Service[] = [
  {
    glyph: "[///]",
    label: "FDM",
    title: "Impresión FDM",
    description:
      "Fabricación por deposición fundida. Ideal para prototipos funcionales, piezas estructurales y producción en serie. Materiales: PLA, ABS, PETG, TPU.",
    glyphColor: "var(--color-accent)",
    linkColor: "var(--color-accent)",
    glowColor: "var(--color-accent-glow)",
  },
  {
    glyph: "[~~~]",
    label: "SLA / MSLA",
    title: "Resina SLA/MSLA",
    description:
      "Fotopolimerización UV de alta resolución. Perfecta para modelos de detalle fino, joyería, odontología y masters para moldes.",
    glyphColor: "var(--color-cyan)",
    linkColor: "var(--color-cyan)",
    glowColor: "var(--color-cyan-dim)",
  },
  {
    glyph: "[CAD]",
    label: "DISEÑO",
    title: "Diseño CAD",
    description:
      "Modelado 3D profesional desde cero o a partir de referencias. Optimización para manufactura y exportación en STL/STEP/OBJ.",
    glyphColor: "var(--color-amber)",
    linkColor: "var(--color-amber)",
    glowColor: "var(--color-amber-dim)",
  },
  {
    glyph: "[>>>]",
    label: "RÁPIDO",
    title: "Prototipado Rápido",
    description:
      "Ciclo completo desde concepto hasta pieza física en 24–72 h. Iteraciones ágiles para validación de diseño y pruebas de usuario.",
    glyphColor: "var(--color-accent)",
    linkColor: "var(--color-accent)",
    glowColor: "var(--color-accent-glow)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      style={{
        background: "var(--color-base)",
        borderTop: "1px solid var(--color-border)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p className="section-label">// Servicios</p>
          <h2 className="section-title">
            Lo que fabricamos
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              maxWidth: "480px",
            }}
          >
            Tecnología de impresión 3D de última generación para prototipos,
            piezas funcionales y producción bajo demanda.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "var(--color-border)",
          }}
        >
          {services.map((service) => (
            <motion.article
              key={service.label}
              variants={cardVariants}
              style={{
                background: "var(--color-surface)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "box-shadow 0.2s ease",
              }}
              className={`service-card service-card--${service.label.toLowerCase().replace(/\s*\/\s*/, "-")}`}
            >
              {/* Top colored bar */}
              <div style={{ height: "2px", background: service.glyphColor, width: "32px", boxShadow: `0 0 8px ${service.glowColor}` }} aria-hidden="true" />

              {/* ASCII glyph */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  color: service.glyphColor,
                  letterSpacing: "0.05em",
                  textShadow: `0 0 12px ${service.glowColor}`,
                }}
              >
                {service.glyph}
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: service.glyphColor,
                  opacity: 0.7,
                }}
              >
                {service.label}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text)",
                }}
              >
                {service.title}
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
                {service.description}
              </p>

              {/* Footer link */}
              <a
                href="#contact"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: service.linkColor,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "opacity 0.15s ease",
                }}
              >
                Cotizar →
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style>{`
        .service-card {
          position: relative;
        }
        .service-card:hover {
          z-index: 1;
          background: var(--color-surface-2) !important;
        }
        .service-card--fdm:hover       { box-shadow: inset 0 0 0 1px var(--color-accent), 0 0 28px var(--color-accent-dim); }
        .service-card--sla-msla:hover  { box-shadow: inset 0 0 0 1px var(--color-cyan),   0 0 28px var(--color-cyan-dim); }
        .service-card--diseño:hover    { box-shadow: inset 0 0 0 1px var(--color-amber),  0 0 28px var(--color-amber-dim); }
        .service-card--rápido:hover    { box-shadow: inset 0 0 0 1px var(--color-accent), 0 0 28px var(--color-accent-dim); }
      `}</style>
    </section>
  );
}
