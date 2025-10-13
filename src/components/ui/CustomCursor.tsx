'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorTrail extends CursorPosition {
  id: number;
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);

  // Update cursor position
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setCursorPosition(newPosition);
      setIsVisible(true);

      // Add trail point
      setTrails(prev => {
        const newTrail = { ...newPosition, id: trailIdRef.current++ };
        const updatedTrails = [newTrail, ...prev.slice(0, 15)]; // Keep last 15 trail points
        return updatedTrails;
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Handle hover states for different elements
  useEffect(() => {
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [data-cursor="pointer"]')) {
        setIsHovering(true);
        setCursorVariant('button');
      } else if (target.matches('input, textarea, [data-cursor="text"]')) {
        setIsHovering(true);
        setCursorVariant('text');
      } else if (target.matches('[data-cursor="view"]')) {
        setIsHovering(true);
        setCursorVariant('view');
      } else if (target.matches('.project-card, .skill-card, [data-cursor="hover"]')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Cursor variants for different states
  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: '#3b82f6',
      mixBlendMode: 'difference' as const,
      border: '2px solid #3b82f6',
    },
    button: {
      scale: 1.5,
      backgroundColor: '#10b981',
      mixBlendMode: 'difference' as const,
      border: '2px solid #10b981',
    },
    text: {
      scale: 0.8,
      backgroundColor: '#8b5cf6',
      mixBlendMode: 'difference' as const,
      border: '2px solid #8b5cf6',
    },
    view: {
      scale: 2,
      backgroundColor: 'transparent',
      border: '2px solid #ef4444',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      scale: 1.8,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid #3b82f6',
      mixBlendMode: 'normal' as const,
    }
  };

  // Don't render on mobile devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        button, a, input, textarea {
          cursor: none !important;
        }
      `}</style>

      {/* Cursor trails */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9999]">
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ 
              x: trail.x - 2, 
              y: trail.y - 2, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0, 
              opacity: 0,
              x: trail.x - 2,
              y: trail.y - 2,
            }}
            transition={{ 
              duration: 1.2,
              delay: index * 0.02,
              ease: "easeOut"
            }}
            style={{
              mixBlendMode: 'difference'
            }}
          />
        ))}
      </div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-4 h-4 rounded-full"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          ...cursorVariants[cursorVariant as keyof typeof cursorVariants]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor hover text */}
      <AnimatePresence>
        {cursorVariant === 'view' && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10001] text-white text-sm font-bold bg-black px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursorPosition.x + 20,
              y: cursorPosition.y - 30,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            View Project
          </motion.div>
        )}
        
        {cursorVariant === 'button' && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10001] text-white text-sm font-bold bg-green-600 px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursorPosition.x + 20,
              y: cursorPosition.y - 30,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            Click Me
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor particles on click */}
      <ClickParticles cursorPosition={cursorPosition} />
    </>
  );
};

// Click particles effect
const ClickParticles = ({ cursorPosition }: { cursorPosition: CursorPosition }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleClick = () => {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: particleIdRef.current++,
        x: cursorPosition.x,
        y: cursorPosition.y,
      }));
      
      setParticles(prev => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [cursorPosition]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9998]">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ 
            x: particle.x - 4, 
            y: particle.y - 4, 
            scale: 1, 
            opacity: 1 
          }}
          animate={{ 
            x: particle.x - 4 + (Math.cos(index * 45 * Math.PI / 180) * 50),
            y: particle.y - 4 + (Math.sin(index * 45 * Math.PI / 180) * 50),
            scale: 0, 
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;