import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Users, Code, Zap, Settings, MessageSquare, Headphones } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.22) 0%, transparent 60%)' }}
          animate={{ y: [0, 30, 0], x: [0, 18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 left-0 w-[560px] h-[560px] rounded-full blur-3xl opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.20) 0%, transparent 60%)' }}
          animate={{ y: [0, -35, 0], x: [0, -22, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="container mx-auto relative z-10"
        data-reveal="clip"
      >
        <div className="max-w-8xl mx-auto rounded-3xl border border-gray-800/60 bg-gray-900/25 backdrop-blur-md overflow-hidden">
          <div className="p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Phone Number Display */}
            <div className="rounded-2xl border border-gray-800/60 bg-gray-950/20 p-8 flex flex-col">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20 w-fit">
                <Phone className="w-4 h-4 text-[#F47D11]" strokeWidth={2.5} />
                <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Call</span>
              </div>

              {/* Animated Illustration */}
              <div className="mt-8 mb-8 flex justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Rotating background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#F47D11]/10"
                    animate={{
                      rotate: [0, 360],
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

                  {/* Orbiting Icons */}
                  {[
                    { Icon: Headphones, angle: 0, color: '#F47D11' },
                    { Icon: MessageSquare, angle: 60, color: '#F4733A' },
                    { Icon: Users, angle: 120, color: '#F47D11' },
                    { Icon: Settings, angle: 180, color: '#F4733A' },
                    { Icon: Code, angle: 240, color: '#F47D11' },
                    { Icon: Zap, angle: 300, color: '#F4733A' },
                  ].map(({ Icon, angle, color }, i) => {
                    const radius = 100;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <React.Fragment key={i}>
                        {/* Connection Lines */}
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
                        
                        {/* Icon Nodes */}
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
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2 + (i * 0.2),
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.15,
                            }}
                          >
                            <motion.div
                              className="p-2 rounded-lg bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm shadow-lg"
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
                                className="w-4 h-4"
                                style={{ color }}
                                strokeWidth={2}
                              />
                            </motion.div>
                            
                            {/* Pulsing glow */}
                            <motion.div
                              className="absolute inset-0 rounded-lg blur-lg -z-10"
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

                  {/* Central Phone Icon */}
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
                    <Phone className="w-8 h-8 text-[#F47D11]" strokeWidth={2.5} />
                  </motion.div>

                  {/* Floating Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
                      style={{
                        left: `${25 + (i * 8)}%`,
                        top: `${20 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 2.5 + (i % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    />
                  ))}

                  {/* Outer rotating ring */}
                  <motion.div
                    className="absolute w-52 h-52 rounded-full border border-[#F47D11]/15"
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    {[0, 90, 180, 270].map((angle, i) => (
                      <motion.div
                        key={angle}
                        className="absolute w-1.5 h-1.5 bg-[#F47D11] rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${angle}deg) translateY(-104px) translateX(-50%)`,
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
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-3">
                  Call us directly
                </div>
                <motion.a
                  href="tel:+233303965398"
                  className="inline-block text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent hover:from-[#FF9500] hover:via-[#F47D11] hover:to-[#FF9500] transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  +233 303 965 398
                </motion.a>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gray-900/50 border border-gray-800/60">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="text-sm text-gray-300 font-medium">
                    Available Mon-Fri, 8AM-5PM GMT
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-2 text-center">
                <div className="text-sm text-gray-400 uppercase tracking-widest">
                  Email us
                </div>
                <motion.a
                  href="mailto:hello@sysup360.com"
                  className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-[#F47D11] hover:text-[#FF9500] transition-colors break-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-5 h-5 shrink-0 text-[#F47D11]" strokeWidth={2} />
                  hello@sysup360.com
                </motion.a>
              </div>

              <div className="mt-6 space-y-1 text-center">
                <p className="text-sm text-gray-400">
                  Speak directly with our technical team
                </p>
                <p className="text-xs text-gray-500">
                  For urgent support or project inquiries
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F47D11]/10 to-[#F4733A]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#F47D11]/20">
                <div className="w-2 h-2 bg-[#F47D11] rounded-full animate-pulse" />
                <span className="text-[#F47D11] font-semibold text-sm tracking-wider">Contact</span>
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Let's plan your next deployment.
              </h2>
              <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                Call or email us to discuss what you're building — call center, USSD, cloud/VPS, network rollout, disaster recovery, or app development. We'll respond with a clear plan.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 gap-6">
                {[
                  { label: 'Fast response', value: 'We typically reply to calls and emails within 1 business day.' },
                  { label: 'Security-first', value: 'Built with best practices from day one.' },
                  { label: 'Built to scale', value: 'From startups to enterprise rollouts.' },
                  { label: 'Direct contact', value: 'Call or email — no forms, just a clear conversation.' },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl border border-gray-800/60 bg-gray-900/20 p-4">
                    <div className="text-white font-semibold">{row.label}</div>
                    <div className="text-sm text-gray-300 mt-1">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
