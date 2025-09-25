"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      {/* Hero Section with Profile Picture */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/profile-optimized.jpg"
            alt="Ben H. - Full-Stack Developer"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-6"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Ben H.
          </h1>
          <h2 className="text-2xl text-blue-600 font-semibold mb-8">
            Full-Stack Developer
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Experienced developer specializing in JavaScript, Java, Python, and C#.
          Building innovative solutions across web, mobile, and enterprise applications.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/blog" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            View Blog
          </a>
          <a href="#projects" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            View Projects
          </a>
          <a href="#contact" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Quick Stats */}
      <section id="about" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">About Me</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">5+ Years</h3>
            <p className="text-gray-600">Professional Development Experience</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Multiple</h3>
            <p className="text-gray-600">Programming Languages & Frameworks</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Full-Stack</h3>
            <p className="text-gray-600">Web & Mobile Development</p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">My Journey</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            As a passionate full-stack developer, I bring ideas to life through code. With extensive experience
            in modern web technologies, backend systems, and mobile development, I create solutions that are
            both technically robust and user-friendly. My expertise spans across JavaScript/TypeScript ecosystems,
            Java enterprise applications, Python data solutions, and native mobile development.
          </p>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Web Applications</h3>
              <p className="text-gray-600 mb-4">Modern React and Next.js applications with responsive design and optimal performance</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Systems</h3>
              <p className="text-gray-600 mb-4">Scalable APIs and microservices with modern frameworks and cloud deployment</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Node.js</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Spring Boot</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Python</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Development</h3>
              <p className="text-gray-600 mb-4">Native and cross-platform mobile applications with intuitive user experiences</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">React Native</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">iOS</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Swift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Technical Skills</h2>

          {/* Add CSS styles */}
          <style jsx>{`
            .skill-progress-container {
              width: 100%;
              height: 24px;
              background-color: #e5e7eb;
              border-radius: 12px;
              border: 2px solid #9ca3af;
              overflow: hidden;
              box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 8px;
            }
            .skill-progress-bar {
              height: 100%;
              border-radius: 10px;
              transition: all 0.3s ease;
              cursor: pointer;
              transform-origin: left;
            }
            .skill-progress-bar:hover {
              transform: scaleY(1.15);
              filter: brightness(1.1);
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .frontend-bar { background-color: #3b82f6; }
            .frontend-bar:hover { background-color: #2563eb; }
            .backend-bar { background-color: #10b981; }
            .backend-bar:hover { background-color: #059669; }
            .database-bar { background-color: #8b5cf6; }
            .database-bar:hover { background-color: #7c3aed; }
            .mobile-bar { background-color: #f59e0b; }
            .mobile-bar:hover { background-color: #d97706; }
            .testing-bar { background-color: #ef4444; }
            .testing-bar:hover { background-color: #dc2626; }
          `}</style>
          <div className="max-w-6xl w-full">
            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
              {/* Frontend Skills */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Frontend Development</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">React/Next.js</span>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">90%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar frontend-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">TypeScript</span>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">85%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar frontend-bar" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Tailwind CSS</span>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">88%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar frontend-bar" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Vue.js</span>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">75%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar frontend-bar" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend Skills */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Backend Development</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Node.js/Express</span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">87%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar backend-bar" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Java/Spring Boot</span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">82%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar backend-bar" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Python/Django</span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">80%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar backend-bar" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">C#/.NET</span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">78%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar backend-bar" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Skills */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Database & DevOps</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">PostgreSQL</span>
                      <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">85%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar database-bar" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">MongoDB</span>
                      <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">83%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar database-bar" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Docker/AWS</span>
                      <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">75%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar database-bar" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Development */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Mobile Development</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">React Native</span>
                      <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">88%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar mobile-bar" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">iOS/Swift</span>
                      <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">82%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar mobile-bar" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testing & QA */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Testing & QA</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Scrum/Agile</span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">90%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar testing-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">TestRails</span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">85%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar testing-bar" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Easy Redmine</span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">80%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar testing-bar" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Regression Testing</span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">88%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar testing-bar" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-between items-center mb-3 max-w-xs mx-auto">
                      <span className="font-medium text-gray-700">Automation Testing</span>
                      <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">75%</span>
                    </div>
                    <div className="skill-progress-container">
                      <div className="skill-progress-bar testing-bar" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            Let's create something amazing together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Email</h4>
              <a href="mailto:contact@example.com" className="text-blue-100 hover:text-white transition-colors">
                contact@example.com
              </a>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">LinkedIn</h4>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                Connect with me
              </a>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h4 className="font-bold mb-2">GitHub</h4>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                View my code
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:contact@example.com" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              Send Email
            </a>
            <a href="/resume.pdf" className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}