import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { venues, isDateBooked } from "@/data/venues";

const SESSIONS = ["Morning", "Evening", "Full Day"] as const;

export function AvailabilityCalendar({ fixedVenue }: { fixedVenue?: string }) {
  const [venue, setVenue] = useState(fixedVenue ?? venues[0]?.slug ?? "");
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [session, setSession] = useState<(typeof SESSIONS)[number]>("Evening");
  const [guests, setGuests] = useState("");

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= count; d++) cells.push(d);
    return cells;
  }, [year, month]);

  const monthName = viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const selectedStatus = selected ? !isDateBooked(venue, selected) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Calendar */}
      <div className="bg-[#E2EFE5] border border-[#1A342B]/20 p-6 md:p-8 rounded-sm text-[#1A342B]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <label htmlFor="venue-select" className="eyebrow !text-[#B89A57]">Venue</label>
            <select
              id="venue-select"
              value={venue}
              disabled={!!fixedVenue}
              onChange={(e) => { setVenue(e.target.value); setSelected(null); }}
              className="mt-2 block w-full border border-[#1A342B]/25 bg-white px-4 py-3 text-sm text-[#1A342B] focus:outline-none focus:border-[#1A342B] disabled:opacity-70 rounded-sm"
            >
              {venues.map((v) => (
                <option key={v.slug} value={v.slug}>{v.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setMonthOffset((m) => Math.max(0, m - 1))} disabled={monthOffset === 0} className="p-2 text-[#1A342B] hover:text-[#B89A57] disabled:opacity-30 transition-colors" aria-label="Previous month">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <p className="font-display text-xl text-[#1A342B] font-medium">{monthName}</p>
            <button onClick={() => setMonthOffset((m) => Math.min(11, m + 1))} className="p-2 text-[#1A342B] hover:text-[#B89A57] transition-colors" aria-label="Next month">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold tracking-widest text-[#B89A57] uppercase">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (d === null) return <div key={`e${i}`} />;
            const date = new Date(year, month, d);
            const iso = date.toISOString().slice(0, 10);
            const past = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const booked = isDateBooked(venue, iso);
            const isSel = selected === iso;
            return (
              <button
                key={iso} disabled={past} onClick={() => setSelected(iso)} aria-pressed={isSel}
                aria-label={`${date.toDateString()} — ${booked ? "booked" : "available"}`}
                className={`aspect-square text-sm transition-all rounded-sm font-medium ${
                  isSel ? "bg-[#B89A57] font-bold text-[#1A342B]"
                    : past ? "text-[#1A342B]/25"
                    : booked ? "bg-[#1A342B]/15 text-[#1A342B]/40 line-through"
                    : "bg-white text-[#1A342B] hover:bg-[#C4DEC9] border border-[#1A342B]/15"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex gap-6 text-xs text-[#1A342B]/70">
          <span className="flex items-center gap-2"><span className="h-3 w-3 bg-white border border-[#1A342B]/20 rounded-sm" /> Available</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[#1A342B]/15 rounded-sm" /> Booked</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[#B89A57] rounded-sm" /> Selected</span>
        </div>
      </div>

      {/* Side Panel — dark green for contrast */}
      <div className="flex flex-col bg-[#1A342B] border border-[#B89A57]/30 p-8 text-white rounded-sm shadow-xl justify-between">
        <div>
          <p className="eyebrow !text-[#B89A57]">CHECK AVAILABILITY</p>
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-xs tracking-widest text-[#B89A57] uppercase font-semibold">Session</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SESSIONS.map((s) => (
                  <button key={s} onClick={() => setSession(s)}
                    className={`border px-2 py-2.5 text-xs transition-colors rounded-sm ${session === s ? "border-[#B89A57] bg-[#B89A57] text-[#1A342B] font-semibold" : "border-white/20 text-white/80 hover:border-[#B89A57]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="guests" className="text-xs tracking-widest text-[#B89A57] uppercase font-semibold">Expected Guests</label>
              <input id="guests" type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 500"
                className="mt-2 w-full border border-white/20 bg-[#0F231B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#B89A57] focus:outline-none rounded-sm" />
            </div>
            {selected && (
              <div className={`flex items-start gap-3 border p-4 rounded-sm ${selectedStatus ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-rose-500/50 bg-rose-500/10 text-rose-300"}`} role="status">
                {selectedStatus ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />}
                <p className="text-xs sm:text-sm leading-relaxed">
                  {new Date(selected + "T00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}{" "}
                  · {session} session is <strong>{selectedStatus ? "available" : "already booked"}</strong>
                  {selectedStatus ? " — reserve it before it's gone." : " — try another date or venue."}
                </p>
              </div>
            )}
          </div>
        </div>
        <a href="/enquire" className="btn-gold mt-6 w-full text-center">
          {selectedStatus === false ? "Enquire for Alternatives" : "Reserve This Date"}
        </a>
      </div>
    </div>
  );
}
