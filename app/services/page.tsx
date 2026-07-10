import type { Metadata } from "next";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { WhatsAppFloat } from "@/components/chrome/whatsapp-float";
import { MobileBar } from "@/components/chrome/mobile-bar";
import { ServicesExplorer } from "@/components/home/services-explorer";

export const metadata: Metadata = {
  title: "Services — Advertising Agency in Lagos, Nigeria | Beyond Home",
  alternates: { canonical: "/services" },
  description:
    "Six services, one team: media strategy, social, digital, design, large format printing and signage, planned and installed from Lagos.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <section className="container-site py-[clamp(4rem,8vw,8rem)]">
          <p className="type-eyebrow mb-6">Services</p>
          <h1 className="type-display text-display-xl text-paper">
            Indoors to outdoors,
            <br />
            strategy to <span className="text-gold">steel.</span>
          </h1>
          <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-mist">
            Six ways into the same team. Whichever door you use, the plan, the
            artwork, the print and the installation stay in one building, and
            one crew answers for all of it.
          </p>

          <div className="mt-16 md:mt-20">
            <ServicesExplorer detailed />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
}
