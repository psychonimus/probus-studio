"use client";

import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";
import logo from "/images/probusstudio-logo.svg";

export default function ImmersiveFullscreenNavDemo() {
  return (
    <div className="w-full min-w-0">
      <ImmersiveFullscreenNav
        navConfig={{
          brand: logo,
          brandHref: "#",
          overlayBg: "#101014",
          clipOrigin: "left",
        }}
        navContent={{
          agencyName: "Probus Studio",
          tagline: "Brand and product design for visionary teams.",
          location: "Worldwide",
          links: [
            { label: "Work", href: "#works" },
            { label: "Studio", href: "#about" },
            { label: "Journal", href: "#insights" },
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

      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center text-black">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">Navigation</p>
        <h1 className="max-w-2xl text-[7vw] leading-tight max-md:text-[9vw]">Immersive Full Screen Nav</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-black/60">
          Click the menu button — the panel wipes open via clip-path, then the brand block, links, images, and
          socials reveal in sequence.
        </p>
      </main>
    </div>
  );
}

