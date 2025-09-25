// Blog utility functions
import 'server-only'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogMetadata, BlogSearchFilters, defaultAuthor, blogCategories } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Ensure the blog posts directory exists
 */
export function ensureBlogDirectory(): void {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

/**
 * Get all blog post slugs
 */
export function getBlogPostSlugs(): string[] {
  ensureBlogDirectory();
  try {
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.warn('Could not read blog posts directory:', error);
    return [];
  }
}

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const metadata = data as BlogMetadata;
    const readingTimeStats = readingTime(content);

    // Find category by slug
    const category = blogCategories.find(cat => cat.slug === metadata.category) || blogCategories[0];

    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content,
      publishedAt: metadata.publishedAt,
      updatedAt: metadata.updatedAt,
      author: defaultAuthor, // Can be extended for multiple authors
      category,
      tags: metadata.tags || [],
      readingTime: readingTimeStats.minutes,
      featured: metadata.featured || false,
      coverImage: metadata.coverImage,
      seo: metadata.seo
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts with optional filtering
 */
export function getAllBlogPosts(filters?: BlogSearchFilters): BlogPost[] {
  const slugs = getBlogPostSlugs();
  let posts = slugs
    .map(slug => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null);

  // Apply filters
  if (filters) {
    if (filters.category) {
      posts = posts.filter(post => post.category.slug === filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      posts = posts.filter(post =>
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }

    if (filters.query) {
      const query = filters.query.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.featured !== undefined) {
      posts = posts.filter(post => post.featured === filters.featured);
    }

    // Sort posts
    const sortBy = filters.sortBy || 'publishedAt';
    const sortOrder = filters.sortOrder || 'desc';

    posts.sort((a, b) => {
      let aValue: string | number = a[sortBy as keyof BlogPost] as string | number;
      let bValue: string | number = b[sortBy as keyof BlogPost] as string | number;

      if (sortBy === 'publishedAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  } else {
    // Default sort by published date, newest first
    posts.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  return posts;
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts({ featured: true }).slice(0, limit);
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();

  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);

  // Calculate relevance score based on category and tags
  const postsWithScore = otherPosts.map(post => {
    let score = 0;

    // Same category gets higher score
    if (post.category.slug === currentPost.category.slug) {
      score += 3;
    }

    // Shared tags get points
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length;

    return { post, score };
  });

  // Sort by score and return top posts
  return postsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

/**
 * Filter blog posts by various criteria
 */
export function filterBlogPosts(
  posts: BlogPost[],
  filters: {
    category?: string
    featured?: boolean
    tags?: string[]
  } = {}
): BlogPost[] {
  return posts.filter(post => {
    if (filters.category && post.category.slug !== filters.category) {
      return false;
    }
    if (filters.featured !== undefined && post.featured !== filters.featured) {
      return false;
    }
    if (filters.tags && !filters.tags.some(tag => post.tags.includes(tag))) {
      return false;
    }
    return true;
  });
}

/**
 * Get all unique tags from blog posts
 */
export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tagSet = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get post navigation (previous/next posts)
 */
export function getPostNavigation(currentSlug: string): {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
} {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  return {
    previousPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
}

/**
 * Format date for display
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Generate blog post excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1') // Remove bold/italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace) + '...';
}