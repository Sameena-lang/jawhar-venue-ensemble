import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin, Users, ArrowRight, MessageCircle, Phone, Mail, Sparkles,
  UtensilsCrossed, Flower2, Camera, Video, BedDouble, ClipboardList,
  Landmark, CheckCircle2, Calendar,
} from "lucide-react";
import {
  venues, heroImage, heroVideo, EVENT_TYPES, SERVICES,
  recommendedVenuesFor, whatsappLink, type EventType,
} from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jawhar Groups — Luxury Wedding Venues & Premium Event Spaces" },
      { name: "description", content: "Five signature luxury wedding venues and event spaces across Chennai." },
      { property: "og:title", content: "Jawhar Groups — Luxury Wedding Venues & Premium Event Spaces" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const SERVICE_ICONS = [Landmark, UtensilsCrossed, Flower2, Camera, Video, BedDouble, ClipboardList];

function HomePage() {
  const [event, setEvent] = useState<EventType>("Wedding");
  const recommended = recommendedVenuesFor(event);

  return (
    <main className="bg-[#C4DEC9] text-[#1A342B]">
      {/* ── HERO — video keeps dark overlay so text is legible ── */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <motion.video
          src={heroVideo} poster={heroImage} autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A342B]/70 via-[#1A342B]/50 to-[#0F231B]" />
        <div className="container-luxe relative z-10 py-32 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="eyebrow !text-[#B89A57]">JAWHAR GROUPS</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="mx-auto mt-6 max-w-5xl font-display text-4xl font-medium leading-[1.15] text-white sm:text-6xl lg:text-7xl">
            Luxury Wedding Venues &<br className="hidden sm:block" /> Premium Event Spaces
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg font-light">
            Five signature addresses across Chennai, crafted with grand architecture, crystal chandeliers, and 5-star South Indian hospitality.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/venues" className="btn-gold">Explore Venues</Link>
            <Link to="/availability" className="btn-outline-ivory !border-white/60 !text-white hover:!bg-white hover:!text-[#1A342B]">Check Dates</Link>
            <Link to="/enquire" className="btn-outline-ivory !border-white/60 !text-white hover:!bg-white hover:!text-[#1A342B]">Concierge Enquiry</Link>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND INTRO — sage green ── */}
      <section className="py-20 sm:py-28 bg-[#C4DEC9]">
        <div className="container-luxe max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow !text-[#B89A57]">THE JAWHAR STANDARD</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-medium text-[#1A342B]">
              Five Signature Addresses · One Unmatched Standard of Hospitality
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#1A342B]/80 font-light">
              Whether you envision a majestic morning muhurtham under crystal chandeliers, a sunset terrace reception overlooking the Chennai skyline, or a grand coastal lawn ceremony, Jawhar Groups turns your dream into an enduring legacy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── VENUE COLLECTION — dark green cards on sage bg ── */}
      <section className="py-20 sm:py-28 bg-[#E2EFE5] border-t border-[#1A342B]/15">
        <div className="container-luxe">
          <SectionHeading eyebrow="THE COLLECTION" title="Five Distinct Venues in Chennai" description="Explore our portfolio of signature wedding halls, tower ballrooms, open-air lawn estates, and convention centers." />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) * 0.12}>
                <Link to="/venues/$slug" params={{ slug: v.slug }} className="group block bg-white border border-[#1A342B]/20 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#1A342B]/50 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={v.heroImage || v.image} alt={`${v.name} — ${v.tagline}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 bg-[#1A342B]/90 px-3 py-1 text-[0.65rem] tracking-widest uppercase text-[#B89A57]">{v.location}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57]">{v.tagline}</p>
                    <h3 className="mt-1 font-display text-2xl font-medium text-[#1A342B]">{v.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs tracking-wide text-[#1A342B]/70">
                      <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#B89A57]" /> {v.capacity}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#B89A57]" /> {v.area}</span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-[#1A342B]/65 font-light">{v.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-[#1A342B] uppercase transition-colors group-hover:text-[#B89A57]">
                      Explore Venue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/venues" className="btn-gold">View All 5 Venues</Link>
          </div>
        </div>
      </section>

      {/* ── OCCASIONS — sage bg ── */}
      <section className="py-20 sm:py-28 bg-[#C4DEC9]">
        <div className="container-luxe">
          <SectionHeading eyebrow="OCCASIONS WE HOST" title="Every Celebration, Perfectly Staged" description="From traditional muhurthams and grand receptions to milestone birthdays and corporate summits." />
          <Reveal className="mt-12">
            <div className="flex flex-wrap justify-center gap-2.5" role="tablist">
              {EVENT_TYPES.map((e) => (
                <button key={e.name} role="tab" aria-selected={event === e.name} onClick={() => setEvent(e.name)}
                  className={`px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition-all rounded-sm border ${event === e.name ? "bg-[#1A342B] text-[#C4DEC9] border-[#1A342B]" : "bg-white/60 text-[#1A342B]/80 border-[#1A342B]/25 hover:border-[#1A342B] hover:text-[#1A342B]"}`}>
                  {e.name}
                </button>
              ))}
            </div>
          </Reveal>
          <motion.div key={event} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-10">
            <p className="mx-auto max-w-xl text-center font-display text-xl text-[#1A342B] italic font-light">
              "{EVENT_TYPES.find((e) => e.name === event)?.description}"
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {recommended.map((v) => (
                <Link key={v.slug} to="/venues/$slug" params={{ slug: v.slug }} className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#1A342B]/20 shadow-md">
                  <img src={v.heroImage || v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1A342B]/90 via-transparent to-transparent p-6">
                    <p className="font-display text-xl text-white">{v.name}</p>
                    <p className="mt-1 text-xs tracking-widest text-[#B89A57] uppercase">{v.capacity}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/events" className="btn-outline-forest">Explore Event Details</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES — dark green bg for contrast ── */}
      <section className="py-20 sm:py-28 bg-[#1A342B] text-white border-t border-[#B89A57]/30">
        <div className="container-luxe">
          <SectionHeading light eyebrow="HOSPITALITY SERVICES" title="One Team for Every Detail" description="In-house chefs, bespoke floral decorators, editorial photographers, and dedicated event coordinators." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? Sparkles;
              return (
                <Reveal key={s.name} delay={(i % 4) * 0.08} className="h-full">
                  <div className="group flex h-full flex-col bg-[#C4DEC9]/10 border border-[#B89A57]/30 p-8 rounded-sm transition-colors duration-500 hover:bg-[#C4DEC9]/20">
                    <Icon className="h-7 w-7 text-[#B89A57]" aria-hidden />
                    <h3 className="mt-4 font-display text-xl text-white">{s.name}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/70 font-light">{s.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-gold">Explore All Services</Link>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY — sage bg ── */}
      <section className="py-20 sm:py-28 bg-[#C4DEC9]">
        <div className="container-luxe">
          <SectionHeading eyebrow="PLAN YOUR DATE" title="Live Date Availability" description="Select your preferred venue and date to check reservation status instantly." />
          <Reveal className="mt-12 bg-white border border-[#1A342B]/20 p-6 sm:p-10 rounded-sm shadow-md">
            <AvailabilityCalendar />
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS — lighter sage ── */}
      <section className="bg-[#E2EFE5] py-20 border-t border-[#1A342B]/15">
        <div className="container-luxe">
          <SectionHeading eyebrow="FAMILY TESTIMONIALS" title="Celebrations Remembered" />
          <div className="mt-12"><Testimonials /></div>
        </div>
      </section>

      {/* ── FAQ — sage bg ── */}
      <section className="py-20 sm:py-28 bg-[#C4DEC9]">
        <div className="container-luxe">
          <SectionHeading eyebrow="GOOD TO KNOW" title="Frequently Asked Questions" />
          <div className="mt-12 max-w-3xl mx-auto"><Faq /></div>
        </div>
      </section>
    </main>
  );
}
