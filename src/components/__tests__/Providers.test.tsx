import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from '../Providers';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}));

describe('Providers', () => {
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
      expect(themeProvider).toHaveAttribute('attribute', 'class');
      expect(themeProvider).toHaveAttribute('defaultTheme', 'system');
      expect(themeProvider).toHaveAttribute('enableSystem', 'true');
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
      
      const themeProvider = screen.getByTestId('theme-provider');
      expect(themeProvider).toHaveAttribute('enableSystem', 'true');
    });

    it('uses class attribute for theme switching', () => {
      render(
        <Providers>
          <div>Test</div>
        </Providers>
      );
      
      const themeProvider = screen.getByTestId('theme-provider');
      expect(themeProvider).toHaveAttribute('attribute', 'class');
    });

    it('defaults to system theme', () => {
      render(
        <Providers>
          <div>Test</div>
        </Providers>
      );
      
      const themeProvider = screen.getByTestId('theme-provider');
      expect(themeProvider).toHaveAttribute('defaultTheme', 'system');
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