import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/venues";

const CATEGORIES = ["All", "Venues", "Weddings", "Decor", "Dining"] as const;

export function MasonryGallery({
  images,
  showFilters = true,
}: {
  images: GalleryImage[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const filtered = filter === "All" ? images : images.filter((i) => i.category === filter);

  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? null : (a - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, next, prev]);

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Gallery categories">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-all ${
                filter === c
                  ? "bg-forest text-ivory"
                  : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
        {filtered.map((img, i) => (
          <motion.figure
            key={img.src + img.caption}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="group relative cursor-pointer overflow-hidden break-inside-avoid"
            onClick={() => setActive(i)}
          >
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-sm font-medium tracking-wide text-white">{img.caption}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && filtered[active] !== undefined && (() => { const current = filtered[active]!; return (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              const endX = e.changedTouches[0]?.clientX;
              if (touchX === null || endX === undefined) return;
              const dx = endX - touchX;
              if (dx < -50) next();
              else if (dx > 50) prev();
              setTouchX(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              className="absolute right-5 top-5 text-white/70 hover:text-gold"
              onClick={() => setActive(null)}
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-gold md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.caption}
                className="max-h-[76vh] w-auto max-w-full object-contain"
              />
              <p className="mt-4 text-center text-sm tracking-wide text-white/80">
                {current.caption}
                <span className="ml-3 text-white/40">
                  {active + 1} / {filtered.length}
                </span>
              </p>
            </motion.div>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-gold md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        );})()}
      </AnimatePresence>
    </div>
  );
}
