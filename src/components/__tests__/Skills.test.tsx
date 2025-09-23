import { render, screen } from '@testing-library/react'
import Skills from '../Skills'

describe('Skills Component', () => {
  beforeEach(() => {
    render(<Skills />)
  })

  describe('Section Header', () => {
    it('renders section heading and description', () => {
      expect(screen.getByRole('heading', { name: 'Skills & Expertise' })).toBeInTheDocument()
      expect(screen.getByText(/Comprehensive technical skills across the full development stack/)).toBeInTheDocument()
    })
  })

  describe('Skill Categories', () => {
    it('renders all 4 skill categories', () => {
      const categoryTitles = [
        'Programming Languages',
        'Mobile & Frontend',
        'Backend & APIs',
        'Tools & Platforms'
      ]

      categoryTitles.forEach(title => {
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
      })
    })

    it('displays correct category headings as h3 elements', () => {
      const categoryHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(categoryHeadings).toHaveLength(5) // 4 categories + 1 statistics

      expect(categoryHeadings[0]).toHaveTextContent('Programming Languages')
      expect(categoryHeadings[1]).toHaveTextContent('Mobile & Frontend')
      expect(categoryHeadings[2]).toHaveTextContent('Backend & APIs')
      expect(categoryHeadings[3]).toHaveTextContent('Tools & Platforms')
    })
  })

  describe('Programming Languages Skills', () => {
    it('displays all programming language skills with levels', () => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getAllByText('90%')).toHaveLength(5) // JavaScript, SwiftUI, FastAPI, RESTful APIs, iOS Development

      expect(screen.getByText('Swift')).toBeInTheDocument()
      expect(screen.getAllByText('88%')).toHaveLength(4) // Swift, UIKit, OpenAI API, Xcode

      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getAllByText('85%')).toHaveLength(3) // Python, React, Node.js

      expect(screen.getByText('Java')).toBeInTheDocument()
      expect(screen.getAllByText('82%')).toHaveLength(3) // Java, Core Data, Express

      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getAllByText('80%')).toHaveLength(2) // TypeScript, Next.js

      expect(screen.getByText('C#')).toBeInTheDocument()
      expect(screen.getAllByText('75%')).toHaveLength(2) // C#, Docker
    })
  })

  describe('Mobile & Frontend Skills', () => {
    it('displays mobile and frontend skills with correct levels', () => {
      expect(screen.getByText('SwiftUI')).toBeInTheDocument()
      expect(screen.getByText('UIKit')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Core Data')).toBeInTheDocument()
      expect(screen.getByText('Next.js')).toBeInTheDocument()
    })
  })

  describe('Backend & APIs Skills', () => {
    it('displays backend and API skills', () => {
      expect(screen.getByText('FastAPI')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
      expect(screen.getByText('Express')).toBeInTheDocument()
      expect(screen.getByText('OpenAI API')).toBeInTheDocument()
      expect(screen.getByText('RESTful APIs')).toBeInTheDocument()
    })
  })

  describe('Tools & Platforms Skills', () => {
    it('displays tools and platform skills', () => {
      expect(screen.getByText('Git')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()

      expect(screen.getByText('Xcode')).toBeInTheDocument()
      expect(screen.getByText('VS Code')).toBeInTheDocument()
      expect(screen.getByText('92%')).toBeInTheDocument()

      expect(screen.getByText('Docker')).toBeInTheDocument()
      expect(screen.getByText('iOS Development')).toBeInTheDocument()
    })
  })

  describe('Skill Progress Bars', () => {
    it('renders progress bars with correct background colors', () => {
      const progressBars = document.querySelectorAll('.bg-gray-200')
      expect(progressBars.length).toBeGreaterThanOrEqual(20) // At least 20 skills total
    })

    it('has gradient progress indicators for each skill', () => {
      // Check for gradient progress bars instead of solid colors
      expect(document.querySelector('.bg-gradient-to-r')).toBeInTheDocument()
      
      // Check for specific gradient color classes used in the enhanced Skills component
      const gradientBars = document.querySelectorAll('.bg-gradient-to-r')
      expect(gradientBars.length).toBeGreaterThanOrEqual(20)
      
      // Check for the enhanced color system with gradients
      expect(document.querySelector('.from-yellow-400')).toBeInTheDocument() // JavaScript
      expect(document.querySelector('.from-orange-400')).toBeInTheDocument() // Swift  
      expect(document.querySelector('.from-green-400')).toBeInTheDocument() // Python
      expect(document.querySelector('.from-red-400')).toBeInTheDocument() // Java
    })
  })

  describe('Statistics Section', () => {
    it('displays all achievement statistics', () => {
      expect(screen.getByText('5+')).toBeInTheDocument()
      expect(screen.getByText('Years Experience')).toBeInTheDocument()

      expect(screen.getByText('50+')).toBeInTheDocument()
      expect(screen.getByText('Projects Completed')).toBeInTheDocument()

      expect(screen.getByText('25+')).toBeInTheDocument()
      expect(screen.getByText('Technologies Mastered')).toBeInTheDocument()

      expect(screen.getByText('30+')).toBeInTheDocument()
      expect(screen.getByText('Happy Clients')).toBeInTheDocument()
    })

    it('applies correct colors to statistics', () => {
      // Get statistics container and then find the colored numbers within it
      const statsContainer = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4')
      expect(statsContainer).toBeInTheDocument()
      
      // Check for specific colored stat numbers
      expect(document.querySelector('.text-blue-600')).toBeInTheDocument() // Years Experience
      expect(document.querySelector('.text-green-600')).toBeInTheDocument() // Projects Completed  
      expect(document.querySelector('.text-purple-600')).toBeInTheDocument() // Languages Used
      expect(document.querySelector('.text-orange-600')).toBeInTheDocument() // Platforms Mastered
    })
  })

  describe('Layout and Styling', () => {
    it('has proper section structure', () => {
      const section = document.querySelector('#skills')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('py-20', 'bg-white')
    })

    it('uses responsive grid layout for skill categories', () => {
      const gridContainer = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
      expect(gridContainer).toBeInTheDocument()
    })

    it('uses responsive grid layout for statistics', () => {
      const statsGrid = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4')
      expect(statsGrid).toBeInTheDocument()
    })

    it('applies proper spacing classes', () => {
      const container = document.querySelector('.max-w-6xl')
      expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive text sizing to main heading', () => {
      const heading = screen.getByRole('heading', { name: 'Skills & Expertise' })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })

    it('has responsive layout for skill categories', () => {
      const skillGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
      expect(skillGrid).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      const mainHeading = screen.getByRole('heading', { name: /Skills & Expertise/i, level: 2 })
      expect(mainHeading).toBeInTheDocument()

      const subHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(subHeadings).toHaveLength(5) // 4 categories + 1 statistics

      const headingTexts = subHeadings.map(h => h.textContent)
      expect(headingTexts).toContain('Programming Languages')
      expect(headingTexts).toContain('Mobile & Frontend')
      expect(headingTexts).toContain('Backend & APIs')
      expect(headingTexts).toContain('Tools & Platforms')
    })

    it('has accessible skill bars', () => {
      // Check for progress bars - each skill should have a progress bar
      const skillElements = screen.getAllByText(/\d+%/) // Find all percentage elements
      expect(skillElements.length).toBeGreaterThan(10) // Should have many skills with percentages
    })
  })

  describe('Skill Data Integrity', () => {
    it('displays correct skill levels for top skills', () => {
      // Check highest level skills
      expect(screen.getByText('Git')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()

      expect(screen.getByText('VS Code')).toBeInTheDocument()
      expect(screen.getByText('92%')).toBeInTheDocument()

      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      const ninetyPercentSkills = screen.getAllByText('90%')
      expect(ninetyPercentSkills).toHaveLength(5) // JavaScript, SwiftUI, FastAPI, RESTful APIs, iOS Development
    })

    it('organizes skills into logical categories', () => {
      // Programming Languages category should contain expected skills
      const progLangSection = screen.getByText('Programming Languages').closest('.space-y-6')
      expect(progLangSection).toBeInTheDocument()

      // Mobile & Frontend category should contain expected skills  
      const mobileSection = screen.getByText('Mobile & Frontend').closest('.space-y-6')
      expect(mobileSection).toBeInTheDocument()
    })
  })

  describe('Visual Elements', () => {
    it('renders skill bars with proper structure', () => {
      const skillBars = document.querySelectorAll('.w-full.bg-gray-200.rounded-full.h-3')
      expect(skillBars.length).toBeGreaterThanOrEqual(20)
    })

    it('has proper color scheme throughout', () => {
      // Check that statistics use different colors
      expect(document.querySelector('.text-blue-600')).toBeInTheDocument()
      expect(document.querySelector('.text-green-600')).toBeInTheDocument()
      expect(document.querySelector('.text-purple-600')).toBeInTheDocument()
      expect(document.querySelector('.text-orange-600')).toBeInTheDocument()
    })
  })
})