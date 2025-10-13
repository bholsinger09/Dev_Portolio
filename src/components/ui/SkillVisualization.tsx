'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SkillData {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillVisualizationProps {
  skills: SkillData[];
  type?: 'circular' | 'radar' | 'bars';
  className?: string;
}

const CircularProgress: React.FC<{ skill: SkillData; delay?: number }> = ({ skill, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  useEffect(() => {
    if (inView) {
      controls.start({
        strokeDashoffset: strokeDashoffset,
        transition: { duration: 1.5, delay, ease: "easeOut" }
      });
    }
  }, [inView, controls, strokeDashoffset, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center p-4">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke={skill.color}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={controls}
            className="drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${skill.color}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-lg font-bold text-gray-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
            transition={{ delay: delay + 0.8, duration: 0.5 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
      <motion.h4 
        className="text-sm font-semibold text-gray-700 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
        transition={{ delay: delay + 1, duration: 0.3 }}
      >
        {skill.name}
      </motion.h4>
    </div>
  );
};

const RadarChart: React.FC<{ skills: SkillData[] }> = ({ skills }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [animatedValues, setAnimatedValues] = useState(skills.map(() => 0));

  const centerX = 150;
  const centerY = 150;
  const radius = 120;
  const levels = 5;

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedValues(skills.map(skill => skill.level));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, skills]);

  const getPointPosition = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const r = radius + 30;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  const pathData = animatedValues.map((value, index) => {
    const point = getPointPosition(index, value);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <div ref={ref} className="flex justify-center p-8">
      <svg width="300" height="300" className="drop-shadow-lg">
        {/* Background grid */}
        {Array.from({ length: levels }).map((_, level) => (
          <polygon
            key={level}
            points={skills.map((_, index) => {
              const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
              const r = ((level + 1) / levels) * radius;
              const x = centerX + r * Math.cos(angle);
              const y = centerY + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}
        
        {/* Grid lines */}
        {skills.map((_, index) => {
          const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
          const x2 = centerX + radius * Math.cos(angle);
          const y2 = centerY + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Data area */}
        <motion.path
          d={pathData}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: inView ? 1 : 0, 
            opacity: inView ? 1 : 0 
          }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Data points */}
        {animatedValues.map((value, index) => {
          const point = getPointPosition(index, value);
          return (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              initial={{ scale: 0 }}
              animate={{ scale: inView ? 1 : 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, index) => {
          const labelPos = getLabelPosition(index);
          return (
            <motion.text
              key={index}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium fill-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
            >
              {skill.name}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
};

const AnimatedBars: React.FC<{ skills: SkillData[] }> = ({ skills }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <div ref={ref} className="space-y-6">
      {skills.map((skill, index) => (
        <div key={skill.name} className="flex items-center space-x-4">
          <div className="w-32 text-right">
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
          </div>
          <div className="flex-1 relative">
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: inView ? `${skill.level}%` : 0 }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  initial={{ x: '-100%' }}
                  animate={{ x: inView ? '100%' : '-100%' }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                />
              </motion.div>
            </div>
          </div>
          <div className="w-12 text-left">
            <motion.span 
              className="text-sm font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
              transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
            >
              {skill.level}%
            </motion.span>
          </div>
        </div>
      ))}
    </div>
  );
};

const SkillVisualization: React.FC<SkillVisualizationProps> = ({ 
  skills, 
  type = 'circular', 
  className = '' 
}) => {
  switch (type) {
    case 'radar':
      return (
        <div className={`${className}`}>
          <RadarChart skills={skills} />
        </div>
      );
    case 'bars':
      return (
        <div className={`${className}`}>
          <AnimatedBars skills={skills} />
        </div>
      );
    case 'circular':
    default:
      return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
          {skills.map((skill, index) => (
            <CircularProgress 
              key={skill.name} 
              skill={skill} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      );
  }
};

export default SkillVisualization;
export type { SkillData };