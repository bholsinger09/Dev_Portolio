import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function useLanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const switchLanguage = (newLocale: string) => {
        // Replace the locale in the current path
        const segments = pathname.split('/');
        segments[1] = newLocale; // Replace the locale segment
        const newPath = segments.join('/');

        router.push(newPath);
    };

    const getLocalizedPath = (locale: string, path?: string) => {
        const targetPath = path || pathname;
        const segments = targetPath.split('/');

        if (segments[1] === currentLocale || ['en', 'es', 'fr'].includes(segments[1])) {
            segments[1] = locale;
        } else {
            segments.splice(1, 0, locale);
        }

        return segments.join('/');
    };

    return {
        switchLanguage,
        getLocalizedPath,
        currentLocale
    };
}