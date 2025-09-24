import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/'],
        },
        sitemap: 'https://benholsinger.dev/sitemap.xml',
        host: 'https://benholsinger.dev',
    }
}