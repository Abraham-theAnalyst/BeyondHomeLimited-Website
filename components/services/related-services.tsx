"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DesignedVisual } from "@/components/services/designed-visual";
import { getService } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Two cross-links as index rows with a small media reveal on desktop
 * hover/focus. Touch gets the full-area row without the floating media.
 */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const services = slugs.map(getService).filter(Boolean);

  return (
    <div className="relative border-b border-[var(--hairline)]">
      {services.map((s, i) => {
        if (!s) return null;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="rule group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[5rem_1fr_auto]"
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
              <span className="type-display block text-display-sm text-paper transition-transform duration-base ease-expo group-hover:translate-x-2">
                {s.title}
              </span>
              <span className="mt-1 block max-w-[52ch] text-sm text-smoke">{s.line}</span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden
              className={cn(
                "translate-y-1 transition-all duration-base ease-expo",
                active === i ? "translate-y-0 text-gold opacity-100" : "text-smoke opacity-0"
              )}
            />
          </Link>
        );
      })}

      {/* floating media peek, desktop pointers only */}
      <AnimatePresence>
        {active !== null && services[active] && (
          <m.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-8 top-1/2 z-10 hidden w-64 -translate-y-1/2 lg:block"
            aria-hidden
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--hairline)]">
              {services[active].media.type === "designed" ? (
                <DesignedVisual variant={services[active].media.variant} />
              ) : (
                <Image
                  src={
                    services[active].media.type === "image"
                      ? services[active].media.src
                      : `/hero/${services[active].media.base}-poster.jpg`
                  }
                  alt=""
                  fill
                  sizes="256px"
                  quality={60}
                  className="img-grade object-cover"
                />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
