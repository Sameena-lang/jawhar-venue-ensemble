// Real Jawhar Venue Assets
import jawharGrandMainHall from "@/assets/venues/jawhar-grand/jawhar-grand-main-hall.png";
import jawharGrandFacade from "@/assets/venues/jawhar-grand/jawhar-grand-facade.png";
import jawharGrandStage from "@/assets/venues/jawhar-grand/jawhar-grand-stage-celebration.png";
import jawharGrandFoyer from "@/assets/venues/jawhar-grand/jawhar-grand-foyer-dining.png";
import jawharGrandBuffet from "@/assets/venues/jawhar-grand/jawhar-grand-dining-buffet.png";

// Additional venue asset placeholders
import venueElite from "@/assets/venue-elite.jpg";
import venuePalace from "@/assets/venue-palace.jpg";
import venueGarden from "@/assets/venue-garden.jpg";
import venueConvention from "@/assets/venue-convention.jpg";

export const WHATSAPP_NUMBER = "919876543210";
export const PHONE_DISPLAY = "+91 98765 43210";

export interface VenueGalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "Venues" | "Weddings" | "Decor" | "Dining";
  caption: string;
}

export type GalleryImage = VenueGalleryItem;

export interface VenueVideoItem {
  src: string;
  embedUrl?: string;
  poster?: string;
  title: string;
  description?: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  capacity: string;
  area: string;
  description: string;
  story: string;
  heroImage: string;
  heroVideo?: string;
  thumbnailImage: string;
  image: string; // for backward compatibility with existing components
  facilities: string[];
  events: string[];
  gallery: VenueGalleryItem[];
  videos?: VenueVideoItem[];
  mapQuery: string;
}

// Cinematic Hero image using the real Jawhar Grand main chandelier hall
export const heroImage = jawharGrandMainHall;
// Homepage hero background video
export const heroVideo = "/videos/jawhar-homepage-hero.mp4";

export const EVENT_TYPES = [
  { name: "Wedding", description: "Sacred ceremonies framed by grand mandaps and timeless rituals." },
  { name: "Reception", description: "Glamorous evenings of fine dining, music and celebration." },
  { name: "Engagement", description: "Intimate beginnings hosted with understated elegance." },
  { name: "Seemantham", description: "Blessed traditions honoured in serene, beautiful settings." },
  { name: "Birthday", description: "Milestone moments designed with personal, joyful detail." },
  { name: "Anniversary", description: "Years of togetherness celebrated in refined style." },
  { name: "Corporate", description: "Conferences, launches and galas executed flawlessly." },
] as const;

export type EventType = (typeof EVENT_TYPES)[number]["name"];

export const SERVICES = [
  { name: "Venue", description: "Signature halls, lawns and terraces across five distinct properties." },
  { name: "Catering", description: "Multi-cuisine menus crafted by master chefs, from traditional feasts to global tables." },
  { name: "Decoration", description: "Bespoke floral artistry, mandaps, lighting and thematic stage design." },
  { name: "Photography", description: "Editorial wedding photographers who capture every fleeting emotion." },
  { name: "Videography", description: "Cinematic films and same-day edits that relive your celebration." },
  { name: "Accommodation", description: "Elegant rooms and suites for families and outstation guests." },
  { name: "Event Coordination", description: "A dedicated planner orchestrating every detail, end to end." },
] as const;

// Real Jawhar Grand Gallery Items
export const jawharGrandGallery: VenueGalleryItem[] = [
  {
    id: "jg-main-hall",
    src: jawharGrandMainHall,
    alt: "Jawhar Grand main chandelier hall with wedding seating and floral stage",
    category: "Venues",
    caption: "Main Ballroom with tiered crystal chandelier and wedding seating",
  },
  {
    id: "jg-facade",
    src: jawharGrandFacade,
    alt: "Jawhar Grand MM Tower exterior entrance and covered basement parking",
    category: "Venues",
    caption: "MM Tower grand entrance with celebratory welcoming arch",
  },
  {
    id: "jg-stage-decor",
    src: jawharGrandStage,
    alt: "Jawhar Grand celebration stage decor with floral backdrop and swing",
    category: "Decor",
    caption: "Bespoke celebration stage decor with floral arch and lighting",
  },
  {
    id: "jg-foyer-dining",
    src: jawharGrandFoyer,
    alt: "Jawhar Grand welcome foyer with frosted glass entrance and banquet arrangement",
    category: "Dining",
    caption: "Air-conditioned banquet foyer and dining reception area",
  },
  {
    id: "jg-buffet-setup",
    src: jawharGrandBuffet,
    alt: "Jawhar Grand dining hall with live sweet counters and banquet buffet warmers",
    category: "Dining",
    caption: "Live counters and traditional banquet dining arrangement",
  },
];

