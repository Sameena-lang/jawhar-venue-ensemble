import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Ruler,
  Check,
  MessageCircle,
  Share2,
  CalendarCheck,
  Sparkles,
  ExternalLink,
  Play,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { getVenue, venues, whatsappLink, SERVICES } from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { MasonryGallery } from "@/components/MasonryGallery";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Faq } from "@/components/Faq";

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
    <main className="flex min-h-screen items-center justify-center bg-[#0F231B] px-6 pt-20 text-center text-white">
      <div>
        <h1 className="font-display text-4xl font-semibold text-white">Venue Not Found</h1>
        <p className="mt-4 text-white/70">This address does not host celebrations with us.</p>
        <Link to="/venues" className="btn-gold mt-8">Explore Venue Collection</Link>
      </div>
    </main>
  );
}

function VenuePage() {
  const venue = Route.useLoaderData();
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);

  const spaces = venue.spaces && venue.spaces.length > 0 ? venue.spaces : [
    {
      id: "main-space",
      name: "Main Space",
      description: venue.description,
      image: venue.heroImage || venue.image,
      highlights: [venue.capacity, venue.area, venue.location],
    }
  ];

  const currentSpace = spaces[activeSpaceIdx] || spaces[0];

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
    <main className="bg-[#0F231B] text-white">
      {/* ── 01 HERO BANNER ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[75svh] items-end overflow-hidden pt-20">
        {venue.heroVideo ? (
          venue.heroVideo.includes("youtube.com") ? (
            <motion.iframe
              src={venue.heroVideo}
              title="Venue Hero Video"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 h-[150%] w-[150%] left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none opacity-80"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <motion.video
              src={venue.heroVideo}
              poster={venue.heroImage || venue.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          )
        ) : (
          <motion.img
            src={venue.heroImage || venue.image}
            alt={`${venue.name} — ${venue.tagline}`}
            className="absolute inset-0 h-full w-full object-cover"
            width={1024}
            height={768}
            fetchPriority="high"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F231B] via-[#0F231B]/50 to-[#0F231B]/30" />

        <div className="container-luxe relative z-10 pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}>
            <p className="eyebrow !text-[#B89A57]">{venue.tagline}</p>
            <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-medium text-white">{venue.name}</h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#B89A57]" /> {venue.location}</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[#B89A57]" /> {venue.capacity}</span>
              <span className="inline-flex items-center gap-2"><Ruler className="h-4 w-4 text-[#B89A57]" /> {venue.area}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/availability" search={{ venue: venue.slug }} className="btn-gold">
                Check Availability
              </Link>
              <Link to="/enquire" className="btn-outline-ivory">
                Schedule a Visit
              </Link>
              <a
                href={whatsappLink(`Hello, I would like to enquire about ${venue.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-ivory"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <button onClick={share} className="p-3 text-white/70 hover:text-[#B89A57] transition-colors" aria-label="Share venue link">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 02 VENUE QUICK FACTS STRIP ─────────────────────────── */}
      <section className="bg-[#1A342B] text-white border-y border-[#B89A57]/30 py-6 shadow-xl">
        <div className="container-luxe">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#B89A57]/20 text-center">
            <div className="pt-2 md:pt-0">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">Capacity</p>
              <p className="mt-1 font-display text-lg font-medium">{venue.capacity}</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">Location</p>
              <p className="mt-1 font-display text-lg font-medium truncate">{venue.location}</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">Area Space</p>
              <p className="mt-1 font-display text-lg font-medium">{venue.area}</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">AC & Climate</p>
              <p className="mt-1 font-display text-lg font-medium">Centralized</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">Power Backup</p>
              <p className="mt-1 font-display text-lg font-medium">100% Generator</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57] font-semibold">Parking Facility</p>
              <p className="mt-1 font-display text-lg font-medium">Valet & Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 VENUE STORY ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0F231B]">
        <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow !text-[#B89A57]">A SPACE FOR MOMENTS THAT MATTER</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-white">
              The Story of {venue.name}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/80 font-light">
              {venue.story}
            </p>

            <h3 className="mt-10 font-display text-xl font-medium text-white">Signature Facilities</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {venue.facilities.map((fac) => (
                <li key={fac} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-[#B89A57] shrink-0 mt-0.5" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm border border-[#B89A57]/30 shadow-xl">
              <img
                src={venue.thumbnailImage || venue.heroImage}
                alt={`${venue.name} story image`}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0F231B] to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#B89A57]">Verified Space</p>
                <p className="font-display text-xl">{venue.name} · {venue.location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 INTERACTIVE SPACE EXPLORER ─────────────────────────── */}
      {spaces.length > 0 && (
        <section className="bg-[#1A342B] text-white py-20 sm:py-28 border-y border-[#B89A57]/30">
          <div className="container-luxe">
            <SectionHeading
              light
              eyebrow="EXPLORE THE SPACE"
              title="A Digital Walkthrough of the Venue"
              description="Select an area below to experience the architectural layout and key highlights of each space."
            />

            {/* Space selector tabs */}
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {spaces.map((space, idx) => (
                <button
                  key={space.id}
                  onClick={() => setActiveSpaceIdx(idx)}
                  className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-all border ${
                    activeSpaceIdx === idx
                      ? "bg-[#B89A57] text-[#0F231B] font-semibold border-[#B89A57]"
                      : "bg-transparent text-white/80 hover:text-white border-white/20 hover:border-[#B89A57]/60"
                  }`}
                >
                  {space.name}
                </button>
              ))}
            </div>

            {/* Space display crossfade */}
            <div className="mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpace.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-8 lg:grid-cols-12 lg:items-center bg-[#0F231B] border border-[#B89A57]/30 p-6 sm:p-10 rounded-sm"
                >
                  <div className="lg:col-span-7 overflow-hidden rounded-sm border border-white/10 aspect-[16/10]">
                    <img
                      src={currentSpace.image}
                      alt={currentSpace.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <p className="eyebrow !text-[#B89A57]">{venue.name} Space 0{activeSpaceIdx + 1}</p>
                    <h3 className="mt-2 font-display text-3xl font-medium text-white">{currentSpace.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 font-light">{currentSpace.description}</p>

                    {currentSpace.highlights && (
                      <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                        <p className="text-xs uppercase tracking-widest text-[#B89A57]">Space Highlights</p>
                        {currentSpace.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                            <Sparkles className="h-3.5 w-3.5 text-[#B89A57]" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8">
                      <Link to="/enquire" className="btn-gold !py-2.5 !px-5 text-xs">
                        Inquire About This Space
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* ── 05 VENUE GALLERY ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0F231B]">
        <div className="container-luxe">
          <SectionHeading light eyebrow="GALLERY" title={`${venue.name} in Frames`} description="Real photographs from celebrations hosted at our property." />
          <div className="mt-12">
            <MasonryGallery images={venue.gallery} showFilters={true} />
          </div>
        </div>
      </section>

      {/* ── 06 CINEMATIC VIDEO SHOWCASE (IF AVAILABLE) ─────────────────────────── */}
      {venue.videos && venue.videos.length > 0 && (
        <section className="bg-[#132720] py-20 text-white border-t border-[#B89A57]/30">
          <div className="container-luxe">
            <SectionHeading light eyebrow="CINEMATIC FILM" title="Celebrations in Motion" />
            <div className="mt-12 mx-auto max-w-3xl">
              {venue.videos.map((vid, idx) => (
                <div key={idx} className="border border-[#B89A57]/30 bg-[#1A342B] p-6 text-center">
                  <div className="relative mx-auto aspect-[9/16] max-w-xs overflow-hidden rounded-sm border border-white/10">
                    {vid.embedUrl ? (
                      <iframe
                        src={vid.embedUrl}
                        title={vid.title}
                        className="h-full w-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6">
                        <Play className="h-10 w-10 text-[#B89A57]" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-xl text-white">{vid.title}</h3>
                  {vid.description && <p className="mt-2 text-xs text-white/70">{vid.description}</p>}
                  <a
                    href={vid.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 btn-gold !py-2 !px-5 text-xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Watch on Instagram
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 07 AVAILABILITY & MAP ─────────────────────────────────────────── */}
      <section className="bg-[#132720] py-20 sm:py-28 border-t border-[#B89A57]/30">
        <div className="container-luxe">
          <SectionHeading light eyebrow="AVAILABILITY & LOCATION" title={`Plan Your Event at ${venue.name}`} />
          
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 bg-[#1A342B] p-6 sm:p-8 rounded-sm border border-[#B89A57]/30 shadow-md">
              <h3 className="font-display text-2xl font-medium text-white mb-6">Check Date Availability</h3>
              <AvailabilityCalendar fixedVenue={venue.slug} />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-medium text-white mb-4">Location Map</h3>
                <p className="text-sm text-white/80 mb-4">{venue.mapQuery}</p>
                <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[#B89A57]/30 shadow-md">
                  <iframe
                    title={`Map location of ${venue.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#1A342B] text-white border border-[#B89A57]/30 rounded-sm">
                <p className="eyebrow !text-[#B89A57]">SCHEDULE A SITE VISIT</p>
                <p className="mt-2 text-sm text-white/80 font-light">Experience the grandeur in person. Our venue manager will guide you through the halls.</p>
                <Link to="/enquire" className="btn-gold mt-4 w-full text-center">
                  Book A Personal Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 EXPLORE OTHER VENUES ─────────────────────────────────────────── */}
      <section className="bg-[#1A342B] py-20 text-white border-t border-[#B89A57]/30">
        <div className="container-luxe">
          <SectionHeading light eyebrow="THE COLLECTION" title="Explore Other Signature Venues" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venues
              .filter((v) => v.slug !== venue.slug)
              .map((v) => (
                <Link
                  key={v.slug}
                  to="/venues/$slug"
                  params={{ slug: v.slug }}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-[#B89A57]/20 shadow-md"
                >
                  <img
                    src={v.heroImage || v.image}
                    alt={v.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F231B]/90 via-[#0F231B]/20 to-transparent p-5 flex flex-col justify-end">
                    <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57]">{v.location}</p>
                    <p className="font-display text-lg text-white font-medium">{v.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
