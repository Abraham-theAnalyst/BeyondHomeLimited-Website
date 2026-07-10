"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ImageReveal } from "@/components/motion/image-reveal";
import { connectionConstrained } from "@/components/ui/hero-video";
import type { WorkMedia } from "@/lib/work";
import { cn } from "@/lib/utils";

/**
 * Muted looping clip that plays only while on screen and while the tab is
 * visible. Poster-first with a fade once actually playing; data-saver and
 * 2G connections (and reduced motion, and any load failure) keep the
 * poster instead.
 */
export function VideoBlock({
  base,
  alt,
  className,
}: {
  base: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [posterOnly] = useState(
    () => typeof navigator !== "undefined" && connectionConstrained()
  );
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce || posterOnly) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !document.hidden) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    const onVis = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, posterOnly]);

  if (reduce || posterOnly || failed) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/hero/${base}-poster.jpg`}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/hero/${base}-poster.jpg`}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        {...{ "webkit-playsinline": "true" }}
        preload="none"
        poster={`/hero/${base}-poster.jpg`}
        onPlaying={() => setPlaying(true)}
        onError={() => setFailed(true)}
        aria-label={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-in-out",
          playing ? "opacity-100" : "opacity-0"
        )}
      >
        <source src={`/hero/${base}.webm`} type="video/webm" />
        <source src={`/hero/${base}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

/**
 * Renders a WorkMedia item at a size its source can support:
 * wide sources may go full width, mid sources stay contained, small
 * sources sit as insets on a coal field and are never enlarged.
 */
export function WorkMediaBlock({
  media,
  wide = false,
  className,
}: {
  media: WorkMedia;
  /** allow full-container width (only honored for sources ≥1100px) */
  wide?: boolean;
  className?: string;
}) {
  const ratio = `${media.w} / ${media.h}`;

  if (media.type === "video") {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ aspectRatio: "832 / 464" }}
      >
        <VideoBlock base={media.base} alt={media.alt} className="absolute inset-0" />
      </div>
    );
  }

  // Small source: inset composition, capped at natural size
  if (media.w < 500) {
    return (
      <div className={cn("flex items-center justify-center bg-coal p-10 md:p-16", className)}>
        <div
          className="relative w-full"
          style={{ maxWidth: media.w, aspectRatio: ratio }}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={`${media.w}px`}
            className="img-grade object-cover"
          />
        </div>
      </div>
    );
  }

  const isWide = wide && media.w >= 1100;
  const cap = isWide ? undefined : Math.round(media.w * 1.3);
  return (
    <ImageReveal
      src={media.src}
      alt={media.alt}
      sizes={cap ? `(max-width: 768px) 100vw, ${cap}px` : "100vw"}
      className={cn("w-full", className)}
      // wide media takes the caller's aspect class; contained media keeps
      // its natural ratio and never exceeds 1.3x source width
      style={{ aspectRatio: isWide ? undefined : ratio, maxWidth: cap }}
    />
  );
}
