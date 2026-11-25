import { ArrowUpRight } from "lucide-react";
import CorollaGleam from "../../../originkit/ui/corolla-gleam";

export default function Hero() {
  return (
    <div className="relative h-[100dvh] bg-white text-neutral-900 overflow-hidden flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Soft Ambient Light Gradient in Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-100/40 via-purple-100/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-t from-orange-100/30 via-indigo-100/20 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Hero Header & Copy */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 sm:pt-20 lg:pt-24 text-center flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-google font-bold tracking-tight leading-[1.08] text-neutral-950 ">
          Discover The Power Of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
            Creative Transformation
          </span>{" "}
        </h1>

        {/* Supporting Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-neutral-600  font-normal leading-relaxed">
          We help you create everlasting brands and manage online brand
          reputation that attracts business, Inspire talent and showcase your
          potential in the most innovative way!
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
          <a
            href="#contact"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-neutral-950/10 hover:shadow-xl hover:shadow-neutral-950/20 hover:scale-[1.02]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#works"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all duration-300"
          >
            <span>Explore Selected Works</span>
          </a>
        </div>
      </div>

      {/* Half-Visible CorollaGleam at the Bottom (Completely Borderless & Unclipped) */}
      <div className="relative w-full flex justify-center items-end pointer-events-auto mt-6">
        <div className="w-[1050px] sm:w-[1250px] lg:w-[1450px] flex justify-center shrink-0 overflow-hidden">
          <CorollaGleam
            background="transparent"
            count={27}
            innerRadius={20}
            scale={100}
            warm="#d9703e"
            cool="#5b61cf"
            hover={150}
            breathe={50}
            speed={45}
            spin={8}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1200 / 800",
              cursor: "grab",
            }}
          />
        </div>
      </div>
    </div>
  );
}
