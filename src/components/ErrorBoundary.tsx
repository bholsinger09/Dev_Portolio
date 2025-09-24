// Error Boundary Components and Error Handling Infrastructure

'use client';

import React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolate?: boolean;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo?: ErrorInfo;
  resetError: () => void;
  className?: string;
}

/**
 * Main Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo || undefined}
          resetError={this.resetError}
          className={this.props.isolate ? 'min-h-[200px] flex items-center justify-center' : ''}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-200 rounded-lg ${className}`}>
    <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
    <h2 className="text-xl font-semibold text-red-800 mb-2">
      Oops! Something went wrong
    </h2>
    <p className="text-red-600 mb-4 max-w-md">
      {process.env.NODE_ENV === 'development'
        ? error.message
        : "We're sorry, but something unexpected happened. Please try again."}
    </p>
    <div className="flex gap-3">
      <Button
        variant="primary"
        onClick={resetError}
        className="flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
      <Button
        variant="outline"
        onClick={() => window.location.href = '/'}
        className="flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        Go Home
      </Button>
    </div>
    {process.env.NODE_ENV === 'development' && (
      <details className="mt-4 text-xs text-left bg-red-100 p-3 rounded border border-red-300 max-w-2xl overflow-auto">
        <summary className="cursor-pointer font-semibold text-red-700 mb-2">
          Error Details (Development)
        </summary>
        <pre className="whitespace-pre-wrap text-red-800">
          {error.stack}
        </pre>
      </details>
    )}
  </div>
);

/**
 * Compact Error Fallback for smaller components
 */
export const CompactErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center p-4 text-center bg-red-50 border border-red-200 rounded ${className}`}>
    <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
    <p className="text-sm text-red-600 mb-2">
      {process.env.NODE_ENV === 'development'
        ? error.message
        : 'Something went wrong'}
    </p>
    <Button
      variant="outline"
      size="sm"
      onClick={resetError}
      className="flex items-center gap-1 text-xs"
    >
      <RefreshCw className="w-3 h-3" />
      Retry
    </Button>
  </div>
);

/**
 * HOC for wrapping components with error boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={errorFallback} isolate>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'
    })`;

  return WrappedComponent;
}

/**
 * Hook for manual error throwing (useful for async operations)
 */
export const useErrorHandler = () => {
  const [, setState] = React.useState();

  return React.useCallback((error: Error) => {
    setState(() => {
      throw error;
    });
  }, []);
};

/**
 * Async Error Boundary for handling promise rejections
 */
export const AsyncErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  const handleError = useErrorHandler();

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleError(new Error(event.reason));
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, [handleError]);

  return <>{children}</>;
};

export default ErrorBoundary;