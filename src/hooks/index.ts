// Custom React hooks for shared logic

import { useState, useEffect, useCallback } from 'react';
import { safeLocalStorage, throttle } from '@/utils';
import { Theme, ContactFormData } from '@/types';
import { FORM_VALIDATION } from '@/constants';

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

    try {
      // Here you would typically make an API call to submit the form
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Show success message for 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
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