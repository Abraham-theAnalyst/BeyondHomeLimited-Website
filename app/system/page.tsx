import type { Metadata } from "next";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { Section } from "@/components/ui/section";
import { DisplayHeading } from "@/components/ui/display-heading";
import { Prose } from "@/components/ui/prose";
import { UnderlineLink } from "@/components/ui/underline-link";
import { IndexList, IndexRow } from "@/components/ui/index-row";
import { MediaBlock } from "@/components/ui/media-block";
import { StatLine } from "@/components/ui/stat-line";
import { ImageReveal } from "@/components/motion/image-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { DemoForm } from "@/components/system/demo-form";

export const metadata: Metadata = {
  title: "Design System — Beyond Home",
  description:
    "Internal component library and site chrome for the Beyond Home rebuild.",
  robots: { index: false },
};

const TYPE_RAMP = [
  { cls: "text-display-xl", label: "display-xl — clamp(44px → 128px)", text: "Forty feet" },
  { cls: "text-display-lg", label: "display-lg — clamp(36px → 88px)", text: "Lagos to Abuja" },
  { cls: "text-display-md", label: "display-md — clamp(28px → 48px)", text: "Strategy to steel" },
  { cls: "text-display-sm", label: "display-sm — clamp(22px → 28px)", text: "Under one roof" },
];

const COLORS = [
  { name: "ink", hex: "#0A0A0A", cls: "bg-ink border border-[var(--hairline)]" },
  { name: "coal", hex: "#141412", cls: "bg-coal" },
  { name: "ash", hex: "#1C1C1A", cls: "bg-ash" },
  { name: "smoke", hex: "#8A8A85", cls: "bg-smoke" },
  { name: "mist", hex: "#C9C9C4", cls: "bg-mist" },
  { name: "paper", hex: "#FAFAF7", cls: "bg-paper" },
  { name: "gold", hex: "#E8A820", cls: "bg-gold" },
];

/* Sample rows for the services index — real service lines, copy to be
   finalized against lib/services.ts in the content phase. */
const SERVICES = [
  { index: "01", title: "Billboards & OOH", blurb: "Unipoles, gantries and LED, sited and installed nationwide." },
  { index: "02", title: "Building wraps", blurb: "Whole facades turned into media, engineered for weather." },
  { index: "03", title: "Vehicle & fleet branding", blurb: "Trucks, tricycles and cars that carry the campaign." },
  { index: "04", title: "Signage & neon", blurb: "Storefronts and interiors that read from the street." },
  { index: "05", title: "Branded interiors", blurb: "Retail and office fit-outs finished to the brand." },
  { index: "06", title: "Large-format print", blurb: "Production and finishing, quality-checked in-house." },
];

