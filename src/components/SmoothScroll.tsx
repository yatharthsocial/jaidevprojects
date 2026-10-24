"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

// Eased, momentum-style page scrolling. Pauses while the page is locked
// (the hero holds the page still during its intro).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1 });
    const root = document.documentElement;
    let frame = 0;
    const raf = (time: number) => {
      if (root.style.overflow === "hidden") lenis.stop();
      else lenis.start();
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
