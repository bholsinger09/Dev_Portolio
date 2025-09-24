export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Ben H. - Full-Stack Developer</h1>
      <p className="text-xl text-gray-600 mb-8">Welcome to my portfolio</p>
      <div className="flex gap-4">
        <a href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          View Blog
        </a>
        <a href="#projects" className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          View Projects
        </a>
      </div>
    </div>
  );
}
