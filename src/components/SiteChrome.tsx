import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { whatsappLink, PHONE_DISPLAY } from "@/data/venues";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/venues", label: "Venues" },
  { to: "/events", label: "Events" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/availability", label: "Availability" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#C4DEC9]/95 border-b border-[#1A342B]/20 backdrop-blur-md transition-all duration-300">
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-wide text-[#1A342B]">
            Jawhar
          </span>
          <span className="text-[0.62rem] font-semibold tracking-[0.3em] uppercase text-[#B89A57]">
            Groups
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{
                className: "border border-[#1A342B] text-[#1A342B] px-3 py-1.5 rounded-sm font-semibold bg-[#1A342B]/10",
              }}
              inactiveProps={{
                className: "text-[#1A342B]/80 hover:text-[#1A342B] px-2 py-1.5",
              }}
              className="text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-all"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/enquire" className="btn-gold !py-2 !px-5 !text-[0.7rem] shadow-sm">
            Enquire
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="p-2 text-[#1A342B] hover:text-[#B89A57] transition-colors lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[#1A342B]/20 bg-[#C4DEC9] px-6 py-8 text-[#1A342B] lg:hidden"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-4">
              {NAV.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "text-[#1A342B] font-semibold border-l-2 border-[#B89A57] pl-3" }}
                    inactiveProps={{ className: "text-[#1A342B]/80 hover:text-[#1A342B]" }}
                    className="block text-sm font-medium tracking-[0.25em] uppercase transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  to="/enquire"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full text-center"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1A342B] text-white/80 border-t border-[#B89A57]/30">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="inline-block">
            <p className="font-display text-3xl font-semibold text-white">Jawhar Groups</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.3em] uppercase text-[#B89A57]">
              Luxury Venues & Hospitality
            </p>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70 font-light">
            Creating unforgettable celebrations across Chennai with signature architecture, bespoke decor and 5-star South Indian hospitality.
          </p>
        </div>

        <div>
          <p className="eyebrow !text-[#B89A57]">Our Venues</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {([
              ["jawhar-grand", "Jawhar Grand"],
              ["jawhar-elite-ar-tower", "Jawhar Elite AR Tower"],
              ["jawhar-grand-palace", "Jawhar Grand Palace"],
              ["jawhar-garden-estate", "Jawhar Garden Estate"],
              ["jawhar-convention-centre", "Jawhar Convention Centre"],
            ] as [string, string][]).map(([slug, name]) => (
              <li key={slug}>
                <Link
                  to="/venues/$slug"
                  params={{ slug }}
                  className="text-white/80 transition-colors hover:text-[#B89A57]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-[#B89A57]">Quick Links</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/80 transition-colors hover:text-[#B89A57]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/enquire" className="text-white/80 transition-colors hover:text-[#B89A57]">
                Concierge Enquiry
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-[#B89A57]">Contact Hospitality</p>
          <div className="mt-5 space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#B89A57]" /> {PHONE_DISPLAY}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#B89A57]" /> celebrations@jawhargroups.com
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-[#B89A57] shrink-0 mt-0.5" /> Chennai, Tamil Nadu, India
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/enquire" className="btn-gold !py-2.5 !px-4 !text-[0.7rem]">
              Enquire Now
            </Link>
            <a
              href={whatsappLink("Hello Jawhar Groups, I would like to enquire about venue availability.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-ivory !py-2.5 !px-4 !text-[0.7rem] !border-white/40 !text-white hover:!bg-white hover:!text-[#1A342B]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs tracking-widest text-white/40 uppercase">
        © {new Date().getFullYear()} Jawhar Groups · Luxury Event & Wedding Venues · Chennai
      </div>
    </footer>
  );
}
