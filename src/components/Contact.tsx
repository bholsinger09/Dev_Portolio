'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API or email service)
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h3 
                className="text-2xl font-semibold text-gray-900 mb-6" 
                style={{ textAlign: 'center' }}
              >
                Contact Information
              </h3>
              <div 
                className="space-y-4" 
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div 
                  className="flex items-center space-x-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '8px'
                  }}
                >
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p className="text-gray-900 font-medium" style={{ textAlign: 'center' }}>Email</p>
                    <a 
                      href="mailto:bholsinger@gmail.com" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      style={{ textAlign: 'center' }}
                    >
                      bholsinger@gmail.com
                    </a>
                  </div>
                </div>

                <div 
                  className="flex items-center space-x-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '8px'
                  }}
                >
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p className="text-gray-900 font-medium" style={{ textAlign: 'center' }}>Phone</p>
                    <a 
                      href="tel:+12082841929" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      style={{ textAlign: 'center' }}
                    >
                      +1 (208) 284-1929
                    </a>
                  </div>
                </div>

                <div 
                  className="flex items-center space-x-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '8px'
                  }}
                >
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p className="text-gray-900 font-medium" style={{ textAlign: 'center' }}>Location</p>
                    <p className="text-gray-600" style={{ textAlign: 'center' }}>Boise, Idaho</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', width: '100%' }}>
              <h4 
                className="text-lg font-semibold text-gray-900 mb-4" 
                style={{ textAlign: 'center' }}
              >
                What I&apos;m Looking For
              </h4>
              <ul 
                className="space-y-2 text-gray-600" 
                style={{ 
                  textAlign: 'center',
                  listStyle: 'none',
                  padding: 0
                }}
              >
                <li style={{ textAlign: 'center' }}>• Full-stack development opportunities</li>
                <li style={{ textAlign: 'center' }}>• Challenging technical projects</li>
                <li style={{ textAlign: 'center' }}>• Remote or hybrid work arrangements</li>
                <li style={{ textAlign: 'center' }}>• Collaborative team environments</li>
                <li style={{ textAlign: 'center' }}>• Freelance and consulting projects</li>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;