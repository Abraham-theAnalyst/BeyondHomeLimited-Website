"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { WorkMediaBlock } from "@/components/work/media";
import { SERVICES } from "@/lib/services";
import { GALLERY } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Selected Work: the lighter gallery under the case studies. Editorial
 * composition — spans follow each source's shape and size (wide, portrait,
 * inset) so nothing reads as a uniform thumbnail grid. Same service-tag
 * filtering language as the case studies above it.
 */
export function SelectedWork() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  const chips = useMemo(() => {
    const present = new Set(GALLERY.flatMap((g) => g.services));
    return SERVICES.filter((s) => present.has(s.slug));
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? GALLERY : GALLERY.filter((g) => g.services.includes(filter))),
    [filter]
  );

  // span pattern by media shape: wide sources stretch, portraits stand,
  // small sources sit as insets
  const spanFor = (w: number, h: number) => {
    if (w >= 1100) return "md:col-span-8";
    if (h > w * 1.4) return "md:col-span-4 md:row-span-2";
    if (w < 500) return "md:col-span-4";
    return "md:col-span-6";
  };

  return (
    <div>
      <div className="rule scrollbar-none -mx-6 flex snap-x items-baseline gap-7 overflow-x-auto px-6 pt-6 md:mx-0 md:px-0">
        {[{ slug: "all", title: "All" }, ...chips].map((c) => (
          <button
            key={c.slug}
            onClick={() => setFilter(c.slug)}
            aria-pressed={filter === c.slug}
            className={cn(
              "shrink-0 snap-start whitespace-nowrap py-2 font-mono text-caption uppercase tracking-[0.18em] transition-colors duration-fast ease-expo",
              filter === c.slug ? "text-gold" : "text-smoke hover:text-mist"
            )}
          >
            {c.title}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-caption tracking-[0.18em] text-smoke">
        {visible.length} of {GALLERY.length} pieces
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={filter}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-20"
        >
          {visible.map((g) => (
            <figure key={g.id} className={cn("min-w-0", spanFor(g.media.w, g.media.h))}>
              <WorkMediaBlock media={g.media} wide={g.media.w >= 1100} className={g.media.w >= 1100 ? "aspect-[16/9]" : undefined} />
              <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="max-w-[52ch] text-sm text-mist">{g.caption}</span>
                <span className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                  {SERVICES.filter((s) => g.services.includes(s.slug))
                    .map((s) => s.title)
                    .join(" · ")}
                </span>
              </figcaption>
            </figure>
          ))}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
