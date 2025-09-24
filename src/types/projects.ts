// Extended project types for enhanced portfolio showcase
import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  image: string | StaticImageData;
  images?: (string | StaticImageData)[];
  github: string;
  demo: string;
  category: string;
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'planning';
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  client?: string;
  caseStudy?: ProjectCaseStudy;
  metrics?: ProjectMetrics;
  challenges?: Challenge[];
  learnings?: string[];
  futureEnhancements?: string[];
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  approach: string[];
  technicalImplementation: TechnicalImplementation;
  results: string[];
  testimonial?: Testimonial;
}

export interface TechnicalImplementation {
  architecture: string;
  keyFeatures: Feature[];
  codeHighlights: CodeHighlight[];
  infrastructure?: string;
  security?: string[];
  performance?: PerformanceOptimization[];
}

export interface Feature {
  title: string;
  description: string;
  implementation: string;
  technologies: string[];
}

export interface CodeHighlight {
  title: string;
  description: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface PerformanceOptimization {
  metric: string;
  before: string;
  after: string;
  improvement: string;
  technique: string;
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
  outcome: string;
  skillsGained?: string[];
}

export interface ProjectMetrics {
  users?: number;
  performance?: {
    loadTime?: string;
    responseTime?: string;
    uptime?: string;
  };
  codeQuality?: {
    testCoverage?: string;
    linesOfCode?: number;
    maintainabilityIndex?: string;
  };
  business?: {
    userSatisfaction?: string;
    conversionRate?: string;
    revenue?: string;
  };
}

export interface Testimonial {
  text: string;
  author: string;
  position: string;
  company?: string;
  avatar?: string;
}

// Project filtering and categorization
export type ProjectCategory = 
  | 'API & AI Integration'
  | 'Desktop Application'
  | 'Mobile Application'
  | 'Mobile E-Commerce'
  | 'Security & Authentication'
  | 'Social Platform'
  | 'Web Application'
  | 'Full-Stack Application';

export type ProjectTechnology = 
  | 'Python' | 'FastAPI' | 'OpenAI API' | 'asyncio' | 'Uvicorn'
  | 'Java' | 'OOP Design' | 'Collections' | 'File I/O' | 'Scanner'
  | 'Swift' | 'SwiftUI' | 'UIKit' | 'MapKit' | 'Core Data' | 'URLSession' | 'Stripe SDK' | 'CloudKit'
  | 'JavaScript' | 'TypeScript' | 'Node.js' | 'Express' | 'React' | 'Next.js'
  | 'MongoDB' | 'PostgreSQL' | 'JWT' | 'Socket.io'
  | 'Docker' | 'AWS' | 'Vercel' | 'Heroku';

export interface ProjectFilter {
  category?: ProjectCategory;
  technology?: ProjectTechnology;
  status?: Project['status'];
  featured?: boolean;
}

export interface ProjectSortOptions {
  by: 'title' | 'date' | 'category' | 'featured';
  order: 'asc' | 'desc';
}

export interface ProjectViewMode {
  layout: 'grid' | 'list' | 'showcase';
  showDetails: boolean;
  showCaseStudies: boolean;
}