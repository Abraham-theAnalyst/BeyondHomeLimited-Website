"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed media block with slow parallax drift on scroll.
 * The image is oversized ~14% and translated within a clipped frame, so
 * transform is the only animated property. Parallax stands down entirely
 * under prefers-reduced-m. The dark grade is built in.
 */
export function MediaBlock({
  src,
  alt,
  caption,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={ref}
        className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]"
      >
        <m.div
          style={reduce ? undefined : { y }}
          className="absolute -inset-y-[8%] inset-x-0 will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            fetchPriority={priority ? "high" : "low"}
            quality={60}
            sizes="100vw"
            className="img-grade object-cover"
          />
        </m.div>
      </div>
      {caption && (
        <figcaption className="container-site mt-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
