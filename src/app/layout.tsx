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
            // Load saved theme on page load
            (function() {
              const saved = localStorage.getItem('theme');
              if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })();
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
