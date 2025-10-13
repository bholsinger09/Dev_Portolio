'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  perspective?: number;
  scale?: number;
  transitionDuration?: number;
  gyroscope?: boolean;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glarePosition?: string;
}

const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  tiltMaxAngle = 15,
  perspective = 1000,
  scale = 1.05,
  transitionDuration = 0.4,
  gyroscope = true,
  glareEnable = true,
  glareMaxOpacity = 0.2,
  glareColor = '#ffffff',
  glarePosition = 'bottom',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glareTransform, setGlareTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles
      const rotateX = ((y - centerY) / centerY) * -tiltMaxAngle;
      const rotateY = ((x - centerX) / centerX) * tiltMaxAngle;

      // Apply transform
      const transformStyle = [
        `perspective(${perspective}px)`,
        `rotateX(${rotateX}deg)`,
        `rotateY(${rotateY}deg)`,
        `scale3d(${scale}, ${scale}, ${scale})`,
      ].join(' ');

      setTransform(transformStyle);

      // Calculate glare effect
      if (glareEnable) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        const glareOpacity = Math.min(glareMaxOpacity, (Math.abs(rotateX) + Math.abs(rotateY)) / (tiltMaxAngle * 2));
        
        setGlareTransform(`
          background: linear-gradient(
            ${Math.atan2(rotateY, rotateX) * (180 / Math.PI) + 180}deg,
            transparent 0%,
            ${glareColor}${Math.round(glareOpacity * 255).toString(16).padStart(2, '0')} 50%,
            transparent 100%
          );
          transform: translate(-50%, -50%);
        `);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Reset transform with smooth transition
      setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
      setGlareTransform('');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, tiltMaxAngle, perspective, scale, glareEnable, glareMaxOpacity, glareColor]);

  return (
    <div
      ref={elementRef}
      className={`relative transform-gpu ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : `transform ${transitionDuration}s ease-out`,
      }}
    >
      {/* Glare overlay */}
      {glareEnable && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: glareTransform ? undefined : 'transparent',
            ...(glareTransform && { 
              background: `linear-gradient(45deg, transparent 30%, ${glareColor}33 50%, transparent 70%)`,
            })
          }}
        />
      )}
      
      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Tilt3D;