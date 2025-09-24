// Blog-related TypeScript interfaces and types

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  featured: boolean;
  coverImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogAuthor {
  name: string;
  bio: string;
  avatar: string;
  website?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  author?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogListingProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentCategory?: string;
  currentTag?: string;
  searchQuery?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    postsPerPage: number;
  };
}

export interface BlogPostProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  nextPost?: BlogPost;
  previousPost?: BlogPost;
}

export interface BlogSearchFilters {
  category?: string;
  tags?: string[];
  query?: string;
  featured?: boolean;
  sortBy?: 'publishedAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Blog configuration
export interface BlogConfig {
  postsPerPage: number;
  enableComments: boolean;
  enableSearch: boolean;
  enableTags: boolean;
  enableCategories: boolean;
  enableFeaturedPosts: boolean;
  enableRelatedPosts: boolean;
  maxRelatedPosts: number;
  enableReadingTime: boolean;
  enableSocialSharing: boolean;
}

export const defaultBlogConfig: BlogConfig = {
  postsPerPage: 6,
  enableComments: false, // Can be enabled later with a commenting system
  enableSearch: true,
  enableTags: true,
  enableCategories: true,
  enableFeaturedPosts: true,
  enableRelatedPosts: true,
  maxRelatedPosts: 3,
  enableReadingTime: true,
  enableSocialSharing: true,
};

// Blog categories
export const blogCategories: BlogCategory[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'Frontend and backend web development tutorials and insights',
    color: 'blue',
    icon: '🌐'
  },
  {
    slug: 'mobile-development', 
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform mobile development',
    color: 'green',
    icon: '📱'
  },
  {
    slug: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Artificial Intelligence, ML, and API integrations',
    color: 'purple',
    icon: '🤖'
  },
  {
    slug: 'career-insights',
    name: 'Career Insights',
    description: 'Professional development and career advice for developers',
    color: 'orange',
    icon: '💼'
  },
  {
    slug: 'tutorials',
    name: 'Tutorials',
    description: 'Step-by-step guides and coding tutorials',
    color: 'red',
    icon: '📚'
  },
  {
    slug: 'tools-tips',
    name: 'Tools & Tips',
    description: 'Development tools, productivity tips, and best practices',
    color: 'indigo',
    icon: '🛠️'
  }
];

// Default blog author (you can extend this for guest authors later)
export const defaultAuthor: BlogAuthor = {
  name: 'Ben Holsinger',
  bio: 'Full-stack software engineer specializing in mobile, web, and AI integration development. Passionate about building scalable applications and sharing knowledge.',
  avatar: '/profile-small.png',
  social: {
    github: 'https://github.com/bholsinger09',
    linkedin: 'https://linkedin.com/in/ben-holsinger'
  }
};