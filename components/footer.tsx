import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-foreground text-sm">
          <div className="font-semibold">Tran Hoang Huy</div>
          <div className="text-muted-foreground">Designed & built by me — {year}</div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            About
          </Link>
          <Link href="/lab" className="text-foreground hover:text-primary transition">
            Lab
          </Link>
          <a href="mailto:huyth.dev@gmail.com" className="text-primary font-semibold ml-4">
            huyth.dev@gmail.com
          </a>
        </nav>

        <div className="flex items-center gap-3">
           <a href="https://github.com/huykg1112" title="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary transition">
            <span>🐱‍👤</span>
          </a>
          <a href="https://www.facebook.com/tran.huy.113299/" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary transition">
            <span>FB</span>
          </a>
          <a href="tel:0334114244" title="Phone: 0334114244" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary transition">
            <span>📱</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
