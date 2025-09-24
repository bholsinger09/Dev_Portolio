'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Award, Users, Calendar, TrendingUp, CheckCircle, X, ChevronRight } from 'lucide-react';
import { projects } from '@/data';
import type { Project } from '@/types';

/**
 * Enhanced Projects Section with Case Study Modal
 */
const EnhancedProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  const displayProjects = showFeaturedOnly 
    ? projects.filter(p => p.featured) 
    : projects;

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured Projects & Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            In-depth showcases of full-stack development projects with detailed technical implementations, 
            problem-solving approaches, and measurable business impact.
          </p>
          
          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { label: 'Projects Completed', value: '6+', icon: CheckCircle, color: 'text-green-600' },
              { label: 'Technologies Used', value: '20+', icon: TrendingUp, color: 'text-blue-600' },
              { label: 'Total Users', value: '7k+', icon: Users, color: 'text-purple-600' },
              { label: 'Avg Rating', value: '4.7★', icon: Award, color: 'text-yellow-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowFeaturedOnly(false)}
              className={`px-6 py-3 rounded-l-lg font-medium transition-all duration-200 ${
                !showFeaturedOnly 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setShowFeaturedOnly(true)}
              className={`px-6 py-3 rounded-r-lg font-medium transition-all duration-200 ${
                showFeaturedOnly 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Featured Only
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <EnhancedProjectCard
              key={project.title}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Featured Projects Highlight */}
        {!showFeaturedOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🌟 Featured Case Studies
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.filter(p => p.featured).map((project, index) => (
                <CaseStudyPreview 
                  key={`featured-${project.title}`}
                  project={project}
                  index={index}
                  onViewDetails={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

/**
 * Enhanced Project Card Component
 */
interface EnhancedProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group border border-gray-100"
    >
      {/* Project Visual */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl opacity-80 mb-2">
              {getProjectEmoji(project.category)}
            </div>
            <div className="text-sm font-medium opacity-75">{project.category}</div>
          </div>
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status || 'completed'}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {project.title}
          </h3>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.shortDescription || project.description}
        </p>

        {/* Key Metrics */}
        {project.metrics && (
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            {project.metrics.users && (
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {project.metrics.users.toLocaleString()} users
              </span>
            )}
            {project.startDate && (
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(project.startDate).getFullYear()}
              </span>
            )}
            {project.metrics.codeQuality?.testCoverage && (
              <span className="flex items-center text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                {project.metrics.codeQuality.testCoverage}
              </span>
            )}
          </div>
        )}

        {/* Technology Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map(tech => (
              <span 
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Project Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
          >
            <Github className="w-4 h-4 mr-1" />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Demo
          </a>
          {project.caseStudy && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 text-sm ml-auto"
            >
              📖 Case Study
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Case Study Preview Component
 */
interface CaseStudyPreviewProps {
  project: Project;
  index: number;
  onViewDetails: () => void;
}

const CaseStudyPreview: React.FC<CaseStudyPreviewProps> = ({ project, index, onViewDetails }) => {
  if (!project.caseStudy) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="text-2xl">{getProjectEmoji(project.category)}</div>
        <h4 className="text-lg font-bold text-gray-900">{project.title}</h4>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {project.caseStudy.overview}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Problem Solved</span>
          <span className="text-green-600 font-medium">✓ Complete</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Technical Depth</span>
          <span className="text-blue-600 font-medium">Advanced</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Business Impact</span>
          <span className="text-purple-600 font-medium">High</span>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        View Full Case Study
      </button>
    </motion.div>
  );
};

/**
 * Case Study Modal Component
 */
interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'metrics' | 'results'>('overview');

  if (!project || !project.caseStudy) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{getProjectEmoji(project.category)}</div>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                </div>
                <p className="text-blue-100 opacity-90">{project.category}</p>
                {project.metrics?.users && (
                  <p className="text-blue-100 text-sm mt-1">
                    {project.metrics.users.toLocaleString()} users • {project.startDate}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors duration-200 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-4 mt-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'technical', label: 'Technical' },
                { id: 'metrics', label: 'Metrics' },
                { id: 'results', label: 'Results' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-600' 
                      : 'text-blue-100 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'overview' && <OverviewTab project={project} />}
            {activeTab === 'technical' && <TechnicalTab project={project} />}
            {activeTab === 'metrics' && <MetricsTab project={project} />}
            {activeTab === 'results' && <ResultsTab project={project} />}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-4 justify-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Tab Components
const OverviewTab: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold mb-3">Problem Statement</h3>
      <p className="text-gray-600 leading-relaxed">{project.caseStudy?.problem}</p>
    </div>
    
    <div>
      <h3 className="text-xl font-semibold mb-3">Solution</h3>
      <p className="text-gray-600 leading-relaxed">{project.caseStudy?.solution}</p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-3">Overview</h3>
      <p className="text-gray-600 leading-relaxed">{project.caseStudy?.overview}</p>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map(tech => (
          <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechnicalTab: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-6">
    {project.keyFeatures && (
      <div>
        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
        <ul className="space-y-2">
          {project.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {project.challenges && (
      <div>
        <h3 className="text-xl font-semibold mb-3">Technical Challenges</h3>
        <div className="space-y-4">
          {project.challenges.map((challenge, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-600 mb-2">{challenge.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
              <p className="text-gray-700 text-sm mb-2"><strong>Solution:</strong> {challenge.solution}</p>
              <p className="text-green-600 text-sm"><strong>Outcome:</strong> {challenge.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {project.learnings && (
      <div>
        <h3 className="text-xl font-semibold mb-3">Key Learnings</h3>
        <ul className="space-y-2">
          {project.learnings.map((learning, index) => (
            <li key={index} className="flex items-start">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{learning}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const MetricsTab: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-6">
    {project.metrics && (
      <>
        {project.metrics.users && (
          <div className="text-center bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{project.metrics.users.toLocaleString()}</div>
            <div className="text-blue-800 font-medium">Total Users</div>
          </div>
        )}

        {project.metrics.performance && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Performance Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(project.metrics.performance).map(([key, value]) => (
                <div key={key} className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">{value}</div>
                  <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.metrics.codeQuality && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Code Quality</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(project.metrics.codeQuality).map(([key, value]) => (
                <div key={key} className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">{value}</div>
                  <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.metrics.business && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Business Impact</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(project.metrics.business).map(([key, value]) => (
                <div key={key} className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-orange-600">{value}</div>
                  <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

const ResultsTab: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold mb-3">Project Results</h3>
      <ul className="space-y-3">
        {project.caseStudy?.results.map((result, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{result}</span>
          </li>
        ))}
      </ul>
    </div>

    {project.caseStudy?.testimonial && (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Client Testimonial</h3>
        <blockquote className="text-gray-600 italic mb-4 text-lg">
          "{project.caseStudy.testimonial.text}"
        </blockquote>
        <div className="text-sm text-gray-500">
          — {project.caseStudy.testimonial.author}, {project.caseStudy.testimonial.position}
          {project.caseStudy.testimonial.company && ` at ${project.caseStudy.testimonial.company}`}
        </div>
      </div>
    )}

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold mb-2">Project Details</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li><strong>Status:</strong> {project.status || 'Completed'}</li>
          <li><strong>Duration:</strong> {project.startDate} - {project.endDate}</li>
          <li><strong>Team Size:</strong> {project.teamSize || 1}</li>
          <li><strong>Role:</strong> {project.role || 'Developer'}</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Links</h4>
        <div className="space-y-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" 
             className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
            <Github className="w-4 h-4 mr-2" />
            Source Code
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
             className="flex items-center text-purple-600 hover:text-purple-700 text-sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Utility functions
const getProjectEmoji = (category: string): string => {
  if (category.includes('Mobile')) return '📱';
  if (category.includes('AI')) return '🤖';
  if (category.includes('Java') || category.includes('Desktop')) return '☕';
  if (category.includes('Security')) return '🔐';
  if (category.includes('Social')) return '👥';
  if (category.includes('E-Commerce')) return '🛒';
  return '💻';
};

const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'planning': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-green-100 text-green-800';
  }
};

export default EnhancedProjectsSection;