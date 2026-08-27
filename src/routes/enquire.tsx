import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { EnquiryWizard } from "@/components/EnquiryWizard";
import { whatsappLink, PHONE_DISPLAY } from "@/data/venues";

export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Concierge Enquiry — Jawhar Groups" },
      { name: "description", content: "Plan your celebration with Jawhar Groups in five guided concierge steps." },
    ],
  }),
  component: EnquirePage,
});

function EnquirePage() {
  return (
    <main className="min-h-screen bg-[#C4DEC9] text-[#1A342B] pt-28 pb-24">
      <section className="bg-[#C4DEC9] py-16 border-b border-[#1A342B]/15">
        <div className="container-luxe text-center max-w-3xl mx-auto">
          <p className="eyebrow !text-[#B89A57]">CONCIERGE BOOKING WIZARD</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1A342B]">Plan Your Celebration</h1>
          <p className="mt-4 text-base text-[#1A342B]/80 font-light">Five simple steps to help us tailor hall arrangements, dining menus, and dates for your special day.</p>
        </div>
      </section>
      <div className="container-luxe py-16">
        <EnquiryWizard />
        <div className="mt-12 text-center text-sm text-[#1A342B]/75 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-2 font-medium"><Phone className="h-4 w-4 text-[#B89A57]" /> Direct Call: {PHONE_DISPLAY}</span>
          <a href={whatsappLink("Hello Jawhar Groups, I would like to make a quick event inquiry.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#1A342B] hover:text-[#B89A57] transition-colors underline decoration-[#B89A57] underline-offset-4">
            <MessageCircle className="h-4 w-4 text-[#B89A57]" /> Instant WhatsApp Concierge
          </a>
        </div>
      </div>
    </main>
  );
}
