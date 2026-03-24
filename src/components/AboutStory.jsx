import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Target } from 'lucide-react';

const AboutStory = () => {
  const sectionRef = useRef(null);
  const storyCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isStoryHovered, setIsStoryHovered] = useState(false);
  const [isMissionHovered, setIsMissionHovered] = useState(false);

  // Mouse tracking for 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 640);
    };
    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden relative px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
      style={{
        background:
          'radial-gradient(1200px 800px at 20% 10%, rgba(244,125,17,0.15), transparent 55%), radial-gradient(900px 700px at 90% 40%, rgba(244,115,58,0.12), transparent 55%), linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Enhanced Background */}
      <div className="overflow-hidden absolute inset-0">
        {/* Gradient Orbs - static */}
        <div
          className="hidden sm:block absolute top-20 right-20 w-[340px] h-[340px] lg:w-[500px] lg:h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244, 125, 17, 0.25) 0%, transparent 70%)' }}
        />
        <div
          className="hidden sm:block absolute bottom-20 left-20 w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244, 115, 58, 0.2) 0%, transparent 70%)' }}
        />
        <div
          className="hidden md:block absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 149, 0, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Animated Grid with pulse effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[#F47D11]/20" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[#F4733A]/20" />
      </div>

      <div className="container relative z-10 mx-auto">
        {/* Header - Matching Features.jsx style */}
        <div className="mx-auto mb-10 text-center max-w-8xl sm:mb-14 lg:mb-16" data-reveal="up">
          {/* <motion.div
            data-animate="about"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/15 to-[#F4733A]/15 backdrop-blur-md px-8 py-4 rounded-full border border-[#F47D11]/30 shadow-lg shadow-[#F47D11]/10 mb-6"
            whileHover={{ scale: 1.05, borderColor: 'rgba(244, 125, 17, 0.5)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="w-2.5 h-2.5 bg-[#F47D11] rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[#F47D11] font-bold text-base tracking-wider uppercase">
              About SysUp360
            </span>
            <motion.div
              className="w-2.5 h-2.5 bg-[#F4733A] rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div> */}

          <h2 
            data-animate="about" 
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 sm:mb-8"
          >
            <span className="block">About</span>
            <span className="block bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent mt-2">
              SysUp360
            </span>
          </h2>
          
          <div className="flex gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8" data-animate="about">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#F47D11]/50" />
            <div className="w-2 h-2 rounded-full bg-[#F47D11]/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#F47D11]/50" />
          </div>
        </div>

        {/* Main Content - Vertically Aligned */}
        <div className="flex relative flex-col gap-0 mx-auto mb-10 max-w-8xl sm:mb-14 lg:mb-16" data-reveal="stagger" style={{ perspective: '2000px' }}>
          {/* Our Story - Enhanced 3D Card */}
          <motion.div
            ref={storyCardRef}
            className="overflow-hidden relative z-10 p-5 rounded-2xl sm:rounded-3xl border backdrop-blur-xl group border-gray-800/60 sm:p-8 lg:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)',
              transformStyle: 'preserve-3d',
              rotateX: !isMobile && isStoryHovered ? rotateX : 0,
              rotateY: !isMobile && isStoryHovered ? rotateY : 0,
            }}
            onMouseMove={(e) => handleMouseMove(e, storyCardRef)}
            onMouseEnter={() => setIsStoryHovered(true)}
            onMouseLeave={() => {
              setIsStoryHovered(false);
              handleMouseLeave();
            }}
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.02,
                    z: 50,
                    transition: { type: 'spring', stiffness: 300, damping: 30 },
                  }
            }
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(135deg, #F47D11, #FF9500, #F4733A, #F47D11)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(244,125,17,0.25), transparent 60%), radial-gradient(circle at 100% 100%, rgba(244,115,58,0.2), transparent 60%)',
              }}
            />

            {/* Inner content wrapper */}
            <div className="relative p-4 bg-gradient-to-br rounded-2xl sm:rounded-3xl sm:p-6 lg:p-8 from-gray-900/95 to-gray-900/90" style={{ transform: isMobile ? 'translateZ(0px)' : 'translateZ(30px)' }}>
              {/* Animated Lucide Icon */}
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/30 border-2 border-[#F47D11]/40 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#F47D11]/20">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotateY: [0, 10, 0, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#F47D11]" strokeWidth={2.5} />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#F47D11]/20 blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#F47D11]/20 to-[#F4733A]/20 border border-[#F47D11]/30 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs uppercase tracking-widest text-[#F47D11] font-bold">Our Story</span>
              </motion.div>

              <h3 className="mb-4 text-xl sm:text-2xl font-black leading-tight text-white lg:text-3xl">
                We've built a team with diverse tech expertise, united by one goal.
              </h3>

              <p className="mb-6 text-sm sm:text-base leading-relaxed text-gray-300">
                From on-site installations and network deployments to VoIP PBX systems, USSD services, call centers, workstation and server maintenance, disaster recovery, WAN solutions, and app development — we've got you covered. Startups are especially close to our hearts because we believe every business deserves a fair shot at greatness. But our passion doesn't stop there — we bring the same energy, commitment, and professionalism to established brands too. No matter the size of the project, our team is driven by a shared dedication to quality and excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#F47D11]/20">
                <motion.div data-animate="stat" className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#F47D11] mb-1">10+</div>
                  <div className="text-xs tracking-wide text-gray-400 uppercase">Years</div>
                </motion.div>
                <motion.div data-animate="stat" className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#F47D11] mb-1">200+</div>
                  <div className="text-xs tracking-wide text-gray-400 uppercase">Projects</div>
                </motion.div>
                <motion.div data-animate="stat" className="text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#F47D11] mb-1">50+</div>
                  <div className="text-xs tracking-wide text-gray-400 uppercase">Clients</div>
                </motion.div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#F47D11]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#F4733A]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Seamless Connector Between Cards */}
          <div className="flex relative z-20 justify-center items-center py-5 sm:py-10 lg:py-12">
            {/* Vertical Connection Line with Particles */}
            <div className="flex relative flex-col items-center">
              {/* Glowing vertical line */}
              <motion.div 
                className="w-px h-20 sm:h-24 bg-gradient-to-b from-[#F47D11] via-[#F4733A] to-[#F47D11]"
                style={{
                  boxShadow: '0 0 20px rgba(244, 125, 17, 0.6), 0 0 40px rgba(244, 125, 17, 0.3)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />


              {/* Central pulsing node */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#F47D11] to-[#F4733A] flex items-center justify-center"
                style={{
                  boxShadow: '0 0 35px rgba(244, 125, 17, 0.9), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{
                    scale: [0.7, 1.3, 0.7],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Expanding rings with enhanced visuals */}
              {(!isMobile ? [0, 1, 2] : [0, 1]).map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '40px',
                    height: '40px',
                    border: `2px solid ${i === 0 ? '#F47D11' : i === 1 ? '#F4733A' : '#FF9500'}`,
                    boxShadow: `0 0 20px ${i === 0 ? 'rgba(244,125,17,0.4)' : i === 1 ? 'rgba(244,115,58,0.4)' : 'rgba(255,149,0,0.4)'}`,
                  }}
                  animate={{
                    scale: [1, 3, 3],
                    opacity: [0.8, 0.2, 0],
                    borderWidth: [2, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* Side decorative elements */}
              <motion.div
                className="hidden md:block absolute left-full ml-6 w-20 h-px"
                style={{
                  background: 'linear-gradient(90deg, rgba(244,125,17,0.8), rgba(244,125,17,0.4), transparent)',
                  boxShadow: '0 0 10px rgba(244,125,17,0.5)',
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="hidden md:block absolute right-full mr-6 w-20 h-px"
                style={{
                  background: 'linear-gradient(-90deg, rgba(244,115,58,0.8), rgba(244,115,58,0.4), transparent)',
                  boxShadow: '0 0 10px rgba(244,115,58,0.5)',
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>

          {/* Mission & Vision - Enhanced 3D Card */}
          <motion.div
            ref={missionCardRef}
            className="overflow-hidden relative z-10 p-5 rounded-2xl sm:rounded-3xl border backdrop-blur-xl group border-gray-800/60 sm:p-8 lg:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)',
              transformStyle: 'preserve-3d',
              rotateX: !isMobile && isMissionHovered ? rotateX : 0,
              rotateY: !isMobile && isMissionHovered ? rotateY : 0,
            }}
            onMouseMove={(e) => handleMouseMove(e, missionCardRef)}
            onMouseEnter={() => setIsMissionHovered(true)}
            onMouseLeave={() => {
              setIsMissionHovered(false);
              handleMouseLeave();
            }}
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.02,
                    z: 50,
                    transition: { type: 'spring', stiffness: 300, damping: 30 },
                  }
            }
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(135deg, #F4733A, #FF9500, #F47D11, #F4733A)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(244,115,58,0.25), transparent 60%), radial-gradient(circle at 100% 100%, rgba(244,125,17,0.2), transparent 60%)',
              }}
            />

            {/* Inner content wrapper */}
            <div className="relative p-4 bg-gradient-to-br rounded-2xl sm:rounded-3xl sm:p-6 lg:p-8 from-gray-900/95 to-gray-900/90" style={{ transform: isMobile ? 'translateZ(0px)' : 'translateZ(30px)' }}>
              {/* Animated Lucide Icon */}
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#F4733A]/30 to-[#F47D11]/30 border-2 border-[#F4733A]/40 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#F4733A]/20">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#F4733A]" strokeWidth={2.5} />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#F4733A]/20 blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#F4733A]/20 to-[#F47D11]/20 border border-[#F4733A]/30 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs uppercase tracking-widest text-[#F4733A] font-bold">Mission & Vision</span>
              </motion.div>

              <h3 className="mb-4 text-xl sm:text-2xl font-black leading-tight text-white lg:text-3xl">
                It's simple — to catalyze business transformation.
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                It's simple — to catalyze business transformation through secure, tailored, and cost-effective solutions that deliver real impact and keep us ahead of the curve.
              </p>

              {/* Decorative line */}
              <div className="mt-6 h-px bg-gradient-to-r from-[#F47D11]/50 via-transparent to-transparent" />

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#F4733A]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#F47D11]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>

        {/* Additional Visual Element - Animated Timeline or Connection */}
        <div className="hidden sm:flex gap-6 justify-center items-center mx-auto mb-8 max-w-6xl">
          <motion.div
            className="flex-1 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(244,125,17,0.6), rgba(244,125,17,0.3), transparent)',
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <motion.div
              className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F47D11] to-[#F4733A] shadow-xl shadow-[#F47D11]/60"
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F47D11] to-[#F4733A]"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          <motion.div
            className="flex-1 h-px"
            style={{
              background: 'linear-gradient(-90deg, transparent, rgba(244,125,17,0.6), rgba(244,125,17,0.3), transparent)',
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2,
              ease: 'easeInOut'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
