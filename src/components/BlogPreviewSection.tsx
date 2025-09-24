import { getFeaturedBlogPosts } from '@/lib/blog'
import BlogPreviewClient from '@/components/BlogPreviewClient'

export default function BlogPreviewSection() {
  const featuredPosts = getFeaturedBlogPosts(3)

  if (featuredPosts.length === 0) {
    return null
  }

  return <BlogPreviewClient featuredPosts={featuredPosts} />
}