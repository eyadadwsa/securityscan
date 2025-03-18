import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - SecureSEO",
  description: "Latest insights on website security and SEO optimization",
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding the OWASP Top 10 and How to Protect Your Website",
    excerpt:
      "A comprehensive guide to the most critical web application security risks and practical steps to mitigate them.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    slug: "understanding-owasp-top-10",
  },
  {
    id: "2",
    title: "Core Web Vitals: The New SEO Ranking Factor You Can't Ignore",
    excerpt:
      "Learn how Google's Core Web Vitals affect your website's search ranking and how to optimize for these metrics.",
    date: "April 28, 2023",
    author: "Michael Chen",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80",
    slug: "core-web-vitals-seo-ranking",
  },
  {
    id: "3",
    title: "The Importance of Content Security Policy Headers",
    excerpt:
      "Discover how implementing proper CSP headers can protect your website from XSS attacks and other security threats.",
    date: "April 10, 2023",
    author: "David Rodriguez",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    slug: "content-security-policy-headers",
  },
  {
    id: "4",
    title: "Multilingual SEO: Strategies for Global Reach",
    excerpt:
      "Effective techniques for optimizing your website for multiple languages and international audiences.",
    date: "March 22, 2023",
    author: "Aisha Patel",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    slug: "multilingual-seo-strategies",
  },
  {
    id: "5",
    title: "How to Conduct a Thorough Security Audit of Your Website",
    excerpt:
      "A step-by-step guide to identifying and addressing security vulnerabilities in your web application.",
    date: "March 5, 2023",
    author: "Thomas Weber",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80",
    slug: "website-security-audit-guide",
  },
  {
    id: "6",
    title: "Mobile-First Indexing: Optimizing Your Site for Mobile Users",
    excerpt:
      "Best practices for ensuring your website performs well under Google's mobile-first indexing approach.",
    date: "February 18, 2023",
    author: "Emma Wilson",
    category: "SEO",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80",
    slug: "mobile-first-indexing-optimization",
  },
];

export default function BlogPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Latest insights, guides, and news on website security and SEO
          optimization
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Button variant="outline" className="rounded-full">
          All
        </Button>
        <Button variant="outline" className="rounded-full">
          Security
        </Button>
        <Button variant="outline" className="rounded-full">
          SEO
        </Button>
        <Button variant="outline" className="rounded-full">
          Performance
        </Button>
        <Button variant="outline" className="rounded-full">
          Tutorials
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span className="inline-flex items-center">
                  <Calendar size={14} className="mr-1" /> {post.date}
                </span>
                <span className="inline-flex items-center">
                  <User size={14} className="mr-1" /> {post.author}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={`/blog/${post.slug}`} className="flex items-center">
                  Read More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Stay updated with the latest security threats, SEO trends, and
          exclusive tips delivered straight to your inbox.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
