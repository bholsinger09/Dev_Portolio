import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Page Not Found | Ben H. - Full-Stack Developer',
    description: 'The requested page could not be found. Return to Ben H.\'s portfolio homepage to explore projects and skills.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md mx-auto text-center px-6">
                <div className="mb-8">
                    <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        ← Back to Homepage
                    </Link>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>Or try these popular sections:</p>
                        <div className="flex justify-center space-x-4 mt-2">
                            <Link
                                href="/#projects"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/#about"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/#contact"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-xs text-gray-400 dark:text-gray-500">
                    <p>Error 404 - Ben H. Portfolio</p>
                </div>
            </div>
        </div>
    )
}