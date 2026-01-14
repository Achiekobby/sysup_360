import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Images from '../Images';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [active, setActive] = useState('call-center');
  const [imageLoaded, setImageLoaded] = useState(false);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="overflow-hidden relative min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #16213e 50%, #1a1a2e 100%)',
      }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.4), transparent 70%)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.35), transparent 70%)' }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Scan line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F47D11]/50 to-transparent shadow-[0_0_20px_rgba(244,125,17,0.6)]"
          animate={{ y: [0, 1000] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
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
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6 py-16 mx-auto sm:py-24">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-16 max-w-4xl text-center sm:mb-20">
          {/* <motion.div
            data-animate="header"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/15 to-[#F4733A]/15 backdrop-blur-md px-6 py-3 rounded-full border border-[#F47D11]/30 mb-6"
          >
            <motion.div
              className="w-2 h-2 bg-[#F47D11] rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-bold tracking-wider text-[#F47D11] uppercase">Portfolio</span>
          </motion.div> */}

          <h2
            data-animate="header"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
          >
            <span className="block">What We</span>
            <span className="block bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent mt-2">
              Deliver
            </span>
          </h2>

          <p data-animate="header" className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            From infrastructure to innovation — explore our complete portfolio of IT solutions designed to transform how your business operates and grows.
          </p>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid gap-4 mx-auto max-w-7xl lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setImageLoaded(false);
              }}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 text-left ${
                active === item.id
                  ? 'lg:col-span-2 lg:row-span-2 border-[#F47D11]/60 bg-gradient-to-br from-gray-900/95 to-gray-800/95'
                  : 'border-gray-800/60 bg-gray-900/50 hover:border-[#F47D11]/30 hover:bg-gray-900/70'
              } backdrop-blur-xl`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                scale: active === item.id ? 1 : 1.02,
                y: active === item.id ? 0 : -4,
              }}
            >
              {/* Background glow effect */}
              {active === item.id && (
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(244,125,17,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(244,115,58,0.2), transparent 60%)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Active indicator */}
              {active === item.id && (
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#F47D11] shadow-lg shadow-[#F47D11]/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="relative p-5 sm:p-6">
                {/* Icon and header */}
                <div className="flex gap-4 justify-between items-start mb-4">
                  <div
                    className={`flex items-center justify-center rounded-xl transition-all duration-500 ${
                      active === item.id
                        ? 'w-16 h-16 bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/30 border-2 border-[#F47D11]/40 text-3xl'
                        : 'w-12 h-12 bg-gradient-to-br from-[#F47D11]/15 to-[#F4733A]/15 border border-[#F47D11]/20 text-2xl'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {active !== item.id && (
                    <div className="text-xs uppercase tracking-wider text-[#F47D11]/60">{item.kicker}</div>
                  )}
                </div>

                {/* Title and summary */}
                <div>
                  {active === item.id && (
                    <motion.div
                      className="text-xs uppercase tracking-wider text-[#F47D11] mb-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {item.kicker}
                    </motion.div>
                  )}
                  <h3
                    className={`font-black leading-tight transition-all duration-500 ${
                      active === item.id
                        ? 'text-2xl sm:text-3xl text-white mb-4'
                        : 'text-lg text-white group-hover:text-[#F47D11]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  
                  {active === item.id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <p className="mb-6 leading-relaxed text-gray-300">{item.details}</p>
                      
                      {/* Chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.chips.map((chip, i) => (
                          <motion.span
                            key={chip}
                            className="px-3 py-1.5 text-xs font-semibold text-[#F47D11] rounded-full bg-[#F47D11]/10 border border-[#F47D11]/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                          >
                            {chip}
                          </motion.span>
                        ))}
                      </div>

                      {/* Image */}
                      <motion.div
                        className="relative overflow-hidden rounded-xl border border-[#F47D11]/20 bg-gray-900/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={item.id}
                            src={item.img}
                            alt={item.title}
                            className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-contain"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: imageLoaded ? 1 : 0.5, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                            onLoad={() => setImageLoaded(true)}
                          />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none from-gray-900/30" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">{item.summary}</p>
                  )}
                </div>
              </div>

              {/* Decorative corner */}
              {active === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#F47D11] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-[#F47D11] to-transparent" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Bottom hint */}
        <motion.div
          className="flex justify-center items-center mt-12 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-[#F47D11]">•</span>
          <span className="ml-2">Click any service to explore details</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

