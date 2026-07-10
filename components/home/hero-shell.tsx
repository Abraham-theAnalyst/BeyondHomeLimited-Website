"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { HeroVideo, connectionConstrained } from "@/components/ui/hero-video";
import { scrollToElement } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

const CHAPTER_SECONDS = 9;

type Chapter = {
  id: string;
  label: string;
  base: string; // /hero/<base>.mp4|.webm|-poster.jpg
  portrait?: boolean;
};

const CHAPTERS: Chapter[] = [
  { id: "01", label: "LED unipole, night orbit", base: "night-roundabout" },
  { id: "02", label: "Orijin LED spectacular", base: "orijin-led-night" },
  { id: "03", label: "Golden Penny building wrap", base: "fmn-wrap-drone" },
  { id: "04", label: "Branded interior", base: "indoor-walkthrough", portrait: true },
];

const STRIP: { src: string; alt: string }[] = [
  { src: "/hero/fmn-wrap-aerial.jpg", alt: "" },
  { src: "/hero/clocktower-banner.jpg", alt: "" },
  { src: "/hero/airport-concourse.jpg", alt: "" },
  { src: "/hero/highway-aerial.jpg", alt: "" },
  { src: "/hero/rolex-wall.jpg", alt: "" },
  { src: "/hero/normans-corridor.jpg", alt: "" },
  { src: "/hero/fmn-wrap-aerial-2.jpg", alt: "" },
  { src: "/hero/clocktower-street.jpg", alt: "" },
  { src: "/hero/harbour-wall.jpg", alt: "" },
  { src: "/hero/rolex-watch-wall.jpg", alt: "" },
];

/**
 * Client shell for the hero: media reel, chapter nav, scroll cue, film strip.
 * The headline/copy/CTA block arrives as SERVER-rendered children, so the
 * LCP text is never re-rendered (or repainted) by hydration.
 */
export function HeroShell({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  // Decorative film strip mounts after load so its 20 thumbnails never
  // compete with the LCP poster on a throttled connection.
  const [stripReady, setStripReady] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const arm = () => requestAnimationFrame(() => setStripReady(true));
    if (document.readyState === "complete") {
      arm();
      return;
    }
    window.addEventListener("load", arm);
    return () => window.removeEventListener("load", arm);
  }, []);

  const [constrained] = useState(() =>
    typeof navigator === "undefined" ? false : connectionConstrained()
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // battery + data: the reel pauses when the tab is hidden
  useEffect(() => {
    const onVis = () => {
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (document.hidden) v.pause();
        else if (i === active) v.play().catch(() => {});
      });
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [active]);

  const restartTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % CHAPTERS.length),
      CHAPTER_SECONDS * 1000
    );
  }, []);

  useEffect(() => {
    if (!isDesktop || reduce) return;
    restartTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isDesktop, reduce, restartTimer]);

  useEffect(() => {
    if (!isDesktop || reduce) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, isDesktop, reduce]);

  const select = (i: number) => {
    setActive(i);
    if (isDesktop && !reduce) restartTimer();
  };

  return (
    <section className="grain relative flex min-h-svh flex-col overflow-hidden bg-ink">
      {/* ——— media layer ——— */}
      <div className="absolute inset-0">
        {/* Phones: art-directed 4:5 poster paints first (LCP), the mobile
            clip fades in over it as a progressive enhancement */}
        <div className={cn("absolute inset-0", isDesktop && !reduce && "hidden")}>
          <Image
            src="/hero/night-roundabout-m-poster.jpg"
            alt="Night aerial view of a lit LED billboard on a Nigerian roundabout"
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="object-cover md:hidden"
          />
          <Image
            src="/hero/night-roundabout-poster.jpg"
            alt="Night aerial view of a lit LED billboard on a Nigerian roundabout"
            fill
            quality={55}
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          {!reduce && !isDesktop && <HeroVideo base="night-roundabout" />}
        </div>

        {/* Desktop: the four-chapter reel, poster-first, videos enhance in */}
        {isDesktop &&
          !reduce &&
          !constrained &&
          CHAPTERS.map((c, i) => (
            <div
              key={c.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-slow ease-in-out",
                i === active ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={i !== active}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                muted
                loop
                playsInline
                {...{ "webkit-playsinline": "true" }}
                preload={i === 0 ? "auto" : "none"}
                poster={`/hero/${c.base}-poster.jpg`}
                className={cn(
                  "absolute",
                  c.portrait
                    ? "left-1/2 top-1/2 h-[86%] w-auto -translate-x-1/2 -translate-y-1/2"
                    : "inset-0 h-full w-full object-cover"
                )}
              >
                <source src={`/hero/${c.base}.webm`} type="video/webm" />
                <source src={`/hero/${c.base}.mp4`} type="video/mp4" />
              </video>
              {c.portrait && <div className="absolute inset-0 bg-ink/45" />}
              {c.portrait && (
                <p className="type-eyebrow absolute right-10 top-1/2 hidden -translate-y-1/2 rotate-90 lg:block">
                  Indoor works too
                </p>
              )}
            </div>
          ))}

        {/* Legibility scrim */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.78) 78%, #0a0a0a 100%)",
          }}
        />
      </div>

      {/* ——— headline block ——— */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-10 pt-24 md:px-12">
        <div className="mx-auto w-full max-w-[var(--container-site)]">
          {children}
        </div>

        {/* ——— chapter index ——— */}
        <nav
          aria-label="Hero reel chapters"
          className="rule mx-auto mt-10 hidden w-full max-w-[var(--container-site)] gap-8 pt-5 md:flex"
        >
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => select(i)}
              aria-current={i === active}
              className={cn(
                "group relative pb-2 text-left font-mono text-caption uppercase tracking-[0.18em] transition-colors duration-fast ease-expo",
                i === active ? "text-paper" : "text-smoke hover:text-mist"
              )}
            >
              <span className={cn(i === active && "text-gold")}>{c.id}</span>
              <span className="ml-3">{c.label}</span>
              {i === active && !reduce && (
                <span
                  key={`bar-${active}`}
                  className="absolute bottom-0 left-0 h-px bg-gold"
                  style={{
                    animation: `strip-progress ${CHAPTER_SECONDS}s linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ——— scroll cue ——— */}
      <div className="relative z-10 flex justify-center pb-2">
        <button
          onClick={() => scrollToElement("#who-we-are")}
          aria-label="Scroll to the next section"
          className="group flex min-h-11 flex-col items-center gap-2 px-4"
        >
          <span className="font-mono text-caption uppercase tracking-[0.18em] text-smoke transition-colors duration-fast ease-expo group-hover:text-gold">
            Scroll
          </span>
          <span className="cue-line block h-6 w-px bg-gold" />
        </button>
      </div>

      {/* ——— placements film strip (mounts after page load) ——— */}
      <div className="relative z-10 h-[80px] overflow-hidden pb-6 pt-2 md:h-[96px] md:pb-8" aria-hidden>
        {stripReady && (
          <div className="film-strip flex w-max gap-px opacity-60">
            {[...STRIP, ...STRIP].map((img, i) => (
              <div key={i} className="relative h-14 w-24 shrink-0 md:h-16 md:w-28">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="112px"
                  quality={45}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
