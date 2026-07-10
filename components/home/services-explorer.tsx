"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { UnderlineLink } from "@/components/ui/underline-link";
import { DesignedVisual } from "@/components/services/designed-visual";
import { SERVICES, type ServiceMedia } from "@/lib/services";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PanelMedia({
  media,
  active,
  load,
}: {
  media: ServiceMedia;
  active: boolean;
  load: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  if (media.type === "designed") {
    return <DesignedVisual variant={media.variant} />;
  }

  if (media.type === "image") {
    return load ? (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 560px"
        quality={70}
        className="img-grade object-cover"
      />
    ) : null;
  }

  return load ? (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={`/hero/${media.base}-poster.jpg`}
      aria-label={media.alt}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={`/hero/${media.base}.webm`} type="video/webm" />
      <source src={`/hero/${media.base}.mp4`} type="video/mp4" />
    </video>
  ) : null;
}

/** Desktop: numbered rows whose hover/focus drives a large anchored media
 *  panel. Touch/mobile: rows expand in place. One interaction, two bodies.
 *  `detailed` (used on /services) adds key deliverables inline per row. */
export function ServicesExplorer({ detailed = false }: { detailed?: boolean }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [panelSeen, setPanelSeen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lazy-load panel media only once the section approaches the viewport.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPanelSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={panelRef} className="lg:grid lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
      {/* ——— rows ——— */}
      <div className="border-b border-[var(--hairline)]">
        {SERVICES.map((s, i) => (
          <div key={s.slug} className="rule">
            {/* Desktop row: link + hover/focus drives the panel */}
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "group hidden grid-cols-[3.5rem_1fr_auto] items-baseline gap-6 py-8 lg:grid",
                active === i ? "text-paper" : "text-mist"
              )}
            >
              <span
                className={cn(
                  "font-mono text-caption tracking-[0.18em] transition-colors duration-fast ease-expo",
                  active === i ? "text-gold" : "text-smoke"
                )}
              >
                {s.index}
              </span>
              <span>
                <span
                  className={cn(
                    "type-display block text-display-sm transition-transform duration-base ease-expo",
                    active === i && "translate-x-2"
                  )}
                >
                  {s.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block max-w-[44ch] text-sm transition-colors duration-base ease-expo",
                    active === i ? "text-mist" : "text-smoke"
                  )}
                >
                  {s.line}
                </span>
                {detailed && (
                  <span className="mt-3 block font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                    {s.deliverables.slice(0, 3).join(" · ")}
                  </span>
                )}
              </span>
              <ArrowUpRight
                size={18}
                aria-hidden
                className={cn(
                  "translate-y-1 transition-all duration-base ease-expo",
                  active === i ? "translate-y-0 text-paper opacity-100" : "text-smoke opacity-0"
                )}
              />
            </Link>

            {/* Touch/mobile row: accordion */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-caption tracking-[0.18em]",
                    open === i ? "text-gold" : "text-smoke"
                  )}
                >
                  {s.index}
                </span>
                <span className="type-display text-display-sm text-paper">{s.title}</span>
                <Plus
                  size={18}
                  aria-hidden
                  className={cn(
                    "translate-y-1 text-smoke transition-transform duration-base ease-expo",
                    open === i && "rotate-45 text-gold"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <m.div
                    initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <AccordionMedia media={s.media} />
                      </div>
                      <p className="mt-4 text-body text-mist">{s.line}</p>
                      <div className="mt-4">
                        <UnderlineLink href={`/services/${s.slug}`}>
                          View service
                        </UnderlineLink>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* ——— desktop media panel: anchored, crossfading ——— */}
      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/3] overflow-hidden bg-coal">
            {SERVICES.map((s, i) => (
              <div
                key={s.slug}
                aria-hidden={active !== i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-base ease-expo",
                  active === i ? "opacity-100" : "opacity-0"
                )}
              >
                <PanelMedia media={s.media} active={active === i} load={panelSeen} />
              </div>
            ))}
          </div>
          <p
            aria-live="polite"
            className="mt-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke"
          >
            {SERVICES[active].index} · {SERVICES[active].title}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Mobile accordion media: static graded image (poster frame for videos),
 *  or the designed visual, which is weightless SVG. */
function AccordionMedia({ media }: { media: ServiceMedia }) {
  if (media.type === "designed") {
    return <DesignedVisual variant={media.variant} />;
  }
  const src = media.type === "image" ? media.src : `/hero/${media.base}-poster.jpg`;
  return (
    <Image
      src={src}
      alt={media.alt}
      fill
      sizes="100vw"
      quality={65}
      loading="lazy"
      className="img-grade object-cover"
    />
  );
}
