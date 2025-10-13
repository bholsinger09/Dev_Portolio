/**
 * Motion utilities for accessibility and performance
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Create motion-safe variants that respect user preferences
export const createMotionSafeVariants = (variants: any) => {
  if (prefersReducedMotion()) {
    // Return static variants with no animation
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 }
    };
  }
  return variants;
};

// Motion-safe transition that respects user preferences
export const motionSafeTransition = (transition: any) => {
  if (prefersReducedMotion()) {
    return { duration: 0 };
  }
  return transition;
};

// Performance optimization: Debounce scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Intersection Observer options for better performance
export const intersectionObserverOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};