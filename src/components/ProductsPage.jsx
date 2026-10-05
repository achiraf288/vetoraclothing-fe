import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductsPage({ onAddToCart }) {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,150,90,0.12),_transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <p className="text-bronze text-sm tracking-wide mb-4">Vetora essentials</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tightest">The products<span className="text-bronze">.</span></h1>
            <p className="max-w-md text-bone/55 text-sm sm:text-base leading-relaxed">
              Considered colors, a comfortable stretch blend, and a clean tipped collar. Find the polo that fits your everyday.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-4 text-xs uppercase tracking-[0.18em] text-bone/45">
            <span>Current collection</span>
            <span>{String(PRODUCTS.length).padStart(2, '0')} styles</span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
