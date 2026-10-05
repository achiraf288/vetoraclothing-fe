import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The hero video is dark, so use light navigation text before scrolling.
  const markColor = 'text-bone'
  const linkColor = scrolled
    ? 'text-bone/70 hover:text-bone'
    : 'text-bone/80 hover:text-bone'
  const pillColor = scrolled
    ? 'text-bone border-bone/30 hover:border-bronze hover:text-bronze'
    : 'text-bone border-bone/60 hover:border-bronze hover:text-bronze'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        <a href="/" className={`flex items-center gap-3 transition-colors ${markColor}`}>
          <img src="/vetora-logo.jpeg" alt="Vetora" className="h-8 w-8 rounded-sm object-cover" />
          <span className="font-display text-lg tracking-tightest">Vetora</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <a href="#shop" className={`transition-colors ${linkColor}`}>Shop</a>
          <a href="/products" className={`transition-colors ${linkColor}`}>Products</a>
          <a href="#order" className={`transition-colors ${linkColor}`}>Order</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#shop"
            className={`hidden sm:inline-flex text-sm px-4 py-2 border rounded-full transition-colors ${pillColor}`}
          >
            Shop now
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden h-10 w-10 inline-flex flex-col items-center justify-center gap-1.5 rounded-full border border-bone/40 text-bone"
          >
            <span className="w-4 h-px bg-current" />
            <span className="w-4 h-px bg-current" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 bg-ink/95 backdrop-blur-md border-t border-line">
          {[
            ['Shop', '#shop'],
            ['Products', '/products'],
            ['Order', '#order'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-3 text-sm text-bone/80 hover:text-bone">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
