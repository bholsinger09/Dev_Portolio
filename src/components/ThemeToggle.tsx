'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // More conservative Safari-friendly fallback
  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1" style={{ width: '120px', height: '40px' }}>
        <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div
      className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-200"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '4px',
        minWidth: '120px'
      }}
    >
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-all duration-200 ${theme === 'light'
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: theme === 'light' ? '#ffffff' : 'transparent',
          color: theme === 'light' ? '#111827' : '#6b7280',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        aria-label="Switch to light mode"
      >
        <Sun className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-all duration-200 ${theme === 'system'
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: theme === 'system' ? '#ffffff' : 'transparent',
          color: theme === 'system' ? '#111827' : '#6b7280',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        aria-label="Switch to system theme"
      >
        <Monitor className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-all duration-200 ${theme === 'dark'
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        style={{
          padding: '8px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: theme === 'dark' ? '#374151' : 'transparent',
          color: theme === 'dark' ? '#ffffff' : '#6b7280',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        aria-label="Switch to dark mode"
      >
        <Moon className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
}