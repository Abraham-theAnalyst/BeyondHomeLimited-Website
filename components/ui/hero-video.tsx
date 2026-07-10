"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/** True when the visitor asked us not to spend their data. */
export function connectionConstrained(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!conn) return false;
  return !!conn.saveData || conn.effectiveType === "2g" || conn.effectiveType === "slow-2g";
}

/**
 * Progressive-enhancement hero video. The poster underneath is the LCP
 * and paints first; this component contributes nothing until the page has
 * loaded AND the element is in view, then fades the clip in over the
 * poster once it is actually playing. Phones get the lightweight 4:5
 * mobile encode, never the desktop file. Data-saver, 2G, reduced motion,
 * and any load failure all silently keep the poster. Playback pauses
 * off-screen and on tab blur.
 */
export function HeroVideo({
  base,
  mobileBase,
  className,
}: {
  /** /hero/<base>.webm|.mp4 — desktop encode */
  base: string;
  /** /hero/<mobileBase>.webm|.mp4 — 4:5 mobile encode (defaults to `${base}-m`) */
  mobileBase?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false); // page loaded + in view once
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Arm only after the load event, so the clip never competes with LCP.
  useEffect(() => {
    if (reduce || connectionConstrained()) return;
    let io: IntersectionObserver | undefined;
    const el = ref.current;
    const watch = () => {
      if (!el) return;
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setArmed(true);
            io?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      io.observe(el);
    };
    if (document.readyState === "complete") watch();
    else window.addEventListener("load", watch, { once: true });
    return () => {
      window.removeEventListener("load", watch);
      io?.disconnect();
    };
  }, [reduce]);

  // Sources appear after mount, so kick the element once they exist.
  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || isDesktop === null) return;
    el.load();
    el.play().catch(() => {});
  }, [armed, isDesktop]);

  // Pause off-screen and on tab blur; resume when back.
  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !document.hidden) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    const onVis = () => {
      if (document.hidden) el.pause();
      else el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [armed]);

  if (reduce || failed) return null;

  const src = isDesktop === false ? (mobileBase ?? `${base}-m`) : base;

  return (
    <video
      ref={ref}
      muted
      loop
      autoPlay
      playsInline
      {...{ "webkit-playsinline": "true" }}
      preload="none"
      onPlaying={() => setPlaying(true)}
      // WebKit ignores the autoplay attribute for sources attached after
      // mount and will not retry a rejected early play(); kick it when ready
      onCanPlay={(e) => {
        if (!document.hidden) e.currentTarget.play().catch(() => {});
      }}
      onError={() => setFailed(true)}
      onStalled={() => setPlaying(false)}
      aria-hidden
      tabIndex={-1}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-in-out",
        playing ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* sources attach only once armed and the width is known,
          so phones never touch the desktop file */}
      {armed && isDesktop !== null && (
        <>
          <source src={`/hero/${src}.mp4`} type="video/mp4" />
          <source src={`/hero/${src}.webm`} type="video/webm" />
        </>
      )}
    </video>
  );
}
