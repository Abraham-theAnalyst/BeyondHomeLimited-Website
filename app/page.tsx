import type { Metadata } from "next";
import Image from "next/image";

import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { HomeHero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { ServicesExplorer } from "@/components/home/services-explorer";
import { FeaturedWork } from "@/components/home/featured-work";
import { CoverageMap } from "@/components/home/coverage-map";
import { ClientMarquee } from "@/components/home/client-marquee";
import { Section } from "@/components/ui/section";
import { DisplayHeading } from "@/components/ui/display-heading";
import { Prose } from "@/components/ui/prose";
import { StatLine } from "@/components/ui/stat-line";
import { MediaBlock } from "@/components/ui/media-block";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Beyond Home Limited | Outdoor Advertising, Signage & Branding in Lagos, Nigeria",
  description:
    "Billboards, building wraps, signage, fleets and branded interiors, designed, printed and installed by one Lagos team. Working across Nigeria since 2013.",
  alternates: { canonical: "/" },
};

const THINKING_STEPS = [
  { n: "01", word: "Examine", line: "the audience and where it looks" },
  { n: "02", word: "Analyse", line: "channels, sites and cost" },
  { n: "03", word: "Create", line: "work worth looking at" },
  { n: "04", word: "Prove", line: "performance against the plan" },
  { n: "05", word: "Iterate", line: "keep what works, fix what doesn't" },
];

const INDUSTRIES = ["FMCG", "Telecoms", "Banking", "Spirits", "Tech", "Retail", "Travel"];

