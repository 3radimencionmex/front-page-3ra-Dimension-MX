"use client";
import { useEffect, useRef, useState } from "react";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const elements = useRef<Array<{ id: number, x: number, y: number, r: number, vx: number, vy: number, vr: number, type: string }>>([]);
  const requestRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Escuchar "b", "e", "n", "c", "h", "y" o click 3 veces? 
    // Haremos la palabra B E N C H Y
    let code = ["b", "e", "n", "c", "h", "y"];
    let codeIndex = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === code[codeIndex]) {
        codeIndex++;
        if (codeIndex === code.length) {
          triggerEasterEgg();
          codeIndex = 0;
        }
      } else {
        codeIndex = 0; // reset
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    if (active) return;
    setActive(true);
    
    const types = ["⚙️", "🚤", "🔩", "🧱", "🧊"];
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    for (let i = 0; i < 120; i++) {
        elements.current.push({
            id: Math.random(),
            x: Math.random() * w,
            y: -Math.random() * h - 50, // Caen de arriba
            r: Math.random() * 360,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 6 + 4, // Gravedad veloz
            vr: (Math.random() - 0.5) * 10,
            type: types[Math.floor(Math.random() * types.length)]
        });
    }

    const loop = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        
        ctx.clearRect(0,0, w, h);
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let alive = false;
        
        elements.current.forEach(el => {
            el.x += el.vx;
            el.y += el.vy;
            el.r += el.vr;
            
            // Rebotan muy leve al fondo y salen de pantalla
            if (el.y < h + 100) alive = true;

            ctx.save();
            ctx.translate(el.x, el.y);
            ctx.rotate(el.r * Math.PI / 180);
            ctx.fillText(el.type, 0, 0);
            ctx.restore();
        });

        if (alive) {
           requestRef.current = requestAnimationFrame(loop);
        } else {
           setActive(false);
           elements.current = [];
        }
    };
    
    setTimeout(() => {
        if (canvasRef.current) {
           canvasRef.current.width = window.innerWidth;
           canvasRef.current.height = window.innerHeight;
           requestRef.current = requestAnimationFrame(loop);
        }
    }, 100);
  };

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999999
      }}
      aria-hidden="true"
    />
  );
}
