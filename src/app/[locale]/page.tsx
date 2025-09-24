import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EnhancedProjectsSection from '@/components/EnhancedProjectsSection';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function LocalePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <About />
                <EnhancedProjectsSection />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}