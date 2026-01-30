import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Code, Zap, Settings, Database, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const [scanHeight, setScanHeight] = useState(900);

  useEffect(() => {
    const update = () => setScanHeight(window.innerHeight || 900);
    update();
    window.addEventListener('resize', update);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-animate="about"]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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

  const pillars = [
    {
      title: 'Diverse expertise',
      body: 'A team with wide technical depth, aligned on one goal: delivery that works for your business.',
    },
    {
      title: 'End‑to‑end delivery',
      body: 'Installations, network deployments, VoIP PBX, USSD, DR, WAN, maintenance, and app development.',
    },
    {
      title: 'Startup-friendly',
      body: 'We love helping startups get a fair shot at greatness — and we bring the same energy to enterprises.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden relative px-6 py-24"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #12122a 50%, #0b1324 100%)' }}
    >
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/40 to-transparent"
          animate={{ y: [0, scanHeight] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-24 left-24 w-96 h-96 rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.22) 0%, transparent 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, 18, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-16 bottom-20 w-80 h-80 rounded-full blur-3xl opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.18) 0%, transparent 70%)' }}
          animate={{ y: [0, -35, 0], x: [0, -22, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container relative z-10 mx-auto" data-reveal="up">
        <div className="mx-auto max-w-3xl text-center">
          <div
            data-animate="about"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20"
          >
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Our Story</span>
          </div>
          <h2 data-animate="about" className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Built for real-world IT delivery.
          </h2>
          <p data-animate="about" className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            We’ve built a team with diverse tech expertise, united by one goal — delivering tailored IT solutions that work seamlessly for your business.
          </p>
        </div>

        <div className="grid gap-8 items-center mt-12 lg:grid-cols-12" data-reveal="stagger">
          <div className="space-y-6 lg:col-span-6">
            <div data-animate="about" className="p-6 rounded-2xl border backdrop-blur-md border-gray-800/60 bg-gray-900/25" data-reveal-child>
              <div className="font-semibold text-white">What we do</div>
              <div className="mt-2 leading-relaxed text-gray-300">
                From on-site installations and network deployments to VoIP PBX systems, USSD services, call centers,
                workstation and server maintenance, disaster recovery, WAN solutions, and app development — we’ve got you covered.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3" data-reveal-child>
              {pillars.map((p) => (
                <div
                  key={p.title}
                  data-animate="about"
                  className="p-5 rounded-2xl border backdrop-blur-md border-gray-800/60 bg-gray-900/20"
                >
                  <div className="font-semibold text-white">{p.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-gray-300">{p.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div data-animate="about" className="overflow-hidden relative rounded-3xl border backdrop-blur-md border-gray-800/60 bg-gray-900/20" data-reveal-child>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(244,115,58,0.14),transparent_45%)]" />
              <div className="relative p-6">
                <div className="text-xs tracking-widest text-gray-400 uppercase">Inside SysUp360</div>
                <div className="mt-2 text-2xl font-black text-white">Team. Tools. Execution.</div>
                <div className="overflow-hidden mt-4 bg-gradient-to-br rounded-2xl border backdrop-blur-sm border-gray-800/60 from-gray-900/80 to-gray-800/60">
                  <motion.div
                    className="w-full h-[300px] sm:h-[360px] relative flex items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 1.02 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    {/* Central Hub - Large circle */}
                    <motion.div
                      className="absolute w-32 h-32 rounded-full border-4 border-[#F47D11]/40 bg-gradient-to-br from-[#F47D11]/20 to-[#F4733A]/10"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#F47D11]/20 blur-xl"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>

                    {/* Static Icon Nodes */}
                    {[
                      { Icon: Users, angle: 0, color: '#F47D11' },
                      { Icon: Code, angle: 60, color: '#F4733A' },
                      { Icon: Zap, angle: 120, color: '#F47D11' },
                      { Icon: Settings, angle: 180, color: '#F4733A' },
                      { Icon: Database, angle: 240, color: '#F47D11' },
                      { Icon: Cpu, angle: 300, color: '#F4733A' },
                    ].map(({ Icon, angle, color }, i) => {
                      const radius = 140; // Increased radius
                      const x = Math.cos((angle * Math.PI) / 180) * radius;
                      const y = Math.sin((angle * Math.PI) / 180) * radius;
                      
                      return (
                        <React.Fragment key={i}>
                          {/* Static Connection Lines */}
                          <div
                            className="absolute w-px bg-gradient-to-b from-transparent via-[#F47D11]/20 to-transparent"
                            style={{
                              height: `${radius}px`,
                              left: '50%',
                              top: '50%',
                              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                              transformOrigin: 'top center',
                            }}
                          />
                          
                          {/* Static Icon Nodes with Pulsation */}
                          <div
                            className="absolute"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                            }}
                          >
                            <motion.div
                              className="relative -translate-x-1/2 -translate-y-1/2"
                              animate={{
                                scale: [1, 1.3, 1],
                              }}
                              transition={{
                                duration: 2 + (i * 0.2),
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.15,
                              }}
                            >
                              <motion.div
                                className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm shadow-lg"
                                animate={{
                                  borderColor: [
                                    'rgba(244, 125, 17, 0.4)',
                                    'rgba(244, 125, 17, 0.8)',
                                    'rgba(244, 125, 17, 0.4)',
                                  ],
                                }}
                                transition={{
                                  duration: 2 + (i * 0.2),
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.15,
                                }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color }}
                                  strokeWidth={2}
                                />
                              </motion.div>
                              
                              {/* Enhanced Pulsing glow */}
                              <motion.div
                                className="absolute inset-0 rounded-xl blur-lg -z-10"
                                style={{ background: color }}
                                animate={{
                                  opacity: [0.2, 0.6, 0.2],
                                  scale: [1, 1.4, 1],
                                }}
                                transition={{
                                  duration: 2 + (i * 0.2),
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.15,
                                }}
                              />
                            </motion.div>
                          </div>
                        </React.Fragment>
                      );
                    })}

                    {/* Central Logo/Icon */}
                    <motion.div
                      className="absolute z-10 p-4 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 backdrop-blur-md shadow-2xl"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Zap className="w-10 h-10 text-[#F47D11]" strokeWidth={2.5} />
                    </motion.div>

                    {/* Floating Particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
                        style={{
                          left: `${20 + (i * 6)}%`,
                          top: `${15 + (i % 4) * 20}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          x: [0, Math.sin(i) * 15, 0],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                          duration: 3 + (i % 3),
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      />
                    ))}

                    {/* Outer rotating ring */}
                    <motion.div
                      className="absolute w-48 h-48 rounded-full border border-[#F47D11]/20"
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      {[0, 90, 180, 270].map((angle, i) => (
                        <motion.div
                          key={angle}
                          className="absolute w-2 h-2 bg-[#F47D11] rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${angle}deg) translateY(-96px) translateX(-50%)`,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

