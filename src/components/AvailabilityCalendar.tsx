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
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="bg-card p-6 shadow-[0_20px_60px_-30px_rgba(32,60,50,0.35)] md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <label htmlFor="venue-select" className="eyebrow">Venue</label>
            <select
              id="venue-select"
              value={venue}
              disabled={!!fixedVenue}
              onChange={(e) => {
                setVenue(e.target.value);
                setSelected(null);
              }}
              className="mt-2 block w-full border border-input bg-transparent px-4 py-3 text-sm text-forest focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-70"
            >
              {venues.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
              disabled={monthOffset === 0}
              className="p-2 text-forest disabled:opacity-30"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <p className="font-display text-xl text-forest">{monthName}</p>
            <button
              onClick={() => setMonthOffset((m) => Math.min(11, m + 1))}
              className="p-2 text-forest"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold tracking-widest text-muted-foreground uppercase">
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
                key={iso}
                disabled={past}
                onClick={() => setSelected(iso)}
                aria-pressed={isSel}
                aria-label={`${date.toDateString()} — ${booked ? "booked" : "available"}`}
                className={`aspect-square text-sm transition-all ${
                  isSel
                    ? "bg-gold font-bold text-forest-deep"
                    : past
                      ? "text-muted-foreground/30"
                      : booked
                        ? "bg-muted text-muted-foreground line-through decoration-destructive/50"
                        : "bg-pastel-green/60 text-forest hover:bg-pastel-green"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-pastel-green" /> Available
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-muted" /> Booked
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-gold" /> Selected
          </span>
        </div>
      </div>

      <div className="flex flex-col bg-forest p-8 text-ivory">
        <p className="eyebrow">Check Availability</p>
        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="session" className="text-xs tracking-widest text-white/60 uppercase">Session</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {SESSIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSession(s)}
                  className={`border px-2 py-2.5 text-xs transition-colors ${
                    session === s
                      ? "border-gold bg-gold text-forest-deep"
                      : "border-white/20 text-white/70 hover:border-gold/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="guests" className="text-xs tracking-widest text-white/60 uppercase">
              Expected Guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="e.g. 500"
              className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/30 focus:border-gold focus:outline-none"
            />
          </div>

          {selected && (
            <div
              className={`flex items-start gap-3 border p-4 ${
                selectedStatus ? "border-pastel-green/50 bg-pastel-green/10" : "border-destructive/50 bg-destructive/10"
              }`}
              role="status"
            >
              {selectedStatus ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pastel-green" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              )}
              <p className="text-sm leading-relaxed">
                {new Date(selected + "T00:00").toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {session} session is{" "}
                <strong>{selectedStatus ? "available" : "already booked"}</strong>
                {selectedStatus ? " — reserve it before it's gone." : " — try another date or venue."}
              </p>
            </div>
          )}
          <a href="/enquire" className="btn-gold mt-2 w-full">
            {selectedStatus === false ? "Enquire for Alternatives" : "Reserve This Date"}
          </a>
        </div>
      </div>
    </div>
  );
}
