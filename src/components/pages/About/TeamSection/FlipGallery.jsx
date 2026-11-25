
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";
import "./FlipGallery.css";

gsap.registerPlugin(Flip);

const defaultItems = [
  {
    image: "https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-9.jpg",
    titleTop: "CONFIDENCE",
    titleBottom: "CHARISMA",
    leftTitle: "CHARM",
    leftText: "Sharp wit, warm smile, a magnetic presence.",
    rightTitle: "PRESENCE",
    rightText: "Striking confidence, captivating charm, and elegance in every glance.",
  },
  {
    image: "https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-6.jpg",
    titleTop: "WISDOM",
    titleBottom: "INTELLECT",
    leftTitle: "BRILLIANCE",
    leftText: "Quick mind, deep thoughts, a scholarly presence.",
    rightTitle: "KNOWLEDGE",
    rightText: "Deep understanding, thoughtful insights, and clarity in every word.",
  },
  {
    image: "https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-8.jpg",
    titleTop: "KINDNESS",
    titleBottom: "GENEROSITY",
    leftTitle: "GIVING",
    leftText: "Open heart, helping hands, a benevolent force.",
    rightTitle: "COMPASSION",
    rightText: "Gentle spirit, nurturing soul, and warmth in every action.",
  },
  {
    image: "https://moussamamadou.github.io/flip-plugin-horizontal-scroll/images/photo-12.jpg",
    titleTop: "CREATIVITY",
    titleBottom: "ARTISTRY",
    leftTitle: "EXPRESSION",
    leftText: "Fluid style, bold vision, a creative soul.",
    rightTitle: "INNOVATION",
    rightText: "Boundless imagination, artistic flair, and vision in every creation.",
  },
  
];

