"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";


type Case = {
  id: string;
  slug: string;
  client: string;
  service: string;
  line: string;
  src: string;
  alt: string;
};

const CASES: Case[] = [
  {
    id: "W-01",
    slug: "golden-penny-abuja-wrap",
    client: "Golden Penny (FMN)",
    service: "Building wrap",
    line: "A full high-rise facade in Abuja, printed in sections and rigged by our installation crew.",
    src: "/hero/fmn-wrap-aerial.jpg",
    alt: "Aerial view of a Golden Penny campaign wrapped over a high-rise building",
  },
  {
    id: "W-02",
    slug: "the-macallan-abuja",
    client: "The Macallan",
    service: "Building wrap",
    line: "Whisky on a city block: the Crafted Without Compromise campaign, mounted above street level.",
    src: "/images/work/macallan-building-wrap.jpg",
    alt: "The Macallan campaign covering a building above a busy street",
  },
  {
    id: "W-03",
    slug: "orijin-at-every-scale",
    client: "Orijin",
    service: "Sculptural installation",
    line: "A 33cl can scaled up to tank size, fabricated and finished for outdoor display.",
    src: "/images/work/orijin-tank.jpg",
    alt: "Tank-sized Orijin can installation among palm trees",
  },
];

/**
 * Horizontal case strip: native scroll + snap (touch swipe works for free),
 * pointer-drag on desktop, arrow keys when focused, slight parallax inside
 * each frame, and a hairline progress indicator. Transform-only motion.
 */
export function CaseStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const drag = useRef<{ startX: number; startLeft: number; active: boolean }>({
    startX: 0,
    startLeft: 0,
    active: false,
  });

  // Progress + per-card parallax, driven by the track's own scroll.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    if (reduce) return;
    const mid = el.clientWidth / 2;
    el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
      const r = img.parentElement!.getBoundingClientRect();
      const delta = (r.left + r.width / 2 - mid) / el.clientWidth;
      img.style.transform = `translateX(${delta * -6}%) scale(1.12)`;
    });
  }, [reduce]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  // Desktop pointer drag (native scroll handles touch).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current!;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    trackRef.current!.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current!;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({
      left: dir * (card ? card.offsetWidth + 24 : el.clientWidth * 0.8),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Featured work gallery — use arrow keys to browse"
        tabIndex={0}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(-1);
          }
        }}
        className="scrollbar-none -mx-6 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-6 select-none active:cursor-grabbing md:-mx-12 md:px-12"
      >
        {CASES.map((c) => (
          <Link
            key={c.id}
            href={`/work/${c.slug}`}
            data-card
            draggable={false}
            className="group w-[85%] shrink-0 snap-start sm:w-[70%] lg:w-[58%]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div data-parallax className="absolute inset-0 will-change-transform">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 85vw, 58vw"
                  quality={70}
                  loading="lazy"
                  draggable={false}
                  className="img-grade object-cover"
                />
              </div>
              {/* quiet legibility band at the frame's foot */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/85 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 p-5 md:p-7">
                <div>
                  <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                    {c.id} · {c.service}
                  </p>
                  <p className="type-display mt-1 text-display-sm text-paper">{c.client}</p>
                </div>
                <ArrowUpRight
                  size={20}
                  aria-hidden
                  className="mb-1 shrink-0 text-smoke transition-all duration-base ease-expo group-hover:text-gold"
                />
              </div>
            </div>
            <p className="mt-4 max-w-[52ch] text-sm text-smoke md:text-body">{c.line}</p>
          </Link>
        ))}

        {/* end cap */}
        <Link
          href="/work"
          data-card
          draggable={false}
          className="group flex w-[60%] shrink-0 snap-start items-center justify-center border border-[var(--hairline)] sm:w-[38%] lg:w-[26%]"
        >
          <span className="type-display flex items-center gap-4 text-display-sm text-paper">
            All work
            <ArrowUpRight
              size={22}
              aria-hidden
              className="transition-transform duration-base ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </Link>
      </div>

      {/* progress */}
      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-[var(--hairline)]">
          <div
            className="absolute left-0 top-0 h-px bg-gold"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
        <p className="font-mono text-caption tracking-[0.18em] text-smoke">
          Drag · swipe · arrow keys
        </p>
      </div>
    </div>
  );
}
