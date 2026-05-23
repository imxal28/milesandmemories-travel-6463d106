import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import expCulinary from "@/assets/exp-culinary.jpg";
import expCulture from "@/assets/exp-culture.jpg";
import bhutan from "@/assets/dest-bhutan.jpg";
import vietnam from "@/assets/dest-vietnam.jpg";
import nepal from "@/assets/dest-nepal.jpg";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — Miles & Memories" },
      {
        name: "description",
        content:
          "Signature curated travel: culture and heritage journeys, culinary trails, slow luxury escapes, retreats, and tailor-made private itineraries.",
      },
      { property: "og:title", content: "Experiences — Miles & Memories" },
      {
        property: "og:description",
        content: "Signature curated journeys: culture, cuisine, retreat, and slow luxury.",
      },
    ],
  }),
  component: Experiences,
});

const experiences = [
  {
    title: "Culture & Heritage Journeys",
    image: expCulture,
    body:
      "Private access to historians, artisans, and homes. Walks through living quarters with the people who know them best. Journeys built around story rather than itinerary.",
  },
  {
    title: "Food & Culinary Trails",
    image: expCulinary,
    body:
      "From spice markets in Old Delhi to family kitchens in Hoi An, our culinary journeys are designed as edible biographies of a place — intimate, regional, and unforced.",
  },
  {
    title: "Slow Luxury Escapes",
    image: bhutan,
    body:
      "Boutique stays chosen for character over count. Days that breathe. Itineraries that resist the checklist in favor of stillness, light, and the quiet pleasure of being somewhere fully.",
  },
  {
    title: "Retreats & Restorative Travel",
    image: nepal,
    body:
      "Mountain wellness, monastic quiet, and considered programs of rest. For travelers seeking to return, rather than simply to go.",
  },
  {
    title: "Private Tailor-Made Itineraries",
    image: vietnam,
    body:
      "A bespoke journey designed around your rhythm, your curiosity, and your celebration. No template, no group. Just yours.",
  },
];

function Experiences() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-20">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          Signature Experiences
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl">
          Designed around <span className="italic">the traveler,</span> not a template.
        </h1>
        <p className="max-w-xl text-lg text-foreground/70 leading-relaxed">
          Five ways of traveling with us. Each can stand alone or be woven together into a single
          private itinerary across one or more destinations.
        </p>
      </section>

      <div className="space-y-px bg-border">
        {experiences.map((e, i) => (
          <article
            key={e.title}
            className="bg-background px-6 md:px-12 py-16 grid grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            <div className="col-span-12 lg:col-span-5">
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                width={800}
                height={1024}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="col-span-12 lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl italic mb-6">{e.title}</h2>
              <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">{e.body}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="px-6 md:px-12 py-32">
        <div className="bg-muted/40 p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Shape your signature journey.</h2>
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
