import FilamentText from "../../../FilamentText/FilamentText";


export default function AboutFounder({
  indexNumber = "(01)",
  sectionTag = "ABOUT US",

  description = "We are a creative studio that loves making amazing websites and cool products. We’ve won some awards for our work. We’re really good at creating brands, designing cool stuff, and making things work just right. At our core, we believe in the power of simplicity and effectiveness.",
  ctaText = "MORE ABOUT US",
  ctaLink = "#about",
  imageSrc = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
  imageAlt = "About Probus Studio Founder",
}) {
  return (
    <section
      className="pt-20 py-10 sm:py-10 lg:py-10 bg-white text-neutral-900 overflow-hidden"
      id="about-founder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vertical Index/Tag Strip + Main Copy */}
          <div className="lg:col-span-7 flex flex-row items-stretch">
            {/* Left Vertical Indicator Strip */}
            <div className="flex flex-col justify-between items-center py-2 pr-4 sm:pr-8 border-r border-neutral-200 select-none shrink-0 mr-5 sm:mr-10 lg:mr-14">
              <div className="flex flex-col items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-neutral-500 [writing-mode:vertical-rl] rotate-180">
                  {indexNumber}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-neutral-900 uppercase [writing-mode:vertical-rl] rotate-180 whitespace-nowrap mt-auto pt-10">
                {sectionTag}
              </span>
            </div>

            {/* Content Body */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                {/* <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight uppercase leading-[0.94] text-neutral-950 font-['google-sans',sans-serif] [text-transform:uppercase]">
                  {titleTop}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
                    {titleBottom}
                  </span>
                </h2> */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight main-heading text-neutral-950 leading-[1.12]">
                  <FilamentText text="Design That" />{" "}
                  <span className="text-transparent main-heading-accent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
                    <FilamentText text="Inspires" className="main-heading-accent" />
                  </span>
                  
                </h2>

                <p className="mt-8 sm:mt-12 lg:mt-16 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-lg">
                  {/* {description} */}
                  <FilamentText text="We are a creative studio that loves making amazing" />
                  <FilamentText text="websites and cool products. We’ve won some awards for" />
                  <FilamentText text="our work. We’re really good at creating brands, designing" />
                  <FilamentText text="cool stuff, and making things work just right. At our core" />
                  <FilamentText text="we believe in the power of simplicity and effectiveness." />
                
                </p>
              </div>

              <div className="mt-8 sm:mt-12">
                <a
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-neutral-900 bg-neutral-950 text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-300 shadow-sm"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Founder / Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-neutral-100 shadow-sm">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
