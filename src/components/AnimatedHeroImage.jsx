import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Earth from './ui/Earth';

const AnimatedHeroImage = () => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: '600px' }}
    >
      {/* Main Image Container - Isolated for Earth component */}
      <div
        ref={imageRef}
        className="relative"
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F47D11]/20 to-[#F4733A]/20 blur-3xl rounded-full scale-110" />
        
        {/* Main Image with effects */}
        <div className="relative">
          {/* <motion.img
            src={Images.hero_image}
            alt="SysUp360 Hero"
            className="w-full h-auto max-w-2xl rounded-2xl shadow-2xl"
            style={{
              filter: 'brightness(1.1) contrast(1.1)',
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          /> */}
          <Earth />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#F47D11]/30 pointer-events-none" />
          
          {/* Floating elements - moved outside Earth container to avoid interference */}
          <motion.div
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#F47D11] to-[#F4733A] rounded-2xl opacity-80 blur-sm pointer-events-none"
            style={{ willChange: 'transform', zIndex: 1 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#F4733A] to-[#F47D11] rounded-full opacity-60 blur-md pointer-events-none"
            style={{ willChange: 'transform', zIndex: 1 }}
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Floating particles - optimized with useMemo */}
      {useMemo(() => {
        return [...Array(15)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = 3 + Math.random() * 2;
          const delay = Math.random() * 2;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#F47D11] rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            />
          );
        });
      }, [])}
    </div>
  );
};

export default AnimatedHeroImage;
