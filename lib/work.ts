/**
 * Case studies. HONESTY RULE: no invented metrics, dates, results or quotes.
 * `year`, `results` and `quote` are TODO-CLIENT: they ship null and their
 * sections render only when real data replaces the null.
 *
 * Media entries carry natural dimensions so layouts can cap display size —
 * nothing renders larger than its source can support.
 */

export type WorkImage = {
  type: "image";
  src: string;
  alt: string;
  w: number;
  h: number;
};

export type WorkVideo = {
  type: "video";
  /** /hero/<base>.webm|.mp4|-poster.jpg */
  base: string;
  alt: string;
  w: number;
  h: number;
};

export type WorkMedia = WorkImage | WorkVideo;

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** slugs from lib/services.ts */
  services: string[];
  industry: string;
  intro: string;
  hero: WorkMedia;
  /** Small hero sources render as an inset composition, never enlarged. */
  heroInset?: boolean;
  gallery: WorkMedia[];
  year: string | null; // TODO-CLIENT: confirm project year
  challenge: string;
  approach: string;
  execution: string;
  /** Pull-line for a typographic interlude — used to pace studies with
      thin galleries instead of repeating a photo. */
  pull?: string;
  results: string[] | null; // TODO-CLIENT: real, verifiable outcomes only
  quote: { text: string; name: string; role: string } | null; // TODO-CLIENT
  published: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "golden-penny-abuja-wrap",
    title: "The wrap over Abuja",
    client: "Golden Penny (FMN)",
    services: ["large-format-printing", "design-creative"],
    industry: "FMCG",
    intro:
      "Golden Penny's family campaign, printed at building scale and mounted over Abuja.",
    hero: {
      type: "image",
      src: "/hero/fmn-wrap-aerial.jpg",
      alt: "Aerial view of the Golden Penny campaign wrapped over a high-rise in Abuja",
      w: 1280,
      h: 720,
    },
    gallery: [
      {
        type: "image",
        src: "/hero/fmn-wrap-aerial-2.jpg",
        alt: "Second aerial angle of the Golden Penny building wrap",
        w: 1280,
        h: 720,
      },
      {
        type: "video",
        base: "fmn-wrap-drone",
        alt: "Drone pass along the finished Golden Penny wrap",
        w: 832,
        h: 464,
      },
    ],
    year: null,
    challenge:
      "A campaign built on family warmth had to survive the least warm format in the trade: a bare high-rise facade, read from a dual carriageway at speed. Whatever went up had to land at a glance and hold together across hundreds of square metres of mesh.",
    approach:
      "We treated the building as a single sheet. The artwork was rebuilt for distance: bigger faces, shorter copy, and colour blocks that keep their shape when wind moves the mesh.",
    execution:
      "Printed in sections in-house, then rigged panel by panel by our installation crew. The drone pass in the gallery is the site check, flown once the last panel was tensioned.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "the-macallan-abuja",
    title: "Single malt on a city block",
    client: "The Macallan",
    services: ["large-format-printing", "media-strategy-planning"],
    industry: "Spirits",
    intro:
      "The Crafted Without Compromise campaign, hung high over a working Abuja street.",
    hero: {
      type: "image",
      src: "/images/work/macallan-building-wrap.jpg",
      alt: "The Macallan campaign covering a building above a busy Abuja street",
      w: 653,
      h: 390,
    },
    gallery: [],
    year: null,
    challenge:
      "Luxury whisky asks for gallery conditions. A street offers traffic, dust and hard daylight. The job was to keep a premium campaign premium while it hangs over a working road.",
    approach:
      "Restraint. One image, one line, a black field, mounted high with clean sight lines. In this category the placement does the whispering.",
    execution:
      "Large-format print with deep blacks that hold in daylight, installed above street level and checked from the road, where it is actually read.",
    pull: "In this category, the placement does the whispering.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "orijin-at-every-scale",
    title: "Orijin, at every scale",
    client: "Orijin",
    services: ["media-strategy-planning", "signs-signage"],
    industry: "Spirits",
    intro:
      "A tank-sized can on the ground and an LED spectacular over a roundabout, one campaign between them.",
    hero: {
      type: "image",
      src: "/images/work/orijin-tank.jpg",
      alt: "Tank-sized Orijin can installation among palm trees",
      w: 673,
      h: 708,
    },
    gallery: [
      {
        type: "video",
        base: "orijin-led-night",
        alt: "Three-face Orijin LED tower running the campaign at night",
        w: 832,
        h: 464,
      },
      {
        type: "video",
        base: "night-roundabout",
        alt: "Night aerial of the LED unipole holding a roundabout",
        w: 832,
        h: 464,
      },
    ],
    year: null,
    challenge:
      "Make a drinks brand impossible to miss without leaning on a single conventional billboard.",
    approach:
      "Scale and light. A can fabricated at tank size from the actual label art, seams and all, and a three-face LED tower that runs the campaign after dark, when the roundabout is busiest.",
    execution:
      "Steel, vinyl and paint for the can; synchronised screens for the tower. Both builds were made to be filmed as much as seen, and the night footage in the gallery comes straight off the site.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "goodlife-magik-fleet",
    title: "A fleet that works as media",
    client: "Goodlife Magik",
    services: ["design-creative", "large-format-printing"],
    industry: "FMCG",
    intro:
      "Goodlife Magik's flavours, wrapped over delivery trucks that cross the city all day.",
    hero: {
      type: "image",
      src: "/images/work/goodlife-truck.jpg",
      alt: "Delivery truck in a full Goodlife Magik wrap",
      w: 673,
      h: 715,
    },
    gallery: [],
    year: null,
    challenge:
      "A plain delivery truck is a wasted billboard. The fleet already covers more of the city in a day than most placements see in a month; the job was to make every route count.",
    approach:
      "Full wraps, not door decals. The artwork bleeds across panels, gates and frames so the truck reads as one piece from any angle, moving or parked.",
    execution:
      "Vinyl printed and laminated in-house, applied panel by panel and trimmed around the hardware. Built to survive loading bays, not just photographs.",
    pull: "A route the city already drives is a placement nobody bills you for twice.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "closeup-street-level",
    title: "Closeup, at street level",
    client: "Closeup (Unilever)",
    services: ["design-creative", "signs-signage"],
    industry: "FMCG",
    intro:
      "A wrapped tricycle in traffic and a wall graphic at the counter, meeting the same customer twice.",
    hero: {
      type: "image",
      src: "/images/work/closeup-tricycle.jpg",
      alt: "Tricycle in a full Closeup campaign wrap",
      w: 633,
      h: 672,
    },
    gallery: [
      {
        type: "image",
        src: "/images/work/closeup-wall-mural.jpg",
        alt: "Closeup character wall graphic beside a shop counter",
        w: 273,
        h: 290,
      },
    ],
    year: null,
    challenge:
      "Toothpaste is bought on habit, and habits break at odd moments: the commute, the corner shop, the queue.",
    approach:
      "Two placements, one look. A keke carries the campaign through traffic more slowly than any billboard passes, and a wall graphic meets the same customer again at the point of sale.",
    execution:
      "The tricycle wrap is cut vinyl over a curved, working vehicle, the least forgiving canvas in the fleet trade. The wall piece went up at the eye level of a queue, sized to its room.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "savana-expressway-gantry",
    title: "Two seconds over the expressway",
    client: "Savana (Euro Global)",
    services: ["large-format-printing", "media-strategy-planning"],
    industry: "FMCG",
    intro:
      "Savana's full range on one gantry board, read from the far carriageway.",
    hero: {
      type: "image",
      src: "/images/work/savana-billboard.jpg",
      alt: "Savana fruit drink campaign on a gantry billboard over a highway",
      w: 673,
      h: 714,
    },
    gallery: [],
    year: null,
    challenge:
      "A gantry board gets read in about two seconds. The campaign had to land the brand, the range and the line inside that window.",
    approach:
      "The whole range on one face, colour-coded by flavour, with a single line doing the only reading required.",
    execution:
      "Printed as one continuous face and mounted over live traffic. Rigging above a road that never closes is half the trade.",
    pull: "Brand, range and line, landed inside two seconds.",
    results: null,
    quote: null,
    published: true,
  },
  {
    slug: "bigi-neon-counter",
    title: "The counter you can find in the dark",
    client: "Bigi (Rite Foods)",
    services: ["signs-signage"],
    industry: "FMCG",
    intro: "Bigi's snack counter, lettered in light and running all evening.",
    hero: {
      type: "image",
      src: "/images/work/bigi-neon-signage.jpg",
      alt: "Neon-style Bigi signage glowing over a snack counter",
      w: 264,
      h: 280,
    },
    heroInset: true,
    gallery: [],
    year: null,
    challenge:
      "Retail signage competes with everything else that glows. A snack counter had to be findable from across a dark interior.",
    approach:
      "Lettering in light, in the brand's own palette, mounted where the eye lands first and wired to run every trading hour.",
    execution:
      "Fabricated letter by letter, mounted over the counter with the cabling out of sight. The photograph shows the sign as found, mid-service.",
    pull: "A sign is the one ad a business never turns off.",
    results: null,
    quote: null,
    published: true,
  },
];

export const PUBLISHED = PROJECTS.filter((p) => p.published);

export function getProject(slug: string) {
  return PUBLISHED.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = PUBLISHED.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return PUBLISHED[(i + 1) % PUBLISHED.length];
}