export default function SystemPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        {/* ——— intro ——— */}
        <Section rule={false} className="pb-0">
          <p className="type-eyebrow mb-6">Internal — design system</p>
          <DisplayHeading
            as="h1"
            size="lg"
            onMount
            lines={["Every page speaks", "one language."]}
            accent="one"
          />
          <Prose lead className="mt-8">
            <p>
              Tokens, components and chrome for the Beyond Home rebuild. Each
              piece below is the production component, rendered live. Nothing
              on this page is styled by hand; everything consumes the tokens.
            </p>
          </Prose>
        </Section>

        {/* ——— 01 tokens ——— */}
        <Section index="01" eyebrow="Tokens" title="Type, color, space, motion">
          <div className="space-y-10">
            {TYPE_RAMP.map((t) => (
              <div key={t.cls}>
                <p className="mb-3 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                  {t.label}
                </p>
                <p className={`type-display ${t.cls} text-paper`}>{t.text}</p>
              </div>
            ))}
            <div>
              <p className="mb-3 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                body-lg — 18px · body — 16px · caption — 11px mono
              </p>
              <Prose lead>
                <p>
                  Body text stays modest while display sizes do the shouting.
                  This paragraph is the 18px lead style with a 65-character
                  measure, which keeps long copy readable on any screen.
                </p>
              </Prose>
            </div>
          </div>

          <div className="mt-20 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-7">
            {COLORS.map((c) => (
              <div key={c.name}>
                <div className={`h-14 ${c.cls}`} />
                <p className="mt-2 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                  {c.name} {c.hex}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-[65ch] text-sm text-smoke">
            Gold is interaction and emphasis only, never a surface. One extra
            semantic token, error #E0564F, exists for form validation and
            appears nowhere else.
          </p>

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                Spacing — 4px grid · sections at clamp(96px → 176px)
              </p>
              <div className="space-y-2">
                {[8, 16, 24, 40, 64, 96, 144, 192].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <span className="w-8 text-right font-mono text-caption text-smoke">
                      {s}
                    </span>
                    <div className="h-1.5 bg-ash" style={{ width: `${(s / 192) * 100}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                Motion — one easing family
              </p>
              <ul className="space-y-2 font-mono text-sm text-mist">
                <li>ease-expo · cubic-bezier(0.16, 1, 0.3, 1)</li>
                <li>fast 300ms · hovers, color shifts</li>
                <li>base 600ms · underlines, header state</li>
                <li>reveal 900ms · masked text</li>
                <li>slow 1200ms · image reveals, parallax settle</li>
              </ul>
              <p className="mt-4 max-w-[50ch] text-sm text-smoke">
                Everything animates transform or opacity only, and all of it
                stands down under prefers-reduced-motion.
              </p>
            </div>
          </div>
        </Section>

        {/* ——— 02 display heading ——— */}
        <Section index="02" eyebrow="Display heading" title="Masked reveal, one gold word">
          <DisplayHeading
            size="xl"
            lines={["Seen from", "the street."]}
            accent="street."
          />
          <p className="mt-8 max-w-[65ch] text-sm text-smoke">
            Lines rise out of an overflow mask, staggered 90ms, 900ms each.
            The accent prop marks at most one gold word per headline.
          </p>
        </Section>

        {/* ——— 03 editorial index ——— */}
        <Section index="03" eyebrow="Editorial index" title="The card-grid replacement">
          <IndexList>
            {SERVICES.map((s) => (
              <IndexRow key={s.index} {...s} href="/services" />
            ))}
          </IndexList>
        </Section>

        {/* ——— 04 full-bleed media ——— */}
        <div className="rule py-section">
          <div className="container-site mb-16 flex items-baseline gap-6 md:mb-24">
            <span aria-hidden data-n="04" className="type-display text-numeral text-ash select-none before:content-[attr(data-n)]" />
            <div>
              <p className="type-eyebrow mb-2">Full-bleed media</p>
              <h2 className="type-display text-display-md text-paper">Parallax, graded, captioned</h2>
            </div>
          </div>
          <MediaBlock
            src="/hero/fmn-wrap-aerial.jpg"
            alt="Aerial view of a Golden Penny building wrap in Abuja"
            caption="Fig. — building wrap · Golden Penny · drone still"
          />
        </div>

        {/* ——— 05 proof points ——— */}
        <Section index="05" eyebrow="Proof points" title="Typographic, no boxes">
          <StatLine
            stats={[
              { value: "2013", label: "Established — Lagos" },
              { value: "12+", label: "Blue-chip brands served" },
              { value: "1 roof", label: "Strategy to installation" },
            ]}
          />
        </Section>

        {/* ——— 06 actions ——— */}
        <Section index="06" eyebrow="Actions" title="Primary and quiet">
          <div className="flex flex-wrap items-center gap-10">
            <MagneticButton href="https://wa.me/2348060107065">
              Start a project
            </MagneticButton>
            <UnderlineLink href="/direction">See the direction page</UnderlineLink>
            <UnderlineLink href="https://wa.me/2348060107065" external>
              Chat on WhatsApp
            </UnderlineLink>
          </div>
          <p className="mt-8 max-w-[65ch] text-sm text-smoke">
            Both are keyboard-focusable with the global gold focus ring. The
            magnetic lean is pointer-only; touch and reduced motion get a
            plain, honest button.
          </p>
        </Section>

        {/* ——— 07 image reveal ——— */}
        <Section index="07" eyebrow="Image reveal" title="Wipe, settle, grade">
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
          <p className="mt-8 max-w-[65ch] text-sm text-smoke">
            The frame wipes open while the image settles from a 14% over-scale.
            The dark grade is applied in-component so every photograph on the
            site carries the same tone.
          </p>
        </Section>

        {/* ——— 08 forms ——— */}
        <Section index="08" eyebrow="Forms" title="Editorial fields, honest errors">
          <DemoForm />
        </Section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
