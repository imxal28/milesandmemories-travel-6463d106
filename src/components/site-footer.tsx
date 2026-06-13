export function SiteFooter() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      <div className="text-sm italic font-serif">Miles & Memories — Singapore</div>
      <div className="flex gap-8 text-[10px] uppercase tracking-widest text-foreground/50">
        <a href="https://www.instagram.com/milesandmemories.travel" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
        <a href="https://www.linkedin.com/in/laxmi-k" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Linked-In</a>
        <a href="#" className="hover:text-accent transition-colors">Terms</a>
      </div>
      <div className="text-[10px] text-foreground/40 tracking-widest">
        © {new Date().getFullYear()} Miles and Memories
      </div>
    </footer>
  );
}
