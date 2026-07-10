import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Body text block with an editorial measure: capped at ~65ch so long copy
 * never runs wall-to-wall. `lead` bumps to the large body size.
 */
export function Prose({
  children,
  lead = false,
  className,
}: {
  children: ReactNode;
  lead?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[65ch] text-mist [&_p+p]:mt-5",
        lead ? "text-body-lg" : "text-body",
        className
      )}
    >
      {children}
    </div>
  );
}
