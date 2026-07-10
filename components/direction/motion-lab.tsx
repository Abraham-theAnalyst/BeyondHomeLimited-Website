"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { MaskedReveal } from "@/components/motion/masked-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export function MotionLab() {
  const [replay, setReplay] = useState(0);

  return (
    <section className="rule relative mx-auto max-w-[1400px] px-6 py-[clamp(6rem,12vw,11rem)] md:px-12">
      <div className="mb-16 flex items-baseline gap-6 md:mb-24">
        <span className="type-display text-[clamp(3rem,6vw,5.5rem)] text-ash">03</span>
        <div>
          <p className="type-eyebrow mb-2">Motion</p>
          <h2 className="type-display text-[clamp(1.75rem,3.5vw,3rem)] text-paper">
            Expensive to watch, cheap to run
          </h2>
        </div>
      </div>

      <p className="mb-20 max-w-xl text-base leading-relaxed text-mist">
        Lenis smooths the scroll, Framer Motion moves the pixels. Everything
        animates on transform and opacity only, one moment per section, and all
        of it stands down when a visitor prefers reduced motion.
      </p>

      <div className="space-y-24">
        {/* 01 masked text reveal */}
        <div className="rule grid gap-8 pt-10 md:grid-cols-[10rem_1fr_auto]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
            M-01
            <span className="mt-1 block text-mist">Masked text reveal</span>
          </p>
          <p key={replay} className="type-display text-[clamp(2rem,5vw,4rem)] text-paper">
            <MaskedReveal
              lines={["The street reads it", "before anyone else."]}
            />
          </p>
          <button
            onClick={() => setReplay((n) => n + 1)}
            className="flex h-11 w-11 items-center justify-center self-start border border-[var(--hairline)] text-smoke transition-colors hover:border-gold hover:text-gold"
            aria-label="Replay text reveal"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* 02 image reveal */}
        <div id="work" className="rule grid gap-8 pt-10 md:grid-cols-[10rem_1fr]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
            M-02
            <span className="mt-1 block text-mist">Image reveal on scroll</span>
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageReveal
              src="/images/work/orijin-tank.jpg"
              alt="Orijin tank installation among palm trees"
              className="aspect-[16/11]"
            />
            <ImageReveal
              src="/images/work/macallan-building-wrap.jpg"
              alt="Macallan building wrap over a city street"
              className="aspect-[16/11]"
            />
          </div>
        </div>

        {/* 03 magnetic button */}
        <div className="rule grid gap-8 pt-10 md:grid-cols-[10rem_1fr]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
            M-03
            <span className="mt-1 block text-mist">Magnetic primary CTA</span>
          </p>
          <div>
            <MagneticButton href="https://wa.me/2348060107065">Start a project</MagneticButton>
            <p className="mt-4 max-w-sm text-sm text-smoke">
              The button leans toward the cursor and springs home. Touch
              devices and reduced motion get a plain, honest button.
            </p>
          </div>
        </div>

        {/* 04 underline links */}
        <div className="rule grid gap-8 pt-10 md:grid-cols-[10rem_1fr]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
            M-04
            <span className="mt-1 block text-mist">Link underline</span>
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <a href="#top" className="link-underline text-lg text-paper">Services</a>
            <a href="#top" className="link-underline text-lg text-paper">Work</a>
            <a href="#top" className="link-underline text-lg text-paper">About</a>
            <a href="#top" className="link-underline text-lg text-gold">Get a quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}
