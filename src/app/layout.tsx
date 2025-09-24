import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ben H. - Full-Stack Developer | JavaScript, Java, Python Expert",
    template: "%s | Ben H. - Full-Stack Developer"
  },
  description: "Full-stack developer with expertise in JavaScript, Java, Python, C#, and Swift. Specializing in React, Node.js, Spring Boot, and iOS development. Creating innovative solutions across web, mobile, and enterprise applications.",
  keywords: [
    "Full-stack developer",
    "JavaScript developer",
    "Java developer",
    "Python developer",
    "React developer",
    "Node.js developer",
    "TypeScript developer",
    "Spring Boot developer",
    "iOS developer Swift",
    "C# .NET developer",
    "Frontend developer",
    "Backend developer",
    "Web developer",
    "Mobile developer",
    "Software engineer",
    "Portfolio website",
    "Ben Holsinger",
    "Boise Idaho developer"
  ],
  authors: [{ name: "Ben H.", url: "https://benholsinger.dev" }],
  creator: "Ben H.",
  publisher: "Ben H.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://benholsinger.dev',
    title: 'Ben H. - Full-Stack Developer | JavaScript, Java, Python Expert',
    description: 'Full-stack developer specializing in React, Node.js, Spring Boot, and iOS development. View my portfolio showcasing innovative web, mobile, and enterprise applications.',
    siteName: 'Ben H. Portfolio',
    images: [
      {
        url: '/profile-optimized.jpg',
        width: 1200,
        height: 630,
        alt: 'Ben H. - Full-Stack Developer Portfolio',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben H. - Full-Stack Developer | JavaScript, Java, Python Expert',
    description: 'Full-stack developer specializing in React, Node.js, Spring Boot, and iOS development. Creating innovative solutions across platforms.',
    images: ['/profile-optimized.jpg'],
    creator: '@benholsinger',
    site: '@benholsinger',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  category: 'portfolio',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://benholsinger.dev'),
  alternates: {
    canonical: 'https://benholsinger.dev',
  },
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
    <html suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ben H. Portfolio" />
        <link rel="apple-touch-icon" href="/profile-small.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
