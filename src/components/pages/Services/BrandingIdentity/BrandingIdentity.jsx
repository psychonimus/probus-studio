import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  Palette,
  Sparkles,
  Type,
  Compass,
  ChevronDown,
} from "lucide-react";
import "./BrandingIdentity.css";
import AboutHero from "../../About/AboutHero/AboutHero";

gsap.registerPlugin(ScrollTrigger);

const ARCHETYPES = [
  {
    id: "luxury",
    label: "Minimalist Luxury",
    tag: "ARCHETYPE 01",
    brandName: "AURELIA MAISON",
    tagline: "Timeless quietude crafted in architectural form.",
    fontPair: "Instrument Serif + Geist",
    gridRatio: "1 : 1.618",
    swatches: ["#090A0F", "#F4F1EA", "#D9703E", "#8C7A6B"],
    previewBg: "linear-gradient(135deg, #faf9f6 0%, #f0ede6 100%)",
    accent: "#d9703e",
  },
  {
    id: "editorial",
    label: "Bold Editorial",
    tag: "ARCHETYPE 02",
    brandName: "MONOLITH PRESS",
    tagline: "High-contrast storytelling with kinetic authority.",
    fontPair: "Google Sans + Instrument Serif",
    gridRatio: "12-Col Swiss",
    swatches: ["#111111", "#FFFFFF", "#DB2777", "#E4E4E7"],
    previewBg: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
    accent: "#db2777",
  },
  {
    id: "avantgarde",
    label: "Tech Avant-Garde",
    tag: "ARCHETYPE 03",
    brandName: "KINETIX LABS",
    tagline: "Precision systems built for next-wave pioneers.",
    fontPair: "Geist Mono + DM Sans",
    gridRatio: "8px Modular",
    swatches: ["#090A0F", "#EEF2FF", "#5B61CF", "#18181B"],
    previewBg: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
    accent: "#5b61cf",
  },
];

const DNA_PILLARS = [
  {
    id: "strategy",
    num: "01",
    title: "Brand Strategy & Positioning",
    summary:
      "We uncover the white space in your category and articulate a sharp verbal and strategic foundation that commands authority.",
    deliverables: [
      "Category & Competitor Audit",
      "Brand Archetype & Positioning",
      "Verbal Identity & Tone of Voice",
      "Messaging Architecture",
    ],
    icon: Compass,
    previewType: "strategy",
  },
  {
    id: "visual",
    num: "02",
    title: "Visual Identity & Logomark",
    summary:
      "Distinctive wordmarks, geometric symbols, and responsive mark systems engineered to stay iconic from favicon to billboard.",
    deliverables: [
      "Primary & Secondary Logomarks",
      "Monogram & Favicon System",
      "Grid Construction & Clearspace",
      "Art Direction & Photography Style",
    ],
    icon: Sparkles,
    previewType: "visual",
  },
  {
    id: "tokens",
    num: "03",
    title: "Typography & Color Architecture",
    summary:
      "Bespoke typographic hierarchies and accessible color tokens that give your brand an unmistakable signature across every touchpoint.",
    deliverables: [
      "Display & Body Type Pairing",
      "Modular Type Scale",
      "Primary & Accent Color Tokens",
      "WCAG Contrast Calibration",
    ],
    icon: Palette,
    previewType: "tokens",
  },
  {
    id: "guidelines",
    num: "04",
    title: "Brand Guidelines & Motion DNA",
    summary:
      "Living digital brand books and motion rulesets so your internal team and partners ship cohesive experiences effortlessly.",
    deliverables: [
      "Interactive Digital Brand Book",
      "Motion & Micro-interaction Rules",
      "Social & Packaging Templates",
      "Figma Component Library",
    ],
    icon: Layers,
    previewType: "guidelines",
  },
];

