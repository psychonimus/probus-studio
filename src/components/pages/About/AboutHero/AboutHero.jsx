import { useEffect, useRef } from "react";
import "./AboutHero.css";
import FilamentText from "../../../FilamentText/FilamentText";

const AboutHero = ({ heading, headingAccent, para, image, video }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate while visible
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const progress =
          (windowHeight - rect.top) / (windowHeight + rect.height);

        // Movement amount (adjust to your liking)
        const translateY = (progress - 0.5) * 150;

        imageRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="hero-section d-flex flex-column justify-content-center">
        {video && (
          <video
            key={video}
            className="hero-section-video-bg"
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div className="container content-overlay">
          <div className="hero-text text-center">
            <h1 className="sh-h1 mb-5">
              <FilamentText text={heading} className="main-heading" />{" "}
              {/* <span className="main-heading-accent">Creative Transformation</span> */}
              <FilamentText
                text={headingAccent}
                className="main-heading-accent"
              />
            </h1>
            {para && para.map((line, index) => {
              return (
                
                  <p className="sh-body">
                    <FilamentText key={index} text={line} />
                  </p>
                
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-2 px-md-5 hero-image">
        <div className="hero-img-container" ref={containerRef}>
          <img ref={imageRef} src={image} alt="About" />
        </div>
      </section>
    </>
  );
};

export default AboutHero;
