import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'es', 'fr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];

// Type for internationalization messages
type Messages = Record<string, string | Record<string, string>>;

export default getRequestConfig(async ({ locale }): Promise<{ locale: string; messages: Messages }> => {
    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as Locale)) notFound();

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});