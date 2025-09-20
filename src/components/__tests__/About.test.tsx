import React from 'react'
import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About Component', () => {
  beforeEach(() => {
    render(<About />)
  })

  describe('Section Header', () => {
    it('renders section heading and description', () => {
      expect(screen.getByRole('heading', { name: /About Me/i, level: 2 })).toBeInTheDocument()
      expect(screen.getByText(/I'm a passionate full-stack software engineer/i)).toBeInTheDocument()
      expect(screen.getByText(/From building native iOS apps with SwiftUI/i)).toBeInTheDocument()
    })

    it('has proper section structure', () => {
      const section = document.querySelector('#about')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('py-20', 'bg-white')
    })
  })

  describe('Skill Categories', () => {
    it('renders all 5 skill categories', () => {
      const categoryTitles = [
        'Mobile Development',
        'Backend & APIs',
        'Languages',
        'Frontend Web',
        'Tools & Platforms'
      ]

      categoryTitles.forEach(title => {
        expect(screen.getByRole('heading', { name: title, level: 3 })).toBeInTheDocument()
      })
    })

    it('displays correct category headings as h3 elements', () => {
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements).toHaveLength(5)

      const headingTexts = h3Elements.map(h => h.textContent)
      expect(headingTexts).toEqual([
        'Mobile Development',
        'Backend & APIs',
        'Languages',
        'Frontend Web',
        'Tools & Platforms'
      ])
    })
  })

  describe('Mobile Development Skills', () => {
    it('displays all mobile development technologies', () => {
      const mobileSection = screen.getByText('Mobile Development').closest('.bg-gray-50')
      expect(mobileSection).toBeInTheDocument()

      const mobileTechnologies = ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'MapKit']
      mobileTechnologies.forEach(tech => {
        if (tech === 'Swift') {
          expect(screen.getAllByText(tech)).toHaveLength(2) // Appears in Mobile and Languages
        } else {
          expect(screen.getByText(tech)).toBeInTheDocument()
        }
      })
    })

    it('applies blue color scheme to mobile development badges', () => {
      const mobileSection = screen.getByText('Mobile Development').closest('.bg-gray-50')
      const swiftBadge = mobileSection?.querySelector('span')
      expect(swiftBadge).toHaveClass('bg-blue-100', 'text-blue-800')
    })
  })

  describe('Backend & APIs Skills', () => {
    it('displays all backend and API technologies', () => {
      const backendSection = screen.getByText('Backend & APIs').closest('.bg-gray-50')
      expect(backendSection).toBeInTheDocument()

      const backendTechnologies = ['Python', 'FastAPI', 'Node.js', 'Express', 'OpenAI API']
      backendTechnologies.forEach(tech => {
        if (tech === 'Python') {
          expect(screen.getAllByText(tech)).toHaveLength(2) // Appears in Backend and Languages
        } else {
          expect(screen.getByText(tech)).toBeInTheDocument()
        }
      })
    })

    it('applies green color scheme to backend badges', () => {
      const backendSection = screen.getByText('Backend & APIs').closest('.bg-gray-50')
      const pythonBadge = backendSection?.querySelector('span')
      expect(pythonBadge).toHaveClass('bg-green-100', 'text-green-800')
    })
  })

  describe('Languages Skills', () => {
    it('displays all programming languages', () => {
      const languages = ['Swift', 'Python', 'JavaScript', 'Java', 'TypeScript']
      languages.forEach(language => {
        if (language === 'Swift' || language === 'Python' || language === 'JavaScript') {
          expect(screen.getAllByText(language)).toHaveLength(2) // Appears in multiple sections
        } else {
          expect(screen.getByText(language)).toBeInTheDocument()
        }
      })
    })

    it('applies purple color scheme to language badges', () => {
      // Get the JavaScript badge from the Languages section (not the Frontend section)
      const languagesSection = screen.getByText('Languages').closest('.bg-gray-50')
      const jsBadge = languagesSection?.querySelector('span:nth-child(3)') // JavaScript is 3rd in Languages
      expect(jsBadge).toHaveClass('bg-purple-100', 'text-purple-800')
    })
  })

  describe('Frontend Web Skills', () => {
    it('displays all frontend web technologies', () => {
      const frontendSection = screen.getByText('Frontend Web').closest('.bg-gray-50')
      expect(frontendSection).toBeInTheDocument()

      const frontendTechnologies = ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'JavaScript']
      frontendTechnologies.forEach(tech => {
        if (tech === 'JavaScript') {
          expect(screen.getAllByText(tech)).toHaveLength(2) // Appears in Languages and Frontend
        } else {
          expect(screen.getByText(tech)).toBeInTheDocument()
        }
      })
    })

    it('applies orange color scheme to frontend badges', () => {
      const frontendSection = screen.getByText('Frontend Web').closest('.bg-gray-50')
      const reactBadge = frontendSection?.querySelector('span')
      expect(reactBadge).toHaveClass('bg-orange-100', 'text-orange-800')
    })
  })

  describe('Tools & Platforms Skills', () => {
    it('displays all tools and platform technologies', () => {
      const toolsTechnologies = ['Xcode', 'Git', 'Docker', 'VS Code', 'Uvicorn']
      toolsTechnologies.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })

    it('applies indigo color scheme to tools badges', () => {
      const gitBadge = screen.getByText('Git')
      expect(gitBadge).toHaveClass('bg-indigo-100', 'text-indigo-800')
    })
  })

  describe('Layout and Styling', () => {
    it('uses responsive grid layout for skill categories', () => {
      const skillsGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3')
      expect(skillsGrid).toBeInTheDocument()
    })

    it('applies proper spacing classes', () => {
      const section = document.querySelector('#about')
      expect(section).toHaveClass('py-20')
      
      const container = document.querySelector('.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8')
      expect(container).toBeInTheDocument()
    })

    it('applies hover effects to skill cards', () => {
      const skillCards = document.querySelectorAll('.bg-gray-50.p-6.rounded-xl')
      expect(skillCards.length).toBe(5)

      skillCards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow', 'duration-300')
      })
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive text sizing to main heading', () => {
      const heading = screen.getByRole('heading', { name: /About Me/i })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })

    it('has responsive layout for skill categories', () => {
      const skillsGrid = document.querySelector('.grid')
      expect(skillsGrid).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2', 
        'lg:grid-cols-3'
      )
    })

    it('applies responsive paragraph styling', () => {
      const paragraphs = screen.getAllByText(/I'm a passionate full-stack software engineer|From building native iOS apps/i)
      paragraphs.forEach(p => {
        expect(p).toHaveClass('text-lg', 'text-gray-600', 'leading-relaxed')
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      const mainHeading = screen.getByRole('heading', { name: /About Me/i, level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      const subHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(subHeadings).toHaveLength(5)
    })

    it('has accessible color contrast for badges', () => {
      // Check that badges have proper color classes for accessibility
      const badges = document.querySelectorAll('[class*="bg-"][class*="text-"]')
      expect(badges.length).toBeGreaterThan(20) // Should have many technology badges
    })
  })

  describe('Content Integrity', () => {
    it('displays comprehensive technology coverage', () => {
      // Verify the main biography content
      expect(screen.getByText(/hands-on experience developing applications/i)).toBeInTheDocument()
      expect(screen.getByText(/showcasing my versatility in tackling diverse technical challenges/i)).toBeInTheDocument()
      expect(screen.getByText(/selecting the right technology stack for each project/i)).toBeInTheDocument()
      expect(screen.getByText(/real estate applications, e-commerce platforms/i)).toBeInTheDocument()
    })

    it('organizes technologies into logical categories', () => {
      // Mobile Development should contain iOS-specific tech
      const mobileSection = screen.getByText('Mobile Development').closest('.bg-gray-50')
      expect(mobileSection?.textContent).toContain('SwiftUI')
      expect(mobileSection?.textContent).toContain('UIKit')
      expect(mobileSection?.textContent).toContain('Core Data')

      // Backend should contain server-side tech
      const backendSection = screen.getByText('Backend & APIs').closest('.bg-gray-50')
      expect(backendSection?.textContent).toContain('FastAPI')
      expect(backendSection?.textContent).toContain('Node.js')
      expect(backendSection?.textContent).toContain('OpenAI API')

      // Frontend should contain web tech
      const frontendSection = screen.getByText('Frontend Web').closest('.bg-gray-50')
      expect(frontendSection?.textContent).toContain('React')
      expect(frontendSection?.textContent).toContain('Next.js')
      expect(frontendSection?.textContent).toContain('Tailwind CSS')
    })
  })

  describe('Visual Elements', () => {
    it('renders technology badges with proper structure', () => {
      const badges = document.querySelectorAll('.px-3.py-1.rounded-full.text-sm.font-medium')
      expect(badges.length).toBeGreaterThan(20) // Should have all technology badges
    })

    it('has proper color scheme throughout', () => {
      // Check that each category has distinct colors
      expect(document.querySelector('.bg-blue-100')).toBeInTheDocument()
      expect(document.querySelector('.bg-green-100')).toBeInTheDocument()
      expect(document.querySelector('.bg-purple-100')).toBeInTheDocument()
      expect(document.querySelector('.bg-orange-100')).toBeInTheDocument()
      expect(document.querySelector('.bg-indigo-100')).toBeInTheDocument()
    })

    it('applies consistent card styling', () => {
      const skillCards = document.querySelectorAll('.bg-gray-50')
      expect(skillCards).toHaveLength(5)

      skillCards.forEach(card => {
        expect(card).toHaveClass('p-6', 'rounded-xl')
      })
    })
  })
})