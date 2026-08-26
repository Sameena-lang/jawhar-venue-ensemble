import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { EnquiryWizard } from "@/components/EnquiryWizard";
import { SectionHeading } from "@/components/Reveal";
import { whatsappLink } from "@/data/venues";

export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Enquire — Jawhar Groups" },
      {
        name: "description",
        content:
          "Plan your celebration with Jawhar Groups in five guided steps — event type, date, guests, services and contact details.",
      },
      { property: "og:title", content: "Enquire — Jawhar Groups" },
      { property: "og:description", content: "Plan your celebration in five guided steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnquirePage,
});

function EnquirePage() {
  return (
    <main className="bg-pastel-green/30 pt-32 pb-24 md:pb-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Guided Enquiry"
          title="Tell Us About Your Celebration"
          description="Five gentle steps — and our celebrations team will call you back within 24 hours."
        />
        <div className="mt-14">
          <EnquiryWizard />
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prefer to talk now?{" "}
          <a
            href={whatsappLink("Hello Jawhar Groups, I'd like to enquire about hosting an event.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-forest underline decoration-gold underline-offset-4"
          >
            <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
          </a>
        </p>
      </div>
    </main>
  );
}
