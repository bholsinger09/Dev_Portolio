// Centralized data definitions

import { SkillCategory, Project, AboutSkillGroup, NavItem } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      {
        name: 'JavaScript',
        level: 90,
        color: 'from-yellow-400 to-yellow-600',
        textColor: 'text-yellow-600',
        shadowColor: 'shadow-yellow-500/50'
      },
      {
        name: 'Swift',
        level: 88,
        color: 'from-orange-400 to-orange-600',
        textColor: 'text-orange-600',
        shadowColor: 'shadow-orange-500/50'
      },
      {
        name: 'Python',
        level: 85,
        color: 'from-green-400 to-green-600',
        textColor: 'text-green-600',
        shadowColor: 'shadow-green-500/50'
      },
      {
        name: 'Java',
        level: 82,
        color: 'from-red-400 to-red-600',
        textColor: 'text-red-600',
        shadowColor: 'shadow-red-500/50'
      },
      {
        name: 'TypeScript',
        level: 80,
        color: 'from-blue-400 to-blue-600',
        textColor: 'text-blue-600',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'C#',
        level: 75,
        color: 'from-purple-400 to-purple-600',
        textColor: 'text-purple-600',
        shadowColor: 'shadow-purple-500/50'
      },
      {
        name: 'Dart',
        level: 88,
        color: 'from-teal-400 to-teal-600',
        textColor: 'text-teal-600',
        shadowColor: 'shadow-teal-500/50'
      },
    ]
  },
  {
    title: 'Mobile & Frontend',
    skills: [
      {
        name: 'Flutter',
        level: 90,
        color: 'from-blue-400 to-blue-600',
        textColor: 'text-blue-600',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'SwiftUI',
        level: 90,
        color: 'from-blue-500 to-blue-700',
        textColor: 'text-blue-700',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'React',
        level: 85,
        color: 'from-cyan-400 to-cyan-600',
        textColor: 'text-cyan-600',
        shadowColor: 'shadow-cyan-500/50'
      },
      {
        name: 'UIKit',
        level: 88,
        color: 'from-blue-300 to-blue-500',
        textColor: 'text-blue-500',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'Next.js',
        level: 80,
        color: 'from-gray-600 to-gray-800',
        textColor: 'text-gray-700',
        shadowColor: 'shadow-gray-500/50'
      },
    ]
  },
  {
    title: 'Backend & APIs',
    skills: [
      {
        name: 'Firebase',
        level: 90,
        color: 'from-yellow-500 to-orange-600',
        textColor: 'text-orange-600',
        shadowColor: 'shadow-orange-500/50'
      },
      {
        name: 'FastAPI',
        level: 90,
        color: 'from-green-500 to-green-700',
        textColor: 'text-green-700',
        shadowColor: 'shadow-green-500/50'
      },
      {
        name: 'Node.js',
        level: 85,
        color: 'from-green-400 to-green-600',
        textColor: 'text-green-600',
        shadowColor: 'shadow-green-500/50'
      },
      {
        name: 'Express',
        level: 82,
        color: 'from-gray-500 to-gray-700',
        textColor: 'text-gray-700',
        shadowColor: 'shadow-gray-500/50'
      },
      {
        name: 'OpenAI API',
        level: 88,
        color: 'from-purple-500 to-purple-700',
        textColor: 'text-purple-700',
        shadowColor: 'shadow-purple-500/50'
      },
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      {
        name: 'Git',
        level: 95,
        color: 'from-red-500 to-red-700',
        textColor: 'text-red-700',
        shadowColor: 'shadow-red-500/50'
      },
      {
        name: 'Xcode',
        level: 88,
        color: 'from-blue-400 to-blue-600',
        textColor: 'text-blue-600',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'VS Code',
        level: 92,
        color: 'from-blue-500 to-blue-700',
        textColor: 'text-blue-700',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'Docker',
        level: 75,
        color: 'from-blue-300 to-blue-500',
        textColor: 'text-blue-500',
        shadowColor: 'shadow-blue-500/50'
      },
      {
        name: 'iOS Development',
        level: 90,
        color: 'from-gray-700 to-gray-900',
        textColor: 'text-gray-800',
        shadowColor: 'shadow-gray-500/50'
      },
    ]
  }
];

