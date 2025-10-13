// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

// Project card hover animation
export const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    },
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// 3D Tilt effect for cards
export const tiltEffect = {
  whileHover: {
    rotateX: 5,
    rotateY: 5,
    transformPerspective: 1000,
    transition: { duration: 0.3 }
  }
};

// Button animations
export const buttonHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Typing animation for text
export const typingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5
    }
  }
};

export const typingText = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1 }
  }
};

// Skill progress bar animation
export const progressBar = {
  initial: { width: 0 },
  animate: { width: "var(--progress-width)" },
  transition: { duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }
};

// Navigation animations
export const navItem = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const mobileMenuSlide = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Scroll-triggered animations
export const scrollFadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: 0.2 }
};

// Skills section animations
export const skillCardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
};

export const skillProgressVariants = {
  initial: { width: "0%" },
  animate: { 
    width: "var(--progress)",
    transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } 
  }
};

export const skillItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Navigation animations
export const logoVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

export const navItemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const mobileMenuVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }
};

export const navStaggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scrollSlideIn = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Hero section animations
export const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
};

// Floating animation for elements
export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};