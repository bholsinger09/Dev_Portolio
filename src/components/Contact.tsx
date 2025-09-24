'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '@/hooks';
import { ErrorBoundary, CompactErrorFallback } from './ErrorBoundary';
import { InlineLoader } from './LoadingStates';
import { Button } from './ui';
import { analytics } from './Analytics';
import { ScrollReveal } from './ScrollAnimations';
import { StatusIndicator, PulseButton, FloatingActionButton } from './MicroInteractions';

const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  } = useContactForm();

  const isSuccess = submitStatus === 'success';
  const isError = submitStatus === 'error';

  return (
    <ErrorBoundary fallback={CompactErrorFallback} isolate>
      <form onSubmit={handleSubmit} className="space-y-6">
        <StatusIndicator
          status={
            isSuccess ? 'success' : 
            isError ? 'error' : 
            isSubmitting ? 'loading' : 
            'idle'
          }
          successText="Message sent successfully!"
          errorText="Failed to send message. Please try again."
          loadingText="Sending your message..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => analytics.contactFormStart()}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.name ? 'border-red-300 bg-red-50 shake' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="Your name"
              whileFocus={{ scale: 1.02 }}
              animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="your.email@example.com"
              whileFocus={{ scale: 1.02 }}
              animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <motion.input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="What's this about?"
            whileFocus={{ scale: 1.02 }}
            animate={errors.subject ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.subject}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <motion.textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="Tell me more about your project or how we can work together..."
            whileFocus={{ scale: 1.01 }}
            animate={errors.message ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <PulseButton
            onClick={() => {}}
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="primary"
            size="lg"
            className="flex-1"
            type="submit"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </PulseButton>

          <PulseButton
            onClick={resetForm}
            disabled={isSubmitting}
            variant="secondary"
            size="lg"
          >
            Clear Form
          </PulseButton>
        </motion.div>
      </form>
    </ErrorBoundary>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new opportunities and exciting projects.
            Let&apos;s discuss how we can work together!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal direction="left" className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/50">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'bholsinger@gmail.com',
                    href: 'mailto:bholsinger@gmail.com',
                    color: 'text-blue-600'
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+1 (208) 284-1929',
                    href: 'tel:+12082841929',
                    color: 'text-green-600'
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Boise, Idaho',
                    color: 'text-purple-600'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className={`p-3 rounded-full bg-gray-100 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`${item.color} hover:underline transition-colors`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/50">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                What I&apos;m Looking For
              </h4>
              <ul className="space-y-3">
                {[
                  'Full-stack development opportunities',
                  'Challenging technical projects',
                  'Remote or hybrid work arrangements',
                  'Collaborative team environments',
                  'Freelance and consulting projects'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/50">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Floating scroll-to-top button */}
      <FloatingActionButton
        icon={<Mail className="w-6 h-6" />}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        position="bottom-right"
        color="blue"
        tooltip="Quick Contact"
      />
    </section>
  );
};

export default Contact;