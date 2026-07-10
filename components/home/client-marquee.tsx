const CLIENTS = [
  "Unilever", "MTN", "Konga", "Heritage Bank", "Dell", "Martell",
  "The Macallan", "FMN", "Orijin", "Travelbeta", "Planet Projects", "AMG",
];

/**
 * Slow infinite marquee of client marks. Pauses on hover/focus.
 * Under prefers-reduced-motion it renders as a static wrapped list instead.
 */
export function ClientMarquee() {
  return (
    <>
      {/* moving version */}
      <div className="marquee -mx-6 overflow-hidden py-2 motion-reduce:hidden md:-mx-12">
        <div className="marquee-track flex w-max items-baseline gap-16 pr-16">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              aria-hidden={i >= CLIENTS.length}
              className="type-display whitespace-nowrap text-display-md text-smoke transition-colors duration-base ease-expo hover:text-paper"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* reduced-motion fallback: same marks, static */}
      <ul className="hidden flex-wrap gap-x-12 gap-y-6 motion-reduce:flex">
        {CLIENTS.map((c) => (
          <li key={c} className="type-display text-display-sm text-smoke">
            {c}
          </li>
        ))}
      </ul>
    </>
  );
}
