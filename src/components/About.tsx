'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    {
      category: 'Mobile Development',
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'MapKit'],
      color: 'blue'
    },
    {
      category: 'Backend & APIs',
      technologies: ['Python', 'FastAPI', 'Node.js', 'Express', 'OpenAI API'],
      color: 'green'
    },
    {
      category: 'Languages',
      technologies: ['Swift', 'Python', 'JavaScript', 'Java', 'TypeScript'],
      color: 'purple'
    },
    {
      category: 'Frontend Web',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      color: 'orange'
    },
    {
      category: 'Tools & Platforms',
      technologies: ['Xcode', 'Git', 'Docker', 'VS Code', 'Uvicorn'],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              I&apos;m a passionate full-stack software engineer with hands-on experience developing applications 
              across mobile, web, and AI integration platforms. My portfolio includes iOS applications, 
              FastAPI services with LLM integration, Java desktop applications, and community-driven web platforms, 
              showcasing my versatility in tackling diverse technical challenges.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From building native iOS apps with SwiftUI to creating robust Python APIs with AI capabilities, 
              I excel at selecting the right technology stack for each project. My experience spans real estate 
              applications, e-commerce platforms, task management systems, and identity verification solutions, 
              demonstrating my ability to deliver practical, user-focused applications.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(skillGroup.color)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;