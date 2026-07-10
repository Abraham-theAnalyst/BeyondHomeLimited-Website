import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { EnquiryTrigger } from "@/components/chrome/enquiry-trigger";
import { Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { ProcessSteps } from "@/components/services/process-steps";
import { RelatedWork } from "@/components/services/related-work";
import { RelatedServices } from "@/components/services/related-services";
import { DesignedVisual } from "@/components/services/designed-visual";
import { VideoBlock } from "@/components/work/media";
import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SERVICES, getService } from "@/lib/services";
import { CONTACT } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.meta.title,
    description: s.meta.description,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

/** Split the title so exactly one word carries the gold accent. */
function accentTitle(title: string) {
  const words = title.split(" ");
  const last = words.pop()!;
  return (
    <>
      {words.join(" ")} <span className="text-gold">{last}</span>
    </>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(s),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ]),
        ]}
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        {/* 1 ——— editorial opener */}
        <section className="container-site pt-[clamp(3rem,6vw,6rem)]">
          <p className="type-eyebrow mb-6">Service {s.index} of 06</p>
          <h1 className="type-display max-w-5xl text-display-xl text-paper">
            {accentTitle(s.title)}
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-20">
            <Prose lead>
              <p>{s.positioning}</p>
            </Prose>
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[16/10]">
              {s.media.type === "designed" ? (
                <DesignedVisual variant={s.media.variant} />
              ) : s.media.type === "video" ? (
                <>
                  {/* phones get the poster — video autoplay stays a desktop treat */}
                  <div className="absolute inset-0 lg:hidden">
                    <Image
                      src={`/hero/${s.media.base}-poster.jpg`}
                      alt={s.media.alt}
                      fill
                      sizes="100vw"
                      quality={65}
                      className="img-grade object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 hidden lg:block">
                    <VideoBlock base={s.media.base} alt={s.media.alt} className="absolute inset-0" />
                  </div>
                </>
              ) : (
                <Image
                  src={s.media.src}
                  alt={s.media.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  quality={70}
                  className="img-grade object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* 2 ——— what we deliver */}
        <Section index="01" eyebrow="What we deliver" title="On the order sheet" tight className="mt-[clamp(3rem,6vw,6rem)]">
          <ul className="border-b border-[var(--hairline)] md:columns-2 md:gap-16">
            {s.deliverables.map((d, i) => (
              <li key={d} className="rule break-inside-avoid">
                <span className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-5">
                  <span className="font-mono text-caption tracking-[0.18em] text-smoke">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-display text-display-sm text-paper">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 3 ——— how we work */}
        <Section index="02" eyebrow="How we work" title="Four steps, one roof" tight>
          <ProcessSteps note={s.processNote} />
        </Section>

        {/* 4 ——— related work */}
        <Section index="03" eyebrow="Related work" title="Where this service shows" tight>
          <RelatedWork slugs={s.relatedWork} serviceSlug={s.slug} />
        </Section>

        {/* 5 ——— enquiry moment */}
        <section className="rule py-section-sm">
          <div className="container-site flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="type-eyebrow mb-4">Start here</p>
              <p className="type-display max-w-2xl text-display-lg text-paper">
                Tell us what needs to be seen.
              </p>
              <p className="mt-6 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                <a href={`mailto:${CONTACT.email}`} className="link-underline">
                  {CONTACT.email}
                </a>
                {" · "}
                <a href={`tel:${CONTACT.phone}`} className="link-underline">
                  {CONTACT.phoneDisplay}
                </a>
                {" · "}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
            <EnquiryTrigger service={s.title}>Start a project</EnquiryTrigger>
          </div>
        </section>

        {/* 6 ——— related services */}
        <Section eyebrow="Keep looking" title="Adjacent services" tight>
          <RelatedServices slugs={s.relatedServices} />
        </Section>
      </main>
      <Footer compact />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
