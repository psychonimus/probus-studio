import SculptureHero from "../../liquid-sculpture-hero/liquid-sculpture-hero";
import About from "./About/Showreel";
import AboutFounder from "./AboutFounder/AboutFounder";
import HowWeWorkSection from "./HowWeWork/HowWeWork";
import OurServices from "./OurServices/OurServices";
import TrustedBy from "./TrustedBy/TrustedBy";
// import Footer from "./Footer/Footer";
import QuoteCrossfade from "./Testimonials/Testimonials";
import CleanTestimonial from "./CleanTestimonials/CleanTestimonial";
import BlogsList from "./BlogsList.jsx/BlogsList";



const Home = () => {
  return (
    <>
      <SculptureHero />

      
      
      {/* <Hero /> */}
      <About />

      
      <OurServices />
      <AboutFounder />
      <TrustedBy />
     
      <main className="testimonial-page">
        <CleanTestimonial />
      </main>
      <HowWeWorkSection />
      <BlogsList />
      
    </>
  );
};

export default Home;
