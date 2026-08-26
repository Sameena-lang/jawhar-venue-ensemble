import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "The moment we walked into Jawhar Grand Palace, we knew. Our wedding felt like a royal durbar — the staff anticipated everything before we could ask.",
    name: "Ananya & Vikram",
    detail: "Wedding · Jawhar Grand Palace",
  },
  {
    quote:
      "Six hundred guests on a rooftop under fairy lights, and not one detail out of place. The coordination team was simply extraordinary.",
    name: "Meera Krishnan",
    detail: "Reception · Jawhar Elite AR Tower",
  },
  {
    quote:
      "From the seemantham at dawn to the reception at dusk, the Garden Estate gave our family a day we will treasure for generations.",
    name: "The Raghavan Family",
    detail: "Seemantham · Jawhar Garden Estate",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.12}>
          <figure className="flex h-full flex-col bg-card p-8 shadow-[0_20px_60px_-35px_rgba(32,60,50,0.35)]">
            <Quote className="h-8 w-8 text-gold" aria-hidden />
            <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-forest italic">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <p className="text-sm font-semibold text-forest">{t.name}</p>
              <p className="mt-0.5 text-xs tracking-widest text-muted-foreground uppercase">
                {t.detail}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
