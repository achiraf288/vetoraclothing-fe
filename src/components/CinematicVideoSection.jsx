import { useEffect, useRef } from 'react'
import { COLLECTION_VIDEO_URL } from '../config'

export default function CinematicVideoSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const play = () => {
      const attempt = video.play()
      if (attempt?.catch) attempt.catch(() => {})
    }
    video.addEventListener('loadedmetadata', play)
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    play()

    const gestureEvents = ['touchstart', 'pointerdown', 'scroll', 'click']
    gestureEvents.forEach((eventName) => window.addEventListener(eventName, play, { passive: true }))
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play()
      else video.pause()
    }, { threshold: 0.15 })
    observer.observe(video)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      video.removeEventListener('loadedmetadata', play)
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      gestureEvents.forEach((eventName) => window.removeEventListener(eventName, play))
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [])

  return (
    <section className="relative isolate aspect-video w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={COLLECTION_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-10 bg-black/40" />
      {/* <div className="relative z-20 px-4 py-10 sm:px-6 sm:py-16 text-center">
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-white/75">Vetora essentials</p>
        <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-4xl md:text-6xl tracking-tightest">
          Made to move with you.
        </h2>
      </div> */}
    </section>
  )
}
