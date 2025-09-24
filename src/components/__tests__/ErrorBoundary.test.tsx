// Tests for Error Boundary components

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, CompactErrorFallback, withErrorBoundary, useErrorHandler } from '../ErrorBoundary';

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Test component that throws an error
const ThrowErrorComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>Component rendered successfully</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal Operation', () => {
    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Component rendered successfully')).toBeInTheDocument();
    });

    it('does not render error UI when component works normally', () => {
      render(
        <ErrorBoundary>
          <div>Normal component</div>
        </ErrorBoundary>
      );

      expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
      expect(screen.getByText('Normal component')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('catches errors and displays fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(screen.queryByText('Component rendered successfully')).not.toBeInTheDocument();
    });

    it('displays error message in development mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        configurable: true
      });

      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Test error message')).toBeInTheDocument();

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        configurable: true
      });
    });

    it('does not display error message in production mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true
      });

      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
      expect(screen.getByText(/something unexpected happened/i)).toBeInTheDocument();

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        configurable: true
      });
    });

    it('calls onError callback when provided', () => {
      const onErrorMock = jest.fn();

      render(
        <ErrorBoundary onError={onErrorMock}>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Test error message'
        }),
        expect.objectContaining({
          componentStack: expect.any(String)
        })
      );
    });
  });

  describe('Error Recovery', () => {
    it('provides try again functionality', () => {
      const TestComponent = () => {
        const [shouldError, setShouldError] = React.useState(true);

        React.useEffect(() => {
          // Reset error state after component mounts
          const timer = setTimeout(() => setShouldError(false), 100);
          return () => clearTimeout(timer);
        }, []);

        return <ThrowErrorComponent shouldThrow={shouldError} />;
      };

      render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );

      // Should show error initially
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

      // Click try again
      const tryAgainButton = screen.getByText('Try Again');
      fireEvent.click(tryAgainButton);

      // Should reset and show the component
      setTimeout(() => {
        expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
        expect(screen.getByText('Component rendered successfully')).toBeInTheDocument();
      }, 200);
    });

    it('provides go home functionality', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      // Check that the Go Home button exists and is clickable
      const goHomeButton = screen.getByText('Go Home');
      expect(goHomeButton).toBeInTheDocument();
      expect(goHomeButton).toHaveAttribute('type', 'button');

      // Test that clicking doesn't cause an error
      expect(() => fireEvent.click(goHomeButton)).not.toThrow();
    });
  });

  describe('Custom Fallback', () => {
    it('uses custom fallback component when provided', () => {
      const CustomFallback: React.FC<any> = ({ error }) => (
        <div>Custom error: {error.message}</div>
      );

      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowErrorComponent shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error: Test error message')).toBeInTheDocument();
      expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    });
  });
});

describe('CompactErrorFallback', () => {
  const mockError = new Error('Test compact error');
  const mockResetError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders compact error UI', () => {
    render(
      <CompactErrorFallback
        error={mockError}
        resetError={mockResetError}
      />
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('shows error message in development', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true
    });

    render(
      <CompactErrorFallback
        error={mockError}
        resetError={mockResetError}
      />
    );

    expect(screen.getByText('Test compact error')).toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'test',
      configurable: true
    });
  });

  it('calls resetError when retry button is clicked', () => {
    render(
      <CompactErrorFallback
        error={mockError}
        resetError={mockResetError}
      />
    );

    fireEvent.click(screen.getByText('Retry'));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });
});

describe('withErrorBoundary HOC', () => {
  it('wraps component with error boundary', () => {
    const TestComponent = () => <div>HOC Test Component</div>;
    const WrappedComponent = withErrorBoundary(TestComponent);

    render(<WrappedComponent />);
    expect(screen.getByText('HOC Test Component')).toBeInTheDocument();
  });

  it('catches errors from wrapped component', () => {
    const WrappedComponent = withErrorBoundary(ThrowErrorComponent);

    render(<WrappedComponent shouldThrow={true} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('uses custom fallback when provided', () => {
    const CustomFallback: React.FC<any> = () => (
      <div>Custom HOC fallback</div>
    );

    const WrappedComponent = withErrorBoundary(ThrowErrorComponent, CustomFallback);

    render(<WrappedComponent shouldThrow={true} />);
    expect(screen.getByText('Custom HOC fallback')).toBeInTheDocument();
  });

  it('preserves component display name', () => {
    const TestComponent = () => <div>Test</div>;
    TestComponent.displayName = 'TestComponent';

    const WrappedComponent = withErrorBoundary(TestComponent);
    expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)');
  });
});

describe('useErrorHandler Hook', () => {
  it('throws error when called', () => {
    const TestComponent = () => {
      const handleError = useErrorHandler();

      return (
        <button onClick={() => handleError(new Error('Manual error'))}>
          Throw Error
        </button>
      );
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw Error'));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});