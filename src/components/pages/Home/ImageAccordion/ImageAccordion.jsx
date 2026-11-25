import { useState } from 'react'
import './ImageAccordion.css'

const services = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    title: 'Brand Identity & Strategy',
    subtitle: 'Bespoke visual identity systems, typography, comprehensive guidelines, and strategic positioning crafted to captivate and endure.',
    url: '#contact',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    title: 'Interactive 3D & Spatial Web',
    subtitle: 'Cutting-edge WebGL, real-time shaders, fluid liquid physics, and sensorial interactive worlds engineered for peak engagement.',
    url: '#contact',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    title: 'Digital Product & UI/UX',
    subtitle: 'Human-centered digital products, intuitive SaaS architectures, and high-impact web interfaces sculpted with absolute precision.',
    url: '#contact',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    title: 'Creative Engineering',
    subtitle: 'High-performance frontend applications, fluid micro-interactions, responsive architectures, and modern web platforms.',
    url: '#contact',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    title: 'Motion Direction & CGI',
    subtitle: 'Cinematic brand films, 3D product visualization, kinetic typography, and visual storytelling that command attention across all platforms.',
    url: '#contact',
  },
]

const ImageAccordion = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="ia-section py-10 sm:py-14 lg:py-20 bg-white text-neutral-900 overflow-hidden" id="services" aria-label="Services Accordion">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className=" mb-12 sm:mb-16 text-center">


          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight main-heading text-neutral-950 leading-[1.12]">
            Crafting iconic experiences &{' '}
            <span className="text-transparent main-heading-accent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
              transformative brands.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            From visionary identity systems to immersive 3D web environments and digital products,
            our disciplines fuse art, strategy, and engineering to build category leaders.
          </p>
        </div>

        {/* Accordion Strip */}
        <div className="ia-wrapper">
          {services.map((item) => {
            const isActive = hovered === item.id
            const isIdle = hovered !== null && hovered !== item.id

            return (
              <div
                key={item.id}
                className={`ia-panel${isActive ? ' ia-panel--active' : ''}${isIdle ? ' ia-panel--idle' : ''}`}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  flex: isActive ? 3.2 : isIdle ? 0.55 : 1,
                }}
              >
                {/* Background Image */}
                <div className="ia-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="ia-img"
                    style={{
                      transform: isActive ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                    }}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="ia-overlay" />

                {/* Label container */}
                <div className="ia-label">
                  {/* Vertical label shown when collapsed */}
                  <span
                    className="ia-label-vertical"
                    style={{
                      opacity: isActive ? 0 : isIdle ? 0.7 : 1,
                    }}
                  >
                    {item.title}
                  </span>

                  {/* Bottom label shown when expanded */}
                  <div
                    className="ia-label-bottom"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <p className="ia-label-title">{item.title}</p>
                    <p className="ia-label-subtitle">{item.subtitle}</p>

                    <a href={item.url} className="inline-block mt-3">
                      <button className="learn-more">
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Know More</span>
                      </button>
                    </a>
                  </div>
                </div>

                {/* Corner number */}
                <span
                  className="ia-number"
                  style={{
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  {String(item.id).padStart(2, '0')}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ImageAccordion
