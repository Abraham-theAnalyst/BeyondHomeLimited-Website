import type { JSX, ReactNode } from "react";
import { MaskedReveal } from "@/components/motion/masked-reveal";
import { cn } from "@/lib/utils";

const SIZES = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
} as const;

/**
 * Display headline with masked staggered reveal and at most one
 * gold-accented word per headline (house rule — gold is spent, not poured).
 * Pass lines as strings; mark the accent by wrapping it in the `accent`
 * prop, e.g. lines={["Your brand,", "forty feet tall."]} accent="tall."
 */
export function DisplayHeading({
  lines,
  accent,
  as: Tag = "h2",
  size = "lg",
  onMount = false,
  delay = 0,
  className,
}: {
  lines: string[];
  accent?: string;
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p">;
  size?: keyof typeof SIZES;
  onMount?: boolean;
  delay?: number;
  className?: string;
}) {
  const rendered: ReactNode[] = lines.map((line, i) => {
    if (!accent || !line.includes(accent)) return <span key={i}>{line}</span>;
    const [before, after] = line.split(accent);
    return (
      <span key={i}>
        {before}
        <span className="text-gold">{accent}</span>
        {after}
      </span>
    );
  });

  return (
    <Tag className={cn("type-display text-paper", SIZES[size], className)}>
      <MaskedReveal lines={rendered} onMount={onMount} delay={delay} />
    </Tag>
  );
}
