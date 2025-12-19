import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Images from '../Images';

gsap.registerPlugin(ScrollTrigger);

const ServiceShowcaseCard = ({ item, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? 'border-[#F47D11]/60 bg-white/70 shadow-xl'
          : 'border-white/10 bg-white/40 hover:bg-white/55'
      } backdrop-blur-md`}
    >
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_90%_60%,rgba(244,115,58,0.16),transparent_45%)]" />
      <div className="relative p-5 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F47D11]/25 to-[#F4733A]/25 border border-[#F47D11]/25 flex items-center justify-center text-xl">
          {item.icon}
        </div>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-gray-600">{item.kicker}</div>
          <div className="mt-1 font-semibold text-gray-900">{item.title}</div>
          <div className="mt-1 text-sm text-gray-700 line-clamp-2">{item.summary}</div>
        </div>
      </div>
    </button>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listARef = useRef(null);
  const listBRef = useRef(null);
  const previewRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [active, setActive] = useState('call-center');

  const items = useMemo(
    () => [
      {
        id: 'call-center',
        icon: '🎧',
        kicker: 'Customer Experience',
        title: 'Call Center Setup & Management',
        img: Images.call_center,
        summary:
          'Your customers are the heartbeat of your business — and how you engage with them can make all the difference.',
        details:
          'At SysUp360, we help you deliver exceptional customer experiences through our modern, user-friendly call center solutions. Equipped with advanced features like call reporting, access control, call recording, and more, our systems are designed to streamline communication, boost efficiency, and strengthen customer loyalty. Provide the kind of service that keeps customers coming back — powered by SysUp360.',
        chips: ['Reporting', 'Recording', 'Access Control'],
      },
      {
        id: 'ussd',
        icon: '📲',
        kicker: 'Mobile Engagement',
        title: 'USSD Services',
        img: Images.ussd_services,
        summary:
          'At SysUp360, we help businesses reach customers anywhere — no internet required.',
        details:
          'Our USSD solutions enable fast, reliable, and secure mobile interactions for everything from payments and registrations to balance checks and surveys. We design and integrate USSD menus tailored to your needs, ensuring seamless connectivity, strong security, and scalability for any volume of users. With SysUp360, you can deliver instant access and effortless engagement — anytime, on any device.',
        chips: ['No internet needed', 'Secure flows', 'Scalable'],
      },
      {
        id: 'networking',
        icon: '🛰️',
        kicker: 'Infrastructure',
        title: 'Network Design, Installation & Management',
        img: Images.networking,
        summary:
          'A strong, scalable, and reliable network is the backbone of every successful business.',
        details:
          'At SysUp360, we make sure your infrastructure sits on a foundation built for growth and resilience — so you can focus on what truly matters: driving your business forward. Our team leaves nothing to chance. We deploy only the best systems, components, and practices to ensure your network stays secure, efficient, and ready for whatever comes next.',
        chips: ['Design', 'Deployment', 'Management'],
      },
      {
        id: 'pbx',
        icon: '📞',
        kicker: 'Communication',
        title: 'IP PBX Installation & Management',
        img: Images.ip_pbx_installation_and_management,
        summary:
          'Stay connected and in control with our scalable and customizable VoIP PBX solutions.',
        details:
          'Our systems give your business the flexibility to tailor telephony interfaces — including FXS, FXO, GSM, and E1 — to fit your unique communication needs. As your business grows, your PBX grows with you. Enjoy free user extensions, the ability to expand external simultaneous calls, and a suite of advanced features — all built to keep your communication seamless and cost-effective right out of the box.',
        chips: ['FXS/FXO', 'GSM/E1', 'Scalable'],
      },
      {
        id: 'dr',
        icon: '🛡️',
        kicker: 'Resilience',
        title: 'WAN & Internet Disaster Recovery',
        img: Images.wan_internet_disaster_recovery,
        summary:
          "Your business can't afford to go offline — and with SysUp360, it won't.",
        details:
          "Our WAN and Internet Disaster Recovery solution ensures your network stays up and running, even when your main internet provider goes down. Using LTE backup links and secure IPSEC tunnels, we keep your offices and teams connected across any location with 99.9% uptime. It's seamless, automatic, and built to keep your business moving — no matter what.",
        chips: ['LTE Backup', 'IPSEC', 'Failover'],
      },
      {
        id: 'dev',
        icon: '⚙️',
        kicker: 'Build & Integrate',
        title: 'Mobile App & Software Development',
        img: Images.mobile_app_software_development,
        summary:
          'Turn your ideas into powerful digital solutions with our app and software development team.',
        details:
          'Our strategy and planning team works closely with you to design and build sleek, high-performing applications that drive business growth. We develop using leading technologies like Java, PHP, C++, iOS, and Android, all tailored to your business needs. Seamless integration, sleek design, and reliable performance come standard.',
        chips: ['Strategy', 'UI/UX', 'Integrations'],
      },
      {
        id: 'care',
        icon: '🧑‍💻',
        kicker: 'Managed IT',
        title: '247Care (Outsourced IT)',
        img: Images.outsourced_it_24_7,
        summary:
          'Run your business with confidence while we take care of your IT.',
        details:
          "SysUp360's 247Care Outsourced IT service gives you reliable, flexible and cost-effective support designed to fit your exact business needs. Instead of maintaining costly in-house specialists, you can tap into our team of experienced IT professionals — ready to handle everything from daily maintenance to complex system management. Get all the expertise you need, when you need it — without the overhead. That's smart IT, powered by SysUp360.",
        chips: ['24/7 Support', 'Cost-effective', 'Expert team'],
      },
      {
        id: 'vps',
        icon: '☁️',
        kicker: 'Cloud',
        title: 'VPS Hosting',
        img: Images.vps_hosting,
        summary:
          "Power your business with fast, secure and reliable VPS hosting from SysUp360.",
        details:
          "Enjoy dedicated resources, full control, and reliable uptime — all backed by strong security and expert support. Flexible, efficient, and built to grow with your business.",
        chips: ['Dedicated', 'Secure', 'Scalable'],
      },
      {
        id: 'web',
        icon: '🌐',
        kicker: 'Digital Presence',
        title: 'Web Design & Email Hosting',
        img: Images.web_design_and_email_hosting,
        summary:
          "First impressions matter — and your online presence says it all.",
        details:
          "With SysUp360's web design and email hosting solutions, you get a professional website and branded email that build trust and showcase your business as credible and ready for growth. Enjoy secure, reliable hosting and the peace of mind that your website and emails are protected and always accessible. Get started today and give your business the strong digital foundation it deserves.",
        chips: ['Brand trust', 'Secure hosting', 'Always-on'],
      },
    ],
    []
  );

  const activeItem = items.find((i) => i.id === active) || items[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      const headerEls = headerRef.current?.querySelectorAll('[data-animate="header"]') || [];
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const listA = listARef.current?.querySelectorAll('[data-animate="service-card"]') || [];
      const listB = listBRef.current?.querySelectorAll('[data-animate="service-card"]') || [];
      const preview = previewRef.current;

      gsap.fromTo(
        listA,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listARef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        preview,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        listB,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listBRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(1200px 800px at 20% 10%, rgba(244,125,17,0.22), transparent 55%), radial-gradient(900px 700px at 90% 40%, rgba(244,115,58,0.18), transparent 55%), linear-gradient(180deg, #fafafa 0%, #f5f7fb 50%, #eef2ff 100%)',
      }}
    >
      {/* Background motif */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(17,24,39,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,.6)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F47D11]/35 to-transparent"
          animate={{ y: [0, 900] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.25), transparent 60%)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -left-28 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.22), transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto relative z-10" data-reveal="up">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center">
          <div
            data-animate="header"
            className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-black/10"
          >
            <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
            <span className="text-gray-800 font-semibold text-sm tracking-wider">Our Solutions & Services</span>
          </div>

          <h2 data-animate="header" className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
            Our Solutions & Services
          </h2>
          <p data-animate="header" className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            At SysUp360, we don't just provide IT services — we tailor solutions that grow with your business. Our diverse team brings together a wide range of technical expertise, giving us the flexibility and edge to deliver exactly what you need, when you need it. From quick support fixes for small businesses to full-scale deployments and enterprise rollouts, we approach every project with precision, urgency, and professionalism. Ready to take your IT to the next level? Explore our offerings below and see how SysUp360 can keep your business moving forward.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start" data-reveal="stagger">
          {/* Left list */}
          <div ref={listARef} className="lg:col-span-5 space-y-3">
            {items.slice(0, 6).map((item) => (
              <div key={item.id} data-reveal-child data-animate="service-card">
                <ServiceShowcaseCard
                key={item.id}
                item={item}
                isActive={active === item.id}
                onClick={() => setActive(item.id)}
                />
              </div>
            ))}
          </div>

          {/* Right preview */}
          <div className="lg:col-span-7">
            <div
              ref={previewRef}
              className="relative rounded-3xl overflow-hidden border border-black/10 bg-white/40 backdrop-blur-md shadow-2xl"
              data-reveal-child
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,125,17,0.18),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(244,115,58,0.14),transparent_45%)]" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-600">{activeItem.kicker}</div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">{activeItem.title}</div>
                    <div className="mt-3 text-gray-700 leading-relaxed">{activeItem.details}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeItem.chips.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded-full bg-white/60 border border-black/10 text-sm text-gray-800"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F47D11]/20 to-[#F4733A]/20 border border-[#F47D11]/25 flex items-center justify-center text-xl">
                      {activeItem.icon}
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative rounded-2xl overflow-hidden border border-black/10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.img}
                      alt={activeItem.title}
                      className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/15 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Second row list (keeps layout balanced) */}
            <div ref={listBRef} className="mt-6 grid sm:grid-cols-2 gap-3" data-reveal="stagger">
              {items.slice(6).map((item) => (
                <div key={item.id} data-reveal-child data-animate="service-card">
                  <ServiceShowcaseCard
                    key={item.id}
                    item={item}
                    isActive={active === item.id}
                    onClick={() => setActive(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-gray-600">
            Tip: click any card to preview details + imagery.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

