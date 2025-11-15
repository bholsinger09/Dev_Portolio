// Utility functions for common operations

import { TechnologyType } from '@/types';
import { TECHNOLOGY_COLORS } from '@/constants';

/**
 * Gets the appropriate CSS classes for a technology tag
 * @param tech - The technology name
 * @returns CSS classes for styling the technology tag
 */
export const getTechnologyColor = (tech: string): string => {
  return TECHNOLOGY_COLORS[tech as TechnologyType] || TECHNOLOGY_COLORS.DEFAULT;
};

/**
 * Combines CSS class names, filtering out falsy values
 * @param classes - Array of class names or conditional classes
 * @returns Combined class string
 */
export const classNames = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Validates an email address
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats a percentage for display
 * @param value - Numeric percentage value
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Creates a delay for animations based on index
 * @param index - Array index
 * @param baseDelay - Base delay in seconds
 * @returns Calculated delay
 */
export const calculateAnimationDelay = (index: number, baseDelay = 0.1): number => {
  return index * baseDelay;
};

/**
 * Safely gets a value from localStorage with fallback
 * @param key - Storage key
 * @param fallback - Fallback value if key doesn't exist
 * @returns Stored value or fallback
 */
export const safeLocalStorage = {
  getItem: (key: string, fallback: string = ''): string => {
    if (typeof window === 'undefined') return fallback;
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
};

/**
 * Throttle function to limit how often a function can be called
 * @param func - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};