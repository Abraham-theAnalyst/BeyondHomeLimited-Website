import { MaskedReveal } from "@/components/motion/masked-reveal";

export function TypeSpecimen() {
  return (
    <section id="type" className="rule relative mx-auto max-w-[1400px] px-6 py-[clamp(6rem,12vw,11rem)] md:px-12">
      <div className="mb-16 flex items-baseline gap-6 md:mb-24">
        <span className="type-display text-[clamp(3rem,6vw,5.5rem)] text-ash">01</span>
        <div>
          <p className="type-eyebrow mb-2">Typography</p>
          <h2 className="type-display text-[clamp(1.75rem,3.5vw,3rem)] text-paper">
            Type does the heavy lifting
          </h2>
        </div>
      </div>

      {/* Display specimen at real sizes */}
      <div className="space-y-14">
        <div>
          <p className="type-eyebrow mb-4">
            Display — Archivo · width 125 · weight 800 · clamp(44px → 128px)
          </p>
          <p className="type-display text-[clamp(2.75rem,9vw,8rem)] text-paper">
            <MaskedReveal lines={["Forty feet tall."]} />
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="type-eyebrow mb-4">Section — Archivo · width 125 · 56px</p>
            <p className="type-display text-[3.5rem] leading-none text-paper">
              Lagos to Abuja
            </p>
            <p className="type-eyebrow mb-4 mt-10">Subhead — Archivo · width 100 · 24px</p>
            <p
              className="font-display text-2xl font-semibold text-paper"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              Strategy, production, installation
            </p>
          </div>
          <div>
            <p className="type-eyebrow mb-4">Body — Schibsted Grotesk · 400 · 18px</p>
            <p className="max-w-prose text-lg leading-relaxed text-mist">
              Beyond Home has been putting brands in front of Nigerian audiences
              since 2013. The work starts indoors with retail interiors and
              exhibition stands, then scales up through vehicle fleets and store
              fronts to building wraps and LED spectaculars.
            </p>
            <p className="type-eyebrow mb-4 mt-10">Caption — IBM Plex Mono · 400 · 11px</p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-smoke">
              Fig. 04 — LED unipole · 30 sheets · dusk to midnight
            </p>
          </div>
        </div>
      </div>

      {/* Why this pairing */}
      <div className="mt-24 grid gap-10 md:grid-cols-3 md:gap-12">
        <div>
          <p className="type-eyebrow mb-3">Why Archivo</p>
          <p className="text-base leading-relaxed text-mist">
            Archivo is a grotesque drawn for headlines and posters, and with its
            width axis opened up the black weights read like lettering on a
            building face: wide, planted, hard to ignore. That is the company&apos;s
            trade. Set tight above 96px it gives the site the physical scale of
            the work itself, without borrowing anyone&apos;s house style.
          </p>
        </div>
        <div>
          <p className="type-eyebrow mb-3">Why Schibsted Grotesk</p>
          <p className="text-base leading-relaxed text-mist">
            The body face does the opposite job: it disappears. Schibsted was
            drawn for a news publisher, so it stays quiet and legible at 16 to
            18px, and its tall x-height holds up on the budget Android screens
            most visitors will actually bring to this site.
          </p>
        </div>
        <div>
          <p className="type-eyebrow mb-3">Why a mono third voice</p>
          <p className="text-base leading-relaxed text-mist">
            Outdoor advertising is a business of site codes, dimensions and
            production specs. IBM Plex Mono is that paperwork voice: eyebrows,
            captions, index numbers and dates. It lets the interface talk shop
            in small print while the display face does the shouting.
          </p>
        </div>
      </div>
    </section>
  );
}
