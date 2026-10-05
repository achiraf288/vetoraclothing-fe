import { PRODUCTS } from '../data/products'
import { WHATSAPP_NUMBER } from '../config'

export default function OrderCart({ cart, setCart, isOpen, setIsOpen }) {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const lines = cart.map((item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.productId)
    return product ? { ...item, product } : null
  }).filter(Boolean)
  const total = lines.reduce((sum, item) => sum + Number(item.product.price.replace(/[^\d.]/g, '')) * item.quantity, 0)
  const message = encodeURIComponent([
    'Hi Vetora, I\'d like to order:',
    '',
    ...lines.map(({ product, size, quantity }) => `${product.name} — Size ${size} × ${quantity} — ${product.price}`),
    '',
    `Estimated total: LKR ${total.toLocaleString()}`,
    '',
    'Please confirm availability and delivery details.',
  ].join('\n'))
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  if (!count) return null

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-96 text-bone" aria-label="Your order">
      {isOpen && (
        <div className="mb-3 max-h-[65vh] overflow-y-auto rounded-2xl border border-line bg-ink p-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h2 className="font-display text-xl">Your order</h2>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setCart([])} className="text-xs text-bone/55 hover:text-bone">Clear cart</button>
              <button type="button" onClick={() => setIsOpen(false)} className="text-bone/60 hover:text-bone" aria-label="Close order">✕</button>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {lines.map(({ key, product, size, quantity }) => (
              <li key={key} className="flex items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{product.name}</p>
                  <p className="mt-1 text-xs text-bone/55">Size {size} · {product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setCart((items) => items.map((item) => item.key === key ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0))} className="h-8 w-8 rounded-full border border-line" aria-label={`Remove one ${product.name}`}>−</button>
                  <span className="w-4 text-center text-sm">{quantity}</span>
                  <button type="button" onClick={() => setCart((items) => items.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item))} className="h-8 w-8 rounded-full border border-line" aria-label={`Add one ${product.name}`}>+</button>
                  <button type="button" onClick={() => setCart((items) => items.filter((item) => item.key !== key))} className="ml-1 text-xs text-bone/50 hover:text-bone" aria-label={`Remove ${product.name}`}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-line pt-4 text-sm">
            <span>Estimated total</span><span>LKR {total.toLocaleString()}</span>
          </div>
          <p className="mt-2 text-xs text-bone/45">Final price and availability confirmed on WhatsApp.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-4 flex w-full justify-center rounded-full bg-bone py-3 text-sm font-medium text-ink hover:bg-bronze">Send order on WhatsApp</a>
        </div>
      )}
      <button type="button" onClick={() => setIsOpen((value) => !value)} className="flex w-full items-center justify-between rounded-full bg-bone px-5 py-4 text-sm font-medium text-ink shadow-xl hover:bg-bronze">
        <span>{isOpen ? 'Continue shopping' : 'View order'}</span>
        <span className="rounded-full bg-ink px-2.5 py-1 text-xs text-bone">{count} {count === 1 ? 'item' : 'items'} · LKR {total.toLocaleString()}</span>
      </button>
    </aside>
  )
}
