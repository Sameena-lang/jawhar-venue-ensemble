import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "How far in advance should we book?",
    a: "For peak wedding season (November–February and auspicious muhurtham dates), we recommend reserving 8–12 months ahead. Off-season dates can often be confirmed within 2–3 months.",
  },
  {
    q: "Can we bring our own caterer or decorator?",
    a: "Our in-house teams deliver the signature Jawhar experience, but select venues allow empanelled external vendors. Speak with our planners and we'll craft the arrangement that suits you.",
  },
  {
    q: "Is accommodation available for outstation guests?",
    a: "Yes. Guest rooms and suites are available at or near every property, and our team manages room blocks, check-ins and airport transfers on request.",
  },
  {
    q: "What is included in the venue package?",
    a: "Every booking includes the venue, standard furniture, climate control, power backup, security and housekeeping. Catering, décor, photography and coordination can be added as tailored services.",
  },
  {
    q: "Do you host traditional ceremonies like Seemantham?",
    a: "Absolutely. Our venues honour traditional rituals — from homam-friendly halls to traditional kitchens and priest coordination. Jawhar Grand Palace is especially beloved for heritage ceremonies.",
  },
  {
    q: "What is the payment and cancellation policy?",
    a: "A token advance reserves your date, with staged payments leading to the event. Cancellations are refunded on a sliding scale; your planner will share the full schedule in writing.",
  },
];

export function Faq({ items = DEFAULT_FAQS, light = false }: { items?: FaqItem[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => (
        <div
          key={item.q}
          className={`border-b ${light ? "border-white/15" : "border-border"}`}
        >
          <button
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span
              className={`font-display text-lg font-medium md:text-xl ${
                light ? "text-white" : "text-forest"
              }`}
            >
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              className={`shrink-0 ${light ? "text-gold" : "text-gold"}`}
            >
              <Plus className="h-5 w-5" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className={`pb-6 text-sm leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
