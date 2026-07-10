"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Staggered line-by-line reveal: each line rises out of an overflow mask.
 * The in-view trigger observes the (visible) wrapper, not the masked line,
 * so the observer can actually see it. Under prefers-reduced-motion the
 * lines render in place, no animation.
 */
export function MaskedReveal({
  lines,
  delay = 0,
  className,
  onMount = false,
}: {
  lines: ReactNode[];
  delay?: number;
  className?: string;
  /** Animate immediately on mount (above-the-fold content) instead of on scroll into view. */
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useInView(ref, { once: true, amount: 0.4 });
  const inView = onMount || observed;

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <m.span
            className="block will-change-transform"
            initial={reduce ? false : { y: "115%" }}
            animate={reduce || inView ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}
