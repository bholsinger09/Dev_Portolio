import { getAllBlogPosts } from '@/lib/blog'
import BlogListingClient from '@/components/BlogListingClient'

export default async function BlogPage() {
  const posts = getAllBlogPosts()

  return <BlogListingClient initialPosts={posts} />
}