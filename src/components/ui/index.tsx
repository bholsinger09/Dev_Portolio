// Reusable UI components

import React from 'react';
import { classNames } from '@/utils';
import { CONTAINER_CLASSES } from '@/constants';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray';
  padding?: boolean;
}

/**
 * Standardized section wrapper component
 */
export const Section: React.FC<SectionProps> = ({
  id,
  className,
  children,
  background = 'white',
  padding = true
}) => {
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  const paddingClass = padding ? CONTAINER_CLASSES.SECTION_PADDING : '';

  return (
    <section
      id={id}
      className={classNames(paddingClass, bgClass, className)}
    >
      {children}
    </section>
  );
};

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

/**
 * Responsive container component
 */
export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  className,
  children
}) => {
  const sizeClasses = {
    sm: CONTAINER_CLASSES.MAX_WIDTH_4XL,
    md: CONTAINER_CLASSES.MAX_WIDTH_5XL,
    lg: CONTAINER_CLASSES.MAX_WIDTH_6XL,
    xl: CONTAINER_CLASSES.MAX_WIDTH_7XL,
  };

  return (
    <div className={classNames(
      sizeClasses[size],
      CONTAINER_CLASSES.CENTERED,
      CONTAINER_CLASSES.PADDING,
      className
    )}>
      {children}
    </div>
  );
};

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Standardized button component
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * Loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-blue-600'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={classNames('animate-spin', sizeClasses[size], color)}>
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * Error message display component
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className
}) => (
  <div className={classNames(
    'text-red-600 bg-red-50 border border-red-200 rounded-lg p-3',
    className
  )}>
    <p className="text-sm font-medium">{message}</p>
  </div>
);