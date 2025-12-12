import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParallax } from 'react-scroll-parallax';

gsap.registerPlugin(ScrollTrigger);

const neon = {
  a: '#F47D11',
  b: '#F4733A',
};

function useScanHeight(defaultHeight = 900) {
  const [scanHeight, setScanHeight] = useState(defaultHeight);
  useEffect(() => {
    const update = () => setScanHeight(window.innerHeight || defaultHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [defaultHeight]);
  return scanHeight;
}

const MiniSparkline = ({ points = [6, 10, 8, 12, 9, 14, 13] }) => {
  const pathRef = useRef(null);

  const d = useMemo(() => {
    const w = 160;
    const h = 46;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = Math.max(1, max - min);
    const step = w / (points.length - 1);
    const mapped = points.map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * (h - 6) - 3;
      return { x, y };
    });
    return mapped.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  }, [points]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return undefined;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: path.closest('[data-telemetry-card="true"]'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pathRef);

    return () => ctx.revert();
  }, [d]);

  return (
    <svg width="160" height="46" viewBox="0 0 160 46" className="opacity-90">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={neon.a} stopOpacity="0.95" />
          <stop offset="1" stopColor={neon.b} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#spark)" strokeWidth="3" strokeLinecap="round" ref={pathRef} />
      <path d={`${d} L 160 46 L 0 46 Z`} fill={`url(#spark)`} opacity="0.08" />
    </svg>
  );
};

const RadialGauge = ({ value = 75, label = 'Health' }) => {
  const circleRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const valueEl = valueRef.current;
    if (!circle || !valueEl) return undefined;

    const r = 44;
    const c = 2 * Math.PI * r;
    circle.style.strokeDasharray = `${c}`;
    circle.style.strokeDashoffset = `${c}`;

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: circle.closest('[data-telemetry-card="true"]'),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          const pct = Math.max(0, Math.min(100, obj.v));
          const offset = c * (1 - pct / 100);
          circle.style.strokeDashoffset = `${offset}`;
          valueEl.textContent = `${pct.toFixed(0)}%`;
        },
      });
    }, circleRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor={neon.a} stopOpacity="0.95" />
            <stop offset="1" stopColor={neon.b} stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="55" cy="55" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="55"
          cy="55"
          r="44"
          stroke="url(#ring)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 55 55)"
          filter="url(#glow)"
          ref={circleRef}
        />
        <circle cx="55" cy="55" r="34" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.06)" />
        <text x="55" y="60" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" ref={valueRef}>
          0%
        </text>
      </svg>
      <div>
        <div className="text-xs uppercase tracking-widest text-gray-400">{label}</div>
        <div className="mt-1 text-sm text-gray-300">Live operational telemetry</div>
        <div className="mt-2 inline-flex items-center gap-2 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          signal stable
        </div>
      </div>
    </div>
  );
};