export const venues: Venue[] = [
  {
    id: "jawhar-grand",
    slug: "jawhar-grand",
    name: "Jawhar Grand",
    tagline: "The Flagship Ballroom",
    location: "MM Tower, Chennai",
    capacity: "1,200 guests",
    area: "28,000 sq.ft",
    description:
      "Our flagship chandeliered ballroom with soaring ceilings, velvet-draped stages and a regal foyer — the definitive address for grand weddings and celebrations.",
    story:
      "Jawhar Grand at MM Tower began as our family's promise: that a celebration deserves architecture worthy of its emotion. Beneath a canopy of brilliant crystal chandeliers, families gather to celebrate milestone weddings, sangeets, seemantham rituals and banquets. With dedicated reception foyers, central air conditioning, and convenient basement parking, Jawhar Grand sets the standard for memorable hospitality.",
    heroImage: jawharGrandMainHall,
    thumbnailImage: jawharGrandFacade,
    image: jawharGrandMainHall,
    facilities: [
      "Chandeliered pillar-less grand ballroom",
      "Air-conditioned banquet and dining foyer",
      "Dedicated celebratory stage & backdrop lighting",
      "Live food & traditional buffet counters",
      "Convenient basement parking facility",
      "Full power backup & climate control",
      "Bridal & family preparation rooms",
      "Grand covered entryway with steps",
    ],
    events: ["Wedding", "Reception", "Engagement", "Seemantham", "Birthday", "Corporate", "Anniversary"],
    gallery: jawharGrandGallery,
    mapQuery: "Jawhar Grand Party Hall, MM Tower, Chennai",
  },
  {
    id: "jawhar-elite-ar-tower",
    slug: "jawhar-elite-ar-tower",
    name: "Jawhar Elite AR Tower",
    tagline: "The Skyline Terrace",
    location: "OMR, Chennai",
    capacity: "600 guests",
    area: "18,500 sq.ft",
    description:
      "A glass-crowned tower venue with a sunset rooftop terrace — receptions suspended above the city, glittering beneath the stars.",
    story:
      "Perched above the city's hum, Jawhar Elite AR Tower was imagined for celebrations that touch the sky. As dusk paints the horizon in amber and rose, the terrace comes alive with ambient lighting. It is where modern romance meets metropolitan glamour — cocktail receptions, champagne toasts against a glittering skyline, and evenings your guests will recount for years.",
    heroImage: venueElite,
    heroVideo: "/videos/jawhar-elite-hero.mp4",
    thumbnailImage: venueElite,
    image: venueElite,
    facilities: [
      "Open-air rooftop terrace",
      "Panoramic skyline views",
      "Climate-controlled indoor hall",
      "Sunset ceremony deck",
      "Cocktail & lounge zones",
      "Premium AV & lighting rig",
      "Lift-served dedicated floors",
      "Basement valet parking",
    ],
    events: ["Reception", "Engagement", "Birthday", "Corporate", "Anniversary"],
    gallery: [
      {
        id: "elite-1",
        src: venueElite,
        alt: "Jawhar Elite AR Tower skyline terrace reception venue",
        caption: "Twilight receptions above the skyline",
        category: "Venues",
      },
    ],
    videos: [
      {
        src: "https://www.instagram.com/reel/Cz0N4DGv5ii/",
        embedUrl: "https://www.instagram.com/reel/Cz0N4DGv5ii/embed",
        poster: venueElite,
        title: "Celebrations at Jawhar Elite AR Tower",
        description: "Experience the vibrant ambiance, skyline views, and celebratory moments at Jawhar Elite AR Tower.",
      },
    ],
    mapQuery: "OMR, Chennai",
  },
  {
    id: "jawhar-grand-palace",
    slug: "jawhar-grand-palace",
    name: "Jawhar Grand Palace",
    tagline: "The Royal Heritage",
    location: "ECR, Chennai",
    capacity: "2,000 guests",
    area: "52,000 sq.ft",
    description:
      "A marble-columned palace of gilded staircases and throne-like mandaps — for weddings that deserve nothing less than royalty.",
    story:
      "Jawhar Grand Palace is an ode to timeless grandeur — sweeping architecture, majestic pillars, and spacious banquet layouts. Tradition is celebrated in style. For families who dream of a wedding that feels regal and unforgettable, the Palace stands as a monument to celebrated memories.",
    heroImage: venuePalace,
    heroVideo: "/videos/jawhar-palace-hero.mp4",
    thumbnailImage: venuePalace,
    image: venuePalace,
    facilities: [
      "Gilded royal mandap hall",
      "Marble grand staircase entry",
      "Two interconnecting halls",
      "Royal bridal chamber",
      "Traditional kitchen for rituals",
      "Ample vehicle parking",
      "Procession courtyard",
      "Guest accommodation block",
    ],
    events: ["Wedding", "Reception", "Seemantham", "Engagement"],
    gallery: [
      {
        id: "palace-1",
        src: venuePalace,
        alt: "Jawhar Grand Palace royal wedding hall",
        caption: "The royal mandap beneath soaring arches",
        category: "Venues",
      },
    ],
    mapQuery: "ECR, Chennai",
  },
  {
    id: "venue-4",
    slug: "venue-4",
    name: "Jawhar Garden Estate",
    tagline: "The Open-Air Lawn",
    location: "Injambakkam, Chennai",
    capacity: "1,500 guests",
    area: "2.5 acres of lawns",
    description:
      "Manicured pastel-green lawns, white pavilions and floral archways — an open-air estate for ceremonies kissed by sea breeze.",
    story:
      "Some celebrations belong under open sky. The Garden Estate spreads across two and a half acres of velvet lawn, where white pavilions rise between frangipani trees and the sea carries its blessing on the breeze. Morning seemanthams bathed in soft light, evening receptions beneath a canopy of stars.",
    heroImage: venueGarden,
    thumbnailImage: venueGarden,
    image: venueGarden,
    facilities: [
      "2.5-acre landscaped lawns",
      "White pavilion mandap",
      "Floral archway processional",
      "Weather contingency marquee",
      "Lakeside photo points",
      "Ample open parking",
      "Outdoor catering stations",
      "Guest shuttle service",
    ],
    events: ["Wedding", "Seemantham", "Birthday", "Anniversary", "Reception"],
    gallery: [
      {
        id: "garden-1",
        src: venueGarden,
        alt: "Jawhar Garden Estate open air lawn venue",
        caption: "Pavilions and petals on the great lawn",
        category: "Venues",
      },
    ],
    mapQuery: "Injambakkam, Chennai",
  },
  {
    id: "venue-5",
    slug: "venue-5",
    name: "Jawhar Convention Centre",
    tagline: "The Grand Conclave",
    location: "Guindy, Chennai",
    capacity: "800 guests",
    area: "22,000 sq.ft",
    description:
      "A sophisticated convention hall of warm wood and brass — conferences, product launches and gala dinners at corporate perfection.",
    story:
      "The Convention Centre speaks a quieter luxury: warm walnut panelling, sculptural brass lighting, and acoustics tuned to perfection. It is the stage for ideas that matter — keynote summits, product unveilings, award galas — and for celebrations in contemporary, understated elegance.",
    heroImage: venueConvention,
    thumbnailImage: venueConvention,
    image: venueConvention,
    facilities: [
      "Pillar-less convention hall",
      "4K LED wall & stage",
      "Breakout meeting rooms",
      "Business lounge",
      "Simultaneous translation booths",
      "In-house banquet team",
      "Direct highway access",
      "Dedicated loading dock",
    ],
    events: ["Corporate", "Birthday", "Anniversary", "Reception", "Engagement"],
    gallery: [
      {
        id: "convention-1",
        src: venueConvention,
        alt: "Jawhar Convention Centre banquet and corporate hall",
        caption: "The conclave hall in banquet style",
        category: "Venues",
      },
    ],
    mapQuery: "Guindy, Chennai",
  },
];

// All Gallery images combining real Jawhar photographs
export const allGalleryImages: VenueGalleryItem[] = jawharGrandGallery.map((g) => ({
  ...g,
  caption: `${g.caption} — Jawhar Grand`,
}));

export function getVenue(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug || (slug === "jawhar-garden-estate" && v.slug === "venue-4") || (slug === "jawhar-convention-centre" && v.slug === "venue-5"));
}

/** Deterministic pseudo-booked dates for demo availability */
export function isDateBooked(slug: string, isoDate: string): boolean {
  let h = 0;
  const s = slug + isoDate;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 5 < 2; // ~40% booked
}

export function recommendedVenuesFor(event: EventType): Venue[] {
  const matched = venues.filter((v) => v.events.includes(event));
  return matched.length >= 3 ? matched.slice(0, 3) : [...matched, ...venues.filter((v) => !matched.includes(v))].slice(0, 3);
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
