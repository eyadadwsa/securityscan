import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Search,
  BarChart,
  CheckCircle2,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SecureSEO - Security & SEO Analysis Platform",
  description: "Comprehensive security and SEO analysis for your website",
};

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Secure Your Website.
                <br />
                Optimize Your Visibility.
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive security scanning and SEO analysis in one powerful
                platform. Protect your website and improve your search rankings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/pricing">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-muted rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Security and SEO Dashboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 top-8 left-8 right-8 bottom-8 bg-primary/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">
              All-in-One Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to secure and optimize your website
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Security Scanning</h3>
                <p className="text-muted-foreground">
                  Detect vulnerabilities, malware, and security
                  misconfigurations with comprehensive scanning based on OWASP
                  Top 10.
                </p>
                <Button variant="ghost" className="p-0 h-auto" asChild>
                  <Link href="/security" className="flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">SEO Analysis</h3>
                <p className="text-muted-foreground">
                  Improve your search rankings with keyword analysis, backlink
                  monitoring, and Core Web Vitals optimization.
                </p>
                <Button variant="ghost" className="p-0 h-auto" asChild>
                  <Link href="/seo" className="flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  Performance Monitoring
                </h3>
                <p className="text-muted-foreground">
                  Track and optimize your website's performance metrics for
                  better user experience and search engine rankings.
                </p>
                <Button variant="ghost" className="p-0 h-auto" asChild>
                  <Link href="/services" className="flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, effective, and comprehensive website analysis in four easy
              steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Verify Your Website</h3>
              <p className="text-muted-foreground">
                Quickly verify ownership of your website through DNS, HTML file,
                or meta tag verification.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Run Comprehensive Scan</h3>
              <p className="text-muted-foreground">
                Our platform scans your website for security vulnerabilities,
                SEO issues, and performance bottlenecks.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Review Detailed Reports</h3>
              <p className="text-muted-foreground">
                Get actionable insights with severity ratings and specific
                recommendations for improvement.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold">Implement & Monitor</h3>
              <p className="text-muted-foreground">
                Follow our recommendations and track your progress with
                continuous monitoring and regular rescans.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about SecureSEO
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "SecureSEO has transformed our approach to website security.
                  We've fixed vulnerabilities we didn't even know existed and
                  improved our search rankings at the same time."
                </p>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    CTO, TechStart Inc.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "The multilingual support is fantastic. We operate in multiple
                  countries, and being able to analyze our websites in different
                  languages has been invaluable."
                </p>
                <div>
                  <p className="font-semibold">Miguel Rodriguez</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing Director, Global Reach Ltd.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="italic">
                  "As a small business owner with limited technical knowledge,
                  SecureSEO has been a game-changer. The clear recommendations
                  and step-by-step guidance have helped us secure our site."
                </p>
                <div>
                  <p className="font-semibold">Emily Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Owner, Artisan Crafts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to Secure and Optimize Your Website?
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Join thousands of businesses that trust SecureSEO for their
              website security and SEO needs. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto space-y-12">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                Multilingual Support
              </h2>
              <p className="text-muted-foreground mb-6">
                Our platform supports multiple languages including English,
                French, Spanish, Arabic (with RTL support), and Chinese, making
                it accessible to users worldwide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Full interface translation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Right-to-left (RTL) support for Arabic</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Language-specific SEO recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Localized reporting and analysis</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-muted rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  alt="Multilingual Support"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 top-8 -right-8 bottom-8 -left-8 bg-primary/10 rounded-lg"></div>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="relative z-10 bg-muted rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Theme Options"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 top-8 -right-8 bottom-8 -left-8 bg-primary/10 rounded-lg"></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                Theme Options
              </h2>
              <p className="text-muted-foreground mb-6">
                Choose between light, dark, or system theme to match your
                preferences and reduce eye strain during late-night sessions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Light theme for bright environments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Dark theme for reduced eye strain</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>System theme that follows your device settings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Persistent preferences across sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Trusted by Leading Companies
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-32 bg-muted/50 rounded flex items-center justify-center"
              >
                <span className="text-muted-foreground font-medium">
                  LOGO {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
