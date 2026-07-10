"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MaskedReveal } from "@/components/motion/masked-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
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
  { src: "/hero/fmn-wrap-aerial.jpg", alt: "Aerial view of a Golden Penny building wrap" },
  { src: "/hero/clocktower-banner.jpg", alt: "Banner campaign on a clock tower facade" },
  { src: "/hero/airport-concourse.jpg", alt: "Bank campaign across an airport concourse" },
  { src: "/hero/highway-aerial.jpg", alt: "Aerial view of a highway interchange" },
  { src: "/hero/rolex-wall.jpg", alt: "Watch campaign on an airport wall" },
  { src: "/hero/normans-corridor.jpg", alt: "Full-corridor brand takeover" },
  { src: "/hero/fmn-wrap-aerial-2.jpg", alt: "Building wrap seen from above" },
  { src: "/hero/clocktower-street.jpg", alt: "Street view of a clock tower banner" },
  { src: "/hero/harbour-wall.jpg", alt: "Harbour photograph as a wall graphic" },
  { src: "/hero/rolex-watch-wall.jpg", alt: "Oversized watch graphic beside a visitor" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const restartTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % CHAPTERS.length),
      CHAPTER_SECONDS * 1000
    );
  }, []);

  // Auto-advance chapters on desktop only; reduced motion stays on chapter 1.
  useEffect(() => {
    if (!isDesktop || reduce) return;
    restartTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isDesktop, reduce, restartTimer]);

  // Play the active clip, pause the rest.
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
        {/* Mobile and reduced motion: one static, art-directed poster */}
        <div className={cn("absolute inset-0", isDesktop && !reduce && "hidden")}>
          <Image
            src="/hero/night-roundabout-poster.jpg"
            alt="Night aerial view of a lit LED billboard on a Nigerian roundabout"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Desktop: the four-chapter reel */}
        {isDesktop &&
          !reduce &&
          CHAPTERS.map((c, i) => (
            <div
              key={c.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
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
              {/* Portrait chapter sits framed against ink, spec-sheet style */}
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

      {/* ——— top bar ——— */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <Image
          src="/assets/logo-wordmark.png"
          alt="beyondhome"
          width={150}
          height={34}
          priority
          className="h-7 w-auto md:h-8"
        />
        <p className="type-eyebrow hidden text-right sm:block">
          Ogba · Ikeja · Lagos
          <span className="block text-mist">Est. 2013</span>
        </p>
      </header>

      {/* ——— headline block ——— */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-10 md:px-12">
        <div className="max-w-[1400px]">
          <h1 className="type-display text-[clamp(2.75rem,9vw,8rem)] text-paper">
            <MaskedReveal
              onMount
              delay={0.15}
              lines={[
                <span key="l1">Your brand,</span>,
                <span key="l2">
                  forty feet <span className="text-gold">tall.</span>
                </span>,
              ]}
            />
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-mist md:text-lg">
              Beyond Home designs, prints and installs advertising that can hold a
              Nigerian street&apos;s attention: billboards, building wraps, fleets and
              interiors. From strategy to steel, one team.
            </p>
            <div className="flex items-center gap-8">
              <MagneticButton href="https://wa.me/2348060107065">Start a project</MagneticButton>
              <a href="#work" className="link-underline text-sm font-medium text-paper">
                See recent work
              </a>
            </div>
          </div>
        </div>

        {/* ——— chapter index ——— */}
        <nav
          aria-label="Hero reel chapters"
          className="rule mt-10 hidden gap-8 pt-5 md:flex"
        >
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => select(i)}
              aria-current={i === active}
              className={cn(
                "group relative pb-2 text-left font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300",
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

      {/* ——— placements film strip ——— */}
      <div className="relative z-10 overflow-hidden pb-6 pt-2 md:pb-8" aria-hidden>
        <div className="film-strip flex w-max gap-px opacity-60">
          {[...STRIP, ...STRIP].map((img, i) => (
            <div key={i} className="relative h-14 w-24 shrink-0 md:h-16 md:w-28">
              <Image
                src={img.src}
                alt=""
                fill
                sizes="112px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
