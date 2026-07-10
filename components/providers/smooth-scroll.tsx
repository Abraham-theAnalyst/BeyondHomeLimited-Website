"use client";

import { useEffect, type ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12 });
    window.__lenis = lenis;
    let frame: number;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

/** Smooth-scroll to an element via Lenis when available, native otherwise. */
export function scrollToElement(selector: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}
