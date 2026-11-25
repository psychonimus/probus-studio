"use client";

import * as React from "react";
import "./liquid-sculpture-hero.css";
import { LiquidEngine, clamp, hexToRgb } from "./liquid-engine";
import RevealText from "../RevealText/RevealText";
import FilamentText from '../FilamentText/FilamentText'

/* ────────────────────────────────────────────────────────────────────
   Public API
   ──────────────────────────────────────────────────────────────────── */

const DEFAULTS = {
  src: "https://cdn.21st.dev/assets/mirror/ae/ae8c3de9003460e59182e950ccd345f68f27f9d0e4808b64c92c962a4eca7120.webp",
  darkSrc:
    "https://cdn.21st.dev/assets/mirror/a1/a1fa387b6e417b26a25f317559c87cce4d241c1052c52a2b3bc2966b2aaf9b65.webp",
  mobileSrc:
    "https://cdn.21st.dev/assets/mirror/b0/b0c8d8e5d64b8cec906a3b390e3dc7c9a5af08334bf0632873c601782cb4bc46.webp",
  mobileDarkSrc:
    "https://cdn.21st.dev/assets/mirror/9a/9a82cb59be1bfde59855b79d7a565e487155a89f4d52eac74dcc10e267b2b6d1.webp",
  imageAlt: "Abstract sculpture of interwoven metallic filaments and particles",
  imageBackground: "#ffffff",

  navCta: { label: "Contact", href: "#" },
  //   eyebrow: "Independent studio — Est. 2019",
  headline: "Discover The Power Of\nCreative Transformation.",
  headlineAccent: "Creative Transformation.",
  body: "We help you create everlasting brands and manage online brand reputation that attracts business, Inspire talent and showcase your potential in the most innovative way!",
  primaryCta: { label: "Start a project", href: "#" },
  secondaryCta: { label: "Selected work", href: "#" },
  // hint: "Move across the form",
  // hintTouch: "Touch the form",
  background: "#ffffff",
  darkBackground: "#111110",
  textColor: "#090a0f",
  accentColor: "#d9703e",
  headingFont: "'Geist', 'Helvetica Neue', Arial, sans-serif",
  accentFont: "'Instrument Serif', 'Times New Roman', serif",
  bodyFont: "'Geist', 'Helvetica Neue', Arial, sans-serif",
};

/* ────────────────────────────────────────────────────────────────────
   Layout
   ──────────────────────────────────────────────────────────────────── */

/** The sculpture sits centred in the band between the nav and the copy,
 *  as wide as the hero (it may bleed off the sides on small screens). */
function computeRect(w, h, aspect, band, p) {
  const bandH = Math.max(80, band.bottom - band.top);
  let rw;
  let maxH;
  if (w >= 1024) {
    rw = w * 1.02 * p.scale;
    maxH = bandH * 1.1 * p.scale;
  } else if (w >= 640) {
    rw = w * 1.3 * p.scale;
    maxH = bandH * 1.15 * p.scale;
  } else if (aspect < 1.3) {
    // portrait image for phones: fills the width, may tuck under the headline
    rw = w * 1.0 * p.mobileScale;
    maxH = bandH * 1.0 * p.mobileScale;
  } else {
    rw = w * 1.9 * p.mobileScale;
    maxH = bandH * 1.2 * p.mobileScale;
  }
  if (rw / aspect > maxH) rw = maxH * aspect;
  const rh = rw / aspect;
  const cx = w * (0.5 + p.x / 100);
  const cy = (band.top + band.bottom) / 2 + h * (p.y / 100);
  return { x: cx - rw / 2, y: cy - rh / 2, w: rw, h: rh };
}

/* ────────────────────────────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────────────────────────────── */

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ────────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────────── */

let fontsInjected = false;
function injectFonts() {
  if (fontsInjected || typeof document === "undefined") return;
  fontsInjected = true;
  const id = "sh-fonts";
  if (document.getElementById(id)) return;
  const l = document.createElement("link");
  l.id = id;
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap";
  document.head.appendChild(l);
}

