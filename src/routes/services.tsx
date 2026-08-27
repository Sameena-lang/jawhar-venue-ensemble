import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, UtensilsCrossed, Flower2, Camera, BedDouble, ClipboardList, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Hospitality — Jawhar Groups" },
      { name: "description", content: "Full hospitality services at Jawhar Groups — Venue, Catering, Decor, Photography, Accommodation and Coordination." },
    ],
  }),
  component: ServicesPage,
});

const SERVICE_ITEMS = [
  { name: "Venue Selection & Rental", icon: Landmark, description: "Exclusive access to five signature properties across Chennai — from pillarless grand ballrooms with crystal chandeliers to open-air sea-breeze lawns and skyline rooftop terraces.", highlights: ["Pillarless ballroom & lawn options", "100% generator power backup & central climate control", "Dedicated bride, groom & VIP family preparation rooms", "Covered porte-cochère drop-off & valet parking"], image: "/src/assets/venues/jawhar-grand/jawhar-grand-main-hall.png" },
  { name: "Master Catering & Banquets", icon: UtensilsCrossed, description: "Multi-cuisine culinary feasts crafted by seasoned South Indian master chefs. From traditional banana leaf thali feasts to global live buffet counters.", highlights: ["Traditional South Indian vegetarian thali dining", "Live sweet counters, chaat, and mocktail bars", "Climate-controlled dining halls with fast service layout", "Certified hygiene & food safety standards"], image: "/src/assets/venues/jawhar-grand/jawhar-grand-dining-buffet.png" },
  { name: "Bespoke Floral Decor & Stage Setup", icon: Flower2, description: "Transforming halls with exquisite floral mandaps, thematic entrance arches, elegant lighting, and personalized stage backdrops that embody luxury.", highlights: ["Custom floral mandap & stage backdrop design", "Red carpet processional archways & aisle florals", "DMX intelligent stage lighting & spotlighting", "Thematic photobooth & welcome foyer decor"], image: "/src/assets/venues/jawhar-grand/jawhar-grand-stage-celebration.png" },
  { name: "Photography & Videography", icon: Camera, description: "Editorial photographers and cinematic filmmakers capturing every ritual, tear, and joyful smile in high definition with drone coverage and same-day edits.", highlights: ["Editorial wedding photography & couple portraits", "Cinematic 4K films & same-day trailer edits", "Drone aerial coverage for outdoor & facade arrivals", "High-resolution digital albums & print keepsakes"], image: "/src/assets/gallery-couple.jpg" },
  { name: "Guest Accommodation & Suites", icon: BedDouble, description: "Luxurious suites and guest rooms for the bride, groom, immediate family, and outstation guests.", highlights: ["Air-conditioned bridal & groom preparation suites", "Family accommodation rooms with room service", "En-suite bathrooms & dressing mirrors", "24/7 security & concierge support"], image: "/src/assets/venues/jawhar-grand/jawhar-grand-foyer-dining.png" },
  { name: "Dedicated Event Coordination", icon: ClipboardList, description: "A dedicated hospitality manager who orchestrates every detail from schedule management to guest welcome service.", highlights: ["Single point of contact from booking to completion", "Vendor arrival & timeline coordination", "Guest greeting & reception desk management", "On-site technical & backup staff support"], image: "/src/assets/venues/jawhar-grand/jawhar-grand-facade.png" },
];

function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      <section className="bg-[#C4DEC9] py-16 border-b border-[#1A342B]/15">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <p className="eyebrow !text-[#B89A57]">HOSPITALITY SERVICES</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A342B]">Seamless Hospitality, End to End</h1>
          <p className="mt-4 text-base text-[#1A342B]/80 font-light">Every service executed by verified in-house professionals to ensure your celebration is flawless, beautiful, and stress-free.</p>
        </div>
      </section>

      <section className="container-luxe py-20 space-y-20">
        {SERVICE_ITEMS.map((service, idx) => {
          const IconComp = service.icon;
          const isEven = idx % 2 === 0;
          return (
            <Reveal key={service.name}>
              <div className={`grid gap-12 lg:grid-cols-12 lg:items-center bg-white border border-[#1A342B]/15 p-8 sm:p-12 rounded-sm shadow-md ${isEven ? "" : "lg:grid-flow-dense"}`}>
                <div className={`lg:col-span-6 relative overflow-hidden rounded-sm border border-[#1A342B]/15 aspect-[16/10] ${isEven ? "" : "lg:col-start-7"}`}>
                  <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  <div className="absolute top-4 left-4 bg-[#1A342B] text-[#B89A57] p-2.5 rounded-sm"><IconComp className="h-6 w-6" /></div>
                </div>
                <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "" : "lg:col-start-1"}`}>
                  <p className="eyebrow !text-[#B89A57]">JAWHAR SERVICE 0{idx + 1}</p>
                  <h2 className="mt-2 font-display text-3xl font-medium text-[#1A342B]">{service.name}</h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1A342B]/75 font-light">{service.description}</p>
                  <div className="mt-6 space-y-2.5 border-t border-[#1A342B]/15 pt-5">
                    <p className="text-xs uppercase tracking-widest text-[#B89A57] font-semibold">Service Features</p>
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1A342B]/85"><CheckCircle2 className="h-4 w-4 text-[#B89A57] shrink-0" /><span>{h}</span></div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/enquire" search={{ service: service.name }} className="btn-gold !py-3 !px-6 text-xs flex items-center gap-2">Request Details <ArrowRight className="h-4 w-4" /></Link>
                    <a href={whatsappLink(`Hello, I would like to inquire about the ${service.name} service.`)} target="_blank" rel="noreferrer" className="btn-outline-forest !py-3 !px-6 text-xs"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>
    </main>
  );
}
