import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import "./HowWeWork.css";
import FilamentText from "../../../FilamentText/FilamentText";

const STEPS = [
  {
    eyebrow: "Discovery",
    title: "We figure out exactly\nwhat you need.",
    body: "Brief form for AI-accelerated builds. Full strategy session for bespoke. Either way, we don’t start designing until we’ve understood your business, your audience, and what success looks like.",
  },
  {
    eyebrow: "Exploration",
    title: "We move fast.\nWith more options.",
    body: "Mood boards, copy directions, and layout concepts. Modern tooling lets us explore broadly in days, not weeks, so the strongest direction rises quickly.",
  },
  {
    eyebrow: "Design",
    title: "We turn the best\nidea into a system.",
    body: "Every screen is shaped into a flexible visual language that feels distinctive, clear, and ready to grow with your business.",
  },
  {
    eyebrow: "Build",
    title: "We make it feel\nas good as it looks.",
    body: "Responsive development, subtle movement, and thoughtful details turn the approved design into a fast, polished live experience.",
  },
  {
    eyebrow: "Launch",
    title: "We put your new\nsite into the world.",
    body: "We test the important details, prepare the handover, and launch with everything in place for a confident first impression.",
  },
];

function StepNumber({ activeStep }) {
  return (
    <div
      className="work-step-number"
      aria-label={`Step ${activeStep + 1} of ${STEPS.length}`}
    >
      <motion.div
        className="work-step-number__reel"
        animate={{ y: `-${activeStep}em` }}
        transition={{ type: "spring", stiffness: 170, damping: 21, mass: 0.7 }}
      >
        {STEPS.map((_, index) => (
          <span key={index}>{String(index + 1).padStart(2, "0")}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HowWeWorkSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });
  const cardsY = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextStep = Math.min(
      STEPS.length - 1,
      Math.floor(value * STEPS.length),
    );
    setActiveStep((current) => (current === nextStep ? current : nextStep));
  });

  return (
    <section className="how-we-work" ref={sectionRef}>
      <div className="how-we-work__pinned">
        <div className="how-we-work__intro">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-4 shadow-xs w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span>Process & Execution</span>
          </div>
          {/* <h2>
            From brief<br />to live site,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
              in five clear steps.
            </span>
          </h2> */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight main-heading text-neutral-950 leading-[1.12]">
            From brief to live site{" "} 
            <span className="text-transparent main-heading-accent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
              in five clear steps.
            </span>
          </h2>

          <div className="work-progress" aria-hidden="true">
            <StepNumber activeStep={activeStep} />
            <div className="work-progress__line">
              <motion.i
                animate={{ scaleX: (activeStep + 1) / STEPS.length }}
                transition={{ type: "spring", stiffness: 155, damping: 23 }}
              />
            </div>
          </div>
        </div>

        <div className="how-we-work__cards" aria-live="polite">
          <motion.div className="work-cards-track" style={{ y: cardsY }}>
            {STEPS.map((step, index) => (
              <article
                className={`work-card ${index === activeStep ? "is-active" : ""}`}
                key={step.eyebrow}
                aria-hidden={index !== activeStep}
              >
                <p className="work-card__eyebrow">{step.eyebrow}</p>
                <h3>
                  {step.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p className="work-card__body">{step.body}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
