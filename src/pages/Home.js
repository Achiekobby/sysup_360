import React, { useEffect, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { initScrollReveal } from '../utils/initScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    // Smooth scroll setup
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    const cleanupReveal = initScrollReveal(rootRef.current || document.body);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupReveal();
    };
  }, []);

  return (
    <ParallaxProvider>
      <div ref={rootRef} className="min-h-screen bg-gray-900 overflow-x-hidden">
        <Navbar />
        <Hero />
        <Features />
        <Services />
        <Stats />
        <Testimonials />
        <CTA />
        
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Home;

