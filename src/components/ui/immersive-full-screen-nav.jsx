"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./immersive-full-screen-nav.css";

const CLIPS = {
  bottom: { start: "inset(100% 0% 0% 0%)", end: "inset(0% 0% 100% 0%)" },
  top: { start: "inset(0% 0% 100% 0%)", end: "inset(100% 0% 0% 0%)" },
  left: { start: "inset(0% 100% 0% 0%)", end: "inset(0% 0% 0% 100%)" },
  right: { start: "inset(0% 0% 0% 100%)", end: "inset(0% 100% 0% 0%)" },
};
const OPEN_CLIP = "inset(0% 0% 0% 0%)";
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const NAV_CONFIG = {
  brand: "Probus Studio",
  brandHref: "/",
  clipOrigin: "bottom",
  overlayBg: "#fbfbf9",
  headerOpenColor: "#161616",
  linkColor: "#181818",
  linkHoverColor: "#878780",
  openDuration: 1.05,
  closeDuration: 0.85,
  ease: "power4.inOut",
};

const NAV_CONTENT = {
  agencyName: "Probus Studio",
  tagline: "Independent creative & digital agency",
  location: "Pune, India · Working worldwide",
  email: "hello@example.com", // Replace with your agency email
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/work" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Branding & Identity", href: "/services/branding" },
        { label: "Web Design & Development", href: "/services/web-design" },
        { label: "SEO & Content Strategy", href: "/services/seo" },
        { label: "Social Media Marketing", href: "/services/social-media" },
        {
          label: "Performance Marketing",
          href: "/services/performance-marketing",
        },
      ],
    },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  images: [
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634942536790-2533db948f65?q=85&w=1200&auto=format&fit=crop",
  ],
  socials: [
    { type: "instagram", label: "Instagram", href: "#" },
    { type: "linkedin", label: "LinkedIn", href: "#" },
    { type: "facebook", label: "Facebook", href: "#" },
    { type: "twitter", label: "X / Twitter", href: "#" },
  ],
};

function ArrowIcon({ diagonal = true }) {
  return diagonal ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M7 5h12v12" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      aria-hidden="true"
    >
      <path d="M4 12h16m-7-7 7 7-7 7" />
    </svg>
  );
}

function SocialIcon({ type }) {
  const path = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7.5 10v7m0-10v.2M11.5 17v-7h3v1.2c.6-1 3.5-1.6 3.5 2V17" />
      </>
    ),
    facebook: (
      <path d="M15.5 3.5H13a4 4 0 0 0-4 4V10H6.5v3H9v7h3v-7h3l.5-3H12V7.5c0-.7.4-1 1.1-1h2.4z" />
    ),
    twitter: <path d="M4 4h3.5L20 20h-3.5L4 4Zm16 0L4 20" />,
  }[type] || <circle cx="12" cy="12" r="8" />;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

