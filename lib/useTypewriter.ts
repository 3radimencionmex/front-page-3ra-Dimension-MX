"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 50, delay = 0): string {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    startedRef.current = false;

    const delayTimer = setTimeout(() => {
      startedRef.current = true;
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, delay]);

  return displayed;
}
