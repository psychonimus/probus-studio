import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Clock,
  Globe,
} from "lucide-react";
import LiquidWordmark from "./LiquidWordmark";
import "./Footer.css";
import FilamentText from "../../../FilamentText/FilamentText";

const INQUIRY_TYPES = [
  "3D & Spatial Web",
  "Brand Identity",
  "Digital Architecture",
  "Creative Engineering",
  "Motion & CGI",
  "Full Platform",
];

const DIRECTORY_LINKS = {
  navigation: [
    { label: "Home", href: "#" },
    { label: "Capabilities", href: "#services" },
    { label: "About Founder", href: "#about-founder" },
    { label: "Selected Works", href: "#works" },
    { label: "How We Work", href: "#how-we-work" },
  ],
  practices: [
    { label: "Interactive 3D & WebGL", href: "#services" },
    { label: "Spatial Brand Architecture", href: "#services" },
    { label: "Creative Engineering", href: "#services" },
    { label: "Motion Direction & CGI", href: "#services" },
    { label: "Digital Flagships", href: "#services" },
  ],
  socials: [
    { label: "Awwwards", href: "https://www.awwwards.com", external: true },
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "X / Twitter", href: "https://twitter.com", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
  ],
};

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [selectedTags, setSelectedTags] = useState(["3D & Spatial Web"]);
  const [studioTime, setStudioTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHoveringCta, setIsHoveringCta] = useState(false);
  const ctaCardRef = useRef(null);

  // Live Studio Clock (Dubai/Riyadh UTC+4)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setStudioTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track cursor position inside CTA card for radiant spotlight
  const handleMouseMove = (e) => {
    if (!ctaCardRef.current) return;
    const rect = ctaCardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@probus.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inquiryHref = `mailto:hello@probus.studio?subject=${encodeURIComponent(
    `Project Inquiry: ${selectedTags.join(", ") || "General Inquiry"}`
  )}`;

  return (
    <footer className="probus-footer-root pt-20" id="contact">
      {/* Background ambient lighting and subtle light grid */}
      <div className="probus-footer-grid-bg" aria-hidden="true" />

      <div className="relative z-10  mx-auto px-4 sm:px-6">
        {/* ─────────────────────────────────────────────────────────────
            GRAND INTERACTIVE CTA CARD (WHITE THEME)
            ───────────────────────────────────────────────────────────── */}
        <div
          ref={ctaCardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringCta(true)}
          onMouseLeave={() => setIsHoveringCta(false)}
          className="probus-cta-card p-8 sm:p-12 lg:p-16 mb-20 lg:mb-28"
        >
          {/* Reactive Cursor Follower Spotlight */}
          <div
            className="probus-cursor-glow"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              opacity: isHoveringCta ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Top Live Studio Status & Availability Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 text-xs font-mono tracking-wider text-neutral-500">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>Pune</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>
                STUDIO TIME (UTC+4):{" "}
                <strong className="text-neutral-900">{studioTime || "12:00:00"}</strong>
              </span>
            </div>
          </div>

          {/* Massive Kinetic Headline */}
          <div className="relative z-10 my-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <span>Let's Collaborate</span>
            </div>

            <h2 className="probus-cta-heading">
              <span className="probus-gradient-text block"><FilamentText text="HAVE AN AMBITIOUS" /></span>
              <span ><FilamentText text="VISION IN MIND?" className="main-heading-accent" /></span>
            </h2>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-600 font-normal leading-relaxed">
              We engineer category-defining digital artifacts, immersive 3D
              platforms, and transformative brand architecture for high-growth
              teams worldwide.
            </p>
          </div>

          {/* Interactive Project Tag Chips */}
          <div className="relative z-10 mb-10 text-center">
            <span className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3.5 font-medium">
              What are you looking to create?
            </span>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {INQUIRY_TYPES.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`probus-inquiry-tag ${isActive ? "is-active" : ""}`}
                  >
                    <span>{tag}</span>
                    {isActive && <Check className="w-3.5 h-3.5 ml-1.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row: Magnetic Button + Copy Email Pill */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
            <a href={inquiryHref} className="probus-magnetic-btn group">
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="probus-email-pill group"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">
                    hello@probus.studio copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-500 transition-transform group-hover:scale-110" />
                  <span>hello@probus.studio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            ARCHITECTURAL DIRECTORY & NAVIGATION
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-neutral-200">
          {/* Brand Manifesto & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl sm:text-2xl font-bold font-google tracking-tight text-neutral-950 uppercase">
                  Probus Studio
                </span>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/80 tracking-wider">
                  Est. 2026
                </span>
              </div>
              <p className="text-sm sm:text-base text-neutral-600 max-w-sm leading-relaxed mb-6 font-normal">
                An elite creative engineering practice sculpting transcendent
                digital experiences, spatial web platforms, and iconic brand
                systems.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-500 font-mono tracking-wider pt-4">
              <p className="text-neutral-900 font-semibold">GLOBAL COORDINATES</p>
              <p>25°12'19.7"N 55°16'36.4"E • DUBAI</p>
              <p>24°42'48.9"N 46°40'31.2"E • RIYADH</p>
              <p>51°30'26.1"N 0°07'39.9"W • LONDON</p>
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase font-mono">
              Index
            </h4>
            <ul className="space-y-2.5">
              {DIRECTORY_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="probus-footer-link">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 probus-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase font-mono">
              Practices
            </h4>
            <ul className="space-y-2.5">
              {DIRECTORY_LINKS.practices.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="probus-footer-link">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 probus-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Recognition */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase font-mono">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {DIRECTORY_LINKS.socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="probus-footer-link"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 probus-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GIANT STATEMENT WORDMARK WITH LIQUID HOVER EFFECT
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full overflow-hidden flex justify-center py-6 sm:py-10">
          <LiquidWordmark
            imageSrc="/images/probus-studio.png"
            alt="Probus Studio"
            className="w-full"
          />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUB-FOOTER UTILITY BAR
            ───────────────────────────────────────────────────────────── */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 text-xs text-neutral-500 font-normal">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-neutral-700">© {new Date().getFullYear()} Probus Studio Inc.</span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="text-neutral-500">All rights reserved worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-neutral-500">
              Crafted with relentless craft & creative engineering.
            </span>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="probus-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
