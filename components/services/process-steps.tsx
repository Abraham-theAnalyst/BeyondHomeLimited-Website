"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type ProcessStep = { n: string; title: string; body: string };

const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Examine the brand's space",
    body: "We start where the brand already lives: its sites, its stores, its competitors, and the routes its audience travels every day.",
  },
  {
    n: "02",
    title: "Analyse objectives",
    body: "Objectives get costed against real options. Formats, locations, timing and budget go on one sheet, and the sheet has to add up.",
  },
  {
    n: "03",
    title: "Create & execute",
    body: "Design, production and installation run under one roof, so the thing that was approved is the thing that goes up.",
  },
  {
    n: "04",
    title: "Evaluate & iterate",
    body: "We check the work in the field, report what happened in plain language, and fold the findings into the next round.",
  },
];

/**
 * The four-step working sequence, shared by all service pages.
 * Click or hover a step to open it; keyboard and touch get the same
 * interaction; reduced motion swaps the height animation for a fade.
 */
export function ProcessSteps({
  note,
  steps = STEPS,
  large = false,
}: {
  note?: string;
  /** Override the default four service steps (About uses six). */
  steps?: ProcessStep[];
  /** Scale up titles for full-page editorial use. */
  large?: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="border-b border-[var(--hairline)]">
        {steps.map((s, i) => (
          <div key={s.n} className="rule">
            <button
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-expanded={active === i}
              className="grid w-full grid-cols-[3rem_1fr] items-baseline gap-4 py-6 text-left md:grid-cols-[5rem_1fr] md:py-7"
            >
              <span
                className={cn(
                  "font-mono text-caption tracking-[0.18em] transition-colors duration-fast ease-expo",
                  active === i ? "text-gold" : "text-smoke"
                )}
              >
                {s.n}
              </span>
              <span
                className={cn(
                  "type-display transition-colors duration-fast ease-expo",
                  large ? "text-display-md" : "text-display-sm",
                  active === i ? "text-paper" : "text-smoke"
                )}
              >
                {s.title}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {active === i && (
                <m.div
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="grid grid-cols-[3rem_1fr] gap-4 pb-7 md:grid-cols-[5rem_1fr]">
                    <span aria-hidden />
                    <span className="max-w-[52ch] text-body-lg text-mist">{s.body}</span>
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-8 max-w-[60ch] font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          {note}
        </p>
      )}
    </div>
  );
}
