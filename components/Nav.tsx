"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#services", label: "Servicios" },
  { href: "#materials", label: "Materiales" },
  { href: "#process", label: "Proceso" },
  { href: "#gallery", label: "Galería" },
  { href: "#contact", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            color: "var(--color-text)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          aria-label="3radimension Mexico — inicio"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <style>{`
              @keyframes tesseract-spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
              .tess-outer { animation: tesseract-spin 12s linear infinite; transform-origin: 11px 11px; }
              .tess-inner { animation: tesseract-spin 8s linear infinite reverse; transform-origin: 11px 11px; }
            `}</style>
            {/* Outer cube */}
            <rect className="tess-outer" x="2" y="2" width="18" height="18" stroke="var(--color-accent)" strokeWidth="1.2" filter="url(#glow)" />
            {/* Inner cube */}
            <rect className="tess-inner" x="6.5" y="6.5" width="9" height="9" stroke="var(--color-accent)" strokeWidth="1" opacity="0.75" />
            {/* Corner connectors */}
            <line x1="2" y1="2" x2="6.5" y2="6.5" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
            <line x1="20" y1="2" x2="15.5" y2="6.5" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
            <line x1="2" y1="20" x2="6.5" y2="15.5" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
            <line x1="20" y1="20" x2="15.5" y2="15.5" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.5" />
            <defs>
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
          3RADIMENSION
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "32px",
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.15s ease",
                }}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nothing-btn" style={{ padding: "6px 14px", fontSize: "0.7rem" }}>
              Cotizar →
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            padding: "6px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            cursor: "pointer",
            display: "none",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-base)",
            borderTop: "1px solid var(--color-border)",
            padding: "16px 24px 24px",
          }}
          className="nav-mobile-menu"
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1px" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    letterSpacing: "0.1em",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--color-border)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: var(--color-text) !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
