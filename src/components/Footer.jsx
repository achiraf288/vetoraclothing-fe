import { WHATSAPP_NUMBER, BRAND } from '../config'

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Vetora, I have a question about your collection.'
  )}`

  return (
    <footer id="order" className="bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tightest mb-4">
          Questions before you order?
        </h2>
        <p className="text-bone/50 max-w-md mx-auto mb-8">
          Message us directly on WhatsApp for sizing help, bulk orders, or delivery
          timelines across Sri Lanka.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-bone text-ink px-7 py-3 rounded-full text-sm font-medium hover:bg-bronze transition-colors"
        >
          Chat with {BRAND.name} on WhatsApp
        </a>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bone/40 border-t border-line pt-8">
          <span>© {new Date().getFullYear()} {BRAND.name} Clothing. All rights reserved.</span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
