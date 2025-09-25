'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Scroll-triggered animation component with multiple reveal directions
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once
  });

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatedState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getAnimatedState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredRevealProps {
  children: React.ReactNode[];
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Staggered scroll-triggered animations for lists of items
 */
const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  direction = 'up',
  staggerDelay = 0.1,
  duration = 0.6,
  distance = 50,
  className = '',
  itemClassName = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const getItemVariants = () => {
    const initial = (() => {
      switch (direction) {
        case 'up':
          return { opacity: 0, y: distance };
        case 'down':
          return { opacity: 0, y: -distance };
        case 'left':
          return { opacity: 0, x: distance };
        case 'right':
          return { opacity: 0, x: -distance };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        case 'fade':
        default:
          return { opacity: 0 };
      }
    })();

    const animate = (() => {
      switch (direction) {
        case 'up':
        case 'down':
          return { opacity: 1, y: 0 };
        case 'left':
        case 'right':
          return { opacity: 1, x: 0 };
        case 'scale':
          return { opacity: 1, scale: 1 };
        case 'fade':
        default:
          return { opacity: 1 };
      }
    })();

    return {
      hidden: initial,
      visible: {
        ...animate,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1] as const
        }
      }
    };
  };

  const itemVariants = getItemVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Animated counter that triggers when scrolled into view
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(start);

  React.useEffect(() => {
    if (!isInView) return;

    const increment = (end - start) / (duration * 60); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export { ScrollReveal, StaggeredReveal, AnimatedCounter };