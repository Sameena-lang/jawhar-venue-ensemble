import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { venues, heroImage } from "@/data/venues";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Our Heritage — Jawhar Groups" },
      { name: "description", content: "Discover the story and hospitality ethos behind Jawhar Groups luxury wedding venues in Chennai." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      <section className="relative bg-[#C4DEC9] py-24 text-white overflow-hidden flex flex-col justify-center">
        <img src={heroImage} alt="About Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A342B]/80 via-[#1A342B]/70 to-[#0F231B]" />
        <div className="container-luxe text-center max-w-4xl mx-auto relative z-10">
          <p className="eyebrow !text-[#B89A57]">OUR PHILOSOPHY & HERITAGE</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight text-white">Crafting Extraordinary Celebrations in Chennai</h1>
          <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">Jawhar Groups was founded on a simple promise: that life's most sacred and joyous occasions deserve architecture and hospitality worthy of their emotion.</p>
        </div>
      </section>

      {/* Brand story */}
      <section className="container-luxe py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow !text-[#B89A57]">THE JAWHAR ETHOS</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-[#1A342B]">Where Architecture Meets Heartfelt South Indian Hospitality</h2>
            <p className="mt-6 text-base leading-relaxed text-[#1A342B]/80 font-light">For generations, celebrations in South India have been centered around family togetherness, sacred rituals, and royal feasts. At Jawhar Groups, we blend these timeless traditions with modern luxury architecture.</p>
            <p className="mt-4 text-base leading-relaxed text-[#1A342B]/80 font-light">From soaring crystal chandeliers and marble foyers to climate-controlled banquet dining halls and sunset rooftop terraces, each of our five signature venues is thoughtfully designed to make your wedding or gala effortless and unforgettable.</p>
            <div className="mt-8 space-y-3">
              {["Signature Pillarless Ballrooms for Unobstructed Mandap Views", "In-House Master Culinary Team for Traditional Feasts & Buffets", "Full Climate Control, Generator Backup & Dedicated Valet Parking"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#B89A57] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-[#1A342B]/90">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm border border-[#1A342B]/20 shadow-md aspect-[4/3]">
              <img src="/src/assets/venues/jawhar-grand/jawhar-grand-main-hall.png" alt="Jawhar Grand main hall" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A342B]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#B89A57]">Jawhar Grand Flagship</p>
                <p className="font-display text-2xl font-medium">MM Tower · Chennai</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Venue collection — dark green section for contrast */}
      <section className="bg-[#1A342B] text-white py-20 border-t border-[#B89A57]/30">
        <div className="container-luxe">
          <SectionHeading light eyebrow="OUR COLLECTION" title="Five Signature Venues Across Chennai" description="Discover our portfolio of distinct venue experiences." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-[#C4DEC9]/10 border border-[#B89A57]/30 rounded-sm p-6 flex flex-col shadow-md">
                <div className="aspect-[16/10] overflow-hidden rounded-sm mb-4 border border-white/10">
                  <img src={venue.heroImage || venue.image} alt={venue.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[0.65rem] uppercase tracking-widest text-[#B89A57]">{venue.location}</p>
                <h3 className="font-display text-2xl font-medium text-white">{venue.name}</h3>
                <p className="mt-2 text-xs text-white/70 leading-relaxed font-light flex-1">{venue.description}</p>
                <Link to="/venues/$slug" params={{ slug: venue.slug }} className="btn-gold !py-2 text-xs mt-6 text-center">Explore {venue.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe py-20 text-center">
        <p className="eyebrow !text-[#B89A57]">BEGIN YOUR JOURNEY</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-[#1A342B]">Let Us Host Your Unforgettable Celebration</h2>
        <p className="mt-4 text-sm sm:text-base text-[#1A342B]/80 max-w-xl mx-auto font-light">Contact our venue concierges to arrange a private walkthrough tour of our spaces.</p>
        <div className="mt-8 flex justify-center"><Link to="/enquire" className="btn-gold">Schedule a Site Tour</Link></div>
      </section>
    </main>
  );
}
