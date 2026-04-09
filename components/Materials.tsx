"use client";

import { useState } from "react";

type FilterType = "Todos" | "Estándar" | "Ingeniería";

interface Material {
  name: string;
  hardness: string;
  maxTemp: string;
  idealUse: string;
  available: boolean;
  type: "Estándar" | "Ingeniería";
}

const materials: Material[] = [
  {
    name: "PLA",
    hardness: "Rígido",
    maxTemp: "60°C",
    idealUse: "Prototipos visuales, modelos de exhibición",
    available: true,
    type: "Estándar",
  },
  {
    name: "PLA+ Silk",
    hardness: "Rígido / Brillante",
    maxTemp: "60°C",
    idealUse: "Decoración, arte, productos de lujo",
    available: true,
    type: "Estándar",
  },
  {
    name: "PETG",
    hardness: "Semi-flexible",
    maxTemp: "80°C",
    idealUse: "Piezas funcionales, contenedores",
    available: true,
    type: "Estándar",
  },
  {
    name: "TPU",
    hardness: "Flexible",
    maxTemp: "90°C",
    idealUse: "Juntas, amortiguadores, calzado",
    available: true,
    type: "Estándar",
  },
  {
    name: "ABS",
    hardness: "Rígido / Resistente",
    maxTemp: "100°C",
    idealUse: "Carcasas técnicas, piezas mecánicas",
    available: true,
    type: "Ingeniería",
  },
  {
    name: "ASA",
    hardness: "Rígido / UV Resistente",
    maxTemp: "95°C",
    idealUse: "Piezas de exterior, automoción",
    available: true,
    type: "Ingeniería",
  },
  {
    name: "PA (Nylon)",
    hardness: "Semi-rígido / Durable",
    maxTemp: "120°C",
    idealUse: "Piezas de alta resistencia, engranajes",
    available: true,
    type: "Ingeniería",
  },
  {
    name: "PLA-CF",
    hardness: "Rígido / Ligero",
    maxTemp: "65°C",
    idealUse: "Piezas estructurales ligeras, drones",
    available: true,
    type: "Ingeniería",
  },
];

const FILTERS: FilterType[] = ["Todos", "Estándar", "Ingeniería"];

export default function Materials() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");

  const filtered =
    activeFilter === "Todos"
      ? materials
      : materials.filter((m) => m.type === activeFilter);

  return (
    <section
      id="materials"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <p className="section-label">// Materiales</p>
            <h2 className="section-title">Catálogo de materiales</h2>
          </div>

          {/* Filter pills */}
          <div
            role="group"
            aria-label="Filtrar por tipo"
            style={{ display: "flex", gap: "1px", background: "var(--color-border)" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                style={{
                  padding: "8px 20px",
                  background:
                    activeFilter === f
                      ? f === "Estándar"
                        ? "var(--color-accent)"
                        : f === "Ingeniería"
                        ? "var(--color-cyan)"
                        : "var(--color-text)"
                      : "var(--color-surface)",
                  color:
                    activeFilter === f ? "var(--color-base)" : "var(--color-muted)",
                  boxShadow:
                    activeFilter === f && f === "Estándar"
                      ? "0 0 12px var(--color-accent-glow)"
                      : activeFilter === f && f === "Ingeniería"
                      ? "0 0 12px var(--color-cyan-dim)"
                      : "none",
                  border: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            <thead>
              <tr>
                {["Material", "Dureza", "Temp. Máx", "Uso Ideal", "Disponible"].map(
                  (col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        color: "var(--color-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontSize: "0.65rem",
                        borderBottom: "1px solid var(--color-border)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((mat, i) => (
                <tr
                  key={mat.name}
                  className="materials-row"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <td
                    style={{
                      padding: "16px",
                      color: "var(--color-text)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        background:
                          mat.type === "Estándar"
                            ? "var(--color-accent)"
                            : "var(--color-cyan)",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                      aria-label={mat.type}
                    />
                    {mat.name}
                  </td>
                  <td style={{ padding: "16px", color: "var(--color-muted)" }}>
                    {mat.hardness}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      color: "var(--color-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {mat.maxTemp}
                  </td>
                  <td style={{ padding: "16px", color: "var(--color-muted)" }}>
                    {mat.idealUse}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {mat.available ? (
                      <span style={{ color: "var(--color-accent)", letterSpacing: "0.05em", textShadow: "0 0 6px var(--color-accent-glow)" }}>
                        ● Sí
                      </span>
                    ) : (
                      <span style={{ color: "var(--color-muted)" }}>○ No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "24px",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
          }}
        >
          <span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                background: "var(--color-accent)",
                marginRight: "6px",
                verticalAlign: "middle",
              }}
            />
            Estándar
          </span>
          <span>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                background: "var(--color-cyan)",
                marginRight: "6px",
                verticalAlign: "middle",
              }}
            />
            Ingeniería
          </span>
        </div>
      </div>

      <style>{`
        .materials-row {
          position: relative;
          transition: background 0.15s ease;
        }
        .materials-row:hover {
          background: var(--color-border);
        }
        .materials-row:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.015) 2px,
            rgba(255,255,255,0.015) 4px
          );
          pointer-events: none;
          animation: scanSweep 0.4s linear;
        }
        @keyframes scanSweep {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
