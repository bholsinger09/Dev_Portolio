'use client';

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Contact Info */}
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                contact@example.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            © 2025 Ben H. Portfolio. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 mx-1" />
            and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;