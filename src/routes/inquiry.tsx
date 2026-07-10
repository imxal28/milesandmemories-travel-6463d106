import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { submitInquiry } from "@/lib/inquiry.functions";


export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Curate Your Trip — Miles & Memories" },
      {
        name: "description",
        content:
          "Enquiry form to curate your trip. Share your destination, dates, travel style and preferences — we'll craft a journey designed around you.",
      },
      { property: "og:title", content: "Curate Your Trip — Miles & Memories" },
      {
        property: "og:description",
        content: "A private consultation, the first step in a beautifully curated journey.",
      },
    ],
  }),
  component: Inquiry,
});

const travelTypes = ["Couple", "Family", "Solo", "Friends"];

function Inquiry() {
  const submit = useServerFn(submitInquiry);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [travelType, setTravelType] = useState<string>("");
  const [otherTravelType, setOtherTravelType] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const renderedAt = useMemo(() => Date.now(), []);
  const honeypotRef = useRef<HTMLInputElement>(null);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    if (!travelType) {
      setErrorMsg("Please select the kind of travel you're planning.");
      return;
    }
    const form = new FormData(e.currentTarget);

    if (!dateFrom || !dateTo) {
      setErrorMsg("Please select your travel dates.");
      return;
    }
    if (dateTo < dateFrom) {
      setErrorMsg("Return date must be on or after the departure date.");
      return;
    }
    const travelDatesFrom = format(dateFrom, "yyyy-MM-dd");
    const travelDatesTo = format(dateTo, "yyyy-MM-dd");
    const travelDatesValue = `${travelDatesFrom} to ${travelDatesTo}`;


    const personsRaw = String(form.get("persons") ?? "").trim();
    const personsValue = Number(personsRaw);
    if (!personsRaw || !Number.isFinite(personsValue) || personsValue < 1) {
      setErrorMsg("Please enter at least 1 traveller.");
      return;
    }

    if (travelType === "Other" && !otherTravelType.trim()) {
      setErrorMsg("Please describe the kind of travel you're planning.");
      return;
    }

    setSubmitting(true);
    try {
      await submit({
        data: {
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          phone: String(form.get("phone") ?? "").trim(),
          destination: String(form.get("destination") ?? "").trim(),
          travelDates: travelDatesValue,
          travelDatesFrom,
          travelDatesTo,
          travelType: travelType === "Other" ? "Other" : travelType,
          travelTypeOther: travelType === "Other" ? otherTravelType.trim() : undefined,
          persons: personsValue,
          childrenAges: String(form.get("childrenAges") ?? "").trim() || undefined,
          budget: String(form.get("budget") ?? "").trim(),
          notes: String(form.get("notes") ?? "").trim() || undefined,
          company: honeypotRef.current?.value ?? "",
          renderedAt,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      const raw = err instanceof Error ? err.message : "";
      // Server may return a stringified error payload; pull out a friendly message.
      let friendly = raw;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          if (typeof parsed.message === "string") friendly = parsed.message;
          else if (Array.isArray(parsed) && parsed[0]?.message) friendly = parsed[0].message;
        }
      } catch {
        /* not JSON — use raw message */
      }
      setErrorMsg(friendly || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          Enquiry Form
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6 max-w-3xl">
          Curate <span className="italic">your trip</span>
        </h1>
        <p className="max-w-xl text-lg text-foreground/70 leading-relaxed">
          A few details to begin. We'll be in touch personally within two working days to continue
          the conversation.
        </p>
        <p className="mt-6 text-xs text-foreground/50">
          <span className="text-accent">*</span> Indicates a required question
        </p>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-3xl">
          {submitted ? (
            <div className="bg-muted/40 p-12 md:p-16 text-center">
              <h2 className="font-serif text-4xl italic mb-4">Thank you.</h2>
              <p className="text-foreground/70 max-w-md mx-auto leading-relaxed">
                Your enquiry has been received. We'll be in touch personally within two working
                days to begin curating your trip.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12" noValidate>
              {/* Honeypot: hidden from real users, tempting to bots */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label>
                  Company
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </label>
              </div>

              <Field label="Email" required>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Phone number" required>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Name" required>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Which destination are you considering?" required>
                <input
                  required
                  name="destination"
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Dates of travel — from and to" required>
                <input
                  required
                  name="travelDates"
                  type="text"
                  placeholder="e.g. 12 Oct 2026 – 24 Oct 2026"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="What kind of travel are you planning?" required>
                <div className="flex flex-col gap-3 pt-2">
                  {travelTypes.map((t) => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer text-base">
                      <input
                        type="radio"
                        name="travelType"
                        value={t}
                        checked={travelType === t}
                        onChange={() => setTravelType(t)}
                        className="accent-[color:var(--accent)] w-4 h-4"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer text-base">
                    <input
                      type="radio"
                      name="travelType"
                      value="Other"
                      checked={travelType === "Other"}
                      onChange={() => setTravelType("Other")}
                      className="accent-[color:var(--accent)] w-4 h-4"
                    />
                    <span>Other:</span>
                    <input
                      type="text"
                      value={otherTravelType}
                      onChange={(e) => {
                        setOtherTravelType(e.target.value);
                        if (e.target.value) setTravelType("Other");
                      }}
                      className="flex-1 bg-transparent border-b border-foreground/20 py-1 text-base focus:border-accent focus:outline-none transition-colors"
                    />
                  </label>
                </div>
              </Field>

              <Field label="How many persons travelling?" required>
                <input
                  required
                  name="persons"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="If children are travelling, please specify ages">
                <input
                  name="childrenAges"
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field
                label="Is there a requested per-night budget? (Please specify currency.)"
                required
              >
                <input
                  required
                  name="budget"
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Are there any other specific requests? (Such as must-visit locations, must-do activities, dietary choices, etc.)">
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-base placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </Field>

              {errorMsg && (
                <p className="text-sm text-accent" role="alert">
                  {errorMsg}
                </p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-12 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : "Submit Enquiry"}
                </button>
                <p className="mt-4 text-xs text-foreground/50 italic">
                  We respond personally within two working days.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground/70 mb-3">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}
