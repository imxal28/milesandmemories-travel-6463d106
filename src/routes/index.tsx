import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { destinations } from "@/lib/destinations";
import hero from "@/assets/hero-himalaya.jpg";
import expCulinary from "@/assets/exp-culinary.jpg";
import expCulture from "@/assets/exp-heritage-varanasi.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miles & Memories — Bespoke Travel, Curated to a T" },
      {
        name: "description",
        content:
          "Boutique luxury travel curation from Singapore. Tailor-made journeys to India, Nepal, Bhutan, Sri Lanka, and Vietnam — designed around culture, cuisine, and you.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 md:px-12 pt-8 md:pt-12 pb-24">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
              Journeys,
              <br />
              <span className="italic font-light">Curated Thoughtfully.</span>
            </h1>
            <p className="max-w-md text-lg text-foreground/80 leading-relaxed mb-12">
              Bespoke travel curation for the discerning leisure traveler. From the high peaks of
              Bhutan to the hidden kitchens of India, we design every detail to a T.
            </p>
            <Link
              to="/inquiry"
              className="group inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.3em] font-semibold"
            >
              <span className="px-8 py-4 border border-foreground/20 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-500">
                Begin Your Journey
              </span>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <img
              src={hero}
              alt="Misty Himalayan morning at a boutique lodge"
              width={1280}
              height={1600}
              className="w-full aspect-[4/5] object-cover outline outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </div>
      </section>

      {/* Brand intro */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
            A Singapore Atelier
          </p>
          <p className="font-serif text-3xl md:text-4xl italic leading-snug text-foreground">
            Miles & Memories is a bespoke travel atelier designing private journeys for travelers
            who value beauty, culture, and the quiet luxury of being looked after.
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-4">
              Core Destinations
            </h2>
            <h3 className="font-serif text-5xl italic">South Asia & Beyond</h3>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-foreground/70 italic">
            We specialize in the regions we know intimately — places where culture and landscape
            collide beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {destinations.map((d, i) => (
            <Link
              key={d.slug}
              to="/destinations"
              hash={d.slug}
              className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="aspect-[3/4] mb-5 overflow-hidden bg-muted">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                />
              </div>
              <h4 className="font-serif text-2xl">{d.name}</h4>
              <p className="text-[11px] uppercase tracking-widest text-foreground/50 mt-2">
                {d.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature experiences */}
      <section className="bg-foreground text-background py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
              Culture and <span className="italic">Cuisine</span> — the soul of every itinerary.
            </h2>
            <p className="text-background/70 leading-relaxed mb-10 text-lg">
              We believe travel should be felt, not just seen. Our signature journeys prioritize
              immersive food experiences, private heritage access, and the luxury of slow
              exploration.
            </p>
            <ul className="space-y-6">
              {[
                "Private Culinary Encounters",
                "Heritage & Boutique Stays",
                "Restorative Slow Travel",
                "Tailor-Made Private Itineraries",
              ].map((label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-background/10 pb-4"
                >
                  <span className="text-accent text-base italic font-serif">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] uppercase tracking-widest">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={expCulinary}
              alt="A long table set with regional dishes"
              loading="lazy"
              width={800}
              height={1024}
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src={expCulture}
              alt="Heritage ghats and boats along the river at dawn"
              loading="lazy"
              width={800}
              height={1024}
              className="aspect-[3/4] w-full object-cover mt-12"
            />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-[22px] uppercase tracking-[0.4em] font-semibold text-accent mb-8">
            Our Philosophy
          </h3>
          <p className="font-serif text-3xl md:text-4xl italic leading-snug mb-12">
            "We don't sell templates. We curate individual stories. Every journey we design is
            handled with the same precision and care as if it were our own."
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Personal Service</p>
              <p className="text-xs text-foreground/60 mt-1">
                One point of contact from dream to return.
              </p>
            </div>
            <div className="hidden md:block w-px h-12 bg-stone-warm" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Detail Driven</p>
              <p className="text-xs text-foreground/60 mt-1">
                Seamlessly executed, beautifully paced itineraries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-32">
        <div className="bg-muted/40 p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Ready to design your next memory?
          </h2>
          <p className="max-w-lg text-foreground/70 mb-10 leading-relaxed">
            Let's begin a conversation about where you want to go and how you want to feel. Our
            consultations are the first step in a beautifully curated journey.
          </p>
          <Link
            to="/inquiry"
            className="px-12 py-5 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors"
          >
            Plan Your Consultation
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
