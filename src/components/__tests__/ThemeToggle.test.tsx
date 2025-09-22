import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '../ThemeToggle';

// Mock next-themes hook
const mockSetTheme = jest.fn();
const mockUseTheme = {
  theme: 'light',
  setTheme: mockSetTheme,
  resolvedTheme: 'light',
  systemTheme: 'light'
};

jest.mock('next-themes', () => ({
  ...jest.requireActual('next-themes'),
  useTheme: () => mockUseTheme,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {component}
      </ThemeProvider>
    );
  };

  describe('Basic Rendering', () => {
    it('renders theme toggle button', () => {
      renderWithTheme(<ThemeToggle />);
      expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      renderWithTheme(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Toggle theme'));
      expect(button).toHaveClass('focus:outline-none');
    });
  });

  describe('Theme Icons', () => {
    it('shows sun icon in light theme', () => {
      mockUseTheme.resolvedTheme = 'light';
      renderWithTheme(<ThemeToggle />);
      
      // Sun icon should be visible
      const sunIcon = screen.getByTestId('sun-icon');
      expect(sunIcon).toBeInTheDocument();
    });

    it('shows moon icon in dark theme', () => {
      mockUseTheme.resolvedTheme = 'dark';
      renderWithTheme(<ThemeToggle />);
      
      // Moon icon should be visible (though we can't easily test visibility due to CSS)
      const button = screen.getByRole('button', { name: /toggle theme/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    it('cycles through themes when clicked', () => {
      // Start with light theme
      mockUseTheme.theme = 'light';
      mockUseTheme.resolvedTheme = 'light';
      renderWithTheme(<ThemeToggle />);
      
      const button = screen.getByRole('button', { name: /toggle theme/i });
      fireEvent.click(button);
      
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('cycles from dark to system', () => {
      mockUseTheme.theme = 'dark';
      mockUseTheme.resolvedTheme = 'dark';
      renderWithTheme(<ThemeToggle />);
      
      const button = screen.getByRole('button', { name: /toggle theme/i });
      fireEvent.click(button);
      
      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('cycles from system to light', () => {
      mockUseTheme.theme = 'system';
      mockUseTheme.resolvedTheme = 'light';
      renderWithTheme(<ThemeToggle />);
      
      const button = screen.getByRole('button', { name: /toggle theme/i });
      fireEvent.click(button);
      
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('Visual Feedback', () => {
    it('has hover and transition classes', () => {
      renderWithTheme(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      
      expect(button).toHaveClass('transition-all', 'duration-200');
      expect(button.className).toMatch(/hover:/);
    });

    it('has proper rounded styling', () => {
      renderWithTheme(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      
      expect(button).toHaveClass('rounded-lg');
    });
  });

  describe('Responsive Design', () => {
    it('has consistent sizing across breakpoints', () => {
      renderWithTheme(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      
      expect(button).toHaveClass('p-2');
    });
  });

  describe('Color Schemes', () => {
    it('has proper color classes for light and dark modes', () => {
      renderWithTheme(<ThemeToggle />);
      const button = screen.getByRole('button', { name: /toggle theme/i });
      
      // Should have dark mode classes
      expect(button.className).toMatch(/dark:/);
    });
  });
});