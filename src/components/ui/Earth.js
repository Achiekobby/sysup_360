'use client';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '../../lib/utils';
const Earth = ({
  className,
  theta = 0.3,
  dark = 1,
  scale = 1.2,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  // Theme colors: #F47D11 (244, 125, 17) and #F4733A (244, 115, 58)
  baseColor = [0.9569, 0.4902, 0.0667], // #F47D11 in RGB 0-1
  markerColor = [0.9569, 0.4510, 0.2275], // #F4733A in RGB 0-1
  glowColor = [0.9569, 0.4510, 0.2275], // #F4733A in RGB 0-1
}) => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const phiRef = useRef(0);
  const lastTimeRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Only create globe once
    if (!globeRef.current) {
      let width = canvasRef.current.offsetWidth || 600;
      
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: theta,
        dark: dark,
        scale: scale,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          // Use refs to maintain continuous rotation across renders
          const now = performance.now();
          if (!lastTimeRef.current) {
            lastTimeRef.current = now;
          }
          const elapsed = Math.min((now - lastTimeRef.current) / 1000, 0.1); // Cap elapsed time to prevent jumps
          lastTimeRef.current = now;
          
          // Smooth continuous rotation - accumulate phi value
          phiRef.current += 0.1 * elapsed; // Rotate at 0.1 radians per second
          
          // Keep phi in 0-2π range without resetting (use modulo for smooth wrap)
          if (phiRef.current >= Math.PI * 2) {
            phiRef.current = phiRef.current % (Math.PI * 2);
          }
          
          state.phi = phiRef.current;
        },
      });
      
      globeRef.current = globe;
    }
    
    // Cleanup function
    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only create once to prevent flickering
  return (
    <div
      className={cn(
        'flex items-center justify-center z-10 w-full max-w-[600px] mx-auto',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
          display: 'block',
        }}
      />
    </div>
  );
};
export default Earth;
