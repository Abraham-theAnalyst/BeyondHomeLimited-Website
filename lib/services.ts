/**
 * The six service lines — single source of truth for the homepage index,
 * /services, and each /services/[slug] page.
 */
export type ServiceMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; base: string; alt: string } // /hero/<base>.webm|.mp4|-poster.jpg
  | { type: "designed"; variant: "plan" | "cadence"; alt: string }; // bespoke SVG

export type Service = {
  slug: string;
  index: string;
  title: string;
  /** One-line value proposition, visible on index rows. */
  line: string;
  /** What this service does for a brand's business, concretely. */
  positioning: string;
  deliverables: string[];
  /** One sharp line on how the four-step process lands for this service. */
  processNote: string;
  /** Strongest available asset for the interactive index reveal. */
  media: ServiceMedia;
  /** Case study slugs from lib/work.ts. Curated nearest-by-tag when the
      service has no direct study — never an empty section. */
  relatedWork: string[];
  relatedServices: string[];
  meta: { title: string; description: string };
};

export const SERVICES: Service[] = [
  {
    slug: "media-strategy-planning",
    index: "01",
    title: "Media Strategy & Planning",
    line: "Channel plans and placements built around how your audience actually moves.",
    positioning:
      "An ad only works where someone actually sees it. Media strategy decides where the budget stands: which roads, which screens, which neighbourhoods, and at what weight. We plan against movement patterns and site conditions, then buy placements we can defend line by line.",
    deliverables: [
      "Channel and format planning",
      "OOH site selection and buying",
      "Campaign scheduling and weighting",
      "Budget allocation across channels",
      "Post-campaign reporting",
    ],
    processNote:
      "In strategy work the Analyse step carries the most weight. A good media plan is mostly good arithmetic.",
    media: {
      type: "designed",
      variant: "plan",
      alt: "Diagram of a media plan: routes drawn from one hub to placement sites",
    },
    relatedWork: ["the-macallan-abuja", "orijin-at-every-scale", "savana-expressway-gantry"],
    relatedServices: ["design-creative", "large-format-printing"],
    meta: {
      title: "Media Strategy & Planning in Lagos, Nigeria | Beyond Home",
      description:
        "Channel plans, OOH site selection and campaign scheduling from a Lagos team that installs what it plans. Working across Nigeria since 2013.",
    },
  },
  {
    slug: "social-media-marketing",
    index: "02",
    title: "Social Media Marketing",
    line: "Content, community and paid social, run to a calendar and measured.",
    positioning:
      "A feed is a placement like any other, and it rewards the same discipline. We run content calendars, manage the conversation and put paid spend behind the posts that earn it, then report what worked in plain language.",
    deliverables: [
      "Content calendars and production",
      "Community management",
      "Paid social campaigns",
      "Campaign-tied social pushes",
      "Plain-language monthly reporting",
    ],
    processNote:
      "Social runs the four-step loop weekly rather than per campaign; iteration is the format.",
    media: {
      type: "designed",
      variant: "cadence",
      alt: "Diagram of a posting calendar with a steady weekly rhythm",
    },
    relatedWork: ["closeup-street-level", "goodlife-magik-fleet"],
    relatedServices: ["digital-marketing", "design-creative"],
    meta: {
      title: "Social Media Marketing Agency in Lagos | Beyond Home",
      description:
        "Content calendars, community management and paid social, run to a plan and reported plainly. A Lagos team working Nigerian audiences.",
    },
  },
  {
    slug: "digital-marketing",
    index: "03",
    title: "Digital Marketing",
    line: "Search, display and email that pull their weight alongside the outdoor work.",
    positioning:
      "Search, display and email do the quiet work between campaigns. We build the digital layer that catches the demand outdoor creates: ads people can click, pages worth landing on, and tracking that ties the two together.",
    deliverables: [
      "Search and display campaigns",
      "Email marketing",
      "Landing pages",
      "Remarketing",
      "Analytics and conversion tracking",
    ],
    processNote:
      "Digital gives the Evaluate step real numbers; tracking is set up before the first ad runs.",
    media: {
      type: "video",
      base: "orijin-led-night",
      alt: "An LED spectacular playing an Orijin campaign at night",
    },
    relatedWork: ["orijin-at-every-scale", "savana-expressway-gantry"],
    relatedServices: ["social-media-marketing", "media-strategy-planning"],
    meta: {
      title: "Digital Marketing Services, Lagos, Nigeria | Beyond Home",
      description:
        "Search, display, email and landing pages that catch the demand your outdoor campaigns create. Set up, run and measured from Lagos.",
    },
  },
  {
    slug: "design-creative",
    index: "04",
    title: "Design & Creative",
    line: "Campaign ideas and artwork designed to survive the street.",
    positioning:
      "The street is a hostile gallery: two seconds of attention, harsh light, a hundred other messages in eyeshot. We design for those conditions. Ideas that land at a glance, and artwork produced correctly for every format that carries it.",
    deliverables: [
      "Campaign concepts and key visuals",
      "Format adaptation, indoor to outdoor",
      "Print-ready production artwork",
      "Motion versions for LED screens",
      "Brand application guidelines",
    ],
    processNote:
      "For creative, Examine means the site itself: artwork is judged at the distance it will be read from.",
    media: {
      type: "image",
      src: "/images/work/closeup-tricycle.jpg",
      alt: "A tricycle in a full Closeup campaign wrap",
    },
    relatedWork: ["golden-penny-abuja-wrap", "goodlife-magik-fleet", "closeup-street-level"],
    relatedServices: ["large-format-printing", "social-media-marketing"],
    meta: {
      title: "Design & Creative Studio, Lagos | Beyond Home",
      description:
        "Campaign ideas and artwork built to survive the street: key visuals, format adaptation and print-ready files from one Lagos studio.",
    },
  },
  {
    slug: "large-format-printing",
    index: "05",
    title: "Large Format Printing",
    line: "In-house production, from first proof to weatherproof final print.",
    positioning:
      "Printing is where a campaign becomes an object. Our production floor takes artwork from proof to weatherproof final print on machines we run ourselves, checked at each stage by the same team that will install the result.",
    deliverables: [
      "Trade show displays",
      "Banner stands",
      "Outdoor displays, billboards and wraps",
      "Event decoration",
      "Vehicle graphics",
      "Finishing and lamination",
    ],
    processNote:
      "In print, Create and Evaluate share a floor: proofs are approved beside the machine that runs them.",
    media: {
      type: "image",
      src: "/images/work/savana-billboard.jpg",
      alt: "A printed Savana billboard over a highway",
    },
    relatedWork: ["golden-penny-abuja-wrap", "the-macallan-abuja", "savana-expressway-gantry"],
    relatedServices: ["signs-signage", "design-creative"],
    meta: {
      title: "Large Format Printing in Lagos, Nigeria | Beyond Home",
      description:
        "Trade show displays, banner stands, outdoor displays and event decoration, printed in-house in Ogba and installed across Nigeria.",
    },
  },
  {
    slug: "signs-signage",
    index: "06",
    title: "Signs & Signage",
    line: "Storefronts, neon and wayfinding, fabricated and installed by our own team.",
    positioning:
      "A sign is the one ad a business never turns off. We fabricate and install signage that works every trading hour: storefronts that read from the road, lettering in light, and wayfinding people follow without thinking about it.",
    deliverables: [
      "Fascia signs",
      "Pylon signs",
      "Neon and LED lettering",
      "Wayfinding systems",
      "Installation and maintenance",
    ],
    processNote:
      "Signage adds an unwritten fifth step: maintenance. A sign is only finished while it still lights.",
    media: {
      type: "video",
      base: "night-roundabout",
      alt: "A lit LED sign holding a roundabout at night",
    },
    relatedWork: ["bigi-neon-counter", "orijin-at-every-scale", "closeup-street-level"],
    relatedServices: ["large-format-printing", "design-creative"],
    meta: {
      title: "Signs & Signage Company in Lagos, Nigeria | Beyond Home",
      description:
        "Fascia signs, pylon signs, neon lettering and wayfinding, fabricated in-house and installed by our own team across Nigeria.",
    },
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
