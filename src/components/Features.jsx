import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IllustratedIcon = ({ type }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const ctx = gsap.context(() => {
      const parts = svg.querySelectorAll('path, circle, rect, line, polyline');

      gsap.fromTo(
        parts,
        { opacity: 0, scale: 0.6, rotation: -120, transformOrigin: '50% 50%' },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.1,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: svg.closest('[data-solution-card="true"]'),
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tiny continuous motion per icon type
      switch (type) {
        case 'network': {
          const nodes = svg.querySelectorAll('circle[data-node="true"]');
          gsap.to(nodes, { scale: 1.25, opacity: 1, duration: 1.4, repeat: -1, yoyo: true, stagger: 0.15, ease: 'power2.inOut' });
          break;
        }
        case 'dr': {
          const pulse = svg.querySelector('[data-pulse="true"]');
          if (pulse) gsap.to(pulse, { scale: 1.15, opacity: 0.9, duration: 1.6, repeat: -1, yoyo: true, ease: 'power2.inOut', transformOrigin: '50% 50%' });
          break;
        }
        case 'dev': {
          const gear = svg.querySelector('[data-gear="true"]');
          if (gear) gsap.to(gear, { rotation: 360, duration: 6, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
          break;
        }
        case 'call-center': {
          const wave = svg.querySelector('[data-wave="true"]');
          if (wave) gsap.to(wave, { opacity: 1, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          break;
        }
        default:
          break;
      }
    }, svgRef);

    return () => ctx.revert();
  }, [type]);

  const common = {
    stroke: '#F47D11',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const fillA = '#F47D11';
  const fillB = '#F4733A';
  const soft = 'rgba(244,125,17,0.35)';

  const icons = {
    'call-center': (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="34" stroke={fillB} strokeWidth="2" opacity="0.35" />
        <path d="M28 55c0 10 8 18 18 18h8c10 0 18-8 18-18v-6c0-10-8-18-18-18h-8c-10 0-18 8-18 18v6Z" {...common} />
        <path d="M33 52v-6c0-7 6-13 13-13h8c7 0 13 6 13 13v6" {...common} opacity="0.85" />
        <path data-wave="true" d="M42 56c3 4 6 6 8 6s5-2 8-6" stroke={fillB} strokeWidth="3" opacity="0.6" />
        <circle cx="38" cy="52" r="3" fill={fillA} />
        <circle cx="62" cy="52" r="3" fill={fillA} />
      </svg>
    ),
    ussd: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="18" width="40" height="64" rx="10" stroke={fillA} strokeWidth="3" />
        <rect x="36" y="26" width="28" height="38" rx="6" fill={soft} stroke={fillB} strokeWidth="2" opacity="0.85" />
        <line x1="40" y1="38" x2="60" y2="38" {...common} />
        <line x1="40" y1="46" x2="56" y2="46" {...common} opacity="0.8" />
        <line x1="40" y1="54" x2="58" y2="54" {...common} opacity="0.6" />
        <circle cx="50" cy="74" r="4" fill={fillB} />
      </svg>
    ),
    network: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 60 50 30 80 60" {...common} opacity="0.8" />
        <path d="M25 68 50 78 75 68" {...common} opacity="0.7" />
        <circle data-node="true" cx="50" cy="30" r="6" fill={fillA} />
        <circle data-node="true" cx="20" cy="60" r="5" fill={fillB} />
        <circle data-node="true" cx="80" cy="60" r="5" fill={fillB} />
        <circle data-node="true" cx="50" cy="78" r="5" fill={fillA} />
        <circle cx="50" cy="52" r="18" stroke={fillB} strokeWidth="2" opacity="0.25" />
      </svg>
    ),
    pbx: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 30c8-6 22-6 30 0" {...common} />
        <path d="M30 40c12-10 28-10 40 0" {...common} opacity="0.8" />
        <path d="M28 56c0 10 12 22 22 22h0c10 0 22-12 22-22v-6c0-6-6-10-12-8l-6 2c-4 1-7 1-10 0l-6-2c-6-2-12 2-12 8v6Z" {...common} />
        <path d="M44 54h12" stroke={fillB} strokeWidth="3" opacity="0.8" />
      </svg>
    ),
    dr: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 18 78 30v22c0 18-12 28-28 30-16-2-28-12-28-30V30l28-12Z" {...common} />
        <path data-pulse="true" d="M50 32v30" stroke={fillB} strokeWidth="3" opacity="0.7" />
        <path d="M40 52l8 8 14-16" stroke={fillA} strokeWidth="3.2" opacity="0.95" />
      </svg>
    ),
    dev: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 34 26 50l12 16" {...common} />
        <path d="M62 34 74 50 62 66" {...common} />
        <path d="M54 30 46 70" stroke={fillB} strokeWidth="3" opacity="0.8" />
        <circle data-gear="true" cx="76" cy="28" r="7" stroke={fillB} strokeWidth="2" opacity="0.7" />
        <path data-gear="true" d="M76 18v4M76 34v4M66 28h4M82 28h4" stroke={fillB} strokeWidth="2" opacity="0.7" />
      </svg>
    ),
    care: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 60c0-8 6-14 14-14h12c8 0 14 6 14 14v6c0 8-6 14-14 14H44c-8 0-14-6-14-14v-6Z" {...common} />
        <path d="M45 50v10h10V50" stroke={fillB} strokeWidth="3" opacity="0.85" />
        <path d="M50 34c6-8 18-6 18 4 0 10-18 20-18 20S32 48 32 38c0-10 12-12 18-4Z" fill={soft} stroke={fillA} strokeWidth="2" />
      </svg>
    ),
    vps: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 62h32c8 0 13-5 13-12s-5-12-12-12c-2-8-8-12-16-12-8 0-14 4-16 12-7 1-12 6-12 12 0 7 5 12 11 12Z" {...common} />
        <rect x="34" y="66" width="32" height="10" rx="4" fill={soft} stroke={fillB} strokeWidth="2" />
        <circle cx="42" cy="71" r="2" fill={fillA} />
        <circle cx="50" cy="71" r="2" fill={fillA} />
        <circle cx="58" cy="71" r="2" fill={fillA} />
      </svg>
    ),
    web: (
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="46" cy="50" r="22" {...common} />
        <path d="M24 50h44" {...common} opacity="0.8" />
        <path d="M46 28c6 6 10 14 10 22s-4 16-10 22" {...common} opacity="0.7" />
        <path d="M46 28c-6 6-10 14-10 22s4 16 10 22" {...common} opacity="0.7" />
        <rect x="60" y="58" width="26" height="18" rx="5" fill={soft} stroke={fillB} strokeWidth="2" />
        <path d="M60 61l13 9 13-9" stroke={fillB} strokeWidth="2" />
      </svg>
    ),
  };

  return icons[type] || icons.web;
};

