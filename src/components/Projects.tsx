'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with React, Node.js, and PostgreSQL featuring real-time inventory management, payment processing, and admin dashboard.',
      technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '/project-ecommerce.jpg',
      github: 'https://github.com/yourusername/ecommerce-platform',
      demo: 'https://your-ecommerce-demo.vercel.app',
      category: 'Web Application'
    },
    {
      title: 'Microservices API Gateway',
      description: 'Enterprise-grade microservices architecture built with Spring Boot, featuring service discovery, load balancing, and comprehensive monitoring.',
      technologies: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Redis'],
      image: '/project-microservices.jpg',
      github: 'https://github.com/yourusername/microservices-gateway',
      demo: 'https://api-docs.your-domain.com',
      category: 'Backend System'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Real-time analytics platform using Python Django, with interactive visualizations, machine learning insights, and automated reporting.',
      technologies: ['Python', 'Django', 'Pandas', 'D3.js', 'PostgreSQL'],
      image: '/project-analytics.jpg',
      github: 'https://github.com/yourusername/analytics-dashboard',
      demo: 'https://analytics-dashboard-demo.herokuapp.com',
      category: 'Data Science'
    },
    {
      title: 'Enterprise CRM System',
      description: 'Comprehensive customer relationship management system built with .NET Core, featuring advanced reporting, automation, and integration capabilities.',
      technologies: ['C#', '.NET Core', 'Entity Framework', 'SQL Server', 'SignalR'],
      image: '/project-crm.jpg',
      github: 'https://github.com/yourusername/enterprise-crm',
      demo: 'https://crm-demo.your-domain.com',
      category: 'Enterprise Application'
    },
    {
      title: 'iOS Fitness Tracker',
      description: 'Native iOS application with SwiftUI, HealthKit integration, CoreData persistence, and real-time workout tracking with social features.',
      technologies: ['Swift', 'SwiftUI', 'HealthKit', 'CoreData', 'CloudKit'],
      image: '/project-fitness.jpg',
      github: 'https://github.com/yourusername/fitness-tracker-ios',
      demo: 'https://apps.apple.com/app/your-fitness-app',
      category: 'Mobile Application'
    },
    {
      title: 'Real-time Chat Platform',
      description: 'Cross-platform messaging application with end-to-end encryption, file sharing, and video calling capabilities.',
      technologies: ['TypeScript', 'React Native', 'WebRTC', 'Socket.io', 'MongoDB'],
      image: '/project-chat.jpg',
      github: 'https://github.com/yourusername/chat-platform',
      demo: 'https://chat-platform-demo.netlify.app',
      category: 'Full-Stack Application'
    }
  ];

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'TypeScript': 'bg-blue-100 text-blue-800',
      'React': 'bg-cyan-100 text-cyan-800',
      'Node.js': 'bg-green-100 text-green-800',
      'Java': 'bg-red-100 text-red-800',
      'Python': 'bg-green-100 text-green-800',
      'C#': 'bg-purple-100 text-purple-800',
      'Swift': 'bg-orange-100 text-orange-800',
      'PostgreSQL': 'bg-blue-100 text-blue-800',
      'MongoDB': 'bg-green-100 text-green-800',
    };
    return colors[tech] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my work across different technologies and domains, demonstrating 
            full-stack development capabilities and problem-solving skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">📱</div>
                    <div className="text-sm opacity-75">{project.category}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded text-xs font-medium ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;