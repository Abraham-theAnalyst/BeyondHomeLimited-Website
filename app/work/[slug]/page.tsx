import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { EnquiryTrigger } from "@/components/chrome/enquiry-trigger";
import { Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { WorkMediaBlock } from "@/components/work/media";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { PUBLISHED, getProject, nextProject } from "@/lib/work";

export function generateStaticParams() {
  return PUBLISHED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const og = p.hero.type === "image" ? p.hero.src : `/hero/${p.hero.base}-poster.jpg`;
  return {
    title: `${p.client} — ${p.title} · Beyond Home`,
    description: p.intro,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [og] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(slug)!;

  const projectServices = SERVICES.filter((s) => p.services.includes(s.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: `${p.client} — ${p.title}`, path: `/work/${p.slug}` },
        ])}
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        {/* ——— cinematic opener ——— */}
        <section className="container-site pt-[clamp(3rem,6vw,6rem)]">
          <p className="type-eyebrow mb-6">Case study</p>
          <h1 className="type-display max-w-5xl text-display-xl text-paper">
            {p.title}
          </h1>
          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="type-display text-display-sm text-gold">{p.client}</p>
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
              {projectServices.map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && " · "}
                  <Link
                    href={`/services/${s.slug}`}
                    className="link-underline transition-colors duration-fast ease-expo hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </span>
              ))}
              {" · "}
              {p.industry}
              {p.year && ` · ${p.year}`}
            </p>
          </div>
        </section>
        <div className="mt-12 md:mt-16">
          {p.hero.type === "image" && p.hero.w >= 1100 && !p.heroInset ? (
            <WorkMediaBlock media={p.hero} wide className="aspect-[16/10] md:aspect-[21/10]" />
          ) : (
            <div className="container-site">
              <WorkMediaBlock media={p.hero} />
            </div>
          )}
        </div>
        <p className="container-site mt-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          {p.intro}
        </p>

        {/* ——— narrative ——— */}
        <Section index="01" eyebrow="The challenge" rule={false} tight className="pb-0">
          <Prose lead>
            <p>{p.challenge}</p>
          </Prose>
        </Section>
        <Section index="02" eyebrow="Our approach" rule={false} tight className="pb-0">
          <Prose lead>
            <p>{p.approach}</p>
          </Prose>
        </Section>
        <Section index="03" eyebrow="The execution" rule={false} tight>
          <Prose lead>
            <p>{p.execution}</p>
          </Prose>
          {p.gallery.length > 0 && (
            <div className="mt-16 space-y-10 md:space-y-16">
              {p.gallery.map((mItem, i) =>
                mItem.type === "image" && mItem.w >= 1100 ? (
                  <div key={i} className="-mx-6 md:-mx-12">
                    <WorkMediaBlock media={mItem} wide className="aspect-[21/10]" />
                  </div>
                ) : (
                  <div
                    key={i}
                    className={i % 2 === 1 ? "md:ml-auto md:max-w-[70%]" : "md:max-w-[70%]"}
                  >
                    <WorkMediaBlock media={mItem} />
                  </div>
                )
              )}
            </div>
          )}
        </Section>

        {/* ——— typographic interlude: paces thin-gallery studies ——— */}
        {p.pull && (
          <section className="grain rule relative overflow-hidden py-section">
            <Image
              src="/assets/logo-icon.png"
              alt=""
              aria-hidden
              width={435}
              height={456}
              className="pointer-events-none absolute -right-20 top-1/2 w-[24rem] -translate-y-1/2 opacity-[0.05] grayscale md:w-[30rem]"
            />
            <div className="container-site relative">
              <div className="mb-8 h-px w-16 bg-gold" />
              <p className="type-display max-w-4xl text-display-lg text-paper">
                {p.pull}
              </p>
            </div>
          </section>
        )}

        {/* ——— results: renders only with real data (TODO-CLIENT) ——— */}
        {p.results && p.results.length > 0 && (
          <Section index="04" eyebrow="The results" title="What it did">
            <ul className="grid gap-10 md:grid-cols-3">
              {p.results.map((r, i) => (
                <li key={i} className="rule pt-5 text-body-lg text-mist">
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ——— client quote: renders only with real data (TODO-CLIENT) ——— */}
        {p.quote && (
          <Section eyebrow="In their words" rule={false}>
            <figure className="max-w-3xl">
              <blockquote className="type-display text-display-md text-paper">
                “{p.quote.text}”
              </blockquote>
              <figcaption className="mt-6 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                {p.quote.name} · {p.quote.role}
              </figcaption>
            </figure>
          </Section>
        )}

        {/* ——— next project + CTA ——— */}
        <section className="rule">
          <Link
            href={`/work/${next.slug}`}
            className="group container-site grid items-center gap-8 py-14 md:grid-cols-[1fr_minmax(0,22rem)] md:py-20"
          >
            <div>
              <p className="type-eyebrow mb-3">Next project</p>
              <p className="type-display flex items-baseline gap-4 text-display-lg text-paper transition-transform duration-base ease-expo group-hover:translate-x-2">
                {next.client}
                <ArrowUpRight
                  size={28}
                  aria-hidden
                  className="translate-y-1 text-smoke transition-colors duration-base ease-expo group-hover:text-gold"
                />
              </p>
              <p className="mt-2 text-body text-smoke">{next.title}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-slow ease-expo group-hover:scale-[1.04]">
                <Image
                  src={
                    next.hero.type === "image"
                      ? next.hero.src
                      : `/hero/${next.hero.base}-poster.jpg`
                  }
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 352px"
                  className="img-grade object-cover opacity-70 transition-opacity duration-base ease-expo group-hover:opacity-100"
                />
              </div>
            </div>
          </Link>
          <div className="rule container-site flex flex-wrap items-center justify-between gap-6 py-10">
            <p className="max-w-md text-body text-mist">
              A project like this one starts with a conversation.
            </p>
            <EnquiryTrigger>Start a project</EnquiryTrigger>
          </div>
        </section>
      </main>
      <Footer compact />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
