"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const raf = useRef<number>(0);
  const frame = useRef(0);

  useEffect(() => {
    function animate() {
      frame.current++;
      // Update seed every 2 frames (~30fps noise refresh) for animated grain
      if (frame.current % 2 === 0 && turbRef.current) {
        turbRef.current.setAttribute("seed", String((frame.current * 7) % 1000));
      }
      raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <>
      <svg
        aria-hidden="true"
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="grain-f" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              seed="0"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9990,
          filter: "url(#grain-f)",
          opacity: 0.038,
          background: "#fff",
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
