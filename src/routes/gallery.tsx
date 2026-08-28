import { createFileRoute, Link } from "@tanstack/react-router";
import { allGalleryImages } from "@/data/venues";
import { SectionHeading } from "@/components/Reveal";
import { MasonryGallery } from "@/components/MasonryGallery";
import galleryHeroImage from "@/assets/hero-bg-1.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jawhar Groups" },
      { name: "description", content: "A curated gallery of weddings, receptions, décor and dining across the five Jawhar Groups venues in Chennai." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24 md:pb-32">
      {/* ── Hero ── */}
      <section className="relative bg-[#C4DEC9] py-24 text-white overflow-hidden flex flex-col justify-center">
        <img src={galleryHeroImage} alt="Gallery Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A342B]/80 via-[#1A342B]/70 to-[#0F231B]" />
        <div className="container-luxe text-center max-w-3xl mx-auto relative z-10">
          <p className="eyebrow !text-[#B89A57]">THE GALLERY</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white">Moments We've Had the Honour to Host</h1>
          <p className="mt-4 text-base text-white/80 font-light">Browse by venue, wedding, décor or dining — tap any image to view it fullscreen.</p>
        </div>
      </section>

      <div className="container-luxe mt-14">
        <MasonryGallery images={allGalleryImages} />
      </div>
    </main>
  );
}
