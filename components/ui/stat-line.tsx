import type { ReactNode } from "react";

/**
 * Typographic proof points — no boxes, no cards. A hairline-ruled row of
 * oversized figures with small mono labels, reading like a spec sheet.
 */
export function StatLine({
  stats,
  columns = 3,
}: {
  stats: { value: ReactNode; label: string }[];
  columns?: 3 | 4;
}) {
  return (
    <dl
      className={
        columns === 4
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid grid-cols-1 sm:grid-cols-3"
      }
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="rule flex flex-col gap-3 py-8 sm:border-l sm:border-[var(--hairline)] sm:px-8 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0 md:py-10"
        >
          <dd
            className={
              columns === 4
                ? "type-display order-2 text-[clamp(2.5rem,4.5vw,4rem)] leading-none text-paper"
                : "type-display order-2 text-numeral text-paper"
            }
          >
            {s.value}
          </dd>
          <dt className="order-1 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
