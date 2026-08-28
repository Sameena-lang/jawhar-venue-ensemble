import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { venues } from "@/data/venues";
import venuesHeroImage from "@/assets/venues-hero-new.jpg";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/venues/")({
  head: () => ({
    meta: [
      { title: "The Venues Collection — Jawhar Groups Luxury Spaces" },
      { name: "description", content: "Explore our five signature wedding venues and event spaces across Chennai." },
    ],
  }),
  component: VenuesIndexPage,
});

function VenuesIndexPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      {/* ── Hero ── */}
      <section className="relative bg-[#C4DEC9] py-24 text-white overflow-hidden flex flex-col justify-center">
        <img src={venuesHeroImage} alt="Venues Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A342B]/80 via-[#1A342B]/70 to-[#0F231B]" />
        <div className="container-luxe text-center max-w-4xl mx-auto relative z-10">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow !text-[#B89A57]">JAWHAR COLLECTION</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight text-white">
            Architectural Masterpieces for Extraordinary Celebrations
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover five distinctive venues across Chennai — from chandeliered ballroom majesty to skyline terraces and sprawling garden lawns.
          </motion.p>
        </div>
      </section>

      {/* ── Venue Cards ── */}
      <section className="container-luxe py-20 space-y-20">
        {venues.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          const venueNumber = (idx + 1).toString().padStart(2, "0");
          return (
            <Reveal key={venue.id}>
              <div className={`grid gap-12 lg:grid-cols-12 lg:items-center bg-white border border-[#1A342B]/15 p-8 sm:p-12 rounded-sm shadow-md ${isEven ? "" : "lg:grid-flow-dense"}`}>
                <div className={`lg:col-span-7 relative group overflow-hidden rounded-sm border border-[#1A342B]/20 shadow-md ${isEven ? "" : "lg:col-start-6"}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-[#E2EFE5]">
                    <img src={venue.heroImage || venue.image} alt={`${venue.name} — ${venue.tagline}`} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="absolute top-4 left-4 bg-[#1A342B]/90 text-[#B89A57] px-3 py-1 text-xs font-mono tracking-widest">
                    {venueNumber} / JAWHAR
                  </div>
                </div>
                <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? "" : "lg:col-start-1"}`}>
                  <p className="eyebrow !text-[#B89A57]">{venue.location}</p>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1A342B]">{venue.name}</h2>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#B89A57] mt-1">{venue.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#1A342B]/75 font-medium border-y border-[#1A342B]/15 py-3">
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-[#B89A57]" /> {venue.capacity}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#B89A57]" /> {venue.location}</span>
                  </div>
                  <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#1A342B]/70 font-light">{venue.description}</p>
                  <div className="mt-5 space-y-2">
                    {venue.facilities.slice(0, 3).map((fac) => (
                      <div key={fac} className="flex items-center gap-2 text-xs text-[#1A342B]/85">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#B89A57] shrink-0" /><span>{fac}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link to="/venues/$slug" params={{ slug: venue.slug }} className="btn-gold !py-3 !px-6 text-xs flex items-center gap-2">Explore Venue <ArrowRight className="h-4 w-4" /></Link>
                    <Link to="/availability" search={{ venue: venue.slug }} className="btn-outline-forest !py-3 !px-6 text-xs">Check Availability</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── CTA — dark green for contrast ── */}
      <section className="container-luxe">
        <div className="bg-[#1A342B] text-white p-10 sm:p-14 border border-[#B89A57]/30 rounded-sm text-center shadow-xl">
          <p className="eyebrow !text-[#B89A57]">PERSONALIZED VENUE SELECTION</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium">Unsure which venue best fits your guest count & date?</h2>
          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light">Our hospitality team will help you find the ideal space for your wedding, reception, or corporate gala.</p>
          <div className="mt-8 flex justify-center"><Link to="/enquire" className="btn-gold">Consult With Our Team</Link></div>
        </div>
      </section>
    </main>
  );
}
