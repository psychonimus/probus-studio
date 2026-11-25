import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import "./OurServices.css";
import FilamentText from "../../../FilamentText/FilamentText";

const SERVICES_DATA = [
  {
    id: "building",
    tag: "Building",
    title: "Building Industry",
    subtitle: "RCC Works, MEP Works, Cladding/Facade Works",
    description:
      "Mastercrafted luxury residences blending sustainable natural materials with organic cliffside geometry.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?q=80&w=1600&auto=format&fit=crop",
    link: "#services-building",
  },
  {
    id: "mining",
    tag: "Mining",
    title: "Mining & Crushing",
    subtitle:
      "Extraction, Drilling, Blasting, Crushing Operation Transportation & Material Handling",
    description:
      "Harmonious living environments with double-height timber ceilings, indoor foliage, and panoramic ocean vistas.",
    image:
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1600&auto=format&fit=crop",
    link: "#services-mining",
  },
  {
    id: "infra",
    tag: "Infra",
    title: "Infrastructure",
    subtitle:
      "Bridge Construction, Roads & Highways Construction, Highrise Building Construction",
    description:
      "Cantilevered multi-tiered structural engineering creating resilient, iconic landmark commercial architecture.",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1600&auto=format&fit=crop",
    link: "#services-infra",
  },
  {
    id: "excavation",
    tag: "Excavation",
    title: "Excavation",
    subtitle: "Site Clearing, Grading, Earth Moving, Disposal",
    description:
      "Strategic coastal site planning integrating cantilevered terraces with expansive infinity water horizons.",
    image:
      "https://images.unsplash.com/photo-1504307651554-6691fc9d79c5?q=80&w=1600&auto=format&fit=crop",
    link: "#services-excavation",
  },
  {
    id: "excavation",
    tag: "Excavation",
    title: "Excavation",
    subtitle: "Site Clearing, Grading, Earth Moving, Disposal",
    description:
      "Strategic coastal site planning integrating cantilevered terraces with expansive infinity water horizons.",
    image:
      "https://images.unsplash.com/photo-1504307651554-6691fc9d79c5?q=80&w=1600&auto=format&fit=crop",
    link: "#services-excavation",
  },
];

export default function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const bgImagesRef = useRef([]);
  const columnsRef = useRef([]);
  const detailsRef = useRef([]);
  const hasAnimatedIn = useRef(false);

  // Background Crossfade & Scale Animation using GSAP
  useEffect(() => {
    bgImagesRef.current.forEach((imgEl, index) => {
      if (!imgEl) return;
      if (index === activeIndex) {
        gsap.to(imgEl, {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(imgEl, {
          opacity: 0,
          scale: 1.06,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });

    // Animate details inside active column
    detailsRef.current.forEach((detailEl, index) => {
      if (!detailEl) return;
      if (index === activeIndex) {
        gsap.fromTo(
          detailEl.querySelectorAll(".services-anim-target"),
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      }
    });
  }, [activeIndex]);

  // Initial Appearance Animation on Scroll
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    let ctx;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn.current) {
          hasAnimatedIn.current = true;

          ctx = gsap.context(() => {
            gsap.fromTo(
              currentSection,
              { opacity: 0 },
              { opacity: 1, duration: 0.8, ease: "power2.out" },
            );

            gsap.fromTo(
              columnsRef.current.filter(Boolean),
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.2,
              },
            );
          }, currentSection);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      className="py-20 sm:py-28 lg:py-12 bg-white text-neutral-900 overflow-hidden text-center"
      id="services"
    >
      <div className="flex flex-col items-center pt-9">
        {/* Section Header matching website aesthetic */}
        <div className="mb-12 sm:mb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span>Our Capabilities & Practices</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight main-heading text-neutral-950 leading-[1.12]">
            <FilamentText
              text="Engineering The"
            />
            <span className="text-transparent main-heading-accent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
              <FilamentText text="transformative brands." className="main-heading-accent" />
            </span>
          </h2>

          <FilamentText
              text="From visionary identity systems to immersive 3D web environments and digital products, our disciplines"
          />
          <FilamentText
              text="fuse art, strategy, and engineering to build category leaders."
          />
          

          {/* <p className="mt-5 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            From visionary identity systems to immersive 3D web environments and
            digital products, our disciplines fuse art, strategy, and
            engineering to build category leaders.
          </p> */}
        </div>

        {/* Interactive 4-Column Accordion Showcase */}
        <div className="services-section" ref={sectionRef}>
          {/* Dynamic Background Image Layers */}
          <div className="services-bg-container">
            {SERVICES_DATA.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (bgImagesRef.current[index] = el)}
                className="services-bg-layer"
                style={{
                  backgroundImage: `url(${service.image})`,
                  opacity: index === activeIndex ? 1 : 0,
                }}
              />
            ))}
            {/* Dark Vignette & Atmospheric Gradients */}
            <div className="services-bg-overlay" />
          </div>

          {/* 4 Interactive Columns */}
          <div className="services-columns-container">
            {SERVICES_DATA.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={service.id}
                  ref={(el) => (columnsRef.current[index] = el)}
                  className={`services-column ${isActive ? "services-column--active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${service.tag} service details`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                >
                  {/* Column Separator Highlight */}
                  <div className="services-column-line" />

                  {/* Column Content Wrapper */}
                  <div
                    className="services-column-content"
                    ref={(el) => (detailsRef.current[index] = el)}
                  >
                    {/* Category Pill Tag */}
                    <div className="services-tag-pill services-anim-target">
                      <span>{service.tag}</span>
                    </div>

                    {/* Service Title */}
                    <h3 className="services-item-title services-anim-target">
                      {service.title}
                    </h3>

                    {/* Extra Subtitle & CTA for Active State */}
                    <div className="services-active-details">
                      {service.subtitle && (
                        <p className="services-item-subtitle services-anim-target">
                          {service.subtitle}
                        </p>
                      )}

                      {/* Discover More Button */}
                      <a
                        href={service.link}
                        className="services-discover-btn services-anim-target"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Discover More</span>
                        <ArrowRight className="services-btn-arrow" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
