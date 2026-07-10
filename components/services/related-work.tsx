import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { WorkMediaBlock } from "@/components/work/media";
import { getProject } from "@/lib/work";
import { galleryByService } from "@/lib/gallery";

const GALLERY_CAP = 6;

/**
 * Media-forward strip of a service's work: full case studies lead
 * (linked), Selected Work pieces follow (captioned figures). Gallery
 * items are capped so long tags stay a strip, not a wall.
 */
export function RelatedWork({
  slugs,
  serviceSlug,
}: {
  slugs: string[];
  /** pulls Selected Work items tagged with this service */
  serviceSlug?: string;
}) {
  const projects = slugs.map(getProject).filter((p) => p !== undefined);
  const gallery = serviceSlug ? galleryByService(serviceSlug).slice(0, GALLERY_CAP) : [];
  if (projects.length === 0 && gallery.length === 0) return null;

  return (
    <div>
      <p className="mb-10 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
        {projects.length > 0 && `${projects.length} case ${projects.length === 1 ? "study" : "studies"}`}
        {projects.length > 0 && gallery.length > 0 && " · "}
        {gallery.length > 0 && `${gallery.length} selected ${gallery.length === 1 ? "piece" : "pieces"}`}
      </p>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const src = p.hero.type === "image" ? p.hero.src : `/hero/${p.hero.base}-poster.jpg`;
          const inset = p.hero.type === "image" && p.hero.w < 500;
          return (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
              <div className="overflow-hidden">
                <div className="transition-transform duration-slow ease-expo group-hover:scale-[1.02]">
                  {inset ? (
                    <div className="flex aspect-[4/3] items-center justify-center bg-coal p-8">
                      <div
                        className="relative h-full"
                        style={{ aspectRatio: `${p.hero.w} / ${p.hero.h}`, maxWidth: p.hero.w }}
                      >
                        <Image
                          src={src}
                          alt={p.hero.alt}
                          fill
                          sizes={`${p.hero.w}px`}
                          className="img-grade object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <ImageReveal
                      src={src}
                      alt={p.hero.alt}
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="aspect-[4/3]"
                    />
                  )}
                </div>
              </div>
              <p className="type-display mt-4 flex items-baseline gap-3 text-display-sm text-paper transition-transform duration-base ease-expo group-hover:translate-x-1">
                {p.client}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="translate-y-1 text-smoke opacity-0 transition-all duration-base ease-expo group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
                />
              </p>
              <p className="mt-1 max-w-[44ch] text-sm text-smoke">{p.intro}</p>
            </Link>
          );
        })}

        {gallery.map((g) => (
          <figure key={g.id}>
            <WorkMediaBlock media={g.media} className="aspect-[4/3]" />
            <figcaption className="mt-4 max-w-[44ch] text-sm text-mist">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
