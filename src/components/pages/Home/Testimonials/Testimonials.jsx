"use client";

import { useCallback, useEffect, useId, useState } from "react";
import "./Testimonials.css";

function Arrow({ previous = false }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={previous ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"} />
    </svg>
  );
}

function Slide({ quote, outgoing = false, animate = false }) {
  return (
    <div
      className={`qcf__slide${outgoing ? " qcf__slide--out" : animate ? " qcf__slide--in" : ""}`}
      aria-hidden={outgoing || undefined}
    >
      <blockquote className="qcf__quote">
        <svg
          className="qcf__quote-mark"
          viewBox="0 0 28 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 14C0 6 4 1 11 0v4c-4 1-6 3-6 6h6v14H0V14Zm17 0C17 6 21 1 28 0v4c-4 1-6 3-6 6h6v14H17V14Z" />
        </svg>
        {quote.quote}
      </blockquote>
      <div className="qcf__attribution">
        <div className="qcf__person">
          <span className="qcf__avatar" aria-hidden="true">
            {quote.initials}
          </span>
          <div>
            <strong className="qcf__person-name">{quote.name}</strong>
            <p className="qcf__person-role">
              {[quote.role, quote.company].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
        {quote.context && <span className="qcf__context">{quote.context}</span>}
      </div>
    </div>
  );
}

/**
 * Accessible, dependency-free testimonial carousel.
 * Each quote needs: id, quote, name, role, company, initials, and optionally context.
 */
export default function QuoteCrossfade({
  quotes = [],
  title = "In their words",
  description,
  autoPlay = false,
  interval = 6500,
  defaultIndex = 0,
  showAuthorTabs = true,
  onIndexChange,
  className = "",
}) {
  const uid = useId();
  const [index, setIndex] = useState(
    Math.max(0, Math.trunc(defaultIndex) || 0),
  );
  const [outgoing, setOutgoing] = useState(null);
  const [transitionId, setTransitionId] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = quotes.length;
  const currentIndex = count ? index % count : 0;
  const active = quotes[currentIndex];
  const delay = Number.isFinite(interval) ? Math.max(2500, interval) : 6500;
  const playing =
    autoPlay && count > 1 && !paused && !hovered && !hidden && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setHidden(document.hidden);
    syncMotion();
    syncVisibility();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!outgoing) return undefined;
    const timer = window.setTimeout(
      () => setOutgoing(null),
      reducedMotion ? 0 : 360,
    );
    return () => window.clearTimeout(timer);
  }, [transitionId, outgoing, reducedMotion]);

  const select = useCallback(
    (next, manual = true) => {
      if (!count) return;
      const nextIndex = ((next % count) + count) % count;
      if (manual) setPaused(true);
      if (nextIndex === currentIndex) return;
      setOutgoing(reducedMotion ? null : active);
      setIndex(nextIndex);
      setTransitionId((value) => value + 1);
      onIndexChange?.(nextIndex, quotes[nextIndex]);
    },
    [count, currentIndex, active, quotes, reducedMotion, onIndexChange],
  );

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setTimeout(
      () => select(currentIndex + 1, false),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [playing, currentIndex, delay, select]);

  return (
    <section
      className={`qcf ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={`${uid}-title`}
      aria-describedby={description ? `${uid}-description` : undefined}
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || count < 2) return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        select(
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : currentIndex + (event.key === "ArrowRight" ? 1 : -1),
        );
      }}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="qcf__wash" aria-hidden="true" />
      <header className="qcf__header">
        <div>
          <h2 className="qcf__title" id={`${uid}-title`}>
            {title}
          </h2>
          {description && (
            <p className="qcf__description" id={`${uid}-description`}>
              {description}
            </p>
          )}
        </div>
        <span className="qcf__count" aria-hidden="true">
          <strong>
            {String(count ? currentIndex + 1 : 0).padStart(2, "0")}
          </strong>
          <span>/ {String(count).padStart(2, "0")}</span>
        </span>
      </header>
      {active ? (
        <>
          <div
            className="qcf__stage"
            aria-live={playing ? "off" : "polite"}
            aria-atomic="true"
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentIndex + 1} of ${count}`}
          >
            <div className="qcf__sizer" aria-hidden="true">
              {quotes.map((quote) => (
                <Slide key={quote.id} quote={quote} />
              ))}
            </div>
            {outgoing && (
              <Slide key={`out-${transitionId}`} quote={outgoing} outgoing />
            )}
            <Slide
              key={`in-${active.id}-${transitionId}`}
              quote={active}
              animate={Boolean(outgoing)}
            />
          </div>
          <footer className="qcf__footer">
            <div className="qcf__authors" aria-label="Choose a testimonial">
              {showAuthorTabs &&
                quotes.map((quote, position) => (
                  <button
                    key={quote.id}
                    type="button"
                    className={`qcf__author ${position === currentIndex ? "qcf__author--active" : ""}`}
                    aria-label={`Show quote ${position + 1} from ${quote.name}`}
                    aria-pressed={position === currentIndex}
                    onClick={() => select(position)}
                  >
                    <span className="qcf__author-initials" aria-hidden="true">
                      {quote.initials}
                    </span>
                    <span className="qcf__author-name">
                      {quote.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
            </div>
            <div className="qcf__navigation">
              {autoPlay && count > 1 && (
                <button
                  type="button"
                  className="qcf__icon-button"
                  disabled={reducedMotion}
                  onClick={() => setPaused((value) => !value)}
                  aria-label={
                    reducedMotion
                      ? "Rotation disabled for reduced motion"
                      : paused
                        ? "Start rotation"
                        : "Pause rotation"
                  }
                  aria-pressed={!paused && !reducedMotion}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {paused || reducedMotion ? (
                      <path d="m6 3 10 7-10 7V3Z" />
                    ) : (
                      <path d="M5 3h3v14H5V3Zm7 0h3v14h-3V3Z" />
                    )}
                  </svg>
                </button>
              )}
              <button
                type="button"
                className="qcf__icon-button"
                aria-label="Previous quote"
                disabled={count < 2}
                onClick={() => select(currentIndex - 1)}
              >
                <Arrow previous />
              </button>
              <button
                type="button"
                className="qcf__icon-button"
                aria-label="Next quote"
                disabled={count < 2}
                onClick={() => select(currentIndex + 1)}
              >
                <Arrow />
              </button>
            </div>
          </footer>
          <div className="qcf__progress" aria-hidden="true">
            <div
              key={`${active.id}-${transitionId}-${playing}`}
              className={`qcf__progress-bar${playing ? " qcf__progress-bar--playing" : ""}`}
              style={{
                width: `${((currentIndex + 1) / count) * 100}%`,
                animationDuration: `${delay}ms`,
              }}
            />
          </div>
        </>
      ) : (
        <div className="qcf__empty">
          <div>
            <strong>No testimonials yet</strong>
            <p>Add a quote to tell the story in someone else’s words.</p>
          </div>
        </div>
      )}
    </section>
  );
}
