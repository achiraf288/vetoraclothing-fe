import Navbar from './components/Navbar'
import CinematicHero from './components/CinematicHero'
import Products from './components/Products'
import CinematicVideoSection from './components/CinematicVideoSection'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import ProductDetails from './components/ProductDetails'
import { PRODUCTS } from './data/products'
import ProductsPage from './components/ProductsPage'
import OrderCart from './components/OrderCart'

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vetora-order-cart') || '[]') } catch { return [] }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  useEffect(() => localStorage.setItem('vetora-order-cart', JSON.stringify(cart)), [cart])
  const addToCart = (product, size) => {
    setCart((items) => {
      const key = `${product.id}:${size}`
      const existing = items.find((item) => item.key === key)
      return existing
        ? items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { key, productId: product.id, size, quantity: 1 }]
    })
    setIsCartOpen(true)
  }
  const isProductsPage = window.location.pathname.replace(/\/$/, '') === '/products'
  const productId =
    window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1] ||
    new URLSearchParams(window.location.search).get('product')
  const product = PRODUCTS.find((item) => item.id === productId)

  useEffect(() => {
    if (productId) return
    const savedScroll = sessionStorage.getItem('vetora-collection-scroll')
    if (savedScroll === null) return

    sessionStorage.removeItem('vetora-collection-scroll')
    requestAnimationFrame(() => window.scrollTo(0, Number(savedScroll)))
  }, [productId])

  if (productId) {
    return (
      <div className="bg-ink min-h-screen">
        <Navbar />
        {product ? <ProductDetails product={product} onAddToCart={addToCart} /> : (
          <main className="min-h-screen bg-ink text-bone pt-32 text-center">
            <h1 className="font-display text-3xl">Product not found</h1>
            <a href="/#shop" className="inline-block mt-6 text-bone/70 hover:text-bone">Back to collection</a>
          </main>
        )}
        <Footer />
        <OrderCart cart={cart} setCart={setCart} isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>
    )
  }

  if (isProductsPage) {
    return (
      <div className="bg-ink min-h-screen">
        <Navbar />
        <ProductsPage onAddToCart={addToCart} />
        <Footer />
        <OrderCart cart={cart} setCart={setCart} isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>
    )
  }

  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <CinematicHero />
      <Products onAddToCart={addToCart} />
      <CinematicVideoSection />
      <Footer />
      <OrderCart cart={cart} setCart={setCart} isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  )
}
