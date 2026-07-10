import type { WorkMedia } from "@/lib/work";

/**
 * Selected Work — the lighter content type beside the six full case
 * studies. Each item is one asset plus a caption limited to what is
 * visibly true in the image: format, craft, placement, and a brand name
 * ONLY where it is unmistakably legible. No narratives, no invented
 * clients or locations. `todo` marks what the client must confirm; it is
 * never rendered to visitors.
 *
 * Sub-500px sources render as insets at natural size (never enlarged).
 */
export type GalleryItem = {
  id: string;
  media: WorkMedia;
  caption: string;
  /** service slugs from lib/services.ts (an item may serve several) */
  services: string[];
  /** TODO-CLIENT: details awaiting confirmation — internal only */
  todo?: string;
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g-actoriginal",
    media: {
      type: "image",
      src: "/images/work/actoriginal-unipole.jpg",
      alt: "Backlit unipole billboard over a busy road, campaign line reading Make Your Own Future",
      w: 656,
      h: 650,
    },
    caption: "Backlit unipole over a working road, twin-faced and lit for the evening run.",
    services: ["media-strategy-planning", "large-format-printing"],
    todo: "confirm brand and city for the #ActOriginal unipole",
  },
  {
    id: "g-roadside-unipole",
    media: {
      type: "image",
      src: "/images/work/roadside-unipole.jpg",
      alt: "Roadside unipole billboard photographed at dusk",
      w: 456,
      h: 484,
    },
    caption: "Roadside unipole at dusk, sited against the traffic flow.",
    services: ["media-strategy-planning"],
    todo: "confirm brand and location for the dusk unipole",
  },
  {
    id: "g-parimatch-finishing",
    media: {
      type: "image",
      src: "/images/work/parimatch-print-production.jpg",
      alt: "Two people trimming and finishing large Parimatch banner prints on a work table",
      w: 673,
      h: 714,
    },
    caption: "Parimatch banners at the finishing table: trimmed, checked and folded by hand.",
    services: ["large-format-printing"],
    todo: "confirm production location",
  },
  {
    id: "g-sunlight-lightbox",
    media: {
      type: "image",
      src: "/images/work/sunlight-billboard.jpg",
      alt: "Sunlight detergent campaign on a street-corner lightbox billboard above traffic",
      w: 330,
      h: 275,
    },
    caption: "Sunlight campaign on a street-corner lightbox, read from the junction below.",
    services: ["large-format-printing"],
    todo: "low-resolution source; confirm location and supply original photo",
  },
  {
    id: "g-rite-truck",
    media: {
      type: "image",
      src: "/images/work/rite-truck.jpg",
      alt: "Rite Foods delivery truck with branded cab and cargo box",
      w: 294,
      h: 314,
    },
    caption: "Rite Foods delivery truck, cab and box branded as one piece.",
    services: ["design-creative", "large-format-printing"],
    todo: "low-resolution source; supply original photo",
  },
  {
    id: "g-sales-flag",
    media: {
      type: "image",
      src: "/images/work/sales-office-flag.jpg",
      alt: "Teardrop flag marking a sales office entrance",
      w: 259,
      h: 275,
    },
    caption: "Teardrop flag marking a sales office from the road.",
    services: ["signs-signage"],
    todo: "low-resolution source; confirm brand and supply original photo",
  },
  {
    id: "g-paramount-hoarding",
    media: {
      type: "image",
      src: "/images/work/paramount-hoarding.jpg",
      alt: "Paramount Twin Towers construction hoarding with lit campaign panels along a walkway",
      w: 641,
      h: 752,
    },
    caption:
      "Paramount Twin Towers site hoarding: a continuous panel run, floodlit from above.",
    services: ["large-format-printing", "signs-signage"],
    todo: "confirm location and project attribution for the hoarding",
  },
  {
    id: "g-highway-survey",
    media: {
      type: "image",
      src: "/hero/highway-aerial.jpg",
      alt: "Aerial drone view of a highway interchange and its approach roads",
      w: 1280,
      h: 720,
    },
    caption: "Route survey over an interchange: the raw material of a media plan.",
    services: ["media-strategy-planning"],
    todo: "confirm location of the surveyed interchange",
  },
  {
    id: "g-clocktower",
    media: {
      type: "image",
      src: "/hero/clocktower-banner.jpg",
      alt: "Seasonal banner campaign hung down the face of a stone clock tower",
      w: 498,
      h: 1080,
    },
    caption: "Seasonal campaign banners hung the full face of a stone clock tower.",
    services: ["large-format-printing"],
    todo: "confirm location and project attribution for the clock tower banners",
  },
  {
    id: "g-airport-concourse",
    media: {
      type: "image",
      src: "/hero/airport-concourse.jpg",
      alt: "Bank campaign across an airport concourse: wall panels and floor graphics",
      w: 1000,
      h: 750,
    },
    caption: "Bank campaign taking over a concourse, wall panels to floor graphics.",
    services: ["large-format-printing", "design-creative"],
    todo: "confirm brand, location and project attribution for the concourse takeover",
  },
  {
    id: "g-normans",
    media: {
      type: "image",
      src: "/hero/normans-corridor.jpg",
      alt: "Normans trade brand takeover of an airport walkway, walls to floor",
      w: 1000,
      h: 750,
    },
    caption: "Normans takeover of a full walkway: walls, floor and ceiling line working together.",
    services: ["design-creative", "large-format-printing"],
    todo: "confirm location and project attribution",
  },
  {
    id: "g-rolex-wall",
    media: {
      type: "image",
      src: "/hero/rolex-wall.jpg",
      alt: "Rolex campaign printed wall-to-wall inside a terminal",
      w: 1280,
      h: 960,
    },
    caption: "Rolex campaign printed wall-to-wall, seams hidden across the panels.",
    services: ["large-format-printing"],
    todo: "confirm location and project attribution",
  },
  {
    id: "g-rolex-scale",
    media: {
      type: "image",
      src: "/hero/rolex-watch-wall.jpg",
      alt: "A visitor standing beside a wall-height watch print",
      w: 960,
      h: 1280,
    },
    caption: "A wall-height watch print, passer-by for scale.",
    services: ["large-format-printing"],
    todo: "confirm location and project attribution",
  },
  {
    id: "g-harbour-wall",
    media: {
      type: "image",
      src: "/hero/harbour-wall.jpg",
      alt: "Harbour photograph printed floor-to-ceiling as an interior wall graphic",
      w: 1280,
      h: 960,
    },
    caption: "A harbour scene printed floor-to-ceiling as one interior wall.",
    services: ["large-format-printing"],
    todo: "confirm location and project attribution",
  },
  {
    id: "g-lounge-walkthrough",
    media: {
      type: "video",
      base: "indoor-walkthrough",
      alt: "Walkthrough of a fitted and dressed show lounge",
      w: 478,
      h: 850,
    },
    caption: "Walkthrough of a fitted show lounge, furniture to shelf dressing.",
    services: ["design-creative", "signs-signage"],
    todo: "confirm project details for the show lounge",
  },
];

export function galleryByService(slug: string) {
  return GALLERY.filter((g) => g.services.includes(slug));
}
