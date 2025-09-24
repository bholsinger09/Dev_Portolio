'use client';

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Contact Info */}
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">{t('connect.title')}</h4>
            <div className="space-y-2">
              <a
                href="mailto:bholsinger@gmail.com"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                bholsinger@gmail.com
              </a>
              <a
                href="tel:+12082841929"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                +1 (208) 284-1929
              </a>
            </div>

            <div className="flex space-x-4 mt-4 justify-center">
              <a
                href="https://github.com/bholsinger09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t('connect.github')}
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/ben-holsinger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t('connect.linkedin')}
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:bholsinger@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t('connect.email')}
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            {t.rich('madeWith', {
              heart: () => <Heart size={16} className="mx-1 text-red-500" />,
              tea: () => <span>🍵</span>,
              monkey: () => <span>🐒</span>
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;