const TelemetryCard = ({ stat }) => {
  const cardRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    const valueEl = valueRef.current;
    if (!el || !valueEl) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, rotateX: 8, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const obj = { v: 0 };
      gsap.to(obj, {
        v: stat.value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          const n = stat.isFloat ? obj.v.toFixed(1) : Math.floor(obj.v).toString();
          valueEl.textContent = `${n}${stat.suffix ?? ''}`;
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [stat.isFloat, stat.suffix, stat.value]);

  return (
    <motion.div
      ref={cardRef}
      data-telemetry-card="true"
      className="group relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gray-950/20 backdrop-blur-md p-6"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_85%_65%,rgba(244,115,58,0.14),transparent_45%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-400">{stat.kicker}</div>
          <div ref={valueRef} className="mt-2 text-3xl sm:text-4xl font-black text-white">
            0{stat.suffix ?? ''}
          </div>
          <div className="mt-2 text-sm text-gray-300">{stat.label}</div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F47D11]/15 to-[#F4733A]/15 border border-[#F47D11]/20 flex items-center justify-center text-xl">
          {stat.icon}
        </div>
      </div>
      <div className="mt-5">
        <MiniSparkline points={stat.spark} />
    </div>
    </motion.div>
  );
};

// Parallax floating tech elements for scroll-reactive depth
const ParallaxTechElements = () => {
  // Circuit board icon - rotates with scroll
  const circuit = useParallax({
    rotate: [0, 360],
    opacity: [0.3, 0.8, 0.3],
    scale: [0.9, 1.1, 0.9],
  });

  // Server rack - moves up/down
  const server = useParallax({
    translateY: [-30, 30],
    rotate: [-15, 15],
    opacity: [0.4, 0.9, 0.4],
  });

  // Network node - rotates opposite
  const network = useParallax({
    rotate: [360, 0],
    translateX: [-20, 20],
    opacity: [0.35, 0.85, 0.35],
  });

  // Data stream - moves with scale
  const dataStream = useParallax({
    translateY: [40, -40],
    scale: [0.95, 1.05, 0.95],
    opacity: [0.3, 0.7, 0.3],
  });

  // Security shield - subtle movement
  const shield = useParallax({
    translateY: [-20, 20],
    rotate: [-8, 8],
    opacity: [0.4, 0.85, 0.4],
  });

  // Cloud icon - slow drift
  const cloud = useParallax({
    translateX: [-30, 30],
    translateY: [-15, 15],
    opacity: [0.35, 0.75, 0.35],
  });

  return (
    <>
      {/* Circuit Board - top left */}
      <div
        ref={circuit.ref}
        className="absolute top-[8%] left-[5%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="drop-shadow-[0_0_12px_rgba(244,125,17,0.4)]">
          <rect x="10" y="10" width="60" height="60" rx="4" stroke={neon.a} strokeWidth="2" fill="none" />
          <circle cx="20" cy="20" r="4" fill={neon.a} />
          <circle cx="60" cy="20" r="4" fill={neon.b} />
          <circle cx="20" cy="60" r="4" fill={neon.b} />
          <circle cx="60" cy="60" r="4" fill={neon.a} />
          <line x1="20" y1="20" x2="40" y2="40" stroke={neon.a} strokeWidth="2" />
          <line x1="60" y1="20" x2="40" y2="40" stroke={neon.b} strokeWidth="2" />
          <line x1="20" y1="60" x2="40" y2="40" stroke={neon.b} strokeWidth="2" />
          <line x1="60" y1="60" x2="40" y2="40" stroke={neon.a} strokeWidth="2" />
          <circle cx="40" cy="40" r="6" fill={neon.a} opacity="0.8" />
        </svg>
      </div>

      {/* Server Rack - top right */}
      <div
        ref={server.ref}
        className="absolute top-[12%] right-[8%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="70" height="90" viewBox="0 0 70 90" fill="none" className="drop-shadow-[0_0_12px_rgba(244,115,58,0.4)]">
          <rect x="10" y="5" width="50" height="20" rx="2" stroke={neon.b} strokeWidth="2" fill="rgba(244,125,17,0.1)" />
          <rect x="10" y="30" width="50" height="20" rx="2" stroke={neon.a} strokeWidth="2" fill="rgba(244,115,58,0.1)" />
          <rect x="10" y="55" width="50" height="20" rx="2" stroke={neon.b} strokeWidth="2" fill="rgba(244,125,17,0.1)" />
          <circle cx="18" cy="15" r="2" fill={neon.a} />
          <circle cx="18" cy="40" r="2" fill={neon.b} />
          <circle cx="18" cy="65" r="2" fill={neon.a} />
          <rect x="25" y="12" width="25" height="6" rx="1" fill={neon.a} opacity="0.3" />
          <rect x="25" y="37" width="25" height="6" rx="1" fill={neon.b} opacity="0.3" />
          <rect x="25" y="62" width="25" height="6" rx="1" fill={neon.a} opacity="0.3" />
        </svg>
      </div>

      {/* Network Node - middle left */}
      <div
        ref={network.ref}
        className="absolute top-[45%] left-[3%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_12px_rgba(244,125,17,0.4)]">
          <circle cx="50" cy="50" r="8" fill={neon.a} />
          <circle cx="50" cy="50" r="15" stroke={neon.a} strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="50" cy="50" r="25" stroke={neon.b} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="20" cy="30" r="5" fill={neon.b} />
          <circle cx="80" cy="30" r="5" fill={neon.a} />
          <circle cx="20" cy="70" r="5" fill={neon.a} />
          <circle cx="80" cy="70" r="5" fill={neon.b} />
          <line x1="25" y1="32" x2="42" y2="45" stroke={neon.b} strokeWidth="1.5" opacity="0.6" />
          <line x1="75" y1="32" x2="58" y2="45" stroke={neon.a} strokeWidth="1.5" opacity="0.6" />
          <line x1="25" y1="68" x2="42" y2="55" stroke={neon.a} strokeWidth="1.5" opacity="0.6" />
          <line x1="75" y1="68" x2="58" y2="55" stroke={neon.b} strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      {/* Data Stream - middle right */}
      <div
        ref={dataStream.ref}
        className="absolute top-[50%] right-[4%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none" className="drop-shadow-[0_0_12px_rgba(244,115,58,0.4)]">
          <path d="M30 10 Q40 30 30 50 Q20 70 30 90" stroke={neon.b} strokeWidth="3" fill="none" opacity="0.7" />
          <circle cx="30" cy="10" r="4" fill={neon.a} />
          <circle cx="30" cy="30" r="3" fill={neon.b} opacity="0.8" />
          <circle cx="30" cy="50" r="5" fill={neon.a} opacity="0.9" />
          <circle cx="30" cy="70" r="3" fill={neon.b} opacity="0.8" />
          <circle cx="30" cy="90" r="4" fill={neon.a} />
          <rect x="10" y="48" width="8" height="4" rx="1" fill={neon.a} opacity="0.6" />
          <rect x="42" y="48" width="8" height="4" rx="1" fill={neon.b} opacity="0.6" />
        </svg>
      </div>

      {/* Security Shield - bottom left */}
      <div
        ref={shield.ref}
        className="absolute bottom-[15%] left-[7%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="75" height="85" viewBox="0 0 75 85" fill="none" className="drop-shadow-[0_0_12px_rgba(244,125,17,0.4)]">
          <path
            d="M37.5 5 L60 15 L60 40 Q60 65 37.5 80 Q15 65 15 40 L15 15 Z"
            stroke={neon.a}
            strokeWidth="2.5"
            fill="rgba(244,125,17,0.08)"
          />
          <path d="M30 40 L35 45 L45 32" stroke={neon.a} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="37.5" cy="25" r="3" fill={neon.b} />
        </svg>
      </div>

      {/* Cloud Icon - bottom right */}
      <div
        ref={cloud.ref}
        className="absolute bottom-[18%] right-[6%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        <svg width="90" height="60" viewBox="0 0 90 60" fill="none" className="drop-shadow-[0_0_12px_rgba(244,115,58,0.4)]">
          <path
            d="M25 40 Q25 30 35 30 Q35 22 45 22 Q55 22 55 30 Q65 30 65 40 Q65 50 55 50 L35 50 Q25 50 25 40 Z"
            stroke={neon.b}
            strokeWidth="2"
            fill="rgba(244,115,58,0.1)"
          />
          <circle cx="35" cy="38" r="2" fill={neon.a} opacity="0.7" />
          <circle cx="45" cy="38" r="2" fill={neon.b} opacity="0.7" />
          <circle cx="55" cy="38" r="2" fill={neon.a} opacity="0.7" />
          <line x1="40" y1="32" x2="40" y2="44" stroke={neon.a} strokeWidth="1.5" opacity="0.5" />
          <line x1="50" y1="32" x2="50" y2="44" stroke={neon.b} strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
    </>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const scanHeight = useScanHeight(900);

  const stats = useMemo(
    () => [
      {
        kicker: 'Clients',
        label: 'Businesses supported across sectors',
        value: 500,
        suffix: '+',
        icon: '👥',
        spark: [6, 9, 8, 12, 10, 13, 14],
      },
      {
        kicker: 'Deployments',
        label: 'Projects shipped end‑to‑end',
        value: 1000,
        suffix: '+',
        icon: '🚀',
        spark: [4, 8, 7, 10, 9, 12, 11],
      },
      {
        kicker: 'Uptime',
        label: 'DR-ready connectivity & ops',
        value: 99.9,
        suffix: '%',
        isFloat: true,
        icon: '⚡',
        spark: [9, 10, 10, 11, 10, 11, 12],
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #070707 0%, #14142c 55%, #0b1324 100%)',
      }}
    >
      {/* Mission Control backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/45 to-transparent"
          animate={{ y: [0, scanHeight] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.22), transparent 60%)' }}
          animate={{ y: [0, 34, 0], x: [0, 22, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -left-28 w-[620px] h-[620px] rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.20), transparent 60%)' }}
          animate={{ y: [0, -40, 0], x: [0, -26, 0] }}
          transition={{ duration: 7.1, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -26, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Parallax floating tech elements - scroll reactive */}
      <ParallaxTechElements />

      <div className="container mx-auto relative z-10">
        {/* Heading: not “samey” */}
        <div className="max-w-4xl mx-auto text-center" data-reveal="up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/12 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/22">
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Telemetry</span>
            <span className="text-gray-500 text-xs">/</span>
            <span className="text-gray-300 text-xs uppercase tracking-widest">Mission Control</span>
          </div>

          <h3 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Proof, not promises —
            <span className="block bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent">
              live signals of delivery.
            </span>
          </h3>
          <p className="mt-4 text-gray-300">
            Security-first deployments, resilient networks, and always-on operations — visualized like a modern ops console.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-6 items-start" data-reveal="stagger">
          {/* Left: big gauge */}
          <div className="lg:col-span-5">
            <motion.div
              data-telemetry-card="true"
              className="relative overflow-hidden rounded-3xl border border-gray-800/60 bg-gray-950/20 backdrop-blur-md p-7"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              data-reveal-child
            >
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.16),transparent_45%),radial-gradient(circle_at_85%_65%,rgba(244,115,58,0.12),transparent_45%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400">System Status</div>
                    <div className="mt-2 text-2xl font-black text-white">Operational readiness</div>
                    <div className="mt-2 text-sm text-gray-300">
                      Monitoring network, cloud, call center and DR signals.
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    all checks passing
                  </div>
                </div>

                <div className="mt-6">
                  <RadialGauge value={97} label="Readiness" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: 'Security', v: 'High' },
                    { k: 'Latency', v: 'Low' },
                    { k: 'Scale', v: 'Elastic' },
                  ].map((t) => (
                    <div key={t.k} className="rounded-2xl border border-gray-800/60 bg-gray-900/20 p-4">
                      <div className="text-xs uppercase tracking-widest text-gray-400">{t.k}</div>
                      <div className="mt-2 text-sm font-semibold text-white">{t.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: telemetry cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.kicker} data-reveal-child>
                <TelemetryCard stat={stat} />
              </div>
            ))}

            {/* A fourth “console strip” card */}
            <motion.div
              data-telemetry-card="true"
              className="sm:col-span-2 relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gray-950/20 backdrop-blur-md p-6"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              data-reveal-child
            >
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.16),transparent_45%),radial-gradient(circle_at_85%_65%,rgba(244,115,58,0.12),transparent_45%)]" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">247Care</div>
                  <div className="mt-2 text-xl font-black text-white">Always-on support</div>
                  <div className="mt-2 text-sm text-gray-300">
                    Ops monitoring, incident response, maintenance, and continuous improvement.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-gray-800/60 bg-gray-900/20 px-5 py-4">
                    <div className="text-xs text-gray-400">Coverage</div>
                    <div className="text-white font-black text-2xl">24/7</div>
                  </div>
                  <div className="rounded-2xl border border-gray-800/60 bg-gray-900/20 px-5 py-4">
                    <div className="text-xs text-gray-400">Response</div>
                    <div className="text-white font-black text-2xl">&lt;1d</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;


