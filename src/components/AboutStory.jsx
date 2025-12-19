import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutStory = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [scanHeight, setScanHeight] = useState(900);

  useEffect(() => {
    const update = () => setScanHeight(window.innerHeight || 900);
    update();
    window.addEventListener('resize', update);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('[data-animate="about"]'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-animate="card"]'),
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', update);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(244, 125, 17, 0.25) 0%, transparent 70%)',
          }}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl opacity-55"
          style={{
            background: 'radial-gradient(circle, rgba(244, 115, 58, 0.22) 0%, transparent 70%)',
          }}
          animate={{ y: [0, -35, 0], x: [0, -22, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Scan line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/40 to-transparent"
          animate={{ y: [0, scanHeight] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16" data-reveal="up">
          <div
            data-animate="about"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20"
          >
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-[#F47D11] font-semibold text-sm tracking-wider">About SysUp360</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto" data-reveal="stagger">
          {/* Our Story */}
          <motion.div
            data-animate="card"
            className="relative overflow-hidden rounded-3xl border border-gray-800/60 bg-gray-900/30 backdrop-blur-md p-8"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(244,115,58,0.14),transparent_45%)]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Our Story</div>
              <h3 className="text-2xl font-black text-white mb-4">
                We've built a team with diverse tech expertise, united by one goal.
              </h3>
              <p className="text-gray-300 leading-relaxed">
                From on-site installations and network deployments to VoIP PBX systems, USSD services, call centers, workstation and server maintenance, disaster recovery, WAN solutions, and app development — we've got you covered. Startups are especially close to our hearts because we believe every business deserves a fair shot at greatness. But our passion doesn't stop there — we bring the same energy, commitment, and professionalism to established brands too. No matter the size of the project, our team is driven by a shared dedication to quality and excellence.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            data-animate="card"
            className="relative overflow-hidden rounded-3xl border border-gray-800/60 bg-gray-900/30 backdrop-blur-md p-8"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(244,115,58,0.14),transparent_45%)]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Our Mission & Vision</div>
              <h3 className="text-2xl font-black text-white mb-4">
                It's simple — to catalyze business transformation.
              </h3>
              <p className="text-gray-300 leading-relaxed">
                It's simple — to catalyze business transformation through secure, tailored, and cost-effective solutions that deliver real impact and keep us ahead of the curve.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;

