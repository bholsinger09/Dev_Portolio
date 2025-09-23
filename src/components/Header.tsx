'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

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
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600 flex-shrink-0"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              style={{ marginLeft: '2rem' }}
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