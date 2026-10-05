import { motion } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function Products({ onAddToCart }) {
  return (
    <section id="shop" className="relative bg-ink py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-bronze text-sm tracking-wide mb-3">The collection</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest">
              Four cuts, one standard.
            </h2>
          </div>
          <p id="craft" className="hidden md:block max-w-xs text-bone/50 text-sm leading-relaxed">
            Every tee is made from premium fabric that feels comfortable in the heat and holds its shape through every wash. Choose your size, then order directly on WhatsApp — no checkout, no waiting.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
