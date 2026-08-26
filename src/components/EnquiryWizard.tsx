import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Check } from "lucide-react";
import { EVENT_TYPES, SERVICES, whatsappLink } from "@/data/venues";

const STEPS = ["Event Type", "Date", "Guests", "Services", "Contact"] as const;

interface Enquiry {
  eventType: string;
  date: string;
  guests: string;
  services: string[];
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const initial: Enquiry = {
  eventType: "",
  date: "",
  guests: "",
  services: [],
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export function EnquiryWizard({ prefillVenue }: { prefillVenue?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Enquiry>(initial);
  const [done, setDone] = useState(false);

  const set = (patch: Partial<Enquiry>) => setData((d) => ({ ...d, ...patch }));

  const canNext =
    (step === 0 && !!data.eventType) ||
    (step === 1 && !!data.date) ||
    (step === 2 && !!data.guests) ||
    step === 3 ||
    (step === 4 && !!data.name && !!data.phone);

  const summaryMessage = `New Enquiry — Jawhar Groups
Event: ${data.eventType}
Date: ${data.date}
Guests: ${data.guests}
Services: ${data.services.join(", ") || "Venue only"}
${prefillVenue ? `Venue: ${prefillVenue}\n` : ""}Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Notes: ${data.notes || "—"}`;

  const submit = () => setDone(true);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl bg-card p-10 text-center shadow-[0_30px_80px_-40px_rgba(32,60,50,0.4)]"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pastel-green">
          <Check className="h-8 w-8 text-forest" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-forest">Thank you, {data.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your enquiry for a {data.eventType.toLowerCase()} on{" "}
          {new Date(data.date + "T00:00").toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          has been received. Our celebrations team will call you within 24 hours.
        </p>
        <a
          href={whatsappLink(summaryMessage)}
          target="_blank"
          rel="noreferrer"
          className="btn-gold mt-8"
        >
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl bg-card shadow-[0_30px_80px_-40px_rgba(32,60,50,0.4)]">
      <div className="flex border-b border-border">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1 transition-colors duration-500 ${i <= step ? "bg-gold" : "bg-muted"}`}
            />
            <p
              className={`hidden px-2 py-3 text-center text-[0.6rem] tracking-widest uppercase sm:block ${
                i === step ? "font-semibold text-forest" : "text-muted-foreground"
              }`}
            >
              {i + 1}. {s}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl text-forest">What are we celebrating?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {EVENT_TYPES.map((e) => (
                    <button
                      key={e.name}
                      type="button"
                      onClick={() => set({ eventType: e.name })}
                      aria-pressed={data.eventType === e.name}
                      className={`border px-3 py-4 text-sm transition-all ${
                        data.eventType === e.name
                          ? "border-gold bg-gold/10 font-semibold text-forest"
                          : "border-border text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {e.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-2xl text-forest">When is your celebration?</legend>
                <label htmlFor="eq-date" className="sr-only">Event date</label>
                <input
                  id="eq-date"
                  type="date"
                  value={data.date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => set({ date: e.target.value })}
                  className="mt-6 w-full border border-input bg-transparent px-4 py-4 text-forest focus:border-gold focus:outline-none"
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  Flexible on dates? Leave a note in the final step.
                </p>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-display text-2xl text-forest">How many guests?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Up to 200", "200–500", "500–1000", "1000+"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set({ guests: g })}
                      aria-pressed={data.guests === g}
                      className={`border px-3 py-4 text-sm transition-all ${
                        data.guests === g
                          ? "border-gold bg-gold/10 font-semibold text-forest"
                          : "border-border text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend className="font-display text-2xl text-forest">Which services do you need?</legend>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SERVICES.map((s) => {
                    const on = data.services.includes(s.name);
                    return (
                      <button
                        key={s.name}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          set({
                            services: on
                              ? data.services.filter((x) => x !== s.name)
                              : [...data.services, s.name],
                          })
                        }
                        className={`border px-3 py-4 text-sm transition-all ${
                          on
                            ? "border-gold bg-gold/10 font-semibold text-forest"
                            : "border-border text-muted-foreground hover:border-gold"
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend className="font-display text-2xl text-forest">Almost there — your details</legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input
                    aria-label="Full name"
                    placeholder="Full name *"
                    value={data.name}
                    onChange={(e) => set({ name: e.target.value })}
                    className="border border-input bg-transparent px-4 py-3.5 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    aria-label="Phone number"
                    placeholder="Phone *"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => set({ phone: e.target.value })}
                    className="border border-input bg-transparent px-4 py-3.5 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    aria-label="Email address"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => set({ email: e.target.value })}
                    className="border border-input bg-transparent px-4 py-3.5 text-sm focus:border-gold focus:outline-none sm:col-span-2"
                  />
                  <textarea
                    aria-label="Notes"
                    placeholder="Anything we should know?"
                    value={data.notes}
                    onChange={(e) => set({ notes: e.target.value })}
                    rows={3}
                    className="border border-input bg-transparent px-4 py-3.5 text-sm focus:border-gold focus:outline-none sm:col-span-2"
                  />
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < 4 ? (
            <button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} className="btn-gold disabled:opacity-40">
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => canNext && submit()} disabled={!canNext} className="btn-gold disabled:opacity-40">
              Submit Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
