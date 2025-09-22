import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ben H. - Full-Stack Developer",
  description: "Full-stack developer with expertise in JavaScript, Java, Python, C#, and Swift. Creating innovative solutions across web, mobile, and enterprise applications.",
  keywords: "Full-stack developer, JavaScript, Java, Python, C#, Swift, React, Node.js, Spring Boot, iOS development",
  authors: [{ name: "Ben H." }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            function toggleTheme() {
              document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
              );
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        {/* THEME TOGGLE IN BODY - SHOULD DEFINITELY WORK */}
        <div 
          onClick={() => {
            if (typeof window !== 'undefined') {
              (window as any).toggleTheme();
            }
          }}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '80px',
            height: '40px',
            backgroundColor: '#ff0000',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 99999,
            fontSize: '12px',
            fontWeight: 'bold',
            border: '4px solid #000000',
            boxShadow: '0 0 20px rgba(255,0,0,0.8)'
          }}
        >
          🌙 THEME
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