const WHY = [
  {
    n: "01",
    title: "Thirteen years in",
    line: "Beyond Home has planned, produced and mounted campaigns continuously since 2013.",
  },
  {
    n: "02",
    title: "Indoor and outdoor",
    line: "The same company covers a mall interior and a highway gantry, so a campaign stays consistent wherever it runs.",
  },
  {
    n: "03",
    title: "A blue-chip roster",
    line: "The team that answers your brief is the one Unilever, MTN and FMN already trust.",
  },
  {
    n: "04",
    title: "One roof",
    line: "Strategy, design, print and installation sit together in Ogba. Fewer handovers, fewer surprises.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 01 ——— hero */}
        <HomeHero />

        {/* 02 ——— who we are */}
        <Section id="who-we-are" index="01" eyebrow="Who we are" title="Media advertising, made in Lagos">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-24">
            <DisplayHeading
              size="lg"
              lines={["We put brands in front", "of the whole country."]}
            />
            <Prose lead className="lg:pt-3">
              <p>
                Beyond Home Limited is a media advertising solutions company,
                established in 2013 and headquartered in Ogba, Ikeja, Lagos.
                The work runs from indoor branding, signage and exhibition
                stands out to billboards, building wraps and vehicle fleets on
                roads across Nigeria.
              </p>
            </Prose>
          </div>
          <div className="mt-20">
            <StatLine
              columns={4}
              stats={[
                { value: "2013", label: "Established" },
                { value: "Lagos", label: "HQ · campaigns nationwide" },
                { value: "7", label: "Industries served" },
                { value: "1 roof", label: "Strategy to installation" },
              ]}
            />
          </div>
        </Section>

        {/* texture band: reach, between who-we-are and thinking */}
        <MediaBlock
          src="/hero/highway-aerial.jpg"
          alt="Aerial view of a highway interchange outside Lagos"
          caption="Fig. — the routes a campaign travels"
          className="rule py-section-sm"
        />

        {/* 03 ——— our thinking */}
        <Section index="02" eyebrow="Our thinking" title="The point of view behind the work">
          <DisplayHeading
            size="xl"
            lines={["Brands earn their place", "in people's lives."]}
            accent="earn"
          />
          <Prose lead className="mt-10">
            <p>
              We think the barrier between a brand and its audience can be
              removed, and that removing it is a discipline rather than a
              stroke of luck. Five steps run through every engagement we take
              on.
            </p>
          </Prose>
          <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {THINKING_STEPS.map((s) => (
              <li key={s.n} className="rule pt-5">
                <span className="font-mono text-caption tracking-[0.18em] text-gold">
                  {s.n}
                </span>
                <p className="type-display mt-3 text-display-sm text-paper">{s.word}</p>
                <p className="mt-2 text-sm text-smoke">{s.line}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 04 ——— featured work: one lead, four staggered */}
        <Section index="03" eyebrow="Featured work" title="Recent placements, at size">
          <FeaturedWork />
        </Section>

        {/* 05 ——— services: explorable index */}
        <Section index="04" eyebrow="Services" title="Six ways in, one team throughout">
          <ServicesExplorer />
        </Section>

        {/* 06 ——— industries + clientele */}
        <Section index="05" eyebrow="Clientele" title="Trusted by brands across Nigeria and beyond">
          <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
            {INDUSTRIES.join(" · ")}
          </p>
          <div className="mt-12">
            <ClientMarquee />
          </div>
          <p className="mt-12 max-w-[65ch] text-sm text-smoke">
            Names, not logos, on purpose: the work in the roster ranges from
            single storefront signs to nationwide campaigns, and every one was
            produced by the same in-house team.
          </p>
        </Section>

        {/* 07 ——— nationwide coverage map */}
        <Section index="06" eyebrow="Coverage" title="Where the work stands">
          <CoverageMap />
        </Section>

        {/* 08 ——— why beyond home */}
        <Section index="07" eyebrow="Why Beyond Home" title="What you hire when you hire us">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.n} className="rule pt-6">
                <span className="font-mono text-caption tracking-[0.18em] text-gold">
                  {w.n}
                </span>
                <h3 className="type-display mt-3 text-display-sm text-paper">
                  {w.title}
                </h3>
                <p className="mt-3 max-w-[50ch] text-body text-mist">{w.line}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* texture band: production quality, between why and leadership */}
        <MediaBlock
          src="/hero/harbour-wall.jpg"
          alt="A harbour photograph printed wall-to-wall inside a terminal"
          caption="Fig. — large format, printed and mounted indoors"
          className="rule py-section-sm"
        />

        {/* 09 ——— leadership */}
        <Section index="08" eyebrow="Leadership" title="The person behind the roof">
          <div className="grid items-end gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20">
            <div className="relative aspect-[292/434] max-w-sm overflow-hidden">
              <Image
                src="/images/team/olekan-oladimeji.jpg"
                alt="O'Lekan Oladimeji, CEO of Beyond Home, arms crossed in a beyondhome polo"
                fill
                sizes="(max-width: 768px) 100vw, 352px"
                className="img-grade object-cover"
              />
            </div>
            <div className="pb-2">
              <h3 className="type-display text-display-md text-paper">
                O&apos;Lekan Oladimeji
              </h3>
              <p className="mt-2 font-mono text-caption uppercase tracking-[0.18em] text-gold">
                Chief Executive Officer
              </p>
              <Prose lead className="mt-8">
                <p>
                  A media practitioner, and the reason strategy and
                  installation live in the same building. Clients deal with
                  one accountable team from the first brief to the final bolt.
                </p>
              </Prose>
            </div>
          </div>
        </Section>

        {/* 09 ——— testimonials (renders nothing until real quotes exist) */}
        <Testimonials />

        {/* 10 ——— closing CTA */}
        <section className="rule relative flex min-h-svh flex-col justify-center py-section">
          <div className="container-site">
            <p className="type-eyebrow mb-6">Start a project</p>
            <DisplayHeading
              size="xl"
              lines={["Tell us where you", "want to be seen."]}
              accent="seen."
            />
            <div className="mt-16 border-b border-[var(--hairline)]">
              {[
                {
                  label: "Email",
                  value: CONTACT.email,
                  href: `mailto:${CONTACT.email}`,
                },
                {
                  label: "Call",
                  value: CONTACT.phoneDisplay,
                  href: `tel:${CONTACT.phone}`,
                },
                {
                  label: "WhatsApp",
                  value: "Chat with the team",
                  href: CONTACT.whatsapp,
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="rule group grid grid-cols-[6rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[10rem_1fr] md:py-8"
                >
                  <span className="font-mono text-caption uppercase tracking-[0.18em] text-smoke transition-colors duration-fast ease-expo group-hover:text-gold">
                    {c.label}
                  </span>
                  <span className="type-display min-w-0 [overflow-wrap:anywhere] text-lg text-paper transition-transform duration-base ease-expo group-hover:translate-x-2 sm:text-display-sm">
                    {c.value}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-14">
              <MagneticButton href="/contact">Start a project</MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer compact />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
