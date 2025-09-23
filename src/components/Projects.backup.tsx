'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'FastAPI LLM Integration Platform',
      description: 'A comprehensive FastAPI application integrated with Large Language Models featuring OpenAI integration, rate limiting, streaming responses, text summarization, and translation capabilities. Built with robust error handling and secure environment configuration.',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'asyncio', 'Uvicorn'],
      image: '/project-fastapi.jpg',
      github: 'https://github.com/bholsinger09/fastAPI_LLM_python',
      demo: 'https://fastapi-llm-demo.herokuapp.com/docs',
      category: 'API & AI Integration'
    },
    {
      title: 'Java Task Management System',
      description: 'Object-oriented console application built in Java featuring comprehensive task management with priority levels, due dates, completion tracking, and persistent data storage. Demonstrates solid OOP principles and data structures.',
      technologies: ['Java', 'OOP Design', 'Collections', 'File I/O', 'Scanner'],
      image: '/project-java.jpg',
      github: 'https://github.com/bholsinger09/Java_todo_list',
      demo: 'https://github.com/bholsinger09/Java_todo_list#demo',
      category: 'Desktop Application'
    },
    {
      title: 'DevRealtor iOS App',
      description: 'Native iOS application developed in Swift featuring real estate property search, detailed property views, interactive maps integration, and user favorites management. Built with modern SwiftUI and follows iOS design guidelines.',
      technologies: ['Swift', 'SwiftUI', 'MapKit', 'Core Data', 'URLSession'],
      image: '/project-ios.jpg',
      github: 'https://github.com/bholsinger09/DevRealatorApp',
      demo: 'https://apps.apple.com/app/devrealatormapp',
      category: 'Mobile Application'
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A showcase of my work across different technologies and domains, demonstrating
            full-stack development capabilities and problem-solving skills.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mx-auto w-full max-w-sm"
              >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.category === 'API & AI Integration' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <div className="text-lg font-semibold">FastAPI + AI</div>
                      <div className="text-sm opacity-75">Python • OpenAI • LLM</div>
                    </div>
                  )}
                  {project.category === 'Desktop Application' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">☕</div>
                      <div className="text-lg font-semibold">Java Application</div>
                      <div className="text-sm opacity-75">OOP • Collections • Console</div>
                    </div>
                  )}
                  {project.category === 'Mobile Application' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-lg font-semibold">iOS Development</div>
                      <div className="text-sm opacity-75">Swift • SwiftUI • MapKit</div>
                    </div>
                  )}
                  {project.category === 'Mobile E-Commerce' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🛍️</div>
                      <div className="text-lg font-semibold">E-Commerce iOS</div>
                      <div className="text-sm opacity-75">Swift • Payments • Cloud</div>
                    </div>
                  )}
                  {project.category === 'Security & Authentication' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🔐</div>
                      <div className="text-lg font-semibold">Identity Platform</div>
                      <div className="text-sm opacity-75">Security • Verification • Auth</div>
                    </div>
                  )}
                  {project.category === 'Social Platform' && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🤝</div>
                      <div className="text-lg font-semibold">Community App</div>
                      <div className="text-sm opacity-75">React • Real-time • Social</div>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className="p-6 text-center" 
                style={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-2 text-center" 
                  style={{ textAlign: 'center', width: '100%' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-gray-600 text-sm mb-4 leading-relaxed text-center" 
                  style={{ textAlign: 'center', width: '100%' }}
                >
                  {project.description}
                </p>

                <div 
                  className="flex flex-wrap gap-2 mb-4 justify-center" 
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded text-xs font-medium ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-4">
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
      </div>
    </section>
  );
};

export default Projects;