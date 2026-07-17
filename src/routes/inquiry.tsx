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

type FieldErrors = Partial<Record<
  | "email"
  | "phone"
  | "name"
  | "destination"
  | "travelDates"
  | "travelType"
  | "travelTypeOther"
  | "persons"
  | "budget"
  | "form",
  string
>>;

function Inquiry() {
  const submit = useServerFn(submitInquiry);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [travelType, setTravelType] = useState<string>("");
  const [otherTravelType, setOtherTravelType] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const renderedAt = useMemo(() => Date.now(), []);
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nextErrors: FieldErrors = {};

    const val = (n: string) => String(form.get(n) ?? "").trim();

    if (!val("email")) nextErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email")))
      nextErrors.email = "Please enter a valid email address.";

    if (!val("phone")) nextErrors.phone = "Please enter your phone number.";
    if (!val("name")) nextErrors.name = "Please enter your name.";
    if (!val("destination"))
      nextErrors.destination = "Please tell us which destination you're considering.";

    if (!dateFrom || !dateTo) {
      nextErrors.travelDates = "Please select your travel dates.";
    } else if (dateTo < dateFrom) {
      nextErrors.travelDates = "Return date must be on or after the departure date.";
    }

    if (!travelType) {
      nextErrors.travelType = "Please choose the kind of travel you're planning.";
    } else if (travelType === "Other" && !otherTravelType.trim()) {
      nextErrors.travelTypeOther = "Please describe the kind of travel you're planning.";
    }

    const personsRaw = val("persons");
    const personsValue = Number(personsRaw);
    if (!personsRaw || !Number.isFinite(personsValue) || personsValue < 1) {
      nextErrors.persons = "Please enter at least 1 traveller.";
    }

    if (!val("budget")) nextErrors.budget = "Please enter your per-night budget.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      const el = e.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    setErrors({});
    const travelDatesFrom = format(dateFrom!, "yyyy-MM-dd");
    const travelDatesTo = format(dateTo!, "yyyy-MM-dd");
    const travelDatesValue = `${travelDatesFrom} to ${travelDatesTo}`;

    setSubmitting(true);
    try {
      await submit({
        data: {
          name: val("name"),
          email: val("email"),
          phone: val("phone"),
          destination: val("destination"),
          travelDates: travelDatesValue,
          travelDatesFrom,
          travelDatesTo,
          travelType: travelType === "Other" ? "Other" : travelType,
          travelTypeOther: travelType === "Other" ? otherTravelType.trim() : undefined,
          persons: personsValue,
          childrenAges: val("childrenAges") || undefined,
          budget: val("budget"),
          notes: val("notes") || undefined,
          company: honeypotRef.current?.value ?? "",
          renderedAt,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      const raw = err instanceof Error ? err.message : "";
      let friendly = raw;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          if (typeof parsed.message === "string") friendly = parsed.message;
          else if (Array.isArray(parsed) && parsed[0]?.message) friendly = parsed[0].message;
        }
      } catch {
        /* not JSON */
      }
      setErrors({ form: friendly || "Something went wrong. Please try again." });
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

              <Field label="Email" required error={errors.email}>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  aria-invalid={!!errors.email}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Phone number" required error={errors.phone}>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your answer"
                  aria-invalid={!!errors.phone}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Name" required error={errors.name}>
                <input
                  name="name"
                  type="text"
                  placeholder="Your answer"
                  aria-invalid={!!errors.name}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Which destination are you considering?" required error={errors.destination}>
                <input
                  name="destination"
                  type="text"
                  placeholder="Your answer"
                  aria-invalid={!!errors.destination}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Dates of travel — from and to" required error={errors.travelDates}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateField
                    value={dateFrom}
                    onChange={(d) => {
                      setDateFrom(d);
                      if (d && dateTo && dateTo < d) setDateTo(undefined);
                    }}
                    placeholder="Departure date"
                  />
                  <DateField
                    value={dateTo}
                    onChange={setDateTo}
                    placeholder="Return date"
                    disabled={dateFrom ? { before: dateFrom } : undefined}
                  />
                </div>
              </Field>

              <Field label="What kind of travel are you planning?" required error={errors.travelType}>
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
                  {errors.travelTypeOther && (
                    <p className="text-xs text-red-600 mt-1" role="alert">
                      {errors.travelTypeOther}
                    </p>
                  )}
                </div>
              </Field>

              <Field label="How many persons travelling?" required error={errors.persons}>
                <input
                  name="persons"
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Your answer"
                  aria-invalid={!!errors.persons}
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
                error={errors.budget}
              >
                <input
                  name="budget"
                  type="text"
                  placeholder="Your answer"
                  aria-invalid={!!errors.budget}
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

              {errors.form && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.form}
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
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground/70 mb-3">
          {label}
          {required && <span className="text-accent"> *</span>}
        </span>
        {children}
      </label>
      {error && (
        <p className="text-xs text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function DateField({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  placeholder: string;
  disabled?: React.ComponentProps<typeof Calendar>["disabled"];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between gap-3 bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-accent focus:outline-none transition-colors text-left"
        >
          <span className={cn(value ? "text-foreground" : "text-foreground/30")}>
            {value ? format(value, "d MMM yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-5 w-5 text-foreground/40" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d);
            if (d) setOpen(false);
          }}
          disabled={disabled}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}