export default function FlipGallery({
  items = defaultItems,
  className = "",
  onChange,
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;

    if (!root || !stage || !track || !items.length) return;

    const galleryWrappers = Array.from(
      root.querySelectorAll("[data-gallery='wrapper']")
    );

    const detailElements = Array.from(
      root.querySelectorAll("[data-gallery='details']")
    );

    const detailWrappers = Array.from(
      root.querySelectorAll("[data-gallery='details-wrapper']")
    );

    const images = galleryWrappers.map((wrapper) =>
      wrapper.querySelector("[data-gallery='image']")
    );

    const splits = [];
    const listeners = [];
    const animations = [];

    let currentIndex = null;
    let isAnimating = false;
    let destroyed = false;
    let maxHorizontal = 0;
    let frameId = null;
    let resizeObserver = null;

    const clamp = gsap.utils.clamp;

    // ==================================
    // 1. VERTICAL TO HORIZONTAL SCROLL
    // ==================================

    const updateScroll = () => {
      if (destroyed) return;

      const rect = root.getBoundingClientRect();

      // No wheel interception.
      // Normal page scrolling controls horizontal movement.
      const horizontalPosition = clamp(
        0,
        maxHorizontal,
        -rect.top
      );

      gsap.set(track, {
        x: -horizontalPosition,
      });

      frameId = requestAnimationFrame(updateScroll);
    };

    const calculateDimensions = () => {
      if (destroyed) return;

      maxHorizontal = Math.max(
        0,
        track.scrollWidth - stage.clientWidth
      );

      // Give the gallery enough vertical document space
      // for the complete horizontal animation.
      root.style.height = `${
        stage.offsetHeight + maxHorizontal
      }px`;
    };

    calculateDimensions();

    resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    resizeObserver.observe(stage);
    resizeObserver.observe(track);

    window.addEventListener("resize", calculateDimensions);

    frameId = requestAnimationFrame(updateScroll);

    // ==================================
    // 2. SPLIT TEXT
    // ==================================

    const wrapElements = (elements, className) => {
      elements.forEach((element) => {
        const wrapper = document.createElement("span");
        wrapper.className = className;

        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
      });
    };

    detailElements.forEach((detail) => {
      const top = detail.querySelector("[data-text='top']");
      const bottom = detail.querySelector("[data-text='bottom']");

      const leftElements = Array.from(
        detail.querySelectorAll("[data-text='left'] > *")
      );

      const rightElements = Array.from(
        detail.querySelectorAll("[data-text='right'] > *")
      );

      const topSplit = new SplitType(top, {
        types: "chars",
      });

      const bottomSplit = new SplitType(bottom, {
        types: "chars",
      });

      wrapElements(topSplit.chars || [], "fg-char-wrap");
      wrapElements(bottomSplit.chars || [], "fg-char-wrap");

      const sideSplits = [
        ...leftElements,
        ...rightElements,
      ].map(
        (element) =>
          new SplitType(element, {
            types: "lines",
          })
      );

      sideSplits.forEach((split) => {
        wrapElements(split.lines || [], "fg-line-wrap");
      });

      splits.push({
        top,
        bottom,
        instances: [topSplit, bottomSplit, ...sideSplits],
        chars: [
          ...(topSplit.chars || []),
          ...(bottomSplit.chars || []),
        ],
        lines: sideSplits.flatMap(
          (split) => split.lines || []
        ),
      });
    });

    // ==================================
    // 3. CUSTOM CURSOR
    // ==================================

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorFrame = null;

    const handleMouseMove = (event) => {
      mouseX = event.clientX - 12;
      mouseY = event.clientY - 12;
    };

    const updateCursor = () => {
      if (destroyed) return;

      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      cursorFrame = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    cursorFrame = requestAnimationFrame(updateCursor);

    // ==================================
    // 4. OPEN IMAGE
    // ==================================

    const openContent = (index) => {
      if (isAnimating || currentIndex !== null) return;

      const detail = detailElements[index];
      const detailWrapper = detailWrappers[index];
      const image = images[index];
      const split = splits[index];

      if (!detail || !image || !split) return;

      isAnimating = true;
      currentIndex = index;

      detail.classList.remove("fg-hidden");

      const state = Flip.getState(image);

      detailWrapper.appendChild(image);

      const flip = Flip.from(state, {
        duration: 1.25,
        ease: "power4.inOut",
        absolute: true,
      });

      animations.push(flip);

      gsap.set(split.chars, {
        clipPath: "inset(0 100% 0 0)",
        xPercent: 10,
      });

      gsap.set(split.lines, {
        yPercent: 100,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          if (destroyed) return;

          isAnimating = false;
          cursor.classList.add("fg-open");

          onChangeRef.current?.(index, items[index]);
        },
      });

      animations.push(tl);

      tl.to(
        galleryWrappers.filter((_, i) => i !== index),
        {
          clipPath: "inset(100% 0 0 0)",
          duration: 0.75,
          ease: "power3.inOut",
        },
        0
      )
        .fromTo(
          [split.top, split.bottom],
          { xPercent: 15 },
          {
            xPercent: 0,
            duration: 1,
            ease: "power3.out",
          },
          1.1
        )
        .to(
          split.chars,
          {
            clipPath: "inset(0 0% 0 0)",
            xPercent: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          1.1
        )
        .to(
          split.lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.025,
            duration: 0.75,
            ease: "power3.out",
          },
          1.1
        );
    };

    // ==================================
    // 5. CLOSE IMAGE
    // ==================================

    const closeContent = () => {
      if (isAnimating || currentIndex === null) return;

      const index = currentIndex;
      const detail = detailElements[index];
      const image = images[index];
      const split = splits[index];

      isAnimating = true;

      const tl = gsap.timeline({
        onComplete: () => {
          if (destroyed) return;

          isAnimating = false;
          currentIndex = null;

          detail.classList.add("fg-hidden");
          cursor.classList.remove("fg-open");

          gsap.set(galleryWrappers, {
            clearProps: "clipPath",
          });

          onChangeRef.current?.(null, null);
        },
      });

      animations.push(tl);

      tl.to(
        [split.top, split.bottom],
        {
          xPercent: 10,
          duration: 0.75,
          ease: "power3.inOut",
        },
        0
      )
        .to(
          split.chars,
          {
            clipPath: "inset(0 100% 0 0)",
            xPercent: 10,
            duration: 0.75,
          },
          0
        )
        .to(
          split.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.75,
            stagger: 0.025,
          },
          0
        )
        .add(() => {
          const state = Flip.getState(image);

          galleryWrappers[index].appendChild(image);

          const flip = Flip.from(state, {
            duration: 1.25,
            ease: "power3.inOut",
            absolute: true,
          });

          animations.push(flip);
        }, 0.25)
        .to(
          galleryWrappers.filter((_, i) => i !== index),
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.25,
          },
          0.25
        );
    };

    // ==================================
    // 6. EVENT LISTENERS
    // ==================================

    galleryWrappers.forEach((wrapper, index) => {
      const open = () => openContent(index);
      const enter = () => cursor.classList.add("fg-visible");
      const leave = () => cursor.classList.remove("fg-visible");

      wrapper.addEventListener("click", open);
      wrapper.addEventListener("mouseenter", enter);
      wrapper.addEventListener("mouseleave", leave);

      listeners.push(() => {
        wrapper.removeEventListener("click", open);
        wrapper.removeEventListener("mouseenter", enter);
        wrapper.removeEventListener("mouseleave", leave);
      });
    });

    detailWrappers.forEach((wrapper) => {
      const close = () => closeContent();
      const enter = () => cursor.classList.add("fg-visible");
      const leave = () => cursor.classList.remove("fg-visible");

      wrapper.addEventListener("click", close);
      wrapper.addEventListener("mouseenter", enter);
      wrapper.addEventListener("mouseleave", leave);

      listeners.push(() => {
        wrapper.removeEventListener("click", close);
        wrapper.removeEventListener("mouseenter", enter);
        wrapper.removeEventListener("mouseleave", leave);
      });
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeContent();
    };

    window.addEventListener("keydown", handleKeyDown);

    // ==================================
    // 7. CLEANUP
    // ==================================

    return () => {
      destroyed = true;

      if (frameId !== null) cancelAnimationFrame(frameId);
      if (cursorFrame !== null) {
        cancelAnimationFrame(cursorFrame);
      }

      resizeObserver?.disconnect();

      window.removeEventListener("resize", calculateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);

      listeners.forEach((dispose) => dispose());
      animations.forEach((animation) => animation.kill());

      images.forEach((image, index) => {
        if (image && galleryWrappers[index]) {
          galleryWrappers[index].appendChild(image);
        }
      });

      splits.forEach((split) => {
        split.instances.forEach((instance) => instance.revert());
      });

      gsap.set(track, { clearProps: "transform" });
      root.style.height = "";
    };
  }, [items]);

  return (
    <section
      className={`flip-gallery ${className}`}
      ref={rootRef}
    >
      <div className="fg-stage" ref={stageRef}>
        {/* Custom cursor */}
        <div
          className="fg-cursor"
          ref={cursorRef}
          aria-hidden="true"
        >
          <div className="fg-cross" />
        </div>

        {/* Horizontal track */}
        <div className="fg-scroll-content" ref={trackRef}>
          <div className="fg-gallery">
            {items.map((item, index) => (
              <div
                className="fg-gallery-image"
                data-gallery="wrapper"
                key={index}
              >
                <div
                  className="fg-image-container"
                  data-gallery="image"
                >
                  <img
                    src={item.image}
                    alt={item.alt || item.titleTop}
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded details */}
        <div className="fg-section-content">
          {items.map((item, index) => (
            <div
              className="fg-content fg-hidden"
              data-gallery="details"
              key={index}
            >
              <div
                className="fg-content-wrapper"
                data-gallery="details-wrapper"
              >
                <div className="fg-title-top">
                  <div className="fg-title-big" data-text="top">
                    {item.titleTop}
                  </div>
                </div>

                <div className="fg-title-bottom">
                  <div className="fg-title-big" data-text="bottom">
                    {item.titleBottom}
                  </div>
                </div>

                <div className="fg-text-left" data-text="left">
                  <div className="fg-title-small">
                    {item.leftTitle}
                  </div>
                  <div className="fg-paragraph">
                    {item.leftText}
                  </div>
                </div>

                <div className="fg-text-right" data-text="right">
                  <div className="fg-title-small">
                    {item.rightTitle}
                  </div>
                  <div className="fg-paragraph">
                    {item.rightText}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
