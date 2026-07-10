"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { HeroVideo } from "@/components/ui/hero-video";
import { cn } from "@/lib/utils";

/**
 * Full-bleed cinematic opener. The poster is the LCP and paints first
 * (art-directed 4:5 crop on phones so the video fades in without a jump);
 * HeroVideo enhances progressively on every width — poster-first,
 * connection-aware, paused off-screen, reduced-motion silent.
 */
export function CinematicOpener({
  base,
  posterAlt,
  children,
  className,
}: {
  /** /hero/<base>.webm|.mp4|-poster.jpg (+ -m mobile encode set) */
  base: string;
  posterAlt: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[72svh] flex-col justify-end overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0">
        {/* poster: full frame on desktop, matching 4:5 crop on phones */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={`/hero/${base}-m-poster.jpg`}
            alt={posterAlt}
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={`/hero/${base}-poster.jpg`}
            alt={posterAlt}
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="img-grade object-cover"
          />
        </div>
        <HeroVideo base={base} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.85) 85%, #0a0a0a 100%)",
          }}
        />
      </div>
      <div className="container-site relative z-10 pb-14 pt-40 md:pb-16">
        {children}
      </div>
    </section>
  );
}
