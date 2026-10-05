import { useEffect, useRef } from 'react'
import { HERO_VIDEO_URL } from '../config'

export default function CinematicHero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const clip = videoRef.current

    // iOS only honors autoplay when muted/playsinline are true BOTH as JS
    // properties *and* as literal HTML attributes on the element - relying on
    // the muted="" JSX prop alone isn't always enough. Set every variant.
    clip.muted = true
    clip.defaultMuted = true
    clip.playsInline = true
    clip.setAttribute('muted', '')
    clip.setAttribute('playsinline', '')
    clip.setAttribute('webkit-playsinline', '')

    function attemptPlay() {
      const p = clip.play()
      if (p && p.catch) p.catch(() => {})
    }

    function onReady() {
      attemptPlay()
    }

    clip.addEventListener('loadeddata', onReady)
    clip.addEventListener('loadedmetadata', attemptPlay)
    clip.addEventListener('canplay', onReady)
    attemptPlay()

    // Real-world fix for "video won't autoplay on iPhone": iOS Low Power Mode
    // (and some Safari builds) silently blocks autoplay even when a video is
    // muted + playsinline, with no error event fired - it just never starts.
    // The only reliable recovery is to retry play() on the first genuine user
    // gesture, and again whenever the tab/app comes back to the foreground.
    const gestureEvents = ['touchstart', 'touchend', 'pointerdown', 'scroll', 'click']
    gestureEvents.forEach((ev) => window.addEventListener(ev, attemptPlay, { passive: true }))

    function onVisibility() {
      if (document.visibilityState === 'visible') attemptPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clip.removeEventListener('loadeddata', onReady)
      clip.removeEventListener('loadedmetadata', attemptPlay)
      clip.removeEventListener('canplay', onReady)
      gestureEvents.forEach((ev) => window.removeEventListener(ev, attemptPlay))
      document.removeEventListener('visibilitychange', onVisibility)
      clip.pause()
    }
  }, [])

  return (
    <section id="top" ref={containerRef} className="relative cr-container">
      <div className="cr-hero sticky top-0 h-screen overflow-hidden">
        <div className="cr-stage">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="cr-veil" />
          <div className="cr-grain" />
        </div>

        <main className="cr-panels">
          <section className="cr-panel">
            <p className="cr-eyebrow">
              Performance apparel <span>&middot;</span> Vetora Clothing
            </p>
            <h1>
              Wear the difference.
              <br />
              Keep the feeling.
            </h1>
            <p className="cr-sub">
              Premium fabric, considered construction, and a fit designed to stay sharp through every wear.
            </p>
            <div className="cr-cta">
              <a className="cr-pill" href="#shop">
                View the collection
              </a>
            </div>
          </section>

          <section className="cr-panel">
            <p className="cr-eyebrow">Inside the fabric</p>
            <h1>
              Woven tight,
              <br />
              worn loose.
            </h1>
            <p className="cr-sub">
              Every polo is knit from a performance pique that breathes in heat and
              keeps its shape long after the tag comes off.
            </p>
            <div className="cr-cta">
              <a className="cr-pill" href="#craft">
                The fabric story
              </a>
            </div>
          </section>

          <section className="cr-panel">
            <p className="cr-eyebrow">How to order</p>
            <h1>
              Pick a size.
              <br />
              Message us.
            </h1>
            <p className="cr-sub">
              No checkout, no waiting on a payment page — every order is confirmed
              directly on WhatsApp.
            </p>
            <div className="cr-cta">
              <a className="cr-pill" href="#order">
                Order on WhatsApp
              </a>
            </div>
          </section>
        </main>

        {/* <p className="cr-foot">Colombo showroom &nbsp;&middot;&nbsp; Mon&ndash;Sat, 10am till last size</p> */}
      </div>

      <style>{`
        .cr-hero {
          --fg:#ffffff;
          --fg-soft:rgba(255,255,255,.88);
          --fg-faint:rgba(255,255,255,.76);
          --shade:#000000;
          --pill-bg:#0a0908;
          --pill-fg:#ffffff;
          --bronze:#b8965a;
          --ease:cubic-bezier(.22,.61,.36,1);
          position: relative;
          height:100vh;
          height:100svh;
          background: transparent;
          color: var(--fg);
          font-family: 'Inter Tight', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
        }
        .cr-container { height:100vh; height:100svh; }
        .cr-stage { position:absolute; inset:0; z-index:0; overflow:hidden; background:#000; }
        .cr-stage video {
          position:absolute; top:50%; left:50%; width:100%; height:100%;
          transform:translate(-50%,-50%) scale(1.02); object-fit:cover;
          filter:contrast(1.02); will-change:transform;
        }
        .cr-veil {
          position:absolute; inset:0; pointer-events:none;
          background:rgba(0,0,0,.18);
        }
        .cr-grain {
          position:absolute; inset:-50%; opacity:.08; mix-blend-mode:soft-light; pointer-events:none;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='.5'/></svg>");
        }
        .cr-meter {
          position:absolute; top:0; left:0; z-index:30; height:2px; width:100%;
          transform:scaleX(0); transform-origin:0 50%; background:var(--fg); opacity:.55;
        }
        .cr-panels { position:absolute; inset:0; z-index:20; pointer-events:none; }
        .cr-panel {
          position:absolute; inset:0; display:flex; flex-direction:column;
          align-items:center; justify-content:center; text-align:center;
          padding: max(96px, calc(env(safe-area-inset-top, 0px) + 80px)) clamp(20px, 5vw, 60px) max(88px, calc(env(safe-area-inset-bottom, 0px) + 72px));
          opacity:1;
        }
        .cr-panel + .cr-panel { display:none; }
        .cr-eyebrow {
          display:flex; align-items:center; justify-content:center; flex-wrap:wrap;
          gap:6px 12px; font-size:12.5px; letter-spacing:.045em; color:#fff;
          margin-bottom:clamp(16px,2vw,22px); max-width:min(46ch,100%);
        }
        .cr-panel h1 {
          font-weight:400; font-size:clamp(32px, 6.4vw, 88px); line-height:.98;
          letter-spacing:-.036em; max-width:15ch;
        }
        .cr-sub {
          margin-top:clamp(18px,2.2vw,28px); font-size:clamp(15px,1.28vw,19px);
          line-height:1.5; letter-spacing:-.008em; color:var(--fg-soft);
          max-width:min(46ch,100%);
        }
        .cr-cta { margin-top:clamp(26px,3.2vw,40px); pointer-events:auto; width:100%; display:flex; justify-content:center; }
        .cr-pill {
          display:inline-flex; align-items:center; justify-content:center; height:46px;
          padding:0 24px; border-radius:999px; background:var(--pill-bg); color:var(--pill-fg);
          font-size:14.5px; font-weight:500; letter-spacing:-.008em; text-decoration:none;
          transition:transform .4s var(--ease), background .3s var(--ease);
        }
        .cr-pill:hover { transform:translateY(-2px); background:#000; }
        .cr-foot {
          position:absolute; bottom:0; left:0; right:0; z-index:25;
          text-align:center; font-size:12px; letter-spacing:.02em; color:var(--fg-faint);
          padding: 14px clamp(16px,4vw,24px) max(16px, calc(env(safe-area-inset-bottom, 0px) + 12px));
          pointer-events:none;
        }
        @media (max-width:900px) {
          .cr-veil { background:rgba(0,0,0,.24); }
        }
        @media (max-width:720px) {
          .cr-panel h1 { max-width:12ch; font-size:clamp(28px, 9vw, 46px); }
          .cr-sub { font-size:15px; max-width:34ch; }
          .cr-panel {
            padding: max(76px, calc(env(safe-area-inset-top, 0px) + 68px)) 18px max(72px, calc(env(safe-area-inset-bottom, 0px) + 60px));
          }
          .cr-foot { font-size:11px; }
        }
        @media (max-width:420px) {
          .cr-panel h1 { max-width:11ch; font-size:clamp(26px, 10vw, 36px); }
          .cr-eyebrow { font-size:11px; letter-spacing:.04em; max-width:28ch; }
          .cr-cta .cr-pill { width:100%; max-width:280px; height:44px; }
        }
        @media (max-height:520px) and (orientation:landscape) {
          .cr-panel {
            padding: max(64px, calc(env(safe-area-inset-top, 0px) + 48px)) 24px max(56px, calc(env(safe-area-inset-bottom, 0px) + 40px));
          }
          .cr-panel h1 { font-size:clamp(26px, 7vh, 40px); }
          .cr-sub { margin-top:10px; font-size:14px; }
          .cr-cta { margin-top:14px; }
        }
      `}</style>
    </section>
  )
}
