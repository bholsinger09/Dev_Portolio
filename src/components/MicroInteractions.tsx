'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, AlertCircle, Send } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'gray';
  text?: string;
}

/**
 * Animated loading spinner with customizable size and color
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    gray: 'text-gray-600'
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      {text && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};

interface StatusIndicatorProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  successText?: string;
  errorText?: string;
  loadingText?: string;
  className?: string;
}

/**
 * Animated status indicator with icon transitions
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  successText = 'Success!',
  errorText = 'Error occurred',
  loadingText = 'Loading...',
  className = ''
}) => {
  const variants = {
    idle: { scale: 0, opacity: 0 },
    loading: { scale: 1, opacity: 1 },
    success: { scale: 1, opacity: 1 },
    error: { scale: 1, opacity: 1 }
  };

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <LoadingSpinner size="sm" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getText = () => {
    switch (status) {
      case 'loading':
        return loadingText;
      case 'success':
        return successText;
      case 'error':
        return errorText;
      default:
        return '';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status !== 'idle' && (
        <motion.div
          key={status}
          variants={variants}
          initial="idle"
          animate={status}
          exit="idle"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex items-center space-x-2 ${className}`}
        >
          {getIcon()}
          <span className={`text-sm font-medium ${getTextColor()}`}>
            {getText()}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PulseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button with pulse animation and loading states
 */
export const PulseButton: React.FC<PulseButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'relative overflow-hidden font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg';

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      animate={loading ? {
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0.4)',
          '0 0 0 10px rgba(59, 130, 246, 0)',
          '0 0 0 0 rgba(59, 130, 246, 0)'
        ]
      } : undefined}
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center space-x-2"
          >
            <LoadingSpinner size="sm" color="gray" />
            <span>Loading...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center space-x-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'blue' | 'green' | 'purple' | 'red';
  size?: 'md' | 'lg';
  tooltip?: string;
}

/**
 * Floating Action Button with hover effects and tooltips
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'blue',
  size = 'md',
  tooltip
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8'
  };

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
    green: 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/25',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25',
    red: 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25'
  };

  const sizeClasses = {
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <motion.button
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-offset-2
        `}
        whileHover={{
          scale: 1.1,
          rotate: 5
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap"
          >
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default {
  LoadingSpinner,
  StatusIndicator,
  PulseButton,
  FloatingActionButton
};