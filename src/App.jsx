import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import ImmersiveFullscreenNav from "./components/ui/immersive-full-screen-nav";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import BrandingIdentity from "./components/pages/Services/BrandingIdentity/BrandingIdentity";
import logo from "/images/probusstudio-logo.svg";
import Footer from "./components/pages/Home/Footer/Footer";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/branding" element={<BrandingIdentity />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-white">
        <ImmersiveFullscreenNav
          navConfig={{
            brand: logo,
            brandHref: "/",
            overlayBg: "#ffffff",
            headerOpenColor: "#111111",
            clipOrigin: "bottom",
          }}
          navContent={{
            agencyName: "Probus Studio",
            tagline: "Discover The Power Of Creative Transformation.",
            location: "Worldwide",

            links: [
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Studio", href: "#about" },
              {
                label: "Services",
                href: "/services",
                sublinks: [
                  { label: "Branding & Identity", href: "/services/branding" },
                  {
                    label: "Web Design & Development",
                    href: "/services/web-development",
                  },
                  {
                    label: "Search Engine Optimization",
                    href: "/services/seo",
                  },
                  {
                    label: "Social Media Marketing",
                    href: "/services/social-media",
                  },
                  {
                    label: "Performance Marketing",
                    href: "/services/performance-marketing",
                  },
                ],
              },
              { label: "Contact", href: "#contact" },
            ],

            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
            ],

            socials: [
              { type: "instagram", href: "#" },
              { type: "twitter", href: "#" },
              { type: "linkedin", href: "#" },
            ],
          }}
        />
      </div>

      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
