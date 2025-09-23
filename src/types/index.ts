// Shared TypeScript type definitions

export interface Skill {
  name: string;
  level: number;
  color: string;
  textColor: string;
  shadowColor: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface AboutSkillGroup {
  category: string;
  technologies: string[];
  color: string;
  description: string;
}

// Animation configuration types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  staggerDelay?: number;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Technology color mapping
export type TechnologyType = 
  | 'JavaScript' 
  | 'TypeScript' 
  | 'React' 
  | 'Node.js' 
  | 'Java' 
  | 'Python' 
  | 'C#' 
  | 'Swift'
  | 'PostgreSQL'
  | 'MongoDB';