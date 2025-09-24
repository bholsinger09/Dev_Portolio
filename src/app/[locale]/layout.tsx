import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '../../components/Providers';
import PerformanceMonitor from '../../components/PerformanceMonitor';
import Analytics from '../../components/Analytics';
import StructuredData from '../../components/StructuredData';

const locales = ['en', 'es', 'fr'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    // Import messages for the current locale
    const messages = await getMessages({ locale });

    // Get meta translations
    const meta = messages.meta as any;

    return {
        title: {
            default: meta.title.default,
            template: meta.title.template
        },
        description: meta.description,
        keywords: meta.keywords,
        authors: [{ name: meta.author.name, url: meta.author.url }],
        creator: meta.author.name,
        publisher: meta.author.name,
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
            locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'fr_FR',
            url: `https://benholsinger.dev/${locale}`,
            title: meta.title.default,
            description: meta.description,
            siteName: meta.siteName,
            images: [
                {
                    url: '/profile-optimized.jpg',
                    width: 1200,
                    height: 630,
                    alt: meta.title.default,
                    type: 'image/jpeg',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title.default,
            description: meta.description,
            images: ['/profile-optimized.jpg'],
            creator: '@benholsinger',
            site: '@benholsinger',
        },
        verification: {
            google: 'your-google-verification-code',
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
            canonical: `https://benholsinger.dev/${locale}`,
            languages: {
                'en': 'https://benholsinger.dev/en',
                'es': 'https://benholsinger.dev/es',
                'fr': 'https://benholsinger.dev/fr',
            }
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    // Providing all messages to the client side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <StructuredData />
            </head>
            <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                <Analytics />
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        {children}
                        <PerformanceMonitor />
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}