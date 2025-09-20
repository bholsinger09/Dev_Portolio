// Simple placeholder images for projects
export const ProjectImages = {
  fastapi: (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="fastapi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#009485',stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#059669',stopOpacity:1}} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#fastapi-grad)"/>
      <text x="200" y="100" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="24" fontWeight="bold">FastAPI + AI</text>
      <text x="200" y="130" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="14">Python • OpenAI • LLM</text>
    </svg>
  ),
  
  java: (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="java-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#dc2626',stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#991b1b',stopOpacity:1}} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#java-grad)"/>
      <text x="200" y="100" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="24" fontWeight="bold">Java Todo App</text>
      <text x="200" y="130" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="14">OOP • Collections • Console</text>
    </svg>
  ),
  
  ios: (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="ios-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3b82f6',stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#1d4ed8',stopOpacity:1}} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#ios-grad)"/>
      <text x="200" y="100" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="24" fontWeight="bold">iOS Development</text>
      <text x="200" y="130" textAnchor="middle" dominantBaseline="central" 
            fill="white" fontSize="14">Swift • SwiftUI • Core Data</text>
    </svg>
  )
};