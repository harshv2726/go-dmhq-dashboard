"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Drives the whole page's scroll through Lenis for the eased, weighty feel
// instead of the browser's default instant wheel scroll. Renders nothing —
// mounting/unmounting (e.g. navigating to another page) starts and tears
// down the rAF loop and event listeners cleanly. Skipped entirely under
// prefers-reduced-motion, same as every other animation on this page.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
