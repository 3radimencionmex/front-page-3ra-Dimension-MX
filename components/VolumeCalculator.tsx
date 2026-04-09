"use client";
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { WebGLErrorBoundary, isWebGLAvailable } from "./WebGLErrorBoundary";

/* ─── CSS fallback cube when WebGL is unavailable ────────────────────────── */
function CSSBox({ width, height, depth }: { width: number; height: number; depth: number }) {
  const MAX = 140;
  const scale = Math.max(width, height, depth);
  const w = Math.round((width / scale) * MAX);
  const h = Math.round((height / scale) * MAX);
  const d = Math.round((depth / scale) * MAX);

  // Each face needs to be centered on the cube origin.
  // The container div is w×h, faces use absolute positioning from top-left (0,0).
  // Offset faces so they originate from the center of the container.
  const face: React.CSSProperties = {
    position: "absolute",
    border: "1px solid #00FF41",
    background: "rgba(0,255,65,0.05)",
    boxShadow: "inset 0 0 10px rgba(0,255,65,0.12)",
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    }}>
      {/* perspective wrapper */}
      <div style={{ perspective: "700px", perspectiveOrigin: "50% 50%" }}>
        {/* cube root — centered so transforms work from middle */}
        <div style={{
          width: w,
          height: h,
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "cssbox-spin 6s linear infinite",
        }}>
          {/* Front  — translateZ(+d/2) */}
          <div style={{ ...face, width: w, height: h, top: 0, left: 0,
            transform: `translateZ(${d / 2}px)` }} />
          {/* Back   — rotateY(180) translateZ(+d/2) */}
          <div style={{ ...face, width: w, height: h, top: 0, left: 0,
            transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
          {/* Right  — rotateY(+90) translateZ(+w/2), offset left by (w-d)/2 */}
          <div style={{ ...face, width: d, height: h, top: 0, left: (w - d) / 2,
            transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
          {/* Left   — rotateY(-90) translateZ(+w/2) */}
          <div style={{ ...face, width: d, height: h, top: 0, left: (w - d) / 2,
            transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
          {/* Top    — rotateX(+90) translateZ(+h/2), offset top by (h-d)/2 */}
          <div style={{ ...face, width: w, height: d, top: (h - d) / 2, left: 0,
            transform: `rotateX(90deg) translateZ(${h / 2}px)` }} />
          {/* Bottom — rotateX(-90) translateZ(+h/2) */}
          <div style={{ ...face, width: w, height: d, top: (h - d) / 2, left: 0,
            transform: `rotateX(-90deg) translateZ(${h / 2}px)` }} />
        </div>
      </div>

      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--color-muted)",
        letterSpacing: "0.08em",
      }}>
        {width} × {height} × {depth} cm
      </div>

      <style>{`
        @keyframes cssbox-spin {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to   { transform: rotateX(-22deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Three.js rotating box ─────────────────────────────────────────────── */
function RotatingBox({ width, height, depth }: { width: number; height: number; depth: number }) {
  const mesh = useRef<any>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5;
      mesh.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <RoundedBox ref={mesh} args={[width / 30, height / 30, depth / 30]} radius={0.05} smoothness={4}>
      <meshStandardMaterial color="#00FF41" transparent opacity={0.6} roughness={0.1} metalness={0.8} />
    </RoundedBox>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function VolumeCalculator() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [z, setZ] = useState(10);
  const [webGL, setWebGL] = useState(false); // false until client confirms

  useEffect(() => { setWebGL(isWebGLAvailable()); }, []);

  const vol = x * y * z;
  let complexity = "Fácil";
  if (vol > 1500) complexity = "Medio";
  if (vol > 8000) complexity = "Complejo";

  const phone = "525500000000";

  return (
    <section style={{ padding: "96px 24px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }} id="calculator">
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="calc-grid">
        <div>
          <p className="section-label">// Herramienta Interactiva</p>
          <h2 className="section-title">Calculadora de Volumen</h2>
          <p style={{ color: "var(--color-muted)", marginBottom: "32px", fontSize: "0.875rem", fontFamily: "var(--font-mono)" }}>
            Estima la complejidad de tu modelo ajustando las dimensiones (cm). Usa el holograma dinámico para referenciar el aspecto.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {([["Ancho (X)", x, setX], ["Alto (Y)", y, setY], ["Profundidad (Z)", z, setZ]] as const).map(([label, val, set]) => (
              <div key={label} className="field">
                <label style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                  <span>{label}</span> <span>{val} cm</span>
                </label>
                <input type="range" min="1" max="100" value={val} onChange={(e) => set(Number(e.target.value))} style={{ accentColor: "var(--color-accent)", width: "100%" }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", background: "var(--color-base)", padding: "24px", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.8rem", marginBottom: "16px" }}>RESULTADO ESTIMADO</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>Volumen Ocupado:</span>
              <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>{vol} cm³</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>Nivel de Complejidad:</span>
              <span style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}>{complexity}</span>
            </div>
            <a
              href={`https://wa.me/${phone}?text=Hola,%20busco%20cotizar%20una%20pieza%20con%20dimensiones%20${x}x${y}x${z}cm%20(Volumen:%20${vol}cm3).`}
              target="_blank"
              rel="noopener noreferrer"
              className="nothing-btn nothing-btn--accent"
              style={{ width: "100%", justifyContent: "center" }}
            >
              WhatsApp (Enviar cotización rápida)
            </a>
          </div>
        </div>

        <div style={{ minHeight: "400px", background: "var(--color-base)", border: "1px solid var(--color-border)", position: "relative" }}>
          {webGL ? (
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <RotatingBox width={x} height={y} depth={z} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          ) : (
            <CSSBox width={x} height={y} depth={z} />
          )}
          <span style={{ position: "absolute", bottom: 12, right: 12, fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)" }}>
            [ Holograma Dinámico 3D ]
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
