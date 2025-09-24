'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Custom events for portfolio tracking
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters)
    }
}

// Portfolio-specific tracking events
export const analytics = {
    // Contact form interactions
    contactFormStart: () => trackEvent('contact_form_start'),
    contactFormSubmit: (method: string) => trackEvent('contact_form_submit', { method }),
    contactFormError: (error: string) => trackEvent('contact_form_error', { error_type: error }),

    // Project interactions
    projectView: (projectName: string) => trackEvent('project_view', { project_name: projectName }),
    projectLinkClick: (projectName: string, linkType: 'github' | 'demo' | 'live') =>
        trackEvent('project_link_click', { project_name: projectName, link_type: linkType }),

    // Resume and social interactions
    resumeDownload: () => trackEvent('resume_download'),
    socialClick: (platform: string) => trackEvent('social_click', { platform }),

    // Navigation
    sectionView: (section: string) => trackEvent('section_view', { section_name: section }),

    // Performance tracking (enhanced)
    performanceMetric: (metric: string, value: number, rating: string) =>
        trackEvent('performance_metric', { metric_name: metric, value, rating }),
}

// Page view tracking component
function PageViewTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: pathname + searchParams.toString(),
            })
        }
    }, [pathname, searchParams])

    return null
}

// Main Analytics component
export default function Analytics() {
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics ID not found. Set NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.')
        return null
    }

    return (
        <>
            <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
            <PageViewTracker />

            {/* Enhanced eCommerce and Custom Dimensions */}
            <Script
                id="ga-enhanced-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.gtag('config', '${GA_MEASUREMENT_ID}', {
              // Enhanced tracking
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: true,
              
              // Custom dimensions for portfolio
              custom_map: {
                'dimension1': 'section_name',
                'dimension2': 'project_name',
                'dimension3': 'form_interaction',
                'dimension4': 'performance_rating'
              },
              
              // Enhanced eCommerce for goal tracking
              enhanced_conversions: true
            });
            
            // Track initial page load with custom data
            window.gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'portfolio_site'
            });
          `
                }}
            />
        </>
    )
}

// TypeScript declaration for gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event',
            targetId: string,
            config?: Record<string, any>
        ) => void
    }
}