import { Link } from "@tanstack/react-router";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about", label: "Philosophy" },
  { to: "/inquiry", label: "Inquiry" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 bg-background/80 backdrop-blur-md">
      <Link to="/" className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase italic">
        Miles & Memories
      </Link>
      <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
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
    </nav>
  );
}
