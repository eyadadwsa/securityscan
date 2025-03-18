import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Search,
  BarChart,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services - SecureSEO",
  description: "Comprehensive security and SEO services for your website",
};

export default function ServicesPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Our Services
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive solutions to secure and optimize your online presence
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Security Analysis</CardTitle>
            <CardDescription>
              Protect your website from vulnerabilities and threats
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>OWASP Top 10 vulnerability scanning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Malware detection and removal</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>SSL/TLS configuration analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Security headers assessment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Detailed security reports</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link
                href="/security"
                className="flex items-center justify-center gap-2"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>SEO Optimization</CardTitle>
            <CardDescription>
              Improve your search engine rankings and visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Keyword analysis and optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Content quality assessment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Backlink analysis and strategy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Core Web Vitals optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Competitor analysis</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link
                href="/seo"
                className="flex items-center justify-center gap-2"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Performance Monitoring</CardTitle>
            <CardDescription>
              Optimize your website speed and user experience
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Page load time analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Resource optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Mobile performance testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Server response time monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Performance improvement recommendations</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/" className="flex items-center justify-center gap-2">
                Learn More <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          Additional Services
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Continuous Monitoring</CardTitle>
              <CardDescription>
                Ongoing security and performance monitoring for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our continuous monitoring service provides real-time alerts for
                security vulnerabilities, performance issues, and SEO changes,
                ensuring your website stays secure and optimized at all times.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Security Solutions</CardTitle>
              <CardDescription>
                Tailored security implementations for your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our team of security experts can develop and implement custom
                security solutions for your website, including advanced
                authentication, data encryption, and compliance with industry
                regulations.
              </p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We understand that every business has unique requirements. Contact our
          team to discuss how we can tailor our services to meet your specific
          needs.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
