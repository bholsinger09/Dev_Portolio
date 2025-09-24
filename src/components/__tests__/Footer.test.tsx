import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('Connect Section', () => {
    it('renders connect heading', () => {
      expect(screen.getByRole('heading', { name: /Connect/i, level: 4 })).toBeInTheDocument();
    });

    it('displays contact information', () => {
      expect(screen.getByRole('link', { name: /bholsinger@gmail.com/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /\+1 \(208\) 284-1929/i })).toBeInTheDocument();
    });

    it('applies correct href attributes to contact links', () => {
      const emailLink = screen.getByRole('link', { name: /bholsinger@gmail.com/i });
      const phoneLink = screen.getByRole('link', { name: /\+1 \(208\) 284-1929/i });

      expect(emailLink).toHaveAttribute('href', 'mailto:bholsinger@gmail.com');
      expect(phoneLink).toHaveAttribute('href', 'tel:+12082841929');
    });
  });

  describe('Layout and Styling', () => {
    it('uses centered layout', () => {
      const centerContainer = document.querySelector('.max-w-md.mx-auto.text-center');
      expect(centerContainer).toBeInTheDocument();
    });

    it('applies proper spacing classes', () => {
      const footer = document.querySelector('footer');
      expect(footer).toHaveClass('bg-gray-900', 'text-white', 'py-12');
    });
  });

  describe('Copyright Section', () => {
    it('displays copyright information', () => {
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Ben H\\. All rights reserved`, 'i'))).toBeInTheDocument();
    });

    it('displays tea and code monkey message', () => {
      expect(screen.getByText(/Made with/i)).toBeInTheDocument();
      expect(screen.getByText(/and lots of 🍵 by a code monkey 🐒/i)).toBeInTheDocument();
    });
  });

  describe('Content Integrity', () => {
    it('provides essential contact information', () => {
      expect(screen.getByText(/bholsinger@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/\+1 \(208\) 284-1929/i)).toBeInTheDocument();
    });

    it('maintains professional footer structure', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });
});
