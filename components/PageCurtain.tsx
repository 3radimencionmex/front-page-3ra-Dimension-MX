"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after a short delay to let fonts/assets start loading
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            transformOrigin: "top",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-base)",
            borderBottom: "1px solid var(--color-accent)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              textShadow: "0 0 16px var(--color-accent-glow)",
            }}
          >
            3RADIMENSION.MX
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
