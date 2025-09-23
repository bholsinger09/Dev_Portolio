'use client';

import { useEffect, useState } from 'react';

export default function WorkingThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#gray',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        zIndex: 9999,
        fontSize: '16px',
        fontWeight: 'bold',
        border: '3px solid black'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: isDark ? '#fbbf24' : '#3b82f6',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 9999,
        fontSize: '16px',
        fontWeight: 'bold',
        border: '3px solid black',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        userSelect: 'none'
      }}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </div>
  );
}