'use client';

import { ThemeProvider } from 'next-themes';
import { ErrorBoundary, AsyncErrorBoundary } from './ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AsyncErrorBoundary>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
          enableColorScheme={true}
        >
          {children}
        </ThemeProvider>
      </AsyncErrorBoundary>
    </ErrorBoundary>
  );
}