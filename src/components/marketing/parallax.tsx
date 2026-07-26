"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

// Offsets its children vertically by a fraction of how far they are from
// screen-center, read fresh every frame via getBoundingClientRect — this
// stays correct regardless of whether Lenis or native scrolling is driving
// the page, since Lenis animates the real scroll position rather than
// faking it with a transform. Meant for decorative background elements
// (aria-hidden glows/patterns), not content.
export function Parallax({ speed = 0.15, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    function tick() {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
