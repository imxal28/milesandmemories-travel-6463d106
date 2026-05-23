import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import portrait from "@/assets/exp-culture.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Philosophy — Miles & Memories" },
      {
        name: "description",
        content:
          "A Singapore-based bespoke travel atelier. Our philosophy: personal, precise, and quietly luxurious travel curation.",
      },
      { property: "og:title", content: "Philosophy — Miles & Memories" },
      {
        property: "og:description",
        content: "Founder-led travel curation built on care, trust, and precision.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-24">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
              Our Philosophy
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8">
              Travel, <span className="italic">designed</span> in the details.
            </h1>
            <p className="max-w-md text-lg text-foreground/80 leading-relaxed">
              Miles & Memories began with a quiet conviction: that the most memorable journeys
              aren't bought from a catalogue. They are designed — slowly, carefully, and with a
              great deal of listening.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <img
              src={portrait}
              alt="A traveler at a temple courtyard at dawn"
              width={800}
              height={1024}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-border max-w-3xl">
        <div className="space-y-10 text-lg leading-relaxed text-foreground/80">
          <p>
            From our atelier in Singapore, we design private journeys for a small number of
            travelers each year. Our work is founder-led; you'll be looked after by the same person
            from the first conversation to the last airport transfer.
          </p>
          <p>
            We're drawn to places where culture is still lived rather than performed — the
            highlands of Sri Lanka, the back-lanes of Hanoi, the cliffside monasteries of Bhutan.
            We don't promise the loudest experiences. We promise the right ones, for you.
          </p>
          <p className="font-serif text-3xl italic text-foreground">
            Our measure of success is simple: the moment you arrive somewhere and feel, quietly,
            that everything has been considered.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-border">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl">
          {[
            {
              t: "Personal",
              d: "One point of contact, one set of conversations. We design around the traveler, not a template.",
            },
            {
              t: "Precise",
              d: "Every detail rehearsed. Every transfer timed. Every restaurant chosen with intention.",
            },
            {
              t: "Quiet",
              d: "We favor restraint over spectacle. Luxury, to us, is the absence of friction.",
            },
          ].map((v) => (
            <div key={v.t}>
              <h4 className="font-serif text-3xl italic mb-4">{v.t}</h4>
              <p className="text-foreground/70 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="bg-muted/40 p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Begin with a conversation.
          </h2>
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
