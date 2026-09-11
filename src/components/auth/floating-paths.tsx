"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Decorative animated background lines for the auth split-screen panel.
// Rendered twice with opposite `position` values (see auth-split-shell.tsx)
// to fan out symmetrically from the panel's center. Each path's duration is
// randomized once via useState's lazy initializer (the sanctioned way to do
// one-time impure work at render, per react-hooks/purity) so it stays stable
// across re-renders instead of jittering every time the component updates.
export function FloatingPaths({ position }: { position: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [paths] = useState(() =>
    Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      duration: 20 + Math.random() * 10,
    })),
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-primary-foreground/40"
        fill="none"
        viewBox="-580 -420 1460 1320"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Decorative background paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeOpacity={0.1 + path.id * 0.03}
            strokeWidth={path.width}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              shouldReduceMotion
                ? { pathLength: 0.3, opacity: 0.4 }
                : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }
            }
            transition={{
              duration: path.duration,
              repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
