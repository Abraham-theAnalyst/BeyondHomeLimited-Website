import type { Metadata } from "next";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { WorkGallery } from "@/components/work/work-gallery";
import { PUBLISHED } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Outdoor Advertising Projects in Nigeria | Beyond Home",
  alternates: { canonical: "/work" },
  description:
    "Building wraps, LED spectaculars, fleet branding, signage and street-level campaigns, designed, printed and installed by Beyond Home across Nigeria.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="container-site py-[clamp(4rem,8vw,8rem)]">
          <p className="type-eyebrow mb-6">Work</p>
          <h1 className="type-display text-display-xl text-paper">
            Built to be
            <br />
            looked <span className="text-gold">at.</span>
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-xl text-body-lg leading-relaxed text-mist">
              Every project here was designed, printed and installed by the
              same team in Ogba. Formats range from a lit snack counter to a
              high-rise facade; the standard doesn&apos;t.
            </p>
            <p className="shrink-0 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
              {PUBLISHED.length} projects · more on request
            </p>
          </div>

          <div className="mt-12">
            <WorkGallery projects={PUBLISHED} />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
