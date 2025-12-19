'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const phiRef = useRef(0);
  const lastTimeRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const resizeObserverRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Helper function to get canvas dimensions
  const getCanvasSize = () => {
    if (!canvasRef.current) return 800;
    const container = canvasRef.current.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      return Math.max(rect.width, rect.height, 500) || 800;
    }
    return canvasRef.current.offsetWidth || 800;
  };

  useEffect(() => {
    // Set mounted state to ensure client-side only rendering
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    // Initialize globe with proper dimensions
    const initGlobe = () => {
      if (!canvasRef.current || globeRef.current) return;

      // Wait for canvas to have proper dimensions
      const checkDimensions = () => {
        const width = getCanvasSize();
        if (width < 100) {
          // Canvas not ready yet, try again
          requestAnimationFrame(checkDimensions);
          return;
        }

        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
        const canvasWidth = width * devicePixelRatio;
        const canvasHeight = width * devicePixelRatio;

        // Set canvas actual size
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        // Set canvas display size
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${width}px`;

        try {
          const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: devicePixelRatio,
            width: canvasWidth,
            height: canvasHeight,
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
              const elapsed = Math.min((now - lastTimeRef.current) / 1000, 0.1);
              lastTimeRef.current = now;
              
              // Smooth continuous rotation - accumulate phi value
              phiRef.current += 0.1 * elapsed;
              
              // Keep phi in 0-2π range without resetting
              if (phiRef.current >= Math.PI * 2) {
                phiRef.current = phiRef.current % (Math.PI * 2);
              }
              
              state.phi = phiRef.current;
            },
          });
          
          globeRef.current = globe;
        } catch (error) {
          console.error('Error creating globe:', error);
        }
      };

      checkDimensions();
    };

    // Initialize globe after mount
    initGlobe();

    // Handle resize with debounce - recreate globe if size changes significantly
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (!canvasRef.current) return;
        
        const newWidth = getCanvasSize();
        if (newWidth < 100) return;

        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
        const currentWidth = globeRef.current ? (canvasRef.current.width / devicePixelRatio) : 0;
        const sizeDiff = Math.abs(currentWidth - newWidth);

        // Only recreate if size changed significantly (more than 50px) or globe doesn't exist
        if (!globeRef.current || sizeDiff > 50) {
          if (globeRef.current) {
            try {
              globeRef.current.destroy();
            } catch (error) {
              console.error('Error destroying globe on resize:', error);
            }
            globeRef.current = null;
          }
          initGlobe();
        }
      }, 150); // Debounce resize by 150ms
    };

    // Set up resize observer for better performance
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      const container = canvasRef.current.parentElement;
      if (container) {
        resizeObserverRef.current = new ResizeObserver(handleResize);
        resizeObserverRef.current.observe(container);
      }
    }

    // Fallback to window resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', handleResize);
      if (globeRef.current) {
        try {
          globeRef.current.destroy();
        } catch (error) {
          console.error('Error destroying globe:', error);
        }
        globeRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, theta, dark, scale, diffuse, mapSamples, mapBrightness]);
  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center justify-center z-10 w-full max-w-[900px] mx-auto',
        className
      )}
      style={{ minWidth: '500px', minHeight: '500px' }}
    >
      {isMounted ? (
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '900px',
            maxHeight: '900px',
            aspectRatio: '1',
            display: 'block',
            minWidth: '500px',
            minHeight: '500px',
          }}
        />
      ) : (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: '900px', 
            maxHeight: '900px',
            aspectRatio: '1',
            minWidth: '500px',
            minHeight: '500px',
          }}
        />
      )}
    </div>
  );
};

export default Earth;