function renderHeadline(text, accent) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    let content = line;
    const a = accent && accent.trim();
    if (a) {
      const idx = line.indexOf(a);
      if (idx >= 0) {
        content = (
          <>
            {line.slice(0, idx)}
            <span className="sh-accent">{a}</span>
            {line.slice(idx + a.length)}
          </>
        );
      }
    }
    return (
      <span className="sh-line" key={li}>
        {content}
      </span>
    );
  });
}

export default function SculptureHero(props) {
  const {
    src = DEFAULTS.src,
    darkSrc = DEFAULTS.darkSrc,
    mobileSrc = DEFAULTS.mobileSrc,
    mobileDarkSrc = DEFAULTS.mobileDarkSrc,
    imageAlt = DEFAULTS.imageAlt,
    imageBackground,
    eyebrow = DEFAULTS.eyebrow,
    headline = DEFAULTS.headline,
    headlineAccent = DEFAULTS.headlineAccent,
    body = DEFAULTS.body,
    primaryCta = DEFAULTS.primaryCta,
    secondaryCta = DEFAULTS.secondaryCta,
    hint = DEFAULTS.hint,
    hintTouch = DEFAULTS.hintTouch,
    background: lightBackground = DEFAULTS.background,
    darkBackground = DEFAULTS.darkBackground,
    theme = "light",
    textColor,
    accentColor,
    headingFont = DEFAULTS.headingFont,
    accentFont = DEFAULTS.accentFont,
    bodyFont = DEFAULTS.bodyFont,
    loadFonts = true,
    sculptureScale = 1,
    mobileSculptureScale = 1,
    sculptureX = 0,
    sculptureY = 0,
    interactive = true,
    strength = 1,
    radius = 220,
    particleDensity = 1,
    particleSpread = 1,
    dotSize = 1,
    turbulence = 1,
    liquid = 1,
    streaks = true,
    restStyle = "image",
    returnSpeed = 1,
    ambient = false,
    ambientIntensity = 1,
    speed = 1,
    intro = false,
    height = "100svh",
    backdropText = "Studio",
    className,
    style,
  } = props;

  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const hintRef = React.useRef(null);
  const navRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const backdropRef = React.useRef(null);
  const engineRef = React.useRef(null);
  const aspectRef = React.useRef(1983 / 793);
  const [isTouch, setIsTouch] = React.useState(false);

  const layout = React.useRef({
    scale: clamp(sculptureScale, 0.3, 3),
    mobileScale: clamp(mobileSculptureScale, 0.3, 3),
    x: sculptureX,
    y: sculptureY,
  });
  React.useEffect(() => {
    layout.current = {
      scale: clamp(sculptureScale, 0.3, 3),
      mobileScale: clamp(mobileSculptureScale, 0.3, 3),
      x: sculptureX,
      y: sculptureY,
    };
  }, [sculptureScale, mobileSculptureScale, sculptureX, sculptureY]);

  const [mode, setMode] = React.useState(theme);
  const [prevTheme, setPrevTheme] = React.useState(theme);
  if (theme !== prevTheme) {
    setPrevTheme(theme);
    setMode(theme);
  }
  const background = mode === "dark" ? darkBackground : lightBackground;
  const bgRgb = React.useMemo(
    () => hexToRgb(background, [0.92, 0.91, 0.9]),
    [background],
  );
  // text follows the background unless set: light on dark grounds, dark on light ones
  const darkBg =
    bgRgb[0] * 0.2126 + bgRgb[1] * 0.7152 + bgRgb[2] * 0.0722 < 0.45;
  const fg = textColor || (darkBg ? "#F1EFEA" : DEFAULTS.textColor);
  const acc = accentColor || fg;
  const imgBgRgb = React.useMemo(
    () =>
      imageBackground ? hexToRgb(imageBackground, [0.918, 0.914, 0.906]) : null,
    [imageBackground],
  );
  const [isMobile, setIsMobile] = React.useState(false);
  const mobileRef = React.useRef(false);
  // pick the image for the current theme and layout, falling back sensibly
  const activeSrc =
    (isMobile && mode === "dark" && (mobileDarkSrc || darkSrc)) ||
    (isMobile && mode === "light" && mobileSrc) ||
    (mode === "dark" && darkSrc) ||
    src;

  const engineOpts = (rm) => ({
    interactive,
    strength: clamp(strength, 0, 2),
    radius: clamp(radius, 40, 600),
    density: clamp(particleDensity, 0.15, 2),
    dotSize: clamp(dotSize, 0.2, 3),
    spread: clamp(particleSpread, 0, 2),
    turbulence: clamp(turbulence, 0, 2),
    liquid: clamp(liquid, 0, 2),
    streaks,
    restStyle,
    returnSpeed: clamp(returnSpeed, 0, 2),
    ambient,
    ambientIntensity: clamp(ambientIntensity, 0, 2),
    speed: clamp(speed, 0.25, 3),
    intro,
    reducedMotion: rm,
    bg: bgRgb,
    imgBg: imgBgRgb,
  });
  const optsRef = React.useRef(engineOpts);
  React.useEffect(() => {
    optsRef.current = engineOpts;
  });

  React.useEffect(() => {
    if (loadFonts) injectFonts();
  }, [loadFonts]);

  const relayout = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    const mob = w < 640;
    if (mob !== mobileRef.current) {
      mobileRef.current = mob;
      setIsMobile(mob);
    }
    const nav = navRef.current;
    const content = contentRef.current;
    const band = {
      top: nav ? nav.offsetTop + nav.offsetHeight + 8 : 16,
      bottom: content ? content.offsetTop - 8 : h,
    };
    // a portrait sculpture on phones dissolves into the top of the copy
    if (mob && aspectRef.current < 1.3 && content)
      band.bottom += content.offsetHeight * 0.3;
    const rect = computeRect(w, h, aspectRef.current, band, layout.current);
    const bd = backdropRef.current;
    if (bd) {
      const chars = Math.max(1, (bd.textContent || "").length);
      bd.style.fontSize =
        Math.min((band.bottom - band.top) * 0.95, (w * 0.92) / (chars * 0.56)) +
        "px";
      bd.style.top = (band.top + band.bottom) / 2 + "px";
    }
    const img = imgRef.current;
    if (img) {
      img.style.left = rect.x + "px";
      img.style.top = rect.y + "px";
      img.style.width = rect.w + "px";
      img.style.height = rect.h + "px";
    }
    const hintEl = hintRef.current;
    if (hintEl) {
      // the portrait phone sculpture runs into the copy: no room for the cue there
      hintEl.style.display = mob && aspectRef.current < 1.3 ? "none" : "";
      hintEl.style.left = clamp(rect.x + rect.w / 2, 80, w - 80) + "px";
      hintEl.style.top =
        Math.min(rect.y + rect.h * 0.95, band.bottom - 20) + "px";
    }
    engineRef.current?.resize(w, h, rect);
  }, []);

  // engine lifecycle (re-created only when the image changes)
  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    // a fresh canvas per engine: a released WebGL context can never be reused
    const canvas = document.createElement("canvas");
    canvas.className = "sh-canvas";
    stage.appendChild(canvas);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(coarse.matches);
    let engine = null;
    const fail = () => {
      root.dataset.gl = "off";
    };
    try {
      engine = new LiquidEngine(canvas, optsRef.current(mq.matches), fail);
      engineRef.current = engine;
    } catch {
      fail();
    }

    const ro = new ResizeObserver(() => relayout());
    ro.observe(root);
    // the band moves when fonts load or the copy reflows
    if (navRef.current) ro.observe(navRef.current);
    if (contentRef.current) ro.observe(contentRef.current);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries)
        engine?.setVisible(e.isIntersecting && !document.hidden);
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
    let touched = false;
    const markTouched = () => {
      if (!touched) {
        touched = true;
        root.dataset.touched = "1";
      }
    };
    const onMove = (e) => {
      const [x, y] = pos(e);
      const touch = e.pointerType === "touch";
      if (touch && e.buttons === 0 && e.pressure === 0) return;
      engine?.pointer("move", x, y, touch);
      markTouched();
    };
    const onDown = (e) => {
      const [x, y] = pos(e);
      engine?.pointer("down", x, y, e.pointerType === "touch");
      markTouched();
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
      delete root.dataset.gl;
    };
  }, [relayout]);

  // (re)load the sculpture whenever the theme or layout asks for another image;
  // the canvas dips out while the static image covers the swap
  React.useEffect(() => {
    const root = rootRef.current;
    const engine = engineRef.current;
    if (!root) return;
    let cancelled = false;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    const swapping = root.dataset.gl === "on";
    if (swapping) root.dataset.swap = "1";
    image.onload = () => {
      if (cancelled) return;
      aspectRef.current =
        image.naturalWidth / image.naturalHeight || aspectRef.current;
      relayout();
      if (engine && root.dataset.gl !== "off") {
        try {
          engine.onFirstFrame = () => {
            if (cancelled) return;
            root.dataset.gl = "on";
            delete root.dataset.swap;
          };
          engine.setImage(image);
          relayout();
        } catch {
          root.dataset.gl = "off";
        }
      } else delete root.dataset.swap;
    };
    image.onerror = () => {
      delete root.dataset.swap;
    };
    // let the fade-out start before the GPU upload
    const t = window.setTimeout(
      () => (image.src = activeSrc),
      swapping ? 280 : 0,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      image.onload = null;
      image.onerror = null;
    };
  }, [activeSrc, relayout]);

  // live option updates without re-creating the engine
  React.useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    e.setOptions(optsRef.current(rm));
  }, [
    interactive,
    strength,
    radius,
    particleDensity,
    dotSize,
    particleSpread,
    turbulence,
    liquid,
    streaks,
    restStyle,
    returnSpeed,
    ambient,
    ambientIntensity,
    speed,
    intro,
    bgRgb,
    imgBgRgb,
  ]);

  React.useEffect(() => {
    relayout();
  }, [sculptureScale, mobileSculptureScale, sculptureX, sculptureY, relayout]);

  const vars = {
    "--sh-bg": background,
    "--sh-fg": fg,
    "--sh-acc": acc,
    "--sh-head": headingFont,
    "--sh-accent": accentFont,
    "--sh-body": bodyFont,
    "--sh-h": height,
  };

  const hintText = isTouch ? hintTouch : hint;

  return (
    <section
      ref={rootRef}
      className={"sh-root" + (className ? " " + className : "")}
      style={{ ...vars, ...style }}
    >
      {/* <style>{CSS}</style> */}
      {backdropText ? (
        <div ref={backdropRef} className="sh-backdrop" aria-hidden="true">
          {backdropText}
        </div>
      ) : null}
      <div ref={stageRef} className="sh-stage" aria-hidden="true">
        <img
          ref={imgRef}
          className="sh-fallback"
          src={activeSrc}
          alt=""
          crossOrigin="anonymous"
          draggable={false}
        />
      </div>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {imageAlt}
      </span>

      {interactive && hintText ? (
        <div ref={hintRef} className="sh-hint" aria-hidden="true">
          {hintText}
        </div>
      ) : null}

      <div className="sh-spacer" />

      <div ref={contentRef} className="sh-content">
        <div>
          {eyebrow ? <p className="sh-eyebrow">{eyebrow}</p> : null}
          <h1 className="sh-h1">
            <FilamentText
              text="Discover the power of"
              className="main-heading"
            />
            {" "}
            {/* <span className="main-heading-accent">Creative Transformation</span> */}
            <FilamentText
              text="Creative Transformation"
              className="main-heading-accent"
            />
          </h1>
        </div>
        <div className="sh-aside">
          {body ? <p className="sh-body"><FilamentText text={body} /></p> : null}
          <div className="sh-ctas">
            {primaryCta && primaryCta.label ? (
              <a className="sh-btn" href={primaryCta.href}>
                {primaryCta.label}
                <Arrow />
              </a>
            ) : null}
            {secondaryCta && secondaryCta.label ? (
              <a className="sh-txt" href={secondaryCta.href}>
                {secondaryCta.label}
                <Arrow />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
