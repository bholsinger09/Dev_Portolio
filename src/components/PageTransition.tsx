'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Page Transition Wrapper with smooth animations and scroll behavior
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target?.href && target.href.includes('#')) {
        e.preventDefault();
        const targetId = target.href.split('#')[1];
        const element = document.getElementById(targetId);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    };

    // Add click listeners to all anchor links
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1
      }
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="min-h-screen"
      >
        {/* Gradient overlay for smooth transitions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 pointer-events-none z-0"
        />
        
        {/* Main content with staggered animations */}
        <motion.div
          variants={childVariants}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {/* Floating cursor follower for desktop */}
        <CursorFollower />
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Cursor Following Effect for Enhanced Interactivity
 */
const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    document.addEventListener('mousemove', handleMouseMove);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-6 h-6 bg-white rounded-full opacity-80" />
      </motion.div>

      {/* Trailing cursor effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 mix-blend-multiply hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0.8 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60" />
      </motion.div>
    </>
  );
};

export default PageTransition;