import React from 'react'
import AboutHero from './AboutHero/AboutHero'
import FlipGallery from './TeamSection/FlipGallery'
import BentoGrid from './BentoGrid/BentoGrid'

const About = () => {
  return (
    <>
        <section className='previous-section'>
          <AboutHero 
          heading="We Craft Digital"
          headingAccent="Experiences"
          para={["We craft bold, future-proof identities that leave a lasting impression.",
            "From strategy to stunning visuals, we're your one-stop shop for a cohesive brand across every touchpoint."]}
          image="/assets/images/team.jpg"
          video="/assets/images/aboutbg2.mov"
          />
          
        </section>
        <FlipGallery />
        <section className='next-section'>
          <BentoGrid />
        </section>
    </>
  )
}

export default About