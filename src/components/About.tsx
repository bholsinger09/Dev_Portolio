'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ScrollReveal, StaggeredReveal } from './ScrollAnimations';

const About = () => {
  const t = useTranslations('about');

  const skills = [
    {
      category: t('skills.categories.mobile.title'),
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'MapKit'],
      color: 'blue'
    },
    {
      category: t('skills.categories.backend.title'),
      technologies: ['Python', 'FastAPI', 'Node.js', 'Express', 'OpenAI API'],
      color: 'green'
    },
    {
      category: 'Languages',
      technologies: ['Swift', 'Python', 'JavaScript', 'Java', 'TypeScript'],
      color: 'purple'
    },
    {
      category: t('skills.categories.frontend.title'),
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      color: 'orange'
    },
    {
      category: t('skills.categories.tools.title'),
      technologies: ['Xcode', 'Git', 'Docker', 'VS Code', 'Uvicorn'],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t('title')}
            </span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate full-stack software engineer with hands-on experience developing applications
                across mobile, web, and AI integration platforms. My portfolio includes iOS applications,
                FastAPI services with LLM integration, Java desktop applications, and community-driven web platforms,
                showcasing my versatility in tackling diverse technical challenges.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                From building native iOS apps with SwiftUI to creating robust Python APIs with AI capabilities,
                I excel at selecting the right technology stack for each project. My experience spans real estate
                applications, e-commerce platforms, task management systems, and identity verification solutions,
                demonstrating my ability to deliver practical, user-focused applications.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.6} className="flex justify-center">
          <StaggeredReveal
            direction="up"
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full"
            itemClassName="group"
          >
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 group-hover:scale-105 group-hover:border-blue-400/50"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center group-hover:text-blue-600 transition-colors">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(skillGroup.color)} cursor-default transition-all hover:scale-110`}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </StaggeredReveal>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;