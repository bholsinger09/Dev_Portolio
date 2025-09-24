import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from '../Providers';

// Track the props passed to ThemeProvider
let themeProviderProps: Record<string, unknown> = {};

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode;[key: string]: unknown }) => {
    themeProviderProps = props;
    return (
      <div data-testid="theme-provider">
        {children}
      </div>
    );
  },
}));

describe('Providers', () => {
  beforeEach(() => {
    themeProviderProps = {};
  });

  describe('Theme Provider Setup', () => {
    it('renders ThemeProvider with correct attributes', () => {
      const TestChild = () => <div data-testid="test-child">Test Content</div>;

      render(
        <Providers>
          <TestChild />
        </Providers>
      );

      const themeProvider = screen.getByTestId('theme-provider');
      expect(themeProvider).toBeInTheDocument();

      // Check props passed to ThemeProvider mock
      expect(themeProviderProps.attribute).toBe('class');
      expect(themeProviderProps.defaultTheme).toBe('system');
      expect(themeProviderProps.enableSystem).toBe(true);
      expect(themeProviderProps.storageKey).toBe('theme');
    });

    it('renders children correctly', () => {
      const TestChild = () => <div data-testid="test-child">Test Content</div>;

      render(
        <Providers>
          <TestChild />
        </Providers>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('passes through multiple children', () => {
      const TestChild1 = () => <div data-testid="test-child-1">Child 1</div>;
      const TestChild2 = () => <div data-testid="test-child-2">Child 2</div>;

      render(
        <Providers>
          <TestChild1 />
          <TestChild2 />
        </Providers>
      );

      expect(screen.getByTestId('test-child-1')).toBeInTheDocument();
      expect(screen.getByTestId('test-child-2')).toBeInTheDocument();
    });
  });

  describe('Provider Configuration', () => {
    it('enables system theme detection', () => {
      render(
        <Providers>
          <div>Test</div>
        </Providers>
      );

      expect(themeProviderProps.enableSystem).toBe(true);
    });

    it('uses class attribute for theme switching', () => {
      render(
        <Providers>
          <div>Test</div>
        </Providers>
      );

      expect(themeProviderProps.attribute).toBe('class');
    });

    it('defaults to system theme', () => {
      render(
        <Providers>
          <div>Test</div>
        </Providers>
      );

      expect(themeProviderProps.defaultTheme).toBe('system');
    });
  });

  describe('Component Integration', () => {
    it('integrates with complex component trees', () => {
      const ComplexChild = () => (
        <div data-testid="complex-child">
          <header>Header</header>
          <main>Main Content</main>
          <footer>Footer</footer>
        </div>
      );

      render(
        <Providers>
          <ComplexChild />
        </Providers>
      );

      expect(screen.getByTestId('complex-child')).toBeInTheDocument();
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});