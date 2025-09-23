// Shared constants and configuration

export const ANIMATION_DURATIONS = {
  DEFAULT: 0.6,
  FAST: 0.3,
  SLOW: 1.0,
  STAGGER_DELAY: 0.1,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const CONTAINER_CLASSES = {
  MAX_WIDTH_4XL: 'max-w-4xl',
  MAX_WIDTH_5XL: 'max-w-5xl',
  MAX_WIDTH_6XL: 'max-w-6xl',
  MAX_WIDTH_7XL: 'max-w-7xl',
  CENTERED: 'mx-auto',
  PADDING: 'px-4 sm:px-6 lg:px-8',
  SECTION_PADDING: 'py-20',
} as const;

export const Z_INDEX = {
  HEADER: 50,
  MODAL: 100,
  TOOLTIP: 200,
} as const;

// Color mappings for technologies
export const TECHNOLOGY_COLORS = {
  JavaScript: 'bg-yellow-100 text-yellow-800',
  TypeScript: 'bg-blue-100 text-blue-800',
  React: 'bg-cyan-100 text-cyan-800',
  'Node.js': 'bg-green-100 text-green-800',
  Java: 'bg-red-100 text-red-800',
  Python: 'bg-green-100 text-green-800',
  'C#': 'bg-purple-100 text-purple-800',
  Swift: 'bg-orange-100 text-orange-800',
  PostgreSQL: 'bg-blue-100 text-blue-800',
  MongoDB: 'bg-green-100 text-green-800',
  DEFAULT: 'bg-gray-100 text-gray-800',
} as const;

// Contact form validation rules
export const FORM_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;