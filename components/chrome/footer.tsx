import Image from "next/image";
import Link from "next/link";
import { DisplayHeading } from "@/components/ui/display-heading";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { UnderlineLink } from "@/components/ui/underline-link";

const EXPLORE = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* TODO-CLIENT: replace href="#" with the company's real profiles */
const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X (Twitter)", href: "#" },
];

export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className="rule">
      {/* Closing statement — omitted where the page ends on its own CTA */}
      {!compact && (
        <div className="container-site py-section">
          <p className="type-eyebrow mb-6">Next step</p>
          <DisplayHeading
            as="p"
            size="xl"
            lines={["Put your brand", "where Nigeria looks."]}
            accent="looks."
          />
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <MagneticButton href="/contact">Start a project</MagneticButton>
            <UnderlineLink href="https://wa.me/2348060107065" external>
              Chat on WhatsApp
            </UnderlineLink>
          </div>
        </div>
      )}

      {/* Channels + link columns */}
      <div
        className={`${compact ? "" : "rule "}container-site grid gap-12 py-14 md:grid-cols-[1fr_auto_auto] md:gap-24`}
      >
        <div className="space-y-5">
          <Image
            src="/assets/logo-wordmark.png"
            alt="beyondhome"
            width={150}
            height={34}
            className="h-6 w-auto"
          />
          <address className="space-y-1 text-body not-italic text-smoke">
            <p>Ogba, Ikeja, Lagos, Nigeria</p>
            <p>
              <a
                href="mailto:info@beyondhome.com.ng"
                className="link-underline text-mist"
              >
                info@beyondhome.com.ng
              </a>
            </p>
            <p>
              <a href="tel:+2348060107065" className="link-underline text-mist">
                +234 806 010 7065
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Footer">
          <p className="type-eyebrow mb-4">Explore</p>
          <ul className="space-y-2">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-body text-mist">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="type-eyebrow mb-4">Follow</p>
          <ul className="space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                {/* TODO-CLIENT: real profile URL */}
                <a href={s.href} className="link-underline text-body text-mist">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal line */}
      <div className="rule container-site flex flex-col justify-between gap-2 py-6 pb-24 sm:flex-row md:pb-6">
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          © {new Date().getFullYear()} Beyond Home Limited
        </p>
        {/* right padding clears the fixed WhatsApp pill on desktop */}
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke md:pr-40">
          Marketing &amp; strategy consulting · Est. 2013
        </p>
      </div>
    </footer>
  );
}
