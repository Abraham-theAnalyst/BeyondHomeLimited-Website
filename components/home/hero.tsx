import { MagneticButton } from "@/components/motion/magnetic-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { HeroShell } from "@/components/home/hero-shell";

/**
 * Server component: the LCP-critical text renders as static HTML outside
 * the client shell's hydrated subtree. The reveal is pure CSS (mobile
 * paints instantly; desktop gets the masked rise).
 */
export function HomeHero() {
  return (
    <HeroShell>
      <h1 className="type-display text-display-xl text-paper">
        <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span className="hero-line hero-line-1 block will-change-transform">
            Your brand,
          </span>
        </span>
        <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span className="hero-line hero-line-2 block will-change-transform">
            forty feet <span className="text-gold">tall.</span>
          </span>
        </span>
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-body leading-relaxed text-mist md:text-body-lg">
          Beyond Home designs, prints and installs advertising that can hold a
          Nigerian street&apos;s attention: billboards, building wraps, fleets
          and interiors. From strategy to steel, one team.
        </p>
        <div className="flex items-center gap-8">
          <MagneticButton href="/contact">Start a project</MagneticButton>
          <UnderlineLink href="/work">See our work</UnderlineLink>
        </div>
      </div>
    </HeroShell>
  );
}
