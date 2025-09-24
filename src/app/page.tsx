export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Ben H.
        </h1>
        <h2 className="text-2xl text-blue-600 font-semibold mb-8">
          Full-Stack Developer
        </h2>
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
      </section>

      {/* Projects Preview */}
      <section id="projects" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Web Applications</h3>
              <p className="text-gray-600 mb-4">Modern React and Next.js applications with responsive design</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Systems</h3>
              <p className="text-gray-600 mb-4">Scalable APIs and microservices with modern frameworks</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Node.js</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Spring Boot</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Python</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Development</h3>
              <p className="text-gray-600 mb-4">Native and cross-platform mobile applications</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">React Native</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">iOS</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Swift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Interested in working together? Let's discuss your project and see how I can help bring your ideas to life.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:contact@example.com" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Send Email
          </a>
          <a href="#" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            View Resume
          </a>
        </div>
      </section>
    </div>
  );
}
