import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Filament } from './filament';
import './FilamentText.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Filament variation #16. Pass only text and className. */
export default function FilamentText({ text, className = '' }) {
  const rootRef = useRef(null);
  const finalRef = useRef(null);
  const rendererRef = useRef(null);

  useLayoutEffect(() => {
    if (!text) return;
    const root = rootRef.current;
    const finalText = finalRef.current;
    const renderer = rendererRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      finalText.style.opacity = '1';
      return () => { finalText.style.opacity = ''; };
    }

    let effect, playZone, resetZone, observer, fade, finalSplit;
    let disposed = false;
    let armed = true;

    // Split the *final* and WebGL measurement copies identically. Without
    // this, fonts with kerning/ligatures (especially italics) change width
    // when the WebGL canvas hands over to the unsplit text.
    const syncGradient = () => {
      if (!finalSplit || disposed) return;
      const rootStyle = getComputedStyle(root);
      const gradient = rootStyle.backgroundImage;
      const isGradient = gradient && gradient !== 'none';
      const box = finalText.getBoundingClientRect();
      const chars = finalSplit.chars;
      for (const char of chars) {
        if (isGradient) {
          const rect = char.getBoundingClientRect();
          char.style.backgroundImage = gradient;
          char.style.backgroundSize = `${box.width}px ${box.height}px`;
          char.style.backgroundPosition = `${box.left - rect.left}px ${box.top - rect.top}px`;
          char.style.backgroundRepeat = 'no-repeat';
          char.style.webkitBackgroundClip = 'text';
          char.style.backgroundClip = 'text';
          char.style.webkitTextFillColor = 'transparent';
        } else {
          char.style.backgroundImage = 'none';
          char.style.webkitTextFillColor = 'currentColor';
        }
      }
    };

    // Establish invisible final layer before first paint.
    gsap.set(finalText, { opacity: 0 });

    const initialize = () => {
      if (disposed) return;
      finalSplit = SplitText.create(finalText, {
        type: 'words, chars',
        wordsClass: 'word',
        charsClass: 'char',
      });
      effect = new Filament(renderer);
      syncGradient();

      effect.onFallback = () => {
        if (!disposed) gsap.set(finalText, { opacity: 1 });
      };
      effect.onHandover = () => {
        if (disposed) return;
        fade?.kill();
        // Both layers now have IDENTICAL split-letter geometry.
        fade = gsap.to(finalText, {
          opacity: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        });
      };

      const play = () => {
        if (!armed) return;
        armed = false;
        fade?.kill();
        gsap.set(finalText, { opacity: 0 });
        effect.play();
      };
      const rearm = () => {
        armed = true;
        fade?.kill();
        gsap.set(finalText, { opacity: 0 });
        effect.reset();
      };

      playZone = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'bottom 35%',
        onEnter: play,
        onEnterBack: play,
      });
      resetZone = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onLeave: rearm,
        onLeaveBack: rearm,
      });
      observer = new ResizeObserver(() => {
        syncGradient();
        effect?.refresh();
      });
      observer.observe(root);
      if (playZone.isActive) play();
    };

    document.fonts.ready.then(initialize);
    return () => {
      disposed = true;
      fade?.kill();
      playZone?.kill();
      resetZone?.kill();
      observer?.disconnect();
      effect?.destroy();
      finalSplit?.revert();
      gsap.set(finalText, { clearProps: 'opacity' });
    };
  }, [text]);

  return (
    <div ref={rootRef} className={`filament-text ${className}`}>
      <span ref={finalRef} className="filament-final" role="text">{text}</span>
      <span ref={rendererRef} className="filament-renderer" aria-hidden="true">
        <span data-line>{text}</span>
      </span>
    </div>
  );
}
