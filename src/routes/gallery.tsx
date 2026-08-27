import { createFileRoute, Link } from "@tanstack/react-router";
import { allGalleryImages } from "@/data/venues";
import { SectionHeading } from "@/components/Reveal";
import { MasonryGallery } from "@/components/MasonryGallery";

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
      <div className="container-luxe">
        <SectionHeading eyebrow="THE GALLERY" title="Moments We've Had the Honour to Host" description="Browse by venue, wedding, décor or dining — tap any image to view it fullscreen." />
        <div className="mt-14">
          <MasonryGallery images={allGalleryImages} />
        </div>
      </div>
    </main>
  );
}
