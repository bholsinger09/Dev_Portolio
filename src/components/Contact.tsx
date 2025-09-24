'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '@/hooks';
import { ErrorBoundary, CompactErrorFallback } from './ErrorBoundary';
import { InlineLoader } from './LoadingStates';
import { Button } from './ui';
import { analytics } from './Analytics';

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
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-green-50 text-green-800 border border-green-200 rounded-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Message sent successfully!</span>
          </motion.div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Failed to send message. Please try again.</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => analytics.contactFormStart()}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="What's this about?"
          />
          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder="Tell me more about your project or how we can work together..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <InlineLoader text="Sending..." size="sm" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new opportunities and exciting projects.
            Let&apos;s discuss how we can work together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-gray-900 font-medium">Email</p>
                      <a
                        href="mailto:bholsinger@gmail.com"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        bholsinger@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-gray-900 font-medium">Phone</p>
                      <a
                        href="tel:+12082841929"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        +1 (208) 284-1929
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-gray-900 font-medium">Location</p>
                      <p className="text-gray-600">Boise, Idaho</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                What I&apos;m Looking For
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Full-stack development opportunities</li>
                <li>• Challenging technical projects</li>
                <li>• Remote or hybrid work arrangements</li>
                <li>• Collaborative team environments</li>
                <li>• Freelance and consulting projects</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;