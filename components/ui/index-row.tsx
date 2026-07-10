import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Editorial index list — the house replacement for card grids.
 * A numbered, hairline-ruled row: mono numeral, display title, one-liner.
 * Hover: numeral turns gold, the title eases right, the arrow surfaces.
 */
export function IndexList({ children }: { children: ReactNode }) {
  return <div className="border-b border-[var(--hairline)]">{children}</div>;
}

export function IndexRow({
  index,
  title,
  blurb,
  href,
}: {
  index: string;
  title: string;
  blurb?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rule group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[5rem_1fr_minmax(0,20rem)_auto] md:gap-8 md:py-9"
    >
      <span className="font-mono text-caption tracking-[0.18em] text-smoke transition-colors duration-fast ease-expo group-hover:text-gold group-focus-visible:text-gold">
        {index}
      </span>
      <span className="type-display text-display-sm text-paper transition-transform duration-base ease-expo group-hover:translate-x-2">
        {title}
      </span>
      {blurb && (
        <span className="hidden text-body text-smoke transition-colors duration-base ease-expo group-hover:text-mist md:block">
          {blurb}
        </span>
      )}
      <ArrowUpRight
        size={18}
        aria-hidden
        className="translate-y-1 text-smoke opacity-0 transition-all duration-base ease-expo group-hover:translate-y-0 group-hover:text-paper group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </Link>
  );
}
