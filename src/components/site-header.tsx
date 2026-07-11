import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about", label: "About Us" },
  { to: "/inquiry", label: "Inquiry" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 md:px-12 h-20 md:h-24">
        <Link
          to="/"
          className="flex items-center gap-3 md:gap-4"
          aria-label="Miles & Memories — Home"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Miles & Memories"
            width={192}
            height={192}
            className="h-24 w-24 md:h-32 md:w-32 object-contain shrink-0"
          />
          <span className="font-serif text-2xl md:text-4xl tracking-wide text-foreground leading-none">
            Miles &amp; Memories
          </span>
        </Link>

        <div className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-accent transition-colors"
              activeProps={{ className: "text-accent underline underline-offset-8 decoration-accent/40" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden inline-flex items-center justify-center p-2 text-foreground hover:text-accent transition-colors"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col px-4 md:px-12 py-6 gap-5 text-[12px] uppercase tracking-[0.2em] font-medium">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-accent transition-colors"
                activeProps={{ className: "text-accent" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
