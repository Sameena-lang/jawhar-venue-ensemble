import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Ruler,
  Check,
  MessageCircle,
  Share2,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import { getVenue, venues, whatsappLink } from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { MasonryGallery } from "@/components/MasonryGallery";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Faq } from "@/components/Faq";
import { SERVICES } from "@/data/venues";

export const Route = createFileRoute("/venues/$slug")({
  loader: ({ params }) => {
    const venue = getVenue(params.slug);
    if (!venue) throw notFound();
    return venue;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Jawhar Groups` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — Jawhar Groups` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Venue — Jawhar Groups" }, { name: "robots", content: "noindex" }],
  }),
  component: VenuePage,
  notFoundComponent: VenueNotFound,
});

function VenueNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 pt-20 text-center">
      <div>
        <h1 className="font-display text-4xl text-forest">Venue not found</h1>
        <p className="mt-4 text-muted-foreground">This address doesn't host celebrations with us.</p>
        <Link to="/" className="btn-gold mt-8">Return Home</Link>
      </div>
    </main>
  );
}

function VenuePage() {
  const venue = Route.useLoaderData();

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: venue.name, text: venue.description, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <main>
      {/* Hero banner */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden pt-20">
        <motion.img
          src={venue.image}
          alt={`${venue.name} — ${venue.tagline}`}
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={768}
          fetchPriority="high"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-forest-deep/40" />
        <div className="container-luxe relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
            <p className="eyebrow">{venue.tagline}</p>
            <h1 className="mt-4 font-display text-4xl font-medium text-white md:text-6xl">{venue.name}</h1>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {venue.location}</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> {venue.capacity}</span>
              <span className="inline-flex items-center gap-2"><Ruler className="h-4 w-4 text-gold" /> {venue.area}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/enquire" className="btn-gold">Schedule a Visit</Link>
              <a
                href={whatsappLink(`Hello, I'd like to enquire about ${venue.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-ivory"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
              </a>
              <button onClick={share} className="btn-outline-ivory">
                <Share2 className="h-4 w-4" /> Share Venue
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story + quick facts */}
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <p className="eyebrow">The Story</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-forest md:text-4xl">
              A venue with a soul
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-loose text-muted-foreground">{venue.story}</p>

            <h3 className="mt-12 font-display text-2xl text-forest">Facilities</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {venue.facilities.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="h-fit bg-forest p-8 text-ivory">
              <p className="eyebrow">Quick Facts</p>
              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-white/60">Location</dt>
                  <dd className="text-right font-medium">{venue.location}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-white/60">Capacity</dt>
                  <dd className="text-right font-medium">{venue.capacity}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-white/60">Space</dt>
                  <dd className="text-right font-medium">{venue.area}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Best For</dt>
                  <dd className="text-right font-medium">{venue.events.slice(0, 3).join(", ")}</dd>
                </div>
              </dl>
              <Link to="/enquire" className="btn-gold mt-8 w-full">
                <CalendarCheck className="h-4 w-4" /> Check Your Date
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-pastel-green/30 py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="Gallery" title={`${venue.name}, in Frames`} />
          <div className="mt-14">
            <MasonryGallery images={venue.gallery} showFilters={false} />
          </div>
        </div>
      </section>

      {/* Events & services */}
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Events Supported</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-forest">Occasions we host here</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {venue.events.map((e) => (
                <span key={e} className="border border-gold/40 bg-gold/5 px-5 py-2.5 text-sm text-forest">
                  {e}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">Available Services</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-forest">Everything under one roof</h2>
            <ul className="mt-8 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.name} className="flex items-center gap-3 text-sm text-foreground">
                  <Sparkles className="h-4 w-4 text-gold" /> {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Availability */}
      <section className="bg-pastel-blue/40 py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="Availability" title="Reserve Your Date" />
          <Reveal className="mt-14">
            <AvailabilityCalendar fixedVenue={venue.slug} />
          </Reveal>
        </div>
      </section>

      {/* Map + FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Find Us</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-forest">{venue.location}</h2>
            <div className="mt-8 aspect-[4/3] overflow-hidden border border-border">
              <iframe
                title={`Map of ${venue.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-forest">Before you visit</h2>
            <div className="mt-8">
              <Faq />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other venues */}
      <section className="bg-forest py-20">
        <div className="container-luxe">
          <SectionHeading light eyebrow="The Collection" title="Explore Other Venues" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venues
              .filter((v) => v.slug !== venue.slug)
              .map((v) => (
                <Link key={v.slug} to="/venues/$slug" params={{ slug: v.slug }} className="group relative block aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-deep/85 to-transparent p-5">
                    <p className="font-display text-lg text-white">{v.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
