import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { destinations } from "@/lib/destinations";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Miles & Memories" },
      {
        name: "description",
        content:
          "India, Nepal, Bhutan, Sri Lanka, and Vietnam — five geographies designed as deeply curated, culture- and food-led journeys.",
      },
      { property: "og:title", content: "Destinations — Miles & Memories" },
      {
        property: "og:description",
        content: "Curated journeys across South Asia and Vietnam.",
      },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-20">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          The Collection
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8">
          Five geographies, <span className="italic">infinite nuance.</span>
        </h1>
        <p className="text-lg text-foreground/70 leading-relaxed">
          Our expertise is intentionally focused. We design journeys only where our roots run deep
          — and we travel each region ourselves, year after year, to keep our recommendations
          honest.
        </p>
      </section>

      <div>
        {destinations.map((d, i) => (
          <section
            key={d.slug}
            id={d.slug}
            className="px-6 md:px-12 py-20 border-t border-border scroll-mt-24"
          >
            <div
              className={`grid grid-cols-12 gap-8 lg:gap-16 items-center max-w-7xl mx-auto ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="col-span-12 lg:col-span-6">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
                  {String(i + 1).padStart(2, "0")} — {d.tagline}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl italic mb-8">{d.name}</h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">{d.description}</p>
                <ul className="space-y-4 mb-8">
                  {d.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-4 border-b border-border pb-3 text-[13px] leading-relaxed"
                    >
                      <span className="text-accent font-serif italic">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-foreground/60 mb-8">{d.suited}</p>
                <Link
                  to="/inquiry"
                  className="inline-block px-8 py-4 border border-foreground/20 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500"
                >
                  Inquire about {d.name}
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
