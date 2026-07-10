import { Section } from "@/components/ui/section";
import { TESTIMONIALS } from "@/lib/testimonials";

/**
 * Data-driven: renders nothing while lib/testimonials.ts is empty.
 * No placeholder quotes, ever.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section index="09" eyebrow="What clients say" title="In their words">
      <div className="space-y-16">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="max-w-3xl">
            <blockquote className="type-display text-display-sm text-paper">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
              {t.name} · {t.role}, {t.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
