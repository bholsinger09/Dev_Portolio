'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('about');

  const skills = [
    {
      category: t('skills.mobile.category'),
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'MapKit'],
      color: 'blue'
    },
    {
      category: t('skills.backend.category'),
      technologies: ['Python', 'FastAPI', 'Node.js', 'Express', 'OpenAI API'],
      color: 'green'
    },
    {
      category: t('skills.languages.category'),
      technologies: ['Swift', 'Python', 'JavaScript', 'Java', 'TypeScript'],
      color: 'purple'
    },
    {
      category: t('skills.frontend.category'),
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      color: 'orange'
    },
    {
      category: t('skills.tools.category'),
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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('title')}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
              {t('description.paragraph1')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
              {t('description.paragraph2')}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                style={{ textAlign: 'center' }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2" style={{ justifyContent: 'center' }}>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;