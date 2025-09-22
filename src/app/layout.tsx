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
              console.log('Theme toggled! Dark mode is now: ' + document.documentElement.classList.contains('dark'));
            }
            
            // Load saved theme on page load
            (function() {
              const saved = localStorage.getItem('theme');
              if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })();
            
            // Multiple attempts to inject the button
            function injectThemeButton() {
              // Remove any existing theme buttons first
              const existing = document.getElementById('force-theme-toggle');
              if (existing) existing.remove();
              
              const button = document.createElement('button');
              button.id = 'force-theme-toggle';
              button.innerHTML = '🌙 THEME';
              button.onclick = toggleTheme;
              button.style.cssText = \`
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                background: #ff0000 !important;
                color: white !important;
                border: 3px solid #000000 !important;
                border-radius: 8px !important;
                padding: 15px 20px !important;
                cursor: pointer !important;
                z-index: 999999 !important;
                font-size: 16px !important;
                font-weight: bold !important;
                box-shadow: 0 0 20px rgba(255,0,0,0.8) !important;
                font-family: system-ui !important;
                pointer-events: auto !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
              \`;
              
              document.body.appendChild(button);
              console.log('FORCE THEME BUTTON INJECTED!', button);
              return button;
            }
            
            // Try multiple times
            setTimeout(injectThemeButton, 100);
            setTimeout(injectThemeButton, 500);
            setTimeout(injectThemeButton, 1000);
            setTimeout(injectThemeButton, 2000);
            
            window.addEventListener('load', injectThemeButton);
            document.addEventListener('DOMContentLoaded', injectThemeButton);
            
            // Also try when the page becomes visible
            document.addEventListener('visibilitychange', function() {
              if (!document.hidden) {
                injectThemeButton();
              }
            });
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
