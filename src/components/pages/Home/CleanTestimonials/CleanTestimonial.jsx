import React, { useState, useEffect, useRef } from "react";
import "./CleanTestimonial.css";
import FilamentText from "../../../FilamentText/FilamentText";


const testimonials = [
  {
    quote:
      "The attention to detail is truly unmatched. From the very first interaction to the final execution, every element feels carefully considered and purposefully designed. What impressed us most was the ability to transform complex ideas into simple, intuitive, and visually stunning experiences that genuinely connect with users. The entire process exceeded our expectations.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
    avatar:
      "https://cdn.21st.dev/assets/mirror/da/da434276d51c85ff15ac27eabca303c18b8044390be5aad668d18d5fb43cc373.png",
  },
  {
    quote:
      "Finally, someone who truly understands that simplicity is the ultimate sophistication. The creativity, technical expertise, and thoughtful approach brought an entirely new perspective to our project. Every design decision was backed by a clear understanding of our goals and audience. The result was not just a beautiful digital experience, but something meaningful, functional, and incredibly engaging.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
    avatar:
      "https://cdn.21st.dev/assets/mirror/93/93c76c47af7fc3821e1f5d22b087263d5db480b664f5b24a27cbf6ddc0c2c11d.jpg",
  },
  {
    quote:
      "This work completely redefined our approach to digital experiences. The perfect balance between aesthetics, functionality, and performance made a remarkable difference in how our users interact with our platform. What truly stood out was the commitment to understanding our vision, challenging conventional thinking, and consistently delivering solutions that were both innovative and practical. An exceptional experience from beginning to end.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
    avatar:
      "https://cdn.21st.dev/assets/mirror/db/dbe8ba771425288545e355ee4da179d1c7564860aa6f61e02c3c617695487c11.png",
  },
];

function SplitText({ text }) {
  return (
    <span className="testimonial-split-text">
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="testimonial-word"
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function CleanTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    testimonials.forEach(({ avatar }) => {
      const image = new Image();
      image.src = avatar;
    });
  }, []);

  useEffect(() => {
    let animationFrame;

    const animateCursor = () => {
      const cursor = cursorRef.current;

      if (cursor) {
        const target = mousePosition.current;
        const current = cursorPosition.current;

        current.x += (target.x - current.x) * 0.15;
        current.y += (target.y - current.y) * 0.15;

        cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(animateCursor);
    };

    animationFrame = requestAnimationFrame(animateCursor);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    mousePosition.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleNext = () => {
    setActiveIndex((previous) => (previous + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  const progress = ((activeIndex + 1) / testimonials.length) * 100;

  return (

    
    <div
      ref={containerRef}
      className={`clean-testimonial ${isHovered ? "is-hovered" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNext}
      role="button"
      tabIndex={0}
      aria-label="Next testimonial"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNext();
        }
      }}
    >

        
      {/* Magnetic cursor */}
      <div ref={cursorRef} className="testimonial-cursor">
        <div className="testimonial-cursor-circle">
          <span>Next</span>
        </div>
      </div>

      

      {/* Testimonial counter */}
      <div className="testimonial-counter">
        <span className="testimonial-current" key={activeIndex}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <span className="testimonial-counter-divider">/</span>

        <span className="testimonial-total">
          {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main content */}
       <div className="mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-6 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span>Testimonials</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold main-heading tracking-tight text-neutral-950 leading-[1.12]">
          
          <FilamentText text="Words from the People" />
          <FilamentText text="We've Worked With" className="main-heading-accent" />
        </h2>

        {/* <p className="mt-5 body-font sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
         
          <p>A glimpse into the identities, digital platforms, and generative experiences we architect for visionaries and category-defining brands.</p>
        </p> */}
      </div>

     

      {/* Stacked avatars */}
      <div className="testimonial-avatar-stack">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.author}
            className={`testimonial-stack-item ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
            />
          </div>
        ))}
      </div>

      <div className="testimonial-content">
        <blockquote key={`quote-${activeIndex}`} className="testimonial-quote">
          <SplitText text={currentTestimonial.quote} />
          
        </blockquote>

        {/* Author */}
        <div className="testimonial-author-section">
          <div className="testimonial-author-row">
            <div className="testimonial-author-avatar">
              <div className="testimonial-avatar-ring" />

              {testimonials.map((testimonial, index) => (
                <img
                  key={testimonial.author}
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className={`testimonial-author-image ${
                    index === activeIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>

            <div
              key={`author-${activeIndex}`}
              className="testimonial-author-info"
            >
              <span className="testimonial-author-name">
                {currentTestimonial.author}
              </span>

              <span className="testimonial-author-role">
                {currentTestimonial.role} — {currentTestimonial.company}
              </span>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="testimonial-progress">
          <div
            className="testimonial-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Interaction hint */}
      <div className="testimonial-hint">Click anywhere</div>
    </div>
  );
}
