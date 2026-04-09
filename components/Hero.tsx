"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter } from "@/lib/useTypewriter";
import { WebGLErrorBoundary, isWebGLAvailable } from "./WebGLErrorBoundary";

/* ─── 3-D Wireframe Car ──────────────────────────────────────────────────── */
const WHEEL_POSITIONS: [number, number, number][] = [
  [0.62, -0.3, 1.0],
  [-0.62, -0.3, 1.0],
  [0.62, -0.3, -1.0],
  [-0.62, -0.3, -1.0],
];

function CarModel() {
  return (
    <group rotation={[0.22, 0.5, 0]}>
      {/* Chassis / lower body — green */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.38, 0.48, 3.0]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>

      {/* Cabin — cyan */}
      <mesh position={[0, 0.5, -0.1]}>
        <boxGeometry args={[1.18, 0.54, 1.55]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>

      {/* Windshield frame (tilted) */}
      <mesh position={[0, 0.5, 0.7]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[1.14, 0.52, 0.05]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>

      {/* Rear window (tilted) */}
      <mesh position={[0, 0.5, -0.88]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[1.14, 0.52, 0.05]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, -0.12, 1.53]}>
        <boxGeometry args={[1.34, 0.2, 0.08]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, -0.12, -1.53]}>
        <boxGeometry args={[1.34, 0.2, 0.08]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>

      {/* Headlights — amber */}
      <mesh position={[0.36, 0.02, 1.52]}>
        <boxGeometry args={[0.26, 0.14, 0.06]} />
        <meshBasicMaterial color="#FFB800" wireframe />
      </mesh>
      <mesh position={[-0.36, 0.02, 1.52]}>
        <boxGeometry args={[0.26, 0.14, 0.06]} />
        <meshBasicMaterial color="#FFB800" wireframe />
      </mesh>

      {/* Taillights — red */}
      <mesh position={[0.36, 0.02, -1.52]}>
        <boxGeometry args={[0.26, 0.14, 0.06]} />
        <meshBasicMaterial color="#FF3B3B" wireframe />
      </mesh>
      <mesh position={[-0.36, 0.02, -1.52]}>
        <boxGeometry args={[0.26, 0.14, 0.06]} />
        <meshBasicMaterial color="#FF3B3B" wireframe />
      </mesh>

      {/* Wheels — amber tyres + cyan rims */}
      {WHEEL_POSITIONS.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 14]} />
            <meshBasicMaterial color="#FFB800" wireframe />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.22, 6]} />
            <meshBasicMaterial color="#00E5FF" wireframe />
          </mesh>
        </group>
      ))}

      {/* Roof spoiler stub */}
      <mesh position={[0, 0.82, -0.88]}>
        <boxGeometry args={[0.7, 0.06, 0.22]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>
    </group>
  );
}

/* ─── Robotic Arm ────────────────────────────────────────────────────────── */
function RoboticArmModel() {
  return (
    <group rotation={[0.1, 0.3, 0]}>
      {/* Base plate */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.7, 0.78, 0.15, 8]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>
      {/* Waist turret */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.4, 0.62, 0.35, 8]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>
      {/* Shoulder joint */}
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.22, 8, 6]} />
        <meshBasicMaterial color="#FFB800" wireframe />
      </mesh>
      {/* Link 1 — lower arm */}
      <mesh position={[0.12, 0.12, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.2, 1.35, 0.2]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>
      {/* Elbow joint */}
      <mesh position={[0.28, 0.82, 0]}>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshBasicMaterial color="#FFB800" wireframe />
      </mesh>
      {/* Link 2 — upper arm, bent forward */}
      <mesh position={[0.04, 1.32, 0.25]} rotation={[0.5, 0, 0.08]}>
        <boxGeometry args={[0.17, 0.92, 0.17]} />
        <meshBasicMaterial color="#00FF41" wireframe />
      </mesh>
      {/* Wrist cylinder */}
      <mesh position={[-0.06, 1.72, 0.52]}>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 6]} />
        <meshBasicMaterial color="#FFB800" wireframe />
      </mesh>
      {/* Gripper base */}
      <mesh position={[-0.06, 1.88, 0.54]}>
        <boxGeometry args={[0.3, 0.12, 0.14]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
      {/* Gripper finger A */}
      <mesh position={[0.1, 2.04, 0.54]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.07, 0.3, 0.08]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
      {/* Gripper finger B */}
      <mesh position={[-0.22, 2.04, 0.54]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.07, 0.3, 0.08]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
      {/* Cable detail */}
      <mesh position={[0.3, 0.12, 0.08]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.03, 0.03, 1.32, 4]} />
        <meshBasicMaterial color="#2A4A2A" wireframe />
      </mesh>
    </group>
  );
}

