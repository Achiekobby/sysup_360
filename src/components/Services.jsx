import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Headphones, 
  Smartphone, 
  Network, 
  Phone, 
  Shield, 
  Code, 
  Users, 
  Cloud, 
  Globe,
  Radio,
  Server,
  Router,
  FileCode,
  Terminal,
  GitBranch,
  Layers,
  Globe2,
  Mail,
  Monitor
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom Animated Illustration Component for each service
const ServiceIllustration = ({ serviceId }) => {
  const illustrations = {
    'call-center': (
      <div className="flex relative justify-center items-center w-full h-full">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Headphones */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Headphones className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Sound waves radiating outward */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-transparent via-[#F47D11] to-transparent rounded-full"
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            </motion.div>
          );
        })}

        {/* Call indicators */}
        {[0, 90, 180, 270].map((angle, i) => {
          const radius = 100;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={`call-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <Phone className="w-5 h-5 text-[#F47D11]" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    ),

    'ussd': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Phone */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Smartphone className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Signal waves */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const radius = 70 + (i % 3) * 15;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <motion.div
                className="w-2 h-2 bg-[#F47D11] rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          );
        })}

        {/* USSD Menu indicators */}
        {[0, 120, 240].map((angle, i) => {
          const radius = 110;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={`menu-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <motion.div
                className="px-3 py-1.5 rounded-lg bg-gray-800/80 border border-[#F47D11]/40 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                <Radio className="w-4 h-4 text-[#F47D11]" strokeWidth={2} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    ),

    'networking': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Hub */}
        <motion.div
          className="relative z-10 w-20 h-20 rounded-full border-4 border-[#F47D11]/50 bg-gradient-to-br from-[#F47D11]/20 to-[#F4733A]/10"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
          transition={{ scale: { duration: 3, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
        >
          <div className="flex absolute inset-0 justify-center items-center">
            <Network className="w-8 h-8 text-[#F47D11]" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Network Nodes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const radius = 100;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <React.Fragment key={i}>
              {/* Connection Line */}
              <div
                className="absolute w-px bg-gradient-to-b from-transparent via-[#F47D11]/30 to-transparent"
                style={{
                  height: `${radius}px`,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: 'top center',
                }}
              />
              
              {/* Node */}
              <motion.div
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
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                    <Router className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#F47D11]/30 blur-md -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.15,
                    }}
                  />
                </motion.div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Data flow particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          const radius = 60 + (i % 3) * 20;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * radius, Math.cos(angle) * radius * 1.5],
                y: [0, Math.sin(angle) * radius, Math.sin(angle) * radius * 1.5],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>
    ),

    'pbx': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central PBX System */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Phone className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Extension lines and phones */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const radius = 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <React.Fragment key={i}>
              <div
                className="absolute w-px bg-gradient-to-b from-transparent via-[#F47D11]/25 to-transparent"
                style={{
                  height: `${radius}px`,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: 'top center',
                }}
              />
              <motion.div
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
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                >
                  <div className="p-2.5 rounded-lg bg-gray-800/80 border border-[#F47D11]/40">
                    <Phone className="w-4 h-4 text-[#F47D11]" strokeWidth={2.5} />
                  </div>
                </motion.div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Call routing indicators */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          return (
            <motion.div
              key={`route-${i}`}
              className="absolute w-1 h-1 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 60, Math.cos(angle) * 100],
                y: [0, Math.sin(angle) * 60, Math.sin(angle) * 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>
    ),

    'dr': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Shield */}
        <motion.div
          className="relative z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Shield className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Backup systems - dual redundancy */}
        {[0, 120, 240].map((angle, i) => {
          const radius = 100;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
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
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                  <Server className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
                {/* Connection line */}
                <div
                  className="absolute w-px h-20 bg-gradient-to-b from-[#F47D11]/30 to-transparent"
                  style={{
                    left: '50%',
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Failover indicators */}
        {[...Array(4)].map((_, i) => {
          const angle = (i * 90) * Math.PI / 180;
          return (
            <motion.div
              key={`failover-${i}`}
              className="absolute w-2 h-2 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 80],
                y: [0, Math.sin(angle) * 80],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          );
        })}
      </div>
    ),

    'dev': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Code Icon */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Code className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Development tools orbiting */}
        {[
          { Icon: FileCode, angle: 0 },
          { Icon: Terminal, angle: 72 },
          { Icon: GitBranch, angle: 144 },
          { Icon: Layers, angle: 216 },
          { Icon: Monitor, angle: 288 },
        ].map(({ Icon, angle }, i) => {
          const radius = 95;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
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
                  scale: [1, 1.25, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Code syntax particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`syntax-${i}`}
            className="absolute text-[#F47D11] text-xs font-mono"
            style={{
              left: `${20 + (i * 8)}%`,
              top: `${15 + (i % 4) * 25}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          >
            {['<', '/', '>', '{', '}', '(', ')', ';', '=', '['][i % 10]}
          </motion.div>
        ))}
      </div>
    ),

    'care': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Team Icon */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Users className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Support team members */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const radius = 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
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
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
                {/* Connection to center */}
                <div
                  className="absolute w-px bg-gradient-to-b from-[#F47D11]/20 to-transparent"
                  style={{
                    height: `${radius}px`,
                    left: '50%',
                    bottom: '100%',
                    transform: `translateX(-50%) rotate(${-angle}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Support indicators */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          return (
            <motion.div
              key={`support-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 70, Math.cos(angle) * 110],
                y: [0, Math.sin(angle) * 70, Math.sin(angle) * 110],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>
    ),

    'vps': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Cloud */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Cloud className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Server clusters */}
        {[0, 90, 180, 270].map((angle, i) => {
          const radius = 100;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
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
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                  <Server className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
                {/* Connection line */}
                <div
                  className="absolute w-px h-20 bg-gradient-to-b from-[#F47D11]/25 to-transparent"
                  style={{
                    left: '50%',
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Data flow */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          return (
            <motion.div
              key={`data-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 80, Math.cos(angle) * 120],
                y: [0, Math.sin(angle) * 80, Math.sin(angle) * 120],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>
    ),

    'web': (
      <div className="flex relative justify-center items-center w-full h-full">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(244,125,17,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,0.3)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        {/* Central Globe */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/20 border-2 border-[#F47D11]/50 shadow-2xl">
            <Globe className="w-16 h-16 text-[#F47D11]" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Web elements */}
        {[
          { Icon: Globe2, angle: 0 },
          { Icon: Mail, angle: 90 },
          { Icon: Monitor, angle: 180 },
          { Icon: Layers, angle: 270 },
        ].map(({ Icon, angle }, i) => {
          const radius = 95;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
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
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-[#F47D11]/40 backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-[#F47D11]" strokeWidth={2} />
                </div>
                {/* Connection line */}
                <div
                  className="absolute w-px h-20 bg-gradient-to-b from-[#F47D11]/25 to-transparent"
                  style={{
                    left: '50%',
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Digital presence indicators */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          return (
            <motion.div
              key={`web-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#F47D11] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 70, Math.cos(angle) * 110],
                y: [0, Math.sin(angle) * 70, Math.sin(angle) * 110],
                opacity: [0, 1, 0],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.25,
              }}
            />
          );
        })}
      </div>
    ),
  };

  return illustrations[serviceId] || <div />;
};

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [active, setActive] = useState('call-center');
  const [isMobile, setIsMobile] = useState(false);

  const items = useMemo(
    () => [
      {
        id: 'call-center',
        icon: Headphones,
        kicker: 'Customer Experience',
        title: 'Call Center Setup & Management',
        summary:
          'Your customers are the heartbeat of your business — and how you engage with them can make all the difference.',
        details:
          'At SysUp360, we help you deliver exceptional customer experiences through our modern, user-friendly call center solutions. Equipped with advanced features like call reporting, access control, call recording, and more, our systems are designed to streamline communication, boost efficiency, and strengthen customer loyalty. Provide the kind of service that keeps customers coming back — powered by SysUp360.',
        chips: ['Reporting', 'Recording', 'Access Control'],
      },
      {
        id: 'ussd',
        icon: Smartphone,
        kicker: 'Mobile Engagement',
        title: 'USSD Services',
        summary:
          'At SysUp360, we help businesses reach customers anywhere — no internet required.',
        details:
          'Our USSD solutions enable fast, reliable, and secure mobile interactions for everything from payments and registrations to balance checks and surveys. We design and integrate USSD menus tailored to your needs, ensuring seamless connectivity, strong security, and scalability for any volume of users. With SysUp360, you can deliver instant access and effortless engagement — anytime, on any device.',
        chips: ['No internet needed', 'Secure flows', 'Scalable'],
      },
      {
        id: 'networking',
        icon: Network,
        kicker: 'Infrastructure',
        title: 'Network Design, Installation & Management',
        summary:
          'A strong, scalable, and reliable network is the backbone of every successful business.',
        details:
          'At SysUp360, we make sure your infrastructure sits on a foundation built for growth and resilience — so you can focus on what truly matters: driving your business forward. Our team leaves nothing to chance. We deploy only the best systems, components, and practices to ensure your network stays secure, efficient, and ready for whatever comes next.',
        chips: ['Design', 'Deployment', 'Management'],
      },
      {
        id: 'pbx',
        icon: Phone,
        kicker: 'Communication',
        title: 'IP PBX Installation & Management',
        summary:
          'Stay connected and in control with our scalable and customizable VoIP PBX solutions.',
        details:
          'Our systems give your business the flexibility to tailor telephony interfaces — including FXS, FXO, GSM, and E1 — to fit your unique communication needs. As your business grows, your PBX grows with you. Enjoy free user extensions, the ability to expand external simultaneous calls, and a suite of advanced features — all built to keep your communication seamless and cost-effective right out of the box.',
        chips: ['FXS/FXO', 'GSM/E1', 'Scalable'],
      },
      {
        id: 'dr',
        icon: Shield,
        kicker: 'Resilience',
        title: 'WAN & Internet Disaster Recovery',
        summary:
          "Your business can't afford to go offline — and with SysUp360, it won't.",
        details:
          "Our WAN and Internet Disaster Recovery solution ensures your network stays up and running, even when your main internet provider goes down. Using LTE backup links and secure IPSEC tunnels, we keep your offices and teams connected across any location with 99.9% uptime. It's seamless, automatic, and built to keep your business moving — no matter what.",
        chips: ['LTE Backup', 'IPSEC', 'Failover'],
      },
      {
        id: 'dev',
        icon: Code,
        kicker: 'Build & Integrate',
        title: 'Mobile App & Software Development',
        summary:
          'Turn your ideas into powerful digital solutions with our app and software development team.',
        details:
          'Our strategy and planning team works closely with you to design and build sleek, high-performing applications that drive business growth. We develop using leading technologies like Java, PHP, C++, iOS, and Android, all tailored to your business needs. Seamless integration, sleek design, and reliable performance come standard.',
        chips: ['Strategy', 'UI/UX', 'Integrations'],
      },
      {
        id: 'care',
        icon: Users,
        kicker: 'Managed IT',
        title: '247Care (Outsourced IT)',
        summary:
          'Run your business with confidence while we take care of your IT.',
        details:
          "SysUp360's 247Care Outsourced IT service gives you reliable, flexible and cost-effective support designed to fit your exact business needs. Instead of maintaining costly in-house specialists, you can tap into our team of experienced IT professionals — ready to handle everything from daily maintenance to complex system management. Get all the expertise you need, when you need it — without the overhead. That's smart IT, powered by SysUp360.",
        chips: ['24/7 Support', 'Cost-effective', 'Expert team'],
      },
      {
        id: 'vps',
        icon: Cloud,
        kicker: 'Cloud',
        title: 'VPS Hosting',
        summary:
          "Power your business with fast, secure and reliable VPS hosting from SysUp360.",
        details:
          "Enjoy dedicated resources, full control, and reliable uptime — all backed by strong security and expert support. Flexible, efficient, and built to grow with your business.",
        chips: ['Dedicated', 'Secure', 'Scalable'],
      },
      {
        id: 'web',
        icon: Globe,
        kicker: 'Digital Presence',
        title: 'Web Design & Email Hosting',
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
    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener('resize', updateViewport);

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

      // Background logo: circular spinning + scroll-driven movement (match Features)
      const bgLogoWrap = el.querySelector('[data-bg-wrap="logo"]');
      const bgLogo = el.querySelector('[data-bg="logo"]');
      if (bgLogo) {
        gsap.to(bgLogo, {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        });
      }
      if (bgLogoWrap) {
        gsap.fromTo(
          bgLogoWrap,
          { y: 120 },
          {
            y: -120,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', updateViewport);
      ctx.revert();
    };
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Static gradient orbs */}
        <div
          className="hidden sm:block absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(244,125,17,0.35), transparent 70%)' }}
        />
        <div
          className="hidden sm:block absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(244,115,58,0.3), transparent 70%)' }}
        />

        {/* Faded glassmorphism + spinning 360 logo with scroll movement (like Features) */}
        <div
          data-bg-wrap="logo"
          className="hidden lg:flex absolute inset-0 items-center justify-center overflow-hidden pointer-events-none"
        >
          <div className="absolute w-[900px] h-[900px] rounded-full backdrop-blur-2xl bg-gray-900/50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" aria-hidden="true" />
          <img
            src="/images/360-colour.png"
            alt=""
            aria-hidden="true"
            data-bg="logo"
            className="relative w-[860px] h-[860px] object-contain opacity-[0.035]"
          />
        </div>
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,125,17,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(244,125,17,.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
      </div>

      <div className="container relative z-10 px-4 sm:px-6 py-14 sm:py-16 md:py-20 lg:py-24 mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-12 max-w-4xl text-center sm:mb-20">
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
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5 sm:mb-6"
          >
            <span className="block">What We</span>
            <span className="block bg-gradient-to-r from-[#F47D11] via-[#F4733A] to-[#F47D11] bg-clip-text text-transparent mt-2">
              Deliver
            </span>
          </h2>

          <p data-animate="header" className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 sm:text-xl">
            From infrastructure to innovation — explore our complete portfolio of IT solutions designed to transform how your business operates and grows.
          </p>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid gap-4 mx-auto max-w-7xl lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setActive(item.id)}
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
                  <motion.div
                    className={`flex items-center justify-center rounded-xl transition-all duration-500 ${
                      active === item.id
                        ? 'w-16 h-16 bg-gradient-to-br from-[#F47D11]/30 to-[#F4733A]/30 border-2 border-[#F47D11]/40'
                        : 'w-12 h-12 bg-gradient-to-br from-[#F47D11]/15 to-[#F4733A]/15 border border-[#F47D11]/20'
                    }`}
                    animate={
                      active === item.id
                        ? {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.div
                      animate={
                        active === item.id
                          ? {
                              y: [0, -3, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <item.icon
                        className={`transition-all duration-500 ${
                          active === item.id
                            ? 'w-8 h-8 text-[#F47D11]'
                            : 'w-6 h-6 text-[#F47D11]/80 group-hover:text-[#F47D11]'
                        }`}
                        strokeWidth={active === item.id ? 2 : 1.5}
                      />
                    </motion.div>
                  </motion.div>
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

                      {/* Custom Animated Illustration */}
                      <motion.div
                        className="relative overflow-hidden rounded-xl border border-[#F47D11]/20 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-12 sm:p-16"
                        style={{ minHeight: isMobile ? '220px' : '300px' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={item.id}
                            className="w-full h-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          >
                            <ServiceIllustration serviceId={item.id} />
                          </motion.div>
                        </AnimatePresence>
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

