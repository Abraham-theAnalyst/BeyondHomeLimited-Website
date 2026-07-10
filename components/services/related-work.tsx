import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { getProject } from "@/lib/work";

/**
 * Media-forward strip of the service's case studies. Slugs are curated in
 * lib/services.ts (nearest-by-tag where no direct study exists), so this
 * never renders empty or irrelevant.
 */
export function RelatedWork({ slugs }: { slugs: string[] }) {
  const projects = slugs.map(getProject).filter((p) => p !== undefined);
  if (projects.length === 0) return null;

  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const src = p.hero.type === "image" ? p.hero.src : `/hero/${p.hero.base}-poster.jpg`;
        // sub-500px sources sit as insets on coal — never upscaled
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
    </div>
  );
}
