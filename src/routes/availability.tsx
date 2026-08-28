import { createFileRoute, Link } from "@tanstack/react-router";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { SectionHeading } from "@/components/Reveal";
import availabilityHeroImage from "@/assets/hero-bg-4.jpg";

export const Route = createFileRoute("/availability")({
  head: () => ({
    meta: [
      { title: "Venue Availability Calendar — Jawhar Groups" },
      { name: "description", content: "Check live availability dates across Jawhar Groups luxury venues in Chennai." },
    ],
  }),
  component: AvailabilityPage,
});

function AvailabilityPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      <section className="relative bg-[#C4DEC9] py-24 text-white overflow-hidden flex flex-col justify-center">
        <img src={availabilityHeroImage} alt="Availability Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A342B]/80 via-[#1A342B]/70 to-[#0F231B]" />
        <div className="container-luxe text-center max-w-3xl mx-auto relative z-10">
          <p className="eyebrow !text-[#B89A57]">LIVE DATE CONCIERGE</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white">Check Venue Availability</h1>
          <p className="mt-4 text-base text-white/80 font-light">Select your preferred venue and date below to check session availability across our five signature properties.</p>
        </div>
      </section>

      <section className="container-luxe py-16">
        <div className="bg-white border border-[#1A342B]/15 p-6 sm:p-12 rounded-sm shadow-md">
          <SectionHeading eyebrow="CALENDAR CONCIERGE" title="Select Venue & Auspicious Date" description="Our live calendar reflects real-time reservations for Morning, Evening, and Full Day sessions." />
          <div className="mt-12"><AvailabilityCalendar /></div>
        </div>
      </section>

      {/* CTA — dark green block for contrast */}
      <section className="container-luxe py-6">
        <div className="bg-[#1A342B] text-white p-10 sm:p-14 border border-[#B89A57]/30 rounded-sm text-center shadow-xl">
          <p className="eyebrow !text-[#B89A57]">NEED AN AUSPICIOUS MUHURTHAM DATE?</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium">Looking for specific wedding muhurtham dates?</h2>
          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light">Our hospitality concierges can assist in aligning auspicious Tamil calendar dates with hall availability.</p>
          <div className="mt-8 flex justify-center"><Link to="/enquire" className="btn-gold">Consult Date Concierge</Link></div>
        </div>
      </section>
    </main>
  );
}
