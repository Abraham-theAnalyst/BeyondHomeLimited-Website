import type { Metadata } from "next";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { CinematicOpener } from "@/components/ui/cinematic-opener";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Beyond Home — Start a Project | Lagos, Nigeria",
  alternates: { canonical: "/contact" },
  description:
    "Send a brief, call, or WhatsApp the team in Ogba, Ikeja. Beyond Home plans, prints and installs advertising across Nigeria.",
};

const WA_PREFILLED = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hello Beyond Home, I'd like to discuss a project"
)}`;

const CHANNELS = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Call", value: "0806 010 7065", href: `tel:${CONTACT.phone}` },
  { label: "WhatsApp", value: "Chat with the team", href: WA_PREFILLED },
];

/* TODO-CLIENT: real social profile URLs (WhatsApp is live already) */
const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "WhatsApp", href: WA_PREFILLED },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1 ——— cinematic opener */}
        <CinematicOpener
          base="fmn-wrap-drone"
          posterAlt="Drone view along a Beyond Home building wrap"
        >
          <p className="type-eyebrow mb-6 text-mist">Contact</p>
          <h1 className="type-display text-display-xl text-paper">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="hero-line hero-line-1 block will-change-transform">
                Bring the brief.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="hero-line hero-line-2 block will-change-transform">
                We&apos;ll bring the <span className="text-gold">roof.</span>
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-mist">
            Strategy, design, print and installation, answered from one
            building in Ogba. Send the form, or skip it and call; both reach
            the same desk.
          </p>
        </CinematicOpener>

        {/* 2 ——— the form, with the icon as a quiet background mark */}
        <Section index="01" eyebrow="The brief" title="Tell us what needs to be seen" tight className="relative overflow-hidden">
          <Image
            src="/assets/logo-icon.png"
            alt=""
            aria-hidden
            width={435}
            height={456}
            className="pointer-events-none absolute -right-24 top-1/2 hidden w-[26rem] -translate-y-1/2 opacity-[0.05] grayscale lg:block"
          />
          <div className="relative">
            <ContactForm />
          </div>
        </Section>

        {/* 3 ——— direct channels */}
        <Section index="02" eyebrow="Direct" title="Skip the form" tight>
          <div className="border-b border-[var(--hairline)]">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.label === "WhatsApp"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
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
        </Section>

        {/* 4 ——— location + hours */}
        <Section index="03" eyebrow="Location" title="Ogba, Ikeja, Lagos" tight>
          <p className="mb-4 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
            6.627°N · 3.342°E — survey view
          </p>
          <MapEmbed />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="type-eyebrow mb-3">Address</p>
              <p className="max-w-[40ch] text-body-lg text-mist">
                Ogba, Ikeja, Lagos, Nigeria
              </p>
            </div>
            {/* TODO-CLIENT: confirm business hours — the times below are a
                standard default and are labelled unconfirmed on the page */}
            <div>
              <p className="type-eyebrow mb-3">Hours · to be confirmed</p>
              <p className="max-w-[40ch] text-body-lg text-mist">
                Monday to Friday, 9:00 to 17:00. WhatsApp is answered outside
                these hours when the team is on site.
              </p>
            </div>
          </div>
        </Section>

        {/* 5 ——— socials */}
        <Section eyebrow="Elsewhere" title="Find us online" tight>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {SOCIALS.map((s) => (
              /* TODO-CLIENT: replace href="#" with real profiles */
              <a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="link-underline text-body text-mist"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Footer compact />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