const CASE_STUDIES = [
  {
    id: "aurelia",
    client: "Aurelia Maison",
    sector: "Architectural Hospitality",
    year: "2025",
    impact: "+184% Direct Bookings",
    scope: "Identity System, Art Direction, Packaging",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    description:
      "Reimagined a heritage European hospitality group with a serene serif wordmark, tactile print collateral, and an editorial digital presence.",
  },
  {
    id: "veloce",
    client: "Veloce Mobility",
    sector: "Electric Urban Transit",
    year: "2025",
    impact: "$42M Series B Raised",
    scope: "Brand Strategy, Logomark, Motion DNA",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    description:
      "Crafted a kinetic, forward-leaning identity system that positioned an emerging EV startup as a category-defining mobility brand.",
  },
  {
    id: "kinetix",
    client: "Kinetix AI",
    sector: "Spatial Computing",
    year: "2024",
    impact: "3.2x Enterprise Pipeline",
    scope: "Visual Identity, Design Tokens, Brand Book",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000&auto=format&fit=crop",
    description:
      "Built a modular geometric brand language and interactive design token library bridging hardware precision with human warmth.",
  },
  {
    id: "solvay",
    client: "Solvay Botanicals",
    sector: "Clean Skincare",
    year: "2024",
    impact: "240+ Global Stockists",
    scope: "Naming, Packaging, Verbal Identity",
    image:
      "https://images.unsplash.com/photo-1634942536790-2533db948f65?q=80&w=1000&auto=format&fit=crop",
    description:
      "Transformed clinical botanical formulations into a coveted shelf-ready luxury brand with minimalist apothecary typography.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Audit",
    duration: "Week 1–2",
    desc: "Stakeholder interviews, cultural & category mapping, and brand equity audit to isolate your sharpest strategic angle.",
  },
  {
    step: "02",
    title: "Strategic Territory",
    duration: "Week 3",
    desc: "Defining brand positioning, personality pillars, verbal voice, and moodboards that align leadership before pixels move.",
  },
  {
    step: "03",
    title: "Identity Craft",
    duration: "Week 4–6",
    desc: "Iterative exploration of logomarks, bespoke typography, color architecture, and real-world mockups across digital & print.",
  },
  {
    step: "04",
    title: "System Rollout",
    duration: "Week 7–8",
    desc: "Delivery of master vector assets, Figma design tokens, motion guidelines, and a living brand manual for seamless scaling.",
  },
];

const FAQS = [
  {
    q: "How long does a complete Branding & Identity engagement take?",
    a: "A comprehensive brand strategy and visual identity system typically takes 6 to 8 weeks from kickoff to final asset handoff, depending on the number of touchpoints and packaging requirements.",
  },
  {
    q: "Do you work with early-stage startups as well as established enterprises?",
    a: "Yes. We partner with ambitious founders preparing for seed/Series A launches as well as mature organizations undergoing strategic repositioning or M&A brand unification.",
  },
  {
    q: "What deliverables do we receive at the end of the project?",
    a: "You receive full ownership of all master vector logos, custom typography licenses guidance, a comprehensive digital brand guideline, Figma token libraries, social templates, and motion rules.",
  },
  {
    q: "Can you pair Branding & Identity with Web Design & Development?",
    a: "Absolutely—most of our clients seamlessly transition their new identity directly into our Web Design & Development sprint so the brand launches online with zero translation loss.",
  },
];

