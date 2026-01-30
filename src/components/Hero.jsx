import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { TypeAnimation } from "react-type-animation";
import AnimatedHeroImage from "./AnimatedHeroImage";

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);
  const [scanHeight, setScanHeight] = useState(1000);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Very subtle scroll effects - content stays fully visible
  // Only slight fade at the very end of scroll
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.9, 1], [0, 20, 40]);

  // Mouse parallax - optimized for smoothness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25, mass: 0.5 });

  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smooth updates
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth - 0.5) * 2);
        mouseY.set((clientY / innerHeight - 0.5) * 2);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Keep scan line height in sync (avoid using window.* inside JSX)
    const updateScanHeight = () => setScanHeight(window.innerHeight || 1000);
    updateScanHeight();
    window.addEventListener("resize", updateScanHeight);

    // Scope GSAP to this component (prevents StrictMode double-invoke leaving elements hidden)
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title animation with 3D effect - smoother easing
      if (titleRef.current) {
        const titleLines = titleRef.current.querySelectorAll(".title-line");
        gsap.set(titleLines, { willChange: "transform, opacity" });
        masterTl.from(
          titleLines,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "top center",
            stagger: 0.15,
            duration: 1.5,
            ease: "power2.out",
            clearProps: "opacity,transform",
            force3D: true,
          },
          0
        );
      }

      // Services badges animation - smoother bounce
      if (servicesRef.current) {
        const badges = servicesRef.current.querySelectorAll(".service-badge");
        gsap.set(badges, { willChange: "transform, opacity" });
        masterTl.from(
          badges,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
            stagger: 0.05,
            duration: 0.8,
            ease: "back.out(1.7)",
            clearProps: "opacity,transform",
            force3D: true,
          },
          0.8
        );
      }

      // Image animation - smoother entrance
      if (imageRef.current) {
        gsap.set(imageRef.current, { willChange: "transform, opacity" });
        masterTl.from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.5,
            x: 150,
            rotationY: 30,
            duration: 2,
            ease: "power2.out",
            clearProps: "opacity,transform",
            force3D: true,
          },
          0.4
        );
      }

      // Continuous animations - optimized for smoothness
      gsap.set(".floating-orb-1, .floating-orb-2, .floating-orb-3", {
        willChange: "transform",
        force3D: true,
      });

      gsap.to(".floating-orb-1", {
        y: "+=40",
        x: "+=30",
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".floating-orb-2", {
        y: "-=50",
        x: "-=40",
        rotation: -360,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".floating-orb-3", {
        y: "+=35",
        x: "-=25",
        rotation: 180,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      // Pulsing glow effect - smoother pulse
      gsap.set(".glow-pulse", {
        willChange: "transform, opacity",
        force3D: true,
      });
      gsap.to(".glow-pulse", {
        scale: 1.2,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        force3D: true,
      });
    }, heroRef);

    return () => {
      window.removeEventListener("resize", updateScanHeight);
      ctx.revert();
    };
  }, []);

  // Auto-rotate disabled since we only have one slide now
  // useEffect(() => {
  //   if (isPaused) return undefined;
  //   const id = window.setInterval(() => {
  //     setActiveSlide((s) => (s + 1) % slides.length);
  //   }, 4500);
  //   return () => window.clearInterval(id);
  // }, [isPaused, slides.length]);

  const services = useMemo(
    () => [
      "Contact Center",
      "Managed Services",
      "Bulk SMS",
      "Bulk Voice",
      "USSD Services",
      "Cloud & VPS",
      "Managed IT",
      "Mobile",
      "IAM",
      "Technology",
      "eCommerce",
      "Digital",
      "Integrations",
      "Custom App Dev",
      "iPaaS",
      "DevOPs",
      "DevSecOps",
      "Hyperconverged",
      "Virtualization",
      "Collaboration",
      "Cybersecurity",
    ],
    []
  );

  // TypeAnimation state for color emphasis
  const [isTyping, setIsTyping] = useState(false);
  const [textColor, setTextColor] = useState("linear-gradient(90deg, #F47D11, #F4733A, #F47D11)");

  // Create sequence for TypeAnimation from services array
  const typeSequence = useMemo(() => {
    const sequence = [];
    services.forEach((service, index) => {
      sequence.push(service.toUpperCase());
      sequence.push(2000); // Pause after typing
      sequence.push(() => {
        setIsTyping(true);
        setTextColor("linear-gradient(90deg, #FF9500, #FF6B35, #FF9500)");
      });
      sequence.push(500); // Hold with emphasis
      sequence.push(() => {
        setIsTyping(false);
        setTextColor("linear-gradient(90deg, #F47D11, #F4733A, #F47D11)");
      });
      // Delete text before next service (except for last one)
      if (index < services.length - 1) {
        sequence.push("");
        sequence.push(100);
      }
    });
    return sequence;
  }, [services]);

  return (
    <section
      ref={heroRef}
      className="flex overflow-hidden relative justify-center items-center min-h-screen bg-gray-900"
      id="home"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        zIndex: 1,
        paddingTop: "clamp(0.25rem, 0.5vh, 0.5rem)",
        paddingBottom: "clamp(2rem, 5vh, 4rem)",
      }}
    >
      {/* Animated Background */}
      <div className="overflow-hidden absolute inset-0 z-0">
        {/* Gradient Orbs with parallax - optimized */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl floating-orb-1 glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 125, 17, 0.3) 0%, transparent 70%)",
            x: useTransform(springX, [-1, 1], [-100, 100]),
            y: useTransform(springY, [-1, 1], [-100, 100]),
            willChange: "transform",
          }}
        />
        <motion.div
          className="absolute left-10 bottom-40 w-80 h-80 rounded-full blur-3xl floating-orb-2"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 115, 58, 0.25) 0%, transparent 70%)",
            x: useTransform(springX, [-1, 1], [100, -100]),
            y: useTransform(springY, [-1, 1], [100, -100]),
            willChange: "transform",
          }}
        />
        <motion.div
          className="floating-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 125, 17, 0.15) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Animated scan lines - optimized */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/50 to-transparent"
          style={{ willChange: "transform" }}
          animate={{
            y: [0, scanHeight],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating particles - optimized with useMemo */}
        {useMemo(() => {
          return [...Array(30)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  willChange: 'transform, opacity',
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          });
        }, [])}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 px-6 pt-0 pb-8 mx-auto max-w-8xl lg:px-12 sm:pt-2 sm:pb-12 lg:pt-4 lg:pb-16"
        style={{
          opacity: opacity,
          scale: scale,
          y: y,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-0 lg:min-h-[75vh]">
          {/* Left Content */}
          <div className="relative z-30 -mt-6 space-y-4 text-center lg:text-left sm:-mt-8 sm:space-y-5 lg:-mt-12 lg:space-y-6">
            {/* Title */}
            <div ref={titleRef} className="space-y-1 sm:space-y-2" data-reveal="tilt">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] sm:leading-[1.15]">
                <div className="block mb-1 text-white title-line sm:mb-2">
                  You envision{" "}
                  <motion.span
                    className="inline-block relative"
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      willChange: "transform",
                    }}
                  >
                    <span
                      className="relative z-10 font-black"
                      style={{
                        background: "linear-gradient(135deg, #F47D11 0%, #FF9500 50%, #F4733A 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 8px rgba(244, 125, 17, 0.6))",
                      }}
                    >
                      IT
                    </span>
                    <motion.span
                      className="absolute inset-0 opacity-60 blur-xl"
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "radial-gradient(circle, rgba(244, 125, 17, 0.8) 0%, transparent 70%)",
                        willChange: "opacity, transform",
                        zIndex: 0,
                        transform: "translateZ(0)",
                      }}
                    />
                  </motion.span>
                  ,
                </div>
                <div className="block title-line">
                  <span className="text-white">
                    we make{" "}
                    <span
                      className="relative z-10 font-black"
                      style={{
                        background: "linear-gradient(135deg, #F47D11 0%, #FF9500 50%, #F4733A 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 8px rgba(244, 125, 17, 0.6))",
                      }}
                    >
                      IT
                    </span>{" "}
                    happen
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center items-center mt-3 text-2xl font-light title-line text-white/90 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:mt-4 lg:mt-5 lg:justify-start sm:gap-3">
                  <span>
                    with our 360
                    <motion.span
                      className="inline-flex items-baseline ml-0.5 font-bold"
                      style={{
                        color: "#D85F08",
                        fontSize: "1.35em",
                        filter: "drop-shadow(0 0 6px rgba(216, 95, 8, 0.6))",
                      }}
                      aria-hidden
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                        >
                          .
                        </motion.span>
                      ))}
                    </motion.span>
                  </span>
                  <span className="relative inline-block min-w-[250px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] text-left h-[1.2em] overflow-visible">
                    <motion.span
                      className="inline-block relative z-30 font-bold tracking-wide uppercase"
                      animate={{
                        scale: isTyping ? [1, 1.03, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isTyping ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      style={{
                        willChange: "transform",
                        position: "relative",
                        zIndex: 30,
                        background: "transparent",
                      }}
                    >
                      {/* Glow effect when typing */}
                      {isTyping && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#F47D11]/30 via-[#F4733A]/40 to-[#F47D11]/30 blur-xl -z-10"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      <TypeAnimation
                        sequence={typeSequence}
                        repeat={Infinity}
                        deletionSpeed={25}
                        speed={40}
                        cursor={true}
                        wrapper="span"
                        style={{
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          letterSpacing: "inherit",
                          display: "inline-block",
                          background: textColor,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontFamily: "'Nunito', 'Quicksand', 'Poppins', system-ui, -apple-system, sans-serif",
                          filter: isTyping
                            ? "brightness(1.4) saturate(1.6) drop-shadow(0 0 12px rgba(255, 149, 0, 0.8))"
                            : "brightness(1) saturate(1) drop-shadow(0 0 4px rgba(244, 125, 17, 0.3))",
                          transition: "filter 0.3s ease-in-out, background 0.3s ease-in-out",
                          position: "relative",
                          zIndex: 30,
                          lineHeight: "inherit",
                        }}
                      />
                    </motion.span>
                  </span>
                </div>
              </h1>
            </div>

            {/* Service chips */}
            <div
              ref={servicesRef}
              className="flex flex-wrap gap-2 justify-center mt-4 lg:justify-start sm:mt-5 lg:mt-6"
              data-reveal="stagger"
            >
              {/* {services.slice(0, 7).map((service) => (
                <motion.span
                  key={service}
                  className="service-badge px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-xs sm:text-sm text-gray-300 hover:border-[#F47D11]/50 hover:text-[#F47D11] transition-all duration-300 cursor-pointer"
                  style={{ willChange: 'transform' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  data-reveal-child
                >
                  {service}
                </motion.span>
              ))} */}
            </div>
          </div>

          {/* Right Visual - Animated Image */}
          <motion.div
            ref={imageRef}
            className="flex relative justify-center items-center -mt-8 w-full h-full sm:-mt-12 lg:-mt-4"
            style={{ minHeight: "clamp(400px, 50vh, 600px)", height: "100%" }}
            data-reveal="clip"
          >
            {/* Decorative elements around image - optimized */}
            <div className="flex absolute inset-0 justify-center items-center">
              <motion.div
                className="absolute w-[120%] h-[120%] rounded-full border border-[#F47D11]/10"
                style={{ willChange: "transform" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[110%] h-[110%] rounded-full border border-[#F4733A]/10"
                style={{ willChange: "transform" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <AnimatedHeroImage />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#F47D11]/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#F4733A]/30 rounded-bl-3xl" />

            {/* Vision (right) - removed as Mission & Vision are now combined */}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - optimized */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-20 transform -translate-x-1/2"
        style={{ willChange: 'transform, opacity' }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-3 items-center">
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
            Discover More
          </span>
          <div className="w-6 h-10 border-2 border-[#F47D11]/50 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-3 bg-gradient-to-b from-[#F47D11] to-[#F4733A] rounded-full mt-2"
              style={{ willChange: 'transform, opacity' }}
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tech badge - optimized */}
      <motion.div
        className="hidden absolute right-10 bottom-10 gap-2 items-center px-4 py-2 rounded-full border backdrop-blur-md lg:flex bg-gray-900/50 border-gray-800/50"
        style={{ willChange: 'transform, opacity' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, ease: 'easeOut' }}
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
