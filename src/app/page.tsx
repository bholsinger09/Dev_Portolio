"use client"

import { motion } from 'framer-motion';
import PageWrapper from '@/components/ui/PageWrapper';
import Tilt3D from '@/components/ui/Tilt3D';
import Parallax from '@/components/ui/Parallax';
import SkillVisualization, { SkillData } from '@/components/ui/SkillVisualization';
import { useEffect } from 'react';
import {
  heroContainer,
  heroItem,
  buttonHover,
  floatingAnimation,
  scrollFadeIn,
  staggerContainer,
  fadeInUp,
  cardHover,
  skillCardVariants,
  skillProgressVariants,
  skillItemVariants
} from '@/utils/animations';

export default function HomePage() {
  useEffect(() => {
    // Performance monitoring in development mode
    if (process.env.NODE_ENV === 'development') {
      import('@/utils/performance').then(({ testAnimationPerformance, monitorMemoryUsage }) => {
        // Monitor hero section animations
        setTimeout(() => {
          testAnimationPerformance('Hero Section Animations');
          const memoryUsage = monitorMemoryUsage();
          if (memoryUsage) {
            console.log('Memory Usage:', memoryUsage);
          }
        }, 1000);
      });
    }
  }, []);

  // Define skill data for interactive visualizations
  const frontendSkills: SkillData[] = [
    { name: 'React', level: 92, color: '#61dafb', category: 'frontend' },
    { name: 'Next.js', level: 88, color: '#000000', category: 'frontend' },
    { name: 'TypeScript', level: 85, color: '#3178c6', category: 'frontend' },
    { name: 'Tailwind', level: 88, color: '#06b6d4', category: 'frontend' },
    { name: 'Angular', level: 82, color: '#dd0031', category: 'frontend' },
    { name: 'Vue.js', level: 75, color: '#4fc08d', category: 'frontend' },
  ];

  const backendSkills: SkillData[] = [
    { name: 'Node.js', level: 88, color: '#339933', category: 'backend' },
    { name: 'Python', level: 85, color: '#3776ab', category: 'backend' },
    { name: 'Java', level: 90, color: '#f89820', category: 'backend' },
    { name: 'C#/.NET', level: 78, color: '#239120', category: 'backend' },
    { name: 'Express', level: 85, color: '#000000', category: 'backend' },
    { name: 'Django', level: 80, color: '#092e20', category: 'backend' },
  ];

  const databaseSkills: SkillData[] = [
    { name: 'MongoDB', level: 85, color: '#47a248', category: 'database' },
    { name: 'PostgreSQL', level: 82, color: '#336791', category: 'database' },
    { name: 'MySQL', level: 80, color: '#4479a1', category: 'database' },
    { name: 'SQLite', level: 88, color: '#003b57', category: 'database' },
    { name: 'Redis', level: 75, color: '#dc382d', category: 'database' },
    { name: 'Firebase', level: 78, color: '#ffca28', category: 'database' },
  ];

  const mobileSkills: SkillData[] = [
    { name: 'iOS/Swift', level: 85, color: '#fa7343', category: 'mobile' },
    { name: 'SwiftUI', level: 82, color: '#007aff', category: 'mobile' },
    { name: 'React Native', level: 78, color: '#61dafb', category: 'mobile' },
    { name: 'Core Data', level: 80, color: '#ff6b35', category: 'mobile' },
  ];

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      {/* Hero Section with Profile Picture */}
      <motion.section
        className="container mx-auto px-6 py-20 text-center"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.img
            src="/profile-optimized.jpg"
            alt="Ben H. - Full-Stack Developer"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-6"
            variants={heroItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-4"
            variants={heroItem}
          >
            Ben H.
          </motion.h1>
          <motion.h2
            className="text-2xl text-blue-600 font-semibold mb-8"
            variants={heroItem}
          >
            Full-Stack Developer
          </motion.h2>
        </motion.div>
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          variants={heroItem}
        >
          Experienced developer specializing in JavaScript, Java, Python, C#, and Swift.
          Building innovative solutions across web, mobile, and enterprise applications.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={heroItem}
        >
          <motion.a
            href="/blog"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            {...buttonHover}
            data-cursor="button"
          >
            View Blog
          </motion.a>
          <motion.a
            href="#projects"
            className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            {...buttonHover}
            data-cursor="button"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            {...buttonHover}
            data-cursor="button"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        id="about"
        className="container mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8 text-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm"
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">5+ Years</h3>
            <p className="text-gray-600">Professional Development Experience</p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm"
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">50+ Projects</h3>
            <p className="text-gray-600">Completed Successfully</p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm"
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Multiple Languages</h3>
            <p className="text-gray-600">Full-Stack Expertise</p>
          </motion.div>
        </motion.div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm passionate about creating efficient, scalable solutions that solve real-world problems.
            With experience across multiple programming languages and frameworks, I bring a comprehensive
            approach to every project, from initial concept to final deployment.
          </p>
        </div>
      </motion.section>

      {/* Projects Preview */}
      <motion.section
        id="projects"
        className="bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Parallax speed={0.3} direction="up">
              <Tilt3D
                tiltMaxAngle={15}
                perspective={1000}
                scale={1.05}
                transitionDuration={400}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="bottom"
                gyroscope={false}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-sm project-card"
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                  data-cursor="hover"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">FindBook - Discover Your Next Great Read</h3>
                  <p className="text-gray-600 mb-4">A sophisticated Angular book discovery application featuring smart search, favorites management, and performance monitoring. Built with Angular 19 and integrated with Google Books API.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Angular 19</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Angular Material</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">RxJS</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Google Books API</span>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-12">
                    <a href="https://bholsinger09.github.io/FindBook" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2" data-cursor="view">
                      📖 View FindBook Demo - Click Here
                    </a>
                    <a href="https://github.com/bholsinger09/FindBook" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium flex items-center gap-2" data-cursor="view">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View FindBook on GitHub - Click Here
                    </a>
                  </div>
                </motion.div>
              </Tilt3D>
            </Parallax>
          </motion.div>
        </div>
      </motion.section>

      {/* Technical Skills - Interactive Visualizations */}
      <motion.section
        className="container mx-auto px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technical Skills
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 text-center max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Interactive visualizations of my technical expertise across different domains
          </motion.p>

          {/* Frontend Skills - Circular Progress */}
          <motion.div
            className="w-full mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frontend Development</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <SkillVisualization
                skills={frontendSkills}
                type="circular"
                className="justify-center"
              />
            </div>
          </motion.div>

          {/* Backend Skills - Radar Chart */}
          <motion.div
            className="w-full mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Backend Development</h3>
            <div className="bg-white rounded-xl shadow-lg">
              <SkillVisualization
                skills={backendSkills}
                type="radar"
              />
            </div>
          </motion.div>

          {/* Database Skills - Animated Bars */}
          <motion.div
            className="w-full mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Database & DevOps</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <SkillVisualization
                skills={databaseSkills}
                type="bars"
              />
            </div>
          </motion.div>

          {/* Mobile Skills - Circular Progress */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Mobile Development</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <SkillVisualization
                skills={mobileSkills}
                type="circular"
                className="justify-center"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            Let's create something amazing together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Email</h4>
              <a href="mailto:bholsinger@gmail.com" className="text-blue-100 hover:text-white transition-colors">
                bholsinger@gmail.com
              </a>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">LinkedIn</h4>
              <a href="https://www.linkedin.com/in/benjamin-holsinger-a1712a32" className="text-blue-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                Connect with me
              </a>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">GitHub</h4>
              <a href="https://github.com/bholsinger09" className="text-blue-100 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                View my repositories
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:bholsinger@gmail.com"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              data-cursor="button"
            >
              Send Message
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              data-cursor="button"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}