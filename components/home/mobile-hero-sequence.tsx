"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { connectionConstrained } from "@/components/ui/hero-video";
import { cn } from "@/lib/utils";

/**
 * The homepage hero sequence for phones. Same chapters as desktop, loaded
 * one step ahead of playback: clip 1 starts once the page has loaded and
 * the poster has painted; clip N+1 only begins downloading after clip N
 * is playing. Chapters crossfade with the existing motion tokens.
 *
 * Safety valves: data-saver / 2g / any stall or error locks the sequence
 * to looping clip 1 (or the poster if clip 1 itself failed); reduced
 * motion renders nothing so the static poster stays. Playback pauses
 * off-screen and on tab blur.
 */
const CLIPS = [
  "night-roundabout-m",
  "orijin-led-night-m",
  "fmn-wrap-drone-m",
  "indoor-walkthrough", // already portrait and lightweight
];

export function MobileHeroSequence() {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(1); // how many clips may have sources
  const [visible, setVisible] = useState(false);
  const [lockToFirst, setLockToFirst] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [constrained] = useState(
    () => typeof navigator !== "undefined" && connectionConstrained()
  );

  // Arm after the load event + first view, so nothing competes with LCP.
  useEffect(() => {
    if (reduce) return;
    let io: IntersectionObserver | undefined;
    const el = wrapRef.current;
    const watch = () => {
      if (!el) return;
      io = new IntersectionObserver(
        (entries) => {
          setVisible(entries[0].isIntersecting);
          if (entries[0].isIntersecting) setArmed(true);
        },
        { threshold: 0.15 }
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

  const sequence = !constrained && !lockToFirst;

  // Play/pause with visibility (viewport + tab).
  const sync = useCallback(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && visible && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, visible]);

  useEffect(() => {
    if (!armed) return;
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [armed, sync]);

  const clipCount = sequence ? CLIPS.length : 1;

  // Sources attach after mount; kick load() for newly-permitted clips.
  useEffect(() => {
    if (!armed) return;
    refs.current.forEach((v, i) => {
      if (v && i < loaded && v.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        v.load();
        if (i === active) v.play().catch(() => {});
      }
    });
  }, [armed, loaded, active]);

  // A stall mid-sequence locks back to the looping first clip.
  const lock = () => {
    setLockToFirst(true);
    setActive(0);
  };

  const advance = () => {
    if (!sequence) return;
    const next = (active + 1) % clipCount;
    // only advance when the next clip's element has enough data
    const nv = refs.current[next];
    if (nv && nv.readyState >= 3) {
      setActive(next);
      setLoaded((n) => Math.max(n, Math.min(next + 2, CLIPS.length)));
    } else {
      // next not ready: replay current, try again at its end
      refs.current[active]?.play().catch(() => {});
    }
  };

  if (reduce) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      {CLIPS.slice(0, clipCount).map((base, i) => (
        <video
          key={base}
          ref={(el) => {
            refs.current[i] = el;
          }}
          muted
          playsInline
          {...{ "webkit-playsinline": "true" }}
          autoPlay={i === 0}
          loop={!sequence}
          // downloads are gated by <source> attachment, not preload; "auto"
          // lets the next permitted clip actually buffer before its turn
          preload="auto"
          onPlaying={() => {
            // clip N playing → allow clip N+1 to start downloading
            if (i === active) setLoaded((n) => Math.max(n, Math.min(i + 2, CLIPS.length)));
          }}
          onCanPlay={(e) => {
            if (i === active && visible && !document.hidden)
              e.currentTarget.play().catch(() => {});
          }}
          onEnded={i === active ? advance : undefined}
          onError={() => i === 0 || lock()}
          onStalled={() => i === 0 || lock()}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-in-out",
            armed && i === active ? "opacity-100" : "opacity-0"
          )}
        >
          {armed && i < loaded && (
            <>
              <source src={`/hero/${base}.mp4`} type="video/mp4" />
              <source src={`/hero/${base}.webm`} type="video/webm" />
            </>
          )}
        </video>
      ))}
    </div>
  );
}
