import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import showreel from '/images/showreel.mp4'
import FilamentText from '../../../FilamentText/FilamentText'


gsap.registerPlugin(ScrollTrigger)

const Showreel = () => {
  const sectionRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = videoWrapperRef.current

    if (!section || !wrapper) return

    const ctx = gsap.context(() => {
      // Scale video wrapper from 0.78 to 1.0 on scroll
      gsap.fromTo(
        wrapper,
        {
          scale: 0.78,
          borderRadius: '36px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
        },
        {
          scale: 1.2,
          borderRadius: '24px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.22)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'center 45%',
            scrub: 1.2,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return
    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-16 bg-white text-neutral-900 overflow-hidden"
    >
      {/* Soft Background Radial Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-100/40 via-amber-100/30 to-purple-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span>Showreel • Motion & 3D Direction</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold main-heading tracking-tight text-neutral-950 leading-[1.12]">
           
            <FilamentText text="Engineered For Impact" className="main-heading"/> <span className="main-heading-accent"><FilamentText text="Designed To Inspire." /></span>
          </h2>

          <p className="mt-5 body-font sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
            
            <FilamentText text="A glimpse into the identities, digital platforms, and generative experiences we" />
            <FilamentText text="architect for visionaries and category-defining brands." />
          </p>
        </div>

        {/* Video Scaling Container */}
        <div className="flex justify-center items-center w-full">
          <div
            ref={videoWrapperRef}
            className="group relative mt-8 w-full max-w-5xl aspect-video overflow-hidden bg-neutral-950 cursor-pointer transition-shadow duration-500"
            onClick={togglePlay}
          >
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={showreel}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Subtle Gradient Overlays for Readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Floating Top Status Indicator */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PROBUS REEL // 4K</span>
            </div>

            {/* Center Big Play/Pause Button Indicator (on hover or when paused) */}
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
                !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                )}
              </div>
            </div>

            {/* Bottom HUD Bar */}
            <div
              className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all hover:scale-105"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen"
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all hover:scale-105"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Showreel
