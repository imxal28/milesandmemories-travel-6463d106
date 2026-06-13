import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import founder from "@/assets/about-founder.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "Laxmi is the perfect planner for a solo travelling woman — she goes the extra mile to keep you safe while curating an experience that feels truly authentic to your travel style.",
    name: "Vinisha N.",
    trip: "Solo Trip, Vietnam",
  },
  {
    quote:
      "Professional, well-organized and attentive from start to finish. Laxmi's prompt responses and personalised recommendations made the entire trip smooth, stress-free and genuinely memorable.",
    name: "Radhika Bhatia",
    trip: "Bespoke Getaway",
  },
  {
    quote:
      "Laxmi planned a Bhutan itinerary perfectly paced for three generations — from a senior citizen to my teenage son. The guide and driver were excellent, and every detail was thoughtfully handled.",
    name: "Malini Srivats",
    trip: "Multi-gen Family Trip, Bhutan",
  },
  {
    quote:
      "She orchestrated an exceptional Bali trip that catered to both my elderly parents with arthritis and my younger sister. Not a single hiccup — just a seamless, thoughtfully curated experience for everyone.",
    name: "Mona Nik",
    trip: "Family Holiday, Bali",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Miles & Memories" },
      {
        name: "description",
        content:
          "Miles & Memories is a full-service travel brand crafting personalized journeys — from startup offsites to soul-searching solo trips — with deep research and meticulous planning.",
      },
      { property: "og:title", content: "About Us — Miles & Memories" },
      {
        property: "og:description",
        content:
          "We go beyond bookings. We craft travel stories — personalized, researched, and meticulously planned.",
      },
      { property: "og:url", content: "https://curated-journeys-by-design.lovable.app/about" },
    ],
    links: [
      { rel: "canonical", href: "https://curated-journeys-by-design.lovable.app/about" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 md:px-12 pt-12 pb-20">
        <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
          About Us
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl">
          We go beyond bookings. <span className="italic">We craft travel stories.</span>
        </h1>
        <p className="max-w-xl text-lg text-foreground/70 leading-relaxed">
          At Miles &amp; Memories, every journey begins with listening — to your rhythm, your
          curiosity, and the kind of memories you want to come home with.
        </p>
      </section>

      <section className="px-6 md:px-12 py-16 grid grid-cols-12 gap-8 lg:gap-16 items-center border-t border-border">
        <div className="col-span-12 lg:col-span-5">
          <img
            src={founder}
            alt="Founder of Miles & Memories"
            width={800}
            height={1024}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
        <div className="col-span-12 lg:col-span-7 space-y-8 text-lg leading-relaxed text-foreground/80">
          <p>
            What began as a passion project has now evolved into a full-service travel brand
            specializing in personalized experiences for every kind of explorer.
          </p>
          <p>
            Whether it's an offsite for your startup team or a soul-searching solo trip, our deep
            research and meticulous planning ensure your journey is seamless, safe, and truly
            unforgettable.
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

      <section className="px-6 md:px-12 py-24 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-accent mb-6">
            In Their Words
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl">
            Stories from travelers we've planned for.
          </h2>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                stopOnFocusIn: false,
              }),
            ]}
            className="w-full"
          >

            <CarouselContent className="-ml-6">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="pl-6 md:basis-1/2">
                  <figure className="h-full bg-background border border-border p-8 md:p-10 flex flex-col justify-between">
                    <blockquote className="font-serif text-2xl md:text-3xl italic leading-snug text-foreground/90 mb-8">
                      "{t.quote}"
                    </blockquote>
                    <figcaption>
                      <div className="text-sm font-semibold tracking-wide">{t.name}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 mt-1">
                        {t.trip}
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">

        <div className="bg-muted/40 p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Begin with a conversation.</h2>
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
