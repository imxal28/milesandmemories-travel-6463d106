import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Begin Your Journey — Miles & Memories" },
      {
        name: "description",
        content:
          "Begin a private consultation. Tell us where you'd like to go and what kind of experiences matter most — we'll craft a journey designed around you.",
      },
      { property: "og:title", content: "Begin Your Journey — Miles & Memories" },
      {
        property: "og:description",
        content: "A private consultation, the first step in a beautifully curated journey.",
      },
    ],
  }),
  component: Inquiry,
});

const interests = ["Culture", "Cuisine", "Wellness", "Celebration", "Heritage", "Slow Travel"];

function Inquiry() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          Begin a Consultation
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl">
          Tell us about <span className="italic">your journey.</span>
        </h1>
        <p className="max-w-xl text-lg text-foreground/70 leading-relaxed">
          A few thoughtful questions to begin. We'll be in touch personally within two working days
          to continue the conversation.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-3xl">
          {submitted ? (
            <div className="bg-muted/40 p-12 md:p-16 text-center">
              <h2 className="font-serif text-4xl italic mb-4">Thank you.</h2>
              <p className="text-foreground/70 max-w-md mx-auto leading-relaxed">
                Your inquiry has been received. We'll be in touch personally within two working
                days to begin designing your journey.
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
              <Field label="Your name">
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Email address">
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="Where would you like to go?">
                <input
                  type="text"
                  placeholder="Bhutan, Sri Lanka, somewhere new…"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                />
              </Field>

              <Field label="What kind of experiences matter most to you?">
                <div className="flex flex-wrap gap-3 pt-2">
                  {interests.map((i) => (
                    <label
                      key={i}
                      className="cursor-pointer px-5 py-2 border border-foreground/20 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-accent hover:text-accent transition-colors has-[:checked]:bg-accent has-[:checked]:border-accent has-[:checked]:text-accent-foreground"
                    >
                      <input type="checkbox" name="interest" value={i} className="sr-only" />
                      {i}
                    </label>
                  ))}
                </div>
              </Field>

              <div className="grid md:grid-cols-2 gap-12">
                <Field label="Desired travel period">
                  <input
                    type="text"
                    placeholder="e.g. October 2026"
                    className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
                  />
                </Field>

                <Field label="Number of travelers">
                  <input
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:border-accent focus:outline-none transition-colors"
                  />
                </Field>
              </div>

              <Field label="Anything else we should know?">
                <textarea
                  rows={4}
                  placeholder="A celebration, a returning traveler, a particular interest…"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 text-base placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </Field>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-12 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors"
                >
                  Send Inquiry
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground/70 mb-3">
        {label}
      </span>
      {children}
    </label>
  );
}
