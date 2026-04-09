"use client";
import { useThemeStore } from "@/store/useThemeStore";

export default function SlicerToggle() {
  const { slicerMode, toggleSlicer } = useThemeStore();

  return (
    <button
      onClick={toggleSlicer}
      className={`nothing-btn ${slicerMode ? "nothing-btn--accent" : ""}`}
      style={{
        position: "fixed",
        top: "96px",
        right: "32px",
        zIndex: 9980,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
      aria-label="Toggle Slicer Mode"
    >
      [ {slicerMode ? "G-CODE: ON" : "G-CODE: OFF"} ]
    </button>
  );
}
