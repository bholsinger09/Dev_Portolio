import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import './theme-toggle.css';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* CSS-only theme toggle */}
      <div 
        className="theme-toggle"
        onClick={() => {
          if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark');
          }
        }}
        style={{
          /* Inline backup styles */
          position: 'fixed',
          top: '20px', 
          right: '20px',
          width: '100px',
          height: '40px',
          backgroundColor: '#ff0000',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '14px',
          fontWeight: 'bold',
          border: '3px solid black'
        }}
      >
        🌙 THEME
      </div>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
