"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

interface Project {
  id: string;
  name: string;
  dateStr: string;
  images: GalleryItem[];
}

const projectsData: Project[] = [
  {
    id: "proj-1",
    name: "Lámpara Modelo Alpha",
    dateStr: "Agosto 19, 2025",
    images: [
      { src: "/renders/IMG-20250819-WA0003.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.1" },
      { src: "/renders/IMG-20250819-WA0004.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.2" },
      { src: "/renders/IMG-20250819-WA0005.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.3" },
      { src: "/renders/IMG-20250819-WA0006.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.4" },
      { src: "/renders/IMG-20250819-WA0007.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.5" },
      { src: "/renders/IMG-20250819-WA0008.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.6" },
      { src: "/renders/IMG-20250819-WA0009.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.7" },
      { src: "/renders/IMG-20250819-WA0010.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.8" },
      { src: "/renders/IMG-20250819-WA0011.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.9" },
      { src: "/renders/IMG-20250819-WA0012.jpg", alt: "Render Arquitectura", width: 800, height: 600, caption: "AU.10" },
    ]
  },
  {
    id: "proj-2",
    name: "Lámpara Modelo Beta",
    dateStr: "Agosto 24, 2025",
    images: [
      { src: "/renders/IMG-20250824-WA0003.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.1" },
      { src: "/renders/IMG-20250824-WA0004.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.2" },
      { src: "/renders/IMG-20250824-WA0005.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.3" },
      { src: "/renders/IMG-20250824-WA0006.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.4" },
      { src: "/renders/IMG-20250824-WA0007.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.5" },
      { src: "/renders/IMG-20250824-WA0008.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.6" },
      { src: "/renders/IMG-20250824-WA0009.jpg", alt: "Render Industrial", width: 800, height: 600, caption: "AU.7" },
    ]
  },
  {
    id: "proj-3",
    name: "Lámpara Abstracta",
    dateStr: "Diciembre 2, 2025",
    images: [
      { src: "/renders/IMG-20251202-WA0002.jpg", alt: "Render Mecánico", width: 800, height: 600, caption: "AU.1" },
      { src: "/renders/IMG-20251202-WA0003.jpg", alt: "Render Mecánico", width: 800, height: 600, caption: "AU.2" },
      { src: "/renders/IMG-20251202-WA0004.jpg", alt: "Render Mecánico", width: 800, height: 600, caption: "AU.3" },
      { src: "/renders/IMG-20251202-WA0005.jpg", alt: "Render Mecánico", width: 800, height: 600, caption: "AU.4" },
      { src: "/renders/IMG-20251202-WA0007.jpg", alt: "Render Mecánico", width: 800, height: 600, caption: "AU.5" },
    ]
  },
  {
    id: "proj-4",
    name: "Pieza Industrial",
    dateStr: "Marzo 8, 2026",
    images: [
      { src: "/renders/IMG-20260308-WA0003.jpg", alt: "Render Coleccionable", width: 800, height: 600, caption: "AU.1" },
    ]
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const currentItems = activeTab === "todas" 
    ? projectsData.flatMap(p => p.images)
    : projectsData.find(p => p.id === activeTab)?.images || [];

  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const prev = useCallback(() => {
    if (!currentItems.length) return;
    setLightboxIndex((i) => (i - 1 + currentItems.length) % currentItems.length);
  }, [currentItems]);

  const next = useCallback(() => {
    if (!currentItems.length) return;
    setLightboxIndex((i) => (i + 1) % currentItems.length);
  }, [currentItems]);

  // Sync state with index bounds
  useEffect(() => {
    if (lightboxImage !== null && currentItems[lightboxIndex]) {
       setLightboxImage(currentItems[lightboxIndex].src);
    }
  }, [lightboxIndex, currentItems, lightboxImage]);

  useEffect(() => {
    if (lightboxImage === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxImage, closeLightbox, prev, next]);

  return (
    <section
      id="gallery"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <p className="section-label">// Galería</p>
            <h2 className="section-title">Nuestros Proyectos en Renders</h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
              }}
            >
              Imágenes referenciales de piezas fabricadas por nuestro equipo.
            </p>
          </div>
          
          {/* Tabs Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
             <button 
                onClick={() => setActiveTab("todas")}
                className={`nothing-btn ${activeTab === "todas" ? "nothing-btn--accent" : ""}`}
             >
                TODAS
             </button>
             {projectsData.map(proj => (
                <button 
                  key={proj.id}
                  onClick={() => setActiveTab(proj.id)}
                  className={`nothing-btn ${activeTab === proj.id ? "nothing-btn--accent" : ""}`}
                >
                  {proj.name}
                </button>
             ))}
          </div>
        </div>

        {/* CSS Masonry Grid */}
        <div
          style={{
            columns: "3",
            columnGap: "1px",
          }}
          className="gallery-masonry"
        >
          {currentItems.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              onClick={() => openLightbox(item.src, i)}
              aria-label={`Ver imagen: ${item.alt}`}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "1px",
                padding: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                breakInside: "avoid",
              }}
              className="gallery-thumb"
            >
              {/* Force image cover so varying heights look okay in masonry without screaming warnings */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "grayscale(10%)",
                  transition: "filter 0.2s ease",
                  objectFit: "cover"
                }}
              />
              <span
                className="gallery-overlay"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "block",
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.6) 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                  opacity: 0.2,
                  transition: "opacity 0.2s ease",
                }}
              />
              <span
                className="gallery-caption"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.95))",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.05em",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                }}
              >
                {item.caption.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <dialog
          open
          aria-label="Visor de imagen"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            background: "rgba(0,0,0,0.92)",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            flexDirection: "column",
            gap: "16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              padding: "8px 12px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {/* Nav Prev */}
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "1.25rem",
              padding: "12px 16px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ←
          </button>

          {/* Image */}
          <div style={{ maxWidth: "80vw", maxHeight: "70vh", position: "relative" }}>
            <img
              src={lightboxImage}
              alt="Vista detallada"
              style={{
                maxWidth: "80vw",
                maxHeight: "70vh",
                width: "auto",
                height: "auto",
                display: "block",
                border: "1px solid var(--color-border)",
                objectFit: "contain"
              }}
            />
          </div>

          {/* Caption */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--color-accent)",
              textAlign: "center",
              letterSpacing: "0.1em",
              background: "rgba(0,0,0,0.5)",
              padding: "4px 16px"
            }}
          >
            {currentItems[lightboxIndex]?.caption.toUpperCase()}
            <span
              style={{ marginLeft: "16px", color: "var(--color-muted)" }}
            >
              [ {lightboxIndex + 1} / {currentItems.length} ]
            </span>
          </p>

          {/* Nav Next */}
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "1.25rem",
              padding: "12px 16px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            →
          </button>
        </dialog>
      )}

      <style>{`
        @media (max-width: 768px) {
          .gallery-masonry { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          .gallery-masonry { columns: 1 !important; }
        }
        .gallery-thumb:hover .gallery-overlay { opacity: 0.05 !important; }
        .gallery-thumb:hover .gallery-caption { opacity: 1 !important; transform: translateY(0); }
        .gallery-thumb:hover img { filter: grayscale(0%) !important; }
        .gallery-thumb:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
