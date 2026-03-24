import React, { useEffect, useRef, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutStory from '../components/AboutStory';
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    let cleanupReveal = () => {};

    // Delay reveal init by one rAF so all child components have fully painted
    // before we lock in ScrollTrigger positions.
    const rafId = requestAnimationFrame(() => {
      cleanupReveal = initScrollReveal(rootRef.current || document.body);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      cleanupReveal();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ParallaxProvider>
      <div ref={rootRef} className="overflow-x-hidden min-h-screen bg-gray-900">
        <Navbar />
        <Hero />
        <AboutStory />
        <Testimonials />
        <Features />
        <Services />
        <Stats />
        <CTA />
        <Footer />

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed right-4 bottom-5 z-50 sm:right-6 sm:bottom-6 group transition-all duration-300 ${
            showBackToTop
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <span className="relative flex justify-center items-center w-12 h-12 rounded-2xl border backdrop-blur-xl shadow-lg bg-gray-900/70 border-[#F47D11]/40 shadow-[#F47D11]/20 transition-all duration-300 group-hover:scale-105 group-hover:border-[#F47D11]/70 group-hover:shadow-[#F47D11]/40 group-active:scale-95">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F47D11]/15 to-[#F4733A]/15" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative w-5 h-5 text-[#F47D11]"
              aria-hidden="true"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </ParallaxProvider>
  );
};

export default Home;