const SolutionsCard = ({ item, isOpen, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="group text-left relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gray-900/30 backdrop-blur-md p-6 hover:border-[#F47D11]/40 transition-colors"
      data-solution-card="true"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(244,115,58,0.14),transparent_45%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{item.kicker}</div>
            <div className="mt-2 text-xl font-semibold text-white">{item.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F47D11]/10 to-[#F4733A]/10 border border-[#F47D11]/15">
              <IllustratedIcon type={item.illustrationType} />
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-300 leading-relaxed">
          {item.summary}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-800/60 text-sm text-gray-300 leading-relaxed">
                {item.details}
              </div>
              {!!item.bullets?.length && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F47D11]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-[#F47D11]' : 'bg-gray-700'}`} />
            {isOpen ? 'Less details' : 'More details'}
          </span>
          <span className="group-hover:text-[#F47D11] transition-colors">
            {isOpen ? '–' : '+'}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [openId, setOpenId] = useState('call-center');
  const [scanHeight, setScanHeight] = useState(900);

  const serviceMarquee = useMemo(
    () => [
      'Contact Center',
      'Managed Services',
      'Bulk SMS',
      'USSD Services',
      'Cloud & VPS',
      'Managed IT',
      'Mobile',
      'IAM',
      'eCommerce',
      'Digital',
      'Integrations',
      'Custom App Dev',
      'iPaaS',
      'DevOps',
      'DevSecOps',
      'Hyperconverged',
      'Virtualization',
      'Collaboration',
      'Cybersecurity',
    ],
    []
  );

  const solutions = useMemo(
    () => [
      {
        id: 'call-center',
        kicker: 'Customer Experience',
        title: 'Call Center Setup & Management',
        illustrationType: 'call-center',
        summary:
          'Modern, user-friendly call center solutions designed to boost efficiency and customer loyalty.',
        details:
          'Advanced features like call reporting, access control, call recording, and more — built to streamline communication and deliver exceptional customer experiences.',
        bullets: ['Call reporting & analytics', 'Access control', 'Call recording'],
      },
      {
        id: 'ussd',
        kicker: 'Mobile Engagement',
        title: 'USSD Services',
        illustrationType: 'ussd',
        summary:
          'Fast, reliable mobile interactions — no internet required — for payments, registrations, surveys, and more.',
        details:
          'We design and integrate USSD menus tailored to your needs with seamless connectivity, strong security, and scalability for any volume of users.',
        bullets: ['Secure menu flows', 'Operator integrations', 'Scalable throughput'],
      },
      {
        id: 'network',
        kicker: 'Infrastructure',
        title: 'Network Design, Installation & Management',
        illustrationType: 'network',
        summary:
          'A secure, resilient network foundation built for growth — so your business can move faster with confidence.',
        details:
          'From on-site installations to enterprise deployments, we deploy best-practice architectures and components that keep your network efficient and ready for what’s next.',
        bullets: ['Secure design', 'Reliable deployments', 'Ongoing management'],
      },
      {
        id: 'pbx',
        kicker: 'Communication',
        title: 'IP PBX Installation & Management',
        illustrationType: 'pbx',
        summary:
          'Scalable VoIP PBX solutions with flexible telephony interfaces for your unique communication needs.',
        details:
          'Interfaces including FXS, FXO, GSM, and E1 — plus free user extensions, expansion for simultaneous calls, and advanced PBX features to keep costs low.',
        bullets: ['FXS/FXO/GSM/E1', 'Free extensions', 'Advanced PBX features'],
      },
      {
        id: 'dr',
        kicker: 'Resilience',
        title: 'WAN & Internet Disaster Recovery',
        illustrationType: 'dr',
        summary:
          'Keep your business online with LTE backups and secure IPSEC tunnels — built for 99.9% uptime.',
        details:
          'Automatic failover and resilient connectivity across locations. We design disaster recovery strategies that keep operations running even during provider outages.',
        bullets: ['LTE backup links', 'IPSEC tunnels', 'Automatic failover'],
      },
      {
        id: 'dev',
        kicker: 'Build & Integrate',
        title: 'Mobile App & Software Development',
        illustrationType: 'dev',
        summary:
          'Turn ideas into high-performing applications with sleek UX and reliable integrations.',
        details:
          'We plan, design, and build tailored solutions using leading technologies (Java, PHP, C++, iOS, Android) with seamless integration and performance as standard.',
        bullets: ['Product strategy', 'Sleek UI/UX', 'Reliable performance'],
      },
      {
        id: '247care',
        kicker: 'Managed IT',
        title: '247Care (Outsourced IT)',
        illustrationType: 'care',
        summary:
          'Flexible, cost-effective IT support without the overhead of in-house specialists.',
        details:
          'Tap into experienced IT professionals for daily maintenance, troubleshooting, and complex system management — on demand.',
        bullets: ['Daily support', 'System management', 'Lower overhead'],
      },
      {
        id: 'vps',
        kicker: 'Cloud',
        title: 'VPS Hosting',
        illustrationType: 'vps',
        summary:
          'Fast, secure, scalable VPS hosting with dedicated resources and strong uptime.',
        details:
          'Get full control, reliable performance, and expert support — built to grow with your business and protect your workloads.',
        bullets: ['Dedicated resources', 'Strong security', 'Expert support'],
      },
      {
        id: 'web',
        kicker: 'Digital Presence',
        title: 'Web Design & Email Hosting',
        illustrationType: 'web',
        summary:
          'Professional websites and branded email that build trust and elevate your brand.',
        details:
          'Secure, reliable hosting with always-on access — built to keep your website and email protected and available.',
        bullets: ['Modern web design', 'Branded email', 'Secure hosting'],
      },
    ],
    []
  );

  useEffect(() => {
    const updateScanHeight = () => setScanHeight(window.innerHeight || 900);
    updateScanHeight();
    window.addEventListener('resize', updateScanHeight);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('[data-animate="header"]'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('[data-animate="card"]'),
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Slow rotating background logo
      const bgLogo = sectionRef.current?.querySelector('[data-bg="logo"]');
      if (bgLogo) {
        gsap.to(bgLogo, {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        });
      }
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', updateScanHeight);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative py-24 px-6 min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Keep old anchor alive if needed */}
      <div id="features" className="absolute -top-24" />

      {/* Background (match Hero) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero-like orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(244, 125, 17, 0.3) 0%, transparent 70%)' }}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(244, 115, 58, 0.25) 0%, transparent 70%)' }}
          animate={{ y: [0, -35, 0], x: [0, -25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(244, 125, 17, 0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle 360 logo in the back */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <img
            src="/images/360-colour.png"
            alt=""
            aria-hidden="true"
            data-bg="logo"
            className="w-[860px] h-[860px] object-contain"
          />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Scan line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/40 to-transparent"
          animate={{ y: [0, scanHeight] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Hero-like particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12" data-reveal="up">
          <div
            data-animate="header"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20"
          >
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Solutions & Services</span>
          </div>

          <h2 data-animate="header" className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            You envision IT — we make IT happen.
          </h2>
          <p data-animate="header" className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            From fast support fixes for small businesses to full-scale enterprise rollouts, we deliver secure, tailored,
            cost-effective solutions that grow with you.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gray-900/20 backdrop-blur-md" data-reveal="clip">
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_30%,rgba(244,125,17,0.12),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(244,115,58,0.10),transparent_40%)]" />
          <div className="relative py-4">
            <motion.div
              className="flex gap-3 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {[...serviceMarquee, ...serviceMarquee].map((s, idx) => (
                <span
                  key={`${s}-${idx}`}
                  className="px-4 py-2 rounded-full border border-gray-800/60 bg-gray-950/20 text-sm text-gray-300"
                >
                  <span className="text-[#F47D11]">•</span> {s}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="stagger">
          {solutions.map((item) => (
            <div key={item.id} data-animate="card" data-reveal-child>
              <SolutionsCard
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              />
            </div>
          ))}
        </div>

        {/* Bottom promise row */}
        <div className="mt-14 grid lg:grid-cols-3 gap-6" data-reveal="stagger">
          {[
            {
              title: 'Secure by design',
              body: 'Security-first delivery across infrastructure, apps, and cloud — from policy to execution.',
            },
            {
              title: 'Built for reliability',
              body: 'Resilient networks, disaster recovery, and operational excellence that keep you online.',
            },
            {
              title: 'Tailored to your business',
              body: 'We adapt to your scale — startups to enterprise — with the same urgency and professionalism.',
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-800/60 bg-gray-900/20 backdrop-blur-md p-6"
              data-reveal-child
            >
              <div className="text-white font-semibold">{p.title}</div>
              <div className="mt-2 text-sm text-gray-300 leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;