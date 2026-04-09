"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const BEFORE_IMAGES = [
  { src: "/comparacion/IMG-20260318-WA0016.jpg", label: "Diseño 1" },
  { src: "/comparacion/IMG-20260318-WA0017.jpg", label: "Diseño 2" },
  { src: "/comparacion/IMG-20260318-WA0018.jpg", label: "Diseño 3" },
  { src: "/comparacion/IMG-20260318-WA0019.jpg", label: "Diseño 4" },
];

const AFTER_VIDEO = "/comparacion/VID-20260320-WA0012.mp4";

export default function BeforeAfterSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  // Play/pause video based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-base)",
        borderTop: "1px solid var(--color-border)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p className="section-label">// Comparativa</p>
          <h2 className="section-title">Del modelo a la pieza real</h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
            }}
          >
            Modelos digitales vs. resultado impreso final.
          </p>
        </div>

        {/* Main layout: grid images left, video right */}
        <div className="ba-layout">
          {/* Left: 2×2 image grid */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "12px",
                border: "1px solid var(--color-border)",
                display: "inline-block",
                padding: "4px 10px",
              }}
            >
              Antes — Modelo 3D
            </p>
            <div className="ba-img-grid">
              {BEFORE_IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setSelectedImg(i === selectedImg ? null : i)}
                  className="ba-img-btn"
                  style={{
                    outline: selectedImg === i ? "2px solid var(--color-accent)" : "none",
                  }}
                  aria-label={img.label}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    width={400}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <span className="ba-img-label">{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "12px",
                border: "1px solid var(--color-accent)",
                display: "inline-block",
                padding: "4px 10px",
              }}
            >
              Después — Resultado final
            </p>
            <div
              style={{
                flex: 1,
                position: "relative",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                minHeight: "300px",
              }}
            >
              <video
                ref={videoRef}
                src={AFTER_VIDEO}
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Accent corner */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "var(--color-accent)",
                  boxShadow: "0 0 14px var(--color-accent-glow)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Lightbox for selected image */}
        {selectedImg !== null && (
          <div
            className="ba-lightbox"
            onClick={() => setSelectedImg(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada"
          >
            <div
              style={{ position: "relative", maxWidth: "80vw", maxHeight: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={BEFORE_IMAGES[selectedImg].src}
                alt={BEFORE_IMAGES[selectedImg].label}
                width={1200}
                height={900}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                  border: "1px solid var(--color-accent)",
                }}
              />
              <button
                onClick={() => setSelectedImg(null)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(0,0,0,0.8)",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                ✕ cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ba-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .ba-img-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .ba-img-btn {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: transparent;
          padding: 0;
          cursor: zoom-in;
          transition: border-color 0.2s, transform 0.2s;
        }
        .ba-img-btn:hover {
          border-color: var(--color-accent);
          transform: scale(1.01);
        }
        .ba-img-label {
          position: absolute;
          bottom: 6px;
          left: 6px;
          background: rgba(0,0,0,0.75);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-muted);
          padding: 3px 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--color-border);
          pointer-events: none;
        }
        .ba-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
        }
        @media (max-width: 768px) {
          .ba-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
