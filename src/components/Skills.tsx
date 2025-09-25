// Refactored Skills component following clean code principles

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section, Container } from '@/components/ui';
import { skillCategories } from '@/data';
import { ANIMATION_DURATIONS } from '@/constants';
import { calculateAnimationDelay, formatPercentage } from '@/utils';
import { ScrollReveal, StaggeredReveal, AnimatedCounter } from './ScrollAnimations';
import type { SkillCategory, Skill } from '@/types';

/**
 * Individual skill progress bar component
 */
interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const isHighPerformance = skill.level >= 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATIONS.DEFAULT,
        delay: calculateAnimationDelay(index, ANIMATION_DURATIONS.STAGGER_DELAY)
      }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className={`font-medium ${skill.textColor}`}>
          {skill.name}
        </span>
        <span className="text-sm font-semibold text-gray-600">
          {formatPercentage(skill.level)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          whileHover={isHighPerformance ? {
            scale: 1.02,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
          } : {}}
          transition={{
            width: { duration: 1, delay: calculateAnimationDelay(index, 0.1) },
            scale: { duration: 0.2 },
            boxShadow: { duration: 0.2 }
          }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full ${isHighPerformance ? `${skill.shadowColor} animate-pulse` : ''
            }`}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

/**
 * Skill category section component
 */
interface SkillCategoryProps {
  category: SkillCategory;
  index: number;
}

const SkillCategorySection: React.FC<SkillCategoryProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: ANIMATION_DURATIONS.DEFAULT,
        delay: calculateAnimationDelay(index, ANIMATION_DURATIONS.STAGGER_DELAY)
      }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        {category.title}
      </h3>

      <div className="space-y-4 w-full max-w-sm mx-auto">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={skillIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Statistics display component
 */
const StatisticsSection: React.FC = () => {
  const statistics = [
    { label: 'Years Experience', value: 5, color: 'text-blue-600', suffix: '+' },
    { label: 'Projects Completed', value: 50, color: 'text-green-600', suffix: '+' },
    { label: 'Technologies Mastered', value: 25, color: 'text-purple-600', suffix: '+' },
    { label: 'Happy Clients', value: 30, color: 'text-orange-600', suffix: '+' },
  ];

  return (
    <ScrollReveal direction="up" delay={0.3} className="mt-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Achievement Highlights
      </h3>
      <StaggeredReveal
        direction="scale"
        staggerDelay={0.1}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        itemClassName="text-center"
      >
        {statistics.map((stat) => (
          <div key={stat.label} className="group">
            <div className={`text-4xl font-bold ${stat.color} mb-2 transition-transform group-hover:scale-110`}>
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                duration={2}
              />
            </div>
            <div className="text-gray-600 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </StaggeredReveal>
    </ScrollReveal>
  );
};

/**
 * Main Skills component
 */
const Skills: React.FC = () => {
  return (
    <Section id="skills" background="white">
      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.DEFAULT }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical skills across the full development stack,
            from mobile applications to enterprise-level systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl w-full">
            {skillCategories.map((category, index) => (
              <SkillCategorySection
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <StatisticsSection />
      </Container>
    </Section>
  );
};

export default Skills;