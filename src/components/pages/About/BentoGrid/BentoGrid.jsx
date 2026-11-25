import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Smartphone, Globe } from "lucide-react";
import "./BentoGrid.css";

const ease = [0.16, 1, 0.3, 1];

// Typography Animation
function TypeTester() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-type-tester">
      <motion.span
        className="bento-type-text"
        animate={{ scale }}
        transition={{ duration: 0.8, ease }}
      >
        Aa
      </motion.span>
    </div>
  );
}

// Layout Animation
function LayoutAnimation() {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-layout-wrapper">
      <motion.div
        className={`bento-layout bento-layout-${layout}`}
        layout
        transition={{ duration: 0.5, ease }}
      >
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="bento-layout-item"
            layout
            transition={{ duration: 0.5, ease }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Speed Animation
function SpeedIndicator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bento-speed">
      <div className="bento-speed-display">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="bento-speed-loader"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          ) : (
            <motion.span
              key="text"
              className="bento-speed-number"
              initial={{
                y: 20,
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
            >
              100ms
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <span className="bento-speed-label">Load Time</span>

      <div className="bento-speed-progress">
        <motion.div
          className="bento-speed-progress-fill"
          initial={{ width: 0 }}
          animate={{
            width: loading ? 0 : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          }}
        />
      </div>
    </div>
  );
}

// Security Animation
function SecurityBadge() {
  const [shields, setShields] = useState([false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((active) => !active);

        if (nextIndex === -1) {
          return [false, false, false];
        }

        return prev.map((active, index) =>
          index === nextIndex ? true : active,
        );
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-security">
      {shields.map((active, index) => (
        <motion.div
          key={index}
          className={`bento-security-box ${active ? "active" : ""}`}
          animate={{
            scale: active ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Lock
            size={20}
            className={`bento-security-icon ${active ? "active" : ""}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Global Network Animation
function GlobalNetwork() {
  const pulses = [0, 1, 2, 3, 4];

  return (
    <div className="bento-network">
      <Globe size={64} strokeWidth={1.5} className="bento-network-icon" />

      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="bento-network-pulse"
          initial={{
            scale: 0.5,
            opacity: 1,
          }}
          animate={{
            scale: 3,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Reusable Card
function BentoCard({
  children,
  className = "",
  delay = 0,
  hoverScale = 0.98,
  hoverStyle = {},
}) {
  return (
    <motion.div
      className={`bento-card ${className}`}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease,
      }}
      whileHover={{
        scale: hoverScale,
        ...hoverStyle,
      }}
    >
      {children}
    </motion.div>
  );
}

// Main Component
export default function BentoGrid() {
  return (
    <section className="bento-section">
      <div className="bento-container">
        <motion.p
          className="bento-section-label"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
        >
          Features
        </motion.p>

        <div className="bento-grid">
          {/* Typography */}
          <BentoCard
            className="bento-card-typography"
            hoverScale={1.02}
            hoverStyle={{
              backgroundColor: "#fff",
            }}
          >
            <div className="bento-card-visual">
              <TypeTester />
            </div>

            <div className="bento-card-content">
              <h3>Typography</h3>
              <p>Beautiful, responsive type that scales perfectly.</p>
            </div>
          </BentoCard>

          {/* Layouts */}
          <BentoCard className="bento-card-layouts" delay={0.1}>
            <div className="bento-card-visual">
              <LayoutAnimation />
            </div>

            <div className="bento-card-content">
              <h3>Layouts</h3>
              <p>Flexible grids that adapt.</p>
            </div>
          </BentoCard>

          {/* Global Network */}
          <BentoCard
            className="bento-card-network"
            delay={0.2}
            hoverScale={1.02}
            hoverStyle={{
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            <div className="bento-card-visual">
              <GlobalNetwork />
            </div>

            <div className="bento-card-content bento-network-content">
              <h3>
                <Globe size={20} />
                Global CDN
              </h3>
              <p>
                Lightning-fast content delivery worldwide with edge locations.
              </p>
            </div>
          </BentoCard>

          {/* Speed */}
          <BentoCard className="bento-card-speed" delay={0.3}>
            <div className="bento-card-visual">
              <SpeedIndicator />
            </div>

            <div className="bento-card-content">
              <h3>Speed</h3>
              <p>Blazing fast performance.</p>
            </div>
          </BentoCard>

          {/* Security */}
          <BentoCard className="bento-card-security" delay={0.4}>
            <div className="bento-card-visual">
              <SecurityBadge />
            </div>

            <div className="bento-card-content">
              <h3>
                <Lock size={20} />
                Security First
              </h3>
              <p>Enterprise-grade encryption and data protection built-in.</p>
            </div>
          </BentoCard>

          {/* Mobile Responsive */}
          <BentoCard className="bento-card-mobile" delay={0.5}>
            <div className="bento-card-visual">
              <Smartphone
                size={64}
                strokeWidth={1.5}
                className="bento-mobile-icon"
              />
            </div>

            <div className="bento-card-content">
              <h3>Mobile Ready</h3>
              <p>Optimized for all devices and screen sizes.</p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
