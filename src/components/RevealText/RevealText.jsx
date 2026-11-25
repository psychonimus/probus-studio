
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RevealText.css";

gsap.registerPlugin(ScrollTrigger);

const RevealText = ({
  text,
  className = "",
  speed = 0.06,
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".reveal-char");
      const highlights = gsap.utils.toArray(".char-highlight");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      chars.forEach((char, i) => {
        const highlight = highlights[i];
        const start = i * speed;

        // Reveal the character
        tl.fromTo(
          char,
          {
            opacity: 0,
            y: 8,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          start
        );

        // Gradient appears briefly on new characters
        tl.fromTo(
          highlight,
          { opacity: 1 },
          {
            opacity: 0,
            duration: speed * 4,
            ease: "power2.inOut",
          },
          start + 0.18
        );
      });
    }, textRef);

    return () => ctx.revert();
  }, [text, speed]);

  return (
    <div ref={textRef} className={`reveal-text ${className}`}>
      {Array.from(text).map((char, i) => (
        <span className="reveal-char" key={i}>
          <span className="char-highlight" aria-hidden="true">
            {char === " " ? "\u00A0" : char}
          </span>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default RevealText;
