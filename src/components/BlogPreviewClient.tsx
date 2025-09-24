'use client'

import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { formatDistance } from 'date-fns'
import { ArrowRight, Clock, User } from 'lucide-react'

interface BlogPreviewClientProps {
  featuredPosts: BlogPost[]
}

export default function BlogPreviewClient({ featuredPosts }: BlogPreviewClientProps) {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharing knowledge and experiences in web development, mobile apps, and software engineering
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <article
              key={post.slug}
              className={`group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                index === 0 && featuredPosts.length > 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Featured Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1">
                Featured Article
              </div>

              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {post.category.name}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {Math.ceil(post.readingTime)} min read
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{post.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author.name}</span>
                  </div>
                  <span>
                    {formatDistance(new Date(post.publishedAt), new Date(), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm group-hover:underline"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}