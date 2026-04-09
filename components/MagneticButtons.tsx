"use client";

import { useEffect } from "react";

export default function MagneticButtons() {
  useEffect(() => {
    const STRENGTH = 0.38;

    function attach(el: HTMLElement) {
      let isOver = false;

      function onMove(e: MouseEvent) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * STRENGTH;
        const dy = (e.clientY - cy) * STRENGTH;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = "transform 0.1s ease";
      }

      function onEnter(e: MouseEvent) {
        isOver = true;
        onMove(e);
      }

      function onLeave() {
        isOver = false;
        el.style.transform = "translate(0px, 0px)";
        el.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      }

      el.addEventListener("mouseenter", onEnter as EventListener);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter as EventListener);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }

    // Attach to all buttons now and whenever the DOM changes
    const cleanups: (() => void)[] = [];

    function attachAll() {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
      document
        .querySelectorAll<HTMLElement>(".nothing-btn")
        .forEach((el) => cleanups.push(attach(el)));
    }

    attachAll();

    const observer = new MutationObserver(attachAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
