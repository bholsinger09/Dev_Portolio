'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { name: 'Swift', level: 88, color: 'bg-orange-500' },
        { name: 'Python', level: 85, color: 'bg-green-500' },
        { name: 'Java', level: 82, color: 'bg-red-500' },
        { name: 'TypeScript', level: 80, color: 'bg-blue-500' },
        { name: 'C#', level: 75, color: 'bg-purple-500' },
      ]
    },
    {
      title: 'Mobile & Frontend',
      skills: [
        { name: 'SwiftUI', level: 90, color: 'bg-blue-600' },
        { name: 'UIKit', level: 88, color: 'bg-blue-500' },
        { name: 'React', level: 85, color: 'bg-cyan-500' },
        { name: 'Core Data', level: 82, color: 'bg-orange-400' },
        { name: 'Next.js', level: 80, color: 'bg-gray-700' },
      ]
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'FastAPI', level: 90, color: 'bg-green-600' },
        { name: 'Node.js', level: 85, color: 'bg-green-500' },
        { name: 'Express', level: 82, color: 'bg-gray-600' },
        { name: 'OpenAI API', level: 88, color: 'bg-purple-600' },
        { name: 'RESTful APIs', level: 90, color: 'bg-blue-600' },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', level: 95, color: 'bg-red-600' },
        { name: 'Xcode', level: 88, color: 'bg-blue-500' },
        { name: 'VS Code', level: 92, color: 'bg-blue-600' },
        { name: 'Docker', level: 75, color: 'bg-blue-400' },
        { name: 'iOS Development', level: 90, color: 'bg-gray-800' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            Comprehensive technical skills across the full development stack,
            from mobile applications to enterprise-level systems.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl w-full">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h3 
                className="text-2xl font-semibold text-gray-900 mb-6 text-center" 
                style={{ textAlign: 'center', width: '100%' }}
              >
                {category.title}
              </h3>

              <div 
                className="space-y-4" 
                style={{ width: '100%', maxWidth: '400px' }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="space-y-2"
                    style={{ textAlign: 'center' }}
                  >
                    <div 
                      className="flex justify-between items-center" 
                      style={{ textAlign: 'center' }}
                    >
                      <span 
                        className="text-gray-800 font-medium" 
                        style={{ textAlign: 'left' }}
                      >
                        {skill.name}
                      </span>
                      <span 
                        className="text-gray-600 text-sm" 
                        style={{ textAlign: 'right' }}
                      >
                        {skill.level}%
                      </span>
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
              <div className="text-3xl font-bold text-blue-600">3+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">6</div>
              <div className="text-gray-600">Languages Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4</div>
              <div className="text-gray-600">Platforms Mastered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;