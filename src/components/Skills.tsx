'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
        { name: 'TypeScript', level: 90, color: 'bg-blue-500' },
        { name: 'Java', level: 88, color: 'bg-red-500' },
        { name: 'Python', level: 85, color: 'bg-green-500' },
        { name: 'C#', level: 82, color: 'bg-purple-500' },
        { name: 'Swift', level: 80, color: 'bg-orange-500' },
      ]
    },
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'React', level: 95, color: 'bg-cyan-500' },
        { name: 'Next.js', level: 90, color: 'bg-gray-700' },
        { name: 'SwiftUI', level: 85, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 88, color: 'bg-teal-500' },
        { name: 'HTML/CSS', level: 95, color: 'bg-orange-600' },
      ]
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'Node.js', level: 92, color: 'bg-green-600' },
        { name: 'Spring Boot', level: 85, color: 'bg-green-700' },
        { name: '.NET Core', level: 80, color: 'bg-purple-600' },
        { name: 'PostgreSQL', level: 88, color: 'bg-blue-700' },
        { name: 'MongoDB', level: 85, color: 'bg-green-800' },
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Docker', level: 85, color: 'bg-blue-500' },
        { name: 'AWS', level: 78, color: 'bg-orange-500' },
        { name: 'Git', level: 95, color: 'bg-red-600' },
        { name: 'CI/CD', level: 82, color: 'bg-indigo-500' },
        { name: 'Kubernetes', level: 75, color: 'bg-blue-600' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive technical skills across the full development stack, 
            from mobile applications to enterprise-level systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">{skill.name}</span>
                      <span className="text-gray-600 text-sm">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`${skill.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-gray-600">Languages Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Problem Solving</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;