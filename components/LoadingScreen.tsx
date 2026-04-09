"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 600);
      }
      setProgress(current);
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "var(--color-base)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-text)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--color-accent)"
          }}
        >
          <div style={{ fontSize: "5rem", fontWeight: "bold", color: "var(--color-accent)", textShadow: "0 0 20px var(--color-accent-glow)" }}>
            {progress}%
          </div>
          <div style={{ marginTop: "1rem", letterSpacing: "0.2em", fontSize: "0.85rem", color: "var(--color-muted)", textTransform: "uppercase" }}>
            {progress < 100 ? "Calentando extrusor..." : "Impresión iniciada"}
          </div>
          
          <div style={{ width: "240px", height: "1px", background: "var(--color-border)", marginTop: "2rem", overflow: "hidden", position: "relative" }}>
             <motion.div 
               style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--color-accent)", width: `${progress}%`, boxShadow: "0 0 10px var(--color-accent)" }}
               layout
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
