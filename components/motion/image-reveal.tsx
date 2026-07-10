"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Image reveal on scroll into view: the frame wipes open upward while the
 * image itself settles from a slight over-scale. Transform/clip-path only,
 * triggered by observing the wrapper so clipping can't starve the observer.
 */
export function ImageReveal({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  grade = true,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Apply the house dark grade (on by default; sources vary in quality). */
  grade?: boolean;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shown = reduce || inView;

  return (
    <div ref={ref} style={style} className={cn("relative overflow-hidden", className)}>
      <m.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={shown ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <m.div
          className="absolute inset-0 will-change-transform"
          initial={reduce ? false : { scale: 1.14 }}
          animate={shown ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={cn("object-cover", grade && "img-grade")}
          />
        </m.div>
      </m.div>
    </div>
  );
}
