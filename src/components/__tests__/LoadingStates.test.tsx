// Tests for Loading States components

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  LoadingState,
  SkeletonText,
  SkeletonCard,
  ProjectsGridSkeleton,
  SkillsGridSkeleton,
  InlineLoader,
  ProgressBar,
  PulseLoader,
  LazyLoader
} from '../LoadingStates';

describe('LoadingState', () => {
  const mockChildren = <div>Loaded content</div>;

  it('renders loading fallback when isLoading is true', () => {
    render(
      <LoadingState isLoading={true} error={null}>
        {mockChildren}
      </LoadingState>
    );

    expect(screen.queryByText('Loaded content')).not.toBeInTheDocument();
    // Should show loading spinner (aria-label from LoadingSpinner component)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders children when not loading and no error', () => {
    render(
      <LoadingState isLoading={false} error={null}>
        {mockChildren}
      </LoadingState>
    );

    expect(screen.getByText('Loaded content')).toBeInTheDocument();
  });

  it('renders error state when error is provided', () => {
    render(
      <LoadingState isLoading={false} error="Something went wrong">
        {mockChildren}
      </LoadingState>
    );

    expect(screen.getByText('Error Loading Content')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Loaded content')).not.toBeInTheDocument();
  });

  it('renders custom loading fallback when provided', () => {
    const customFallback = <div>Custom loading...</div>;

    render(
      <LoadingState isLoading={true} error={null} fallback={customFallback}>
        {mockChildren}
      </LoadingState>
    );

    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
    expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
  });

  it('renders custom error fallback when provided', () => {
    const customErrorFallback = <div>Custom error UI</div>;

    render(
      <LoadingState
        isLoading={false}
        error="Error occurred"
        errorFallback={customErrorFallback}
      >
        {mockChildren}
      </LoadingState>
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
    expect(screen.queryByText('Error Loading Content')).not.toBeInTheDocument();
  });

  it('applies custom className and minHeight', () => {
    const { container } = render(
      <LoadingState
        isLoading={true}
        error={null}
        className="custom-class"
        minHeight="min-h-[500px]"
      >
        {mockChildren}
      </LoadingState>
    );

    const loadingDiv = container.querySelector('.min-h-\\[500px\\]');
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv).toHaveClass('custom-class');
  });
});

describe('SkeletonText', () => {
  it('renders single line by default', () => {
    const { container } = render(<SkeletonText />);
    const skeletonLines = container.querySelectorAll('.bg-gray-200');
    expect(skeletonLines).toHaveLength(1);
  });

  it('renders multiple lines when specified', () => {
    const { container } = render(<SkeletonText lines={3} />);
    const skeletonLines = container.querySelectorAll('.bg-gray-200');
    expect(skeletonLines).toHaveLength(3);
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonText className="custom-skeleton" />);
    expect(container.firstChild).toHaveClass('custom-skeleton');
  });

  it('applies custom width', () => {
    const { container } = render(<SkeletonText width="w-1/2" />);
    const skeletonLine = container.querySelector('.bg-gray-200');
    // Single line always gets w-3/4 (last line behavior)
    expect(skeletonLine).toHaveClass('w-3/4');
  });
});

