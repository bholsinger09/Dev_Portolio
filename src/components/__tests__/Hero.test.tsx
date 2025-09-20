import { render, screen, fireEvent } from '@testing-library/react'
import Hero from '../Hero'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || 'Profile'} />
  },
}))

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  describe('Profile Image', () => {
    it('renders profile image with correct attributes', () => {
      const profileImage = screen.getByAltText('Ben H. - Full-Stack Software Engineer')
      
      expect(profileImage).toBeInTheDocument()
      expect(profileImage).toHaveAttribute('src', '/profile-small.png')
      expect(profileImage).toHaveClass('w-full', 'h-full', 'object-cover')
    })

    it('handles image load error with fallback', () => {
      const profileImage = screen.getByAltText('Ben H. - Full-Stack Software Engineer')
      
      // Simulate image load error
      fireEvent.error(profileImage)
      
      // Should fallback to BH initials
      expect(screen.getByText('BH')).toBeInTheDocument()
    })
  })

  describe('Text Content', () => {
    it('renders main heading with correct text', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 })
      
      expect(mainHeading).toHaveTextContent('Ben H.')
      expect(mainHeading).toHaveTextContent('Full-Stack Software Engineer')
    })

    it('displays all programming languages', () => {
      expect(screen.getByText('JavaScript/TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Java')).toBeInTheDocument() 
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('C#')).toBeInTheDocument()
      expect(screen.getByText('Swift')).toBeInTheDocument()
    })

    it('renders professional description', () => {
      const description = screen.getByText(/Experienced software engineer specializing in full-stack development/)
      expect(description).toBeInTheDocument()
      
      const buildingText = screen.getByText(/Building scalable applications from web platforms to mobile solutions/)
      expect(buildingText).toBeInTheDocument()
    })
  })

  describe('Action Buttons', () => {
    it('renders "View My Work" button with correct link', () => {
      const viewWorkButton = screen.getByRole('link', { name: /view my work/i })
      
      expect(viewWorkButton).toBeInTheDocument()
      expect(viewWorkButton).toHaveAttribute('href', '#projects')
      expect(viewWorkButton).toHaveClass('bg-blue-600')
    })

    it('renders "Download Resume" button with correct attributes', () => {
      const downloadButton = screen.getByRole('link', { name: /download resume/i })
      
      expect(downloadButton).toBeInTheDocument()
      expect(downloadButton).toHaveAttribute('href', '/resume.pdf')
      expect(downloadButton).toHaveClass('border-2', 'border-gray-300')
    })
  })

  describe('Social Links', () => {
    it('renders GitHub link with correct attributes', () => {
      const githubLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === 'https://github.com/bholsinger09'
      )
      
      expect(githubLinks[0]).toBeInTheDocument()
      expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/bholsinger09')
      expect(githubLinks[0]).toHaveAttribute('target', '_blank')
      expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders LinkedIn link with correct attributes', () => {
      const linkedinLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === 'https://linkedin.com/in/ben-holsinger'
      )
      
      expect(linkedinLinks[0]).toBeInTheDocument()
      expect(linkedinLinks[0]).toHaveAttribute('href', 'https://linkedin.com/in/ben-holsinger')
      expect(linkedinLinks[0]).toHaveAttribute('target', '_blank')
    })

    it('renders email link with correct attributes', () => {
      const emailLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === 'mailto:ben.holsinger@example.com'
      )
      
      expect(emailLinks[0]).toBeInTheDocument()
      expect(emailLinks[0]).toHaveAttribute('href', 'mailto:ben.holsinger@example.com')
    })
  })

  describe('Layout and Styling', () => {
    it('has correct section structure', () => {
      const heroSection = document.querySelector('section')
      
      expect(heroSection).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center')
    })

    it('applies responsive classes correctly', () => {
      const profileContainer = screen.getByAltText('Ben H. - Full-Stack Software Engineer').parentElement
      
      expect(profileContainer).toHaveClass('w-48', 'h-48', 'md:w-56', 'md:h-56')
    })
  })

  describe('Accessibility', () => {
    it('has proper alt text for profile image', () => {
      const profileImage = screen.getByAltText('Ben H. - Full-Stack Software Engineer')
      expect(profileImage).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading')
      expect(headings[0]).toHaveTextContent('Ben H.')
    })

    it('has proper link labels', () => {
      expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /download resume/i })).toBeInTheDocument()
    })
  })
})