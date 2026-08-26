import { createFileRoute } from "@tanstack/react-router";
import { allGalleryImages } from "@/data/venues";
import { SectionHeading } from "@/components/Reveal";
import { MasonryGallery } from "@/components/MasonryGallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jawhar Groups" },
      {
        name: "description",
        content:
          "A curated gallery of weddings, receptions, décor and dining across the five Jawhar Groups venues in Chennai.",
      },
      { property: "og:title", content: "Gallery — Jawhar Groups" },
      {
        property: "og:description",
        content: "Moments of celebration across Jawhar venues — weddings, décor, dining and grand spaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="pt-32 pb-24 md:pb-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="The Gallery"
          title="Moments We've Had the Honour to Host"
          description="Browse by venue, wedding, décor or dining — tap any image to view it fullscreen."
        />
        <div className="mt-14">
          <MasonryGallery images={allGalleryImages} />
        </div>
      </div>
    </main>
  );
}
