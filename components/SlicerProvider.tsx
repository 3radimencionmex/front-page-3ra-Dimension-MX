"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export default function SlicerProvider({ children }: { children: React.ReactNode }) {
  const slicerMode = useThemeStore((state) => state.slicerMode);

  useEffect(() => {
    if (slicerMode) {
      document.body.classList.add("slicer-mode");
    } else {
      document.body.classList.remove("slicer-mode");
    }
  }, [slicerMode]);

  return <>{children}</>;
}
