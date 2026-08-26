import heroWedding from "@/assets/hero-wedding.jpg";
import venueGrand from "@/assets/venue-grand.jpg";
import venueElite from "@/assets/venue-elite.jpg";
import venuePalace from "@/assets/venue-palace.jpg";
import venueGarden from "@/assets/venue-garden.jpg";
import venueConvention from "@/assets/venue-convention.jpg";
import galleryDecor from "@/assets/gallery-decor.jpg";
import galleryCatering from "@/assets/gallery-catering.jpg";
import galleryCouple from "@/assets/gallery-couple.jpg";

export const WHATSAPP_NUMBER = "919876543210";
export const PHONE_DISPLAY = "+91 98765 43210";

export interface GalleryImage {
  src: string;
  caption: string;
  category: "Venues" | "Weddings" | "Decor" | "Dining";
}

export interface Venue {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  capacity: string;
  area: string;
  description: string;
  story: string;
  image: string;
  facilities: string[];
  events: string[];
  gallery: GalleryImage[];
  mapQuery: string;
}

export const heroImage = heroWedding;

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

const sharedDetails: GalleryImage[] = [
  { src: galleryDecor, caption: "Ivory roses and candlelit tablescapes", category: "Decor" },
  { src: galleryCatering, caption: "A royal feast by our master chefs", category: "Dining" },
  { src: galleryCouple, caption: "Moments that become heirlooms", category: "Weddings" },
  { src: heroWedding, caption: "The estate at golden hour", category: "Venues" },
];

export const venues: Venue[] = [
  {
    slug: "jawhar-grand",
    name: "Jawhar Grand",
    tagline: "The Flagship Ballroom",
    location: "Nungambakkam, Chennai",
    capacity: "1,200 guests",
    area: "28,000 sq.ft",
    description:
      "Our flagship chandeliered ballroom with soaring ceilings, velvet-draped stages and a regal foyer — the definitive address for grand weddings.",
    story:
      "Jawhar Grand began as our family's first promise: that a celebration deserves architecture worthy of its emotion. Beneath a canopy of Austrian crystal chandeliers, generations have exchanged vows, danced their first waltzes and toasted new beginnings. Every cornice, every drape, every note of the grand piano in the foyer exists for a single purpose — to make your day feel like history in the making.",
    image: venueGrand,
    facilities: [
      "Chandeliered pillar-less ballroom",
      "Bridal & family suites",
      "Dedicated mandap stage",
      "In-house catering kitchens",
      "Valet parking for 300 cars",
      "Full power backup & climate control",
      "Green rooms & VIP lounge",
      "Live streaming infrastructure",
    ],
    events: ["Wedding", "Reception", "Engagement", "Corporate", "Anniversary"],
    gallery: [
      { src: venueGrand, caption: "The grand ballroom set for a wedding", category: "Venues" },
      ...sharedDetails,
    ],
    mapQuery: "Nungambakkam, Chennai",
  },
  {
    slug: "jawhar-elite-ar-tower",
    name: "Jawhar Elite AR Tower",
    tagline: "The Skyline Terrace",
    location: "OMR, Chennai",
    capacity: "600 guests",
    area: "18,500 sq.ft",
    description:
      "A glass-crowned tower venue with a sunset rooftop terrace — receptions suspended above the city, glittering beneath the stars.",
    story:
      "Perched above the city's hum, Jawhar Elite AR Tower was imagined for celebrations that touch the sky. As dusk paints the horizon in amber and rose, the terrace comes alive with a thousand fairy lights. It is where modern romance meets metropolitan glamour — cocktail receptions under open sky, champagne toasts against a glittering skyline, and evenings your guests will recount for years.",
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
      { src: venueElite, caption: "Twilight receptions above the skyline", category: "Venues" },
      ...sharedDetails,
    ],
    mapQuery: "OMR, Chennai",
  },
  {
    slug: "jawhar-grand-palace",
    name: "Jawhar Grand Palace",
    tagline: "The Royal Heritage",
    location: "ECR, Chennai",
    capacity: "2,000 guests",
    area: "52,000 sq.ft",
    description:
      "A marble-columned palace of gilded staircases and throne-like mandaps — for weddings that deserve nothing less than royalty.",
    story:
      "Jawhar Grand Palace is our ode to the courts of old — Corinthian marble columns, a sweeping double staircase, and a golden dome that crowns the sacred mandap. Here, jasmine garlands meet antique gold; tradition is not decorated, it is enshrined. For families who dream of a wedding that feels like a royal durbar, the Palace is not a venue. It is an inheritance of grandeur.",
    image: venuePalace,
    facilities: [
      "Gilded royal mandap",
      "Marble grand staircase entry",
      "Two interconnecting halls",
      "Royal bridal chamber",
      "Traditional kitchen for rituals",
      "Parking for 500 cars",
      "Procession courtyard",
      "Guest accommodation block",
    ],
    events: ["Wedding", "Reception", "Seemantham", "Engagement"],
    gallery: [
      { src: venuePalace, caption: "The royal mandap beneath the golden dome", category: "Venues" },
      ...sharedDetails,
    ],
    mapQuery: "ECR, Chennai",
  },
  {
    slug: "jawhar-garden-estate",
    name: "Jawhar Garden Estate",
    tagline: "The Open-Air Lawn",
    location: "Injambakkam, Chennai",
    capacity: "1,500 guests",
    area: "2.5 acres of lawns",
    description:
      "Manicured pastel-green lawns, white pavilions and floral archways — an open-air estate for ceremonies kissed by sea breeze.",
    story:
      "Some celebrations belong under open sky. The Garden Estate spreads across two and a half acres of velvet lawn, where white pavilions rise between frangipani trees and the sea carries its blessing on the breeze. Morning seemanthams bathed in soft light, evening receptions beneath a canopy of stars — the Estate is nature, composed like poetry.",
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
      { src: venueGarden, caption: "Pavilions and petals on the great lawn", category: "Venues" },
      ...sharedDetails,
    ],
    mapQuery: "Injambakkam, Chennai",
  },
  {
    slug: "jawhar-convention-centre",
    name: "Jawhar Convention Centre",
    tagline: "The Grand Conclave",
    location: "Guindy, Chennai",
    capacity: "800 guests",
    area: "22,000 sq.ft",
    description:
      "A sophisticated convention hall of warm wood and brass — conferences, product launches and gala dinners at corporate perfection.",
    story:
      "The Convention Centre speaks a quieter luxury: warm walnut panelling, sculptural brass lighting, and acoustics tuned to perfection. It is the stage for ideas that matter — keynote summits, product unveilings, award galas — and for families who prefer their celebrations in contemporary, understated elegance. Precision is our hospitality here.",
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
      { src: venueConvention, caption: "The conclave hall in banquet style", category: "Venues" },
      ...sharedDetails,
    ],
    mapQuery: "Guindy, Chennai",
  },
];

export const allGalleryImages: GalleryImage[] = venues.flatMap((v) =>
  v.gallery.map((g) => ({ ...g, caption: `${g.caption} — ${v.name}` }))
);

export function getVenue(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
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
