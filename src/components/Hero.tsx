'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';
import { PulseLoader } from './LoadingStates';
import { analytics } from './Analytics';

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
    <div className="flex justify-center mb-8">
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">{t('loading')}</div>
          </div>
        )}

        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl md:text-7xl font-bold">
            BH
          </div>
        ) : (
          <Image
            src="/profile-optimized.jpg"
            alt={t('profileAlt')}
            width={224}
            height={224}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority
            quality={95}
            sizes="(max-width: 768px) 192px, 224px"
          />
        )}
      </div>
    </div>
  );
});

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-12 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Professional Photo with Error Handling */}
          <ErrorBoundary isolate>
            <ProfileImage />
          </ErrorBoundary>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              {t('name')}
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-blue-600 dark:text-blue-400 font-medium mb-6">
              {t('title')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.rich('description', {
                javascript: (chunks) => <span className="text-blue-600 dark:text-blue-400 font-semibold">{chunks}</span>,
                java: (chunks) => <span className="text-red-600 dark:text-red-400 font-semibold">{chunks}</span>,
                python: (chunks) => <span className="text-green-600 dark:text-green-400 font-semibold">{chunks}</span>,
                csharp: (chunks) => <span className="text-purple-600 dark:text-purple-400 font-semibold">{chunks}</span>,
                swift: (chunks) => <span className="text-orange-600 dark:text-orange-400 font-semibold">{chunks}</span>
              })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <a
              href="#projects"
              onClick={() => analytics.sectionView('projects')}
              className="w-full sm:w-auto bg-blue-600 dark:bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t('viewWork')}
            </a>
            <a
              href="/resume.pdf"
              onClick={analytics.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download size={20} />
              {t('downloadResume')}
            </a>
          </div>

          <div className="flex justify-center space-x-8 mt-10">
            <a
              href="https://github.com/bholsinger09"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.socialClick('github')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110"
              aria-label={t('githubAria')}
            >
              <Github size={32} />
            </a>
            <a
              href="https://linkedin.com/in/ben-holsinger"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.socialClick('linkedin')}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
              aria-label={t('linkedinAria')}
            >
              <Linkedin size={32} />
            </a>
            <a
              href="mailto:ben.holsinger@example.com"
              onClick={() => analytics.socialClick('email')}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors transform hover:scale-110"
              aria-label={t('emailAria')}
            >
              <Mail size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;