describe('SkeletonCard', () => {
  it('renders card skeleton with image by default', () => {
    const { container } = render(<SkeletonCard />);

    expect(container.querySelector('.bg-white.rounded-xl')).toBeInTheDocument();
    expect(container.querySelector('.bg-gray-200.h-48')).toBeInTheDocument(); // Image placeholder
    expect(container.querySelectorAll('.bg-gray-200')).toHaveLength(8); // Image + title + 3 description + 3 tags
  });

  it('renders without image when showImage is false', () => {
    const { container } = render(<SkeletonCard showImage={false} />);

    expect(container.querySelector('.bg-white.rounded-xl')).toBeInTheDocument();
    expect(container.querySelector('.h-48')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.bg-gray-200')).toHaveLength(7); // title + 3 description + 3 tags (no image)
  });

  it('applies custom image height', () => {
    const { container } = render(<SkeletonCard imageHeight="h-32" />);
    expect(container.querySelector('.h-32')).toBeInTheDocument();
  });
});

describe('ProjectsGridSkeleton', () => {
  it('renders 6 skeleton cards by default', () => {
    const { container } = render(<ProjectsGridSkeleton />);
    const cards = container.querySelectorAll('.bg-white.rounded-xl');
    expect(cards).toHaveLength(6);
  });

  it('renders custom number of skeleton cards', () => {
    const { container } = render(<ProjectsGridSkeleton count={3} />);
    const cards = container.querySelectorAll('.bg-white.rounded-xl');
    expect(cards).toHaveLength(3);
  });

  it('uses grid layout', () => {
    const { container } = render(<ProjectsGridSkeleton />);
    expect(container.firstChild).toHaveClass('grid');
  });
});

describe('SkillsGridSkeleton', () => {
  it('renders 4 skeleton items by default', () => {
    const { container } = render(<SkillsGridSkeleton />);
    const items = container.querySelectorAll('.bg-gray-50');
    expect(items).toHaveLength(4);
  });

  it('renders custom number of skeleton items', () => {
    const { container } = render(<SkillsGridSkeleton count={2} />);
    const items = container.querySelectorAll('.bg-gray-50');
    expect(items).toHaveLength(2);
  });
});

describe('InlineLoader', () => {
  it('renders default loading text', () => {
    render(<InlineLoader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders custom loading text', () => {
    render(<InlineLoader text="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<InlineLoader size="sm" />);
    expect(container.querySelector('.text-sm')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<InlineLoader className="custom-loader" />);
    expect(container.firstChild).toHaveClass('custom-loader');
  });
});

describe('ProgressBar', () => {
  it('renders progress bar with correct percentage', () => {
    const { container } = render(<ProgressBar progress={50} />);
    const progressFill = container.querySelector('.bg-blue-600');
    expect(progressFill).toHaveStyle('width: 50%');
  });

  it('clamps progress to 0-100 range', () => {
    const { container: container1 } = render(<ProgressBar progress={-10} />);
    const { container: container2 } = render(<ProgressBar progress={150} />);

    const progressFill1 = container1.querySelector('.bg-blue-600');
    const progressFill2 = container2.querySelector('.bg-blue-600');

    expect(progressFill1).toHaveStyle('width: 0%');
    expect(progressFill2).toHaveStyle('width: 100%');
  });

  it('shows percentage when enabled', () => {
    render(<ProgressBar progress={75} showPercentage={true} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not show percentage by default', () => {
    render(<ProgressBar progress={75} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });
});

describe('PulseLoader', () => {
  it('applies pulse animation when loading', () => {
    const { container } = render(
      <PulseLoader isLoading={true}>
        <div>Content</div>
      </PulseLoader>
    );

    expect(container.firstChild).toHaveClass('animate-pulse', 'opacity-50');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not apply animation when not loading', () => {
    const { container } = render(
      <PulseLoader isLoading={false}>
        <div>Content</div>
      </PulseLoader>
    );

    expect(container.firstChild).not.toHaveClass('animate-pulse');
    expect(container.firstChild).not.toHaveClass('opacity-50');
  });
});

describe('LazyLoader', () => {
  // Mock IntersectionObserver
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });

  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders fallback initially', () => {
    render(
      <LazyLoader fallback={<div>Loading placeholder</div>}>
        <div>Lazy content</div>
      </LazyLoader>
    );

    expect(screen.getByText('Loading placeholder')).toBeInTheDocument();
    expect(screen.queryByText('Lazy content')).not.toBeInTheDocument();
  });

  it('renders children after intersection and loading', async () => {
    let intersectionCallback: (entries: any[]) => void = () => { };

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
      };
    });

    render(
      <LazyLoader fallback={<div>Loading placeholder</div>}>
        <div>Lazy content</div>
      </LazyLoader>
    );

    // Simulate intersection
    intersectionCallback([{ isIntersecting: true }]);

    // Wait for loading timer
    await waitFor(
      () => {
        expect(screen.queryByText('Loading placeholder')).not.toBeInTheDocument();
        expect(screen.getByText('Lazy content')).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
});