/* ─── City Buildings ─────────────────────────────────────────────────────── */
function BuildingsModel() {
  // [x, z, width, depth, height, color]
  const buildings: [number, number, number, number, number, string][] = [
    // Centro — torre alta
    [0,    0,    0.38, 0.38, 2.6,  "#00FF41"],
    // Antena encima
    [0,    0,    0.06, 0.06, 0.55, "#00FF41"],
    // Edificio izquierda alto
    [-0.7, 0.1,  0.32, 0.32, 1.9,  "#00E5FF"],
    // Edificio derecha mediano
    [0.72, -0.1, 0.3,  0.28, 1.5,  "#00E5FF"],
    // Edificio izquierda bajo
    [-1.2, 0.0,  0.28, 0.28, 1.1,  "#00FF41"],
    // Edificio derecha bajo ancho
    [1.25, 0.15, 0.35, 0.3,  0.85, "#FFB800"],
    // Rascacielos trasero izquierda
    [-0.35, 0.45, 0.25, 0.25, 2.1, "#00FF41"],
    // Rascacielos trasero derecha
    [0.38, 0.42, 0.22, 0.22, 1.7,  "#00E5FF"],
    // Edificio pequeño frente izquierda
    [-1.0, -0.35, 0.24, 0.24, 0.7, "#FFB800"],
    // Edificio pequeño frente derecha
    [1.0,  -0.3,  0.22, 0.22, 0.6, "#00FF41"],
  ];

  return (
    <group rotation={[0.25, 0.5, 0]}>
      {/* Ground plane */}
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[3.2, 0.04, 2.2]} />
        <meshBasicMaterial color="#2A4A2A" wireframe />
      </mesh>

      {buildings.map(([x, z, w, d, h, color], i) => {
        const y = -1.22 + h / 2;
        // Torre principal lleva antena encima como parte del mismo bloque
        if (i === 1) {
          return (
            <mesh key={i} position={[x, -1.22 + 2.6 + 0.55 / 2, z]}>
              <boxGeometry args={[w, 0.55, d]} />
              <meshBasicMaterial color={color} wireframe />
            </mesh>
          );
        }
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[w, h, d]} />
            <meshBasicMaterial color={color} wireframe />
          </mesh>
        );
      })}

      {/* Ventanas — filas de líneas horizontales en torre central */}
      {[0.6, 0.9, 1.2, 1.5, 1.8].map((yOff, i) => (
        <mesh key={`win-${i}`} position={[0, -1.22 + yOff, 0.2]}>
          <boxGeometry args={[0.34, 0.03, 0.02]} />
          <meshBasicMaterial color="#FFB800" wireframe />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Particle Field ─────────────────────────────────────────────────────── */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 220;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.8 + Math.random() * 2.0;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.07;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial color="#00FF41" size={0.035} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Floating Background Geometries ────────────────────────────────────── */
const GEO_CONFIGS = [
  { pos: [-4.2,  1.8, -3.0] as [number,number,number], speed: 0.28, color: "#00FF41", type: 0 },
  { pos: [ 4.5, -1.2, -2.5] as [number,number,number], speed: 0.22, color: "#00E5FF", type: 1 },
  { pos: [-3.5, -2.4, -2.0] as [number,number,number], speed: 0.35, color: "#FFB800", type: 2 },
  { pos: [ 3.8,  2.5, -3.5] as [number,number,number], speed: 0.19, color: "#00FF41", type: 1 },
  { pos: [-5.0,  0.2, -1.5] as [number,number,number], speed: 0.31, color: "#00E5FF", type: 0 },
  { pos: [ 5.2, -0.8, -2.8] as [number,number,number], speed: 0.25, color: "#FFB800", type: 2 },
  { pos: [ 0.5,  3.8, -3.2] as [number,number,number], speed: 0.17, color: "#00FF41", type: 1 },
  { pos: [-1.2, -3.5, -2.2] as [number,number,number], speed: 0.29, color: "#00E5FF", type: 0 },
];

function FloatingGeos() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += delta * GEO_CONFIGS[i].speed * 0.6;
      mesh.rotation.y += delta * GEO_CONFIGS[i].speed;
      mesh.position.y += Math.sin(Date.now() * 0.0005 + i) * delta * 0.04;
    });
  });

  return (
    <>
      {GEO_CONFIGS.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={cfg.pos}
        >
          {cfg.type === 0 && <icosahedronGeometry args={[0.14, 0]} />}
          {cfg.type === 1 && <octahedronGeometry args={[0.17]} />}
          {cfg.type === 2 && <boxGeometry args={[0.2, 0.2, 0.2]} />}
          <meshBasicMaterial color={cfg.color} wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Shape Shifter — cycles Car → Arm → Buildings ──────────────────────── */
function ShapeShifter() {
  const groupRef = useRef<THREE.Group>(null);
  const stageRef = useRef<"show" | "shrink" | "grow">("show");
  const timerRef = useRef(0);
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);

  const SHOW_TIME = 4.5;
  const ANIM_TIME = 0.75;

  useFrame((_, delta) => {
    timerRef.current += delta;
    const stage = stageRef.current;
    let scale = 1;

    if (stage === "show") {
      scale = 1;
      if (timerRef.current >= SHOW_TIME) {
        stageRef.current = "shrink";
        timerRef.current = 0;
      }
    } else if (stage === "shrink") {
      scale = 1 - timerRef.current / ANIM_TIME;
      if (timerRef.current >= ANIM_TIME) {
        const next = (phaseRef.current + 1) % 3;
        phaseRef.current = next;
        setPhase(next);
        stageRef.current = "grow";
        timerRef.current = 0;
        scale = 0;
      }
    } else {
      scale = timerRef.current / ANIM_TIME;
      if (timerRef.current >= ANIM_TIME) {
        stageRef.current = "show";
        timerRef.current = 0;
        scale = 1;
      }
    }

    if (groupRef.current) {
      groupRef.current.scale.setScalar(Math.max(0.001, Math.min(1, scale)));
    }
  });

  return (
    <group ref={groupRef}>
      {phase === 0 && <CarModel />}
      {phase === 1 && <RoboticArmModel />}
      {phase === 2 && <BuildingsModel />}
    </group>
  );
}

/* ─── Dot Matrix Canvas — green tinted ──────────────────────────────────── */
function DotMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_SPACING = 28;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let x = 0; x < width; x += DOT_SPACING) {
        for (let y = 0; y < height; y += DOT_SPACING) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 220);
          const radius = 1 + influence * 3.5;
          const baseAlpha = 0.05;
          const alpha = baseAlpha + influence * 0.35;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          // Interpolate between dim-green (base) and bright-green (hover)
          if (influence > 0.05) {
            ctx.fillStyle = `rgba(0,255,65,${alpha})`;
          } else {
            ctx.fillStyle = `rgba(0,255,65,${baseAlpha})`;
          }
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const typewriter = useTypewriter(
    "3radimension Mexico — Impresión 3D Profesional",
    55,
    1200
  );
  const [glitchActive, setGlitchActive] = useState(false);
  const [webGL, setWebGL] = useState(false); // false until client confirms
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -90]);
  const canvasY = useTransform(scrollY, [0, 600], [0, -35]);

  useEffect(() => {
    setWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const loop = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
      setTimeout(loop, 4000 + Math.random() * 3000);
    };
    const t = setTimeout(loop, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        background: "var(--color-base)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Green dot matrix */}
      <DotMatrixCanvas />

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />

      {/* Ambient green glow — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient cyan glow — top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* R3F Scene — only mounts after client confirms WebGL works */}
      {webGL && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            y: canvasY,
          }}
        >
          <Canvas camera={{ position: [0, 1, 6], fov: 42 }} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[3, 4, 3]} color="#00FF41" intensity={1.5} />
              <pointLight position={[-3, -2, -2]} color="#00E5FF" intensity={0.8} />
              <FloatingGeos />
              <ParticleField />
              <ShapeShifter />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
              />
              <EffectComposer>
                <Bloom
                  luminanceThreshold={0.05}
                  luminanceSmoothing={0.4}
                  intensity={1.4}
                />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </motion.div>
      )}

      {/* Content — parallax layer */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          y: textY,
        }}
      >
        {/* Pill label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "24px",
            display: "inline-block",
            border: "1px solid var(--color-accent)",
            padding: "4px 14px",
            boxShadow: "0 0 12px var(--color-accent-dim)",
          }}
        >
          3RADIMENSION.MX
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={glitchActive ? "glitch" : ""}
          data-text="FABRICACIÓN DEL FUTURO"
          style={{
            fontSize: "var(--font-size-hero)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            fontFamily: "var(--font-sans)",
            display: "block",
          }}
        >
          FABRICACIÓN DEL FUTURO
        </motion.h1>

        {/* Typewriter — colored cursor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            color: "var(--color-muted)",
            marginBottom: "48px",
            minHeight: "1.5em",
          }}
        >
          <span aria-label="3radimension Mexico — Impresión 3D Profesional">
            {typewriter}
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "var(--color-accent)",
              verticalAlign: "text-bottom",
              marginLeft: "2px",
              animation: "blink 1s step-end infinite",
              boxShadow: "0 0 6px var(--color-accent)",
            }}
          />
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="#contact" className="nothing-btn--accent nothing-btn">
            Solicitar Cotización →
          </a>
          <a href="#services" className="nothing-btn--cyan nothing-btn">
            Ver Servicios ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Tagline bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--color-muted)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Donde el diseño se vuelve tangible ↓
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
