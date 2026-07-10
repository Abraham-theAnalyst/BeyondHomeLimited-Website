"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Bespoke, on-brand visuals for services with no photographic evidence.
 * Pure SVG + CSS animation (near-black, hairlines, restrained gold), so
 * they cost no image weight. Base states are fully drawn: the ambient
 * motion only starts once the page has loaded AND the visual is on
 * screen, so it never spends main-thread paint during page load — and
 * prefers-reduced-motion keeps it fully static.
 */
export type DesignedVariant = "plan" | "cadence";

export function DesignedVisual({
  variant,
  className,
}: {
  variant: DesignedVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const arm = () => {
      io = new IntersectionObserver(
        (entries) => setLive(entries[0].isIntersecting),
        { threshold: 0.1 }
      );
      io.observe(el);
    };
    if (document.readyState === "complete") arm();
    else {
      window.addEventListener("load", arm, { once: true });
    }
    return () => {
      window.removeEventListener("load", arm);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full bg-coal", live && "dv-anim", className)}
    >
      {variant === "plan" ? <PlanVisual /> : <CadenceVisual />}
    </div>
  );
}

/** Media Strategy & Planning: a site plan — hub, routes, placements. */
function PlanVisual() {
  const sites: [number, number][] = [
    [190, 96], [372, 64], [540, 132], [660, 78], [590, 300], [420, 224], [700, 360],
  ];
  const hub: [number, number] = [96, 380];
  return (
    <svg
      viewBox="0 0 800 460"
      data-designed
      role="img"
      aria-label="Diagram of a media plan: routes drawn from one hub to placement sites"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* survey grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={460} stroke="rgba(250,250,247,0.05)" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 92} x2={800} y2={i * 92} stroke="rgba(250,250,247,0.05)" strokeWidth="1" />
      ))}
      {/* routes: hub to each site */}
      {sites.map(([x, y], i) => (
        <path
          key={`r${i}`}
          d={`M ${hub[0]} ${hub[1]} Q ${(hub[0] + x) / 2} ${Math.min(hub[1], y) - 60} ${x} ${y}`}
          fill="none"
          stroke="rgba(138,138,133,0.55)"
          strokeWidth="1"
          strokeDasharray="5 7"
          className="dv-march"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      {/* placement sites */}
      {sites.map(([x, y], i) => (
        <g key={`s${i}`}>
          <circle cx={x} cy={y} r="4" fill="#e8a820" />
          <circle
            cx={x} cy={y} r="4" fill="none" stroke="#e8a820" strokeWidth="1"
            className="dv-pulse" style={{ animationDelay: `${i * 0.8}s` }}
          />
        </g>
      ))}
      {/* the hub */}
      <rect x={hub[0] - 6} y={hub[1] - 6} width="12" height="12" fill="#fafaf7" />
    </svg>
  );
}

/** Social Media Marketing: a posting cadence — the calendar as rhythm. */
function CadenceVisual() {
  const cols = 7;
  // fixed posting slots (row, col) — deliberate, not random
  const slots = new Set(["0-1", "0-4", "1-2", "1-5", "2-0", "2-3", "2-6", "3-1", "3-4"]);
  return (
    <svg
      viewBox="0 0 800 460"
      data-designed
      role="img"
      aria-label="Diagram of a posting calendar with a steady weekly rhythm"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1={64} y1={86} x2={736} y2={86} stroke="rgba(250,250,247,0.14)" strokeWidth="1" />
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const on = slots.has(`${r}-${c}`);
          return (
            <rect
              key={`${r}-${c}`}
              x={112 + c * 96 - 26}
              y={116 + r * 82}
              width="52"
              height="52"
              fill={on ? "#e8a820" : "rgba(250,250,247,0.06)"}
              opacity={on ? 0.65 : 1}
              className={on ? "dv-breathe" : undefined}
              style={on ? { animationDelay: `${(r * 7 + c) * 0.35}s` } : undefined}
            />
          );
        })
      )}
    </svg>
  );
}
