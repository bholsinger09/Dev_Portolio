import { notFound } from 'next/navigation';import { notFound } from 'next/navigation';

import { getRequestConfig } from 'next-intl/server';import { getRequestConfig } from 'next-intl/server';



// Can be imported from a shared config// Can be imported from a shared config

export const locales = ['en', 'es', 'fr'] as const;export const locales = ['en', 'es', 'fr'] as const;

export const defaultLocale = 'en' as const;export const defaultLocale = 'en' as const;



export type Locale = typeof locales[number];export type Locale = typeof locales[number];



export default getRequestConfig(async ({ locale }): Promise<{ locale: string; messages: any }> => {export default getRequestConfig(async ({ locale }): Promise<{ locale: string; messages: any }> => {

    // Validate that the incoming `locale` parameter is valid    // Validate that the incoming `locale` parameter is valid

    if (!locale || !locales.includes(locale as Locale)) notFound();    if (!locale || !locales.includes(locale as Locale)) notFound();



    return {    return {

        locale,        locale,

        messages: (await import(`./messages/${locale}.json`)).default        messages: (await import(`./messages/${locale}.json`)).default

    };    };

});});