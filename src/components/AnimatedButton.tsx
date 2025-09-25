'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Enhanced Animated Button with micro-interactions
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 shadow-md hover:shadow-lg focus:ring-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3.5 text-lg rounded-xl'
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.7 },
    animate: {
      scale: 4,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const ButtonComponent = href ? motion.a : motion.button;

  return (
    <ButtonComponent
      href={href}
      type={href ? undefined : type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      whileFocus={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 4,
            top: ripple.y - 4,
            width: 8,
            height: 8,
          }}
          variants={rippleVariants}
          initial="initial"
          animate="animate"
        />
      ))}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        whileHover={{
          opacity: [0, 1, 0],
          x: ['-100%', '100%'],
          transition: { duration: 0.6 }
        }}
      />

      <span className="relative z-10">{children}</span>
    </ButtonComponent>
  );
};

export default AnimatedButton;