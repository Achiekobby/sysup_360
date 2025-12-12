import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Images from '../Images';

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
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #12122a 50%, #0b1324 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/40 to-transparent"
          animate={{ y: [0, scanHeight] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-24 left-24 w-96 h-96 rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.22) 0%, transparent 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, 18, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-80 h-80 rounded-full blur-3xl opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.18) 0%, transparent 70%)' }}
          animate={{ y: [0, -35, 0], x: [0, -22, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto relative z-10" data-reveal="up">
        <div className="max-w-3xl mx-auto text-center">
          <div
            data-animate="about"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20"
          >
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Our Story</span>
          </div>
          <h2 data-animate="about" className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Built for real-world IT delivery.
          </h2>
          <p data-animate="about" className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            We’ve built a team with diverse tech expertise, united by one goal — delivering tailored IT solutions that work seamlessly for your business.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center" data-reveal="stagger">
          <div className="lg:col-span-6 space-y-6">
            <div data-animate="about" className="rounded-2xl border border-gray-800/60 bg-gray-900/25 backdrop-blur-md p-6" data-reveal-child>
              <div className="text-white font-semibold">What we do</div>
              <div className="mt-2 text-gray-300 leading-relaxed">
                From on-site installations and network deployments to VoIP PBX systems, USSD services, call centers,
                workstation and server maintenance, disaster recovery, WAN solutions, and app development — we’ve got you covered.
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4" data-reveal-child>
              {pillars.map((p) => (
                <div
                  key={p.title}
                  data-animate="about"
                  className="rounded-2xl border border-gray-800/60 bg-gray-900/20 backdrop-blur-md p-5"
                >
                  <div className="text-white font-semibold">{p.title}</div>
                  <div className="mt-2 text-sm text-gray-300 leading-relaxed">{p.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div data-animate="about" className="relative rounded-3xl overflow-hidden border border-gray-800/60 bg-gray-900/20 backdrop-blur-md" data-reveal-child>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(244,115,58,0.14),transparent_45%)]" />
              <div className="relative p-6">
                <div className="text-xs uppercase tracking-widest text-gray-400">Inside SysUp360</div>
                <div className="mt-2 text-2xl font-black text-white">Team. Tools. Execution.</div>
                <div className="mt-4 rounded-2xl overflow-hidden border border-gray-800/60">
                  <motion.img
                    src={Images.our_story}
                    alt="Our story"
                    className="w-full h-[300px] sm:h-[360px] object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  />
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

