"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Minimal Nigeria coverage map: one simplified hand-drawn path, gold city
 * markers, tooltip on hover/tap/focus. Pure SVG + positioned buttons —
 * no map library, no external data, city names and formats only.
 */

type City = {
  name: string;
  formats: string;
  /** percentage position within the map frame */
  x: number;
  y: number;
};

const CITIES: City[] = [
  { name: "Lagos", formats: "HQ · billboards, transit, retail signage, interiors", x: 8, y: 74 },
  { name: "Ibadan", formats: "Billboards, transit", x: 13, y: 64 },
  { name: "Abuja", formats: "Building wraps, billboards", x: 41, y: 48 },
  { name: "Port Harcourt", formats: "Billboards, retail signage", x: 38, y: 90 },
];

// Simplified Nigeria silhouette (hand-traced, ~20 points)
const NIGERIA_PATH =
  "M23 274 L0 180 L30 83 L60 11 L243 25 L363 14 L397 65 L383 144 L350 162 L337 194 L303 248 L287 270 L260 248 L237 349 L187 342 L137 353 L90 313 L57 284 Z";

export function CoverageMap() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-24">
      {/* map */}
      <div className="relative mx-auto w-full max-w-md">
        <svg
          viewBox="0 0 400 360"
          data-designed
          role="img"
          aria-label="Simplified map of Nigeria with Beyond Home coverage cities"
          className="block w-full"
        >
          <path
            d={NIGERIA_PATH}
            fill="var(--color-coal)"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
        </svg>
        {CITIES.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            aria-expanded={open === i}
            aria-label={`${c.name} — ${c.formats}`}
            className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span
              className={cn(
                "relative block h-2 w-2 rounded-full transition-colors duration-fast ease-expo",
                open === i ? "bg-gold" : "bg-smoke"
              )}
            >
              {!reduce && open === i && (
                <m.span
                  className="absolute inset-0 rounded-full bg-gold"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </span>
          </button>
        ))}

        {/* tooltip */}
        <AnimatePresence>
          {open !== null && (
            <m.div
              key={open}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute z-10 max-w-56 border border-[var(--hairline)] bg-ink/95 p-4 backdrop-blur-sm"
              style={{
                left: `${Math.min(CITIES[open].x + 4, 55)}%`,
                top: `${Math.max(CITIES[open].y - 14, 2)}%`,
              }}
            >
              <p className="type-display text-display-sm text-paper">{CITIES[open].name}</p>
              <p className="mt-1 text-sm text-smoke">{CITIES[open].formats}</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* copy + index */}
      <div>
        <p className="max-w-[50ch] text-body-lg leading-relaxed text-mist">
          Campaigns are planned from Lagos and mounted wherever the audience
          is. These are the cities the documented work sits in; the reach map
          grows with every brief.
        </p>
        <ul className="mt-10">
          {CITIES.map((c, i) => (
            <li key={c.name}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                className={cn(
                  "rule grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4 text-left transition-colors duration-fast ease-expo",
                  open === i ? "text-paper" : "text-smoke hover:text-mist"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-caption tracking-[0.18em]",
                    open === i ? "text-gold" : "text-smoke"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="type-display block text-display-sm">{c.name}</span>
                  <span
                    className={cn(
                      "block overflow-hidden text-sm text-smoke transition-all duration-base ease-expo",
                      open === i ? "mt-1 max-h-10 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {c.formats}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
