'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SwiftUI'],
      color: 'blue'
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'Spring Boot', '.NET Core', 'Django'],
      color: 'green'
    },
    {
      category: 'Languages',
      technologies: ['JavaScript', 'Java', 'Python', 'C#', 'Swift'],
      color: 'purple'
    },
    {
      category: 'Databases',
      technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite'],
      color: 'orange'
    },
    {
      category: 'Tools & DevOps',
      technologies: ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes'],
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
              I'm a passionate full-stack software engineer with extensive experience in developing 
              scalable applications across multiple platforms and technologies. My diverse background 
              allows me to tackle complex challenges from mobile iOS applications to enterprise-level 
              web systems and data analytics platforms.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With a strong foundation in software engineering principles and a continuous learning mindset, 
              I excel at architecting efficient solutions, optimizing performance, and delivering 
              user-centric applications that drive business value and enhance user experiences.
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