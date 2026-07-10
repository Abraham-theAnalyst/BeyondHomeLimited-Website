"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WorkMediaBlock } from "@/components/work/media";
import { SERVICES } from "@/lib/services";
import type { Project } from "@/lib/work";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Filter =
  | { kind: "all" }
  | { kind: "service"; slug: string }
  | { kind: "industry"; name: string };

const filterKey = (f: Filter) =>
  f.kind === "all" ? "all" : f.kind === "service" ? `s:${f.slug}` : `i:${f.name}`;

export function WorkGallery({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>({ kind: "all" });

  const serviceChips = useMemo(() => {
    const present = new Set(projects.flatMap((p) => p.services));
    return SERVICES.filter((s) => present.has(s.slug));
  }, [projects]);

  const industryChips = useMemo(
    () => [...new Set(projects.map((p) => p.industry))],
    [projects]
  );

  const visible = useMemo(() => {
    if (filter.kind === "all") return projects;
    if (filter.kind === "service")
      return projects.filter((p) => p.services.includes(filter.slug));
    return projects.filter((p) => p.industry === filter.name);
  }, [projects, filter]);

  const chip = (label: string, f: Filter) => {
    const active = filterKey(f) === filterKey(filter);
    return (
      <button
        key={filterKey(f)}
        onClick={() => setFilter(f)}
        aria-pressed={active}
        className={cn(
          "shrink-0 snap-start whitespace-nowrap py-2 font-mono text-caption uppercase tracking-[0.18em] transition-colors duration-fast ease-expo",
          active ? "text-gold" : "text-smoke hover:text-mist"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      {/* ——— typographic filter row (swipeable on touch) ——— */}
      <div className="rule scrollbar-none -mx-6 flex snap-x items-baseline gap-7 overflow-x-auto px-6 pt-6 md:mx-0 md:px-0">
        {chip("All", { kind: "all" })}
        <span aria-hidden className="text-smoke/40 select-none">·</span>
        {serviceChips.map((s) => chip(s.title, { kind: "service", slug: s.slug }))}
        <span aria-hidden className="text-smoke/40 select-none">·</span>
        {industryChips.map((i) => chip(i, { kind: "industry", name: i }))}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-caption tracking-[0.18em] text-smoke">
        {visible.length} of {projects.length} projects
      </p>

      {/* ——— entries: curtain transition on filter change ——— */}
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={filterKey(filter)}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-16 space-y-24 md:mt-20 md:space-y-36"
        >
          {visible.map((p, i) => (
            <WorkEntry key={p.slug} project={p} flip={i % 2 === 1} index={i} />
          ))}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function WorkEntry({
  project,
  flip,
  index,
}: {
  project: Project;
  flip: boolean;
  index: number;
}) {
  const p = project;
  const wide = p.hero.type === "image" && p.hero.w >= 1100 && !p.heroInset;
  const serviceTitles = SERVICES.filter((s) => p.services.includes(s.slug))
    .map((s) => s.title)
    .join(" · ");

  const caption = (
    <div className={cn("mt-5", wide ? "" : "md:mt-0 md:self-end")}>
      <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
        {String(index + 1).padStart(2, "0")} · {serviceTitles} · {p.industry}
      </p>
      <h2 className="type-display mt-2 flex items-baseline gap-3 text-display-md text-paper transition-transform duration-base ease-expo group-hover:translate-x-2">
        {p.client}
        <ArrowUpRight
          size={20}
          aria-hidden
          className="translate-y-1 text-smoke opacity-0 transition-all duration-base ease-expo group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
        />
      </h2>
      <p className="type-display mt-1 text-display-sm text-mist">{p.title}</p>
      <p className="mt-3 max-w-[52ch] text-body text-smoke">{p.intro}</p>
    </div>
  );

  // Wide sources: full-bleed composition. Others: split, alternating sides.
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      {wide ? (
        <>
          <div className="overflow-hidden">
            <div className="transition-transform duration-slow ease-expo group-hover:scale-[1.015]">
              <WorkMediaBlock media={p.hero} wide className="aspect-[21/10]" />
            </div>
          </div>
          {caption}
        </>
      ) : (
        <div
          className={cn(
            "grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12",
            flip && "md:[direction:rtl] md:[&>*]:[direction:ltr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="transition-transform duration-slow ease-expo group-hover:scale-[1.015]">
              <WorkMediaBlock media={p.hero} />
            </div>
          </div>
          {caption}
        </div>
      )}
    </Link>
  );
}
