import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Images from '../Images';

const AnimatedHeroImage = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMouse({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const parallaxX = (mouse.x - 0.5) * 30;
  const parallaxY = (mouse.y - 0.5) * 30;
  const rotateX = (mouse.y - 0.5) * -10;
  const rotateY = (mouse.x - 0.5) * 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: '600px', perspective: '1000px' }}
    >
      {/* Main Image Container */}
      <motion.div
        ref={imageRef}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          x: parallaxX,
          y: parallaxY,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F47D11]/20 to-[#F4733A]/20 blur-3xl rounded-full scale-110" />
        
        {/* Main Image with effects */}
        <div className="relative">
          <motion.img
            src={Images.hero_image}
            alt="SysUp360 Hero"
            className="w-full h-auto max-w-2xl rounded-2xl shadow-2xl"
            style={{
              filter: 'brightness(1.1) contrast(1.1)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#F47D11]/30" />
          
          {/* Floating elements */}
          <motion.div
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#F47D11] to-[#F4733A] rounded-2xl opacity-80 blur-sm"
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
            className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#F4733A] to-[#F47D11] rounded-full opacity-60 blur-md"
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
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#F47D11] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedHeroImage;
