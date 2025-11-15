'use client';

import { useEffect } from 'react';
import { analytics } from './Analytics';

// Web Vitals metric interface
interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  entries?: PerformanceEntry[]
  id?: string
}

// Network Information API interface
interface NavigatorConnection {
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g'
  downlink?: number
  rtt?: number
  saveData?: boolean
}

// Extend Navigator interface for connection property
declare global {
  interface Navigator {
    connection?: NavigatorConnection
  }
}

/**
 * Performance Monitoring Component
 * Tracks Core Web Vitals and sends performance data for analysis
 * Helps optimize user experience and SEO rankings
 */
export const PerformanceMonitor: React.FC = () => {
    useEffect(() => {
        // Only run in production and browser environment
        if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
            return;
        }

        // Track Core Web Vitals
        const trackWebVitals = async () => {
            try {
                const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

                // Largest Contentful Paint
                onLCP((metric: WebVitalsMetric) => {
                    const rating = metric.value <= 2500 ? 'good' : metric.value <= 4000 ? 'needs-improvement' : 'poor';
                    console.log('LCP:', metric.value, rating);
                    analytics.performanceMetric('LCP', metric.value, rating);
                });

                // Interaction to Next Paint (replaces FID)
                onINP((metric: WebVitalsMetric) => {
                    const rating = metric.value <= 200 ? 'good' : metric.value <= 500 ? 'needs-improvement' : 'poor';
                    console.log('INP:', metric.value, rating);
                    analytics.performanceMetric('INP', metric.value, rating);
                });

                // Cumulative Layout Shift
                onCLS((metric: WebVitalsMetric) => {
                    const rating = metric.value <= 0.1 ? 'good' : metric.value <= 0.25 ? 'needs-improvement' : 'poor';
                    console.log('CLS:', metric.value, rating);
                    analytics.performanceMetric('CLS', metric.value, rating);
                });

                // First Contentful Paint
                onFCP((metric: WebVitalsMetric) => {
                    const rating = metric.value <= 1800 ? 'good' : metric.value <= 3000 ? 'needs-improvement' : 'poor';
                    console.log('FCP:', metric.value, rating);
                    analytics.performanceMetric('FCP', metric.value, rating);
                });

                // Time to First Byte
                onTTFB((metric: WebVitalsMetric) => {
                    const rating = metric.value <= 800 ? 'good' : metric.value <= 1800 ? 'needs-improvement' : 'poor';
                    console.log('TTFB:', metric.value, rating);
                    analytics.performanceMetric('TTFB', metric.value, rating);
                });
            } catch (error) {
                console.warn('Web Vitals tracking failed:', error);
            }
        };

        // Performance Observer for additional metrics
        const observePerformance = () => {
            if ('PerformanceObserver' in window) {
                // Track resource loading times
                const resourceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'resource') {
                            // Track slow resources
                            if (entry.duration > 1000) {
                                console.log('Slow resource:', entry.name, entry.duration);
                                analytics.performanceMetric('slow_resource', entry.duration, 'poor');
                            }
                        }
                    }
                });

                resourceObserver.observe({ entryTypes: ['resource'] });

                // Track long tasks
                const longTaskObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.log('Long task detected:', entry.duration);
                            analytics.performanceMetric('long_task', entry.duration, 'needs-improvement');
                        }
                    }
                });

                try {
                    longTaskObserver.observe({ entryTypes: ['longtask'] });
                } catch (e) {
                    // longtask not supported in all browsers
                }
            }
        };

        // Network Information API
        const trackNetworkInfo = () => {
            if ('connection' in navigator && navigator.connection) {
                const connection = navigator.connection;
                analytics.performanceMetric('network_effective_type', 0, connection.effectiveType || 'unknown');
            }
        };

        // Initialize tracking
        trackWebVitals();
        observePerformance();
        trackNetworkInfo();

        // Track page visibility changes
        const handleVisibilityChange = () => {
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'page_visibility_change', {
                    visibility_state: document.visibilityState
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default PerformanceMonitor;