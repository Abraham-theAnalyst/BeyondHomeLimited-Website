import type { Metadata } from "next";
import Image from "next/image";
import { CinematicOpener } from "@/components/ui/cinematic-opener";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { EnquiryTrigger } from "@/components/chrome/enquiry-trigger";
import { Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { StatLine } from "@/components/ui/stat-line";
import { DisplayHeading } from "@/components/ui/display-heading";
import { ProcessSteps, type ProcessStep } from "@/components/services/process-steps";
import { ClientMarquee } from "@/components/home/client-marquee";
import { CoverageMap } from "@/components/home/coverage-map";

export const metadata: Metadata = {
  title: "About Beyond Home — Media Advertising Company in Lagos, Nigeria",
  alternates: { canonical: "/about" },
  description:
    "Beyond Home Limited: a media advertising solutions company in Ogba, Ikeja, Lagos, working from indoor branding to nationwide outdoor campaigns since 2013.",
};

/* About runs the fuller six-step version of the working method. */
const METHOD: ProcessStep[] = [
  {
    n: "01",
    title: "Examine",
    body: "We start where the brand already lives: its sites, its stores, its competitors, and the routes its audience travels every day.",
  },
  {
    n: "02",
    title: "Analyse",
    body: "Objectives get costed against real options. Formats, locations, timing and budget go on one sheet, and the sheet has to add up.",
  },
  {
    n: "03",
    title: "Create",
    body: "Concepts, artwork and production run in-house, so the idea that was approved is the object that gets built.",
  },
  {
    n: "04",
    title: "Prove",
    body: "The work goes up and gets checked standing on the site, at the distance and speed it is actually read.",
  },
  {
    n: "05",
    title: "Iterate",
    body: "What performs stays. What underperforms gets adjusted while the campaign is still running, not after it ends.",
  },
  {
    n: "06",
    title: "Evaluate",
    body: "Each round closes with a plain-language report, and the report becomes the first page of the next brief.",
  },
];

const TEAM = [
  { name: "Caroline Olanrewaju", role: "Finance Manager" },
  { name: "Oluwatosin Olushola", role: "Creative / General Manager" },
  { name: "Sanni Isreal", role: "Social Media Manager" },
  { name: "Mercy Bassey", role: "Audit & Control Manager" },
  { name: "Anslem Kelechi", role: "Team Lead" },
  { name: "Enang Emmanuel", role: "Creative Director" },
];

/* TODO-CLIENT: awards, certifications and memberships (e.g. APCON, OAAN)
   are unconfirmed and intentionally absent. Add a section here once the
   client supplies verifiable details. */

const INDUSTRIES = ["FMCG", "Telecoms", "Banking", "Spirits", "Tech", "Retail", "Travel"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1 ——— cinematic opener */}
        <CinematicOpener
          base="orijin-led-night"
          posterAlt="An LED tower running a campaign over a Nigerian roundabout at night"
          className="min-h-[80svh]"
        >
          <p className="type-eyebrow mb-6 text-mist">About Beyond Home</p>
          <h1 className="type-display text-display-xl text-paper">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="hero-line hero-line-1 block will-change-transform">
                Built in Lagos.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="hero-line hero-line-2 block will-change-transform">
                Seen <span className="text-gold">everywhere.</span>
              </span>
            </span>
          </h1>
        </CinematicOpener>

        {/* 2 ——— the story */}
        <Section index="01" eyebrow="The story" title="From indoors, outwards">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <Prose lead>
              <p>
                Beyond Home Limited is a media advertising solutions company,
                established in 2013 and headquartered in Ogba, Ikeja, Lagos.
                It began with indoor work: retail branding, signage and
                exhibition stands. The formats grew with the client list, out
                to vehicle fleets, billboards and building wraps on roads
                across Nigeria.
              </p>
            </Prose>
            <Prose lead>
              <p>
                The structure never changed along the way. Strategy, design,
                production and installation still sit in one building, run by
                one team, and a client deals with the same people from the
                first brief to the final bolt.
              </p>
            </Prose>
          </div>
          <div className="mt-20">
            <StatLine
              columns={4}
              stats={[
                { value: "2013", label: "Established" },
                { value: "Lagos", label: "HQ · Ogba, Ikeja" },
                { value: "7", label: "Industries served" },
                { value: "1 roof", label: "Strategy to installation" },
              ]}
            />
          </div>
        </Section>

        {/* 3 ——— what we believe */}
        <Section index="02" eyebrow="What we believe" title="The working point of view">
          <DisplayHeading
            size="xl"
            lines={["The distance between a brand", "and its people can be", "closed."]}
            accent="closed."
          />
          <Prose lead className="mt-10">
            <p>
              A brand earns its seat in the heart of its audience; nobody can
              buy one. Earning it is a method rather than a mood, and the
              method has six steps.
            </p>
          </Prose>
          <div className="mt-16">
            <ProcessSteps steps={METHOD} large />
          </div>
        </Section>

        {/* 4 ——— leadership */}
        {/* TODO-CLIENT: high-resolution CEO portrait (source is a 292px
            document crop, displayed small on purpose). */}
        <Section index="03" eyebrow="Leadership" title="The person behind the roof">
          <div className="grid items-end gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-20">
            <div className="border border-[var(--hairline)] bg-coal p-4">
              <div className="relative aspect-[292/434]">
                <Image
                  src="/images/team/olekan-oladimeji.jpg"
                  alt="O'Lekan Oladimeji, CEO of Beyond Home, arms crossed in a beyondhome polo"
                  fill
                  sizes="(max-width: 768px) 90vw, 288px"
                  className="img-grade object-cover"
                />
              </div>
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
                  An experienced media practitioner, and the reason strategy
                  and installation answer to one desk. Clients get one
                  accountable team, and he runs it.
                </p>
              </Prose>
            </div>
          </div>
        </Section>

        {/* 5 ——— the team */}
        {/* TODO-CLIENT: proper team photography — source photos are
            low-resolution document crops, so monograms stand in. */}
        <Section index="04" eyebrow="The team" title="Who answers the brief">
          <div className="border-b border-[var(--hairline)]">
            {TEAM.map((t) => (
              <div
                key={t.name}
                className="rule group grid grid-cols-[4.5rem_1fr] items-center gap-6 py-5 md:grid-cols-[5.5rem_1fr_minmax(0,18rem)]"
              >
                <span
                  aria-hidden
                  className="type-display flex h-14 w-14 items-center justify-center border border-[var(--hairline)] bg-coal text-xl text-smoke transition-colors duration-base ease-expo group-hover:border-gold group-hover:text-gold md:h-16 md:w-16"
                >
                  {initials(t.name)}
                </span>
                <span className="type-display text-display-sm text-paper">{t.name}</span>
                <span className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                  {t.role}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* 6 ——— clients & industries */}
        <Section index="05" eyebrow="Clientele" title="The roster the work built">
          <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
            {INDUSTRIES.join(" · ")}
          </p>
          <div className="mt-12">
            <ClientMarquee />
          </div>
          <p className="mt-12 max-w-[65ch] text-sm text-smoke">
            Some of these names arrived for one sign and stayed for whole
            campaigns. The roster spans seven industries, and every mark on it
            was earned by delivered work, which is why they appear as names
            rather than borrowed logos.
          </p>
        </Section>

        {/* 7 ——— coverage */}
        <Section index="06" eyebrow="Coverage" title="Where the work stands">
          <CoverageMap />
        </Section>

        {/* 8 ——— closing CTA */}
        <section className="rule py-section-sm">
          <div className="container-site flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="type-eyebrow mb-4">Next</p>
              <p className="type-display max-w-2xl text-display-lg text-paper">
                Now you know the company. Show us the brief.
              </p>
            </div>
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
