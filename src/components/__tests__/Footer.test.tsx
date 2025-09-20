import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  describe('Brand Section', () => {
    it('renders the brand name', () => {
      expect(screen.getByRole('heading', { name: /Ben H\./i, level: 3 })).toBeInTheDocument()
    })

    it('displays brand description', () => {
      expect(screen.getByText(/Full-Stack Developer passionate about creating innovative solutions/i)).toBeInTheDocument()
      expect(screen.getByText(/across multiple technologies and platforms/i)).toBeInTheDocument()
    })
  })

  describe('Quick Links Section', () => {
    it('renders quick links heading', () => {
      expect(screen.getByRole('heading', { name: /Quick Links/i, level: 4 })).toBeInTheDocument()
    })

    it('displays all navigation links', () => {
      const links = [
        { name: /About/i, href: '#about' },
        { name: /Projects/i, href: '#projects' },
        { name: /Skills/i, href: '#skills' },
        { name: /Contact/i, href: '#contact' }
      ]

      links.forEach(({ name, href }) => {
        const link = screen.getByRole('link', { name })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', href)
      })
    })

    it('applies hover styles to navigation links', () => {
      const aboutLink = screen.getByRole('link', { name: /About/i })
      expect(aboutLink).toHaveClass('text-gray-400', 'hover:text-white', 'transition-colors')
    })
  })

  describe('Technologies Section', () => {
    it('renders technologies heading', () => {
      expect(screen.getByRole('heading', { name: /Technologies/i, level: 4 })).toBeInTheDocument()
    })

    it('lists all technology stacks', () => {
      const technologies = [
        'JavaScript & TypeScript',
        'Java & Spring Boot', 
        'Python & Django',
        'C# & .NET Core',
        'Swift & SwiftUI'
      ]

      technologies.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })
  })

  describe('Connect Section', () => {
    it('renders connect heading', () => {
      expect(screen.getByRole('heading', { name: /Connect/i, level: 4 })).toBeInTheDocument()
    })

    it('displays email contact link', () => {
      const emailLinks = screen.getAllByText('bholsinger@gmail.com')
      expect(emailLinks).toHaveLength(1) // One in connect section, one in social icons
      
      const emailLink = screen.getByRole('link', { name: 'bholsinger@gmail.com' })
      expect(emailLink).toHaveAttribute('href', 'mailto:bholsinger@gmail.com')
    })

    it('displays phone contact link', () => {
      const phoneLink = screen.getByRole('link', { name: /\+1 \(208\) 284-1929/i })
      expect(phoneLink).toBeInTheDocument()
      expect(phoneLink).toHaveAttribute('href', 'tel:+12082841929')
    })

    it('renders social media icons', () => {
      // Check for GitHub link
      expect(document.querySelector('a[href="https://github.com/yourusername"]')).toBeInTheDocument()
      
      // Check for LinkedIn link  
      expect(document.querySelector('a[href="https://linkedin.com/in/yourusername"]')).toBeInTheDocument()
      
      // Check for Mail icon link (different from the text email link)
      const mailLinks = document.querySelectorAll('a[href="mailto:bholsinger@gmail.com"]')
      expect(mailLinks.length).toBe(2) // One text link and one icon link
    })

    it('social links open in new tab', () => {
      const githubLink = document.querySelector('a[href="https://github.com/yourusername"]')
      const linkedinLink = document.querySelector('a[href="https://linkedin.com/in/yourusername"]')
      
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
      
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Footer Bottom Section', () => {
    it('displays copyright notice with current year', () => {
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(`© ${currentYear} Ben H. All rights reserved.`)).toBeInTheDocument()
    })

    it('displays made with love message', () => {
      expect(screen.getByText(/Made with/i)).toBeInTheDocument()
      expect(screen.getByText(/and lots of coffee/i)).toBeInTheDocument()
    })

    it('renders heart icon in the love message', () => {
      // Check for red heart icon styling
      const heartIcon = document.querySelector('.text-red-500')
      expect(heartIcon).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('has proper footer structure', () => {
      const footer = document.querySelector('footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('bg-gray-900', 'text-white', 'py-12')
    })

    it('uses responsive grid layout', () => {
      const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-4')
      expect(grid).toBeInTheDocument()
    })

    it('applies proper spacing classes', () => {
      const container = document.querySelector('.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8')
      expect(container).toBeInTheDocument()
    })

    it('includes separator between main content and copyright', () => {
      const separator = document.querySelector('hr.border-gray-800.my-8')
      expect(separator).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive grid layout', () => {
      const mainGrid = document.querySelector('.grid-cols-1.md\\:grid-cols-4')
      expect(mainGrid).toBeInTheDocument()
    })

    it('applies responsive flex layout to bottom section', () => {
      const bottomSection = document.querySelector('.flex.flex-col.md\\:flex-row')
      expect(bottomSection).toBeInTheDocument()
    })

    it('applies responsive spacing to made with love message', () => {
      const loveMessage = screen.getByText(/Made with/i).closest('p')
      expect(loveMessage).toHaveClass('mt-2', 'md:mt-0')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const brandHeading = screen.getByRole('heading', { name: /Ben H\./i, level: 3 })
      expect(brandHeading).toBeInTheDocument()
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 4 })
      expect(sectionHeadings).toHaveLength(3) // Quick Links, Technologies, Connect
      
      const headingTexts = sectionHeadings.map(h => h.textContent)
      expect(headingTexts).toEqual(['Quick Links', 'Technologies', 'Connect'])
    })

    it('navigation links are keyboard accessible', () => {
      const quickLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('#')
      )
      expect(quickLinks).toHaveLength(4) // About, Projects, Skills, Contact
    })

    it('external links have proper security attributes', () => {
      const externalLinks = document.querySelectorAll('a[target="_blank"]')
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Visual Elements', () => {
    it('applies hover effects to links', () => {
      const hoverLinks = document.querySelectorAll('.hover\\:text-white')
      expect(hoverLinks.length).toBeGreaterThanOrEqual(6) // Nav links + contact links + social icons
    })

    it('uses consistent color scheme', () => {
      expect(document.querySelector('.bg-gray-900')).toBeInTheDocument()
      expect(document.querySelector('.text-white')).toBeInTheDocument()
      expect(document.querySelectorAll('.text-gray-400').length).toBeGreaterThan(5)
    })

    it('includes social media icons with proper styling', () => {
      const socialIcons = document.querySelectorAll('.flex.space-x-4 a')
      expect(socialIcons).toHaveLength(3) // GitHub, LinkedIn, Email
      
      socialIcons.forEach(icon => {
        expect(icon).toHaveClass('text-gray-400', 'hover:text-white', 'transition-colors')
      })
    })
  })

  describe('Content Integrity', () => {
    it('displays comprehensive contact information', () => {
      expect(screen.getByText('bholsinger@gmail.com')).toBeInTheDocument()
      expect(screen.getByText('+1 (208) 284-1929')).toBeInTheDocument()
    })

    it('includes relevant technology showcase', () => {
      // Verify the footer showcases the main technology stacks
      expect(screen.getByText(/JavaScript & TypeScript/i)).toBeInTheDocument()
      expect(screen.getByText(/Swift & SwiftUI/i)).toBeInTheDocument()
      expect(screen.getByText(/Python & Django/i)).toBeInTheDocument()
    })

    it('provides clear navigation structure', () => {
      // Verify all main sections are linked
      const mainSections = ['About', 'Projects', 'Skills', 'Contact']
      mainSections.forEach(section => {
        const link = screen.getByRole('link', { name: section })
        expect(link).toBeInTheDocument()
        expect(link.getAttribute('href')).toBe(`#${section.toLowerCase()}`)
      })
    })
  })
})