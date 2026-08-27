import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "The moment we walked into Jawhar Grand Palace, we knew. Our wedding felt like a royal durbar — the staff anticipated everything before we could ask.",
    name: "Ananya & Vikram",
    detail: "Wedding · Jawhar Grand Palace",
  },
  {
    quote: "Six hundred guests on a rooftop under fairy lights, and not one detail out of place. The coordination team was simply extraordinary.",
    name: "Meera Krishnan",
    detail: "Reception · Jawhar Elite AR Tower",
  },
  {
    quote: "From the seemantham at dawn to the reception at dusk, the Garden Estate gave our family a day we will treasure for generations.",
    name: "The Raghavan Family",
    detail: "Seemantham · Jawhar Garden Estate",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.12}>
          <figure className="flex h-full flex-col bg-white border border-[#1A342B]/15 p-8 rounded-sm shadow-sm text-[#1A342B]">
            <Quote className="h-8 w-8 text-[#B89A57]" aria-hidden />
            <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-[#1A342B]/90 italic font-light">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 border-t border-[#1A342B]/10 pt-4">
              <p className="text-sm font-semibold text-[#1A342B]">{t.name}</p>
              <p className="mt-0.5 text-xs tracking-widest text-[#B89A57] uppercase font-medium">{t.detail}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
