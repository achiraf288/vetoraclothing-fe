import { useEffect, useRef, useState } from 'react'

export default function ProductDetails({ product, onAddToCart }) {
  const [size, setSize] = useState(product.sizes[0])
  const photos = product.images?.length ? product.images : [product.image]
  const [activePhoto, setActivePhoto] = useState(photos[0])
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // iOS Safari needs muted playback and inline playback set on the element
    // itself as well as in the rendered markup before autoplay is attempted.
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const attemptPlay = () => {
      const playback = video.play()
      if (playback?.catch) playback.catch(() => {})
    }

    video.addEventListener('loadedmetadata', attemptPlay)
    video.addEventListener('canplay', attemptPlay)
    attemptPlay()

    // Retry after a user gesture for iPhones that block autoplay, including
    // while Low Power Mode is enabled.
    const gestureEvents = ['touchstart', 'pointerdown', 'scroll', 'click']
    gestureEvents.forEach((eventName) => window.addEventListener(eventName, attemptPlay, { passive: true }))
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') attemptPlay()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      video.removeEventListener('loadedmetadata', attemptPlay)
      video.removeEventListener('canplay', attemptPlay)
      gestureEvents.forEach((eventName) => window.removeEventListener(eventName, attemptPlay))
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.pause()
    }
  }, [product.video])

  return (
    <main className="min-h-screen bg-ink text-bone pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <a href="/#shop" className="inline-flex text-bone/60 hover:text-bone text-sm mb-8">
          ← Back to collection
        </a>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <div className="rounded-2xl bg-smoke border border-line aspect-[4/5] flex items-center justify-center p-5 sm:p-8">
              <img src={activePhoto} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {photos.length > 1 && (
              <div className="flex gap-3 mt-4" aria-label="Product photos">
                {photos.map((photo, index) => (
                  <button
                    key={photo}
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`View photo ${index + 1} of ${product.name}`}
                    aria-pressed={activePhoto === photo}
                    className={`w-20 h-24 rounded-xl bg-smoke border p-2 ${activePhoto === photo ? 'border-bone' : 'border-line'}`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-bronze text-sm tracking-wide mb-3">Vetora collection</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest">{product.name}</h1>
            <p className="text-bone/60 mt-4">{product.fabric}</p>
            <p className="text-bone/70 leading-relaxed mt-6">{product.description}</p>
            <p className="text-bronze text-xl mt-6">{product.price}</p>
            <h2 className="text-sm mt-9 mb-3">Select a size</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  aria-pressed={size === item}
                  className={`h-10 min-w-10 px-3 rounded-full text-sm border transition-colors ${size === item ? 'bg-bone text-ink border-bone' : 'border-bone/25 text-bone/70 hover:border-bone/60'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => onAddToCart(product, size)} className="mt-8 inline-flex w-full md:w-auto items-center justify-center bg-bone text-ink px-8 py-3 rounded-full text-sm font-medium hover:bg-bronze transition-colors">
              Add to order
            </button>
          </div>
        </div>
        {product.video && (
          <section className="mt-16 md:mt-24 border-t border-line pt-10 md:pt-14" aria-labelledby="product-video-title">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-bronze text-sm tracking-wide mb-2">A closer look</p>
                <h2 id="product-video-title" className="font-display text-2xl sm:text-3xl tracking-tightest">{product.name} in motion</h2>
              </div>
              <p className="text-bone/50 text-sm">See the fit and finish up close.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-smoke">
              <section className="relative isolate aspect-video w-full overflow-hidden bg-black text-white flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="absolute inset-0 z-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-hidden="true"
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 z-10 bg-black/40" />
                    {/* <div className="relative z-20 px-4 py-10 sm:px-6 sm:py-16 text-center">
                      <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-white/75">Vetora essentials</p>
                      <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-6xl tracking-tightest">
                        Made to move with you.
                      </h2>
                    </div> */}
                  </section>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
