import React from 'react';

/**
 * JSON-LD Structured Data for SEO
 * Provides rich information about the person, website, and professional background
 * to search engines for better understanding and display in search results
 */
export const StructuredData: React.FC = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ben Holsinger",
        "alternateName": "Ben H.",
        "description": "Full-stack developer with expertise in JavaScript, Java, Python, C#, and Swift",
        "url": "https://benholsinger.dev",
        "image": "https://benholsinger.dev/profile-optimized.jpg",
        "sameAs": [
            "https://github.com/bholsinger09",
            "https://linkedin.com/in/benholsinger",
            "https://twitter.com/benholsinger"
        ],
        "jobTitle": "Full-Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boise",
            "addressRegion": "ID",
            "addressCountry": "US"
        },
        "email": "bholsinger@gmail.com",
        "telephone": "+1-208-284-1929",
        "knowsAbout": [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Java",
            "Spring Boot",
            "Python",
            "Django",
            "C#",
            ".NET",
            "Swift",
            "iOS Development",
            "Full-Stack Development",
            "Web Development",
            "Mobile Development",
            "Software Engineering"
        ],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Computer Science Education"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ben H. Portfolio",
        "alternateName": "Ben Holsinger Developer Portfolio",
        "url": "https://benholsinger.dev",
        "description": "Professional portfolio showcasing full-stack development projects and skills",
        "author": {
            "@type": "Person",
            "name": "Ben Holsinger"
        },
        "inLanguage": "en-US",
        "copyrightHolder": {
            "@type": "Person",
            "name": "Ben Holsinger"
        },
        "copyrightYear": "2024",
        "genre": "Portfolio",
        "keywords": "portfolio, full-stack developer, JavaScript, React, Node.js, Java, Python, Swift"
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Ben H. - Full-Stack Development Services",
        "description": "Professional full-stack development services including web applications, mobile apps, and enterprise solutions",
        "provider": {
            "@type": "Person",
            "name": "Ben Holsinger"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "serviceType": "Software Development",
        "url": "https://benholsinger.dev",
        "priceRange": "$$",
        "serviceOutput": [
            "Web Applications",
            "Mobile Applications",
            "Enterprise Solutions",
            "API Development",
            "Database Design"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(professionalServiceSchema),
                }}
            />
        </>
    );
};

export default StructuredData;