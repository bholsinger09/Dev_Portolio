import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Theme Toggle - Fixed Position at Top Right */}
      <div 
        onClick={() => {
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark');
          }
        }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '16px',
          fontWeight: 'bold',
          border: '3px solid #1e40af',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          userSelect: 'none'
        }}
      >
        🌙 Theme
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
