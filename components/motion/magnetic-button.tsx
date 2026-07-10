"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Primary CTA with magnetic hover: the button leans toward the cursor and
 * springs home on leave. Renders as a link by default, or as a real
 * <button type="submit"> when `asSubmit` is set. Touch devices and reduced
 * motion get a plain, honest button.
 */
export function MagneticButton({
  children,
  href,
  className,
  asSubmit = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  asSubmit?: boolean;
  disabled?: boolean;
  /** Renders a plain <button> when set (and no href). */
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = cn(
    "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 bg-paper px-8",
    "font-body text-sm font-semibold tracking-wide text-ink",
    "transition-colors duration-fast ease-expo hover:bg-gold",
    "disabled:cursor-default disabled:opacity-60 disabled:hover:bg-paper",
    className
  );

  if (asSubmit || (onClick && !href)) {
    return (
      <m.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={asSubmit ? "submit" : "button"}
        disabled={disabled}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={cls}
      >
        {children}
      </m.button>
    );
  }

  return (
    <m.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cls}
    >
      {children}
    </m.a>
  );
}
