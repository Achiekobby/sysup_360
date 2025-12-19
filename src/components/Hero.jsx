import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import AnimatedHeroImage from './AnimatedHeroImage';

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const servicesRef = useRef(null);
  const [scanHeight, setScanHeight] = useState(1000);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Very subtle scroll effects - content stays fully visible
  // Only slight fade at the very end of scroll
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.9, 1], [0, 20, 40]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const slides = useMemo(
    () => [
      {
        id: 'story',
        kicker: 'Our Story',
        title: 'A team built for execution.',
        body:
          'From network deployments and VoIP PBX to USSD services and app development — we deliver solutions that work seamlessly for your business.',
        bullets: ['On-site installations', 'Disaster recovery & WAN', 'Apps, integrations, and more'],
      },
      {
        id: 'solutions',
        kicker: 'Solutions & Services',
        title: 'Everything IT — in one 360.',
        body:
          'From quick support fixes to enterprise rollouts, we bring precision, urgency, and professionalism — every time.',
        bullets: ['Contact Center & USSD', 'Cloud/VPS & Managed IT', 'Cybersecurity & DevSecOps'],
      },
    ],
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Keep scan line height in sync (avoid using window.* inside JSX)
    const updateScanHeight = () => setScanHeight(window.innerHeight || 1000);
    updateScanHeight();
    window.addEventListener('resize', updateScanHeight);

    // Scope GSAP to this component (prevents StrictMode double-invoke leaving elements hidden)
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title animation with 3D effect
      if (titleRef.current) {
        const titleLines = titleRef.current.querySelectorAll('.title-line');
        masterTl.from(titleLines, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: 'top center',
          stagger: 0.15,
          duration: 1.3,
          ease: 'power4.out',
          clearProps: 'opacity,transform',
        }, 0);
      }

      // Description animation
      if (descriptionRef.current) {
        masterTl.from(descriptionRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          clearProps: 'opacity,transform',
        }, 0.5);
      }

      // Services badges animation
      if (servicesRef.current) {
        const badges = servicesRef.current.querySelectorAll('.service-badge');
        masterTl.from(badges, {
          opacity: 0,
          scale: 0,
          rotation: -180,
          stagger: 0.05,
          duration: 0.6,
          ease: 'back.out(2)',
          clearProps: 'opacity,transform',
        }, 0.8);
      }

      // Image animation
      if (imageRef.current) {
        masterTl.from(imageRef.current, {
          opacity: 0,
          scale: 0.5,
          x: 150,
          rotationY: 30,
          duration: 1.8,
          ease: 'power4.out',
          clearProps: 'opacity,transform',
        }, 0.4);
      }

      // Continuous animations
      gsap.to('.floating-orb-1', {
        y: '+=40',
        x: '+=30',
        rotation: 360,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floating-orb-2', {
        y: '-=50',
        x: '-=40',
        rotation: -360,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floating-orb-3', {
        y: '+=35',
        x: '-=25',
        rotation: 180,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Pulsing glow effect
      gsap.to('.glow-pulse', {
        scale: 1.2,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
      ease: 'power2.inOut',
      });
    }, heroRef);

    return () => {
      window.removeEventListener('resize', updateScanHeight);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const id = window.setInterval(() => {
      setActiveSlide((s) => (s + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [isPaused, slides.length]);

  const services = useMemo(
    () => [
      'Contact Center',
      'USSD',
      'Cloud & VPS',
      'Cybersecurity',
      'Mobile Apps',
      'DevOps',
      'Network Design',
      'VoIP PBX',
      'Web Design',
      'Managed IT',
      'DevSecOps',
    ],
    []
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
      id="home"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs with parallax */}
        <motion.div
          className="floating-orb-1 absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(244, 125, 17, 0.3) 0%, transparent 70%)',
            x: useTransform(springX, [-1, 1], [-100, 100]),
            y: useTransform(springY, [-1, 1], [-100, 100]),
          }}
        />
        <motion.div
          className="floating-orb-2 absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(244, 115, 58, 0.25) 0%, transparent 70%)',
            x: useTransform(springX, [-1, 1], [100, -100]),
            y: useTransform(springY, [-1, 1], [100, -100]),
          }}
        />
        <motion.div
          className="floating-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(244, 125, 17, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Animated scan lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/50 to-transparent"
          animate={{
            y: [0, scanHeight],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-20 py-20"
        style={{ 
          opacity: opacity,
          scale: scale,
          y: y,
          willChange: 'transform, opacity',
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 mt-20">

            {/* Title */}
            <div ref={titleRef} className="space-y-2" data-reveal="tilt">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.15]">
                <div className="title-line text-white block mb-2">
                  You Envision IT,
                </div>
                <div className="title-line block">
                  <span className="bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent">
                    We Make IT Happen
                  </span>
                </div>
                <div className="title-line text-white/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 font-light">
                  with our 360° solutions
                </div>
              </h1>
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className="space-y-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              data-reveal="stagger"
            >
              {/* Rotating content panel */}
              <div className="relative max-w-2xl mx-auto lg:mx-0" data-reveal-child>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[activeSlide].id}
                    initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-2xl border border-gray-800/60 bg-gray-900/30 backdrop-blur-md p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-400">
                        {slides[activeSlide].kicker}
                      </div>
                      <div className="flex gap-2">
                        {slides.map((s, i) => (
                          <button
                            key={s.id}
                            type="button"
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setActiveSlide(i)}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${
                              i === activeSlide ? 'bg-[#F47D11] scale-110' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                      {slides[activeSlide].title}
                    </div>

                    <div className="mt-2 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                      {slides[activeSlide].body}
                    </div>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {slides[activeSlide].bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F47D11]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lightweight service chips (still animated in via GSAP) */}
              <div ref={servicesRef} className="flex flex-wrap gap-2 justify-center lg:justify-start" data-reveal-child>
                {services.slice(0, 7).map((service) => (
                  <motion.span
                    key={service}
                    className="service-badge px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-xs sm:text-sm text-gray-300 hover:border-[#F47D11]/50 hover:text-[#F47D11] transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {service}
                  </motion.span>
                ))}
              </div>

              {/* Mission (left) */}
              <div className="rounded-2xl border border-gray-800/60 bg-gray-900/25 backdrop-blur-md p-5" data-reveal-child>
                <div className="text-xs uppercase tracking-widest text-gray-400">Mission</div>
                <div className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                  Catalyze business transformation through{' '}
                  <span className="text-[#F47D11] font-semibold">secure</span>, tailored, and cost-effective IT solutions.
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual - Animated Image */}
          <motion.div
            ref={imageRef}
            className="relative w-full h-full flex items-start justify-center -mt-16 lg:-mt-10"
            style={{ minHeight: '600px', height: '100%' }}
            data-reveal="clip"
          >
            {/* Decorative elements around image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-[120%] h-[120%] rounded-full border border-[#F47D11]/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[110%] h-[110%] rounded-full border border-[#F4733A]/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            
            <AnimatedHeroImage />
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#F47D11]/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#F4733A]/30 rounded-bl-3xl" />

            {/* Vision (right) */}
            <div className="absolute left-4 right-4 bottom-4 lg:left-auto lg:right-4 lg:bottom-4 lg:w-[340px] rounded-2xl border border-gray-800/60 bg-gray-900/25 backdrop-blur-md p-5" data-reveal="up">
              <div className="text-xs uppercase tracking-widest text-gray-400">Vision</div>
              <div className="mt-2 text-sm text-gray-300 leading-relaxed">
                Deliver real impact and keep clients{' '}
                <span className="text-[#F47D11] font-semibold">ahead of the curve</span> with modern, resilient systems.
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Discover More
          </span>
          <div className="w-6 h-10 border-2 border-[#F47D11]/50 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-3 bg-gradient-to-b from-[#F47D11] to-[#F4733A] rounded-full mt-2"
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tech badge */}
      <motion.div
        className="absolute bottom-10 right-10 hidden lg:flex items-center gap-2 bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-800/50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-gray-400">All Systems Operational</span>
      </motion.div>
    </section>
  );
};

export default Hero;
