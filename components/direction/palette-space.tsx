const SWATCHES = [
  { name: "Ink", hex: "#0A0A0A", note: "The site itself. Every page sits on it.", cls: "bg-ink border border-[var(--hairline)]" },
  { name: "Coal", hex: "#141412", note: "Raised surfaces: panels, inputs, code.", cls: "bg-coal" },
  { name: "Ash", hex: "#1C1C1A", note: "Oversized numerals, ghosted marks.", cls: "bg-ash" },
  { name: "Smoke", hex: "#8A8A85", note: "Captions and secondary text.", cls: "bg-smoke" },
  { name: "Mist", hex: "#C9C9C4", note: "Body text on dark.", cls: "bg-mist" },
  { name: "Paper", hex: "#FAFAF7", note: "Headlines, primary text, the CTA.", cls: "bg-paper" },
];

const SPACES = [8, 16, 24, 40, 64, 96, 144, 192];

export function PaletteSpace() {
  return (
    <section id="palette" className="rule relative mx-auto max-w-[1400px] px-6 py-[clamp(6rem,12vw,11rem)] md:px-12">
      <div className="mb-16 flex items-baseline gap-6 md:mb-24">
        <span className="type-display text-[clamp(3rem,6vw,5.5rem)] text-ash">02</span>
        <div>
          <p className="type-eyebrow mb-2">Color &amp; space</p>
          <h2 className="type-display text-[clamp(1.75rem,3.5vw,3rem)] text-paper">
            Near-monochrome, one accent
          </h2>
        </div>
      </div>

      {/* Neutral scale as full-width bands, not swatch cards */}
      <div>
        {SWATCHES.map((s) => (
          <div key={s.name} className="rule grid grid-cols-[6rem_1fr_auto] items-center gap-6 py-4 md:grid-cols-[10rem_1fr_auto]">
            <div className={`h-10 w-full ${s.cls}`} />
            <p className="text-sm text-mist md:text-base">
              <span className="font-semibold text-paper">{s.name}</span>
              <span className="ml-3 hidden sm:inline">{s.note}</span>
            </p>
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-smoke">{s.hex}</p>
          </div>
        ))}
      </div>

      {/* Gold, demonstrated at its actual dosage */}
      <div className="mt-24 grid gap-12 md:grid-cols-2">
        <div>
          <p className="type-eyebrow mb-6">Gold — #E8A820 · spent like money</p>
          <p className="max-w-prose text-base leading-relaxed text-mist">
            Gold never fills a background. It appears four ways only: one
            accented word in a headline, hairline rules, hover and focus
            states, and small wayfinding marks like the active chapter index.
            The less it appears, the more it is worth when it does.
          </p>
        </div>
        <div className="space-y-8">
          <p className="type-display text-4xl text-paper">
            Seen across <span className="text-gold">Nigeria.</span>
          </p>
          <div className="h-px w-24 bg-gold" />
          <p>
            <a href="#top" className="link-underline text-sm font-medium text-paper">
              A link, waiting to be hovered
            </a>
          </p>
        </div>
      </div>

      {/* Spacing scale */}
      <div className="mt-24">
        <p className="type-eyebrow mb-8">
          Spacing — 8px base · sections breathe at clamp(96px, 12vw, 176px)
        </p>
        <div className="space-y-3">
          {SPACES.map((s) => (
            <div key={s} className="flex items-center gap-6">
              <span className="w-10 text-right font-mono text-[0.6875rem] text-smoke">{s}</span>
              <div className="h-2 bg-coal" style={{ width: `${(s / 192) * 100}%` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
