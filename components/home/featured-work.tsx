import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { PUBLISHED } from "@/lib/work";
import { GALLERY } from "@/lib/gallery";
import { cn } from "@/lib/utils";

type Feature = {
  id: string;
  slug: string;
  client: string;
  service: string;
  line: string;
  src: string;
  alt: string;
};

/* Curated for how each image holds at size — the softer sources
   (Macallan crop, Bigi counter) stay on /work. */
const LEAD: Feature = {
  id: "W-01",
  slug: "golden-penny-abuja-wrap",
  client: "Golden Penny (FMN)",
  service: "Building wrap",
  line: "A full high-rise facade in Abuja, printed in sections and rigged by our installation crew.",
  src: "/hero/fmn-wrap-aerial.jpg",
  alt: "Aerial view of a Golden Penny campaign wrapped over a high-rise building",
};

const SUPPORTING: (Feature & { frame: string; media: string })[] = [
  {
    id: "W-02",
    slug: "orijin-at-every-scale",
    client: "Orijin",
    service: "Sculptural installation",
    line: "A 33cl can scaled up to tank size, fabricated and finished for outdoor display.",
    src: "/images/work/orijin-tank.jpg",
    alt: "Tank-sized Orijin can installation among palm trees",
    frame: "col-span-12 md:col-span-7",
    media: "aspect-[4/5]",
  },
  {
    id: "W-03",
    slug: "goodlife-magik-fleet",
    client: "Goodlife Magik",
    service: "Fleet branding",
    line: "Goodlife Magik's flavours, wrapped over delivery trucks that cross the city all day.",
    src: "/images/work/goodlife-truck.jpg",
    alt: "Delivery truck in a full Goodlife Magik wrap",
    frame: "col-span-10 col-start-3 mt-16 md:col-span-4 md:col-start-9 md:mt-48",
    media: "aspect-[4/5]",
  },
  {
    id: "W-04",
    slug: "closeup-street-level",
    client: "Closeup (Unilever)",
    service: "Street-level campaign",
    line: "A wrapped tricycle in traffic and a wall graphic at the counter, meeting the same customer twice.",
    src: "/images/work/closeup-tricycle.jpg",
    alt: "Tricycle in a full Closeup campaign wrap",
    frame: "col-span-10 mt-16 md:col-span-4 md:col-start-2 md:mt-36",
    media: "aspect-square",
  },
  {
    id: "W-05",
    slug: "savana-expressway-gantry",
    client: "Savana (Euro Global)",
    service: "Gantry billboard",
    line: "Savana's full range on one gantry board, read from the far carriageway.",
    src: "/images/work/savana-billboard.jpg",
    alt: "Savana fruit drink campaign on a gantry billboard over a highway",
    frame: "col-span-12 mt-16 md:col-span-6 md:col-start-7 md:mt-64",
    media: "aspect-[4/3]",
  },
];

function Caption({ f }: { f: Feature }) {
  return (
    <div className="mt-4">
      <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
        {f.id} · {f.service}
      </p>
      <p className="type-display mt-1 flex items-baseline gap-3 text-display-sm text-paper transition-transform duration-base ease-expo group-hover:translate-x-1">
        {f.client}
        <ArrowUpRight
          size={16}
          aria-hidden
          className="translate-y-1 text-smoke opacity-0 transition-all duration-base ease-expo group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
        />
      </p>
      <p className="mt-1 max-w-[48ch] text-sm text-smoke">{f.line}</p>
    </div>
  );
}

/**
 * Featured work: one project carries the section at near-full-bleed, four
 * more sit in a staggered editorial arrangement — varied spans, offsets
 * and crops so the rhythm never settles into a grid.
 */
export function FeaturedWork() {
  return (
    <div>
      {/* ——— lead: the strongest image, edge to edge ——— */}
      <Link href={`/work/${LEAD.slug}`} className="group block">
        <div className="-mx-6 md:-mx-12">
          <ImageReveal
            src={LEAD.src}
            alt={LEAD.alt}
            sizes="100vw"
            className="aspect-[16/10] md:aspect-[21/9]"
          />
        </div>
        <Caption f={LEAD} />
      </Link>

      {/* ——— four more, staggered ——— */}
      <div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-28 md:gap-x-8">
        {SUPPORTING.map((f) => (
          <Link
            key={f.id}
            href={`/work/${f.slug}`}
            className={cn("group block min-w-0", f.frame)}
          >
            <ImageReveal
              src={f.src}
              alt={f.alt}
              sizes="(max-width: 768px) 90vw, 640px"
              className={f.media}
            />
            <Caption f={f} />
          </Link>
        ))}
      </div>

      {/* ——— the rest lives on /work ——— */}
      <div className="rule mt-24 flex flex-wrap items-baseline justify-between gap-6 pt-8 md:mt-32">
        <Link
          href="/work"
          className="group type-display flex items-center gap-4 text-display-sm text-paper"
        >
          View all work
          <ArrowUpRight
            size={22}
            aria-hidden
            className="text-smoke transition-all duration-base ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold"
          />
        </Link>
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          {PUBLISHED.length} case studies · {GALLERY.length} selected pieces
        </p>
      </div>
    </div>
  );
}
