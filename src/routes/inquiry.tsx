import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
  const [submitted, setSubmitted] = useState(false);
  const [travelType, setTravelType] = useState<string>("");
  const [otherTravelType, setOtherTravelType] = useState<string>("");

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          Enquiry Form
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6 max-w-3xl">
          Curate <span className="italic">your trip.</span>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-12"
            >
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Phone number" required>
                <input
                  required
                  type="tel"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Name" required>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Which destination are you considering?" required>
                <input
                  required
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Dates of travel — from and to" required>
                <input
                  required
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
                        required
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
                  type="number"
                  min={1}
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="If children are travelling, please specify ages">
                <input
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
                  type="text"
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Are there any other specific requests? (Such as must-visit locations, must-do activities, dietary choices, etc.)">
                <textarea
                  rows={4}
                  placeholder="Your answer"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-base placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </Field>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-12 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors"
                >
                  Submit Enquiry
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
