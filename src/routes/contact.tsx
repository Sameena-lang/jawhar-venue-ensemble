import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, whatsappLink } from "@/data/venues";
import { SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Hospitality Concierge — Jawhar Groups" },
      { name: "description", content: "Connect with Jawhar Groups hospitality concierges. Schedule a site visit or inquire about venue availability." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      {/* Hero */}
      <section className="bg-[#C4DEC9] py-16 border-b border-[#1A342B]/15">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <p className="eyebrow !text-[#B89A57]">HOSPITALITY CONCIERGE</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A342B]">Let's Plan Your Celebration</h1>
          <p className="mt-4 text-base text-[#1A342B]/80 font-light">Our venue managers are available to assist you with hall tours, date inquiries, and customized event planning.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="container-luxe py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left — dark green info card for contrast */}
          <div className="lg:col-span-5 bg-[#1A342B] text-white p-8 sm:p-12 rounded-sm border border-[#B89A57]/30 flex flex-col justify-between shadow-xl">
            <div>
              <p className="eyebrow !text-[#B89A57]">JAWHAR GROUPS</p>
              <h2 className="mt-3 font-display text-3xl font-medium text-white">Direct Hospitality Line</h2>
              <p className="mt-4 text-sm text-white/80 leading-relaxed font-light">Reach out directly via phone, WhatsApp, or email to schedule a personal walkthrough tour of our five venues in Chennai.</p>
              <div className="mt-8 space-y-6 text-sm">
                {[
                  { Icon: Phone, label: "Phone Line", value: PHONE_DISPLAY },
                  { Icon: MessageCircle, label: "Instant WhatsApp", value: "+91 98765 43210", href: whatsappLink("Hello Jawhar Groups, I would like to schedule a venue visit.") },
                  { Icon: Mail, label: "Email Inquiries", value: "celebrations@jawhargroups.com" },
                  { Icon: MapPin, label: "Main Office Address", value: "Jawhar Grand, MM Tower, Chennai, Tamil Nadu, India" },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="bg-[#B89A57] text-[#1A342B] p-2.5 rounded-sm shrink-0"><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#B89A57] font-semibold">{label}</p>
                      {href ? <a href={href} target="_blank" rel="noreferrer" className="font-display text-lg font-medium text-white hover:text-[#B89A57] transition-colors">{value}</a> : <p className="font-display text-base font-medium text-white">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs text-white/60">Hours: Monday – Sunday: 8:00 AM – 9:00 PM</p>
            </div>
          </div>

          {/* Right — white form card */}
          <div className="lg:col-span-7 bg-white border border-[#1A342B]/15 p-8 sm:p-12 rounded-sm shadow-md text-[#1A342B]">
            <p className="eyebrow !text-[#B89A57]">SCHEDULE A SITE VISIT</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-[#1A342B]">Book a Walkthrough & Consultation</h2>
            <p className="mt-3 text-sm text-[#1A342B]/75 font-light">Fill out your preferred date below and our team will prepare a personalized venue tour for you.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our concierge will call you shortly to confirm your visit."); }} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-[#1A342B] mb-2">Your Name *</label>
                  <input type="text" required placeholder="e.g. Ramesh Kumar" className="w-full bg-[#E2EFE5] border border-[#1A342B]/20 px-4 py-3 text-sm text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-[#1A342B] mb-2">Mobile Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-[#E2EFE5] border border-[#1A342B]/20 px-4 py-3 text-sm text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-[#1A342B] mb-2">Preferred Venue</label>
                  <select className="w-full bg-[#E2EFE5] border border-[#1A342B]/20 px-4 py-3 text-sm text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm">
                    <option value="jawhar-grand">Jawhar Grand (MM Tower)</option>
                    <option value="jawhar-elite-ar-tower">Jawhar Elite AR Tower (OMR)</option>
                    <option value="jawhar-grand-palace">Jawhar Grand Palace (ECR)</option>
                    <option value="jawhar-garden-estate">Jawhar Garden Estate (Injambakkam)</option>
                    <option value="jawhar-convention-centre">Jawhar Convention Centre (Guindy)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-[#1A342B] mb-2">Event Type</label>
                  <select className="w-full bg-[#E2EFE5] border border-[#1A342B]/20 px-4 py-3 text-sm text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm">
                    <option>Wedding / Muhurtham</option><option>Reception</option><option>Engagement</option><option>Seemantham</option><option>Corporate Gala</option><option>Other Occasion</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-[#1A342B] mb-2">Special Requests or Questions</label>
                <textarea rows={3} placeholder="Tell us about your expected guest count or date preferences..." className="w-full bg-[#E2EFE5] border border-[#1A342B]/20 px-4 py-3 text-sm text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm" />
              </div>
              <button type="submit" className="btn-gold w-full text-center py-3.5">Submit Tour Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-luxe">
        <div className="bg-white p-8 sm:p-12 border border-[#1A342B]/15 rounded-sm shadow-md">
          <SectionHeading eyebrow="LOCATIONS" title="Visit Jawhar Grand MM Tower" />
          <div className="mt-8 aspect-[21/9] overflow-hidden rounded-sm border border-[#1A342B]/15">
            <iframe title="Google Map of Jawhar Grand" src="https://www.google.com/maps?q=Jawhar+Grand+Party+Hall+MM+Tower+Chennai&output=embed" className="h-full w-full border-0" loading="lazy" />
          </div>
        </div>
      </section>
    </main>
  );
}
