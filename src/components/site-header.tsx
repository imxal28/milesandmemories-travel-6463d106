import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about", label: "Philosophy" },
  { to: "/inquiry", label: "Inquiry" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 md:py-5 bg-background/80 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-4" aria-label="Miles & Memories — Home">
        <img src={logo} alt="Miles & Memories" width={96} height={96} className="h-16 w-16 md:h-20 md:w-20 object-contain" />
        <span className="font-serif text-2xl md:text-4xl tracking-wide text-foreground">Miles &amp; Memories</span>
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
