import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  UtensilsCrossed,
  Flower2,
  Camera,
  Video,
  BedDouble,
  ClipboardList,
  Landmark,
} from "lucide-react";
import {
  venues,
  heroImage,
  heroVideo,
  EVENT_TYPES,
  SERVICES,
  recommendedVenuesFor,
  whatsappLink,
  type EventType,
} from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jawhar Groups — Luxury Wedding Venues & Premium Event Spaces" },
      {
        name: "description",
        content:
          "Five exquisite venues across Chennai for weddings, receptions, seemantham and corporate galas. Jawhar Groups creates unforgettable celebrations through elegant venues and exceptional hospitality.",
      },
      { property: "og:title", content: "Jawhar Groups — Luxury Wedding Venues & Premium Event Spaces" },
      {
        property: "og:description",
        content: "Creating unforgettable celebrations through elegant venues and exceptional hospitality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const SERVICE_ICONS = [Landmark, UtensilsCrossed, Flower2, Camera, Video, BedDouble, ClipboardList];

function HomePage() {
  const [event, setEvent] = useState<EventType>("Wedding");
  const recommended = recommendedVenuesFor(event);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        {/* Looping background video */}
        <motion.video
          src={heroVideo}
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/30 to-forest-deep/80" />

        <div className="container-luxe relative z-10 py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="eyebrow"
          >
            Jawhar Groups
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mx-auto mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.15] text-white md:text-6xl lg:text-7xl"
          >
            Luxury Wedding Venues &<br className="hidden md:block" /> Premium Event Spaces
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            Creating unforgettable celebrations through elegant venues and exceptional
            hospitality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link to="/enquire" className="btn-gold">
              Book Venue
            </Link>
            <a href="#venues" className="btn-outline-ivory">
              Explore Locations
            </a>
            <a href={whatsappLink("Hello, I'd like to schedule a venue visit.")} target="_blank" rel="noreferrer" className="btn-outline-ivory">
              Schedule Visit
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
          aria-hidden
        >
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-gold to-transparent" />
        </motion.div>
      </section>

      {/* ── Venue Collection ─────────────────────────────── */}
      <section id="venues" className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Collection"
            title="Five Distinct Addresses of Celebration"
            description="From chandeliered ballrooms to sky terraces and sea-breeze lawns — each Jawhar venue carries its own soul, united by one standard of hospitality."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) * 0.12}>
                <Link
                  to="/venues/$slug"
                  params={{ slug: v.slug }}
                  className="group block bg-card shadow-[0_20px_60px_-35px_rgba(32,60,50,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_80px_-35px_rgba(32,60,50,0.5)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={v.image}
                      alt={`${v.name} — ${v.tagline}`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <span className="absolute left-4 top-4 bg-forest-deep/80 px-3 py-1.5 text-[0.6rem] tracking-luxe uppercase text-gold backdrop-blur">
                      {v.tagline}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-medium text-forest">{v.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs tracking-wide text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold" /> {v.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-gold" /> {v.capacity}
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-forest uppercase transition-colors group-hover:text-gold">
                      View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ───────────────────────────────────────── */}
      <section id="events" className="bg-pastel-green/40 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Occasions"
            title="Every Celebration, Perfectly Staged"
            description="Select your occasion and discover the venues and services we recommend for it."
          />
          <Reveal className="mt-12">
            <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Event types">
              {EVENT_TYPES.map((e) => (
                <button
                  key={e.name}
                  role="tab"
                  aria-selected={event === e.name}
                  onClick={() => setEvent(e.name)}
                  className={`px-6 py-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-all duration-300 ${
                    event === e.name
                      ? "bg-forest text-ivory shadow-lg"
                      : "bg-card text-forest hover:bg-pastel-blue"
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            key={event}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <p className="mx-auto max-w-xl text-center font-display text-xl text-forest italic">
              {EVENT_TYPES.find((e) => e.name === event)?.description}
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recommended.map((v) => (
                <Link
                  key={v.slug}
                  to="/venues/$slug"
                  params={{ slug: v.slug }}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-deep/85 to-transparent p-6">
                    <p className="font-display text-xl text-white">{v.name}</p>
                    <p className="mt-1 text-xs tracking-widest text-gold uppercase">{v.capacity}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Recommended services for a {event.toLowerCase()}:{" "}
              <span className="font-medium text-forest">
                Venue · Catering · Decoration · Event Coordination
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section id="services" className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Signature Services"
            title="One Team for Every Detail"
            description="Beyond the venue, our in-house ateliers craft cuisine, décor, imagery and flawless orchestration."
          />
          <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? Sparkles;
              return (
                <Reveal key={s.name} delay={(i % 4) * 0.08} className="h-full">
                  <div className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-forest">
                    <Icon className="h-8 w-8 text-gold" aria-hidden />
                    <h3 className="mt-5 font-display text-xl text-forest transition-colors group-hover:text-ivory">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={0.24} className="h-full">
              <Link
                to="/enquire"
                className="flex h-full flex-col justify-between bg-gold p-8 transition-colors hover:bg-forest"
              >
                <p className="font-display text-xl text-forest-deep group-hover:text-ivory">
                  Compose your<br />celebration
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-forest-deep uppercase">
                  Start Enquiry <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Availability ─────────────────────────────────── */}
      <section id="availability" className="bg-pastel-blue/40 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Plan Your Date"
            title="Live Availability"
            description="Choose your venue, pick a date and session, and see instantly whether your celebration day is waiting for you."
          />
          <Reveal className="mt-14">
            <AvailabilityCalendar />
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="bg-forest py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            light
            eyebrow="Words of Our Families"
            title="Celebrations, Remembered"
          />
          <div className="mt-16">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
          <div className="mt-14">
            <Faq />
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="bg-forest-deep py-24 text-white md:py-32">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Begin Your Story</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
              Let's compose your celebration together
            </h2>
            <p className="mt-6 max-w-md text-white/70">
              Share your date and dreams — our celebrations team responds within 24 hours.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" /> celebrations@jawhargroups.com
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/enquire" className="btn-gold">
                Start Guided Enquiry
              </Link>
              <a
                href={whatsappLink("Hello Jawhar Groups, I'd like to plan an event.")}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-ivory"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <form
              className="space-y-4 bg-white/5 p-8 backdrop-blur"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                window.open(
                  whatsappLink(
                    `Contact form — Name: ${fd.get("name")}, Phone: ${fd.get("phone")}, Message: ${fd.get("message")}`
                  ),
                  "_blank"
                );
              }}
            >
              <input required name="name" aria-label="Your name" placeholder="Your name" className="w-full border border-white/20 bg-transparent px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <input required name="phone" aria-label="Phone number" placeholder="Phone number" type="tel" className="w-full border border-white/20 bg-transparent px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <textarea name="message" aria-label="Your message" placeholder="Tell us about your celebration" rows={4} className="w-full border border-white/20 bg-transparent px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <button type="submit" className="btn-gold w-full">Send Message</button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
