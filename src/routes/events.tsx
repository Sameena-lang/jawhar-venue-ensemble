import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { EVENT_TYPES, venues, whatsappLink, type EventType } from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Celebrations — Jawhar Groups" },
      { name: "description", content: "Explore event experiences at Jawhar Groups — Weddings, Receptions, Muhurtham, Engagements, Seemanthams, and Corporate Galas." },
    ],
  }),
  component: EventsPage,
});

const EVENT_DETAILS: Record<string, { tagline: string; description: string; highlights: string[]; image: string }> = {
  Wedding: { tagline: "Sacred Ceremonies & Timeless Mandaps", description: "A wedding at Jawhar Groups is a grand tapestry of sacred traditions, floral artistry, and warm South Indian hospitality. From morning muhurthams bathed in natural light to evening receptions under crystal chandeliers, our pillarless halls provide the ultimate backdrop for your vows.", highlights: ["Custom mandap floral backdrop design", "Pillarless ballroom seating up to 2,000 guests", "Dedicated bride & groom luxury prep suites", "Traditional South Indian thali feast setup"], image: "/src/assets/hero-wedding.jpg" },
  Reception: { tagline: "Glamorous Evenings & Celebration Galas", description: "Celebrate your new beginning with an opulent evening of fine dining, music, and cocktail toasts.", highlights: ["DMX intelligent stage lighting & sound", "Open-air skyline terrace & cocktail lounge", "Live banquet buffet & international food stations", "Red carpet welcome entrance & photo walls"], image: "/src/assets/venue-grand.jpg" },
  Engagement: { tagline: "Intimate Beginnings & Ring Ceremonies", description: "Gather your closest family and friends for an intimate ring exchange with elegant floral stage settings.", highlights: ["Intimate banquet hall setups (100 to 500 guests)", "Bespoke ring-exchange stage backdrops", "Welcome mocktail & canopy lounge", "Customized family dining arrangements"], image: "/src/assets/venue-palace.jpg" },
  Seemantham: { tagline: "Blessed Traditions & Auspicious Blessings", description: "Honor sacred motherly rituals in a serene, auspicious environment.", highlights: ["Traditional swing (Oonjal) setup & decor", "Auspicious morning muhurtham scheduling", "Wheelchair-accessible ground level dining", "Authentic South Indian vegetarian catering"], image: "/src/assets/venue-garden.jpg" },
  Birthday: { tagline: "Milestone Celebrations & Joyful Parties", description: "From 1st birthday galas to 60th milestone celebrations (Sashti Poorthi), our venues transform with vibrant thematic decor.", highlights: ["Thematic stage decor & balloons / floral art", "Kid-friendly and live food counters", "High-definition LED display walls for videos", "Flexible seating & dance area"], image: "/src/assets/gallery-decor.jpg" },
  Anniversary: { tagline: "Years of Togetherness & Golden Jubilees", description: "Re-live your vows and celebrate years of shared memories surrounded by children, family, and lifelong friends.", highlights: ["Memory walk photo gallery display", "Couples toast & champagne banquet", "Acoustic music & quiet lounge seating", "Luxury bridal suite access for refreshing"], image: "/src/assets/gallery-couple.jpg" },
  Corporate: { tagline: "Conferences, Keynotes & Annual Galas", description: "Execute high-impact corporate summits, product unveilings, award galas, and annual dinners.", highlights: ["Pillarless acoustic hall with 4K LED backdrop wall", "High-speed optical Wi-Fi & breakout rooms", "High-volume valet parking & loading docks", "Executive buffet dining & cocktail lounge"], image: "/src/assets/venue-convention.jpg" },
};

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType>("Wedding");
  const currentDetails = EVENT_DETAILS[selectedEvent] || EVENT_DETAILS.Wedding;
  const suitableVenues = venues.filter((v) => v.events.includes(selectedEvent));

  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      {/* ── HERO ── */}
      <section className="bg-[#C4DEC9] py-16 text-[#1A342B] border-b border-[#1A342B]/15">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <p className="eyebrow !text-[#B89A57]">OCCASIONS WE HOST</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium">Designed for Life's Most Cherished Moments</h1>
          <p className="mt-4 text-base text-[#1A342B]/80 font-light">Select an occasion below to explore dedicated space arrangements, decor concepts, and matching venues.</p>
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="container-luxe py-12">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {EVENT_TYPES.map((evt) => (
            <button key={evt.name} onClick={() => setSelectedEvent(evt.name)}
              className={`px-5 py-3 text-xs tracking-widest uppercase transition-all rounded-sm border ${selectedEvent === evt.name ? "bg-[#1A342B] text-[#C4DEC9] border-[#1A342B] shadow-md font-semibold" : "bg-white/70 text-[#1A342B]/80 border-[#1A342B]/20 hover:border-[#1A342B] hover:bg-white"}`}>
              {evt.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── EVENT DETAIL ── */}
      <section className="container-luxe py-6">
        <AnimatePresence mode="wait">
          <motion.div key={selectedEvent} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}
            className="grid gap-12 lg:grid-cols-12 lg:items-center bg-white border border-[#1A342B]/15 p-8 sm:p-12 rounded-sm shadow-md">
            <div className="lg:col-span-6 relative overflow-hidden rounded-sm border border-[#1A342B]/15 aspect-[4/3]">
              <img src={currentDetails.image} alt={selectedEvent} className="h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-[#1A342B]/90 text-[#B89A57] px-3 py-1 text-xs uppercase tracking-widest font-semibold">{selectedEvent} Experience</div>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="eyebrow !text-[#B89A57]">{currentDetails.tagline}</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1A342B]">Hosting Your {selectedEvent}</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1A342B]/75 font-light">{currentDetails.description}</p>
              <div className="mt-6 space-y-2.5 border-t border-[#1A342B]/15 pt-5">
                <p className="text-xs uppercase tracking-widest text-[#B89A57] font-semibold">Signature Highlights</p>
                {currentDetails.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1A342B]/85">
                    <CheckCircle2 className="h-4 w-4 text-[#B89A57] shrink-0" /><span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/enquire" search={{ event: selectedEvent }} className="btn-gold !py-3 !px-6 text-xs flex items-center gap-2">Plan Your {selectedEvent} <ArrowRight className="h-4 w-4" /></Link>
                <a href={whatsappLink(`Hello Jawhar Groups, I want to enquire about hosting a ${selectedEvent}.`)} target="_blank" rel="noreferrer" className="btn-outline-forest !py-3 !px-6 text-xs">WhatsApp Concierge</a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── VENUE MATCHES ── */}
      <section className="container-luxe py-20">
        <SectionHeading eyebrow="RECOMMENDED SPACES" title={`Venues Ideal for ${selectedEvent}`} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {suitableVenues.map((venue) => (
            <div key={venue.id} className="bg-white border border-[#1A342B]/15 rounded-sm overflow-hidden flex flex-col shadow-md group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={venue.heroImage || venue.image} alt={venue.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 right-3 bg-[#1A342B]/90 text-[#B89A57] px-2.5 py-1 text-[0.65rem] uppercase tracking-widest font-semibold">{venue.capacity}</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57]">{venue.location}</p>
                <h3 className="mt-1 font-display text-2xl font-medium text-[#1A342B]">{venue.name}</h3>
                <p className="mt-3 text-xs leading-relaxed text-[#1A342B]/65 line-clamp-3 font-light flex-1">{venue.description}</p>
                <Link to="/venues/$slug" params={{ slug: venue.slug }} className="btn-gold w-full text-center !py-2.5 text-xs mt-4">View Venue Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
