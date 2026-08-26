import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/venues";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/#venues", label: "Venues", href: "/#venues" },
  { to: "/#events", label: "Events", href: "/#events" },
  { to: "/#services", label: "Services", href: "/#services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/#contact", label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/95 shadow-[0_1px_0_var(--border)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span
            className={`font-display text-2xl font-semibold tracking-wide transition-colors ${
              scrolled ? "text-forest" : "text-white"
            }`}
          >
            Jawhar
          </span>
          <span
            className={`text-[0.6rem] font-medium tracking-luxe uppercase transition-colors ${
              scrolled ? "text-gold" : "text-gold"
            }`}
          >
            Groups
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href ?? item.to}
              className={`text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors hover:text-gold ${
                scrolled ? "text-forest" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
          <Link to="/enquire" className="btn-gold !py-3 !px-6">
            Book Venue
          </Link>
        </nav>

        <button
          className={`lg:hidden ${scrolled ? "text-forest" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-ivory px-6 py-6 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-5">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href ?? item.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium tracking-[0.2em] uppercase text-forest"
              >
                {item.label}
              </a>
            ))}
            <Link to="/enquire" onClick={() => setOpen(false)} className="btn-gold w-fit">
              Book Venue
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-white/80">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-semibold text-white">Jawhar Groups</p>
          <p className="mt-1 text-[0.65rem] tracking-luxe uppercase text-gold">
            Luxury Wedding Venues & Premium Event Spaces
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Creating unforgettable celebrations through elegant venues and exceptional
            hospitality across Chennai.
          </p>
        </div>
        <div>
          <p className="eyebrow">Our Venues</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["jawhar-grand", "Jawhar Grand"],
              ["jawhar-elite-ar-tower", "Jawhar Elite AR Tower"],
              ["jawhar-grand-palace", "Jawhar Grand Palace"],
              ["jawhar-garden-estate", "Jawhar Garden Estate"],
              ["jawhar-convention-centre", "Jawhar Convention Centre"],
            ].map(([slug, name]) => (
              <li key={slug}>
                <Link
                  to="/venues/$slug"
                  params={{ slug }}
                  className="text-white/70 transition-colors hover:text-gold"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Begin Your Celebration</p>
          <p className="mt-5 text-sm text-white/70">
            +91 98765 43210
            <br />
            celebrations@jawhargroups.com
            <br />
            Chennai, Tamil Nadu
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/enquire" className="btn-gold !py-3 !px-5">
              Enquire Now
            </Link>
            <a
              href={whatsappLink("Hello Jawhar Groups, I'd like to enquire about your venues.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-ivory !py-3 !px-5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-widest text-white/40 uppercase">
        © {new Date().getFullYear()} Jawhar Groups · Crafted celebrations, Chennai
      </div>
    </footer>
  );
}
