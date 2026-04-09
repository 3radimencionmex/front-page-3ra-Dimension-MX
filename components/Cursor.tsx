"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const hovered = useRef(false);
  const lastPos = useRef({ x: -200, y: -200 });

  // particles state
  const particles = useRef<Array<{ x: number, y: number, vx: number, vy: number, life: number, maxLife: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", onResize);

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
    }

    function onEnter() { hovered.current = true; }
    function onLeave() { hovered.current = false; }

    function addListeners() {
      document.querySelectorAll<HTMLElement>("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }

    addListeners();
    window.addEventListener("mousemove", onMove);

    function loop() {
      const scale = hovered.current ? 1.8 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(${scale})`;
      }

      // Draw particles on canvas
      ctx.clearRect(0, 0, width, height);
      
      const dx = pos.current.x - lastPos.current.x;
      const dy = pos.current.y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Emite partículas si el mouse se movió lo suficiente
      if (dist > 2) {
        particles.current.push({
          x: pos.current.x,
          y: pos.current.y,
          vx: (Math.random() - 0.5) * 2 - (dx * 0.05), // en contra del movimiento
          vy: (Math.random() - 0.5) * 2 - (dy * 0.05),
          life: 1,
          maxLife: Math.random() * 0.5 + 0.5 
        });
      }

      // Render de partículas
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // Velocidad de desaparición

        if (p.life <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, p.life * 2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${p.life})`;
          ctx.fill();
        }
      }

      lastPos.current = { x: pos.current.x, y: pos.current.y };
      raf.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          background: "var(--color-accent)",
          boxShadow: "0 0 6px var(--color-accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "transform 0.1s ease",
          borderRadius: "50%" // added dot rounding just to be clean
        }}
      />
    </>
  );
}
