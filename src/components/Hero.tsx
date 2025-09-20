'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Professional Photo */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl md:text-7xl font-bold shadow-lg">
                  BH
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Ben H.
              <span className="block text-3xl md:text-4xl text-blue-600 font-medium mt-2">
                Full-Stack Software Engineer
              </span>
            </h1>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experienced software engineer specializing in full-stack development with expertise in{' '}
            <span className="text-blue-600 font-semibold">JavaScript/TypeScript</span>,{' '}
            <span className="text-red-600 font-semibold">Java</span>,{' '}
            <span className="text-green-600 font-semibold">Python</span>,{' '}
            <span className="text-purple-600 font-semibold">C#</span>, and{' '}
            <span className="text-orange-600 font-semibold">Swift</span>. 
            Building scalable applications from web platforms to mobile solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              View My Work
            </a>
            <a
              href="/resume.pdf"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-lg flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mt-8">
            <a
              href="https://github.com/bholsinger09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/ben-holsinger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:ben.holsinger@example.com"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Mail size={28} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;