// Enhanced Projects component with clean code architecture and interactive design

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Section, Container } from '@/components/ui';
import { projects } from '@/data';
import { ANIMATION_DURATIONS } from '@/constants';
import { calculateAnimationDelay, getTechnologyColor } from '@/utils';
import type { Project } from '@/types';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';
import { ProjectsGridSkeleton, LoadingState } from './LoadingStates';
import { useAsync, useLoadingState } from '@/hooks';

/**
 * Technology tag component with enhanced styling
 */
interface TechnologyTagProps {
  technology: string;
}

const TechnologyTag: React.FC<TechnologyTagProps> = ({ technology }) => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${getTechnologyColor(technology)}`}
    >
      {technology}
    </motion.span>
  );
};

/**
 * Project action buttons component
 */
interface ProjectActionsProps {
  project: Project;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({ project }) => {
  return (
    <div className="flex gap-4">
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <Github size={18} />
        <span className="font-medium">Code</span>
      </motion.a>
      
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <ExternalLink size={18} />
        <span className="font-medium">Demo</span>
      </motion.a>
    </div>
  );
};

/**
 * Project category badge component
 */
interface ProjectCategoryProps {
  category: string;
}

const ProjectCategory: React.FC<ProjectCategoryProps> = ({ category }) => {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'API & AI Integration': 'bg-purple-100 text-purple-800 border-purple-200',
      'Desktop Application': 'bg-orange-100 text-orange-800 border-orange-200',
      'Mobile Application': 'bg-blue-100 text-blue-800 border-blue-200',
      'Mobile E-Commerce': 'bg-green-100 text-green-800 border-green-200',
      'Security & Authentication': 'bg-red-100 text-red-800 border-red-200',
      'Social Platform': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    return colors[cat] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(category)}`}>
      {category}
    </div>
  );
};

/**
 * Individual project card component
 */
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      }}
      transition={{ 
        opacity: { duration: ANIMATION_DURATIONS.DEFAULT, delay: calculateAnimationDelay(index, 0.1) },
        y: { duration: ANIMATION_DURATIONS.DEFAULT, delay: calculateAnimationDelay(index, 0.1) },
        boxShadow: { duration: 0.3 }
      }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100"
    >
      {/* Project Image/Icon Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
        >
          <div className="text-6xl opacity-30">
            {project.category.includes('Mobile') ? '📱' : 
             project.category.includes('AI') ? '🤖' :
             project.category.includes('E-Commerce') ? '🛒' :
             project.category.includes('Security') ? '🔐' :
             project.category.includes('Social') ? '👥' : '💻'}
          </div>
        </motion.div>
        <div className="absolute top-4 right-4">
          <ProjectCategory category={project.category} />
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechnologyTag key={tech} technology={tech} />
            ))}
          </div>
        </div>

        {/* Project Actions */}
        <ProjectActions project={project} />
      </div>
    </motion.div>
  );
};

/**
 * Projects stats section component
 */
const ProjectsStats: React.FC = () => {
  const stats = [
    { label: 'Total Projects', value: '6+', color: 'text-blue-600' },
    { label: 'Technologies Used', value: '15+', color: 'text-green-600' },
    { label: 'Project Categories', value: '6', color: 'text-purple-600' },
    { label: 'Active Deployments', value: '4+', color: 'text-orange-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATIONS.DEFAULT, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Project Portfolio Highlights
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              duration: ANIMATION_DURATIONS.DEFAULT,
              delay: calculateAnimationDelay(index, 0.1)
            }}
            viewport={{ once: true }}
            className="text-center p-4 bg-white rounded-lg shadow-md border border-gray-100"
          >
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Main Projects component with error handling and loading states
 */
const Projects = () => {
  const { isLoading, error, startLoading, stopLoading } = useLoadingState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [stopLoading]);

  return (
    <Section id="projects" background="gray">
      <Container size="lg">
        <ErrorBoundary isolate>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.DEFAULT }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A showcase of my work across different technologies and domains, demonstrating
              full-stack development capabilities and problem-solving skills.
            </p>
          </motion.div>

          {/* Projects Grid with Loading States */}
          <LoadingState 
            isLoading={isLoading}
            error={error}
            fallback={<ProjectsGridSkeleton count={6} />}
            minHeight="min-h-[400px]"
          >
            <ErrorBoundary isolate>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ErrorBoundary key={project.title} isolate>
                    <ProjectCard project={project} index={index} />
                  </ErrorBoundary>
                ))}
              </div>
            </ErrorBoundary>
          </LoadingState>

          {/* Project Statistics */}
          <ErrorBoundary isolate>
            <ProjectsStats />
          </ErrorBoundary>
        </ErrorBoundary>
      </Container>
    </Section>
  );
};export default Projects;