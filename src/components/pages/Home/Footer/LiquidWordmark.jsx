"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { LiquidEngine, clamp } from "../../../liquid-sculpture-hero/liquid-engine";

export default function LiquidWordmark({
  imageSrc = "/assets/images/probus-studio.png",
  alt = "Probus Studio",
  strength = 1.0,
  radius = 220,
  particleDensity = 1.0,
  particleSpread = 1.0,
  dotSize = 1.0,
  turbulence = 1.0,
  liquid = 1.0,
  returnSpeed = 1.1,
  interactive = true,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const engineRef = useRef(null);
  const aspectRef = useRef(1920 / 400); // 4.8 default
  const [isReady, setIsReady] = useState(false);

  const engineOpts = useCallback(
    (reducedMotion = false) => ({
      interactive,
      strength: clamp(strength, 0, 2),
      radius: clamp(radius, 40, 600),
      density: clamp(particleDensity, 0.15, 2),
      dotSize: clamp(dotSize, 0.2, 3),
      spread: clamp(particleSpread, 0, 2),
      turbulence: clamp(turbulence, 0, 2),
      liquid: clamp(liquid, 0, 2),
      streaks: true,
      restStyle: "image",
      returnSpeed: clamp(returnSpeed, 0, 2),
      ambient: false,
      ambientIntensity: 1,
      speed: 1,
      intro: false,
      reducedMotion,
      bg: [1, 1, 1],
      imgBg: null,
    }),
    [
      interactive,
      strength,
      radius,
      particleDensity,
      dotSize,
      particleSpread,
      turbulence,
      liquid,
      returnSpeed,
    ]
  );

  const optsRef = useRef(engineOpts);
  useEffect(() => {
    optsRef.current = engineOpts;
  }, [engineOpts]);

  const relayout = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (w <= 0 || h <= 0) return;

    const aspect = aspectRef.current || 4.8;
    let rw = w * 0.96;
    let rh = rw / aspect;
    if (rh > h * 0.94) {
      rh = h * 0.94;
      rw = rh * aspect;
    }

    const rect = {
      x: (w - rw) / 2,
      y: (h - rh) / 2,
      w: rw,
      h: rh,
    };

    const img = imgRef.current;
    if (img) {
      img.style.left = `${rect.x}px`;
      img.style.top = `${rect.y}px`;
      img.style.width = `${rect.w}px`;
      img.style.height = `${rect.h}px`;
    }

    engineRef.current?.resize(w, h, rect);
  }, []);

  // Engine lifecycle
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const canvas = document.createElement("canvas");
    canvas.className = "probus-liquid-canvas";
    stage.appendChild(canvas);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let engine = null;
    const fail = () => {
      setIsReady(false);
    };

    try {
      engine = new LiquidEngine(canvas, optsRef.current(mq.matches), fail);
      engineRef.current = engine;
    } catch {
      fail();
    }

    const ro = new ResizeObserver(() => relayout());
    ro.observe(root);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        engine?.setVisible(e.isIntersecting && !document.hidden);
      }
    });
    io.observe(root);

    const onVis = () => engine?.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const onMq = () => engine?.setOptions({ reducedMotion: mq.matches });
    mq.addEventListener?.("change", onMq);

    const pos = (e) => {
      const b = root.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };

    const onMove = (e) => {
      const [x, y] = pos(e);
      const touch = e.pointerType === "touch";
      if (touch && e.buttons === 0 && e.pressure === 0) return;
      engine?.pointer("move", x, y, touch);
    };
    const onDown = (e) => {
      const [x, y] = pos(e);
      engine?.pointer("down", x, y, e.pointerType === "touch");
    };
    const onUp = (e) => {
      const [x, y] = pos(e);
      engine?.pointer("up", x, y, e.pointerType === "touch");
    };
    const onLeave = (e) => {
      const [x, y] = pos(e);
      engine?.pointer("leave", x, y, e.pointerType === "touch");
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerdown", onDown, { passive: true });
    root.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("pointercancel", onUp, { passive: true });
    root.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener?.("change", onMq);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onLeave);
      engine?.destroy();
      engineRef.current = null;
      canvas.remove();
    };
  }, [relayout]);

  // Load image directly as-is without any color manipulation or overlays
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";

    img.onload = () => {
      if (cancelled) return;
      aspectRef.current =
        (img.naturalWidth || img.width) / (img.naturalHeight || img.height) || 4.8;
      relayout();

      const engine = engineRef.current;
      if (engine) {
        try {
          engine.onFirstFrame = () => {
            if (cancelled) return;
            setIsReady(true);
          };
          engine.setImage(img);
          relayout();
        } catch {
          setIsReady(false);
        }
      }
    };

    img.src = imageSrc;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, relayout]);

  // Live option updates
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    e.setOptions(optsRef.current(rm));
  }, [engineOpts]);

  return (
    <div
      ref={rootRef}
      className={`probus-liquid-wordmark-container ${className}`}
      style={style}
      data-gl={isReady ? "on" : "off"}
      aria-label={alt}
      role="img"
    >
      <div ref={stageRef} className="probus-liquid-stage" aria-hidden="true">
        <img
          ref={imgRef}
          className="probus-liquid-fallback"
          src={imageSrc}
          alt={alt}
          draggable={false}
        />
      </div>
    </div>
  );
}
