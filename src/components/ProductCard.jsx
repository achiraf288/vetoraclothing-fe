import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProductCard({ product, onAddToCart }) {
  const ref = useRef(null)
  const [size, setSize] = useState(product.sizes[0])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const openProduct = () => {
    sessionStorage.setItem('vetora-collection-scroll', String(window.scrollY))
    window.location.href = `/products/${product.id}`
  }


  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={openProduct}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openProduct()
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="bg-smoke border border-line rounded-2xl p-6 flex flex-col cursor-pointer"
      >
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="aspect-[4/5] rounded-xl bg-ink/60 overflow-hidden mb-6 flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain"
          />
        </div>

        <div style={{ transform: 'translateZ(20px)' }} className="flex-1 flex flex-col">
          <h3 className="font-display text-xl tracking-tightest">{product.name}</h3>
          <p className="text-bone/50 text-sm mt-1">{product.fabric}</p>
          <p className="text-bronze mt-3">{product.price}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(event) => {
                  event.stopPropagation()
                  setSize(s)
                }}
                className={`h-9 min-w-9 px-2 rounded-full text-xs border transition-colors ${
                  size === s
                    ? 'bg-bone text-ink border-bone'
                    : 'border-bone/25 text-bone/60 hover:border-bone/60'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onAddToCart(product, size) }}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-bone text-ink py-3 rounded-full text-sm font-medium hover:bg-bronze transition-colors"
          >
            Add to order
          </button>
        </div>
      </motion.div>
    </div>
  )
}
