import '@testing-library/jest-dom'

// Set test environment variable
process.env.NODE_ENV = 'test';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key, params) => {
    const translations = {
      // Hero translations
      'name': 'Ben H.',
      'title': 'Full-Stack Developer',
      'description': 'I create modern web applications with clean code and intuitive user experiences. Passionate about React, Node.js, and building scalable solutions.',
      'cta.viewWork': 'View My Work',
      'cta.downloadResume': 'Download Resume',
      'social.github': 'GitHub Profile',
      'social.linkedin': 'LinkedIn Profile', 
      'social.email': 'Send Email',
      
      // Footer translations
      'copyright': params ? `© ${params.year} Ben H. All rights reserved.` : '© 2025 Ben H. All rights reserved.',
      
      // Navigation translations
      'home': 'Home',
      'about': 'About',
      'skills': 'Skills',
      'projects': 'Projects',
      'blog': 'Blog',
      'contact': 'Contact',
      
      // Skills translations
      'skills.categories.mobile.title': 'Mobile Development',
      'skills.categories.backend.title': 'Backend & APIs',
      'skills.categories.frontend.title': 'Frontend Web',
      'skills.categories.tools.title': 'Tools & DevOps',
    };
    return translations[key] || key;
  },
  useFormatter: () => ({
    dateTime: (date) => date.toString(),
    number: (num) => num.toString(),
  }),
  useLocale: () => 'en',
}));

// Mock Next.js App Router hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    entries: jest.fn(),
    forEach: jest.fn(),
    toString: jest.fn(),
  })),
}));

// Mock custom hooks
jest.mock('@/hooks', () => ({
  useContactForm: () => ({
    formData: { name: '', email: '', subject: '', message: '' },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    resetForm: jest.fn(),
  }),
  useLanguageSwitcher: () => ({
    switchLanguage: jest.fn(),
    currentLocale: 'en',
  }),
  useLoadingState: () => ({
    isLoading: false,
    error: null,
    startLoading: jest.fn(),
    stopLoading: jest.fn(),
  }),
}));

// Mock analytics
jest.mock('@/components/Analytics', () => ({
  analytics: {
    track: jest.fn(),
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => children,
  useInView: jest.fn(() => true), // Mock useInView to always return true for tests
}))

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})