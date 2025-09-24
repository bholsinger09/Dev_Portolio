// Custom React hooks for shared logic

import { useState, useEffect, useCallback } from 'react';
import { safeLocalStorage, throttle } from '@/utils';
import { Theme, ContactFormData } from '@/types';
import { FORM_VALIDATION } from '@/constants';

/**
 * Custom hook for async operations with loading and error states
 */
export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return {
    data,
    error,
    isLoading,
    retry,
  };
};

/**
 * Custom hook for managing loading states with timeout
 */
export const useLoadingState = (initialLoading = false, timeout = 10000) => {
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      if (isLoading) {
        setIsTimeout(true);
        setError('Request timed out. Please try again.');
        setIsLoading(false);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, timeout]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setIsTimeout(false);
  }, []);

  const stopLoading = useCallback((errorMessage?: string) => {
    setIsLoading(false);
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsTimeout(false);
  }, []);

  return {
    isLoading,
    error,
    isTimeout,
    startLoading,
    stopLoading,
    reset,
  };
};

/**
 * Custom hook for retry functionality
 */
export const useRetry = (maxRetries = 3, initialDelay = 1000) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(async (operation: () => Promise<void>) => {
    if (retryCount >= maxRetries) {
      throw new Error(`Maximum retry attempts (${maxRetries}) exceeded`);
    }

    setIsRetrying(true);
    const delay = initialDelay * Math.pow(2, retryCount); // Exponential backoff

    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      await operation();
      setRetryCount(0); // Reset on success
    } catch (error) {
      setRetryCount(prev => prev + 1);
      throw error;
    } finally {
      setIsRetrying(false);
    }
  }, [retryCount, maxRetries, initialDelay]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return {
    retry,
    retryCount,
    isRetrying,
    canRetry: retryCount < maxRetries,
    reset,
  };
};

/**
 * Custom hook for theme management
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setIsLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    safeLocalStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggleTheme, isLoading };
};

/**
 * Custom hook for scroll detection
 */
export const useScrolled = (threshold: number = 20) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > threshold);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};

/**
 * Form validation results interface
 */
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Custom hook for contact form management
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < FORM_VALIDATION.NAME_MIN_LENGTH) {
      newErrors.name = `Name must be at least ${FORM_VALIDATION.NAME_MIN_LENGTH} characters`;
    } else if (formData.name.length > FORM_VALIDATION.NAME_MAX_LENGTH) {
      newErrors.name = `Name must not exceed ${FORM_VALIDATION.NAME_MAX_LENGTH} characters`;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!FORM_VALIDATION.EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < FORM_VALIDATION.MESSAGE_MIN_LENGTH) {
      newErrors.message = `Message must be at least ${FORM_VALIDATION.MESSAGE_MIN_LENGTH} characters`;
    } else if (formData.message.length > FORM_VALIDATION.MESSAGE_MAX_LENGTH) {
      newErrors.message = `Message must not exceed ${FORM_VALIDATION.MESSAGE_MAX_LENGTH} characters`;
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, [formData]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      if (!result.success) {
        throw new Error(result.error || 'Unknown error occurred');
      }

      // Success!
      setSubmitStatus('success');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});

      // Track successful submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_submit', {
          method: 'api',
          success: true,
        });
      }

      // Show success message for 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(errorMessage);

      // Track failed submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_error', {
          error_type: errorMessage,
        });
      }

      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitStatus('idle');
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm
  };
};

/**
 * Custom hook for intersection observer (scroll animations)
 */
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold, rootMargin]);

  return { isIntersecting, setElement };
};