function AnimatedLabel({ text, charStagger = 0.014, reducedMotion = false }) {
  if (reducedMotion) return <span>{text}</span>;
  return (
    <span className="ifn-word">
      <span className="ifn-screenreader">{text}</span>
      <span className="ifn-letters" aria-hidden="true">
        {Array.from(text).map((char, i) => (
          <span
            key={`${i}-${char}`}
            className="ifn-letter"
            style={{ "--char-delay": `${i * charStagger}s` }}
          >
            <span>{char === " " ? "\u00a0" : char}</span>
            <span>{char === " " ? "\u00a0" : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

export default function ImmersiveFullscreenNav({
  navConfig = NAV_CONFIG,
  navContent = NAV_CONTENT,
  logo,
  onOpen,
  onClose,
  headerClassName = "",
  ...props
}) {
  const config = { ...NAV_CONFIG, ...navConfig };
  const content = { ...NAV_CONTENT, ...navContent };
  // Preserve the old component's top-level configuration/animation overrides.
  const settings = { ...config };
  [
    "overlayBg",
    "headerOpenColor",
    "linkColor",
    "linkHoverColor",
    "ease",
    "clipOrigin",
    "openDuration",
    "closeDuration",
  ].forEach((key) => {
    if (props[key] !== undefined) settings[key] = props[key];
  });
  const openDuration = settings.openDuration;
  const closeDuration = settings.closeDuration;
  const clip = CLIPS[settings.clipOrigin] || CLIPS.bottom;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const animationRef = useRef(null);
  const entranceRef = useRef(null);
  const animatingRef = useRef(false);
  const previousFocusRef = useRef(null);
  const linkRefs = useRef([]);
  const imageRefs = useRef([]);
  const serviceRef = useRef(null);
  const titleRef = useRef(null);
  const footerRef = useRef(null);

  // Keep caller-supplied navigation (e.g. Home / About / Studio / Contact),
  // but always add Services before Contact if it hasn't been provided.
  const suppliedLinks = content.links || [];
  const defaultServices = NAV_CONTENT.links.find(
    (item) => item.label === "Services",
  );
  const hasServices = suppliedLinks.some(
    (item) => item.label?.toLowerCase() === "services",
  );
  const links = hasServices
    ? suppliedLinks.map((item) =>
        item.label?.toLowerCase() === "services"
          ? {
              ...defaultServices,
              ...item,
              children: item.sublinks?.length
                ? item.sublinks
                : item.children?.length
                  ? item.children
                  : defaultServices.children,
            }
          : item,
      )
    : (() => {
        const next = [...suppliedLinks];
        const contactIndex = next.findIndex((item) =>
          item.label?.toLowerCase().includes("contact"),
        );
        next.splice(
          contactIndex >= 0 ? contactIndex : next.length,
          0,
          defaultServices,
        );
        return next;
      })();
  const images = (content.images || []).slice(0, 2);
  const serviceLink = links.find(
    (item) => item.label?.toLowerCase() === "services",
  );
  const close = () => {
    if (!isOpen || animatingRef.current) return;
    setIsOpen(false);
    setServicesOpen(false);
    setActiveLink(-1);
    entranceRef.current?.kill();
    animationRef.current?.kill();
    animatingRef.current = true;
    const panel = overlayRef.current;
    const finished = () => {
      animatingRef.current = false;
      gsap.set(panel, { autoAlpha: 0, clipPath: clip.end });
      onClose?.();
    };
    if (reducedMotion) {
      animationRef.current = gsap.to(panel, {
        opacity: 0,
        duration: 0.2,
        onComplete: finished,
      });
    } else {
      animationRef.current = gsap
        .timeline({ onComplete: finished })
        .to(
          menuRef.current,
          { opacity: 0.35, scale: 0.985, duration: 0.48, ease: "power2.in" },
          0,
        )
        .to(
          panel,
          { clipPath: clip.end, duration: closeDuration, ease: settings.ease },
          0,
        );
    }
  };

  const open = () => {
    if (isOpen || animatingRef.current) return;
    previousFocusRef.current = document.activeElement;
    setIsOpen(true);
    setServicesOpen(false);
    setActiveLink(-1);
    animationRef.current?.kill();
    const panel = overlayRef.current;
    gsap.set(menuRef.current, { opacity: 1, scale: 1 });
    gsap.set(panel, {
      autoAlpha: 1,
      clipPath: reducedMotion ? OPEN_CLIP : clip.start,
    });
    animatingRef.current = true;
    animationRef.current = gsap.to(panel, {
      ...(reducedMotion ? { opacity: 1 } : { clipPath: OPEN_CLIP }),
      duration: reducedMotion ? 0.2 : openDuration,
      delay: reducedMotion ? 0 : 0.08,
      ease: settings.ease,
      onComplete: () => {
        animatingRef.current = false;
        onOpen?.();
      },
    });
  };

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener?.("change", updateMotion);
    const updateScroll = () => setIsScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    return () => {
      motion.removeEventListener?.("change", updateMotion);
      window.removeEventListener("scroll", updateScroll);
      animationRef.current?.kill();
      entranceRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus remains on the toggle, which is part of the keyboard trap.
    toggleRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const targets = Array.from(
        rootRef.current?.querySelectorAll(FOCUSABLE) || [],
      ).filter((el) => {
        if (el.closest("[aria-hidden='true']")) return false;
        return (
          el.getClientRects().length &&
          getComputedStyle(el).visibility !== "hidden"
        );
      });
      if (!targets.length) return;
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !rootRef.current?.contains(document.activeElement))
      ) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !rootRef.current?.contains(document.activeElement))
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current?.isConnected)
        previousFocusRef.current.focus?.({ preventScroll: true });
    };
    // close is deliberately scoped to the current open session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    entranceRef.current?.kill();
    if (!isOpen) return;
    const targets = [
      titleRef.current,
      ...linkRefs.current.filter(Boolean),
      ...imageRefs.current.filter(Boolean),
      footerRef.current,
    ].filter(Boolean);
    if (reducedMotion) {
      gsap.set(targets, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
      return;
    }
    const delay = Math.max(0.18, openDuration * 0.45);
    const tl = gsap.timeline({ delay });
    tl.fromTo(
      titleRef.current,
      { y: -14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out" },
      0,
    );
    tl.fromTo(
      linkRefs.current.filter(Boolean),
      { y: props.linkOffsetY ?? 28, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: props.linkDuration ?? 0.75,
        stagger: props.linkStagger ?? 0.07,
        ease: "power3.out",
      },
      0.06,
    );
    tl.fromTo(
      imageRefs.current.filter(Boolean),
      { scale: props.imageStartScale ?? 0.92, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: props.imageDuration ?? 0.85,
        stagger: props.imageStagger ?? 0.08,
        ease: "power3.out",
      },
      0.2,
    );
    tl.fromTo(
      footerRef.current,
      { y: props.socialOffsetY ?? 16, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: props.socialDuration ?? 0.55,
        ease: "power2.out",
      },
      0.38,
    );
    entranceRef.current = tl;
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reducedMotion]);

  const effectiveLogo = logo || settings.logo;
  const brandIsImage =
    effectiveLogo ||
    /\.(svg|png|jpe?g|webp)(\?.*)?$/i.test(settings.brand || "") ||
    settings.brand?.startsWith("/images/");
  const brandSrc = effectiveLogo || (brandIsImage ? settings.brand : null);
  const cssVars = {
    "--ifn-surface": settings.overlayBg,
    "--ifn-ink": settings.linkColor,
    "--ifn-hover": settings.linkHoverColor,
  };

  return (
    <div
      className={`ifn-root ${isOpen ? "ifn-is-open" : ""}`}
      ref={rootRef}
      style={cssVars}
    >
      <header
        className={`ifn-header ${isScrolled && !isOpen ? "ifn-header--scrolled" : ""} ${headerClassName}`}
      >
        <a
          className="ifn-brand"
          href={settings.brandHref}
          aria-label={
            typeof settings.brand === "string" ? settings.brand : "Home"
          }
        >
          {brandSrc ? (
            <img
              className="ifn-brand-image"
              src={brandSrc}
              alt={settings.brand || "Brand"}
            />
          ) : (
            <span>{settings.brand}</span>
          )}
          
        </a>
        <div className="ifn-header-actions">
          
          <button
            className="ifn-toggle"
            ref={toggleRef}
            type="button"
            onClick={isOpen ? close : open}
            aria-controls="ifn-fullscreen-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="ifn-toggle-label">
              {isOpen ? "Close" : "Menu"}
            </span>
            <span
              className={`ifn-toggle-lines ${isOpen ? "is-active" : ""}`}
              aria-hidden="true"
            >
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <nav
        ref={overlayRef}
        id="ifn-fullscreen-menu"
        className="ifn-overlay"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        style={{ clipPath: clip.start, visibility: "hidden" }}
      >
        <div className="ifn-panel" ref={menuRef}>
          <div className="ifn-panel-top" ref={titleRef}>
            <span className="ifn-eyebrow">
              <span className="ifn-spark" /> {content.agencyName}
            </span>
            <p>{content.tagline}</p>
            <span className="ifn-panel-index">
              / DIGITAL FIRST · CREATIVE ALWAYS
            </span>
          </div>

          <div className="ifn-main">
            <div className="ifn-nav-column">
              <p className="ifn-section-label">01 / Explore</p>
              <div className="ifn-nav-list">
                {links.map((link, index) => {
                  const hasChildren = Boolean(link.children?.length);
                  return (
                    <div
                      className="ifn-link-row"
                      key={`${link.label}-${index}`}
                      ref={(node) => {
                        linkRefs.current[index] = node;
                      }}
                      onMouseEnter={() => setActiveLink(index)}
                      onMouseLeave={() => setActiveLink(-1)}
                    >
                      <span className="ifn-link-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {hasChildren ? (
                        <button
                          type="button"
                          className={`ifn-primary-link ifn-primary-link--button ${activeLink === index ? "is-hovered" : ""}`}
                          onClick={() => setServicesOpen((value) => !value)}
                          aria-expanded={servicesOpen}
                          aria-controls="ifn-services-list"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <AnimatedLabel
                            text={link.label}
                            charStagger={props.linkCharStagger ?? 0.014}
                            reducedMotion={reducedMotion}
                          />
                        </button>
                      ) : (
                        <a
                          className={`ifn-primary-link ${activeLink === index ? "is-hovered" : ""}`}
                          href={link.href}
                          tabIndex={isOpen ? 0 : -1}
                          onClick={close}
                        >
                          <AnimatedLabel
                            text={link.label}
                            charStagger={props.linkCharStagger ?? 0.014}
                            reducedMotion={reducedMotion}
                          />
                        </a>
                      )}
                      {hasChildren ? (
                        <button
                          type="button"
                          className={`ifn-submenu-toggle ${servicesOpen ? "is-active" : ""}`}
                          onClick={() => setServicesOpen((value) => !value)}
                          aria-expanded={servicesOpen}
                          aria-controls="ifn-services-list"
                          aria-label={`${servicesOpen ? "Collapse" : "Expand"} ${link.label} submenu`}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <span>{servicesOpen ? "−" : "+"}</span>
                        </button>
                      ) : (
                        <span className="ifn-row-arrow">
                          <ArrowIcon diagonal />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="ifn-nav-bottom">
                <span>Big ideas. Better results.</span>
                <span className="ifn-tiny-line" />
              </div>
            </div>

            <aside className="ifn-side-column">
              <div className="ifn-feature-head">
                <span className="ifn-section-label">
                  02 / {servicesOpen ? "What we do" : "Featured perspective"}
                </span>
                <span className="ifn-feature-counter">
                  {servicesOpen ? "05 SERVICES" : "EST. FOR THE NEXT"}
                </span>
              </div>
              <div
                className={`ifn-feature-stage ${servicesOpen ? "ifn-feature-stage--services" : ""}`}
              >
                <div className="ifn-images" aria-hidden={servicesOpen}>
                  {images.map((src, index) => (
                    <div
                      className={`ifn-image ifn-image--${index + 1}`}
                      key={src}
                      ref={(node) => {
                        imageRefs.current[index] = node;
                      }}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </div>
                  ))}
                  <div className="ifn-image-sticker">
                    <span>Think.</span>
                    <span>Create.</span>
                    <span>Grow.</span>
                    <ArrowIcon diagonal />
                  </div>
                </div>
                <div
                  className="ifn-services-panel"
                  id="ifn-services-list"
                  ref={serviceRef}
                  aria-hidden={!servicesOpen}
                >
                  <p className="ifn-services-intro">
                    Everything your brand needs to <em>stand out.</em>
                  </p>
                  <div className="ifn-services-list">
                    {(serviceLink?.children || []).map((item, index) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        tabIndex={isOpen && servicesOpen ? 0 : -1}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item.label}</strong>
                        <ArrowIcon diagonal />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ifn-feature-bottom">
                <span>Building brands that move culture.</span>
                <ArrowIcon diagonal />
              </div>
            </aside>
          </div>

          <footer className="ifn-footer" ref={footerRef}>
            <div className="ifn-footer-left">
              <span className="ifn-footer-caption">Say hello</span>
              <a className="ifn-footer-email" href={`mailto:${content.email}`}>
                {content.email} <ArrowIcon diagonal />
              </a>
            </div>
            <div className="ifn-socials" aria-label="Social links">
              {(content.socials || []).map((social) => (
                <a
                  href={social.href}
                  key={`${social.type}-${social.href}`}
                  aria-label={social.label || social.type}
                  tabIndex={isOpen ? 0 : -1}
                  target={
                    social.href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    social.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
            <div className="ifn-location">
              <span className="ifn-location-dot" />
              {content.location}
            </div>
          </footer>
        </div>
      </nav>
    </div>
  );
}
