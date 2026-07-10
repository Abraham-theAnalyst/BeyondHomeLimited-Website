import { CONTACT, COMPANY } from "@/lib/site";

/**
 * Canonical origin. Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL (set this in Vercel; the final domain once live)
 * 2. Vercel's own URLs, so previews and the .vercel.app deployment get
 *    working absolute og:image/canonical/sitemap URLs automatically
 * 3. the intended production domain (TODO-CLIENT: confirm)
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://beyondhome.com.ng");

/**
 * Organization schema: AdvertisingAgency (a LocalBusiness subtype).
 * openingHours mirrors the unconfirmed default shown on /contact
 * (TODO-CLIENT to confirm); sameAs waits for real social URLs.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    foundingDate: "2013",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ogba",
      addressLocality: "Ikeja",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.627,
      longitude: 3.342,
    },
    // TODO-CLIENT: confirm hours (shown as unconfirmed on /contact)
    openingHours: "Mo-Fr 09:00-17:00",
    // TODO-CLIENT: add real social profile URLs when supplied
    // sameAs: [],
    areaServed: { "@type": "Country", name: "Nigeria" },
  };
}

export function serviceJsonLd(s: {
  title: string;
  slug: string;
  positioning: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.positioning,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Nigeria" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
