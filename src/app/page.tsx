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
      {/* DEPLOYMENT TEST - This should be highly visible */}
      <div 
        style={{
          position: 'fixed',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ff0000',
          color: '#ffffff',
          padding: '20px 40px',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: '99999',
          border: '5px solid #000000',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        🚨 DEPLOYMENT TEST - DECEMBER 22, 2025 🚨
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
