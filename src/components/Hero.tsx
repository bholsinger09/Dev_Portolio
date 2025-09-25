'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';
import { PulseLoader } from './LoadingStates';
import { analytics } from './Analytics';
import { ScrollReveal, StaggeredReveal } from './ScrollAnimations';
import AnimatedButton from './AnimatedButton';

const ProfileImage = withErrorBoundary(() => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('hero');

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <ScrollReveal direction="scale" duration={0.8}>
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl relative group">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}

          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl md:text-7xl font-bold transition-transform group-hover:scale-105">
              BH
            </div>
          ) : (
            <Image
              src="/profile-optimized.jpg"
              alt="Ben H. - Full-Stack Software Engineer and Developer Portfolio"
              width={224}
              height={224}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
              quality={95}
              sizes="(max-width: 768px) 192px, 224px"
            />
          )}

          {/* Animated ring effect */}
          <div className="absolute -inset-4 rounded-full border-2 border-blue-500/20 animate-pulse" />
        </div>
      </div>
    </ScrollReveal>
  );
});

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          {/* Professional Photo with Error Handling */}
          <ErrorBoundary isolate>
            <ProfileImage />
          </ErrorBoundary>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t('name')}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-blue-600 dark:text-blue-400 font-medium mb-6">
                {t('title')}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Experienced software engineer specializing in full-stack development with expertise in{' '}
                <span className="text-blue-600 dark:text-blue-400 font-semibold">JavaScript/TypeScript</span>,{' '}
                <span className="text-red-600 dark:text-red-400 font-semibold">Java</span>,{' '}
                <span className="text-green-600 dark:text-green-400 font-semibold">Python</span>,{' '}
                <span className="text-purple-600 dark:text-purple-400 font-semibold">C#</span>, and{' '}
                <span className="text-orange-600 dark:text-orange-400 font-semibold">Swift</span>.
                Building scalable applications from web platforms to mobile solutions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
              <AnimatedButton
                href="#projects"
                onClick={() => analytics.sectionView('projects')}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t('cta.viewWork')}
              </AnimatedButton>
              <AnimatedButton
                href="/resume.pdf"
                onClick={analytics.resumeDownload}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Download size={20} className="mr-2" />
                {t('cta.downloadResume')}
              </AnimatedButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="flex justify-center space-x-8 mt-10">
              <StaggeredReveal
                staggerDelay={0.1}
                direction="scale"
                className="flex space-x-8"
              >
                {[
                  {
                    href: "https://github.com/bholsinger09",
                    icon: Github,
                    label: t('social.github'),
                    onClick: () => analytics.socialClick('github'),
                    hoverColor: 'hover:text-gray-900 dark:hover:text-white'
                  },
                  {
                    href: "https://linkedin.com/in/ben-holsinger",
                    icon: Linkedin,
                    label: t('social.linkedin'),
                    onClick: () => analytics.socialClick('linkedin'),
                    hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
                  },
                  {
                    href: "mailto:ben.holsinger@example.com",
                    icon: Mail,
                    label: t('social.email'),
                    onClick: () => analytics.socialClick('email'),
                    hoverColor: 'hover:text-red-600 dark:hover:text-red-400'
                  }
                ].map(({ href, icon: Icon, label, onClick, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                    onClick={onClick}
                    className={`text-gray-600 dark:text-gray-400 ${hoverColor} transition-all duration-300 transform hover:scale-125 p-3 rounded-full hover:bg-white/20 backdrop-blur`}
                    aria-label={label}
                  >
                    <Icon size={32} />
                  </a>
                ))}
              </StaggeredReveal>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;