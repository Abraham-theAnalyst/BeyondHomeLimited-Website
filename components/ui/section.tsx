import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial section wrapper: generous vertical rhythm, hairline top rule,
 * optional oversized ghosted index numeral with eyebrow + heading slot.
 */
export function Section({
  children,
  index,
  eyebrow,
  title,
  className,
  rule = true,
  tight = false,
  id,
}: {
  children: ReactNode;
  /** "01", "02"… rendered as the oversized ghost numeral */
  index?: string;
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
  rule?: boolean;
  /** Smaller vertical rhythm for short, single-idea sections. */
  tight?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative", tight ? "py-section-sm" : "py-section", rule && "rule", className)}
    >
      <div className="container-site">
        {(index || eyebrow || title) && (
          <div className={cn("flex items-baseline gap-6", tight ? "mb-8 md:mb-10" : "mb-16 md:mb-24")}>
            {index && (
              <span
                aria-hidden
                data-n={index}
                className="type-display text-numeral text-ash select-none before:content-[attr(data-n)]"
              />
            )}
            <div>
              {eyebrow && <p className="type-eyebrow mb-2">{eyebrow}</p>}
              {title && (
                <h2 className="type-display text-display-md text-paper">
                  {title}
                </h2>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
