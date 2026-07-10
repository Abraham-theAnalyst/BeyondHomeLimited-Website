import type { Metadata } from "next";
import { Hero } from "@/components/direction/hero";
import { TypeSpecimen } from "@/components/direction/type-specimen";
import { PaletteSpace } from "@/components/direction/palette-space";
import { MotionLab } from "@/components/direction/motion-lab";

export const metadata: Metadata = {
  title: "Design Direction — Beyond Home",
  description:
    "Phase 1 design direction: typography pairing, palette, spacing, motion vocabulary and the sample cinematic hero.",
};

export default function DirectionPage() {
  return (
    <main id="top">
      <Hero />
      <TypeSpecimen />
      <PaletteSpace />
      <MotionLab />
      <footer className="rule mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-10 sm:flex-row md:px-12">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
          Phase 1 — design direction, for review
        </p>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
          Beyond Home Limited © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
