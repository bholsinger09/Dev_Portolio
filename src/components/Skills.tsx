'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-yellow-600', textColor: 'text-yellow-600', shadowColor: 'shadow-yellow-500/50' },
        { name: 'Swift', level: 88, color: 'from-orange-400 to-orange-600', textColor: 'text-orange-600', shadowColor: 'shadow-orange-500/50' },
        { name: 'Python', level: 85, color: 'from-green-400 to-green-600', textColor: 'text-green-600', shadowColor: 'shadow-green-500/50' },
        { name: 'Java', level: 82, color: 'from-red-400 to-red-600', textColor: 'text-red-600', shadowColor: 'shadow-red-500/50' },
        { name: 'TypeScript', level: 80, color: 'from-blue-400 to-blue-600', textColor: 'text-blue-600', shadowColor: 'shadow-blue-500/50' },
        { name: 'C#', level: 75, color: 'from-purple-400 to-purple-600', textColor: 'text-purple-600', shadowColor: 'shadow-purple-500/50' },
      ]
    },
    {
      title: 'Mobile & Frontend',
      skills: [
        { name: 'SwiftUI', level: 90, color: 'from-blue-500 to-blue-700', textColor: 'text-blue-700', shadowColor: 'shadow-blue-500/50' },
        { name: 'UIKit', level: 88, color: 'from-blue-400 to-blue-600', textColor: 'text-blue-600', shadowColor: 'shadow-blue-500/50' },
        { name: 'React', level: 85, color: 'from-cyan-400 to-cyan-600', textColor: 'text-cyan-600', shadowColor: 'shadow-cyan-500/50' },
        { name: 'Core Data', level: 82, color: 'from-orange-400 to-orange-500', textColor: 'text-orange-500', shadowColor: 'shadow-orange-500/50' },
        { name: 'Next.js', level: 80, color: 'from-gray-600 to-gray-800', textColor: 'text-gray-700', shadowColor: 'shadow-gray-500/50' },
      ]
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'FastAPI', level: 90, color: 'from-green-500 to-green-700', textColor: 'text-green-700', shadowColor: 'shadow-green-500/50' },
        { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600', textColor: 'text-green-600', shadowColor: 'shadow-green-500/50' },
        { name: 'Express', level: 82, color: 'from-gray-500 to-gray-700', textColor: 'text-gray-700', shadowColor: 'shadow-gray-500/50' },
        { name: 'OpenAI API', level: 88, color: 'from-purple-500 to-purple-700', textColor: 'text-purple-700', shadowColor: 'shadow-purple-500/50' },
        { name: 'RESTful APIs', level: 90, color: 'from-blue-500 to-blue-700', textColor: 'text-blue-700', shadowColor: 'shadow-blue-500/50' },
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', level: 95, color: 'from-red-500 to-red-700', textColor: 'text-red-700', shadowColor: 'shadow-red-500/50' },
        { name: 'Xcode', level: 88, color: 'from-blue-400 to-blue-600', textColor: 'text-blue-600', shadowColor: 'shadow-blue-500/50' },
        { name: 'VS Code', level: 92, color: 'from-blue-500 to-blue-700', textColor: 'text-blue-700', shadowColor: 'shadow-blue-500/50' },
        { name: 'Docker', level: 75, color: 'from-blue-300 to-blue-500', textColor: 'text-blue-500', shadowColor: 'shadow-blue-500/50' },
        { name: 'iOS Development', level: 90, color: 'from-gray-700 to-gray-900', textColor: 'text-gray-800', shadowColor: 'shadow-gray-500/50' },
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
                    className="space-y-3 group"
                    style={{ textAlign: 'center' }}
                  >
                    <div 
                      className="flex justify-between items-center" 
                      style={{ textAlign: 'center' }}
                    >
                      <span 
                        className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-200" 
                        style={{ textAlign: 'left' }}
                      >
                        {skill.name}
                      </span>
                      <motion.span 
                        className={`${skill.textColor} text-sm font-bold ${skill.level >= 90 ? 'animate-pulse' : ''}`}
                        style={{ textAlign: 'right' }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.5 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    <div className="relative">
                      {/* Background progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        {/* Animated progress bar with gradient and glow effect */}
                        <motion.div
                          className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative overflow-hidden ${skill.shadowColor} shadow-lg`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.2, 
                            delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2,
                            ease: "easeOut" 
                          }}
                          viewport={{ once: true }}
                          style={{
                            boxShadow: `0 0 10px ${skill.level >= 85 ? '8px' : '4px'} rgba(59, 130, 246, 0.3)`
                          }}
                        >
                          {/* Animated shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '100%' }}
                            transition={{ 
                              duration: 1.5,
                              delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 1,
                              ease: "easeInOut"
                            }}
                            viewport={{ once: true }}
                          />
                          
                          {/* Pulsing effect for high-level skills */}
                          {skill.level >= 90 && (
                            <motion.div
                              className="absolute inset-0 bg-white opacity-10"
                              animate={{ opacity: [0.1, 0.3, 0.1] }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Skill level indicator dot */}
                      <motion.div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 ${skill.color.replace('from-', 'bg-').replace(' to-' + skill.color.split('to-')[1], '')} rounded-full border-2 border-white shadow-lg`}
                        style={{ left: `calc(${skill.level}% - 4px)` }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          duration: 0.3,
                          delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 1.2
                        }}
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
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  3+
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                  initial={false}
                />
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-200">Years Experience</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  15+
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-green-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                  initial={false}
                />
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-200">Projects Completed</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  6
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                  initial={false}
                />
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-200">Languages Used</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  4
                </motion.div>
                <motion.div
                  className="absolute -inset-2 bg-orange-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                  initial={false}
                />
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-200">Platforms Mastered</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;