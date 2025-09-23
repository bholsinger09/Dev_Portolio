import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects Component', () => {
  beforeEach(() => {
    render(<Projects />)
  })

  describe('Section Header', () => {
    it('renders section heading and description', () => {
      expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument()
      expect(screen.getByText(/A showcase of my work across different technologies/)).toBeInTheDocument()
    })
  })

  describe('Project Data', () => {
    it('renders all 6 projects', () => {
      const projectTitles = [
        'FastAPI LLM Integration Platform',
        'Java Task Management System',
        'DevRealtor iOS App',
        'HookahShop E-Commerce iOS App',
        'Identity Management Platform',
        'Help Yourself Community Platform'
      ]

      projectTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('displays correct project descriptions', () => {
      expect(screen.getByText(/comprehensive FastAPI application integrated with Large Language Models/)).toBeInTheDocument()
      expect(screen.getByText(/Object-oriented console application built in Java/)).toBeInTheDocument()
      expect(screen.getByText(/Native iOS application developed in Swift/)).toBeInTheDocument()
    })
  })

  describe('Technology Stack Display', () => {
    it('displays all technology tags', () => {
      // Python/FastAPI project
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('FastAPI')).toBeInTheDocument()
      expect(screen.getByText('OpenAI API')).toBeInTheDocument()

      // Java project
      expect(screen.getByText('Java')).toBeInTheDocument()
      expect(screen.getByText('OOP Design')).toBeInTheDocument()

      // Swift projects
      expect(screen.getAllByText('Swift')).toHaveLength(2)
      expect(screen.getByText('SwiftUI')).toBeInTheDocument()
      expect(screen.getByText('UIKit')).toBeInTheDocument()

      // JavaScript/Node.js projects
      expect(screen.getAllByText('JavaScript')).toHaveLength(2)
      expect(screen.getAllByText('Node.js')).toHaveLength(2)
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('applies correct color classes to technology tags', () => {
      const pythonTag = screen.getByText('Python')
      const javaTag = screen.getByText('Java')
      const swiftTag = screen.getAllByText('Swift')[0]
      const jsTag = screen.getAllByText('JavaScript')[0]

      expect(pythonTag).toHaveClass('bg-green-100', 'text-green-800')
      expect(javaTag).toHaveClass('bg-red-100', 'text-red-800')
      expect(swiftTag).toHaveClass('bg-orange-100', 'text-orange-800')
      expect(jsTag).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })
  })

  describe('Project Links', () => {
    it('renders GitHub links for all projects', () => {
      const githubLinks = screen.getAllByText('Code')
      expect(githubLinks).toHaveLength(6)

      // Check that all code links have GitHub URLs
      githubLinks.forEach(link => {
        const href = link.closest('a')?.getAttribute('href')
        expect(href).toContain('github.com/bholsinger09')
      })
    })

    it('renders demo links for all projects', () => {
      const demoLinks = screen.getAllByText('Demo')
      expect(demoLinks).toHaveLength(6)

      // Check that all demo links open in new tab
      demoLinks.forEach(link => {
        const anchor = link.closest('a')
        expect(anchor).toHaveAttribute('target', '_blank')
        expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('has correct external link attributes', () => {
      const codeLinks = screen.getAllByText('Code')
      const demoLinks = screen.getAllByText('Demo')
      const allLinks = [...codeLinks, ...demoLinks]

      allLinks.forEach(link => {
        const anchor = link.closest('a')
        expect(anchor).toHaveAttribute('target', '_blank')
        expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Project Visual Elements', () => {
    it('renders project category emojis and descriptions', () => {
      expect(screen.getByText('🤖')).toBeInTheDocument()
      expect(screen.getByText('☕')).toBeInTheDocument()
      expect(screen.getByText('📱')).toBeInTheDocument()
      expect(screen.getByText('🛍️')).toBeInTheDocument()
      expect(screen.getByText('🔐')).toBeInTheDocument()
      expect(screen.getByText('🤝')).toBeInTheDocument()
    })

    it('displays category titles correctly', () => {
      expect(screen.getByText('FastAPI + AI')).toBeInTheDocument()
      expect(screen.getByText('Java Application')).toBeInTheDocument()
      expect(screen.getByText('iOS Development')).toBeInTheDocument()
      expect(screen.getByText('E-Commerce iOS')).toBeInTheDocument()
      expect(screen.getByText('Identity Platform')).toBeInTheDocument()
      expect(screen.getByText('Community App')).toBeInTheDocument()
    })

    it('shows technology summaries in visual elements', () => {
      expect(screen.getByText('Python • OpenAI • LLM')).toBeInTheDocument()
      expect(screen.getByText('OOP • Collections • Console')).toBeInTheDocument()
      expect(screen.getByText('Swift • SwiftUI • MapKit')).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('has proper section structure', () => {
      const section = document.querySelector('#projects')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('py-20', 'bg-gray-50')
    })

    it('uses responsive grid layout', () => {
      const gridContainer = document.querySelector('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
    })

    it('applies proper styling to project cards', () => {
      const projectCards = document.querySelectorAll('.bg-white')
      expect(projectCards).toHaveLength(6)

      // Check card styling
      const firstCard = projectCards[0]
      expect(firstCard).toHaveClass('bg-white', 'rounded-xl', 'shadow-lg', 'overflow-hidden')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const mainHeading = screen.getByRole('heading', { name: 'Featured Projects' })
      expect(mainHeading.tagName).toBe('H2')

      // Project titles should be properly structured
      const projectHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(projectHeadings).toHaveLength(6)
    })

    it('has meaningful link descriptions', () => {
      expect(screen.getAllByText('Code')).toHaveLength(6)
      expect(screen.getAllByText('Demo')).toHaveLength(6)
    })

    it('has proper semantic structure', () => {
      const section = document.querySelector('#projects')
      expect(section?.tagName).toBe('SECTION')

      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThanOrEqual(7) // Main heading + 6 project headings
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive text sizing', () => {
      const heading = screen.getByRole('heading', { name: 'Featured Projects' })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })

    it('has responsive spacing', () => {
      const container = document.querySelector('.max-w-7xl')
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Interactive Elements', () => {
    it('renders interactive buttons with proper classes', () => {
      const codeButtons = screen.getAllByText('Code')
      const demoButtons = screen.getAllByText('Demo')

      codeButtons.forEach(button => {
        expect(button.closest('a')).toHaveClass('flex', 'items-center', 'gap-1')
      })

      demoButtons.forEach(button => {
        expect(button.closest('a')).toHaveClass('flex', 'items-center', 'gap-1', 'bg-blue-600', 'text-white')
      })
    })

    it('has proper hover styling classes', () => {
      const codeLinks = screen.getAllByText('Code')
      const demoLinks = screen.getAllByText('Demo')

      codeLinks.forEach(link => {
        expect(link.closest('a')).toHaveClass('hover:text-gray-900')
      })

      demoLinks.forEach(link => {
        expect(link.closest('a')).toHaveClass('hover:bg-blue-700')
      })
    })
  })
})