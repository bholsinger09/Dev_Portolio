'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = useTranslations('nav');
  const { switchLanguage, currentLocale } = useLanguageSwitcher();

  // Theme toggle functionality
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.language-selector')) {
        setShowLanguageMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const navItems = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#projects', label: t('projects') },
    { href: '#skills', label: t('skills') },
    { href: '/blog', label: t('blog') },
    { href: '#contact', label: t('contact') },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Ben H.
            </Link>
          </div>

          {/* Horizontal Navigation Bar - visible on all screen sizes */}
          <div className="flex items-center" style={{ gap: '2rem' }}>
            <div className="navigation-links flex items-baseline" style={{ gap: '2rem' }}>
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-item no-underline text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 sm:px-4 lg:px-5 py-2 text-sm sm:text-base lg:text-base font-medium transition-colors whitespace-nowrap hover:no-underline focus:no-underline"
                  style={{
                    marginLeft: index > 0 ? '2rem' : '0',
                    display: 'inline-block'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <div className="language-selector relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600 flex items-center gap-1 flex-shrink-0"
                title="Select language"
              >
                <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs font-medium">{currentLanguage.flag}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[120px] py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${currentLocale === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600 flex-shrink-0"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;