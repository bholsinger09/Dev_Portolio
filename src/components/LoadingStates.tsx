// Enhanced Loading States and Skeleton Components

'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/ui';
import { classNames } from '@/utils';

interface LoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

/**
 * Universal loading state wrapper
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  children,
  fallback,
  errorFallback,
  className = '',
  minHeight = 'min-h-[200px]',
}) => {
  if (error) {
    return (
      <div className={classNames(minHeight, 'flex items-center justify-center', className)}>
        {errorFallback || (
          <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-medium">Error Loading Content</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={classNames(minHeight, 'flex items-center justify-center', className)}>
        {fallback || <LoadingSpinner size="lg" />}
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Skeleton loading component for text
 */
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  width?: string;
}> = ({ lines = 1, className = '', width = 'w-full' }) => (
  <div className={classNames('space-y-2', className)}>
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className={classNames(
          'h-4 bg-gray-200 rounded animate-pulse',
          i === lines - 1 ? 'w-3/4' : width
        )}
      />
    ))}
  </div>
);

/**
 * Skeleton loading component for cards
 */
export const SkeletonCard: React.FC<{
  className?: string;
  showImage?: boolean;
  imageHeight?: string;
}> = ({ 
  className = '', 
  showImage = true, 
  imageHeight = 'h-48' 
}) => (
  <div className={classNames('bg-white rounded-xl shadow-lg overflow-hidden', className)}>
    {showImage && (
      <div className={classNames('bg-gray-200 animate-pulse', imageHeight)} />
    )}
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-18" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton loading for project grid
 */
export const ProjectsGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/**
 * Skeleton loading for skills grid
 */
export const SkillsGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="bg-gray-50 p-6 rounded-xl">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, j) => (
            <div key={j} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * Inline loading indicator
 */
export const InlineLoader: React.FC<{
  text?: string;
  size?: 'sm' | 'md';
  className?: string;
}> = ({ text = 'Loading...', size = 'md', className = '' }) => (
  <div className={classNames('flex items-center gap-2', className)}>
    <LoadingSpinner size={size} />
    <span className={classNames(
      'text-gray-600',
      size === 'sm' ? 'text-sm' : 'text-base'
    )}>
      {text}
    </span>
  </div>
);

/**
 * Progress loading bar
 */
export const ProgressBar: React.FC<{
  progress: number;
  className?: string;
  showPercentage?: boolean;
}> = ({ progress, className = '', showPercentage = false }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={classNames('w-full', className)}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">Loading</span>
        {showPercentage && (
          <span className="text-sm text-gray-600">{Math.round(clampedProgress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Pulse loading animation for any content
 */
export const PulseLoader: React.FC<{
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}> = ({ children, isLoading, className = '' }) => (
  <div className={classNames(isLoading ? 'animate-pulse opacity-50' : '', className)}>
    {children}
  </div>
);

/**
 * Lazy loading wrapper with intersection observer
 */
export const LazyLoader: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}> = ({
  children,
  fallback = <SkeletonCard />,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  React.useEffect(() => {
    if (isVisible) {
      // Simulate loading time
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible && isLoaded ? children : fallback}
    </div>
  );
};

export default LoadingState;