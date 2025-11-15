/**
 * Motion utilities for accessibility and performance
 */

// Motion variant types for Framer Motion
interface MotionVariant {
  opacity?: number
  x?: number | string
  y?: number | string
  scale?: number
  rotate?: number
  transition?: MotionTransition
  [key: string]: unknown
}

interface MotionVariants {
  initial?: MotionVariant
  animate?: MotionVariant
  exit?: MotionVariant
  hover?: MotionVariant
  tap?: MotionVariant
  [key: string]: MotionVariant | undefined
}

interface MotionTransition {
  duration?: number
  delay?: number
  ease?: string | number[]
  type?: 'spring' | 'tween' | 'keyframes'
  stiffness?: number
  damping?: number
  [key: string]: unknown
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
};

// Create motion-safe variants that respect user preferences
export const createMotionSafeVariants = (variants: MotionVariants): MotionVariants => {
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
export const motionSafeTransition = (transition: MotionTransition): MotionTransition => {
    if (prefersReducedMotion()) {
        return { duration: 0 };
    }
    return transition;
};

// Performance optimization: Debounce scroll events
export const debounce = <T extends (...args: unknown[]) => unknown>(
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