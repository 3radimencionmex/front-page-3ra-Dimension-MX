"use client";
import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { WebGLErrorBoundary, isWebGLAvailable } from "./WebGLErrorBoundary";

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

const NoWebGL = ({ onReset }: { onReset: () => void }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px" }}>
    <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
      [ Vista previa no disponible — WebGL desactivado ]
    </span>
    <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.8rem", textAlign: "center", maxWidth: "400px" }}>
      El archivo fue cargado. Para verlo en 3D, abre la página en Chrome o Firefox con aceleración de hardware activada.
    </p>
    <button className="nothing-btn" onClick={onReset}>Cargar otro archivo</button>
  </div>
);

export default function STLViewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [webGL, setWebGL] = useState(false);

  useEffect(() => { setWebGL(isWebGLAvailable()); }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.toLowerCase().endsWith(".stl") || file.name.toLowerCase().endsWith(".obj"))) {
        const url = URL.createObjectURL(file);
        setModelUrl(url);
    } else {
        alert("Por favor suelta un archivo .STL o .OBJ");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section style={{ padding: "96px 24px", background: "var(--color-base)", borderTop: "1px solid var(--color-border)" }} id="visor">
       <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
         <p className="section-label">// Visualizador de Modelos</p>
         <h2 className="section-title">Arrastra tu archivo STL</h2>
         <p style={{ color: "var(--color-muted)", marginBottom: "32px", fontSize: "0.875rem", fontFamily: "var(--font-mono)", maxWidth: "800px" }}>
           Sube tu diseño para visualizarlo en tiempo real en nuestra plataforma. Todos los archivos se procesan de forma privada y localmente en tu dispositivo, no se suben a ningún servidor.
         </p>

         {!modelUrl ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                 height: "400px",
                 border: "2px dashed var(--color-border-bright)",
                 borderRadius: "8px",
                 display: "flex",
                 flexDirection: "column",
                 justifyContent: "center",
                 alignItems: "center",
                 transition: "all 0.3s ease",
                 background: "var(--color-surface)",
                 position: "relative"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "var(--color-base)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-bright)"; e.currentTarget.style.background = "var(--color-surface)"; }}
            >
               <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1" style={{ marginBottom: "24px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
               </svg>
               <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-text)", fontSize: "1.1rem" }}>Arrastra tu archivo aquí para visualizar</span>
               <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.85rem", marginTop: "12px", marginBottom: "24px" }}>o utiliza el botón a continuación</span>

               <label className="nothing-btn nothing-btn--accent" style={{ cursor: "pointer" }}>
                 Seleccionar archivo .STL / .OBJ
                 <input type="file" accept=".stl,.obj" onChange={(e) => {
                    if (e.target.files?.[0]) setModelUrl(URL.createObjectURL(e.target.files[0]));
                 }} style={{ display: "none" }} />
               </label>
            </div>
         ) : (
            <div style={{ height: "600px", background: "var(--color-surface)", border: "1px solid var(--color-accent)", position: "relative" }}>
               {webGL ? (
                 <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 100], fov: 50 }}>
                   <Suspense fallback={null}>
                     <Stage preset="rembrandt" intensity={1} environment="city">
                       <STLModel url={modelUrl} />
                     </Stage>
                   </Suspense>
                   <OrbitControls makeDefault />
                 </Canvas>
               ) : (
                 <NoWebGL onReset={() => setModelUrl(null)} />
               )}

               <button
                  className="nothing-btn"
                  onClick={() => setModelUrl(null)}
                  style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10, background: "rgba(0,0,0,0.8)" }}
               >
                 Cerrar y subir otro archivo
               </button>
               <span style={{ position: "absolute", top: 12, right: 12, fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)" }}>[ Engine: Three.js ]</span>
            </div>
         )}
       </div>
    </section>
  );
}
