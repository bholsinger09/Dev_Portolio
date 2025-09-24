'use client';

import { useEffect } from 'react';

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
                const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

                // Largest Contentful Paint
                getLCP((metric: any) => {
                    console.log('LCP:', metric);
                    // Send to analytics service
                    sendToAnalytics('LCP', metric);
                });

                // First Input Delay  
                getFID((metric: any) => {
                    console.log('FID:', metric);
                    sendToAnalytics('FID', metric);
                });

                // Cumulative Layout Shift
                getCLS((metric: any) => {
                    console.log('CLS:', metric);
                    sendToAnalytics('CLS', metric);
                });

                // First Contentful Paint
                getFCP((metric: any) => {
                    console.log('FCP:', metric);
                    sendToAnalytics('FCP', metric);
                });

                // Time to First Byte
                getTTFB((metric: any) => {
                    console.log('TTFB:', metric);
                    sendToAnalytics('TTFB', metric);
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
                                sendToAnalytics('slow-resource', {
                                    name: entry.name,
                                    duration: entry.duration,
                                    size: (entry as any).transferSize,
                                });
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
                            sendToAnalytics('long-task', {
                                duration: entry.duration,
                                startTime: entry.startTime,
                            });
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
            if ('connection' in navigator) {
                const connection = (navigator as any).connection;
                sendToAnalytics('network-info', {
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    rtt: connection.rtt,
                });
            }
        };

        // Initialize tracking
        trackWebVitals();
        observePerformance();
        trackNetworkInfo();

        // Track page visibility changes
        const handleVisibilityChange = () => {
            sendToAnalytics('visibility-change', {
                visibilityState: document.visibilityState,
                timestamp: Date.now(),
            });
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null; // This component doesn't render anything
};

/**
 * Send performance data to analytics service
 * Replace with your preferred analytics service (Google Analytics, Vercel Analytics, etc.)
 */
function sendToAnalytics(metricName: string, data: any) {
    // Example: Send to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metricName, {
            custom_parameter_1: data.value || data.duration || JSON.stringify(data),
            custom_parameter_2: data.rating || 'info',
        });
    }

    // Example: Send to Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', metricName, data);
    }

    // Example: Send to custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                metric: metricName,
                data,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href,
            }),
        }).catch(() => {
            // Silently fail for analytics
        });
    }
}

export default PerformanceMonitor;