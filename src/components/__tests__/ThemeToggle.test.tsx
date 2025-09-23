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
    it('renders all three theme toggle buttons', () => {
      renderWithTheme(<ThemeToggle />);
      expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to system theme/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });
      const systemButton = screen.getByRole('button', { name: /switch to system theme/i });
      const darkButton = screen.getByRole('button', { name: /switch to dark mode/i });

      expect(lightButton).toHaveAttribute('aria-label', 'Switch to light mode');
      expect(systemButton).toHaveAttribute('aria-label', 'Switch to system theme');
      expect(darkButton).toHaveAttribute('aria-label', 'Switch to dark mode');
    });
  });

  describe('Theme Icons', () => {
    it('shows sun icon for light mode button', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });
      const sunIcon = lightButton.querySelector('svg');
      expect(sunIcon).toBeInTheDocument();
      expect(sunIcon).toHaveClass('lucide-sun');
    });

    it('shows monitor icon for system theme button', () => {
      renderWithTheme(<ThemeToggle />);
      const systemButton = screen.getByRole('button', { name: /switch to system theme/i });
      const monitorIcon = systemButton.querySelector('svg');
      expect(monitorIcon).toBeInTheDocument();
      expect(monitorIcon).toHaveClass('lucide-monitor');
    });

    it('shows moon icon for dark mode button', () => {
      renderWithTheme(<ThemeToggle />);
      const darkButton = screen.getByRole('button', { name: /switch to dark mode/i });
      const moonIcon = darkButton.querySelector('svg');
      expect(moonIcon).toBeInTheDocument();
      expect(moonIcon).toHaveClass('lucide-moon');
    });
  });

  describe('Theme Switching', () => {
    it('calls setTheme with light when light button is clicked', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });
      fireEvent.click(lightButton);
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('calls setTheme with system when system button is clicked', () => {
      renderWithTheme(<ThemeToggle />);
      const systemButton = screen.getByRole('button', { name: /switch to system theme/i });
      fireEvent.click(systemButton);
      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('calls setTheme with dark when dark button is clicked', () => {
      renderWithTheme(<ThemeToggle />);
      const darkButton = screen.getByRole('button', { name: /switch to dark mode/i });
      fireEvent.click(darkButton);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('Visual Feedback', () => {
    it('has hover and transition classes', () => {
      renderWithTheme(<ThemeToggle />);
      const buttons = [
        screen.getByRole('button', { name: /switch to light mode/i }),
        screen.getByRole('button', { name: /switch to system theme/i }),
        screen.getByRole('button', { name: /switch to dark mode/i })
      ];

      buttons.forEach(button => {
        expect(button).toHaveClass('transition-all', 'duration-200');
      });

      // At least one button should have hover classes (non-active buttons)
      const hasHoverClass = buttons.some(button => button.className.includes('hover:'));
      expect(hasHoverClass).toBe(true);
    });

    it('has proper rounded styling', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });

      expect(lightButton).toHaveClass('rounded-md');
    });
  });

  describe('Responsive Design', () => {
    it('has consistent sizing across breakpoints', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });

      expect(lightButton).toHaveClass('p-2');
    });
  });

  describe('Color Schemes', () => {
    it('has proper color classes for light and dark modes', () => {
      renderWithTheme(<ThemeToggle />);
      const lightButton = screen.getByRole('button', { name: /switch to light mode/i });

      // Should have dark mode classes
      expect(lightButton.className).toMatch(/dark:/);
    });
  });
});