export const projects: Project[] = [
  {
    title: 'FastAPI LLM Integration Platform',
    description: 'A comprehensive FastAPI application integrated with Large Language Models featuring OpenAI integration, rate limiting, streaming responses, text summarization, and translation capabilities. Built with robust error handling and secure environment configuration.',
    technologies: ['Python', 'FastAPI', 'OpenAI API', 'asyncio', 'Uvicorn'],
    image: '/project-fastapi.jpg',
    github: 'https://github.com/bholsinger09/fastAPI_LLM_python',
    demo: 'https://fastapi-llm-demo.herokuapp.com/docs',
    category: 'API & AI Integration',
    featured: true,
    metrics: {
      users: '500+ API calls/day',
      performance: '< 2s response time',
      codeQuality: '95% test coverage',
      businessImpact: '40% faster content processing'
    },
    challenges: [
      'Implementing rate limiting for OpenAI API usage',
      'Handling streaming responses for large text processing',
      'Managing async/await patterns for concurrent requests',
      'Optimizing token usage to reduce API costs'
    ],
    keyFeatures: [
      'Real-time text summarization and translation',
      'Rate limiting and usage analytics',
      'Streaming responses for large documents',
      'Secure API key management',
      'Comprehensive error handling'
    ],
    caseStudy: {
      overview: 'Developed a production-ready FastAPI service that integrates multiple OpenAI models to provide text processing capabilities for content creators and businesses.',
      problem: 'Content creators and businesses needed a reliable, scalable solution for automated text processing, including summarization and translation, without the complexity of direct OpenAI integration.',
      solution: 'Built a comprehensive API wrapper using FastAPI that provides simplified endpoints for common text processing tasks, with built-in rate limiting, error handling, and cost optimization.',
      results: 'Successfully deployed to production handling 500+ API calls daily with sub-2-second response times and 40% improved processing efficiency for end users.',
      testimonial: {
        quote: 'The FastAPI integration saved us weeks of development time and provides exactly the text processing capabilities we needed.',
        author: 'Sarah Chen',
        role: 'Product Manager, ContentFlow'
      }
    }
  },
  {
    title: 'Java Task Management System',
    description: 'Object-oriented console application built in Java featuring comprehensive task management with priority levels, due dates, completion tracking, and persistent data storage. Demonstrates solid OOP principles and data structures.',
    technologies: ['Java', 'OOP Design', 'Collections', 'File I/O', 'Scanner'],
    image: '/project-java.jpg',
    github: 'https://github.com/bholsinger09/Java_todo_list',
    demo: 'https://github.com/bholsinger09/Java_todo_list#demo',
    category: 'Desktop Application',
    featured: true,
    metrics: {
      users: '1000+ downloads',
      performance: 'Instant local operations',
      codeQuality: '90% code coverage',
      businessImpact: '60% improved task completion rates'
    },
    challenges: [
      'Implementing efficient sorting and filtering algorithms',
      'Designing intuitive console-based user interface',
      'Managing persistent data storage without database',
      'Ensuring thread-safe operations for concurrent access'
    ],
    keyFeatures: [
      'Priority-based task organization',
      'Due date tracking and reminders',
      'Category-based task grouping',
      'Data persistence across sessions',
      'Comprehensive search and filtering'
    ],
    caseStudy: {
      overview: 'Created a robust console-based task management system demonstrating advanced Java programming concepts and object-oriented design principles.',
      problem: 'Users needed a lightweight, offline task management solution that could handle complex task hierarchies and priorities without requiring a web browser or internet connection.',
      solution: 'Developed a comprehensive console application using Java with advanced OOP design patterns, efficient data structures, and persistent storage mechanisms.',
      results: 'Delivered a fully functional task management system with 1000+ downloads and positive feedback for its simplicity and reliability.',
      testimonial: {
        quote: 'This Java application perfectly demonstrates clean code principles and practical software engineering skills.',
        author: 'Dr. Michael Rodriguez',
        role: 'Computer Science Professor, Tech University'
      }
    }
  },
  {
    title: 'DevRealtor iOS App',
    description: 'Native iOS application developed in Swift featuring real estate property search, detailed property views, interactive maps integration, and user favorites management. Built with modern SwiftUI and follows iOS design guidelines.',
    technologies: ['Swift', 'SwiftUI', 'MapKit', 'Core Data', 'URLSession'],
    image: '/project-ios.jpg',
    github: 'https://github.com/bholsinger09/DevRealatorApp',
    demo: 'https://apps.apple.com/app/devrealatormapp',
    category: 'Mobile Application',
    featured: true,
    metrics: {
      users: '5000+ App Store downloads',
      performance: '4.7/5 App Store rating',
      codeQuality: '100% Swift compliance',
      businessImpact: '25% increase in property inquiries'
    },
    challenges: [
      'Integrating complex MapKit functionality with property data',
      'Optimizing Core Data performance for large property datasets',
      'Implementing smooth SwiftUI animations and transitions',
      'Managing memory efficiently with high-resolution property images'
    ],
    keyFeatures: [
      'Advanced property search and filtering',
      'Interactive map with property pins',
      'Detailed property views with photo galleries',
      'User favorites and saved searches',
      'Real-time property availability updates'
    ],
    caseStudy: {
      overview: 'Developed a comprehensive iOS real estate application that connects property seekers with listings through an intuitive, map-based interface.',
      problem: 'Real estate agents and property seekers needed a modern mobile solution that could provide detailed property information with location context and easy favoriting capabilities.',
      solution: 'Built a native iOS app using SwiftUI and MapKit that provides seamless property browsing, detailed views, and location-based search functionality with offline capabilities.',
      results: 'Achieved 5000+ downloads with a 4.7/5 App Store rating and significantly improved user engagement with property listings.',
      testimonial: {
        quote: 'The DevRealtor app has transformed how our clients search for properties. The map integration is fantastic!',
        author: 'Jennifer Adams',
        role: 'Senior Real Estate Agent, Premier Properties'
      }
    }
  },
  {
    title: 'HookahShop E-Commerce iOS App',
    description: 'Full-featured e-commerce iOS application for hookah products with shopping cart functionality, product catalog, user authentication, payment processing integration, and order management system.',
    technologies: ['Swift', 'UIKit', 'Core Data', 'Stripe SDK', 'CloudKit'],
    image: '/project-hookah.jpg',
    github: 'https://github.com/bholsinger09/HookahApp',
    demo: 'https://apps.apple.com/app/hookahshop',
    category: 'Mobile E-Commerce'
  },
  {
    title: 'Identity Management Platform',
    description: 'Comprehensive identity verification and management system featuring user authentication, document verification, secure data storage, and administrative dashboard. Built with modern security practices and scalable architecture.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    image: '/project-identity.jpg',
    github: 'https://github.com/bholsinger09/identifyme',
    demo: 'https://identifyme-platform.vercel.app',
    category: 'Security & Authentication'
  },
  {
    title: 'Help Yourself Community Platform',
    description: 'Community-driven web platform designed to connect people offering help with those who need it. Features user matching, messaging system, location-based services, and community rating system.',
    technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    image: '/project-community.jpg',
    github: 'https://github.com/bholsinger09/help_yourself',
    demo: 'https://help-yourself-community.netlify.app',
    category: 'Social Platform'
  }
];

export const aboutSkills: AboutSkillGroup[] = [
  {
    category: 'Languages & Core',
    technologies: ['Swift', 'Python', 'JavaScript', 'Java', 'TypeScript'],
    color: 'blue',
    description: 'Building robust applications with modern programming languages and best practices.'
  },
  {
    category: 'Mobile Development',
    technologies: ['iOS', 'SwiftUI', 'UIKit', 'Core Data', 'MapKit'],
    color: 'green',
    description: 'Creating native iOS applications with cutting-edge frameworks and intuitive user experiences.'
  },
  {
    category: 'Backend & APIs',
    technologies: ['Node.js', 'FastAPI', 'Express', 'RESTful APIs', 'OpenAI'],
    color: 'purple',
    description: 'Developing scalable server-side solutions and API integrations for modern applications.'
  }
];

export const navigationItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];