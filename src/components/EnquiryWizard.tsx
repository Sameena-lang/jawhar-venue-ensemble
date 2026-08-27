import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Check } from "lucide-react";
import { EVENT_TYPES, SERVICES, whatsappLink } from "@/data/venues";

const STEPS = ["Event Type", "Date", "Guests", "Services", "Contact"] as const;

interface Enquiry {
  eventType: string; date: string; guests: string;
  services: string[]; name: string; phone: string; email: string; notes: string;
}

const initial: Enquiry = { eventType: "", date: "", guests: "", services: [], name: "", phone: "", email: "", notes: "" };

export function EnquiryWizard({ prefillVenue }: { prefillVenue?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Enquiry>(initial);
  const [done, setDone] = useState(false);
  const set = (patch: Partial<Enquiry>) => setData((d) => ({ ...d, ...patch }));

  const canNext =
    (step === 0 && !!data.eventType) || (step === 1 && !!data.date) ||
    (step === 2 && !!data.guests) || step === 3 ||
    (step === 4 && !!data.name && !!data.phone);

  const summaryMessage = `New Enquiry — Jawhar Groups\nEvent: ${data.eventType}\nDate: ${data.date}\nGuests: ${data.guests}\nServices: ${data.services.join(", ") || "Venue only"}\n${prefillVenue ? `Venue: ${prefillVenue}\n` : ""}Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nNotes: ${data.notes || "—"}`;

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-xl bg-white border border-[#1A342B]/15 p-10 text-center text-[#1A342B] rounded-sm shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1A342B]">
          <Check className="h-8 w-8 text-[#C4DEC9]" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-[#1A342B] font-medium">Thank you, {data.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-[#1A342B]/75 font-light">
          Your enquiry for a {data.eventType.toLowerCase()} on {new Date(data.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} has been received. Our celebrations team will call you within 24 hours.
        </p>
        <a href={whatsappLink(summaryMessage)} target="_blank" rel="noreferrer" className="btn-gold mt-8">
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  const btnClass = (active: boolean) =>
    `border px-3 py-4 text-sm transition-all rounded-sm font-medium ${active ? "border-[#1A342B] bg-[#1A342B] text-[#C4DEC9]" : "border-[#1A342B]/20 bg-white text-[#1A342B]/75 hover:border-[#1A342B] hover:bg-[#E2EFE5]"}`;

  return (
    <div className="mx-auto max-w-2xl bg-white border border-[#1A342B]/15 rounded-sm shadow-xl text-[#1A342B]">
      {/* Progress bar */}
      <div className="flex border-b border-[#1A342B]/10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1 transition-colors duration-500 ${i <= step ? "bg-[#B89A57]" : "bg-[#C4DEC9]"}`} />
            <p className={`hidden px-2 py-3 text-center text-[0.6rem] tracking-widest uppercase sm:block ${i === step ? "font-semibold text-[#1A342B]" : "text-[#1A342B]/40"}`}>0{i + 1}. {s}</p>
          </div>
        ))}
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl text-[#1A342B] font-medium">What are we celebrating?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {EVENT_TYPES.map((e) => (
                    <button key={e.name} type="button" onClick={() => set({ eventType: e.name })} aria-pressed={data.eventType === e.name} className={btnClass(data.eventType === e.name)}>{e.name}</button>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 1 && (
              <fieldset>
                <legend className="font-display text-2xl text-[#1A342B] font-medium">When is your celebration?</legend>
                <input type="date" value={data.date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => set({ date: e.target.value })}
                  className="mt-6 w-full border border-[#1A342B]/25 bg-[#E2EFE5] px-4 py-4 text-[#1A342B] focus:border-[#1A342B] focus:outline-none rounded-sm" />
                <p className="mt-3 text-xs text-[#1A342B]/55">Flexible on dates? Leave a note in the final step.</p>
              </fieldset>
            )}
            {step === 2 && (
              <fieldset>
                <legend className="font-display text-2xl text-[#1A342B] font-medium">How many guests?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Up to 200", "200–500", "500–1000", "1000+"].map((g) => (
                    <button key={g} type="button" onClick={() => set({ guests: g })} aria-pressed={data.guests === g} className={btnClass(data.guests === g)}>{g}</button>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 3 && (
              <fieldset>
                <legend className="font-display text-2xl text-[#1A342B] font-medium">Which services do you need?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SERVICES.map((s) => {
                    const on = data.services.includes(s.name);
                    return (
                      <button key={s.name} type="button" aria-pressed={on}
                        onClick={() => set({ services: on ? data.services.filter((x) => x !== s.name) : [...data.services, s.name] })}
                        className={btnClass(on)}>{s.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
            {step === 4 && (
              <fieldset>
                <legend className="font-display text-2xl text-[#1A342B] font-medium">Almost there — your details</legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input aria-label="Full name" placeholder="Full name *" value={data.name} onChange={(e) => set({ name: e.target.value })} className="border border-[#1A342B]/20 bg-[#E2EFE5] px-4 py-3.5 text-sm text-[#1A342B] placeholder:text-[#1A342B]/40 focus:border-[#1A342B] focus:outline-none rounded-sm" />
                  <input aria-label="Phone number" placeholder="Phone *" type="tel" value={data.phone} onChange={(e) => set({ phone: e.target.value })} className="border border-[#1A342B]/20 bg-[#E2EFE5] px-4 py-3.5 text-sm text-[#1A342B] placeholder:text-[#1A342B]/40 focus:border-[#1A342B] focus:outline-none rounded-sm" />
                  <input aria-label="Email address" placeholder="Email" type="email" value={data.email} onChange={(e) => set({ email: e.target.value })} className="border border-[#1A342B]/20 bg-[#E2EFE5] px-4 py-3.5 text-sm text-[#1A342B] placeholder:text-[#1A342B]/40 focus:border-[#1A342B] focus:outline-none sm:col-span-2 rounded-sm" />
                  <textarea aria-label="Notes" placeholder="Anything we should know?" value={data.notes} onChange={(e) => set({ notes: e.target.value })} rows={3} className="border border-[#1A342B]/20 bg-[#E2EFE5] px-4 py-3.5 text-sm text-[#1A342B] placeholder:text-[#1A342B]/40 focus:border-[#1A342B] focus:outline-none sm:col-span-2 rounded-sm" />
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-[#1A342B]/55 hover:text-[#1A342B] uppercase disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < 4 ? (
            <button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} className="btn-gold disabled:opacity-40">Next <ArrowRight className="h-4 w-4" /></button>
          ) : (
            <button onClick={() => canNext && setDone(true)} disabled={!canNext} className="btn-gold disabled:opacity-40">Submit Enquiry</button>
          )}
        </div>
      </div>
    </div>
  );
}