export default function BrandingIdentity() {
  const pageRef = useRef(null);
  const specimenRef = useRef(null);
  const cursorPreviewRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  const [activeArchetype, setActiveArchetype] = useState(ARCHETYPES[0]);
  const [activePillar, setActivePillar] = useState(DNA_PILLARS[0]);
  const [copiedHex, setCopiedHex] = useState(null);
  const [hoveredCase, setHoveredCase] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [typeSampleText, setTypeSampleText] = useState("Creative Transformation");

  // GSAP entrance & scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bi-hero-stagger", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.utils.toArray(".bi-reveal").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.from(".bi-process-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bi-process-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // GSAP smooth cursor follower for case studies
  useEffect(() => {
    const previewEl = cursorPreviewRef.current;
    if (!previewEl) return;

    quickX.current = gsap.quickTo(previewEl, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(previewEl, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      quickX.current?.(e.clientX + 24);
      quickY.current?.(e.clientY - 105);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // 3D tilt on Hero Specimen Card
  const handleSpecimenMove = (e) => {
    const card = specimenRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    gsap.to(card, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const handleSpecimenLeave = () => {
    const card = specimenRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleCopyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div ref={pageRef} className="bi-root">
      {/* ─── 1. INTERACTIVE ARCHITECTURAL HERO ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28 lg:pb-32 border-b border-neutral-200/80">
        <AboutHero
        heading="We Architect Iconic"
        headingAccent="Brand Systems"
        para={["Beyond logos and color palettes-we engineer cohesive visual languages, verbal identities, and living design systems",
          "that turn ambitious companies into unforgettable cultural benchmarks."
        ]}
        image="/assets/images/brandingimg.jpg"
        video="/assets/images/brandingbg.mov"
        />
      </section>

      {/* ─── 2. KINETIC MARQUEE STRIP ───────────────────────────────── */}
      <div className="bi-marquee-wrap py-4 select-none">
        <div className="bi-marquee-track items-center gap-10 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-neutral-500">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10 pr-10">
              <span>Identity Systems</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Verbal Architecture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
              <span>Bespoke Typography</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Motion Guidelines</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Design Tokens</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
              <span>Packaging & Print</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. INTERACTIVE BRAND DNA LAB ───────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bi-reveal max-w-3xl mb-14 sm:mb-20">
            <span className="text-xs font-mono tracking-[0.22em] uppercase text-neutral-400">
              (02) — Anatomy of a Brand
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-google leading-[1.08]">
              Every touchpoint,{" "}
              <span className="bi-serif-italic bi-accent-gradient font-normal">
                calibrated
              </span>{" "}
              for recognition.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Interactive Pillar Selector */}
            <div className="lg:col-span-6 space-y-3">
              {DNA_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                const active = activePillar.id === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillar(pillar)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      active
                        ? "bg-neutral-950 text-white border-neutral-950 shadow-lg"
                        : "bg-neutral-50/70 text-neutral-900 border-neutral-200/80 hover:bg-neutral-100/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`text-xs font-mono ${
                            active ? "text-amber-400" : "text-neutral-400"
                          }`}
                        >
                          {pillar.num}
                        </span>
                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                          {pillar.title}
                        </h3>
                      </div>
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          active ? "text-amber-400" : "text-neutral-400"
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        active ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {pillar.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Live Inspector */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/60 p-7 sm:p-10 shadow-xs">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        Deliverable Blueprint // {activePillar.num}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-medium text-neutral-700">
                        Included in Sprint
                      </span>
                    </div>

                    {/* Interactive Sandbox per Pillar */}
                    {activePillar.previewType === "tokens" ? (
                      <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 mb-7">
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                          <Type className="w-4 h-4" />
                          <span>Live Type Tester — Edit below</span>
                        </div>
                        <input
                          type="text"
                          value={typeSampleText}
                          onChange={(e) => setTypeSampleText(e.target.value)}
                          className="w-full text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-google border-b border-neutral-200 pb-2 focus:outline-none focus:border-neutral-950 bg-transparent"
                          aria-label="Live typography sample"
                        />
                        <p className="mt-3 text-xl bi-serif-italic text-neutral-600">
                          {typeSampleText || "Creative Transformation"}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 mb-7">
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="h-16 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-mono text-xs">
                            Primary
                          </div>
                          <div className="h-16 rounded-xl bg-gradient-to-br from-[#d9703e] via-[#db2777] to-[#5b61cf] flex items-center justify-center text-white font-mono text-xs">
                            Accent
                          </div>
                          <div className="h-16 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 font-mono text-xs">
                            Surface
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500">
                          Structured for instant deployment across web, social,
                          packaging, and investor decks.
                        </p>
                      </div>
                    )}

                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-4">
                      Key Artifacts Delivered
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePillar.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-neutral-200/80 text-sm font-medium text-neutral-800"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SELECTED IDENTITY CASE STUDIES (CURSOR PREVIEW) ────── */}
      <section
        id="bi-cases"
        className="py-20 sm:py-28 bg-neutral-50/70 border-y border-neutral-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bi-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-mono tracking-[0.22em] uppercase text-neutral-400">
                (03) — Selected Identity Work
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-google">
                Brands built to{" "}
                <span className="bi-serif-italic bi-accent-gradient font-normal">
                  outlast
                </span>{" "}
                trends.
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs">
              Hover any row to preview the visual system. Click to inspect
              project outcomes.
            </p>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200 bg-white rounded-2xl overflow-hidden shadow-2xs">
            {CASE_STUDIES.map((cs, idx) => (
              <div
                key={cs.id}
                onMouseEnter={() => setHoveredCase(cs)}
                onMouseLeave={() => setHoveredCase(null)}
                onClick={() =>
                  setSelectedCase(selectedCase?.id === cs.id ? null : cs)
                }
                className="bi-case-row px-6 sm:px-8 py-6 sm:py-8 cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 flex items-center gap-4">
                    <span className="text-xs font-mono text-neutral-400">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                        {cs.client}
                      </h3>
                      <span className="text-xs text-neutral-500">
                        {cs.sector}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-4 text-sm text-neutral-600">
                    {cs.scope}
                  </div>

                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-xs font-semibold">
                      {cs.impact}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                <AnimatePresence>
                  {selectedCase?.id === cs.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-4">
                          <img
                            src={cs.image}
                            alt={cs.client}
                            className="w-full h-44 object-cover rounded-xl"
                          />
                        </div>
                        <div className="md:col-span-8">
                          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                            Year {cs.year} — Case Brief
                          </span>
                          <p className="mt-2 text-base text-neutral-700 leading-relaxed">
                            {cs.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Floating GSAP Cursor Image Preview (Desktop) */}
        <div
          ref={cursorPreviewRef}
          className="bi-cursor-preview hidden lg:block transition-opacity duration-300"
          style={{
            opacity: hoveredCase ? 1 : 0,
            transform: hoveredCase ? "scale(1)" : "scale(0.92)",
          }}
          aria-hidden="true"
        >
          {hoveredCase && (
            <img
              src={hoveredCase.image}
              alt={hoveredCase.client}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </section>

      {/* ─── 5. 4-PHASE PROCESS TIMELINE ────────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bi-reveal max-w-2xl mb-16">
            <span className="text-xs font-mono tracking-[0.22em] uppercase text-neutral-400">
              (04) — The 8-Week Sprint
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-google">
              From blank canvas to{" "}
              <span className="bi-serif-italic bi-accent-gradient font-normal">
                category leader.
              </span>
            </h2>
          </div>

          <div className="bi-process-grid relative">
            <div className="bi-process-line hidden lg:block h-px bg-neutral-200 w-full mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="bi-reveal group p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-950 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. INTERACTIVE FAQ ACCORDION ───────────────────────────── */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#faf9f6] border-t border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Pill Badge + Editorial Serif Heading */}
            <div className="lg:col-span-5 bi-reveal">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-2xs mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-800">
                  FAQ
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.02em] leading-[1.04] text-neutral-950"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Questions?
                <br />
                We are here to help
              </h2>
            </div>

            {/* Right Column: Numbered Minimalist Accordion */}
            <div className="lg:col-span-7 divide-y divide-neutral-200/80 border-b border-neutral-200/80">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="py-5 sm:py-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className="text-xl sm:text-2xl text-neutral-300 group-hover:text-neutral-500 transition-colors w-6 shrink-0 select-none"
                          style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                          }}
                        >
                          {index + 1}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-neutral-950 transition-colors">
                          {faq.q}
                        </span>
                      </div>

                      <span
                        className={`w-9 h-9 rounded-full bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-center shrink-0 text-neutral-500 group-hover:border-neutral-300 group-hover:text-neutral-900 transition-all duration-300 ${
                          isOpen ? "rotate-180 bg-neutral-950 text-white border-neutral-950" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pl-10 sm:pl-12 pr-12 pt-3 pb-1 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
